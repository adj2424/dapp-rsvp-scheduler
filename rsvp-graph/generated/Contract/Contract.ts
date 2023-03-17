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

export class NewCheckIn extends ethereum.Event {
  get params(): NewCheckIn__Params {
    return new NewCheckIn__Params(this);
  }
}

export class NewCheckIn__Params {
  _event: NewCheckIn;

  constructor(event: NewCheckIn) {
    this._event = event;
  }

  get personAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class NewEvent extends ethereum.Event {
  get params(): NewEvent__Params {
    return new NewEvent__Params(this);
  }
}

export class NewEvent__Params {
  _event: NewEvent;

  constructor(event: NewEvent) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get personAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get eventName(): string {
    return this._event.parameters[2].value.toString();
  }

  get eventDate(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get capacity(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get deposit(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class NewRsvp extends ethereum.Event {
  get params(): NewRsvp__Params {
    return new NewRsvp__Params(this);
  }
}

export class NewRsvp__Params {
  _event: NewRsvp;

  constructor(event: NewRsvp) {
    this._event = event;
  }

  get name(): string {
    return this._event.parameters[0].value.toString();
  }

  get personAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get id(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Withdraw extends ethereum.Event {
  get params(): Withdraw__Params {
    return new Withdraw__Params(this);
  }
}

export class Withdraw__Params {
  _event: Withdraw;

  constructor(event: Withdraw) {
    this._event = event;
  }

  get personAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Contract__eventsResult {
  value0: BigInt;
  value1: string;
  value2: Address;
  value3: BigInt;
  value4: BigInt;
  value5: BigInt;

  constructor(
    value0: BigInt,
    value1: string,
    value2: Address,
    value3: BigInt,
    value4: BigInt,
    value5: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    return map;
  }

  getId(): BigInt {
    return this.value0;
  }

  getEventName(): string {
    return this.value1;
  }

  getEventCreator(): Address {
    return this.value2;
  }

  getEventDate(): BigInt {
    return this.value3;
  }

  getCapacity(): BigInt {
    return this.value4;
  }

  getDeposit(): BigInt {
    return this.value5;
  }
}

export class Contract__getEventResultValue0Struct extends ethereum.Tuple {
  get id(): BigInt {
    return this[0].toBigInt();
  }

  get eventName(): string {
    return this[1].toString();
  }

  get eventCreator(): Address {
    return this[2].toAddress();
  }

  get eventDate(): BigInt {
    return this[3].toBigInt();
  }

  get capacity(): BigInt {
    return this[4].toBigInt();
  }

  get deposit(): BigInt {
    return this[5].toBigInt();
  }

  get rsvpName(): Array<string> {
    return this[6].toStringArray();
  }

  get rsvpAddress(): Array<Address> {
    return this[7].toAddressArray();
  }

  get rsvpCheckIn(): Array<boolean> {
    return this[8].toBooleanArray();
  }
}

export class Contract extends ethereum.SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  events(param0: BigInt): Contract__eventsResult {
    let result = super.call(
      "events",
      "events(uint32):(uint32,string,address,uint256,uint32,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new Contract__eventsResult(
      result[0].toBigInt(),
      result[1].toString(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toBigInt()
    );
  }

  try_events(param0: BigInt): ethereum.CallResult<Contract__eventsResult> {
    let result = super.tryCall(
      "events",
      "events(uint32):(uint32,string,address,uint256,uint32,uint256)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Contract__eventsResult(
        value[0].toBigInt(),
        value[1].toString(),
        value[2].toAddress(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toBigInt()
      )
    );
  }

  getEvent(id: BigInt): Contract__getEventResultValue0Struct {
    let result = super.call(
      "getEvent",
      "getEvent(uint32):((uint32,string,address,uint256,uint32,uint256,string[],address[],bool[]))",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );

    return changetype<Contract__getEventResultValue0Struct>(
      result[0].toTuple()
    );
  }

  try_getEvent(
    id: BigInt
  ): ethereum.CallResult<Contract__getEventResultValue0Struct> {
    let result = super.tryCall(
      "getEvent",
      "getEvent(uint32):((uint32,string,address,uint256,uint32,uint256,string[],address[],bool[]))",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<Contract__getEventResultValue0Struct>(value[0].toTuple())
    );
  }

  getEventsSize(): BigInt {
    let result = super.call("getEventsSize", "getEventsSize():(uint32)", []);

    return result[0].toBigInt();
  }

  try_getEventsSize(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getEventsSize", "getEventsSize():(uint32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class CheckInCall extends ethereum.Call {
  get inputs(): CheckInCall__Inputs {
    return new CheckInCall__Inputs(this);
  }

  get outputs(): CheckInCall__Outputs {
    return new CheckInCall__Outputs(this);
  }
}

export class CheckInCall__Inputs {
  _call: CheckInCall;

  constructor(call: CheckInCall) {
    this._call = call;
  }

  get personAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get id(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CheckInCall__Outputs {
  _call: CheckInCall;

  constructor(call: CheckInCall) {
    this._call = call;
  }
}

export class CreateEventCall extends ethereum.Call {
  get inputs(): CreateEventCall__Inputs {
    return new CreateEventCall__Inputs(this);
  }

  get outputs(): CreateEventCall__Outputs {
    return new CreateEventCall__Outputs(this);
  }
}

export class CreateEventCall__Inputs {
  _call: CreateEventCall;

  constructor(call: CreateEventCall) {
    this._call = call;
  }

  get eventName(): string {
    return this._call.inputValues[0].value.toString();
  }

  get eventDate(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get capacity(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get deposit(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }
}

export class CreateEventCall__Outputs {
  _call: CreateEventCall;

  constructor(call: CreateEventCall) {
    this._call = call;
  }
}

export class RsvpCall extends ethereum.Call {
  get inputs(): RsvpCall__Inputs {
    return new RsvpCall__Inputs(this);
  }

  get outputs(): RsvpCall__Outputs {
    return new RsvpCall__Outputs(this);
  }
}

export class RsvpCall__Inputs {
  _call: RsvpCall;

  constructor(call: RsvpCall) {
    this._call = call;
  }

  get name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get id(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class RsvpCall__Outputs {
  _call: RsvpCall;

  constructor(call: RsvpCall) {
    this._call = call;
  }
}

export class WithdrawUnclaimedCall extends ethereum.Call {
  get inputs(): WithdrawUnclaimedCall__Inputs {
    return new WithdrawUnclaimedCall__Inputs(this);
  }

  get outputs(): WithdrawUnclaimedCall__Outputs {
    return new WithdrawUnclaimedCall__Outputs(this);
  }
}

export class WithdrawUnclaimedCall__Inputs {
  _call: WithdrawUnclaimedCall;

  constructor(call: WithdrawUnclaimedCall) {
    this._call = call;
  }

  get id(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class WithdrawUnclaimedCall__Outputs {
  _call: WithdrawUnclaimedCall;

  constructor(call: WithdrawUnclaimedCall) {
    this._call = call;
  }
}
