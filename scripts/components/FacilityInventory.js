import { fetchFacility_Inventory, getFacilities, getFacilitiesInventory, getMinerals, getState, putFacility_Inventory } from '../api/dataaccess.js'

let selectedAmount = 10

document.addEventListener("change", event => {
    if (event.target.id.startsWith("quantity--")) {
        //add the chosen amount and set to a variable 
        selectedAmount = parseInt(event.target.value)
    }
})

document.addEventListener("click",
    event => {

        if (event.target.className === "addToCartButton") {
            const state = getState()

            const mineralInCart = state.cart_minerals.find((cart_mineral) => {
                return parseInt(event.target.id) === cart_mineral.mineral_id
            })
            if (mineralInCart) {
                mineralInCart.amount += selectedAmount
            } else {
                const newMineral = {
                    mineral_id: parseInt(event.target.id),
                    amount: selectedAmount
                }
                state.cart_minerals.push(newMineral)
            }

            document.dispatchEvent(new CustomEvent("stateChanged"))
        }

    }
)

let mineralSelected;

document.addEventListener("click", event => {
    if (event.target.id.startsWith(`mineral-radio--`)) {
        const minerals = getMinerals();

        const [, mineralIdString] = event.target.id.split(`--`)
        const mineralIdNum = parseInt(mineralIdString)

        mineralSelected = minerals.find((mineral) => {
            return mineral.id === mineralIdNum
        })
    }
})

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let amountSelector;
export const FacilityInventory = () => {
    const facilities = getFacilities();
    const minerals = getMinerals();
    const facilitiesInventory = getFacilitiesInventory();
    const state = getState();
    const facility = facilities.find(facility => facility.id === state.selectedFacility)


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
                if (mineralSelected) {
                    if (mineralSelected.id === inventory.mineral_id) {
                        amountSelector =
                           `<label for="quantity--${inventory.mineral_id}"></label>
                            <input type="number" id="quantity--${inventory.mineral_id}" name="quantity" min="10" max="500" step="10" value="${selectedAmount}">`
                        let addToCartButton = `<button id=${inventory.mineral_id} class="addToCartButton">Add to Cart</button>`
                        return `<div class="facilityInventory__items"><input id="mineral-radio--${inventory.mineral_id}" type="radio" name="minerals" value="${inventory.mineral_id}" checked>${amountSelector} tons of ${inventory.mineralName}</input> ${addToCartButton}</div>`
                    } else {
                        return `<div><input id="mineral-radio--${inventory.mineral_id}" type="radio" name="minerals" value="${inventory.mineral_id}">${inventory.facility_stock} tons of ${inventory.mineralName}</input></div>`
                    }

                } else {
                    return `<div><input id="mineral-radio--${inventory.mineral_id}" type="radio" name="minerals" value="${inventory.mineral_id}">${inventory.facility_stock} tons of ${inventory.mineralName}</input></div>`
                }
            }).join("")
        } else {
            return ""
        }
    }

    let html = `<div id="minerals-selector">
    <h1 id="facility__header">Facility Minerals ${state.selectedFacility ? `for ${facility.name}` : ""} ⛏️</h1>
    <div id="facility-inventory-flex-list">
            ${mineralRadioSelectors()}
            </div>
        </div>`

    return html

}

//write function that adds a random amount of minerals to a facility every turn. Trigger it off of click event from purchaseButton
const facilitiesGainMinerals = async () => {
    const facInventory = getFacilitiesInventory();
    const minerals = getMinerals();
    for (const facInv of facInventory) {
        const foundMineral = minerals.find(mineral => mineral.id === facInv.mineral_id);

        let newObj = {
            id: facInv.id,
            facility_id: facInv.facility_id,
            mineral_id: facInv.mineral_id,
            facility_stock: facInv.facility_stock + foundMineral.yield
        };
        // Delay between each PUT request
        try {
            await putFacility_Inventory(newObj, facInv.id);
        } catch (error) {
            console.error('PUT request failed for facility inventory ID:', facInv.id);
            console.error('Error:', error);
            delay(1000);
            try {
                console.log('Retrying PUT request for facility inventory ID:', facInv.id)
                await putFacility_Inventory(newObj, facInv.id);
            } catch (error) {
                console.error('Error', error)
            }
        }
    }
}

document.addEventListener(
    "addAndUseMinerals",
    async customEvent => {
        await facilitiesGainMinerals();
        document.dispatchEvent(new CustomEvent("stateChanged"))
    }
)