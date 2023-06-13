import { getColonies } from "../api/dataaccess.js"
import { getGovernors } from "../api/dataaccess.js"
import { getState } from "../api/dataaccess.js"
import { getColoniesInventory } from "../api/dataaccess.js"
import { getMinerals } from "../api/dataaccess.js"

const state = getState()
const governors = getGovernors()
const colonies = getColonies()
const colInventory = getColoniesInventory()
const minerals = getMinerals()

//write a function that will display the colony of the selected governor. This should display the resources it currently has.

//Additional functions will be needed while doing this:

//Function that takes a governor object, iterates through the colonies, matches the colony_id on the governor object with the id on the colony object and returns that colony.

const findColonyWithGovObj = (govObj) => {
    const matchedColony = colonies.find(colony => {
        return govObj.colony_id === colony.id
    })
    return matchedColony
}

//Function that takes a colony object and iterates through all objects in colony_inventory. All colony_inventory objects with a matching id to the colony object should be stored in an array and then returned.

const findColInvObjsWithColObj = colObj => {
    const colInvArr = colInventory.filter(colInv => colInv.colony_id === colObj.id)

    return colInvArr
}

//write a function that takes a mineral id, iterates all minerals, and returns the matching mineral object

const findMineralObjwithMineralId = minId => {
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
    let html = ''
    if (state.selectedGovernor) {
        const stateGovId = state.selectedGovernor //grabs id of selected gov in state

        const matchedGov = governors.find(gov => {
            return gov.id === stateGovId
        }) //stores gov obj that matches stateGovId

        const matchedColony = findColonyWithGovObj(matchedGov) //stores the colony Obj that matches the id of the gov obj passed to it

        const colonyInvArr = findColInvObjsWithColObj(matchedColony) //stores the arr of colony inventory objects gotten by matching the id of the colony passed to it with the colony_id's on the colony_inventory objects

        html += `<h2 id='colonyName_heading'>${matchedColony.name} Minerals:</h2>
    <ul id='colonyResources__list'>
    ${colonyInvHTMLGen(colonyInvArr)}
    </ul>` // parses the colonyInvArr sent and generates the html for each resource in a list item format

        
    } else {
        html += `<h1 id='colonyResources_heading'>Colony Resources</h1>`
    }

    return html
}



