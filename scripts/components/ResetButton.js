import { deleteColonyInventory, deletePirateInventory, getColoniesInventory, getFacilitiesInventory, getGovernors, getPirateInventory, getPirates, putColony_Inventory, putFacility_Inventory, putGovernor, putPirates, resetState } from "../api/dataaccess.js"


/* write a function that will send a put request to everything in the database to reset to default values. This should be broken  down into smaller functions. Must:

-delete any extra colony inventory objects past the default id number
-delete any added governor objects past the default id number
-delete all pirate inventory
-reset facilty mineral counts to fixed values
-reset colony mineral counts to fixed values
-revive any dead governors by reseting is_alive value to true
-reset pirate raider count to 0

*/

const deleteExtraColonyInventory = () => {
    const colonyInv = getColoniesInventory()

    for (const colInv of colonyInv) {
        if (colInv.id > 20) {
            deleteColonyInventory(colInv.id)
        }
    }
}

const resetGovernors = () => {
    const governors = getGovernors()

    for (const gov of governors) {
        if (gov.id > 10) {
            let newObj = {
                id: gov.id,
                name: gov.name,
                colony_id: gov.colony_id,
                is_active: false,
                is_alive: true
            }
            putGovernor(newObj, gov.id)
        } else {
            let newObj = {
                id: gov.id,
                name: gov.name,
                colony_id: gov.colony_id,
                is_active: true,
                is_alive: true
            }
            putGovernor(newObj, gov.id)
        }
    }
}

const deleteAllPirateInventory = () => {
    const pirateInv = getPirateInventory()
    if (pirateInv.length >= 1) {
        for (const pirInv of pirateInv) {
            deletePirateInventory(pirInv.id)
        }
    }
}

const resetFacilityMinerals = () => {
    const facilityInv = getFacilitiesInventory()

    for (const facInv of facilityInv) {
        let newObj = {
            id: facInv.id,
            facility_id: facInv.facility_id,
            mineral_id: facInv.mineral_id,
            facility_stock: 300
        }

        putFacility_Inventory(newObj, facInv.id)
    }
}

const resetColonyMinerals = () => {
    const colonyInv = getColoniesInventory()
    if (colonyInv.length >= 1) {
        for (const colInv of colonyInv) {
            let newObj = {
                id: colInv.id,
                colony_id: colInv.colony_id,
                mineral_id: colInv.mineral_id,
                colony_stock: 200
            }

            putColony_Inventory(newObj, colInv.id)
        }
    }
}

const resetRaiderCount = () => {
    const pirates = getPirates()

    for (const pirate of pirates) {
        let newObj = {
            id: pirate.id,
            raider_stock: 0
        }
        putPirates(newObj, pirate.id)
    }
}

const resetAll = () => {
    resetColonyMinerals()
    resetFacilityMinerals()
    resetGovernors()
    resetRaiderCount()
    deleteExtraColonyInventory()
    deleteAllPirateInventory()
    resetState()
}

document.addEventListener("click", e => {
    if (e.target.id === "resetButton") {
        resetAll()
    }
})

export const generateResetButtonHTML = () => {
    let html = `<button id="resetButton">Reset</button>`

    return html
}