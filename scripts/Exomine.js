import { Cart } from './components/Cart.js'
import { ColonyResources } from './components/ColonyResources.js'
import { Facilities } from './components/Facilities.js'
import { FacilityInventory } from './components/FacilityInventory.js'
import { GovernorRecruiter } from './components/GovernorRecruiter.js'
import { Governors } from './components/Governors.js'
import { TurnCounter } from './components/TurnCounter.js'
import { Pirates } from './components/Pirates.js'
import { SecurityRecruiter } from './components/Security.js'
import { getState } from './api/dataaccess.js'
// import { raidAlertHTMLGen } from './components/RaidAlert.js'
import { generateResetButtonHTML } from './components/ResetButton.js'


document.addEventListener("startRaid", CustomEvent => {
    const state = getState()

    if (state.lastLocationRaided.length > 1 && state.lastGovernorKilled.length > 1) {
        const placeRaided = state.lastLocationRaided
        const govKilled = state.lastGovernorKilled

        window.alert(`WARNING: ${placeRaided.toUpperCase()} WAS RAIDED! GOVERNOR ${govKilled.toUpperCase()} HAS BEEN KILLED!`)
    } else if (state.lastLocationRaided.length > 1) {

        const placeRaided = state.lastLocationRaided

        window.alert(`WARNING: ${placeRaided.toUpperCase()} WAS RAIDED!`)
    }
});

export const Exomine = () => {

    return `<h1 id="heading__main">Solar System Mining Marketplace</h1>
    ${TurnCounter()}
    <section id="top-section" class="flex-container">
        <div class="flex-container" id="selectors-container">
            ${Governors()}
            ${Facilities()}
        </div>
        ${GovernorRecruiter()}
        <div id="colonies-container" class="flex-container">
        ${ColonyResources()}
        </div>
    </section>
    <section id="bottom-section" class="flex-container">
    <div id="facilities-container" class="flex-container">
        ${FacilityInventory()}
    </div>
        ${Cart()}
    </section>
    <section id="pirate-section" class="flex-container">
        ${Pirates()}
    </section>
    <section id="security-section" class="flex-container">
        ${SecurityRecruiter()}
    <section id="reset-button-section">
        ${generateResetButtonHTML()}
    </section>`
}

//if adding in none windwo based alert, place this back above last article tag (like 41 as of time of writing) ${raidAlertHTMLGen()} and uncomment the import statment on like 9.


