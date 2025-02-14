import { Address, BigDecimal, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { assert, beforeEach, clearStore, createMockedFunction, describe, log, test } from "matchstick-as";

import { toBigInt } from "../../shared/src/utils/Decimals";
import { GnosisAuction, GnosisAuctionRoot, TokenSupply } from "../generated/schema";
import { GNOSIS_RECORD_ID } from "../src/GnosisAuction";
import { BOND_MANAGER, CIRCULATING_SUPPLY_WALLETS, ERC20_OHM_V2, EULER_ADDRESS, SILO_ADDRESS } from "../src/utils/Constants";
import { EULER_MINT_BLOCK, EULER_MINT_QUANTITY, getMintedBorrowableOHMRecords, getTreasuryOHMRecords, getVestingBondSupplyRecords, SILO_MINT_BLOCK, SILO_MINT_QUANTITY } from "../src/utils/OhmCalculations";
import { TYPE_BONDS_DEPOSITS, TYPE_BONDS_PREMINTED, TYPE_BONDS_VESTING_DEPOSITS, TYPE_BONDS_VESTING_TOKENS, TYPE_LENDING } from "../src/utils/TokenSupplyHelper";
import { mockERC20TotalSupply } from "./erc20Helper";
import { OHM_V2_DECIMALS } from "./pairHelper";

const CONTRACT_GNOSIS = "0x0b7ffc1f4ad541a4ed16b40d8c37f0929158d101".toLowerCase();
const CONTRACT_TELLER = "0x007FE70dc9797C4198528aE43d8195ffF82Bdc95".toLowerCase();

function tokenSupplyRecordsToMap(records: TokenSupply[]): Map<string, TokenSupply> {
    const map = new Map<string, TokenSupply>();

    for (let i = 0; i < records.length; i++) {
        const record = records[i];

        if (record.sourceAddress === null) {
            continue;
        }

        map.set(record.sourceAddress!.toLowerCase(), record);
    }

    return map;
}

function mockContractBalances(gnosisBalance: BigDecimal = BigDecimal.fromString("0"), bondManagerBalance: BigDecimal = BigDecimal.fromString("0"), payoutCapacity: BigDecimal = BigDecimal.fromString("0")): void {
    // Holds user deposits
    createMockedFunction(Address.fromString(ERC20_OHM_V2), "balanceOf", "balanceOf(address):(uint256)").
        withArgs([ethereum.Value.fromAddress(Address.fromString(CONTRACT_GNOSIS))]).
        returns([
            ethereum.Value.fromUnsignedBigInt(toBigInt(gnosisBalance, 9)),
        ]);

    // Holds user deposits after auction closure
    createMockedFunction(Address.fromString(ERC20_OHM_V2), "balanceOf", "balanceOf(address):(uint256)").
        withArgs([ethereum.Value.fromAddress(Address.fromString(BOND_MANAGER))]).
        returns([
            ethereum.Value.fromUnsignedBigInt(toBigInt(bondManagerBalance, 9)),
        ]);

    // Holds minted OHM
    createMockedFunction(Address.fromString(ERC20_OHM_V2), "balanceOf", "balanceOf(address):(uint256)").
        withArgs([ethereum.Value.fromAddress(Address.fromString(CONTRACT_TELLER))]).
        returns([
            ethereum.Value.fromUnsignedBigInt(toBigInt(payoutCapacity, 9)),
        ]);
}

function mockCirculatingSupplyWallets(balance: BigInt): void {
    for (let i = 0; i < CIRCULATING_SUPPLY_WALLETS.length; i++) {
        createMockedFunction(Address.fromString(ERC20_OHM_V2), "balanceOf", "balanceOf(address):(uint256)").
            withArgs([ethereum.Value.fromAddress(Address.fromString(CIRCULATING_SUPPLY_WALLETS[i]))]).
            returns([
                ethereum.Value.fromUnsignedBigInt(balance),
            ]);
    }
}

const AUCTION_ID = "1";
const PAYOUT_CAPACITY = BigDecimal.fromString("100000");
const BID_QUANTITY = BigDecimal.fromString("90330");
const BOND_TERM = BigInt.fromString("10");
const AUCTION_OPEN_TIMESTAMP = BigInt.fromString("800");

const TIMESTAMP = BigInt.fromString("1000");
const AUCTION_CLOSE_TIMESTAMP_PRE_EXPIRY = BigInt.fromString("999");
const AUCTION_CLOSE_TIMESTAMP_POST_EXPIRY = BigInt.fromString("980");

function setUpGnosisAuction(payoutCapacity: BigDecimal = PAYOUT_CAPACITY, termSeconds: BigInt = BOND_TERM, bidQuantity: BigDecimal | null = null, auctionCloseTimestamp: BigInt | null = null, auctionOpenTimestamp: BigInt = AUCTION_OPEN_TIMESTAMP): void {
    const record = new GnosisAuction(AUCTION_ID);
    record.payoutCapacity = payoutCapacity;
    record.termSeconds = termSeconds;
    record.auctionOpenTimestamp = auctionOpenTimestamp;

    if (bidQuantity) {
        record.bidQuantity = bidQuantity;
    }

    if (auctionCloseTimestamp) {
        record.auctionCloseTimestamp = auctionCloseTimestamp;
    }

    record.save();

    const rootRecord = new GnosisAuctionRoot(GNOSIS_RECORD_ID);
    rootRecord.markets = [BigInt.fromString(AUCTION_ID)];
    rootRecord.save();
}

function mockContracts(): void {
    createMockedFunction(Address.fromString(BOND_MANAGER), "isActive", "isActive():(bool)").returns([
        ethereum.Value.fromBoolean(true)
    ]);

    // Access methods on bond manager
    createMockedFunction(Address.fromString(BOND_MANAGER), "gnosisEasyAuction", "gnosisEasyAuction():(address)").returns([
        ethereum.Value.fromAddress(Address.fromString(CONTRACT_GNOSIS))
    ]);

    createMockedFunction(Address.fromString(BOND_MANAGER), "fixedExpiryTeller", "fixedExpiryTeller():(address)").returns([
        ethereum.Value.fromAddress(Address.fromString(CONTRACT_TELLER))
    ]);
}

beforeEach(() => {
    log.debug("beforeEach: Clearing store", []);
    clearStore();

    mockERC20TotalSupply(ERC20_OHM_V2, OHM_V2_DECIMALS, toBigInt(BigDecimal.fromString("1000")));
});

describe("Vesting Bonds", () => {
    test("no auctions", () => {
        mockContracts();
        mockContractBalances();

        const records = getVestingBondSupplyRecords(TIMESTAMP, BigInt.fromString("2"));

        // No supply impact
        assert.i32Equals(records.length, 0);
    });

    test("open auction", () => {
        // Mock auction payoutCapacity (GnosisAuction)
        setUpGnosisAuction();

        // Mock contract values for the BondManager
        mockContracts();
        mockContractBalances(BigDecimal.zero(), BigDecimal.zero(), PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(TIMESTAMP, BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // supply decreased by payoutCapacity in teller
        const tellerRecord = recordsMap.get(CONTRACT_TELLER);
        assert.stringEquals(tellerRecord.supplyBalance.toString(), PAYOUT_CAPACITY.times(BigDecimal.fromString("-1")).toString());
        assert.stringEquals(tellerRecord.type, TYPE_BONDS_PREMINTED);

        // No supply impact from Gnosis contract
        assert.assertTrue(recordsMap.has(BOND_MANAGER) == false);

        assert.i32Equals(records.length, 1);
    });

    test("open auction with deposits", () => {
        // Mock auction payoutCapacity (GnosisAuction)
        setUpGnosisAuction();

        // Mock contract values for the BondManager and Gnosis deposit
        mockContracts();
        const gnosisBalance = BigDecimal.fromString("1000");
        mockContractBalances(gnosisBalance, BigDecimal.zero(), PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(TIMESTAMP, BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // supply decreased by payoutCapacity in teller
        const tellerRecord = recordsMap.get(CONTRACT_TELLER);
        assert.stringEquals(tellerRecord.supplyBalance.toString(), PAYOUT_CAPACITY.times(BigDecimal.fromString("-1")).toString());
        assert.stringEquals(tellerRecord.type, TYPE_BONDS_PREMINTED);

        // No supply impact from Gnosis contract
        assert.assertTrue(recordsMap.has(BOND_MANAGER) == false);

        assert.i32Equals(records.length, 1);
    });

    test("closed auction/before bond expiry/with balance in GnosisEasyAuction", () => {
        // Mock auction payoutCapacity and bidQuantity (GnosisAuction)
        setUpGnosisAuction(PAYOUT_CAPACITY, BOND_TERM, BID_QUANTITY, AUCTION_CLOSE_TIMESTAMP_PRE_EXPIRY);

        // Mock contract values for the BondManager
        mockContracts();
        mockContractBalances(BID_QUANTITY, BigDecimal.zero(), PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(TIMESTAMP, BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // supply decreased by payout capacity in bond teller due to vesting tokens
        const tellerRecord = recordsMap.get(CONTRACT_TELLER);
        assert.stringEquals(tellerRecord.supplyBalance.toString(), PAYOUT_CAPACITY.times(BigDecimal.fromString("-1")).toString());
        assert.stringEquals(tellerRecord.type, TYPE_BONDS_VESTING_TOKENS);

        // supply decreased by bid quantity in bond manager due to vesting user deposits
        const bondManagerRecord = recordsMap.get(BOND_MANAGER);
        assert.stringEquals(bondManagerRecord.supplyBalance.toString(), BID_QUANTITY.times(BigDecimal.fromString("-1")).toString());
        assert.stringEquals(bondManagerRecord.type, TYPE_BONDS_VESTING_DEPOSITS);

        assert.i32Equals(records.length, 2);
    });

    test("closed auction/before bond expiry/with balance in BondManager", () => {
        // Mock auction payoutCapacity and bidQuantity (GnosisAuction)
        setUpGnosisAuction(PAYOUT_CAPACITY, BOND_TERM, BID_QUANTITY, AUCTION_CLOSE_TIMESTAMP_PRE_EXPIRY);

        // Mock contract values for the BondManager
        mockContracts();
        mockContractBalances(BigDecimal.zero(), BID_QUANTITY, PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(TIMESTAMP, BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // supply decreased by payout capacity in bond teller due to vesting tokens
        const tellerRecord = recordsMap.get(CONTRACT_TELLER);
        assert.stringEquals(tellerRecord.supplyBalance.toString(), PAYOUT_CAPACITY.times(BigDecimal.fromString("-1")).toString());
        assert.stringEquals(tellerRecord.type, TYPE_BONDS_VESTING_TOKENS);

        // supply decreased by bid quantity in bond manager due to vesting user deposits
        const bondManagerRecord = recordsMap.get(BOND_MANAGER);
        assert.stringEquals(bondManagerRecord.supplyBalance.toString(), BID_QUANTITY.times(BigDecimal.fromString("-1")).toString());
        assert.stringEquals(bondManagerRecord.type, TYPE_BONDS_VESTING_DEPOSITS);

        assert.i32Equals(records.length, 2);
    });

    test("closed auction/after bond expiry", () => {
        // Mock auction payoutCapacity and bidQuantity (GnosisAuction)
        setUpGnosisAuction(PAYOUT_CAPACITY, BOND_TERM, BID_QUANTITY, AUCTION_CLOSE_TIMESTAMP_POST_EXPIRY);

        // Mock contract values for the BondManager
        mockContracts();
        mockContractBalances(BigDecimal.zero(), BID_QUANTITY, PAYOUT_CAPACITY);

        const records = getVestingBondSupplyRecords(TIMESTAMP, BigInt.fromString("2"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // No effect on supply from the teller, as bond tokens are no longer vesting
        assert.assertTrue(recordsMap.has(CONTRACT_TELLER) == false);

        // supply decreased by bid quantity in bond manager due to vesting user deposits
        const bondManagerRecord = recordsMap.get(BOND_MANAGER);
        assert.stringEquals(bondManagerRecord.supplyBalance.toString(), BID_QUANTITY.times(BigDecimal.fromString("-1")).toString());
        assert.stringEquals(bondManagerRecord.type, TYPE_BONDS_DEPOSITS);

        assert.i32Equals(records.length, 1);
    });
});

describe("Treasury OHM", () => {
    test("excludes bond teller", () => {
        mockCirculatingSupplyWallets(BigInt.fromString("0"));
        mockContractBalances(BigDecimal.zero(), BigDecimal.zero(), BigDecimal.fromString("1"));

        const records = getTreasuryOHMRecords(TIMESTAMP, BigInt.fromString("13782590"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // No supply impact from teller
        assert.assertTrue(recordsMap.has(CONTRACT_TELLER) == false);
    });

    test("excludes bond manager", () => {
        mockCirculatingSupplyWallets(BigInt.fromString("0"));
        mockContractBalances(BigDecimal.zero(), BigDecimal.fromString("1"), BigDecimal.zero());

        const records = getTreasuryOHMRecords(TIMESTAMP, BigInt.fromString("13782590"));
        const recordsMap = tokenSupplyRecordsToMap(records);

        // No supply impact from bond manager
        assert.assertTrue(recordsMap.has(BOND_MANAGER.toLowerCase()) == false);
    });
});

describe("Borrowable OHM", () => {
    test("returns no records before minting", () => {
        const records = getMintedBorrowableOHMRecords(TIMESTAMP, SILO_MINT_BLOCK.minus(BigInt.fromI32(1)));

        assert.i32Equals(records.length, 0);
    });

    test("returns minted OHM after minting", () => {
        const records = getMintedBorrowableOHMRecords(TIMESTAMP, EULER_MINT_BLOCK.plus(BigInt.fromI32(1)));

        const recordOne = records[0];
        assert.stringEquals(recordOne.supplyBalance.toString(), "-" + EULER_MINT_QUANTITY.toString());
        assert.assertTrue(recordOne.sourceAddress == EULER_ADDRESS);
        assert.stringEquals(recordOne.type, TYPE_LENDING);

        const recordTwo = records[1];
        assert.stringEquals(recordTwo.supplyBalance.toString(), "-" + SILO_MINT_QUANTITY.toString());
        assert.assertTrue(recordTwo.sourceAddress == SILO_ADDRESS);
        assert.stringEquals(recordTwo.type, TYPE_LENDING);

        assert.i32Equals(records.length, 2);
    });
});
