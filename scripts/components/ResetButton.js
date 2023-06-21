import { deleteColonyInventory, deletePirateInventory, getColonies, getColoniesInventory, getFacilities, getFacilitiesInventory, getGovernors, getPirateInventory, getPirates, putColony, putColony_Inventory, putFacility, putFacility_Inventory, putGovernor, putPirates, resetState } from "../api/dataaccess.js"

const deleteExtraColonyInventory = async () => {
  const colonyInv = await getColoniesInventory()

  for (const colInv of colonyInv) {
    if (colInv.id > 20) {
      await deleteColonyInventory(colInv.id)
    }
  }
}

const resetGovernors = async () => {
  const governors = await getGovernors()

  for (const gov of governors) {
    if (gov.id > 10) {
      let newObj = {
        id: gov.id,
        name: gov.name,
        colony_id: gov.colony_id,
        is_active: false,
        is_alive: true
      }
      await putGovernor(newObj, gov.id)
    } else {
      let newObj = {
        id: gov.id,
        name: gov.name,
        colony_id: gov.colony_id,
        is_active: true,
        is_alive: true
      }
      await putGovernor(newObj, gov.id)
    }
  }
}

const deleteAllPirateInventory = async () => {
  const pirateInv = await getPirateInventory()
  
  if (pirateInv.length >= 1) {
    for (const pirInv of pirateInv) {
      await deletePirateInventory(pirInv.id)
    }
  }
}

const resetFacilityMinerals = async () => {
  const facilityInv = await getFacilitiesInventory()

  for (const facInv of facilityInv) {
    let newObj = {
      id: facInv.id,
      facility_id: facInv.facility_id,
      mineral_id: facInv.mineral_id,
      facility_stock: 300
    }

    await putFacility_Inventory(newObj, facInv.id)
  }
}

const resetColonyMinerals = async () => {
  const colonyInv = await getColoniesInventory()
  
  if (colonyInv.length >= 1) {
    for (const colInv of colonyInv) {
      let newObj = {
        id: colInv.id,
        colony_id: colInv.colony_id,
        mineral_id: colInv.mineral_id,
        colony_stock: 200
      }

      await putColony_Inventory(newObj, colInv.id)
    }
  }
}

const resetRaiderCount = async () => {
  const pirates = await getPirates()

  for (const pirate of pirates) {
    let newObj = {
      id: pirate.id,
      raider_stock: 0
    }
    await putPirates(newObj, pirate.id)
  }
}

const resetFacilities = async () => {
  const facilities = await getFacilities()

  for (const facility of facilities) {
    let newObj = {
      id: facility.id,
      name: facility.name,
      is_active: true,
      security: 0,
      is_facility: true
    }
    await putFacility(newObj, facility.id)
  }
}

const resetColonies = async () => {
  const colonies = await getColonies()

  for (const colony of colonies) {
    let newObj = {
      id: colony.id,
      name: colony.name,
      security: 0,
      is_colony: true
    }
    await putColony(newObj, colony.id)
  }
}

const resetAll = async () => {
  await resetColonyMinerals()
  await resetFacilityMinerals()
  await resetGovernors()
  await resetRaiderCount()
  await deleteExtraColonyInventory()
  await deleteAllPirateInventory()
  await resetFacilities()
  await resetColonies()
  await resetState()
}

document.addEventListener("click", async (e) => {
  if (e.target.id === "resetButton") {
    await resetAll()
  }
})

export const generateResetButtonHTML = () => {
  let html = `<button id="resetButton">Reset</button>`

  return html
}
