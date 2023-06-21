import { getColonies, getGovernors, getState, getColoniesInventory, getMinerals, putColony_Inventory } from "../api/dataaccess.js"

//write a function that will display the colony of the selected governor. This should display the resources it currently has.

//Additional functions will be needed while doing this:

//Function that takes a governor object, iterates through the colonies, matches the colony_id on the governor object with the id on the colony object and returns that colony.

const findColonyWithGovObj = (govObj) => {
    const colonies = getColonies()

    const matchedColony = colonies.find(colony => {
        return govObj.colony_id === colony.id
    })
    return matchedColony
}

//Function that takes a colony object and iterates through all objects in colony_inventory. All colony_inventory objects with a matching id to the colony object should be stored in an array and then returned.

const findColInvObjsWithColObj = colObj => {
    const colInventory = getColoniesInventory()

    const colInvArr = colInventory.filter(colInv => colInv.colony_id === colObj.id)

    return colInvArr
}

//write a function that takes a mineral id, iterates all minerals, and returns the matching mineral object

const findMineralObjwithMineralId = minId => {
    const minerals = getMinerals()
    return minerals.find(mineral => {
        return mineral.id === minId
    })
}

//Function that will take an array of colony_inventory objects and display their mineral names (will need a function to find the matching mineral name) and stock as html representations in a list

const colonyInvHTMLGen = colonyInvArr => {
    const colInvSpreadArr = colonyInvArr.map(colInvObj => ({ ...colInvObj }))
    let html = `<ul id='colonyResources__list' class="list">`
    html += colInvSpreadArr.map(colInvObj => {
        return `<li class='colonyResources__item list__item'>${colInvObj.colony_stock} tons of ${findMineralObjwithMineralId(colInvObj.mineral_id).name}</li>`
    }).join('')
    html += `</ul>`

    return html
}


export const ColonyResources = () => {
    const governors = getGovernors()
    const state = getState()
    let html = ''
    if (state.selectedGovernor) {
        const stateGovId = state.selectedGovernor //grabs id of selected gov in state

        const matchedGov = governors.find(gov => {
            return gov.id === stateGovId
        }) //stores gov obj that matches stateGovId

        const matchedColony = findColonyWithGovObj(matchedGov) //stores the colony Obj that matches the id of the gov obj passed to it

        const colonyInvArr = findColInvObjsWithColObj(matchedColony) //stores the arr of colony inventory objects gotten by matching the id of the colony passed to it with the colony_id's on the colony_inventory objects

        html += `<h1 id='colonyName_heading'>${matchedColony.name} Minerals:</h1>
    <ul id='colonyResources__list'>
    ${colonyInvHTMLGen(colonyInvArr)}
    </ul>` // parses the colonyInvArr sent and generates the html for each resource in a list item format


    } else {
        html += `<h1 id='colonyResources_heading'>Colony Resources</h1>`
    }

    return html
}


// write function to reduce colony minerals by a random amount every turn. Will trigger this function using a click event off of the purchase button

const coloniesUseMinerals = async () => {
    const colInventory = getColoniesInventory()

    for (const colInv of colInventory) {

        if (colInv.mineral_id === 1 || colInv.mineral_id === 2) {

            let randomAmount = Math.ceil(Math.random() * 10);

            let newObj = {
                id: colInv.id,
                colony_id: colInv.colony_id,
                mineral_id: colInv.mineral_id,
                colony_stock: colInv.colony_stock - randomAmount
            }

            await putColony_Inventory(newObj, colInv.id)
        }
    }
}

document.addEventListener(
    "addAndUseMinerals",
    async e => {
        await coloniesUseMinerals()
    }
)

