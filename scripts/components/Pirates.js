import { getColonies, getColoniesInventory, getFacilities, getFacilitiesInventory, putColony_Inventory, putFacility_Inventory } from '../api/dataaccess.js'


// increase this number to decrease difficulty
const MAX = 10
const GRACE_PERIOD = 3

let raidCounter = 1

document.addEventListener(
    "click",
    e => {
        if (e.target.id === "purchaseButton") {
            let startRaid = false
            raidCounter++

            if (raidCounter >= GRACE_PERIOD) {
                startRaid = checkForRaid(raidCounter);
            }

            if (startRaid) {
                raid()
            }
        }
    }
)

const coinFlip = () => {
    let number = Math.random();
    if (number < 0.5) {
        return true
    } else {
        return false
    }
}

const raid = () => {
    if (coinFlip()) {
        const colonies = getColonies();
        const coloniesInventory = getColoniesInventory();
        const randomColonyIndex = Math.floor(Math.random() * colonies.length)

        const targetColony = colonies[randomColonyIndex];

        let targetColonyInventory = [];
        for (const inventory of coloniesInventory) {
            if (inventory.colony_id === targetColony.id) {
                targetColonyInventory.push(inventory);
            }
        }

        for (const inventory of targetColonyInventory) {
            inventory.colony_stock = Math.floor(inventory.colony_stock / 2);
        }

        for (const inventory of targetColonyInventory) {
            putColony_Inventory(inventory, inventory.id);
        }
    } else {
        const facilities = getFacilities();
        const facilitiesInventory = getFacilitiesInventory();
        const randomFacilityIndex = Math.floor(Math.random() * facilities.length)

        const targetFacility = facilities[randomFacilityIndex];

        let targetFacilityInventory = [];
        for (const inventory of facilitiesInventory) {
            if (inventory.facility_id === targetFacility.id) {
                targetFacilityInventory.push(inventory);
            }
        }

        for (const inventory of targetFacilityInventory) {
            inventory.facility_stock = Math.floor(inventory.facility_stock / 2);
        }

        for (const inventory of targetFacilityInventory) {
            putFacility_Inventory(inventory, inventory.id);
        }
    }

    raidCounter = 1
    document.dispatchEvent(new CustomEvent("startRaid"))
}

const checkForRaid = (turn) => {
    const randomRoll = Math.ceil(Math.random() * MAX)
    if (randomRoll <= turn) {
        return true
    } else {
        return false
    };
}

export const Pirates = () => {
    return "<h2>Pirates</h2>"
}