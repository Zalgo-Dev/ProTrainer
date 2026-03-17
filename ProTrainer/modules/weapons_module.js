/// <reference path="../../.config/sa.d.ts" />

export class WeaponsMenu {
    constructor() {
        this.state = {
            // States for Weapons options
            // Example: infiniteAmmo: false, no reload, etc.
            fastReload: false
        };

        this.menuDef = {
            name: "Weapons",
            subMenu: {
                title: "Weapons Options",
                items: [
                    { name: "Fast Reload", 
                        rightText: () => (this.state.fastReload ? "ON" : "OFF"),
                        action: () => this.toggleFastReload()
                    },
                    { name: "Give all Weapons", action: () => this.giveAllWeapons() }
                ]
            }
        };
    }

    getMenu() {
        return this.menuDef;
    }

    // -- Weapons categories (GTA SA DE) ---
    categories = [
        "Hand",
        "Melee",
        "Handguns",
        "Shotguns",
        "Sub Machine Guns",
        "Assault Rifles",
        "Rifles",
        "Heavy Weapons",
        "Projectiles",
        "Specials 1",
        "Specials 2",
        "Gifts",
        "Satchel Detonators"
    ];

    weaponDb = {
        "Hand": [
            { name: "Brass Knuckles", id: 1 }
        ],
        "Melee": [
            { name: "Golf Club", id: 2 },
            { name: "Nightstick", id: 3 },
            { name: "Knife", id: 4 },
            { name: "Baseball Bat", id: 5 },
            { name: "Shovel", id: 6 },
            { name: "Pool Cue", id: 7 },
            { name: "Katana", id: 8 },
            { name: "Chainsaw", id: 9 }
        ],
        "Gifts": [
            { name: "Purple Dildo", id: 10 },
            { name: "Dildo", id: 11 },
            { name: "Vibrator", id: 12 },
            { name: "Silver Vibrator", id: 13 },
            { name: "Flowers", id: 14 },
            { name: "Cane", id: 15 }
        ],
        "Projectiles": [
            { name: "Grenade", id: 16 },
            { name: "Tear Gas", id: 17 },
            { name: "Molotov Cocktail", id: 18 },
            { name: "Satchel", id: 39 }
        ],
        "Handguns": [
            { name: "Colt 45", id: 22 },
            { name: "Silenced 9mm", id: 23 },
            { name: "Desert Eagle", id: 24 }
        ],
        "Shotguns": [
            { name: "Shotgun", id: 25 },
            { name: "Sawn-Off Shotgun", id: 26 },
            { name: "Combat Shotgun", id: 27 }
        ],
        "Sub Machine Guns": [
            { name: "Uzi", id: 28 },
            { name: "MP5", id: 29 },
            { name: "TEC-9", id: 32 }
        ],
        "Assault Rifles": [
            { name: "AK-47", id: 30 },
            { name: "M4", id: 31 }
        ],
        "Rifles": [
            { name: "Rifle", id: 33 },
            { name: "Sniper Rifle", id: 34 },
        ],
        "Heavy Weapons": [
            { name: "Rocket Launcher", id: 35 },
            { name: "Heat Seeking Rocket Launcher", id: 36 },
            { name: "Flamethrower", id: 37 },
            { name: "Minigun", id: 38 }
        ],
        "Satchel Detonators": [
            { name: "Satchel Detonator", id: 40 }
        ],
        "Specials 1": [
            { name: "Spray Can", id: 41 },
            { name: "Fire Extinguisher", id: 42 },
            { name: "Camera", id: 43 }
        ],
        "Specials 2": [
            { name: "Night Vision Goggles", id: 44 },
            { name: "Thermal Goggles", id: 45 },
            { name: "Parachute", id: 46 }
        ]
    };

    getWeaponIdByName(name) {
        for (const category in weaponDb) {
            const weapon = weaponDb[category].find(w => w.name === name);
            if (weapon) {
                return weapon.id;
            }
        }
        return null;
    }

    getWeaponNameById(id) {
        for (const category in weaponDb) {
            const weapon = weaponDb[category].find(w => w.id === id);
            if (weapon) {
                return weapon.name;
            }
        }
        return null;
    }

    giveAllWeapons() {
        try {
            let p = new Player(0);
            let char = p.getChar();
            for (const category in this.weaponDb) {
                for (const weapon of this.weaponDb[category]) {
                    char.giveWeapon(weapon.id, 9999);
                }
            }
        } catch(e) {}
    }

    toggleFastReload() {
        this.state.fastReload = !this.state.fastReload;
        if (this.state.fastReload) {
            p = new Player(0);
            p.setFastReload(true);
        } else {
            p = new Player(0);
            p.setFastReload(false);
        }
    }
}