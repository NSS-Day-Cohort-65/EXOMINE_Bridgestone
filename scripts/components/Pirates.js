import { getState } from '../api/dataaccess.js'

// increase this number to decrease difficulty
const MAX = 10
const GRACE_PERIOD = 4

const checkForRaid = (turn) => {
    const randomRoll = Math.ceil(Math.random() * MAX)
    if (randomRoll < turn) {
        return true
    } else {
        return false
    };
}

export const Pirates = () => {
    const currentTurn = getState().turn
    let startRaid = false
    if (currentTurn > GRACE_PERIOD) {
        startRaid = checkForRaid(currentTurn);
    }

    if (startRaid) {
        // add raid functionality here
    }

    return "<h2>Pirates</h2>"
}