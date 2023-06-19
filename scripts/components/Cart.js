import { getColoniesInventory, getFacilities, getFacilitiesInventory, getMinerals, getState, putColony_Inventory, putFacility_Inventory, postColony_Inventory } from "../api/dataaccess.js"

document.addEventListener("click", (clickEvent) => {
    const itemClicked = clickEvent.target

    //check if itemClicked is the button 
    if (itemClicked.id === "purchaseButton") {
        purchaseMineral()
        document.dispatchEvent(new CustomEvent("stateChanged"))
        document.dispatchEvent(new CustomEvent("addAndUseMinerals"))
    }
})

document.addEventListener(
    "change",
    e => {
        if (e.target.id === "facility") {
            const state = getState();

            state.cart_minerals = [];
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

let purchaseMineral

export const Cart = () => {
    const state = getState()
    const facilitiesInventory = getFacilitiesInventory();
    const coloniesInventory = getColoniesInventory();
    const minerals = getMinerals()
    const facilities = getFacilities()

    purchaseMineral = () => {
        // increment colony stock 
        // spaceCart.facility_inventory++

        //and decrement facility stock
        // spaceCart.colony_inventory++

        // Broadcast custom event to entire documement so that the
        // application can re-render and update state


        if (chosenMinerals.length && chosenFacility) {

            for (const chosenMineral of chosenMinerals) {

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

                if (!chosenColonyInventory) {
                    const newInventory = {
                        colony_id: state.selectedColony,
                        mineral_id: chosenMineral.id,
                        colony_stock: 0
                    }
                    for (const cart_mineral of state.cart_minerals) {
                        if (cart_mineral.mineral_id === newInventory.mineral_id) {
                            newInventory.colony_stock = cart_mineral.amount
                        }
                    }

                    chosenColonyInventory = newInventory;
                    postColony_Inventory(newInventory)
                } else {
                    for (const cart_mineral of state.cart_minerals) {
                        if (cart_mineral.mineral_id === chosenColonyInventory.mineral_id) {
                            chosenColonyInventory.colony_stock += cart_mineral.amount
                        }
                    }
                    putColony_Inventory(chosenColonyInventory, chosenColonyInventory.id);
                }

                for (const cart_mineral of state.cart_minerals) {
                    if (cart_mineral.mineral_id === chosenColonyInventory.mineral_id) {
                        chosenFacilityInventory.facility_stock -= cart_mineral.amount
                    }
                }
                putFacility_Inventory(chosenFacilityInventory, chosenFacilityInventory.id);
            }
            state.cart_minerals = []
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }

    let html = `<div class="cart">
        <h1>Space Cart</h1>`

    const chosenMineralsArr = () => {
        let chosenMinerals = []
        for (const mineral of minerals) {
            for (const cart_mineral of state.cart_minerals) {
                if (mineral.id === cart_mineral.mineral_id) {
                    mineral.amount = cart_mineral.amount
                    chosenMinerals.push(mineral)
                }
            }
        }
        return chosenMinerals
    }
    const chosenMinerals = chosenMineralsArr()


    const chosenFacility = facilities.find(
        (facility) => {
            return facility.id === state.selectedFacility
        }
    )
    if (chosenMinerals.length && chosenFacility) {
        for (const mineral of chosenMinerals) {
            html += `<p class="cart__item">${mineral.amount} tonnes of ${mineral.name} from ${chosenFacility.name}</p>`
        }
    }

    html += `<div>
                <button id="purchaseButton">Purchase Mineral</button>
            </div>
        </div>`

    return html
}
