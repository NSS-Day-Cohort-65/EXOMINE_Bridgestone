const API = "http://localhost:8088"

const applicationState = {
    governors: [],
    colonies: [],
    facilities: [],
    minerals: [],
    facility_inventory: [],
    colony_inventory: [],
    pirate_inventory: []
}

const transientState = {

}


// transient

//setters transient state

export const setFacility = (facilityId) => {
    transientState.selectedFacility = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setGovernor = (governorId) => {
    transientState.selectedGovernor = governorId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColonies = (colonyId) => {
    transientState.selectedColony = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineral = (mineral) => {
    transientState.selectedMineral = mineral
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const incrementTurn = () => {
    transientState.turnCounter++
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

//setters spaceCart

export const setFacility_Inventory = (facInv) => {
    const foundInventoryIndex = applicationState.facility_inventory.findIndex(
        inventory => {
            return inventory.id === facInv.id
        })

    database.facility_inventory[foundInventoryIndex] = facInv;
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColony_Inventory = (colInv) => {
    const foundInventoryIndex = database.colony_inventory.findIndex(
        inventory => {
            return inventory.id === colInv.id
        })
    if (foundInventoryIndex === -1) {
        let id = database.colony_inventory.length + 1
        colInv.id = id;
        database.colony_inventory.push(colInv);
    } else {
        database.colony_inventory[foundInventoryIndex] = colInv;
    }
    document.dispatchEvent(new CustomEvent("stateChanged"))
}



