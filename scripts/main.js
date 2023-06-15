import { Exomine } from './Exomine.js'
import { fetchColonies, fetchColonies_Inventory, fetchFacilities, fetchFacility_Inventory, fetchGovernors, fetchMinerals, fetchPirate_Inventory, fetchPirates } from './api/dataaccess.js'

const mainContainer = document.querySelector("#main-container")

document.addEventListener(
    "stateChanged",
    customEvent => {
        renderHtml()
    }
)

export const renderHtml = () => {
    fetchPirate_Inventory()
    .then(() => fetchGovernors())
    .then(() => fetchMinerals())
    .then(() => fetchColonies())
    .then(() => fetchFacilities())
    .then(() => fetchPirates())
    .then(() => fetchPirate_Inventory())
    .then(() => fetchColonies_Inventory())
    .then(() => fetchFacility_Inventory())
    .then(
        () => {
            mainContainer.innerHTML = Exomine();
        }
    )
}

renderHtml(); 