import { getGovernors, getState, setGovernor } from '../api/dataaccess.js'
import { renderHtml } from '../main.js';

const state = getState()


export const Governors = () => {
    const governors = getGovernors();
    
    
    let html = `<p>Choose a Governor</p><select id="governor-selector" class="selector">
    <option value="">Select a governor...</option>`

    const listItems = governors.map( governor => {
        if (state.selectedGovernor === governor.id) {
            return `<option selected value="governor--${governor.id}">${governor.name}</option>` 
        } else {
            return `<option value="governor--${governor.id}">${governor.name}</option>`
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
            setGovernor(parseInt(governorId));
            renderHtml()
        }
    }
)