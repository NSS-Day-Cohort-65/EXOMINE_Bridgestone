import { getPirateInventory } from "../api/dataaccess.js"


//write a function that will get and add pirate raiders to pirate object


//write a function that makes a visual representation of the pirate ship using an image. Below that, it should pull in the pirate inventory and generates an html representation of it (total minerals combined and pirate raider count)

const Pirates = () => {
    
    const pirateInventory = getPirateInventory()

    let html = ''

    //set up pirate container and pirate ship image html

    html += `<div id="pirate-container" class="flex-container>"`

    html+= `<img id="pirate-ship-image" class="image" "/images/space-pirate.png" alt="EVIL SPACE PIRATES">`

    //set up pirate resource container and pirate resource html representation. Will container total minerals and raider count, along with function to add raiders to count

    html += `<div id="pirate-resource-container" class="flex-container">`

    //write function to get all pirate-inventory objects, total the stock, and return that number
    const totalPirateInventoryStock = () => {
        let stockTotal = 0
        for (const inv of pirateInventory) {
            stockTotal += inv.pirate_stock
        }
        return stockTotal
    }

    //put above function into html representation

    html += `<div id="pirate-mineral-container" class="flex container"><h3 class="pirate-resource-heading">Minerals</h3><p id="pirate-mineral-total" class="pirate-resource-paragraph">${totalPirateInventoryStock()}</p>`

    html += `</div>`

    //take function that generates total pirate raider count and put it into html representation



    //set up end of pirate-container html

    html += `</div>`
}
