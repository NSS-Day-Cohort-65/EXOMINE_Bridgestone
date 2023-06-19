import { getColonies, getFacilities, putColony, putFacility } from "../api/dataaccess.js"

let facilitySelected = null
let colonySelected = null
let numberSelected = 0

//event listener to check if facility or colony is selected
document.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "facility_security") {
            const facilities = getFacilities()
            facilitySelected = facilities.find(facility => {
                return facility.id === parseInt(event.target.value)
            })
            colonySelected = null;
            document.dispatchEvent(new CustomEvent("stateChanged"))

        } else if (event.target.id === "colony_security") {
            const colonies = getColonies()
            colonySelected = colonies.find(colony => {
                return colony.id === parseInt(event.target.value)
            })
            facilitySelected = null;
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
                        security: facilitySelected.security + numberSelected
                    }
                    putFacility(newFacObj, newFacObj.id)
                    numberSelected = 0
                    facilitySelected = null

                } else {

                    const newFacObj = {
                        id: facilitySelected.id,
                        name: facilitySelected.name,
                        is_active: facilitySelected.is_active,
                        security: numberSelected
                    }
                    putFacility(newFacObj, newFacObj.id)
                    numberSelected = 0
                    facilitySelected = null
                }

            } else if (colonySelected) {
                if (colonySelected.security) {

                    const newColObj = {
                        id: colonySelected.id,
                        name: colonySelected.name,
                        security: colonySelected.security + numberSelected
                    }
                    putColony(newColObj, newColObj.id)
                    numberSelected = 0
                    colonySelected = null

                } else {
                    const newColObj = {
                        id: colonySelected.id,
                        name: colonySelected.name,
                        security: numberSelected
                    }
                    putColony(newColObj, newColObj.id)
                    numberSelected = 0
                    colonySelected = null

                }
            }
        }
    }
)

//colony dropdown
export const ColoniesSecuritySelector = () => {
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
export const FacilitiesSecuritySelector = () => {
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

//display entire Security container-----------------------------------------------
export const Security = () => {

    let html = `<h2>Security Recruiter</h2>
    <div id="security_prompt">
    <p>Choose a Facility or Colony:</p>`

    //disable one field or the other if selected 
    // if (colonySelected === null) {
    html += `<select id="facility_security" class="selector">`
    // } else {
    //     html += `<select id="facility_security" disabled class="selector">`
    // }
    html += `${FacilitiesSecuritySelector()}
        </select>`


    // if (facilitySelected === null) {
    html += `<select id="colony_security" class="selector">`
    // } else {
    //     html += `<select id="colony_security" disabled class="selector">`
    // }
    html += `${ColoniesSecuritySelector()}
        </select>
        </div>`

    //Purchase section with number field and purchase button 
    html += `<div id="purchase-security">
            <p>Number to Recruit:</p>
            <form>
                <label for="quantity"></label>
                <input type="number" id="security-quantity" name="securityQuantity" min="0" max="500" step="10" value="${numberSelected}">
            </form>
            <button id="securityButton">Purchase</button>
        </div>`
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
