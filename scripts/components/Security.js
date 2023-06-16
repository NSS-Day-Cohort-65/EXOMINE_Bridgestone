import { getColonies } from '../api/dataaccess.js'

document.addEventListener(
    "change",
    e => {
        if (e.target.id === "security-colony-selector") {

        }
    }
)

export const Security = () => {
    let colonies = getColonies()


    return "<h2>Security</h2>"
}
<>
    <p>Purchase Security</p>
</>