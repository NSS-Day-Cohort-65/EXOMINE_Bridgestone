//write an event listener for startRaid custom event that launches the raidAlert function

document.addEventListener("startRaid", CustomEvent => {
    raidAlert()
}
)

const raidAlert = () => {
    const alert = document.querySelector("#raid-alert")

    alert.style.display = "block"
}