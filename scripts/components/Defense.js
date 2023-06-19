
import { getColonies, getFacilities, getPirates, getState, putColony, putFacility } from "../api/dataaccess.js";

//component to implement the ability for a facility or colony to defend themselves against a raid if the have the proper amount of security forces to do so. 

/*need to:

get state, as we'll need to see what the colony/facility raided was.

get colonies and facilities as their security level is stored in those objects.

get pirates to get access to the amount of raiders they have.

a function to check if a raid was successful (will need to implement in pirates.js)

*/

//when startRaid event is triggered, check state to see what location was raided. Then, get that location and compare its security to the pirates raiders. If there is equal or greater security than raiders, the raid will not happen (will need to edit functions in pirates.js). If there are less security units than raiders, the raid does happen. Regardless of the amount of security, the number of security will need to be reduced after each raid by the amount of raiders the pirates had. This amount cannot go below 0, however.


const state = getState()
const facilities = getFacilities()
const colonies = getColonies()
const pirates = getPirates()


//is successful check function. Returns a boolean.

export const isRaidSuccessful = () => {
    
    const state = getState()
    const pirates = getPirates()
    const facilities = getFacilities()
    const colonies = getColonies()
    //combine all facility and colony objects together into one array so we can use one find method to search all of the names at once
    const allLocations = facilities.concat(colonies)

    const raidedLocationName = state.lastLocationRaided
    
    const matchedLocation = allLocations.find( location => location.name === raidedLocationName)

    if (matchedLocation.security < pirates[0].raider_stock) {
        return true
    } else {
        return false
    }
}


// write a function that will reduce security of colony/facility by amount of raiders when a raid occurs.
export const reduceSecurityAfterRaid = () => {
    
    const state = getState()
    const pirates = getPirates()
    const facilities = getFacilities()
    const colonies = getColonies()
    //combine all facility and colony objects together into one array so we can use one find method to search all of the names at once
    const allLocations = facilities.concat(colonies)

    const raidedLocationName = state.lastLocationRaided
    
    const matchedLocation = allLocations.find( location => location.name === raidedLocationName)

    //write a function to return whether if the matched location is a colony or facility

    const colonyOrFacilityCheck = () => {
        if (matchedLocation.is_colony) {
            return "colony"
        } else {
            return "facility"
        }
    }

    const colonyOrFacility = colonyOrFacilityCheck()

    if (colonyOrFacility === "colony") {
        if (matchedLocation.security > pirates[0].raider_stock) {
            let newObj = {
                id: matchedLocation.id,
                name: matchedLocation.name,
                security: matchedLocation.security - pirates[0].raider_stock,
                is_colony: true
              }
              putColony(newObj, matchedLocation.id)
        } else {
            let newObj = {
                id: matchedLocation.id,
                name: matchedLocation.name,
                security: 0,
                is_facility: true
              }
              putColony(newObj, matchedLocation.id)

        }
    } else {
        if (matchedLocation.security > pirates[0].raider_stock) {
            let newObj = {
                id: matchedLocation.id,
                name: matchedLocation.name,
                is_active: matchedLocation.is_active,
                security: matchedLocation.security - pirates[0].raider_stock
              }
              putFacility(newObj, matchedLocation.id)
        } else {
            let newObj = {
                id: matchedLocation.id,
                name: matchedLocation.name,
                is_active: matchedLocation.is_active,
                security: 0
              }
              putFacility(newObj, matchedLocation.id)

        }
    }
}