import { getColoniesInventory, getFacilities, getFacilitiesInventory, getMinerals, getSpaceCart, getState, setMineral, setColony_Inventory, setFacility_Inventory, putColony_Inventory, putFacility_Inventory, postColony_Inventory } from "../api/dataaccess.js"


const minerals = getMinerals()
const facilities = getFacilities()


document.addEventListener("click", (clickEvent) => {
    const itemClicked = clickEvent.target

    //check if itemClicked is the button 
    if (itemClicked.id === "purchaseButton") {
        purchaseMineral()
    }
})

let purchaseMineral

export const Cart = () => {
    const state = getState()
    const facilitiesInventory = getFacilitiesInventory();
    const coloniesInventory = getColoniesInventory();

    purchaseMineral = () => {
        // increment colony stock 
        // spaceCart.facility_inventory++

        //and decrement facility stock
        // spaceCart.colony_inventory++

        // Broadcast custom event to entire documement so that the
        // application can re-render and update state

        if (chosenMineral && chosenFacility) {
            let chosenFacilityInventory = facilitiesInventory.find(
                inventory => {
                    return inventory.facility_id === chosenFacility.id && inventory.mineral_id === chosenMineral.id
                }
            )

            let chosenColonyInventory = coloniesInventory.find(
                inventory => {
                    return inventory.colony_id === state.selectedColony && inventory.mineral_id === chosenMineral.id
                }
            )

            if (!chosenColonyInventory || !chosenFacilityInventory) {
                const newInventory = {
                    colony_id: state.selectedColony,
                    mineral_id: chosenMineral.id,
                    colony_stock: 0
                }
                for (const cart_mineral of state.cart_minerals) {
                    if (cart_mineral.mineral_id === chosenColonyInventory.mineral_id) {
                        newInventory.colony_stock += state.cart_mineral.amount
                    }
                }

                setColony_Inventory(newInventory)
            } else {
                for (const cart_mineral of state.cart_minerals) {
                    if (cart_mineral.mineral_id === chosenColonyInventory.mineral_id) {
                        chosenColonyInventory.colony_stock += state.cart_mineral.amount 
                    }
                }
                setColony_Inventory(chosenColonyInventory);
            }

            for (const cart_mineral of state.cart_minerals) {
                if (cart_mineral.mineral_id === chosenColonyInventory.mineral_id) {
                    chosenFacilityInventory.facility_stock += state.cart_mineral.amount
                }
            }
            setFacility_Inventory(chosenFacilityInventory);
            setMineral(null)
        }
    }

    let html = `<div class="cart">
        <h1>Space Cart</h1>`

    const chosenMineral = minerals.find(
        (mineral) => {
            return mineral.id === state.selectedMineral
        }
    )

    const chosenFacility = facilities.find(
        (facility) => {
            return facility.id === state.selectedFacility
        }
    )
    if (chosenMineral && chosenFacility) {
        html += `<p class="cart__item">1 ton of ${chosenMineral.name} from ${chosenFacility.name}</p>`
    }

    html += `<div>
                <button id="purchaseButton">Purchase Mineral</button>
            </div>
        </div>`

    return html
}
