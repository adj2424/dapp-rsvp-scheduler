import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  NewCheckIn,
  NewEvent,
  NewRsvp,
  Withdraw
} from "../generated/Contract/Contract"

export function createNewCheckInEvent(
  personAddress: Address,
  id: BigInt
): NewCheckIn {
  let newCheckInEvent = changetype<NewCheckIn>(newMockEvent())

  newCheckInEvent.parameters = new Array()

  newCheckInEvent.parameters.push(
    new ethereum.EventParam(
      "personAddress",
      ethereum.Value.fromAddress(personAddress)
    )
  )
  newCheckInEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return newCheckInEvent
}

export function createNewEventEvent(
  eventName: string,
  eventDate: BigInt,
  capacity: BigInt,
  deposit: BigInt,
  id: BigInt
): NewEvent {
  let newEventEvent = changetype<NewEvent>(newMockEvent())

  newEventEvent.parameters = new Array()

  newEventEvent.parameters.push(
    new ethereum.EventParam("eventName", ethereum.Value.fromString(eventName))
  )
  newEventEvent.parameters.push(
    new ethereum.EventParam(
      "eventDate",
      ethereum.Value.fromUnsignedBigInt(eventDate)
    )
  )
  newEventEvent.parameters.push(
    new ethereum.EventParam(
      "capacity",
      ethereum.Value.fromUnsignedBigInt(capacity)
    )
  )
  newEventEvent.parameters.push(
    new ethereum.EventParam(
      "deposit",
      ethereum.Value.fromUnsignedBigInt(deposit)
    )
  )
  newEventEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return newEventEvent
}

export function createNewRsvpEvent(
  name: string,
  personAddress: Address,
  id: BigInt
): NewRsvp {
  let newRsvpEvent = changetype<NewRsvp>(newMockEvent())

  newRsvpEvent.parameters = new Array()

  newRsvpEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  newRsvpEvent.parameters.push(
    new ethereum.EventParam(
      "personAddress",
      ethereum.Value.fromAddress(personAddress)
    )
  )
  newRsvpEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return newRsvpEvent
}

export function createWithdrawEvent(
  personAddress: Address,
  id: BigInt
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "personAddress",
      ethereum.Value.fromAddress(personAddress)
    )
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return withdrawEvent
}
