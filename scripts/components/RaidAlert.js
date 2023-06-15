import { getState } from "../api/dataaccess.js"

//write function that checks state for the last raid. If it exists, creates html rep of it with location included

export const raidAlertHTMLGen = () => {
    const state = getState()
    if (state.lastLocationRaided) {
        const placeRaided = state.lastLocationRaided.name
        return `<h1 id="raid-alert-text">WARNING: ${placeRaided.toUpperCase()} WAS RAIDED</h1>`
    }
}

//write an event listener for startRaid custom event that launches the raidAlert function

document.addEventListener("startRaid", CustomEvent => {
    raidAlert()
}
)

const raidAlert = () => {
    const alert = document.querySelector("#raid-alert-container")

    alert.style.display = "block"

    setTimeout(() => {
        alert.style.display = "none"
    }, 4000);
}