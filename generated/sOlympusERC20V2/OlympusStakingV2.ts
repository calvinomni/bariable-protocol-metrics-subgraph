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

export class OlympusStakingV2__epochResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    return map;
  }

  getLength(): BigInt {
    return this.value0;
  }

  getNumber(): BigInt {
    return this.value1;
  }

  getEndBlock(): BigInt {
    return this.value2;
  }

  getDistribute(): BigInt {
    return this.value3;
  }
}

export class OlympusStakingV2__warmupInfoResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: boolean;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: boolean) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromBoolean(this.value3));
    return map;
  }

  getDeposit(): BigInt {
    return this.value0;
  }

  getGons(): BigInt {
    return this.value1;
  }

  getExpiry(): BigInt {
    return this.value2;
  }

  getLock(): boolean {
    return this.value3;
  }
}

export class OlympusStakingV2 extends ethereum.SmartContract {
  static bind(address: Address): OlympusStakingV2 {
    return new OlympusStakingV2("OlympusStakingV2", address);
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

  contractBalance(): BigInt {
    let result = super.call(
      "contractBalance",
      "contractBalance():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_contractBalance(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "contractBalance",
      "contractBalance():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  distributor(): Address {
    let result = super.call("distributor", "distributor():(address)", []);

    return result[0].toAddress();
  }

  try_distributor(): ethereum.CallResult<Address> {
    let result = super.tryCall("distributor", "distributor():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  epoch(): OlympusStakingV2__epochResult {
    let result = super.call(
      "epoch",
      "epoch():(uint256,uint256,uint256,uint256)",
      []
    );

    return new OlympusStakingV2__epochResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }

  try_epoch(): ethereum.CallResult<OlympusStakingV2__epochResult> {
    let result = super.tryCall(
      "epoch",
      "epoch():(uint256,uint256,uint256,uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new OlympusStakingV2__epochResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt()
      )
    );
  }

  index(): BigInt {
    let result = super.call("index", "index():(uint256)", []);

    return result[0].toBigInt();
  }

  try_index(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("index", "index():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  locker(): Address {
    let result = super.call("locker", "locker():(address)", []);

    return result[0].toAddress();
  }

  try_locker(): ethereum.CallResult<Address> {
    let result = super.tryCall("locker", "locker():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

  sOHM(): Address {
    let result = super.call("sOHM", "sOHM():(address)", []);

    return result[0].toAddress();
  }

  try_sOHM(): ethereum.CallResult<Address> {
    let result = super.tryCall("sOHM", "sOHM():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  stake(_amount: BigInt, _recipient: Address): boolean {
    let result = super.call("stake", "stake(uint256,address):(bool)", [
      ethereum.Value.fromUnsignedBigInt(_amount),
      ethereum.Value.fromAddress(_recipient)
    ]);

    return result[0].toBoolean();
  }

  try_stake(
    _amount: BigInt,
    _recipient: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall("stake", "stake(uint256,address):(bool)", [
      ethereum.Value.fromUnsignedBigInt(_amount),
      ethereum.Value.fromAddress(_recipient)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  totalBonus(): BigInt {
    let result = super.call("totalBonus", "totalBonus():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalBonus(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalBonus", "totalBonus():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  warmupContract(): Address {
    let result = super.call("warmupContract", "warmupContract():(address)", []);

    return result[0].toAddress();
  }

  try_warmupContract(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "warmupContract",
      "warmupContract():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  warmupInfo(param0: Address): OlympusStakingV2__warmupInfoResult {
    let result = super.call(
      "warmupInfo",
      "warmupInfo(address):(uint256,uint256,uint256,bool)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new OlympusStakingV2__warmupInfoResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBoolean()
    );
  }

  try_warmupInfo(
    param0: Address
  ): ethereum.CallResult<OlympusStakingV2__warmupInfoResult> {
    let result = super.tryCall(
      "warmupInfo",
      "warmupInfo(address):(uint256,uint256,uint256,bool)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new OlympusStakingV2__warmupInfoResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBoolean()
      )
    );
  }

  warmupPeriod(): BigInt {
    let result = super.call("warmupPeriod", "warmupPeriod():(uint256)", []);

    return result[0].toBigInt();
  }

  try_warmupPeriod(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("warmupPeriod", "warmupPeriod():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  get _sOHM(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _epochLength(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _firstEpochNumber(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _firstEpochBlock(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ClaimCall extends ethereum.Call {
  get inputs(): ClaimCall__Inputs {
    return new ClaimCall__Inputs(this);
  }

  get outputs(): ClaimCall__Outputs {
    return new ClaimCall__Outputs(this);
  }
}

export class ClaimCall__Inputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }

  get _recipient(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ClaimCall__Outputs {
  _call: ClaimCall;

  constructor(call: ClaimCall) {
    this._call = call;
  }
}

export class ForfeitCall extends ethereum.Call {
  get inputs(): ForfeitCall__Inputs {
    return new ForfeitCall__Inputs(this);
  }

  get outputs(): ForfeitCall__Outputs {
    return new ForfeitCall__Outputs(this);
  }
}

export class ForfeitCall__Inputs {
  _call: ForfeitCall;

  constructor(call: ForfeitCall) {
    this._call = call;
  }
}

export class ForfeitCall__Outputs {
  _call: ForfeitCall;

  constructor(call: ForfeitCall) {
    this._call = call;
  }
}

export class GiveLockBonusCall extends ethereum.Call {
  get inputs(): GiveLockBonusCall__Inputs {
    return new GiveLockBonusCall__Inputs(this);
  }

  get outputs(): GiveLockBonusCall__Outputs {
    return new GiveLockBonusCall__Outputs(this);
  }
}

export class GiveLockBonusCall__Inputs {
  _call: GiveLockBonusCall;

  constructor(call: GiveLockBonusCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class GiveLockBonusCall__Outputs {
  _call: GiveLockBonusCall;

  constructor(call: GiveLockBonusCall) {
    this._call = call;
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

export class RebaseCall extends ethereum.Call {
  get inputs(): RebaseCall__Inputs {
    return new RebaseCall__Inputs(this);
  }

  get outputs(): RebaseCall__Outputs {
    return new RebaseCall__Outputs(this);
  }
}

export class RebaseCall__Inputs {
  _call: RebaseCall;

  constructor(call: RebaseCall) {
    this._call = call;
  }
}

export class RebaseCall__Outputs {
  _call: RebaseCall;

  constructor(call: RebaseCall) {
    this._call = call;
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

export class ReturnLockBonusCall extends ethereum.Call {
  get inputs(): ReturnLockBonusCall__Inputs {
    return new ReturnLockBonusCall__Inputs(this);
  }

  get outputs(): ReturnLockBonusCall__Outputs {
    return new ReturnLockBonusCall__Outputs(this);
  }
}

export class ReturnLockBonusCall__Inputs {
  _call: ReturnLockBonusCall;

  constructor(call: ReturnLockBonusCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ReturnLockBonusCall__Outputs {
  _call: ReturnLockBonusCall;

  constructor(call: ReturnLockBonusCall) {
    this._call = call;
  }
}

export class SetContractCall extends ethereum.Call {
  get inputs(): SetContractCall__Inputs {
    return new SetContractCall__Inputs(this);
  }

  get outputs(): SetContractCall__Outputs {
    return new SetContractCall__Outputs(this);
  }
}

export class SetContractCall__Inputs {
  _call: SetContractCall;

  constructor(call: SetContractCall) {
    this._call = call;
  }

  get _contract(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get _address(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class SetContractCall__Outputs {
  _call: SetContractCall;

  constructor(call: SetContractCall) {
    this._call = call;
  }
}

export class SetWarmupCall extends ethereum.Call {
  get inputs(): SetWarmupCall__Inputs {
    return new SetWarmupCall__Inputs(this);
  }

  get outputs(): SetWarmupCall__Outputs {
    return new SetWarmupCall__Outputs(this);
  }
}

export class SetWarmupCall__Inputs {
  _call: SetWarmupCall;

  constructor(call: SetWarmupCall) {
    this._call = call;
  }

  get _warmupPeriod(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetWarmupCall__Outputs {
  _call: SetWarmupCall;

  constructor(call: SetWarmupCall) {
    this._call = call;
  }
}

export class StakeCall extends ethereum.Call {
  get inputs(): StakeCall__Inputs {
    return new StakeCall__Inputs(this);
  }

  get outputs(): StakeCall__Outputs {
    return new StakeCall__Outputs(this);
  }
}

export class StakeCall__Inputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _recipient(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class StakeCall__Outputs {
  _call: StakeCall;

  constructor(call: StakeCall) {
    this._call = call;
  }

  get value0(): boolean {
    return this._call.outputValues[0].value.toBoolean();
  }
}

export class ToggleDepositLockCall extends ethereum.Call {
  get inputs(): ToggleDepositLockCall__Inputs {
    return new ToggleDepositLockCall__Inputs(this);
  }

  get outputs(): ToggleDepositLockCall__Outputs {
    return new ToggleDepositLockCall__Outputs(this);
  }
}

export class ToggleDepositLockCall__Inputs {
  _call: ToggleDepositLockCall;

  constructor(call: ToggleDepositLockCall) {
    this._call = call;
  }
}

export class ToggleDepositLockCall__Outputs {
  _call: ToggleDepositLockCall;

  constructor(call: ToggleDepositLockCall) {
    this._call = call;
  }
}

export class UnstakeCall extends ethereum.Call {
  get inputs(): UnstakeCall__Inputs {
    return new UnstakeCall__Inputs(this);
  }

  get outputs(): UnstakeCall__Outputs {
    return new UnstakeCall__Outputs(this);
  }
}

export class UnstakeCall__Inputs {
  _call: UnstakeCall;

  constructor(call: UnstakeCall) {
    this._call = call;
  }

  get _amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _trigger(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class UnstakeCall__Outputs {
  _call: UnstakeCall;

  constructor(call: UnstakeCall) {
    this._call = call;
  }
}
