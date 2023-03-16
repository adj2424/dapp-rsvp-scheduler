import {
  NewCheckIn as NewCheckInEvent,
  NewEvent as NewEventEvent,
  NewRsvp as NewRsvpEvent,
  Withdraw as WithdrawEvent
} from "../generated/Contract/Contract"
import { NewCheckIn, NewEvent, NewRsvp, Withdraw } from "../generated/schema"

export function handleNewCheckIn(event: NewCheckInEvent): void {
  let entity = new NewCheckIn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.personAddress = event.params.personAddress
  entity.id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewEvent(event: NewEventEvent): void {
  let entity = new NewEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.eventName = event.params.eventName
  entity.eventDate = event.params.eventDate
  entity.capacity = event.params.capacity
  entity.deposit = event.params.deposit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewRsvp(event: NewRsvpEvent): void {
  let entity = new NewRsvp(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.name = event.params.name
  entity.personAddress = event.params.personAddress
  entity.id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdraw(event: WithdrawEvent): void {
  let entity = new Withdraw(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.personAddress = event.params.personAddress
  entity.id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
