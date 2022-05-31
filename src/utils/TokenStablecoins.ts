import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

import { ConvexAllocator } from "../../generated/ProtocolMetrics/ConvexAllocator";
import {
  AAVE_ALLOCATOR,
  AAVE_ALLOCATOR_V2,
  ADAI_ERC20_CONTRACT,
  CONVEX_ALLOCATOR1,
  CONVEX_ALLOCATOR2,
  CONVEX_ALLOCATOR3,
  ERC20DAI_CONTRACT,
  ERC20FRAX_CONTRACT,
  FEI_ERC20_CONTRACT,
  getContractName,
  LUSD_ALLOCATOR,
  LUSD_ERC20_CONTRACT,
  RARI_ALLOCATOR,
  STABILITY_POOL,
  UST_ERC20_CONTRACT,
} from "./Constants";
import {
  getConvexAllocator,
  getERC20,
  getERC20Balance,
  getERC20TokenRecordsFromWallets,
  getRariAllocator,
  getStabilityPool,
} from "./ContractHelper";
import { toDecimal } from "./Decimals";
import {
  getOhmDaiLiquidityBalance,
  getOhmDaiLiquidityV2Balance,
  getOhmFraxLiquidityBalance,
  getOhmFraxLiquidityV2Balance,
  getOhmLusdLiquidityBalance,
  getOhmLusdLiquidityV2Balance,
} from "./LiquidityCalculations";
import { TokenRecord, TokenRecords } from "./TokenRecord";

/**
 * Calculates the balance of DAI across the following:
 * - all wallets, using {getERC20TokenRecordsFromWallets}.
 * - Aave allocator
 * - Aave allocator v2
 * - Rari allocator
 *
 * @param blockNumber the current block number
 * @returns TokenRecords object
 */
export function getDaiBalance(blockNumber: BigInt): TokenRecords {
  const daiERC20 = getERC20("DAI", ERC20DAI_CONTRACT, blockNumber);
  const aDaiERC20 = getERC20("aDAI", ADAI_ERC20_CONTRACT, blockNumber);
  const rariAllocator = getRariAllocator(RARI_ALLOCATOR, blockNumber);
  const records = getERC20TokenRecordsFromWallets(
    "DAI",
    daiERC20,
    BigDecimal.fromString("1"),
    blockNumber,
  );

  if (aDaiERC20) {
    records.push(
      new TokenRecord(
        "DAI",
        getContractName(AAVE_ALLOCATOR),
        AAVE_ALLOCATOR,
        BigDecimal.fromString("1"),
        toDecimal(getERC20Balance(aDaiERC20, AAVE_ALLOCATOR, blockNumber), 18),
      ),
    );
    records.push(
      new TokenRecord(
        "DAI",
        getContractName(AAVE_ALLOCATOR_V2),
        AAVE_ALLOCATOR_V2,
        BigDecimal.fromString("1"),
        toDecimal(getERC20Balance(aDaiERC20, AAVE_ALLOCATOR_V2, blockNumber), 18),
      ),
    );
  }

  if (rariAllocator) {
    records.push(
      new TokenRecord(
        "DAI",
        getContractName(RARI_ALLOCATOR),
        RARI_ALLOCATOR,
        BigDecimal.fromString("1"),
        toDecimal(rariAllocator.amountAllocated(BigInt.fromI32(3)), 18),
      ),
    );
  }

  return records;
}

/**
 * Calculates the balance of FEI across the following:
 * - all wallets, using {getERC20TokenRecordsFromWallets}.
 *
 * @param blockNumber the current block number
 * @returns TokenRecords object
 */
export function getFeiBalance(blockNumber: BigInt): TokenRecords {
  const feiERC20 = getERC20("FEI", FEI_ERC20_CONTRACT, blockNumber);

  return getERC20TokenRecordsFromWallets("FEI", feiERC20, BigDecimal.fromString("1"), blockNumber);
}

/**
 * Calculates the balance of FRAX across the following:
 * - Convex allocator 1
 * - Convex allocator 2
 * - Convex allocator 3
 *
 * @param allocator1 Convex allocator
 * @param allocator2 Convex allocator
 * @param allocator3 Convex allocator
 * @param blockNumber current block number
 * @returns TokenRecords object
 */
export function getFraxAllocatedInConvexBalance(
  allocator1: ConvexAllocator | null,
  allocator2: ConvexAllocator | null,
  allocator3: ConvexAllocator | null,
  _blockNumber: BigInt,
): TokenRecords {
  // TODO add to mv and mvrfv?
  // Multiplied by 10e9 for consistency
  // TODO determine if the multiplier is correct

  const records = new TokenRecords();

  if (allocator1) {
    records.push(
      new TokenRecord(
        "FRAX",
        "Convex Allocator 1",
        CONVEX_ALLOCATOR1,
        BigDecimal.fromString("1"),
        toDecimal(allocator1.totalValueDeployed().times(BigInt.fromString("1000000000")), 18),
      ),
    );
  }

  if (allocator2) {
    records.push(
      new TokenRecord(
        "FRAX",
        "Convex Allocator 2",
        CONVEX_ALLOCATOR2,
        BigDecimal.fromString("1"),
        toDecimal(allocator2.totalValueDeployed().times(BigInt.fromString("1000000000")), 18),
      ),
    );
  }

  if (allocator3) {
    records.push(
      new TokenRecord(
        "FRAX",
        "Convex Allocator 3",
        CONVEX_ALLOCATOR3,
        BigDecimal.fromString("1"),
        toDecimal(allocator3.totalValueDeployed().times(BigInt.fromString("1000000000")), 18),
      ),
    );
  }

  return records;
}

/**
 * Calculates the balance of FRAX across the following:
 * - all wallets, using {getERC20TokenRecordsFromWallets}.
 * - Convex allocators
 *
 * @param blockNumber the current block number
 * @returns TokenRecords object
 */
export function getFraxBalance(blockNumber: BigInt): TokenRecords {
  const fraxERC20 = getERC20("FRAX", ERC20FRAX_CONTRACT, blockNumber);

  const records = getERC20TokenRecordsFromWallets(
    "FRAX",
    fraxERC20,
    BigDecimal.fromString("1"),
    blockNumber,
  );

  records.combine(
    getFraxAllocatedInConvexBalance(
      getConvexAllocator(CONVEX_ALLOCATOR1, blockNumber),
      getConvexAllocator(CONVEX_ALLOCATOR2, blockNumber),
      getConvexAllocator(CONVEX_ALLOCATOR3, blockNumber),
      blockNumber,
    ),
  );

  return records;
}

/**
 * Returns the balance of LUSD tokens in the following:
 * - all wallets, using {getERC20TokenRecordsFromWallets}.
 * - LUSD allocator
 *
 * @param blockNumber the current block number
 * @returns TokenRecords object
 */
export function getLUSDBalance(blockNumber: BigInt): TokenRecords {
  const lusdERC20 = getERC20("LUSD", LUSD_ERC20_CONTRACT, blockNumber);
  const stabilityPoolContract = getStabilityPool(STABILITY_POOL, blockNumber);
  const records = getERC20TokenRecordsFromWallets(
    "LUSD",
    lusdERC20,
    BigDecimal.fromString("1"),
    blockNumber,
  );

  if (stabilityPoolContract) {
    records.push(
      new TokenRecord(
        "LUSD",
        getContractName(LUSD_ALLOCATOR),
        LUSD_ALLOCATOR,
        BigDecimal.fromString("1"),
        toDecimal(stabilityPoolContract.deposits(Address.fromString(LUSD_ALLOCATOR)).value0, 18),
      ),
    );
  }

  return records;
}

/**
 * Returns the balance of UST tokens in the following:
 * - all wallets, using {getERC20TokenRecordsFromWallets}.
 *
 * @param blockNumber the current block number
 * @returns TokenRecords object
 */
export function getUSTBalance(blockNumber: BigInt): TokenRecords {
  const ustERC20 = getERC20("UST", UST_ERC20_CONTRACT, blockNumber);

  return getERC20TokenRecordsFromWallets("UST", ustERC20, BigDecimal.fromString("1"), blockNumber);
}

/**
 * Returns the value of USD-pegged stablecoins:
 * - DAI
 * - FRAX
 * - LUSD
 * - UST
 * - FEI
 *
 * This currently (incorrectly) assumes that the value of each stablecoin is $1.
 *
 * TODO: lookup stablecoin price
 *
 * @param blockNumber the current block number
 * @returns TokenRecords representing the components of the stablecoin value
 */
export function getStableValue(blockNumber: BigInt): TokenRecords {
  const records = new TokenRecords();

  records.combine(getDaiBalance(blockNumber));
  records.combine(getFraxBalance(blockNumber));
  records.combine(getLUSDBalance(blockNumber));
  records.combine(getUSTBalance(blockNumber));
  records.combine(getFeiBalance(blockNumber));

  return records;
}

/**
 * Returns the DAI market value, which is defined as:
 * - Balance of DAI
 * - Value of OHM-DAI pair
 * - Value of OHM-DAI pair V2
 *
 * If {riskFree} is true, the discounted value of OHM-DAI pairs (where OHM = $1)
 * is calculated.
 *
 * @param blockNumber the current block number
 * @param riskFree true if calculating the risk-free value
 * @returns TokenRecords representing the components of the market value
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export function getDaiMarketValue(blockNumber: BigInt, riskFree: boolean = false): TokenRecords {
  const records = new TokenRecords();

  records.combine(getDaiBalance(blockNumber));

  records.combine(getOhmDaiLiquidityBalance(blockNumber, riskFree));

  records.combine(getOhmDaiLiquidityV2Balance(blockNumber, riskFree));

  return records;
}

/**
 * Returns the FRAX market value, which is defined as:
 * - Balance of FRAX
 * - Value of OHM-FRAX pair
 * - Value of OHM-FRAX pair V2
 *
 * If {riskFree} is true, the discounted value of OHM-DAI pairs (where OHM = $1)
 * is calculated.
 *
 * @param blockNumber the current block number
 * @param riskFree true if calculating the risk-free value
 * @returns TokenRecords representing the components of the market value
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export function getFraxMarketValue(blockNumber: BigInt, riskFree: boolean = false): TokenRecords {
  const records = new TokenRecords();

  records.combine(getFraxBalance(blockNumber));

  records.combine(getOhmFraxLiquidityBalance(blockNumber, riskFree));

  records.combine(getOhmFraxLiquidityV2Balance(blockNumber, riskFree));

  return records;
}

/**
 * Returns the LUSD market value, which is defined as:
 * - Balance of LUSD
 * - Value of OHM-LUSD pair
 * - Value of OHM-LUSD pair V2
 *
 * If {riskFree} is true, the discounted value of OHM-DAI pairs (where OHM = $1)
 * is calculated.
 *
 * @param blockNumber the current block number
 * @param riskFree true if calculating the risk-free value
 * @returns TokenRecords representing the components of the market value
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export function getLusdMarketValue(blockNumber: BigInt, riskFree: boolean = false): TokenRecords {
  const records = new TokenRecords();

  records.combine(getLUSDBalance(blockNumber));

  records.combine(getOhmLusdLiquidityBalance(blockNumber, riskFree));

  records.combine(getOhmLusdLiquidityV2Balance(blockNumber, riskFree));

  return records;
}

/**
 * Returns the FEI market value, which is defined as:
 * - Balance of FEI
 *
 * If {riskFree} is true, the discounted value of OHM-DAI pairs (where OHM = $1)
 * is calculated.
 *
 * @param blockNumber the current block number
 * @param riskFree true if calculating the risk-free value
 * @returns TokenRecords representing the components of the market value
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export function getFeiMarketValue(blockNumber: BigInt, riskFree: boolean = false): TokenRecords {
  const records = new TokenRecords();

  records.combine(getFeiBalance(blockNumber));

  return records;
}

// TODO add USDC
