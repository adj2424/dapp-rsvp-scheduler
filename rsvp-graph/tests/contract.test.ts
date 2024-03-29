import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { NewCheckIn } from "../generated/schema"
import { NewCheckIn as NewCheckInEvent } from "../generated/Contract/Contract"
import { handleNewCheckIn } from "../src/contract"
import { createNewCheckInEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let personAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let id = BigInt.fromI32(234)
    let newNewCheckInEvent = createNewCheckInEvent(personAddress, id)
    handleNewCheckIn(newNewCheckInEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("NewCheckIn created and stored", () => {
    assert.entityCount("NewCheckIn", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "NewCheckIn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "personAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
