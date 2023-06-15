import { getColonies, getColoniesInventory, getFacilities, putColony_Inventory } from '../api/dataaccess.js'


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
    if (true) {
        const colonies = getColonies();
        const coloniesInventory = getColoniesInventory();
        const randomColonyIndex = Math.floor(Math.random() * colonies.length)

        const targetColony = colonies[randomColonyIndex];

        let targetColonyInventory = []
        for (const inventory of coloniesInventory) {
            if (inventory.colony_id === targetColony.id) {
                targetColonyInventory.push(inventory);
            }
        }

        for (const inventory of targetColonyInventory) {
            inventory.colony_stock = inventory.colony_stock / 2
        }

        for (const inventory of targetColonyInventory) {
            putColony_Inventory(inventory, inventory.id)
        }
    } else {
        const facilities = getFacilities();
        const randomFacilityIndex = Math.floor(Math.random() * facilities.length)
    }


    raidCounter = 1
}

const checkForRaid = (turn) => {
    const randomRoll = Math.ceil(Math.random() * MAX)
    if (randomRoll < turn) {
        return true
    } else {
        return false
    };
}

export const Pirates = () => {
    return "<h2>Pirates</h2>"
}