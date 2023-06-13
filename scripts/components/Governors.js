import { getGovernors, getState, setColonies, setGovernor } from '../api/dataaccess.js'
import { renderHtml } from '../main.js';

const state = getState()
const governors = getGovernors();


export const Governors = () => {


    let html = `<p>Choose a Governor</p><select id="governor-selector" class="selector">
    <option value="">Select a governor...</option>`

    const listItems = governors.map(governor => {
        if (governor.is_active) {
            if (state.selectedGovernor === governor.id) {
                return `<option selected value="governor--${governor.id}">${governor.name}</option>`
            } else {
                return `<option value="governor--${governor.id}">${governor.name}</option>`
            }
        }
    })
    html += listItems.join("")

    html += `</select>`

    return html

}

document.addEventListener(
    "change",
    e => {
        if (e.target.id.startsWith("governor")) {
            let [, governorId] = e.target.value.split("--")
            const foundGovernor = governors.find(
                gov => {
                    return gov.id === parseInt(governorId)
                }
            )

            setColonies(foundGovernor.colony_id)
            setGovernor(parseInt(governorId));
        }
    }
)