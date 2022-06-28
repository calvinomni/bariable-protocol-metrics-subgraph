// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class BondCreated extends ethereum.Event {
  get params(): BondCreated__Params {
    return new BondCreated__Params(this);
  }
}

export class BondCreated__Params {
  _event: BondCreated;

  constructor(event: BondCreated) {
    this._event = event;
  }

  get deposit(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get payout(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get expires(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get priceInUSD(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class BondPriceChanged extends ethereum.Event {
  get params(): BondPriceChanged__Params {
    return new BondPriceChanged__Params(this);
  }
}

export class BondPriceChanged__Params {
  _event: BondPriceChanged;

  constructor(event: BondPriceChanged) {
    this._event = event;
  }

  get priceInUSD(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get internalPrice(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get debtRatio(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class BondRedeemed extends ethereum.Event {
  get params(): BondRedeemed__Params {
    return new BondRedeemed__Params(this);
  }
}

export class BondRedeemed__Params {
  _event: BondRedeemed;

  constructor(event: BondRedeemed) {
    this._event = event;
  }

  get payout(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get remaining(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class OwnershipPulled extends ethereum.Event {
  get params(): OwnershipPulled__Params {
    return new OwnershipPulled__Params(this);
  }
}

export class OwnershipPulled__Params {
  _event: OwnershipPulled;

  constructor(event: OwnershipPulled) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipPushed extends ethereum.Event {
  get params(): OwnershipPushed__Params {
    return new OwnershipPushed__Params(this);
  }
}

export class OwnershipPushed__Params {
  _event: OwnershipPushed;

  constructor(event: OwnershipPushed) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OHMDAIBondV3__adjustmentResult {
  value0: boolean;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: boolean, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }

  getAdd(): boolean {
    return this.value0;
  }

  getRate(): BigInt {
    return this.value1;
  }

  getTarget(): BigInt {
    return this.value2;
  }
}

export class OHMDAIBondV3__bondInfoResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getValueRemaining(): BigInt {
    return this.value0;
  }

  getPayoutRemaining(): BigInt {
    return this.value1;
  }

  getVestingPeriod(): BigInt {
    return this.value2;
  }

  getLastBlock(): BigInt {
    return this.value3;
  }

  getPricePaid(): BigInt {
    return this.value4;
  }
}

export class OHMDAIBondV3__termsResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getControlVariable(): BigInt {
    return this.value0;
  }

  getVestingTerm(): BigInt {
    return this.value1;
  }

  getMinimumPrice(): BigInt {
    return this.value2;
  }

  getMaxPayout(): BigInt {
    return this.value3;
  }

  getFee(): BigInt {
    return this.value4;
  }
}

export class OHMDAIBondV3 extends ethereum.SmartContract {
  static bind(address: Address): OHMDAIBondV3 {
    return new OHMDAIBondV3("OHMDAIBondV3", address);
  }

  DAO(): Address {
    let result = super.call("DAO", "DAO():(address)", []);

    return result[0].toAddress();
  }

  try_DAO(): ethereum.CallResult<Address> {
    let result = super.tryCall("DAO", "DAO():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  OHM(): Address {
    let result = super.call("OHM", "OHM():(address)", []);

    return result[0].toAddress();
  }

  try_OHM(): ethereum.CallResult<Address> {
    let result = super.tryCall("OHM", "OHM():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  adjustment(): OHMDAIBondV3__adjustmentResult {
    let result = super.call(
      "adjustment",
      "adjustment():(bool,uint256,uint256)",
      []
    );

    return new OHMDAIBondV3__adjustmentResult(
      result[0].toBoolean(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_adjustment(): ethereum.CallResult<OHMDAIBondV3__adjustmentResult> {
    let result = super.tryCall(
      "adjustment",
      "adjustment():(bool,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new OHMDAIBondV3__adjustmentResult(
        value[0].toBoolean(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  bondCalculator(): Address {
    let result = super.call("bondCalculator", "bondCalculator():(address)", []);

    return result[0].toAddress();
  }

  try_bondCalculator(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "bondCalculator",
      "bondCalculator():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  bondInfo(param0: Address): OHMDAIBondV3__bondInfoResult {
    let result = super.call(
      "bondInfo",
      "bondInfo(address):(uint256,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new OHMDAIBondV3__bondInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_bondInfo(
    param0: Address
  ): ethereum.CallResult<OHMDAIBondV3__bondInfoResult> {
    let result = super.tryCall(
      "bondInfo",
      "bondInfo(address):(uint256,uint256,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new OHMDAIBondV3__bondInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  bondPrice(): BigInt {
    let result = super.call("bondPrice", "bondPrice():(uint256)", []);

    return result[0].toBigInt();
  }

  try_bondPrice(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("bondPrice", "bondPrice():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bondPriceInUSD(): BigInt {
    let result = super.call("bondPriceInUSD", "bondPriceInUSD():(uint256)", []);

    return result[0].toBigInt();
  }

  try_bondPriceInUSD(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "bondPriceInUSD",
      "bondPriceInUSD():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  debtRatio(): BigInt {
    let result = super.call("debtRatio", "debtRatio():(uint256)", []);

    return result[0].toBigInt();
  }

  try_debtRatio(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("debtRatio", "debtRatio():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  deposit(_amount: BigInt, _maxPrice: BigInt, _depositor: Address): BigInt {
    let result = super.call(
      "deposit",
      "deposit(uint256,uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_amount),
        ethereum.Value.fromUnsignedBigInt(_maxPrice),
        ethereum.Value.fromAddress(_depositor)
      ]
    );

    return result[0].toBigInt();
  }

  try_deposit(
    _amount: BigInt,
    _maxPrice: BigInt,
    _depositor: Address
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "deposit",
      "deposit(uint256,uint256,address):(uint256)",
      [
        ethereum.Value.fromUnsignedBigInt(_amount),
        ethereum.Value.fromUnsignedBigInt(_maxPrice),
        ethereum.Value.fromAddress(_depositor)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  isLiquidityBond(): boolean {
    let result = super.call("isLiquidityBond", "isLiquidityBond():(bool)", []);

    return result[0].toBoolean();
  }

  try_isLiquidityBond(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isLiquidityBond",
      "isLiquidityBond():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  manager(): Address {
    let result = super.call("manager", "manager():(address)", []);

    return result[0].toAddress();
  }

  try_manager(): ethereum.CallResult<Address> {
    let result = super.tryCall("manager", "manager():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  maxPayout(): BigInt {
    let result = super.call("maxPayout", "maxPayout():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maxPayout(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("maxPayout", "maxPayout():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  payoutFor(_value: BigInt): BigInt {
    let result = super.call("payoutFor", "payoutFor(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_value)
    ]);

    return result[0].toBigInt();
  }

  try_payoutFor(_value: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("payoutFor", "payoutFor(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(_value)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  pendingPayoutFor(_depositor: Address): BigInt {
    let result = super.call(
      "pendingPayoutFor",
      "pendingPayoutFor(address):(uint256)",
      [ethereum.Value.fromAddress(_depositor)]
    );

    return result[0].toBigInt();
  }

  try_pendingPayoutFor(_depositor: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "pendingPayoutFor",
      "pendingPayoutFor(address):(uint256)",
      [ethereum.Value.fromAddress(_depositor)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  percentVestedFor(_depositor: Address): BigInt {
    let result = super.call(
      "percentVestedFor",
      "percentVestedFor(address):(uint256)",
      [ethereum.Value.fromAddress(_depositor)]
    );

    return result[0].toBigInt();
  }

  try_percentVestedFor(_depositor: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "percentVestedFor",
      "percentVestedFor(address):(uint256)",
      [ethereum.Value.fromAddress(_depositor)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  principle(): Address {
    let result = super.call("principle", "principle():(address)", []);

    return result[0].toAddress();
  }

  try_principle(): ethereum.CallResult<Address> {
    let result = super.tryCall("principle", "principle():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  recoverLostToken(_token: Address): boolean {
    let result = super.call(
      "recoverLostToken",
      "recoverLostToken(address):(bool)",
      [ethereum.Value.fromAddress(_token)]
    );

    return result[0].toBoolean();
  }

  try_recoverLostToken(_token: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "recoverLostToken",
      "recoverLostToken(address):(bool)",
      [ethereum.Value.fromAddress(_token)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  redeem(_stake: boolean): BigInt {
    let result = super.call("redeem", "redeem(bool):(uint256)", [
      ethereum.Value.fromBoolean(_stake)
    ]);

    return result[0].toBigInt();
  }

  try_redeem(_stake: boolean): ethereum.CallResult<BigInt> {
    let result = super.tryCall("redeem", "redeem(bool):(uint256)", [
      ethereum.Value.fromBoolean(_stake)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  setBondTerms(
    _vestingTerm: BigInt,
    _minimumPrice: BigInt,
    _maxPayout: BigInt,
    _fee: BigInt
  ): boolean {
    let result = super.call(
      "setBondTerms",
      "setBondTerms(uint256,uint256,uint256,uint256):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(_vestingTerm),
        ethereum.Value.fromUnsignedBigInt(_minimumPrice),
        ethereum.Value.fromUnsignedBigInt(_maxPayout),
        ethereum.Value.fromUnsignedBigInt(_fee)
      ]
    );

    return result[0].toBoolean();
  }

  try_setBondTerms(
    _vestingTerm: BigInt,
    _minimumPrice: BigInt,
    _maxPayout: BigInt,
    _fee: BigInt
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "setBondTerms",
      "setBondTerms(uint256,uint256,uint256,uint256):(bool)",
      [
        ethereum.Value.fromUnsignedBigInt(_vestingTerm),
        ethereum.Value.fromUnsignedBigInt(_minimumPrice),
        ethereum.Value.fromUnsignedBigInt(_maxPayout),
        ethereum.Value.fromUnsignedBigInt(_fee)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  setStaking(_staking: Address): boolean {
    let result = super.call("setStaking", "setStaking(address):(bool)", [
      ethereum.Value.fromAddress(_staking)
    ]);

    return result[0].toBoolean();
  }

  try_setStaking(_staking: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("setStaking", "setStaking(address):(bool)", [
      ethereum.Value.fromAddress(_staking)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  staking(): Address {
    let result = super.call("staking", "staking():(address)", []);

    return result[0].toAddress();
  }

  try_staking(): ethereum.CallResult<Address> {
    let result = super.tryCall("staking", "staking():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  terms(): OHMDAIBondV3__termsResult {
    let result = super.call(
      "terms",
      "terms():(uint256,uint256,uint256,uint256,uint256)",
      []
    );

    return new OHMDAIBondV3__termsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt()
    );
  }

  try_terms(): ethereum.CallResult<OHMDAIBondV3__termsResult> {
    let result = super.tryCall(
      "terms",
      "terms():(uint256,uint256,uint256,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new OHMDAIBondV3__termsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt()
      )
    );
  }

  totalDebt(): BigInt {
    let result = super.call("totalDebt", "totalDebt():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalDebt(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalDebt", "totalDebt():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  treasury(): Address {
    let result = super.call("treasury", "treasury():(address)", []);

    return result[0].toAddress();
  }

  try_treasury(): ethereum.CallResult<Address> {
    let result = super.tryCall("treasury", "treasury():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _OHM(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _principle(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _treasury(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _DAO(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _bondCalculator(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get _controlVariable(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _minimumPrice(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DepositCall extends ethereum.Call {
  get inputs(): DepositCall__Inputs {
    return new DepositCall__Inputs(this);
  }

  get outputs(): DepositCall__Outputs {
    return new DepositCall__Outputs(this);
  }
}

export class DepositCall__Inputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _maxPrice(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _depositor(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class DepositCall__Outputs {
  _call: DepositCall;

  constructor(call: DepositCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class PullManagementCall extends ethereum.Call {
  get inputs(): PullManagementCall__Inputs {
    return new PullManagementCall__Inputs(this);
  }

  get outputs(): PullManagementCall__Outputs {
    return new PullManagementCall__Outputs(this);
  }
}

export class PullManagementCall__Inputs {
  _call: PullManagementCall;

  constructor(call: PullManagementCall) {
    this._call = call;
  }
}

export class PullManagementCall__Outputs {
  _call: PullManagementCall;

  constructor(call: PullManagementCall) {
    this._call = call;
  }
}

export class PushManagementCall extends ethereum.Call {
  get inputs(): PushManagementCall__Inputs {
    return new PushManagementCall__Inputs(this);
  }

  get outputs(): PushManagementCall__Outputs {
    return new PushManagementCall__Outputs(this);
  }
}

export class PushManagementCall__Inputs {
  _call: PushManagementCall;

  constructor(call: PushManagementCall) {
    this._call = call;
  }

  get newOwner_(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class PushManagementCall__Outputs {
  _call: PushManagementCall;

  constructor(call: PushManagementCall) {
    this._call = call;
  }
}

export class RecoverLostTokenCall extends ethereum.Call {
  get inputs(): RecoverLostTokenCall__Inputs {
    return new RecoverLostTokenCall__Inputs(this);
  }

  get outputs(): RecoverLostTokenCall__Outputs {
    return new RecoverLostTokenCall__Outputs(this);
  }
}

export class RecoverLostTokenCall__Inputs {
  _call: RecoverLostTokenCall;

  constructor(call: RecoverLostTokenCall) {
    this._call = call;
  }

  get _token(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class RecoverLostTokenCall__Outputs {
  _call: RecoverLostTokenCall;

  constructor(call: RecoverLostTokenCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class RedeemCall extends ethereum.Call {
  get inputs(): RedeemCall__Inputs {
    return new RedeemCall__Inputs(this);
  }

  get outputs(): RedeemCall__Outputs {
    return new RedeemCall__Outputs(this);
  }
}

export class RedeemCall__Inputs {
  _call: RedeemCall;

  constructor(call: RedeemCall) {
    this._call = call;
  }

  get _stake(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }
}

export class RedeemCall__Outputs {
  _call: RedeemCall;

  constructor(call: RedeemCall) {
    this._call = call;
  }

  get value0(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class RenounceManagementCall extends ethereum.Call {
  get inputs(): RenounceManagementCall__Inputs {
    return new RenounceManagementCall__Inputs(this);
  }

  get outputs(): RenounceManagementCall__Outputs {
    return new RenounceManagementCall__Outputs(this);
  }
}

export class RenounceManagementCall__Inputs {
  _call: RenounceManagementCall;

  constructor(call: RenounceManagementCall) {
    this._call = call;
  }
}

export class RenounceManagementCall__Outputs {
  _call: RenounceManagementCall;

  constructor(call: RenounceManagementCall) {
    this._call = call;
  }
}

export class SetAdjustmentCall extends ethereum.Call {
  get inputs(): SetAdjustmentCall__Inputs {
    return new SetAdjustmentCall__Inputs(this);
  }

  get outputs(): SetAdjustmentCall__Outputs {
    return new SetAdjustmentCall__Outputs(this);
  }
}

export class SetAdjustmentCall__Inputs {
  _call: SetAdjustmentCall;

  constructor(call: SetAdjustmentCall) {
    this._call = call;
  }

  get _addition(): boolean {
    return this._call.inputValues[0].value.toBoolean();
  }

  get _increment(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _target(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SetAdjustmentCall__Outputs {
  _call: SetAdjustmentCall;

  constructor(call: SetAdjustmentCall) {
    this._call = call;
  }
}

export class SetBondTermsCall extends ethereum.Call {
  get inputs(): SetBondTermsCall__Inputs {
    return new SetBondTermsCall__Inputs(this);
  }

  get outputs(): SetBondTermsCall__Outputs {
    return new SetBondTermsCall__Outputs(this);
  }
}

export class SetBondTermsCall__Inputs {
  _call: SetBondTermsCall;

  constructor(call: SetBondTermsCall) {
    this._call = call;
  }

  get _vestingTerm(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _minimumPrice(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _maxPayout(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _fee(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class SetBondTermsCall__Outputs {
  _call: SetBondTermsCall;

  constructor(call: SetBondTermsCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class SetStakingCall extends ethereum.Call {
  get inputs(): SetStakingCall__Inputs {
    return new SetStakingCall__Inputs(this);
  }

  get outputs(): SetStakingCall__Outputs {
    return new SetStakingCall__Outputs(this);
  }
}

export class SetStakingCall__Inputs {
  _call: SetStakingCall;

  constructor(call: SetStakingCall) {
    this._call = call;
  }

  get _staking(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class SetStakingCall__Outputs {
  _call: SetStakingCall;

  constructor(call: SetStakingCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}
