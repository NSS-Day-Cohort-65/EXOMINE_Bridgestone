import { getColonies, getGovernors, getState, getMinerals, putGovernor, setSelectedRecruit, setSelectedRecruitColony, getColoniesInventory, putColony_Inventory } from '../api/dataaccess.js';
import { appSettings } from '../../appSettings.js'


let settings = appSettings.governorRecruiter

const GOVERNOR_COST = settings.GOVERNOR_COST;

let mineralsToSpend = {};
let mineralTotalValue = 0;

document.addEventListener(
    "change",
    e => {
        if (e.target.id.startsWith("recruit")) {
            let [, governorId] = e.target.value.split("--")
            setSelectedRecruit(parseInt(governorId));
        }
    }
)

document.addEventListener(
    "change",
    e => {
        if (e.target.id.startsWith("colony")) {
            let [, colonyId] = e.target.value.split("--")
            setSelectedRecruitColony(parseInt(colonyId));
        }
    }
)

document.addEventListener(
    "click",
    e => {
        if (e.target.id === "button-recruit") {
            const state = getState();
            const governors = getGovernors();
            // toggle selected governor to is active and set colony
            let foundGovernor = governors.find(governor => governor.id === state.selectedRecruit);
            let recruit = {
                id: foundGovernor.id,
                name: foundGovernor.name,
                colony_id: state.selectedRecruitColony,
                is_active: true,
                is_alive: foundGovernor.is_alive,
            }
            removeMinerals()
            putGovernor(recruit, recruit.id);
            setSelectedRecruit(0)
            setSelectedRecruitColony(0)
        }
    }
)

document.addEventListener("change",
    e => {
        if (e.target.id.startsWith("governorMineralInput")) {
            let [, mineralId] = e.target.name.split("--")
            let [, inventoryId] = e.target.id.split("--")
            if (mineralsToSpend[e.target.name]) {
                mineralsToSpend[e.target.name].amount = e.target.value
            } else {
                mineralsToSpend[e.target.name] =
                {
                    amount: e.target.value,
                    mineral_id: mineralId,
                    inventory_id: inventoryId,
                    value: parseInt(e.target.dataset.mineralvalue)
                }
            }
        }
    }
)

const calculateMineralTotalValue = () => {
    let total = 0
    for (const key in mineralsToSpend) {
        total += mineralsToSpend[key].amount * mineralsToSpend[key].value;
    }
    mineralTotalValue = total;
}

const removeMinerals = async () => {
    let selectedInventory = [];
    const coloniesInventory = getColoniesInventory();
    for (const inventory in mineralsToSpend) {
        let foundInventory = coloniesInventory.find(inv => inv.id === parseInt(mineralsToSpend[inventory].inventory_id))
        foundInventory.colony_stock -= mineralsToSpend[inventory].amount
        selectedInventory.push(foundInventory);
    }
    for (const inventory of selectedInventory) {
        try {
            await putColony_Inventory(inventory, inventory.id);
        } catch (error) {
            console.error('PUT request failed for colony inventory ID:', inventory.id);
            console.error('Error:', error);
            delay(1000);
            try {
                console.log('Retrying PUT request for colony inventory ID:', inventory.id)
                await putColony_Inventory(inventory, inventory.id);
            } catch (error) {
                console.error('Error', error)
            }
        }
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const GovernorRecruiter = () => {
    const governors = getGovernors();
    const colonies = getColonies();
    const state = getState();
    calculateMineralTotalValue();

    // the event listener looks for the selector id to start with recruit
    let html = `
        <h1 class="headings-containers">Governor Recruiter 🎖️</h1>
        <p>Choose a Governor</p>
        <select id="recruit-selector" class="selector">
        <option value="0">Select a recruit...</option>`

    html += governors.map(governor => {
        if (!governor.is_active && governor.is_alive) {
            if (state.selectedRecruit === governor.id) {
                return `<option selected value="recruit--${governor.id}">${governor.name}</option>`
            } else {
                return `<option value="recruit--${governor.id}">${governor.name}</option>`
            }
        }
    }).join("")

    html += "</select>"

    if (state.selectedRecruit) {
        html += `<p>Choose a Colony</p>
    <select id="colony-selector" class="selector">
    <option value="0">Select a colony...</option>`
    } else {
        html += `<p>Choose a Colony</p>
    <select disabled id="colony-selector" class="selector">
    <option value="0">Select a colony...</option>`
    }

    html += colonies.map(colony => {
        if (state.selectedRecruitColony === colony.id) {
            return `<option selected value="colony--${colony.id}">${colony.name}</option>`
        } else {
            return `<option value="colony--${colony.id}">${colony.name}</option>`
        }
    }).join("")

    html += `</select>`



    if (state.selectedRecruit && state.selectedRecruitColony) {
        const coloniesInventory = getColoniesInventory();
        let foundColonyInventory = []
        for (const inventory of coloniesInventory) {
            if (inventory.colony_id === state.selectedRecruitColony) {
                foundColonyInventory.push(inventory)
            }
        }

        html += foundColonyInventory.map(
            inventory => {
                const minerals = getMinerals();
                let foundMineral = minerals.find(mineral => mineral.id === inventory.mineral_id)
                let inputName = `${foundMineral.name}--${inventory.mineral_id}`
                return `<label class="governor-mineral-heading" for="${inputName}" >${foundMineral.name}</label><div id="governor-items-line">
                    <p class="governor-mineral-value">Value: ${foundMineral.value}</p>
                    <p class="governor-mineral-available">Available: ${inventory.colony_stock}</p>
                    <input data-mineralValue=${foundMineral.value} class="governor-mineral-input" name="${inputName}" id="governorMineralInput--${inventory.id}" type="number" min="0" max="${inventory.colony_stock}" value="${mineralsToSpend[inputName] ? mineralsToSpend[inputName].amount : 0}"></div>`
            }
        ).join("")

        html += `<p id="governor-recruitment-cost">Recruitment Cost:${GOVERNOR_COST}</p><p id="governor-current-value">Current Value:${mineralTotalValue}</p>`
        if (mineralTotalValue >= GOVERNOR_COST) {
            html += `<button id="button-recruit">Recruit</button>`
        } else {
            html += `<button id="button-recruit" disabled>Recruit</button>`
        }

    } else {
        html += `<button id="button-recruit" disabled>Recruit</button>`

    }

    return html
}

//increase turn anytime a governor is purchased:

document.addEventListener("click", e => {
    if (e.target.id === "button-recruit") {
        incrementTurn()
    }
})