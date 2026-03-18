/// <reference path="../../.config/sa.d.ts" />

export class TeleportMenu {
    constructor() {
        // Liste des lieux prédéfinis
        this.locations = [
            { name: "Grove Street", x: 2495.2, y: -1670.6, z: 13.3 },
            { name: "LS International Airport", x: 1677.3, y: -2256.0, z: 13.5 },
            { name: "Mount Chiliad Peak", x: -2329.4, y: -1619.6, z: 483.5 },
            { name: "SF Station", x: -2009.6, y: 142.3, z: 27.5 },
            { name: "The Four Dragons Casino", x: 2017.3, y: 1007.8, z: 10.8 },
            { name: "Area 69 (Secret)", x: 213.5, y: 1912.4, z: 17.6 }
        ];

        this.menuDef = {
            name: "Teleportation",
            subMenu: {
                title: "TELEPORT LOCATIONS",
                items: this.buildItems()
            }
        };
    }

    buildItems() {
        let items = [];
        items.push({
            name: "TP to Waypoint",
            action: () => this.teleportToWaypoint()
        });

        // Ajoute les lieux de la liste
        for (let loc of this.locations) {
            items.push({
                name: loc.name,
                action: () => this.teleportPlayer(loc.x, loc.y, loc.z)
            });
        }
        
        return items;
    }

    teleportPlayer(x, y, z) {
        let p = new Player(0);
        let char = p.getChar();

        // Si le joueur est dans un véhicule, on téléporte le véhicule avec lui
        if (char.isSittingInAnyCar()) {
            let car = char.getCarIsUsing();
            car.setCoordinates(x, y, z);
        } else {
            char.setCoordinates(x, y, z);
        }
    }

    teleportToWaypoint() {
        try {
            // Note: l'Opcode 0AB6 n'est pas toujours exposé en JS dans SA:DE
            // On essaye la fonction globale si une des extensions CLEO l'ajoute
            if (typeof GetTargetBlipCoords === "function") {
                let coords = GetTargetBlipCoords();
                if (coords && (coords.x !== 0 || coords.y !== 0)) {
                    // Pour le Waypoint, le Z posera problème si on prend 0.0
                    // L'idéal est de trouver le sol.
                    this.teleportPlayer(coords.x, coords.y, 500.0); // Ou coords.z si CLEO le gère
                    log("Téléporté au Waypoint.");
                } else {
                    log("Aucun Waypoint défini.");
                }
            } else {
                log("La fonction GetTargetBlipCoords n'est pas supportée dans ce build CLEO Redux.");
            }
        } catch(e) {
            log("Erreur Waypoint: " + e.message);
        }
    }

    getMenu() {
        return this.menuDef;
    }
}