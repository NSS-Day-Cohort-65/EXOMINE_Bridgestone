import { getGovernors, getState, setSelectedRecruit } from '../api/dataaccess.js';

document.addEventListener(
    "click",
    e => {
        if (e.target.id.startsWith("recruit")) {
            let [, governorId] = e.target.value.split("--")
            setSelectedRecruit(parseInt(governorId));
        }
    }
)

document.addEventListener(
    "click",
    e => {
        if (e.target.id === "button-recruit") {
            // toggle selected governor to is active and set colony
        }
    }
)

export const GovernorRecruiter = () => {
    const governors = getGovernors();
    const state = getState();

    // the event listener looks for the selector id to start with recruit
    let html = `<div class="flex-container" id="section-governor-recruiter">
        <h2>Governor Recruiter</h2>
        <p>Choose a Governor</p>
        <select id="recruit-selector" class="selector">
        <option value="">Select a recruit...</option>`

    const listItems = governors.map(governor => {
        if (!governor.is_active) {
            if (state.selectedRecruit === governor.id) {
                return `<option selected value="recruit-option--${governor.id}">${governor.name}</option>`
            } else {
                return `<option value="recruit--${governor.id}">${governor.name}</option>`
            }
        }
    })
    html += listItems.join("")

    html += `</select><button id="button-recruit">recruit</button></div>`

    return html
}