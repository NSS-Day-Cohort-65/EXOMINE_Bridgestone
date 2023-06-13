// Given that a governor is selected, check for selected governor in transient state and render a selector of active facilities
// When a facility is selected,
// Then add selected facility to transient state

import { getState, setFacility } from "../api/dataaccess.js"
import { getFacilities } from "../api/dataaccess.js"

const state = getState()

const facilities = getFacilities()

export const Facilities = () => {
    
    let html = "<p>Choose a facility</p>"

    if (state.selectedGovernor) {
        html += '<select id="facility" class="selector">'
    } else {
        html += '<select id="facility" disabled class="selector">'
    }
    html += '<option value="0">Select a facility</option>'

   
        const dropDownArray = facilities.map((facility) => {
                if (facility.is_active) {
                    if (state.selectedFacility === facility.id) {
                        return `<option selected value="${facility.id}">${facility.name}</option>`
                    } else { 
                        return `<option value="${facility.id}">${facility.name}</option>`
                    }
                }
            }
        )
    

    html += dropDownArray.join("")
    html += "</select>"
    return html
}

document.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "facility") {
            setFacility(parseInt(event.target.value))
        }
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }
)