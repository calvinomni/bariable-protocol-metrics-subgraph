import { BigInt, log } from "@graphprotocol/graph-ts";

import { TokenRecord } from "../../../shared/generated/schema";
import { TokenCategoryStable } from "../../../shared/src/contracts/TokenDefinition";
import { pushArray } from "../../../shared/src/utils/ArrayHelper";
import { getTokensInCategory } from "../../../shared/src/utils/TokenRecordHelper";
import { getLiquidityBalances } from "../liquidity/LiquidityCalculations";
import { ERC20_TOKENS, getContractName } from "./Constants";
import {
  getAuraPoolEarnedRecords,
  getConvexStakedRecords,
  getERC20,
  getERC20TokenRecordsFromWallets,
  getLiquityStabilityPoolRecords,
  getMakerDSRRecords,
  getOnsenAllocatorRecords,
  getRariAllocatorRecords,
  getVeFXSAllocatorRecords,
} from "./ContractHelper";
import { getUSDRate } from "./Price";
import { getTreasuryRecords } from "./Treasury";

/**
 * Returns the token records for a given stablecoin. This includes:
 * - Wallets
 * - Allocators
 * - Liquidity pools
 *
 * @param contractAddress the address of the ERC20 contract
 * @param blockNumber the current block
 * @returns TokenRecord array
 */
export function getStablecoinBalance(
  timestamp: BigInt,
  contractAddress: string,
  includeLiquidity: boolean,
  blockNumber: BigInt,
): TokenRecord[] {
  const contractName = getContractName(contractAddress);
  log.info(
    "getStablecoinBalance: Calculating stablecoin balance for {} ({}) at block number {}: liquidity? {}",
    [contractName, contractAddress, blockNumber.toString(), includeLiquidity ? "true" : "false"],
  );
  const records: TokenRecord[] = [];
  const contract = getERC20(contractAddress, blockNumber);
  if (!contract) {
    log.info("getStablecoinBalance: Skipping ERC20 contract {} that returned empty at block {}", [
      getContractName(contractAddress),
      blockNumber.toString(),
    ]);
    return records;
  }

  const rate = getUSDRate(contractAddress, blockNumber);

  // Wallets
  pushArray(
    records,
    getERC20TokenRecordsFromWallets(timestamp, contractAddress, contract, rate, blockNumber),
  );

  // Rari Allocator
  pushArray(records, getRariAllocatorRecords(timestamp, contractAddress, rate, blockNumber));

  // Staked Convex tokens
  pushArray(records, getConvexStakedRecords(timestamp, contractAddress, blockNumber));

  // Liquity Stability Pool
  pushArray(records, getLiquityStabilityPoolRecords(timestamp, contractAddress, rate, blockNumber));

  // Onsen Allocator
  pushArray(records, getOnsenAllocatorRecords(timestamp, contractAddress, rate, blockNumber));

  // VeFXS Allocator
  pushArray(records, getVeFXSAllocatorRecords(timestamp, contractAddress, blockNumber));

  // Liquidity pools
  if (includeLiquidity) {
    pushArray(records, getLiquidityBalances(timestamp, contractAddress, blockNumber));
  }

  // Aura earned rewards
  pushArray(records, getAuraPoolEarnedRecords(timestamp, contractAddress, rate, blockNumber));

  // TRSRY
  pushArray(records, getTreasuryRecords(timestamp, contractAddress, rate, blockNumber));

  // Maker DSR
  pushArray(records, getMakerDSRRecords(timestamp, contractAddress, rate, blockNumber));

  return records;
}

/**
 * Gets the balances for all stablecoins, using {getStablecoinBalance}.
 *
 * @param timestamp
 * @param includeLiquidity
 * @param blockNumber the current block
 * @returns TokenRecord array
 */
export function getStablecoinBalances(
  timestamp: BigInt,
  includeLiquidity: boolean,
  blockNumber: BigInt,
): TokenRecord[] {
  log.info("getStablecoinBalances: Calculating stablecoin value. Liquidity? {}", [
    includeLiquidity ? "true" : "false",
  ]);
  const records: TokenRecord[] = [];

  const stableTokens = getTokensInCategory(TokenCategoryStable, ERC20_TOKENS);
  for (let i = 0; i < stableTokens.length; i++) {
    pushArray(
      records,
      getStablecoinBalance(timestamp, stableTokens[i].getAddress(), includeLiquidity, blockNumber),
    );
  }

  return records;
}
