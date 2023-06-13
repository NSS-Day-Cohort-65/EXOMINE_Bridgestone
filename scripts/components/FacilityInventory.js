import { getFacilities, getFacilitiesInventory, getMinerals, getState, setFacility } from '../api/dataaccess.js'

export const FacilityInventory = () => {
    const facilities = getFacilities();
    const minerals = getMinerals();
    const facilitiesInventory = getFacilitiesInventory();
    const state = getState();
    const facilityName = facilities.find(facility => facility.id === state.selectedFacility)

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
                return `<div class="facilityInventory__items"><input type="radio" name="minerals" value="${inventory.mineral_id}">${inventory.facility_stock} tonnes of ${inventory.mineralName}</input></div>`
            }).join("")
        } else {
            return ""
        }
    }



    mineralRadioSelectors();

    let html = `<div class="flex-container" id="minerals-selector">
        <h2 id="facility__header">Facility Minerals ${state.chosenFacilityId ? `for ${facilityName}` : ""}</h2>
            ${mineralRadioSelectors()}
        </div>`

    return html

}
