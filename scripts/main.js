import { Exomine } from './Exomine.js'

const mainContainer = document.querySelector("#main-container")

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        renderHtml()
    }
)

export const renderHtml = () => {
    mainContainer.innerHTML = Exomine();
}

renderHtml(); 