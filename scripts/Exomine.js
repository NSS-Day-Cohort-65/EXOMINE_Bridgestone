import { Cart } from './components/Cart.js'
import { ColonyResources } from './components/ColonyResources.js'
import { Facilities } from './components/Facilities.js'
import { FacilityInventory } from './components/FacilityInventory.js'
import { Governors } from './components/Governors.js'


export const Exomine = () => {
    return `<h1>Solar System Mining Marketplace</h1>
    <section id="top-section" class="flex-container">
        <div class="flex-container" id="selectors-container">
            ${Governors()}
            ${Facilities()}
        </div>
        <div id="colonies-container" class="flex-container">
        ${ColonyResources()}
        </div>
    </section>
    <section id="bottom-section" class="flex-container">
        ${FacilityInventory()}
        ${Cart()}
    </section>`
}
