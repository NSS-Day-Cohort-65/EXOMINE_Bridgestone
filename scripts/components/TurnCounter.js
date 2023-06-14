import { getState, incrementTurn } from '../api/dataaccess.js'

document.addEventListener(
    "click",
    e => {
        if (e.target.id === "purchaseButton") {
            incrementTurn()
        }
    }
)

export const TurnCounter = () => {
    let turn = getState().turn

    return `<h2>Turn ${turn}</h2>`
}