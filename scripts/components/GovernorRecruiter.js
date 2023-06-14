import { getGovernors, getState, setRecruit } from '../api/dataaccess.js';

document.addEventListener(
    "click",
    e => {
        if (e.target.id.startsWith("recruit")) {
            const governors = getGovernors();
            let [, governorId] = e.target.value.split("--")
            const foundGovernor = governors.find(
                gov => {
                    return gov.id === parseInt(governorId)
                }
            )
            // need to make a setRecruit function in dataaccess that sets the id equal to selectedRecruit.     
            setRecruit(foundGovernor.id);
        }
    }
)

export const GovernorRecruiter = () => {
    const governors = getGovernors();
    const selectedRecruitId = getState().selectedRecruit
    const inactiveGovernors = governors.map(governor => !governor.is_active)

    // the event listener looks for the selector id to start with recruit
    let html = `<h2>Governor Recruiter</h2>
    <p>Choose a Governor</p><select id="recruit-selector" class="selector">
    <option value="">Select a recruit...</option>`

    const listItems = inactiveGovernors.map(governor => {
        if (selectedRecruitId === governor.id) {
            return `<option selected value="recruit--${governor.id}">${governor.name}</option>`
        } else {
            return `<option value="recruit--${governor.id}">${governor.name}</option>`
        }
    })
    html += listItems.join("")

    html += `</select>`

    return html
}