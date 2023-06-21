import { getColonies, getGovernors, getState, putGovernor, setSelectedRecruit, setSelectedRecruitColony } from '../api/dataaccess.js';

document.addEventListener(
    "change",
    e => {
        if (e.target.id.startsWith("recruit")) {
            let [, governorId] = e.target.value.split("--")
            setSelectedRecruit(parseInt(governorId));
        }
    }
)

document.addEventListener(
    "change",
    e => {
        if (e.target.id.startsWith("colony")) {
            let [, colonyId] = e.target.value.split("--")
            setSelectedRecruitColony(parseInt(colonyId));
        }
    }
)

document.addEventListener(
    "click",
    e => {
        if (e.target.id === "button-recruit") {
            const state = getState();
            const governors = getGovernors();
            // toggle selected governor to is active and set colony
            let foundGovernor = governors.find(governor => governor.id === state.selectedRecruit);
            let recruit = {
                id: foundGovernor.id,
                name: foundGovernor.name,
                colony_id: state.selectedRecruitColony,
                is_active: true,
                is_alive: foundGovernor.is_alive,
            }
            putGovernor(recruit, recruit.id);
        }
    }
)

export const GovernorRecruiter = () => {
    const governors = getGovernors();
    const colonies = getColonies();
    const state = getState();

    // the event listener looks for the selector id to start with recruit
    let html = `
        <h1 class="headings-containers">Governor Recruiter</h1>
        <p>Choose a Governor</p>
        <select id="recruit-selector" class="selector">
        <option value="">Select a recruit...</option>`

    html += governors.map(governor => {
        if (!governor.is_active && governor.is_alive) {
            if (state.selectedRecruit === governor.id) {
                return `<option selected value="recruit--${governor.id}">${governor.name}</option>`
            } else {
                return `<option value="recruit--${governor.id}">${governor.name}</option>`
            }
        }
    }).join("")

    html += "</select>"

    if (state.selectedRecruit) {
        html += `<p>Choose a Colony</p>
    <select id="colony-selector" class="selector">
    <option value="">Select a colony...</option>`
    } else {
        html += `<p>Choose a Colony</p>
    <select disabled id="colony-selector" class="selector">
    <option value="">Select a colony...</option>`
    }

    html += colonies.map(colony => {
        if (state.selectedRecruitColony === colony.id) {
            return `<option selected value="colony--${colony.id}">${colony.name}</option>`
        } else {
            return `<option value="colony--${colony.id}">${colony.name}</option>`
        }
    }).join("")

    html += `</select>`

    if (state.selectedRecruit && state.selectedRecruitColony) {

        html += `<button id="button-recruit">Recruit</button></div>`
    } else {
        html += `<button id="button-recruit" disabled>Recruit</button>`

    }

    return html
}