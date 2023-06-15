import { getFacilities, getFacilitiesInventory, getMinerals, getState, setMineral } from '../api/dataaccess.js'

export const FacilityInventory = () => {
    const facilities = getFacilities();
    const minerals = getMinerals();
    const facilitiesInventory = getFacilitiesInventory();
    const state = getState();
    const facility = facilities.find(facility => facility.id === state.selectedFacility)

    document.addEventListener("click", 
        event => {
            //change the selected number to an int 
            let selectedAmount = 0
            if (event.target.class === "addToCartButton") {
                const mineral_id = event.target.id
                setMineral(mineral_id)
                selectedAmount = document.querySelector(`#quantity--${mineral_id}`).value //CHECK LATER
            }
            
            //match the correct mineral in cart minerals and add the selected amount 
            for (const cart_mineral in state.cart_minerals)
                if (event.target.id === cart_mineral.mineral_id)
                    cart_mineral.amount += selectedAmount

        }
    )
    const mineralRadioSelectors = () => {
        const chosenFacilityId = state.selectedFacility;
        if (state.selectedFacility) {

            let chosenFacilityInventory = []
            for (const inventory of facilitiesInventory) {
                if (inventory.facility_id === chosenFacilityId) {
                    for (const mineral of minerals) {
                        if (mineral.id === inventory.mineral_id) {
                            inventory.mineralName = mineral.name;
                        }
                    }
                    chosenFacilityInventory.push(inventory);
                }
            }

            return chosenFacilityInventory.map(inventory => {
                const mineralInCart = state.cart_minerals.find((cart_mineral) =>
                    inventory.mineral_id === cart_mineral.mineral_id
                )
                if (mineralInCart) {
                    let amountSelector = 
                    `<form>
                        <label for="quantity"></label>
                        <input type="number" id="quantity--${inventory.mineral_id}" name="quantity" min="10" max="500" step="10" value="10">
                    </form>`
                    let addToCartButton = `<button id=${inventory.mineral_id} class="addToCartButton">Add to Cart</button>`
                    return `<div class="facilityInventory__items"><input id="mineral-radio--${inventory.mineral_id}" type="radio" name="minerals" value="${inventory.mineral_id}" checked>${amountSelector} tonnes of ${inventory.mineralName}</input> ${addToCartButton}</div>`
                } else {
                    return `<div><input id="mineral-radio--${inventory.mineral_id}" type="radio" name="minerals" value="${inventory.mineral_id}">${inventory.facility_stock} tonnes of ${inventory.mineralName}</input></div>`
                }
            }).join("")
        } else {
            return ""
        }
    }

    let html = `<div class="flex-container" id="minerals-selector">
    <h1 id="facility__header">Facility Minerals ${state.selectedFacility ? `for ${facility.name}` : ""}</h1>
            ${mineralRadioSelectors()}
        </div>`

    return html

}





