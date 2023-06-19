import { getColonies, getColoniesInventory, getFacilities, getFacilitiesInventory, getPirateInventory, postPirate_Inventory, putColony_Inventory, putFacility_Inventory, putPirate_Inventory, setLastLocationRaided, getPirates, getGovernors, putGovernor, setLastGovernorKilled } from '../api/dataaccess.js'


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
            //should change below value to start raid. True for testing only
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
    let pirateInventory = getPirateInventory();
    let piratePlunder = []

    if (coinFlip()) {
        const colonies = getColonies();
        const coloniesInventory = getColoniesInventory();
        const randomColonyIndex = Math.floor(Math.random() * colonies.length)

        const targetColony = colonies[randomColonyIndex];

        setLastLocationRaided(targetColony.name);
        console.log(`Raided ${targetColony.name}`);

        let targetColonyInventory = [];
        for (const inventory of coloniesInventory) {
            if (inventory.colony_id === targetColony.id) {
                targetColonyInventory.push(inventory);
            }
        }

        for (const inventory of targetColonyInventory) {
            piratePlunder.push(
                {
                    mineral_id: inventory.mineral_id,
                    pirate_stock: Math.floor(inventory.colony_stock / 2)
                }
            )
            inventory.colony_stock = Math.floor(inventory.colony_stock / 2);
        }

        for (const inventory of targetColonyInventory) {
            putColony_Inventory(inventory, inventory.id);
        }

        const randomRoll = Math.ceil(Math.random * 10)

        if (randomRoll > 7) {
            const governors = getGovernors();

            let foundGovernor = governors.find(governor => governor.colony_id === targetColony.id)

            let newGovObj = {
                id: foundGovernor.id,
                name: foundGovernor.name,
                colony_id: foundGovernor.colony_id,
                is_active: false,
                is_alive: false,
            }
            setLastGovernorKilled(newGovObj.name);
            console.log(`${foundGovernor.name} was killed!`)
            putGovernor(newGovObj, newGovObj.id)
        }
    } else {
        const facilities = getFacilities();
        const facilitiesInventory = getFacilitiesInventory();
        const randomFacilityIndex = Math.floor(Math.random() * facilities.length)

        const targetFacility = facilities[randomFacilityIndex];

        setLastLocationRaided(targetFacility.name);
        console.log(`Raided ${targetFacility.name}`);

        let targetFacilityInventory = [];
        for (const inventory of facilitiesInventory) {
            if (inventory.facility_id === targetFacility.id) {
                targetFacilityInventory.push(inventory);
            }
        }

        for (const inventory of targetFacilityInventory) {
            piratePlunder.push(
                {
                    mineral_id: inventory.mineral_id,
                    pirate_stock: Math.floor(inventory.facility_stock / 2)
                }
            )

            inventory.facility_stock = Math.floor(inventory.facility_stock / 2);
        }

        for (const inventory of targetFacilityInventory) {
            putFacility_Inventory(inventory, inventory.id);
        }
    }
    for (const plunder of piratePlunder) {
        let foundInventory = pirateInventory.find(inventory => inventory.mineral_id === plunder.mineral_id)
        if (foundInventory) {
            plunder.pirate_stock += foundInventory.pirate_stock
            putPirate_Inventory(plunder, foundInventory.id)
        } else {
            postPirate_Inventory(plunder);
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

//write a function that will get and update/add random amount of pirate raiders to pirate object. Will be determined by amount of turns take. Likely need to implement this functionality at a later point. Use putPirates function to do so.

const addPirateRaiders = () => {
    const pirates = getPirates()

    return pirates[0].raider_stock
}


//write a function that makes a visual representation of the pirate ship using an image. Below that, it should pull in the pirate inventory and generates an html representation of it (total minerals combined and pirate raider count)

export const Pirates = () => {

    const pirateInventory = getPirateInventory()

    let html = ''

    //set up pirate container and pirate ship image html

    html += `<div id="pirate-container" class="flex-container">`

    html += `<img id="pirate-ship-image" class="image" src="/images/pirate-ship.png" alt="EVIL SPACE PIRATES">`

    //add pirates border container and heading

    html += `<div id="pirate-text-container"> <h1 id="pirate-header">Pirates</h1>`

    //set up pirate resource container and pirate resource html representation. Will container total minerals and raider count, along with function to add raiders to count

    html += `<div id="pirate-resources-container-all" class="flex-container">`

    //write function to get all pirate-inventory objects, total the stock, and return that number
    const totalPirateInventoryStock = () => {
        let stockTotal = 0
        for (const inv of pirateInventory) {
            stockTotal += inv.pirate_stock
        }
        return stockTotal
    }

    //put above function into html representation

    html += `<div id="pirate-mineral-container" class="flex container pirate-resource-container"><h3 class="pirate-resource-heading">Minerals</h3><p id="pirate-mineral-total" class="pirate-resource-paragraph">${totalPirateInventoryStock()}</p></div>`

    //take function that generates total pirate raider count and puts it into html representation

    html += `<div id="pirate-raider-container" class="flex container pirate-resource-container"><h3 class="pirate-resource-heading">Raiders</h3><p id="pirate-raider-total" class="pirate-resource-paragraph">${addPirateRaiders()}</p></div>`

    //set up end of pirate-text-container div

    html += `</div>`

    //set up end of pirate-resource-container div

    html += `</div>`

    //set up end of pirate-container div

    html += `</div>`

    return html
}

