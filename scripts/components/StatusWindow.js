import { getColonies, getColoniesInventory, getFacilities, getFacilitiesInventory, getMinerals } from "../api/dataaccess.js"

//window should contain a header
// 2 drop downs side by side - when you pick one, it displays the location with all it's minerals and security

let colonySelected = null
let facilitySelected = null

//reset selectors upon reset 
document.addEventListener("click", event => {
    if (event.target.id === "resetButton") {
        colonySelected = null
        facilitySelected = null
    }
})

//event listener to check if facility or colony is selected
document.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "facility_status") {
            const facilities = getFacilities()
            facilitySelected = facilities.find(facility => {
                return facility.id === parseInt(event.target.value)
            })
            colonySelected = null
            document.dispatchEvent(new CustomEvent("stateChanged"))

        } else if (event.target.id === "colony_status") {
            const colonies = getColonies()
            colonySelected = colonies.find(colony => {
                return colony.id === parseInt(event.target.value)
            })
            facilitySelected = null
            document.dispatchEvent(new CustomEvent("stateChanged"))

        }
    }
)

//colony dropdown
export const ColoniesStatusSelector = () => {
    const colonies = getColonies()
    let html = '<option value="0">Colony</option>'

    const dropDownArray = colonies.map((colony) => {
        if (colonySelected) {
            if (colonySelected.id === colony.id) {
                return `<option selected value="${colony.id}">${colony.name}</option>`
            } else {
                return `<option value="${colony.id}">${colony.name}</option>`
            }
        } else {
            return `<option value="${colony.id}">${colony.name}</option>`
        }
    })
    html += dropDownArray.join("")
    return html
}

//facility dropdown
export const FacilitiesStatusSelector = () => {
    const facilities = getFacilities()
    let html = '<option value="0">Facility</option>'

    const dropDownArray = facilities.map((facility) => {
        if (facility.is_active) {
            if (facilitySelected) {
                if (facilitySelected.id === facility.id) {
                    return `<option selected value="${facility.id}">${facility.name}</option>`
                } else {
                    return `<option value="${facility.id}">${facility.name}</option>`
                }
            } else {
                return `<option value="${facility.id}">${facility.name}</option>`
            }
        }
    })

    html += dropDownArray.join("")
    return html
}

//display the selected location with a list of all minerals, and security amount
const ResourcesDisplay = () => {
    const facilities = getFacilities()
    const colonies = getColonies()
    const coloniesInventory = getColoniesInventory();
    const facilitiesInventory = getFacilitiesInventory();
    const minerals = getMinerals()

    let html = `<div id="resources-display">`

    const resourcesToDisplay = {}
    const matchingMineralsArr = []
    let matchingMineral = {}

    //Display Resources at Facility
    if (facilitySelected) {
        const matchingFacility = facilities.find(facility => facilitySelected.id === facility.id)

        const matchingFacInventories = facilitiesInventory.filter(facilityInventory => facilityInventory.facility_id === facilitySelected.id)

        for (const inventory of matchingFacInventories) {
            for (const mineral of minerals) {
                if (mineral.id === inventory.mineral_id) {
                    matchingMineral = {
                        id: mineral.id,
                        name: mineral.name,
                        stock: inventory.facility_stock
                    }
                    matchingMineralsArr.push(matchingMineral)
                }
            }
        }

        resourcesToDisplay.facilityName = matchingFacility.name
        resourcesToDisplay.mineralsArr = matchingMineralsArr
        resourcesToDisplay.security = matchingFacility.security

        html += `<h1 id="heading-status-name">${resourcesToDisplay.facilityName}</h1>
            <ul id="resources_list" class="flex-list">`

        const mineralsListArr = resourcesToDisplay.mineralsArr.map((mineralResource) => {
            return `<li class="mineral_resource">${mineralResource.stock} tons of ${mineralResource.name}</li>`
        })
        html += mineralsListArr.join(``)
        html += `<li id="security-display">Security: ${resourcesToDisplay.security}
            </ul>
        </div>`

        return html

        //Display Resources at Colony
    } else if (colonySelected) {
        const matchingColony = colonies.find(colony => colonySelected.id === colony.id)

        const matchingColInventories = coloniesInventory.filter(colonyInventory => colonyInventory.colony_id === colonySelected.id)

        for (const inventory of matchingColInventories) {
            for (const mineral of minerals) {
                if (mineral.id === inventory.mineral_id) {
                    matchingMineral = {
                        id: mineral.id,
                        name: mineral.name,
                        stock: inventory.colony_stock
                    }
                    matchingMineralsArr.push(matchingMineral)
                }
            }
        }

        resourcesToDisplay.colonyName = matchingColony.name
        resourcesToDisplay.mineralsArr = matchingMineralsArr
        resourcesToDisplay.security = matchingColony.security

        html += `<h1 id="heading-status-name">${resourcesToDisplay.colonyName}</h1>
            <ul id="resources_list" class="flex-list">`

        const mineralsListArr = resourcesToDisplay.mineralsArr.map((mineralResource) => {
            return `<li class="mineral_resource">${mineralResource.stock} tons of ${mineralResource.name}</li>`
        })
        html += mineralsListArr.join(``)
        html += `<li id="security-display">Security: ${resourcesToDisplay.security}
            </ul>
        </div>`

        return html
    } else {
        html += `<p>No location chosen</p>
            </div>`
        return html
    }
}

//display entire status window
export const StatusWindow = () => {

    let html = `<h1 class="headings-containers">Status ✔️</h1>
    <div id="status prompt">
    <p>Choose a Facility or Colony:</p>`

    html += `<select id="facility_status" class="selector">
        ${FacilitiesStatusSelector()}
        </select>`

    html += `<select id="colony_status" class="selector">
        ${ColoniesStatusSelector()}
        </select>
        </div>`

    html += ResourcesDisplay()

    return html
}