import { Cart } from './components/Cart.js'
import { ColonyResources } from './components/ColonyResources.js'
import { Facilities } from './components/Facilities.js'
import { FacilityInventory } from './components/FacilityInventory.js'
import { Governors } from './components/Governors.js'
import { TurnCounter } from './components/TurnCounter.js'
import { Pirates } from './components/Pirates.js'




export const Exomine = () => {
    return `<h1 id="heading__main">Solar System Mining Marketplace</h1>
    ${TurnCounter()}
    <section id="top-section" class="flex-container">
        <div class="flex-container" id="selectors-container">
            ${Governors()}
            ${Facilities()}
        </div>
        ${Pirates()}
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
    </section>`
}
