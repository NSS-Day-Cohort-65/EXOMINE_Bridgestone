import { deleteColonyInventory, deletePirateInventory, getColonies, getColoniesInventory, getFacilities, getFacilitiesInventory, getGovernors, getPirateInventory, getPirates, putColony, putColony_Inventory, putFacility, putFacility_Inventory, putGovernor, putPirates, resetState } from "../api/dataaccess.js"

const deleteExtraColonyInventory = async () => {
  const colonyInv = await getColoniesInventory()

  for (const colInv of colonyInv) {
    if (colInv.id > 3) {
      await deleteColonyInventory(colInv.id)
    }
  }
}

const resetGovernors = async () => {
  const governors = getGovernors()

  for (const gov of governors) {
    if (gov.id > 3) {
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
  const pirateInv = getPirateInventory()

  if (pirateInv.length >= 1) {
    for (const pirInv of pirateInv) {
      await deletePirateInventory(pirInv.id)
    }
  }
}

const resetFacilityMinerals = async () => {
  const facilityInv = await getFacilitiesInventory()

  for (const facInv of facilityInv) {
    if (facInv.id === 1) {
      let newObj = {
        id: facInv.id,
        facility_id: facInv.facility_id,
        mineral_id: facInv.mineral_id,
        facility_stock: 20
      }
      await putFacility_Inventory(newObj, facInv.id)
    } else if (facInv.id === 2) {
      let newObj = {
        id: facInv.id,
        facility_id: facInv.facility_id,
        mineral_id: facInv.mineral_id,
        facility_stock: 15
      }
      await putFacility_Inventory(newObj, facInv.id)
    } else if (facInv.id === 3) {
      let newObj = {
        id: facInv.id,
        facility_id: facInv.facility_id,
        mineral_id: facInv.mineral_id,
        facility_stock: 10
      }
      await putFacility_Inventory(newObj, facInv.id)
    } else if (facInv.id > 3 && facInv.id < 10) {
      let newObj = {
        id: facInv.id,
        facility_id: facInv.facility_id,
        mineral_id: facInv.mineral_id,
        facility_stock: 5
      }
      await putFacility_Inventory(newObj, facInv.id)
    } else {
      let newObj = {
        id: facInv.id,
        facility_id: facInv.facility_id,
        mineral_id: facInv.mineral_id,
        facility_stock: 3
      }
      await putFacility_Inventory(newObj, facInv.id)
    }
  }
}

const resetColonyMinerals = async () => {
  const colonyInv = getColoniesInventory()

  if (colonyInv.length >= 1) {
    for (const colInv of colonyInv) {
      let newObj = {
        id: colInv.id,
        colony_id: colInv.colony_id,
        mineral_id: colInv.mineral_id,
        colony_stock: 30
      }

      await putColony_Inventory(newObj, colInv.id)
    }
  }
}

const resetRaiderCount = async () => {
  const pirates = getPirates()

  for (const pirate of pirates) {
    let newObj = {
      id: pirate.id,
      raider_stock: 10
    }
    await putPirates(newObj, pirate.id)
  }
}

const resetFacilities = async () => {
  const facilities = getFacilities()

  for (const facility of facilities) {
    let newObj = {
      id: facility.id,
      name: facility.name,
      is_active: true,
      security: 10,
      is_facility: true
    }
    await putFacility(newObj, facility.id)
  }
}

const resetColonies = async () => {
  const colonies = getColonies()

  for (const colony of colonies) {
    let newObj = {
      id: colony.id,
      name: colony.name,
      security: 20,
      is_colony: true,
      is_active: true
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
  resetState()
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
