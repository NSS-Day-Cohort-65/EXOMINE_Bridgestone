import { getState } from "../api/dataaccess.js"

//write function that checks state for the last raid. If it exists, creates html rep of it with location included

export const raidAlertHTMLGen = () => {
    const state = getState()

    if (state.lastLocationRaided.length > 1 && state.lastGovernorKilled.length > 1) {
        const placeRaided = state.lastLocationRaided
        const govKilled = state.lastGovernorKilled
        return `<h1 id="raid-alert-text">WARNING: ${placeRaided.toUpperCase()} WAS RAIDED! GOVERNOR ${govKilled.toUpperCase()} HAS BEEN KILLED!</h1>`
    } else if (state.lastLocationRaided.length > 1) {
        const placeRaided = state.lastLocationRaided
        return `<h1 id="raid-alert-text">WARNING: ${placeRaided.toUpperCase()} WAS RAIDED!</h1>`
    }
    state.lastLocationRaided = ''
    state.govKilled = ''
};

//write an event listener for startRaid custom event that launches the raidAlert function

document.addEventListener("startRaid", CustomEvent => {
    raidAlert()
}
)

const raidAlert = () => {

    let alarmSound = new Audio('audio/alarm_sound.mp3')

    const alert = document.querySelector("#raid-alert-container")

    alarmSound.play()

    alert.style.display = "block"

    setTimeout(() => {
        alert.style.display = "none"
    }, 4000);
}


// for testing:
// document.addEventListener("click", e => {
//     if (e.target.id === "test") {
//         document.dispatchEvent( new CustomEvent("startRaid"))

//     }
// })