import { getColonies, getColoniesInventory, getFacilities, getFacilitiesInventory, getMinerals, putColony, putFacility, putFacility_Inventory, putColony_Inventory, incrementTurn, fetchFacility_Inventory, fetchColonies_Inventory } from "../api/dataaccess.js"
import { coloniesUseMinerals } from './Cart.js'
import { addPirateRaiders } from './Pirates.js';
let facilitySelected = null
let colonySelected = null
let mineralsToSpend = {};
let securityTotal = 0;

//reset selectors upon reset
document.addEventListener("click", event => {
    if (event.target.id === "resetButton") {
        colonySelected = null
        facilitySelected = null
    }
})

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

const facilitiesGainMinerals = async () => {
    incrementTurn()
    //FacilitiesGainMinerals--------------------------------
    await fetchFacility_Inventory();
    const facilitiesInventory = getFacilitiesInventory()
    const minerals = getMinerals()
    for (const facInv of facilitiesInventory) {
        const foundMineral = minerals.find(mineral => mineral.id === facInv.mineral_id);

        let newObj = {
            id: facInv.id,
            facility_id: facInv.facility_id,
            mineral_id: facInv.mineral_id,
            facility_stock: facInv.facility_stock + foundMineral.yield
        };
        // Delay between each PUT request
        try {
            await putFacility_Inventory(newObj, facInv.id);
        } catch (error) {
            console.error('PUT request failed for facility inventory ID:', facInv.id);
            console.error('Error:', error);
            delay(1000);
            try {
                console.log('Retrying PUT request for facility inventory ID:', facInv.id)
                await putFacility_Inventory(newObj, facInv.id);
            } catch (error) {
                console.error('Error', error)
            }
        }
    }
    //-----------------------------------------------------
}

const removeMinerals = async () => {
    let selectedInventory = [];
    if (facilitySelected) {
        const facilitiesInventory = getFacilitiesInventory();
        for (const inventory in mineralsToSpend) {
            let foundInventory = facilitiesInventory.find(inv => inv.id === parseInt(mineralsToSpend[inventory].inventory_id))
            foundInventory.facility_stock -= mineralsToSpend[inventory].amount
            selectedInventory.push(foundInventory);
        }
        for (const inventory of selectedInventory) {
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
    }
    if (colonySelected) {
        const coloniesInventory = getColoniesInventory();
        for (const inventory in mineralsToSpend) {
            let foundInventory = coloniesInventory.find(inv => inv.id === parseInt(mineralsToSpend[inventory].inventory_id))
            foundInventory.colony_stock -= mineralsToSpend[inventory].amount
            selectedInventory.push(foundInventory);
        }
        for (const inventory of selectedInventory) {
            try {
                await putColony_Inventory(inventory, inventory.id);
            } catch (error) {
                console.error('PUT request failed for colony inventory ID:', inventory.id);
                console.error('Error:', error);
                delay(1000);
                try {
                    console.log('Retrying PUT request for colony inventory ID:', inventory.id)
                    await putColony_Inventory(inventory, inventory.id);
                } catch (error) {
                    console.error('Error', error)
                }
            }
        }
    }
    facilitiesGainMinerals();
    await fetchColonies_Inventory()
    coloniesUseMinerals()
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//event listener for purchase button to change the amount of security property on the facility or colony
document.addEventListener("click",
    async event => {
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

                    removeMinerals();

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

                    removeMinerals();

                    securityTotal = 0
                    mineralsToSpend = {};
                    facilitySelected = null
                }

            } else if (colonySelected) {
                if (colonySelected.security) {

                    const newColObj = {
                        id: colonySelected.id,
                        name: colonySelected.name,
                        security: colonySelected.security + securityTotal,
                        is_colony: true,
                        is_active: true
                    }
                    putColony(newColObj, newColObj.id)

                    removeMinerals();

                    securityTotal = 0
                    mineralsToSpend = {};
                    colonySelected = null

                } else {
                    const newColObj = {
                        id: colonySelected.id,
                        name: colonySelected.name,
                        security: securityTotal,
                        is_colony: true,
                        is_active: true
                    }
                    putColony(newColObj, newColObj.id)

                    removeMinerals();

                    securityTotal = 0
                    mineralsToSpend = {};
                    colonySelected = null

                }
            }
            addPirateRaiders();
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

    let html = `<h1 class="headings-containers">Security Recruiter 👮</h1>
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
                return `<label class="security-mineral-heading" for="${inputName}" >${foundMineral.name}</label><div id="security-items-line">
                    <p class="security-mineral-value">Value: ${foundMineral.value}</p>
                    <p class="security-mineral-available">Available: ${inventory.colony_stock}</p>
                    <input data-mineralValue=${foundMineral.value} class="security-mineral-input" name="${inputName}" id="securityMineralInput--${inventory.id}" type="number" min="0" max="${inventory.colony_stock}" value="${mineralsToSpend[inputName] ? mineralsToSpend[inputName].amount : 0}"></div>`
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
                return `<label class="security-mineral-heading" for="${inputName}" >${foundMineral.name}</label><div id="security-items-line">
                    <p class="security-mineral-value">Value: ${foundMineral.value}</p>
                    <p class="security-mineral-available">Available: ${inventory.facility_stock}</p>
                    <input data-mineralValue=${foundMineral.value} class="security-mineral-input" name="${inputName}" id="securityMineralInput--${inventory.id}" type="number" min="0" max="${inventory.facility_stock}" value="${mineralsToSpend[inputName] ? mineralsToSpend[inputName].amount : 0}"></div>`
            }
        ).join("")
    }
    //Purchase section with number field and purchase button 

    if (securityTotal > 0) {
        html += `<div id="purchase-security">
            <p class="security-number-to-recruit">Number to Recruit: ${securityTotal}</p>
            <button id="securityButton">Recruit</button>
        </div>`
        return html
    } else {
        // disable security button if nothing is selected!!!!
        html += `<div id="purchase-security">
            <p class="security-number-to-recruit">Number to Recruit: ${securityTotal}</p>
            <button disabled id="securityButton">Recruit</button>
        </div>`
        return html
    }
}

//increase turn anytime security is purchased:

document.addEventListener("click", async e => {
    if (e.target.id === "securityButton") {

    }
})


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
