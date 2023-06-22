import { Exomine } from './Exomine.js'
import { fetchColonies, fetchColonies_Inventory, fetchFacilities, fetchFacility_Inventory, fetchGovernors, fetchMinerals, fetchPirate_Inventory, fetchPirates } from './api/dataaccess.js'

const mainContainer = document.querySelector("#main-container")

document.addEventListener(
    "stateChanged",
    customEvent => {
        renderHtml()
    }
)

const tryAndRetry = async (func) => {
    try {
        await func()
    } catch (Error) {
        console.error("Error:", Error)
        delay(1000)
        try {

            console.log("Retrying:", func.name)
            await func()
        } catch (Error) {
            console.error(`Failed ${func.name} again`)
            console.error("Error:", Error)
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const renderHtml = async () => {
    await tryAndRetry(fetchMinerals)
    await tryAndRetry(fetchGovernors)
    await tryAndRetry(fetchColonies)
    await tryAndRetry(fetchFacilities)
    await tryAndRetry(fetchPirates)
    await tryAndRetry(fetchPirate_Inventory)
    await tryAndRetry(fetchColonies_Inventory)
    await tryAndRetry(fetchFacility_Inventory)
    mainContainer.innerHTML = Exomine();

}

renderHtml(); 

