import { getGoverners, setGovernor } from '../api/dataaccess.js'

document.addEventListener(
    "change",
    e => {
        if (e.target.id.startsWith("governor")) {
            let [, governorId] = e.target.id.spilt("--")
            setGovernor(parseInt(governorId));
        }
    }
)

export const Governors = () => {
    const governors = getGoverners();

    let html = `<select id="governor-selector">
        <option value="">Select a governor...</option>
        ${governors.map(
        governor => {
            if (governor.is_active) return `<option value="governor--${governor.id}">${governor.name}</option>`
        })}
        </select>
        `;

    return html
}