import { getState } from "../api/dataaccess.js"


//commenting out and rewriting as window alert for time being. Window alert code below the commented code sitting above it.

//write function that checks state for the last raid. If it exists, creates html rep of it with location included

// export const raidAlertHTMLGen = () => {
//     const state = getState()

//     if (state.lastLocationRaided.length > 1 && state.lastGovernorKilled.length > 1) {
//         const placeRaided = state.lastLocationRaided
//         const govKilled = state.lastGovernorKilled
//         return `<h1 id="raid-alert-text">WARNING: ${placeRaided.toUpperCase()} WAS RAIDED! GOVERNOR ${govKilled.toUpperCase()} HAS BEEN KILLED!</h1>`
//     } else if (state.lastLocationRaided.length > 1) {
//         const placeRaided = state.lastLocationRaided
//         return `<h1 id="raid-alert-text">WARNING: ${placeRaided.toUpperCase()} WAS RAIDED!</h1>`
//     }
// };

// //write an event listener for startRaid custom event that launches the raidAlert function

// document.addEventListener("startRaid", CustomEvent => {
//     raidAlert()
// }
// )

// const raidAlert = () => {

//     let alarmSound = new Audio('audio/alarm_sound.mp3')

//     const alert = document.querySelector("#raid-alert-container")

//     alarmSound.play()

//     alert.style.display = "block"

//     setTimeout(() => {
//         alert.style.display = "none"
//     }, 4000);
// }


const raidAlert = () => {
    
    let alarmSound = new Audio('audio/alarm_sound.mp3')

    const alert = document.querySelector("#raid-alert-container")

    alarmSound.play()

    alert.style.display = "block"

    setTimeout(() => {
        alert.style.display = "none"
    }, 3000);
}

document.addEventListener("startRaid", CustomEvent => {
    const state = getState()

    if (state.lastLocationRaided.length > 1 && state.lastGovernorKilled.length > 1) {
        const placeRaided = state.lastLocationRaided
        const govKilled = state.lastGovernorKilled

        document.window.alert(`WARNING: ${placeRaided.toUpperCase()} WAS RAIDED! GOVERNOR ${govKilled.toUpperCase()} HAS BEEN KILLED!`)
    } else if (state.lastLocationRaided.length > 1) {

        const placeRaided = state.lastLocationRaided

        document.window.alert(`WARNING: ${placeRaided.toUpperCase()} WAS RAIDED!`)
    }
    raidAlert()
});
