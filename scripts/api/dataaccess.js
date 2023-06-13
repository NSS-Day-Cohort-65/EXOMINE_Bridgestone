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

//setters spaceCart

export const setFacility_Inventory = (facInvId) => {
    database.spaceCart.facility_inventory = facInvId
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColony_Inventory = (colInvId) => {
    database.spaceCart.colony_inventory = colInvId
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
    return database.spaceCart.map(f => ({ ...f }))
}

export const getColoniesInventory = () => {
    return database.colony_inventory.map(f => ({...f}))
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



export const purchaseMineral = () => {

    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
    document.dispatchEvent(new CustomEvent("stateChanged"))
}
