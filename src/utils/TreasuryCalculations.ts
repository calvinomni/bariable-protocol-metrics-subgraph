import { BigDecimal, BigInt, log } from "@graphprotocol/graph-ts";

import { WBTC_ERC20_CONTRACT, WETH_ERC20_CONTRACT } from "./Constants";
import { getERC20 } from "./ContractHelper";
import { TokenRecord, TokenRecords, TokensRecords } from "./TokenRecord";
import { getStableValue } from "./TokenStablecoins";
import { getVolatileValue, getWBTCBalance, getWETHBalance } from "./TokenVolatile";

/**
 * Returns the value of the volatile backing
 * - getVolatileValue
 * - wETH
 * - wBTC
 *
 * @param blockNumber the current block number
 * @returns TokensRecords object
 */
export function getTreasuryVolatileBacking(
  blockNumber: BigInt,
  liquidOnly: boolean,
): TokensRecords {
  const records = getVolatileValue(blockNumber, liquidOnly);

  records.addToken(
    "wETH",
    getWETHBalance(getERC20("wETH", WETH_ERC20_CONTRACT, blockNumber), blockNumber),
  );
  records.addToken(
    "wBTC",
    getWBTCBalance(getERC20("wBTC", WBTC_ERC20_CONTRACT, blockNumber), blockNumber),
  );

  log.info("Treasury volatile backing at block {}: {}", [
    blockNumber.toString(),
    records.toString(),
  ]);
  return records;
}

/**
 * Returns the value of the stable backing
 * - getStableValue
 *
 * @param blockNumber the current block number
 * @returns TokensRecords object
 */
export function getTreasuryStableBacking(blockNumber: BigInt): TokensRecords {
  const records = getStableValue(blockNumber);

  log.info("Treasury stable backing at block {}: {}", [blockNumber.toString(), records.toString()]);
  return records;
}

/**
 * Returns the value of the total (liquid) backing
 * - add: getTreasuryStableBacking
 * - add: getTreasuryVolatileBacking (liquid only)
 * - add: LP value
 * - subtract: OHM circulating supply
 *
 * @param blockNumber the current block number
 * @returns TokensRecords object
 */
export function getTreasuryTotalBacking(
  blockNumber: BigInt,
  lpValue: BigDecimal,
  ohmCirculatingSupply: BigDecimal,
): TokensRecords {
  const records = new TokensRecords();

  records.combine(getTreasuryStableBacking(blockNumber));
  records.combine(getTreasuryVolatileBacking(blockNumber, true));
  records.addToken(
    "LP Placeholder",
    new TokenRecords([
      new TokenRecord("LP Placeholder", "N/A", "0x0", BigDecimal.fromString("1"), lpValue),
    ]),
  );
  // TODO previous implementation was the number of OHM, not the value. Keep as-is?
  records.addToken(
    "OHM Circulating Supply",
    new TokenRecords([
      new TokenRecord(
        "OHM",
        "N/A",
        "0x0",
        BigDecimal.fromString("-1"),
        ohmCirculatingSupply, // Subtracted
      ),
    ]),
  );

  log.info("Treasury total backing at block {}: {}", [blockNumber.toString(), records.toString()]);
  return records;
}
