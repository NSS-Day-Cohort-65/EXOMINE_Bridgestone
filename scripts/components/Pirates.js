import { getColonies, getColoniesInventory, getFacilities, getFacilitiesInventory, getPirateInventory, postPirate_Inventory, putColony_Inventory, putFacility_Inventory, putPirate_Inventory, setLastLocationRaided, getPirates, getGovernors, putGovernor, setLastGovernorKilled, putPirates } from '../api/dataaccess.js'
import { isRaidSuccessful, reduceSecurityAfterRaid } from './Defense.js'
import { appSettings } from '../../appSettings.js'


//write a click even that increments turnCount by 1 everytime purchaseButton is clicked. Write function that fires after 3 turns (turncount hits 3) and adds 5 raiders to the pirate object, then returns the new value.
let settings = appSettings.pirates;

const MAX_PIRATES_TO_ADD_EACH_TURN = settings.MAX_PIRATES_TO_ADD_EACH_TURN
const MAX = settings.MAX
const GRACE_PERIOD = settings.GRACE_PERIOD
const FRACTION_OF_MINERALS_TO_TAKE = settings.FRACTION_OF_MINERALS_TO_TAKE
const PIRATES_TO_LOSE = settings.PIRATES_TO_LOSE
const CHANCE_OF_GOVERNOR_DEATH = settings.CHANCE_OF_GOVERNOR_DEATH

let turnCount = 0

document.addEventListener("click", e => {
    if (e.target.id === "purchaseButton") {
        turnCount++
        addPirateRaiders()
    }
})

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const addPirateRaiders = () => {
    const pirates = getPirates()
    let randomAmount = Math.ceil(Math.random() * MAX_PIRATES_TO_ADD_EACH_TURN);

    let newPirateObj = {
        id: pirates[0].id,
        raider_stock: pirates[0].raider_stock + randomAmount
    }

    putPirates(newPirateObj, pirates[0].id)
    console.log(`added ${randomAmount} raiders`)
}

const reduceRaidersAfterRaid = async () => {
    const pirates = getPirates()

    let randomAmount = Math.ceil(Math.random() * MAX_PIRATES_TO_ADD_EACH_TURN)
    let newObj = {
        id: pirates[0].id,
        raider_stock: Math.ceil(pirates[0].raider_stock * PIRATES_TO_LOSE) + randomAmount
    }
    await putPirates(newObj, pirates[0].id)
    console.log(`reduced raiders by ${PIRATES_TO_LOSE} then added ${randomAmount} raiders.`)

}




// increase this number to decrease difficulty


let raidCounter = 1

document.addEventListener(
    "click",
    e => {
        if (e.target.id === "purchaseButton") {
            let startRaid = false
            raidCounter++
            const pirates = getPirates()

            //increase or decrease raider_stock number below to control what the max number of raiders needs to be before a raid can occur

            if (pirates[0].raider_stock > 0) {

                if (raidCounter >= GRACE_PERIOD) {
                    startRaid = checkForRaid(raidCounter);
                }
                //should change below value to start raid. True for testing only
                if (startRaid) {
                    raid()
                }
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

const raid = async () => {
    let pirateInventory = getPirateInventory();
    let piratePlunder = []
    //import in whether or not a raid was successful from defense.js

    if (coinFlip()) {
        const colonies = getColonies();
        const coloniesInventory = getColoniesInventory();
        const randomColonyIndex = Math.floor(Math.random() * colonies.length)

        const targetColony = colonies[randomColonyIndex];

        setLastLocationRaided(targetColony.name);
        console.log(`Raided ${targetColony.name}`);

        //adding in logic to handle successful vs uncessful raids

        let successCheck = isRaidSuccessful()

        if (successCheck === true) {

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
                        pirate_stock: Math.floor(inventory.colony_stock * FRACTION_OF_MINERALS_TO_TAKE)
                    }
                )
                inventory.colony_stock = Math.floor(inventory.colony_stock * FRACTION_OF_MINERALS_TO_TAKE);
            }

            for (const inventory of targetColonyInventory) {
                await putColony_Inventory(inventory, inventory.id);
            }

            const randomRoll = Math.ceil(Math.random() * 10)

            if (randomRoll > CHANCE_OF_GOVERNOR_DEATH) {
                const governors = getGovernors();

                let foundGovernor = governors.find(governor => governor.colony_id === targetColony.id && governor.is_alive)

                let newGovObj = {
                    id: foundGovernor.id,
                    name: foundGovernor.name,
                    colony_id: foundGovernor.colony_id,
                    is_active: false,
                    is_alive: false,
                }
                setLastGovernorKilled(newGovObj.name);
                console.log(`${foundGovernor.name} was killed!`)
                await putGovernor(newGovObj, newGovObj.id)
            }
            await reduceSecurityAfterRaid()
            await reduceRaidersAfterRaid()
        } else {
            console.log("Colony was defended successfully!")
            await reduceSecurityAfterRaid()
            await reduceRaidersAfterRaid()
        }
    } else {
        const facilities = getFacilities();
        const facilitiesInventory = getFacilitiesInventory();
        const randomFacilityIndex = Math.floor(Math.random() * facilities.length)

        const targetFacility = facilities[randomFacilityIndex];

        setLastLocationRaided(targetFacility.name);
        console.log(`Raided ${targetFacility.name}`);

        //adding in logic to handle successful vs unsuccessful raids

        let successCheck = isRaidSuccessful()

        if (successCheck === true) {

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
                        pirate_stock: Math.floor(inventory.facility_stock * FRACTION_OF_MINERALS_TO_TAKE)
                    }
                )

                inventory.facility_stock = Math.floor(inventory.facility_stock * FRACTION_OF_MINERALS_TO_TAKE);
            }

            for (const inventory of targetFacilityInventory) {
                try {
                    await putFacility_Inventory(inventory, inventory.id);
                } catch (error) {
                    console.error('PUT request failed for facility inventory ID:', inventory.id);
                    console.error('Error:', error);
                    delay(1000);
                    try {
                        console.log('Retrying PUT request for facility inventory ID:', inventory.id)
                        await putFacility_Inventory(inventory, inventory.id);
                    } catch (error) {
                        console.error('Error', error)
                    }
                }
            }
            await reduceSecurityAfterRaid()
            await reduceRaidersAfterRaid()
        } else {
            console.log("Facility was defended successfully!")
            await reduceSecurityAfterRaid()
            await reduceRaidersAfterRaid()
        }
    }
    for (const plunder of piratePlunder) {
        let foundInventory = pirateInventory.find(inventory => inventory.mineral_id === plunder.mineral_id)
        if (foundInventory) {
            plunder.pirate_stock += foundInventory.pirate_stock
            await putPirate_Inventory(plunder, foundInventory.id)
        } else {
            await postPirate_Inventory(plunder);
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


//write a function that makes a visual representation of the pirate ship using an image. Below that, it should pull in the pirate inventory and generates an html representation of it (total minerals combined and pirate raider count)

export const Pirates = () => {

    const pirates = getPirates()

    const pirateInventory = getPirateInventory()

    let html = ''

    //set up pirate container

    //add pirates border container and heading

    html += `<div id="pirate-text-container"> <h1 id="pirate-header">Pirates 💀</h1>`

    // pirate ship image html

    html += `<img id="pirate-ship-image" class="image" src="/images/pirate-ship.png" alt="EVIL SPACE PIRATES">`

    //set up pirate resource container and pirate resource html representation. Will container total minerals and raider count, along with function to add raiders to count

    html += `<div id="pirate-resources-container-all" class="flex-container-pirate">`

    //write function to get all pirate-inventory objects, total the stock, and return that number
    const totalPirateInventoryStock = () => {
        let stockTotal = 0
        for (const inv of pirateInventory) {
            stockTotal += inv.pirate_stock
        }
        return stockTotal
    }

    //put above function into html representation

    html += `<div id="pirate-mineral-container" class="pirate-resource-container"><h3 class="pirate-resource-heading">Minerals</h3><p id="pirate-mineral-total" class="pirate-resource-paragraph">${totalPirateInventoryStock()}</p></div>`

    //take function that generates total pirate raider count and puts it into html representation

    html += `<div id="pirate-raider-container" class=" pirate-resource-container"><h3 class="pirate-resource-heading">Raiders</h3><p id="pirate-raider-total" class="pirate-resource-paragraph">${pirates[0].raider_stock}</p></div>`

    //set up end of pirate-text-container div

    html += `</div>`

    //set up end of pirate-resource-container div

    html += `</div>`

    return html
}

