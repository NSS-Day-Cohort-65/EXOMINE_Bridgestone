import { getPirateInventory, getPirates, getState, putPirates } from "../api/dataaccess.js"


//write a click even that increments turnCount by 1 everytime purchaseButton is clicked. Write function that fires after 3 turns (turncount hits 3) and adds 5 raiders to the pirate object, then returns the new value.

let turnCount = 0

document.addEventListener("click", e => {
    if (e.target.id === "purchaseButton") {
        turnCount++
        if (turnCount === 3) {
            addPirateRaiders()
        }
    }
})

const addPirateRaiders = () => {
    const pirates = getPirates()
    let newPirateObj = {
        id: pirates[0].id,
        raider_stock: pirates[0].raider_stock + 5
    }
    
    putPirates(newPirateObj, pirates[0].id)
    return pirates[0].raider_stock
}

//write a function that makes a visual representation of the pirate ship using an image. Below that, it should pull in the pirate inventory and generates an html representation of it (total minerals combined and pirate raider count)

export const Pirates = () => {

    const pirateInventory = getPirateInventory()

    let html = ''

    //set up pirate container and pirate ship image html

    html += `<div id="pirate-container" class="flex-container">`

    html += `<img id="pirate-ship-image" class="image" src="/images/pirate-ship.png" alt="EVIL SPACE PIRATES">`

    //add pirates border container and heading

    html += `<div id="pirate-text-container"> <h1 id="pirate-header">Pirates</h1>`

    //set up pirate resource container and pirate resource html representation. Will container total minerals and raider count, along with function to add raiders to count

    html += `<div id="pirate-resources-container-all" class="flex-container">`

    //write function to get all pirate-inventory objects, total the stock, and return that number
    const totalPirateInventoryStock = () => {
        let stockTotal = 0
        for (const inv of pirateInventory) {
            stockTotal += inv.pirate_stock
        }
        return stockTotal
    }

    //put above function into html representation

    html += `<div id="pirate-mineral-container" class="flex container pirate-resource-container"><h3 class="pirate-resource-heading">Minerals</h3><p id="pirate-mineral-total" class="pirate-resource-paragraph">${totalPirateInventoryStock()}</p></div>`

    //take function that generates total pirate raider count and puts it into html representation

    html += `<div id="pirate-raider-container" class="flex container pirate-resource-container"><h3 class="pirate-resource-heading">Raiders</h3><p id="pirate-raider-total" class="pirate-resource-paragraph">${addPirateRaiders()}</p></div>`

    //set up end of pirate-text-container div

    html += `</div>`

    //set up end of pirate-resource-container div

    html += `</div>`

    //set up end of pirate-container div

    html += `</div>`

    return html
}
