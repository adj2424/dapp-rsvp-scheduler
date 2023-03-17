import { Address, ipfs, json } from '@graphprotocol/graph-ts';
import {
	NewCheckIn as CheckInEvent,
	NewEvent as EventEvent,
	NewRsvp as RsvpEvent
} from '../generated/Contract/Contract';
import { CheckIn, Event, RSVP } from '../generated/schema';
import { integer } from '@protofire/subgraph-toolkit';

export function handleEvent(event: EventEvent): void {
	// check if event exist
	let id = event.params.id.toString();
}

export function handleCheckIn(event: CheckInEvent): void {}

export function handleRsvp(event: RsvpEvent): void {}
