export const database = {
    governors: [
        {
            id: 1,
            name: "Zara Kallan",
            colony_id: 3,
            is_active: true
        },
        {
            id: 2,
            name: "Kael Orion",
            colony_id: 4,
            is_active: true
        },
        {
            id: 3,
            name: "Lana Solis",
            colony_id: 1,
            is_active: true
        },
        {
            id: 4,
            name: "Ezra Nova",
            colony_id: 5,
            is_active: true
        },
        {
            id: 5,
            name: "Nia Argos",
            colony_id: 2,
            is_active: true
        },
        {
            id: 6,
            name: "Astor Voss",
            colony_id: 1,
            is_active: true
        },
        {
            id: 7,
            name: "Lyra Raine",
            colony_id: 4,
            is_active: true
        },
        {
            id: 8,
            name: "Draco Kyros",
            colony_id: 3,
            is_active: true
        },
        {
            id: 9,
            name: "Vera Solara",
            colony_id: 2,
            is_active: true
        },
        {
            id: 10,
            name: "Liora Nova",
            colony_id: 5,
            is_active: true
        }
    ],
    minerals: [
        {
            id: 1,
            name: "Xenite",
        },
        {
            id: 2,
            name: "Luminarite",
        },
        {
            id: 3,
            name: "Stellacite",
        },
        {
            id: 4,
            name: "Nebulite",
        },
        {
            id: 5,
            name: "Astroquartz",
        },
        {
            id: 6,
            name: "Galaxium",
        },
        {
            id: 7,
            name: "Celestite",
        },
        {
            id: 8,
            name: "Meteorium",
        },
        {
            id: 9,
            name: "Stargem",
        },
        {
            id: 10,
            name: "Cosmolite",
        },
        {
            id: 11,
            name: "Aetherite",
        },
        {
            id: 12,
            name: "Orbithyst",
        },
        {
            id: 13,
            name: "Nebulium",
        },
        {
            id: 14,
            name: "Quasarite",
        },
        {
            id: 15,
            name: "Stellite",
        }
    ],
    facilities: [
        {
            id: 1,
            name: "Warforge Alpha",
            is_active: true
        },
        {
            id: 2,
            name: "Starhold Delta",
            is_active: true
        },
        {
            id: 3,
            name: "Battlespire Gamma",
            is_active: true
        },
        {
            id: 4,
            name: "Ravenspire Omega",
            is_active: true
        }
    ],
    colonies: [
        {
            id: 1,
            name: "Terra Nova",
        },
        {
            id: 2,
            name: "Nexus Prime",
        },
        {
            id: 3,
            name: "Astraia",
        },
        {
            id: 4,
            name: "Elysium",
        },
        {
            id: 5,
            name: "Stellara",
        }
    ],
    colony_inventory: [
        {
            id: 1,
            colony_id: 3, // Colony: Astraia
            mineral_id: 6, // Mineral: Galaxium
            colony_stock: 284
        },
        {
            id: 2,
            colony_id: 2, // Colony: Nexus Prime
            mineral_id: 10, // Mineral: Cosmolite
            colony_stock: 188
        },
        {
            id: 3,
            colony_id: 1, // Colony: Terra Nova
            mineral_id: 1, // Mineral: Xenite
            colony_stock: 342
        },
        {
            id: 4,
            colony_id: 4, // Colony: Elysium
            mineral_id: 9, // Mineral: Stargem
            colony_stock: 289
        },
        {
            id: 5,
            colony_id: 5, // Colony: Stellara
            mineral_id: 2, // Mineral: Luminarite
            colony_stock: 450
        },
        {
            id: 6,
            colony_id: 3, // Colony: Astraia
            mineral_id: 8, // Mineral: Meteorium
            colony_stock: 217
        },
        {
            id: 7,
            colony_id: 1, // Colony: Terra Nova
            mineral_id: 3, // Mineral: Stellacite
            colony_stock: 256
        },
        {
            id: 8,
            colony_id: 2, // Colony: Nexus Prime
            mineral_id: 12, // Mineral: Orbithyst
            colony_stock: 186
        },
        {
            id: 9,
            colony_id: 4, // Colony: Elysium
            mineral_id: 11, // Mineral: Aetherite
            colony_stock: 225
        },
        {
            id: 10,
            colony_id: 5, // Colony: Stellara
            mineral_id: 7, // Mineral: Celestite
            colony_stock: 270
        },
        {
            id: 11,
            colony_id: 3, // Colony: Astraia
            mineral_id: 5, // Mineral: Astroquartz
            colony_stock: 312
        },
        {
            id: 12,
            colony_id: 2, // Colony: Nexus Prime
            mineral_id: 4, // Mineral: Nebulite
            colony_stock: 300
        },
        {
            id: 13,
            colony_id: 1, // Colony: Terra Nova
            mineral_id: 14, // Mineral: Quasarite
            colony_stock: 225
        },
        {
            id: 14,
            colony_id: 4, // Colony: Elysium
            mineral_id: 13, // Mineral: Nebulium
            colony_stock: 227
        },
        {
            id: 15,
            colony_id: 5, // Colony: Stellara
            mineral_id: 15, // Mineral: Stellite
            colony_stock: 240
        },
        {
            id: 16,
            colony_id: 3, // Colony: Astraia
            mineral_id: 2, // Mineral: Luminarite 
            colony_stock: 215
        },
        {
            id: 17,
            colony_id: 2, // Colony: Nexus Prime
            mineral_id: 6, // Mineral: Galaxium
            colony_stock: 400
        },
        {
            id: 18,
            colony_id: 1, // Colony: Terra Nova
            mineral_id: 10, // Mineral: Cosmolite
            colony_stock: 250
        },
        {
            id: 19,
            colony_id: 4, // Colony: Elysium
            mineral_id: 1, // Mineral: Xenite
            colony_stock: 347
        },
        {
            id: 20,
            colony_id: 5, // Colony: Stellara
            mineral_id: 9, // Mineral: Stargem
            colony_stock: 276
        }
    ],
    facility_inventory: [
        {
            id: 1,
            facility_id: 1, // Facility: Warforge Alpha
            mineral_id: 7, // Mineral: Celestite
            facility_stock: 350
        },
        {
            id: 2,
            facility_id: 4, // Facility: Ravenspire Omega
            mineral_id: 15, // Mineral: Stellite
            facility_stock: 260
        },
        {
            id: 3,
            facility_id: 3, // Facility: Battlespire Gamma
            mineral_id: 5, // Mineral: Astroquartz
            facility_stock: 390
        },
        {
            id: 4,
            facility_id: 2, // Facility: Starhold Delta
            mineral_id: 11, // Mineral: Aetherite
            facility_stock: 425
        },
        {
            id: 5,
            facility_id: 1, // Facility: Warforge Alpha
            mineral_id: 4, // Mineral: Nebulite
            facility_stock: 320
        },
        {
            id: 6,
            facility_id: 4, // Facility: Ravenspire Omega
            mineral_id: 8, // Mineral: Meteorium
            facility_stock: 289
        },
        {
            id: 7,
            facility_id: 3, // Facility: Battlespire Gamma
            mineral_id: 12, // Mineral: Orbithyst
            facility_stock: 215
        },
        {
            id: 8,
            facility_id: 2, // Facility: Starhold Delta
            mineral_id: 7, // Mineral: Celestite
            facility_stock: 310
        },
        {
            id: 9,
            facility_id: 1, // Facility: Warforge Alpha
            mineral_id: 13, // Mineral: Nebulium
            facility_stock: 277
        },
        {
            id: 10,
            facility_id: 4, // Facility: Ravenspire Omega
            mineral_id: 2, // Mineral: Luminarite
            facility_stock: 215
        },
        {
            id: 11,
            facility_id: 3, // Facility: Battlespire Gamma
            mineral_id: 3, // Mineral: Stellacite
            facility_stock: 227
        },
        {
            id: 12,
            facility_id: 2, // Facility: Starhold Delta
            mineral_id: 6, // Mineral: Galaxium
            facility_stock: 400
        },
        {
            id: 13,
            facility_id: 1, // Facility: Warforge Alpha
            mineral_id: 9, // Mineral: Stargem
            facility_stock: 375
        },
        {
            id: 14,
            facility_id: 4, // Facility: Ravenspire Omega
            mineral_id: 14, // Mineral: Quasarite
            facility_stock: 246
        },
        {
            id: 15,
            facility_id: 3, // Facility: Battlespire Gamma
            mineral_id: 1, // Mineral: Xenite
            facility_stock: 400
        },
        {
            id: 16,
            facility_id: 2, // Facility: Starhold Delta
            mineral_id: 10, // Mineral: Cosmolite
            facility_stock: 275
        }
    ],
    spaceCart: {},
    transientState: {
        turn: 1,
    }
};


