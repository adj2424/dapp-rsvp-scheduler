import { Address, ipfs, json } from '@graphprotocol/graph-ts';
import {
	NewCheckIn as CheckInEvent,
	NewEvent as EventEvent,
	NewRsvp as RsvpEvent
} from '../generated/Contract/Contract';
import { CheckIn, Event, RSVP } from '../generated/schema';
import { integer } from '@protofire/subgraph-toolkit';

// when an event is fired in sol, the newEvent creation is handled here
// we must set the graphql schema to match the event params
// why? idk
export function handleEvent(event: EventEvent): void {
	let id = event.params.id.toHex();
	// check if event exist
	let newEvent = Event.load(id);
	if (newEvent == null) {
		newEvent = new Event(id);
		newEvent.eventID = event.params.id;
		newEvent.eventName = event.params.eventName;
		newEvent.eventDate = event.params.eventDate;
		//newEvent.eventOwner =
	}
}

export function handleCheckIn(event: CheckInEvent): void {}

export function handleRsvp(event: RsvpEvent): void {}
