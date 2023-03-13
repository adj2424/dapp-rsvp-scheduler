// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Test {
    event NewEvent(
        string eventName,
        uint256 eventDate,
        uint32 capacity,
        uint256 deposit
    );

    event NewRsvp(string name, address personAddress, uint32 id);

    event NewCheckIn(address personAddress, uint32 id);

    event Withdraw(address personAddress, uint32 id);

    struct Event {
        uint32 id;
        string eventName;
        address eventCreator;
        uint256 eventDate;
        uint32 capacity;
        uint256 deposit;
        // rather than another struct to store, just use multiple arrays
        string[] rsvpName;
        address[] rsvpAddress;
        bool[] rsvpCheckIn;
    }

    uint32 eventID = 0;

    // each event has an id
    mapping(uint32 => Event) public events;

    function createEvent(
        string memory eventName,
        uint256 eventDate,
        uint32 capacity,
        uint256 deposit
    ) external {
        // set to external because it cannot be accessed internally, only externally to save gass

        // create event
        Event memory e = Event({
            id: eventID,
            eventName: eventName,
            eventCreator: msg.sender,
            eventDate: eventDate,
            capacity: capacity,
            deposit: deposit,
            rsvpName: new string[](0),
            rsvpAddress: new address[](0),
            rsvpCheckIn: new bool[](0)
        });
        events[eventID] = e;
        eventID++;

        emit NewEvent(eventName, eventDate, capacity, deposit);
    }

    // rsvp to an event by paying a small deposit
    function rsvp(string memory name, uint32 id) external payable {
        require(
            events[id].rsvpAddress.length < events[id].capacity,
            "Event is full"
        );
        require(events[id].eventDate > block.timestamp, "Event has passed");
        // enough ether sent
        require(msg.value == events[id].deposit, "Deposit is incorrect");

        events[id].rsvpName.push(name);
        events[id].rsvpAddress.push(msg.sender);
        events[id].rsvpCheckIn.push(false);

        emit NewRsvp(name, msg.sender, id);
    }

    // check in to an event and receive the deposit back
    function checkIn(address personAddress, uint32 id) external {
        require(
            events[id].eventDate < block.timestamp,
            "Event has not started"
        );
        for (uint32 i = 0; i < events[id].rsvpAddress.length; i++) {
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
        emit NewCheckIn(personAddress, id);
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
        for (uint32 i = 0; i < events[id].rsvpAddress.length; i++) {
            // cannot be checked in
            if (!events[id].rsvpCheckIn[i]) {
                // transfer deposit from contract to event owner
                payable(events[id].eventCreator).transfer(events[id].deposit);
            }
        }
        emit Withdraw(msg.sender, id);
    }

    function getEvent(uint32 id) public view returns (Event memory) {
        return events[id];
    }

    function getEventsSize() public view returns (uint32) {
        return eventID;
    }
}
