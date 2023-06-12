import { getFacilities, getFacilitiesInventory, getMinerals, getState, setFacility } from '../api/dataaccess.js'

export const FacilityInventory = () => {
    const facilities = getFacilities();
    const minerals = getMinerals();
    const facilitiesInventory = getFacilitiesInventory();
    // setFacility(1);
    const state = getState();
    const facilityName = facilities.find(facility => facility.id === state.selectedFacility)

    const mineralRadioSelectors = () => {
        const chosenFacilityId = state.selectedFacility;
        if (state.selectedFacility) {
            let chosenFacilityInventory = facilitiesInventory.filter(inventory => {
                return inventory.facility_id = chosenFacilityId;
            })

            for (const inventory of chosenFacilityInventory) {
                for (const mineral of minerals) {
                    if (mineral.id === inventory.mineral_id)
                        inventory.mineralName = mineral.name;
                }
            }

            return chosenFacilityInventory.map(inventory => {
                return `<input type="radio" name="minerals" value="${inventory.mineral_id}">${inventory.facility_stock} tonnes of ${inventory.mineralName}</input>`
            }).join("")
        } else {
            return ""
        }
    }



    mineralRadioSelectors();

    let html = `<div class="flex-container" id="minerals-selector">
        <h2>Facility Minerals ${state.chosenFacilityId ? `for ${facilityName}` : ""}</h2>
            ${mineralRadioSelectors()}
        </div>`

    return html

}
