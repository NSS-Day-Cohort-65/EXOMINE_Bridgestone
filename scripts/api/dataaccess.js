const API = "http://localhost:8088"

const applicationState = {
    governors: [],
    colonies: [],
    faciliites: [],
    minerals: [],
    facility_inventory: [],
    colony_inventory: [],
    pirate_inventory: []
}

const transientState = {
    selectedFacility: [],
    selectedGovernor: [],
    selectedColony: [],
    selectedMineralCartArr: [],
    turnCounter: []
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

export const setMineralCartArr = (mineralCartArr) => {
    transientState.selectedMineralCartArr = mineralCartArr
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

// export const setMineral = (mineralId) => {
//     transientState.selectedMineral = mineralId
//     document.dispatchEvent(new CustomEvent("stateChanged"))
// }

export const incrementTurn = () => {
    transientState.turnCounter++
    document.dispatchEvent(new CustomEvent("stateChanged"))
}


// transientState getter

export const getState = () => {
    return transientState
}

//applicationState (transient) getters

export const getFacilities = () => {
    return applicationState.facilities.map(f => ({ ...f }))
}

export const getGovernors = () => {
    return applicationState.governors.map(f => ({ ...f }))
}

export const getColonies = () => {
    return applicationState.colonies.map(f => ({ ...f }))
}

export const getMinerals = () => {
    return applicationState.minerals.map(f => ({ ...f }))
}

export const getFacilitiesInventory = () => {
    return applicationState.facility_inventory.map(f => ({ ...f }))
}

export const getColoniesInventory = () => {
    return applicationState.colony_inventory.map(f => ({ ...f }))
}

export const getPirateInventory = () => {
    return applicationState.pirate_inventory.map(f => ({ ...f }))
}



//fetch

//GET requests

export const fetchGovernors = () => {
    return fetch(`${API}/governors`)
        .then(response => response.join())
        .then(
            (governor) => {
                applicationState.governors = governor
            }
        )
}

export const fetchColonies = () => {
    return fetch(`${API}/colonies`)
        .then(response => response.join())
        .then(
            (colony) => {
                applicationState.colonies = colony
            }
        )
}

export const fetchFacilities = () => {
    return fetch(`${API}/facilities`)
        .then(response => response.join())
        .then(
            (facility) => {
                applicationState.facilities = facility
            }
        )
}

export const fetchMinerals = () => {
    return fetch(`${API}/minerals`)
        .then(response => response.join())
        .then(
            (mineral) => {
                applicationState.minerals = mineral
            }
        )
}

export const fetchFacility_Inventory = () => {
    return fetch(`${API}/facility_inventory`)
        .then(response => response.join())
        .then(
            (facInv) => {
                applicationState.facility_inventory = facInv
            }
        )
}

export const fetchColonies_Inventory = () => {
    return fetch(`${API}/colonies_inventory`)
        .then(response => response.join())
        .then(
            (colInv) => {
                applicationState.colonies_inventory = colInv
            }
        )
}

export const fetchPirate_Inventory = () => {
    return fetch(`${API}/pirate_inventory`)
        .then(response => response.join())
        .then(
            (pirInv) => {
                applicationState.pirate_inventory = pirInv
            }
        )
}


//POST requests

export const postGovernor = govObj => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(govObj)
    }
    return fetch(`${API}/governors`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const postColony_Inventory = colInvObj => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(colInvObj)
    }
    return fetch(`${API}/colony_inventory`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const postFacility_Inventory = facInvObj => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(facInvObj)
    }
    return fetch(`${API}/facility_inventory`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const postPirate_Inventory = pirInvObj => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pirInvObj)
    }
    return fetch(`${API}/pirate_inventory`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//PUT Requests

export const putGovernor = (obj, id) => {
    const updatedRequest = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }


    return fetch(`${API}/governors/${id}`, updatedRequest)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const putColony = (obj, id) => {
    const updatedRequest = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }


    return fetch(`${API}/colonies/${id}`, updatedRequest)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const putFacility = (obj, id) => {
    const updatedRequest = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }


    return fetch(`${API}/facilities/${id}`, updatedRequest)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const putColonyInventory = (obj, id) => {
    const updatedRequest = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }


    return fetch(`${API}/colony_inventory/${id}`, updatedRequest)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const putFacilityInventory = (obj, id) => {
    const updatedRequest = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }


    return fetch(`${API}/facility_inventory/${id}`, updatedRequest)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const putPirateInventory = (obj, id) => {
    const updatedRequest = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
    }


    return fetch(`${API}/pirate_inventory/${id}`, updatedRequest)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

//old put methods

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



