import { Address, BigInt, ipfs, json } from '@graphprotocol/graph-ts';
import {
	NewCheckIn as CheckInEvent,
	NewEvent as EventEvent,
	NewRsvp as RsvpEvent,
	Withdraw
} from '../generated/Contract/Contract';
import { CheckIn, Event, RSVP } from '../generated/schema';
import { integer } from '@protofire/subgraph-toolkit';

// when an event is fired in sol, the newEvent creation is handled here
// we must set the graphql schema to match the event params
// why? idk
export function handleEvent(event: EventEvent): void {
	const id = event.params.id.toHex();
	// check if event exist
	let newEvent = Event.load(id);
	if (newEvent == null) {
		newEvent = new Event(id);
		newEvent.eventID = event.params.id;
		newEvent.eventName = event.params.eventName;
		newEvent.eventDate = event.params.eventDate;
		newEvent.eventOwner = event.params.personAddress;
		newEvent.capacity = event.params.capacity;
		newEvent.deposit = event.params.deposit;
		newEvent.paidOut = false;
		newEvent.totalRSVP = integer.ZERO; // sus
		newEvent.totalCheckIn = integer.ZERO;
		newEvent.save();
		// optional tags will in ipfs somehow
	}
}

export function handleRsvp(event: RsvpEvent): void {
	const id = event.params.id.toHex() + '-' + event.params.personAddress.toHex();
	let newRsvp = RSVP.load(id);
	let thisEvent = Event.load(event.params.id.toHex());
	// check if event exist and you haven't rsvp'd yet
	if (newRsvp == null && thisEvent != null) {
		newRsvp = new RSVP(id);
		newRsvp.id = event.params.personAddress.toHex();
		newRsvp.event = thisEvent.id;
		newRsvp.save();
		// update event total rsvp
		thisEvent.totalRSVP = thisEvent.totalRSVP.plus(integer.ONE);
		thisEvent.save();
	}
}

export function handleCheckIn(event: CheckInEvent): void {
	const id = event.params.id.toHex() + '-' + event.params.personAddress.toHex();
	let newCheckIn = CheckIn.load(id);
	let thisEvent = Event.load(event.params.id.toHex());
	// check if event exist and you have not checked in
	if (newCheckIn == null && thisEvent != null) {
		newCheckIn = new CheckIn(id);
		newCheckIn.id = event.params.personAddress.toHex();
		newCheckIn.event = thisEvent.id;
		newCheckIn.save();
		// update event total check in
		thisEvent.totalCheckIn = thisEvent.totalCheckIn.plus(integer.ONE);
		thisEvent.save();
	}
}

export function handleWithdraw(event: Withdraw): void {
	const id = event.params.personAddress.toHex();
	let thisEvent = Event.load(event.params.id.toHex());
	// check if event exist
	if (thisEvent != null) {
		thisEvent.paidOut = true;
		thisEvent.save();
	}
}
