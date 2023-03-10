// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Test {
    struct Event {
        uint32 id;
        string eventName;
        address eventCreator;
        uint256 eventDate;
        uint32 capacity;
        uint32 deposit;
        address[] rsvpAddress;
        bool[] rsvpCheckIn;
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

        // create event
        Event memory e = Event({
            id: eventID,
            eventName: eventName,
            eventCreator: eventCreator,
            eventDate: eventDate,
            capacity: capacity,
            deposit: deposit,
            rsvpAddress: new address[](0),
            rsvpCheckIn: new bool[](0)
        });
        events[eventID] = e;
        eventID++;
    }

    // rsvp to an event by paying a small deposit
    function rsvp(string memory name, uint32 id) external payable {
        require(
            events[eventID].rsvpAddress.length < events[id].capacity,
            "Event is full"
        );
        require(events[id].eventDate > block.timestamp, "Event has passed");
        // enough ether sent
        require(msg.value == events[id].deposit, "Deposit is incorrect");

        events[eventID].rsvpAddress.push(msg.sender);
        events[eventID].rsvpCheckIn.push(false);
    }

    // check in to an event and receive the deposit back
    function checkIn(address personAddress, uint32 id) external {
        require(
            events[id].eventDate < block.timestamp,
            "Event has not started"
        );
        for (uint32 i = 0; i < events[eventID].rsvpAddress.length; i++) {
            // check if person is in the rsvp list and has not checked in
            if (
                events[id].rsvpAddress[i] == personAddress &&
                !events[id].rsvpCheckIn[i]
            ) {
                events[id].rsvpCheckIn[i] = true;
                // transfer deposit from contract to person
                payable(personAddress).transfer(events[id].deposit);
            }
        }
    }

    function withdrawUnclaimed(uint32 id) external {
        require(
            block.timestamp > events[id].eventDate,
            "Withdraw after event!"
        );
        require(
            events[id].eventCreator == msg.sender,
            "Only creator can withdraw"
        );
        for (uint32 i = 0; i < events[eventID].rsvpAddress.length; i++) {
            // cannot be checked in
            if (!events[id].rsvpCheckIn[i]) {
                // transfer deposit from contract to event owner
                payable(events[id].eventCreator).transfer(events[id].deposit);
            }
        }
    }

    function getEvent(uint32 id) public view returns (Event memory) {
        return events[id];
    }

    function getEventsSize() public view returns (uint32) {
        return eventID;
    }
}
