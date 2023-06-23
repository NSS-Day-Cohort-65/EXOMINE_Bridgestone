import { getColoniesInventory, getFacilities, getGovernors, getFacilitiesInventory, getMinerals, getState, putColony_Inventory, putFacility_Inventory, postColony_Inventory, getColonies, putColony, fetchColonies } from "../api/dataaccess.js"

const MAX_MINERAL_TO_USE_EACH_TURN = 8


document.addEventListener("click", async (clickEvent) => {
    const itemClicked = clickEvent.target

    //check if itemClicked is the button 
    if (itemClicked.id === "purchaseButton") {
        await purchaseMineral()
        await coloniesUseMinerals()
        document.dispatchEvent(new CustomEvent("stateChanged"))
        //document.dispatchEvent(new CustomEvent("addAndUseMinerals"))
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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let purchaseMineral

const coloniesUseMinerals = async () => {
    const colInventory = getColoniesInventory()

    for (const colInv of colInventory) {

        if (colInv.mineral_id === 1) {

            let randomAmount = Math.ceil(Math.random() * MAX_MINERAL_TO_USE_EACH_TURN);

            let newObj = {
                id: colInv.id,
                colony_id: colInv.colony_id,
                mineral_id: colInv.mineral_id,
                colony_stock: colInv.colony_stock - randomAmount
            }

            try {
                await putColony_Inventory(newObj, colInv.id)
            } catch (error) {
                console.error('PUT request failed for colony inventory ID:', colInv.id);
                console.error('Error:', error);
                delay(1000);
                try {
                    console.log('Retrying PUT request for colony inventory ID:', colInv.id)
                    await putColony_Inventory(newObj, colInv.id)
                } catch (error) {
                    console.error('Error', error)
                }
            }

        }
    }
    //------------------------------------------------------------------------
    const coloniesInventory = getColoniesInventory()
    let colonies = getColonies()
    const governors = getGovernors()

    //filter all colony inventories referring to xenite 
    const xeniteColoniesInventories = coloniesInventory.filter(colonyInventory => colonyInventory.mineral_id === 1)

    const activeColoniesArr = colonies.filter(colony => colony.is_active === true)

    //check if any colony inventory has 10 xenite 
    for (const xeniteColonyInventory of xeniteColoniesInventories) {
        //get colony name of matching colony
        const xeniteColony = colonies.find(colony => colony.id === xeniteColonyInventory.colony_id)
        if (xeniteColony.is_active) {
            if (xeniteColonyInventory.colony_stock > 0 && xeniteColonyInventory.colony_stock <= 10) {           
                window.alert(`WARNING: ${xeniteColony.name.toUpperCase()} IS AT RISK! Only ${xeniteColonyInventory.colony_stock} Xenite left!`)

            } else if (xeniteColonyInventory.colony_stock <= 0) {
                let fallenColony = {
                    id: xeniteColony.id,
                    name: xeniteColony.name,
                    security: xeniteColony.security,
                    is_colony: true,
                    is_active: false
                }
                putColony(fallenColony, xeniteColony.id)
                window.alert(`${xeniteColony.name.toUpperCase()} HAS FALLEN!`)
            }
        }
    }
    fetchColonies()
    colonies = getColonies()

    if (activeColoniesArr.length === 1) {
        window.alert(`WARNING: ${colonies[0].name.toUpperCase()} IS YOUR LAST REMAINING COLONY!`)
    } else if (activeColoniesArr.length === 0) {
        window.alert(`GAME OVER. YOUR LAST COLONY HAS FALLEN! Reset to play again.`)
    }

    const activeGovernorsArr = governors.filter(governor => governor.is_active === true)

    if (activeGovernorsArr.length === 0) {
        window.alert(`GAME OVER. YOUR LAST GOVERNOR ${govKilled.toUpperCase()} WAS KILLED! Reset to play again.`)
    }
    //--------------------------------------------------------------------
}

export const Cart = () => {
    const state = getState()
    const facilitiesInventory = getFacilitiesInventory();
    const coloniesInventory = getColoniesInventory();
    const minerals = getMinerals()
    const facilities = getFacilities()
    const colonies = getColonies()

    purchaseMineral = async () => {
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
                    await postColony_Inventory(newInventory)
                } else {
                    for (const cart_mineral of state.cart_minerals) {
                        if (cart_mineral.mineral_id === chosenColonyInventory.mineral_id) {
                            chosenColonyInventory.colony_stock += cart_mineral.amount
                        }
                    }
                    await putColony_Inventory(chosenColonyInventory, chosenColonyInventory.id);
                }

                for (const cart_mineral of state.cart_minerals) {
                    if (cart_mineral.mineral_id === chosenColonyInventory.mineral_id) {
                        chosenFacilityInventory.facility_stock -= cart_mineral.amount
                    }
                }
                try {
                    await putFacility_Inventory(chosenFacilityInventory, chosenFacilityInventory.id);
                } catch (error) {
                    console.error('PUT request failed for facility inventory ID:', chosenFacilityInventory.id);
                    console.error('Error:', error);
                    delay(1000);
                    try {
                        console.log('Retrying PUT request for facility inventory ID:', chosenFacilityInventory.id)
                        await putFacility_Inventory(chosenFacilityInventory, chosenFacilityInventory.id);
                    } catch (error) {
                        console.error('Error', error)
                    }
                }
                //FacilitiesGainMinerals--------------------------------
                for (const facInv of facilitiesInventory) {
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
                //-----------------------------------------------------
            }
            state.cart_minerals = []
            document.dispatchEvent(new CustomEvent("stateChanged"))

        }
    }
    let cartColony = null
    if (state.selectedColony) {
        cartColony = colonies.find((colony) => {
            return colony.id === state.selectedColony
        })
    }

    let html = `<div class="cart">
        <h1 id="heading-cart">${state.selectedColony ? cartColony.name : ``} Space Cart 🛒</h1>`

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

    html += `<div class="flex-list">`
    if (chosenMinerals.length && chosenFacility) {
        for (const mineral of chosenMinerals) {
            html += `<p class="cart__item">${mineral.amount} tonnes of ${mineral.name} from ${chosenFacility.name}<p>`
        }
    }

    if (chosenMinerals.length && chosenFacility) {
        html += `<div>
                <button id="purchaseButton">Purchase Minerals</button>
            </div>
        </div>`
    } else {
        html += `<div>
                <button disabled id="purchaseButton">Purchase Mineral</button>
            </div>
        </div>`
    }

    html += `</div>`


    return html
}
