// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Test {
    struct Event {
        uint32 id;
        string eventName;
        address eventCreator;
        uint256 eventDate;
        uint32 capacity;
        uint32 deposit;
        Person[] rsvp;
        //Person[] attendees;
    }

    struct Person {
        string name;
        address personAddress;
        bool checkedIn;
    }

    uint32 eventID = 0;

    // each event has an id
    mapping(uint32 => Event) public events;

    function createEvent(
        string memory eventName,
        address eventCreator,
        uint256 eventDate,
        uint32 capacity,
        uint32 deposit
    ) external {
        // set to external because it cannot be accessed internally, only externally to save gass
        Person[] memory rsvpList;
        Event memory e = Event({
            id: eventID,
            eventName: eventName,
            eventCreator: eventCreator,
            eventDate: eventDate,
            capacity: capacity,
            deposit: deposit,
            rsvp: rsvpList
        });
        events[eventID] = e;
        eventID++;
    }

    // rsvp to an event by paying a small deposit
    function rsvp(string memory name, uint32 id) external payable {
        require(events[id].rsvp.length < events[id].capacity, "Event is full");
        require(events[id].eventDate > block.timestamp, "Event has passed");
        // enough ether sent
        require(msg.value == events[id].deposit, "Deposit is incorrect");
        Person memory person = Person({
            name: name,
            personAddress: msg.sender,
            checkedIn: false
        });
        events[id].rsvp.push(person);
    }

    // check in to an event and receive the deposit back
    function checkIn(address personAddress, uint32 id) public {
        require(
            events[id].eventDate < block.timestamp,
            "Event has not started"
        );
        for (uint32 i = 0; i < events[id].rsvp.length; i++) {
            // check if person is in the rsvp list and has not checked in
            if (
                events[id].rsvp[i].personAddress == personAddress &&
                !events[id].rsvp[i].checkedIn
            ) {
                events[id].rsvp[i].checkedIn = true;
                // transfer deposit from contract to person
                payable(personAddress).transfer(events[id].deposit);
            }
        }
    }

    function withdrawUnclaimed(uint32 id) public {
        require(
            block.timestamp > events[id].eventDate,
            "Withdraw after event!"
        );
        require(
            events[id].eventCreator == msg.sender,
            "Only creator can withdraw"
        );
        for (uint256 i = 0; i < events[id].rsvp.length; i++) {
            // cannot be checked in
            if (!events[id].rsvp[i].checkedIn) {
                // transfer deposit from contract to event ownder
                payable(events[id].rsvp[i].eventCreator).transfer(
                    events[id].deposit
                );
            }
        }
    }
}
