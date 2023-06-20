import { getColonies, getColoniesInventory, getFacilities, getFacilitiesInventory, getMinerals, putColony, putFacility } from "../api/dataaccess.js"

let facilitySelected = null
let colonySelected = null
let numberSelected = 0
let mineralsToSpend = {};
let securityTotal = 0;

//event listener to check if facility or colony is selected
document.addEventListener("change",
    (event) => {
        if (event.target.id === "facility_security") {
            const facilities = getFacilities()
            facilitySelected = facilities.find(facility => {
                return facility.id === parseInt(event.target.value)
            })
            colonySelected = null;
            mineralsToSpend = {};
            document.dispatchEvent(new CustomEvent("stateChanged"))

        } else if (event.target.id === "colony_security") {
            const colonies = getColonies()
            colonySelected = colonies.find(colony => {
                return colony.id === parseInt(event.target.value)
            })
            facilitySelected = null;
            mineralsToSpend = {};
            document.dispatchEvent(new CustomEvent("stateChanged"))

        }
    }
)

//event listener to set number selected to a variable
document.addEventListener("change", event => {
    if (event.target.name === "securityQuantity") {
        numberSelected = parseInt(event.target.value)
    }
})

//event listener for purchase button to change the amount of security property on the facility or colony
document.addEventListener("click",
    event => {
        //if purchase button is clicked, 
        if (event.target.id === "securityButton") {
            //only run if colony or facility was selected
            if (facilitySelected) {

                if (facilitySelected.security) {

                    const newFacObj = {
                        id: facilitySelected.id,
                        name: facilitySelected.name,
                        is_active: facilitySelected.is_active,
                        security: facilitySelected.security + securityTotal,
                        is_facility: true
                    }
                    putFacility(newFacObj, newFacObj.id)
                    securityTotal = 0
                    mineralsToSpend = {};
                    facilitySelected = null

                } else {

                    const newFacObj = {
                        id: facilitySelected.id,
                        name: facilitySelected.name,
                        is_active: facilitySelected.is_active,
                        security: securityTotal,
                        is_facility: true
                    }
                    putFacility(newFacObj, newFacObj.id)
                    securityTotal = 0
                    mineralsToSpend = {};
                    facilitySelected = null
                }

            } else if (colonySelected) {
                if (colonySelected.security) {

                    const newColObj = {
                        id: colonySelected.id,
                        name: colonySelected.name,
                        security: colonySelected.security + securityTotal
                    }
                    putColony(newColObj, newColObj.id)
                    securityTotal = 0
                    mineralsToSpend = {};
                    colonySelected = null

                } else {
                    const newColObj = {
                        id: colonySelected.id,
                        name: colonySelected.name,
                        security: securityTotal
                    }
                    putColony(newColObj, newColObj.id)
                    securityTotal = 0
                    mineralsToSpend = {};
                    colonySelected = null

                }
            }
        }
    }
)

document.addEventListener("change",
    e => {
        if (e.target.id.startsWith("securityMineralInput")) {
            let [, mineralId] = e.target.name.split("--")
            let [, inventoryId] = e.target.id.split("--")
            if (mineralsToSpend[e.target.name]) {
                mineralsToSpend[e.target.name].amount = e.target.value
            } else {
                mineralsToSpend[e.target.name] =
                {
                    amount: e.target.value,
                    mineral_id: mineralId,
                    inventory_id: inventoryId,
                    value: parseInt(e.target.dataset.mineralvalue)
                }
            }
        }
    }
)

//colony dropdown
const coloniesSecuritySelector = () => {
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
const facilitiesSecuritySelector = () => {
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

const calculateSecurityTotal = () => {
    let total = 0
    for (const key in mineralsToSpend) {
        total += mineralsToSpend[key].amount * mineralsToSpend[key].value;
    }
    securityTotal = total;
}

//display entire Security container-----------------------------------------------
export const Security = () => {
    calculateSecurityTotal();

    let html = `<h2>Security Recruiter</h2>
    <div id="security_prompt">
    <p>Choose a Facility or Colony:</p>`

    //disable one field or the other if selected 
    html += `<select id="facility_security" class="selector">`

    html += `${facilitiesSecuritySelector()}
        </select>`

    html += `<select id="colony_security" class="selector">`

    html += `${coloniesSecuritySelector()}
        </select>
        </div>`
    if (colonySelected) {
        const coloniesInventory = getColoniesInventory();
        let foundColonyInventory = []
        for (const inventory of coloniesInventory) {
            if (inventory.colony_id === colonySelected.id) {
                foundColonyInventory.push(inventory)
            }
        }

        html += foundColonyInventory.map(
            inventory => {
                const minerals = getMinerals();
                let foundMineral = minerals.find(mineral => mineral.id === inventory.mineral_id)
                let inputName = `${foundMineral.name}--${inventory.mineral_id}`
                return `<label for="${inputName}" >${foundMineral.name}</label>
                    <p>Value: ${foundMineral.value}</p>
                    <p>Available: ${inventory.colony_stock}</p>
                    <input data-mineralValue=${foundMineral.value} name="${inputName}" id="securityMineralInput--${inventory.id}" type="number" min="0" max="${inventory.colony_stock}" value="${mineralsToSpend[inputName] ? mineralsToSpend[inputName].amount : 0}">`
            }
        ).join("")
    } else if (facilitySelected) {
        const facilitiesInventory = getFacilitiesInventory();
        let foundFacilityInventory = []
        for (const inventory of facilitiesInventory) {
            if (inventory.facility_id === facilitySelected.id) {
                foundFacilityInventory.push(inventory)
            }
        }

        html += foundFacilityInventory.map(
            inventory => {
                const minerals = getMinerals();
                let foundMineral = minerals.find(mineral => mineral.id === inventory.mineral_id)
                let inputName = `${foundMineral.name}--${inventory.mineral_id}`
                return `<label for="${inputName}" >${foundMineral.name}</label>
                    <p>Value: ${foundMineral.value}</p>
                    <p>Available: ${inventory.facility_stock}</p>
                    <input data-mineralValue=${foundMineral.value} name="${inputName}" id="securityMineralInput--${inventory.id}" type="number" min="0" max="${inventory.facility_stock}" value="${mineralsToSpend[inputName] ? mineralsToSpend[inputName].amount : 0}">`
            }
        ).join("")
    }
    //Purchase section with number field and purchase button 
    html += `<div id="purchase-security">
            <p>Number to Recruit:${securityTotal}</p>
            <button id="securityButton">Purchase</button>
        </div>`
    // disable security button if nothing is selected!!!!
    return html
}


//create an html shell in exomine to interpolate security function
	//make security array of objects with properties id, name, and mineral_paid?
		//Use .map in a <select> to loop through and create <option> for each and return

//create event listener to check for clicked security and match it to the one in security list:
	//if selected, choose how many and pass that to the purchase function
		//then pass the amount to state using the purchase function/button
			//purchase function should get state and updates state:
				//Colony or Facility needs to show the new security count pulled from state
				//Colony or Facility mineral stock needs to decrease, pulled from state
					//then purchase count resets itself
