// Given that a mineral has been selected, display selected mineral
// When the purchase button is clicked,
// Then send completed order
// And clear selected mineral
// And update state of facility stock and colony stock

import { getFacilities, getMinerals, getSpaceCart, getState } from "../api/dataaccess.js"

const state = getState()
const minerals = getMinerals()
const facilities = getFacilities()
const spaceCart = getSpaceCart()

const chosenMineral = minerals.find(
    (mineral) => {
        return mineral === state.selectedMineral
    }
)

const chosenFacility = facilities.find(
    (facility) => {
        return facility === state.selectedFacility
    }
)

export const Cart = () => {
    let html = `<div class="cart">
        <h1>Space Cart</h1>`
    if (chosenMineral && chosenFacility) {
        html += `<p>1 ton of ${chosenMineral} from ${chosenFacility}</p>`
    }
    html += `<article>
                <button id="purchaseButton">Purchase Mineral</button>
            </article>
        </div>`
    
    return html
}

const purchaseMineral = () => {
    // increment colony stock 
    spaceCart.facility_inventory++
    
    //and decrement facility stock
    spaceCart.colony_inventory++

    // Broadcast custom event to entire documement so that the
    // application can re-render and update state
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

document.addEventListener("click", (clickEvent) => {
    const itemClicked = clickEvent.target 

    //check if itemClicked is the button 
    if (itemClicked.id==="purchaseButton") {
       purchaseMineral()
    }
})