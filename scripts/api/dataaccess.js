import { database } from "./database.js"

//setters transient state

export const setFacility = (facilityId) => {
    database.transientState.selectedFacility = facilityId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setGovernor = (governorId) => {
    database.transientState.selectedGovernor = governorId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColonies = (colonyId) => {
    database.transientState.selectedColony = colonyId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setMineral = (mineralId) => {
    database.transientState.selectedMineral = mineralId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const incrementTurn = () => {
    database.transientState.turn++
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

//setters spaceCart

export const setFacility_Inventory = (facInv) => {
    const foundInventoryIndex = database.facility_inventory.findIndex(
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



//getters

export const getFacilities = () => {
    return database.facilities.map(f => ({ ...f }))
}

export const getGovernors = () => {
    return database.governors.map(f => ({ ...f }))
}

export const getColonies = () => {
    return database.colonies.map(f => ({ ...f }))
}

export const getMinerals = () => {
    return database.minerals.map(f => ({ ...f }))
}

export const getSpaceCart = () => {
    return database.spaceCart
}

export const getState = () => {
    return database.transientState
}

export const getFacilitiesInventory = () => {
    return database.facility_inventory.map(f => ({ ...f }))
}

export const getColoniesInventory = () => {
    return database.colony_inventory.map(f => ({ ...f }))
}




