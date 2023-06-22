import { Cart } from './components/Cart.js'
import { ColonyResources } from './components/ColonyResources.js'
import { Facilities } from './components/Facilities.js'
import { FacilityInventory } from './components/FacilityInventory.js'
import { GovernorRecruiter } from './components/GovernorRecruiter.js'
import { Governors } from './components/Governors.js'
import { TurnCounter } from './components/TurnCounter.js'
import { Pirates } from './components/Pirates.js'
import { Security } from './components/Security.js'
import { getState } from './api/dataaccess.js'
// import { raidAlertHTMLGen } from './components/RaidAlert.js'
import { generateResetButtonHTML } from './components/ResetButton.js'
import { StatusWindow } from './components/StatusWindow.js'


document.addEventListener("startRaid", CustomEvent => {
    const state = getState()
    if (state.wasRaidSuccessful) {
        if (state.lastLocationRaided.length > 1 && state.lastGovernorKilled.length > 1) {
            const placeRaided = state.lastLocationRaided
            const govKilled = state.lastGovernorKilled

            window.alert(`WARNING: ${placeRaided.toUpperCase()} WAS RAIDED! GOVERNOR ${govKilled.toUpperCase()} HAS BEEN KILLED!`)
        } else if (state.lastLocationRaided.length > 1) {

            const placeRaided = state.lastLocationRaided

            window.alert(`WARNING: ${placeRaided.toUpperCase()} WAS RAIDED!`)
        }
    } else {
        const placeRaided = state.lastLocationRaided

        window.alert(`WARNING: ${placeRaided.toUpperCase()} WAS RAIDED BUT SUCCESSFULLY DEFENDED!`)
    }
});

export const Exomine = () => {

    return `
    <div id="all-container">
    <h1 id="heading__main">Solar System Mining Marketplace</h1>
        ${generateResetButtonHTML()}
    <section id="turncounter-section"> 
    ${TurnCounter()}
    </section>
    <div id="content-container">
    <section id="top-section" class="primary-section">
        <div class="flex-container" id="selectors-container">
            ${Governors()}
            ${Facilities()}
        </div>
        <div id="colonies-container" class="flex-container">
        ${ColonyResources()}
        </div>
        <div id="facilities-container" class="flex-container">
            ${FacilityInventory()}
        </div>
        <div id="cart-container" class="flex-container">
        ${Cart()}
    </div>
    </section>
    <section id="middle-section" class="primary-section">
        <div id="security-container" class="flex-container">
            ${Security()}
        </div>
        <div id="governor-recruiter-container" class="flex-container">
            ${GovernorRecruiter()}
        </div>
        <div id="status-container" class="flex-container">
            ${StatusWindow()}
        </div>
        <div id="pirate-container" class="flex-container">
            ${Pirates()}
        </div>
    </section>
    </div>
    </div>`
}

//if adding in none windwo based alert, place this back above last article tag (like 41 as of time of writing) ${raidAlertHTMLGen()} and uncomment the import statment on like 9.