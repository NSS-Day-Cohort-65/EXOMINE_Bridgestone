import { Exomine } from './Exomine.js'
import { fetchColonies, fetchColonies_Inventory, fetchFacilities, fetchFacility_Inventory, fetchGovernors, fetchMinerals, fetchPirate_Inventory, fetchPirates } from './api/dataaccess.js'

const mainContainer = document.querySelector("#main-container")

document.addEventListener(
    "stateChanged",
    customEvent => {
        renderHtml()
    }
)

// export const renderHtml = () => {
//     fetchMinerals()
//         .then(() => fetchGovernors())
//         .then(() => fetchColonies())
//         .then(() => fetchFacilities())
//         .then(() => fetchPirates())
//         .then(() => fetchPirate_Inventory())
//         .then(() => fetchColonies_Inventory())
//         .then(() => fetchFacility_Inventory())
//         .then(
//             () => {
//                 mainContainer.innerHTML = Exomine();
//             }
//         )
// }
export const renderHtml = async () => {
    await fetchMinerals()
    await fetchGovernors()
    await fetchColonies()
    await fetchFacilities()
    await fetchPirates()
    await fetchPirate_Inventory()
    await fetchColonies_Inventory()
    await fetchFacility_Inventory()
    mainContainer.innerHTML = Exomine();

}

renderHtml(); 