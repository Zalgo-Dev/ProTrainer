/// <reference path="../../.config/sa.d.ts" />

export class VehicleModsMenu {
    constructor() {
        this.menuDef = {
            name: "Vehicule Mods",
            subMenu: {
                title: "Vehicule Mods",
                items: [
                    { name: "Instant Fix", action: () => this.repairCar() },
                    { name: "Wash & Polish", action: () => this.cleanCar() },
                    { name: "Auto Flip", action: () => this.flipCar() },
                    { name: "NOS Injector", action: () => this.giveNitro() },
                    { name: "Hydraulics Kit", action: () => this.giveHydraulics() },
                    { name: "Random Paint", action: () => this.randomColor() },
                    { name: "Lock Doors", action: () => this.lockDoors() },
                    { name: "Unlock Doors", action: () => this.unlockDoors() },
                    { name: "Vehicle GodMode", action: () => this.setGodMode(true) },
                    { name: "Disable GodMode", action: () => this.setGodMode(false) }
                ]
            }
        };
    }

    getCurrentCar() {
        let p = new Player(0);
        let char = p.getChar();
        if (char.isSittingInAnyCar()) {
            return char.getCarIsUsing();
        }
        return null;
    }

    repairCar() {
        let car = this.getCurrentCar();
        if (car) {
            car.fix();
            log("Véhicule réparé.");
        } else {
            log("Vous n'êtes pas dans un véhicule.");
        }
    }

    cleanCar() {
        let car = this.getCurrentCar();
        if (car) {
            car.setDirtLevel(0.0);
            log("Véhicule lavé.");
        } else {
            log("Vous n'êtes pas dans un véhicule.");
        }
    }

    flipCar() {
        let car = this.getCurrentCar();
        if (car) {
            car.setHeading(car.getHeading());
            car.setRoll(0.0);
            log("Véhicule remis droit.");
        } else {
            log("Vous n'êtes pas dans un véhicule.");
        }
    }

    giveNitro() {
        let car = this.getCurrentCar();
        if (car) {
            car.giveNonPlayerNitro();
            log("Nitro ajoutée.");
        } else {
            log("Vous n'êtes pas dans un véhicule.");
        }
    }

    giveHydraulics() {
        let car = this.getCurrentCar();
        if (car) {
            car.setHydraulics(true);
            log("Suspensions hydrauliques installées.");
        } else {
            log("Vous n'êtes pas dans un véhicule.");
        }
    }

    randomColor() {
        let car = this.getCurrentCar();
        if (car) {
            let color1 = Math.floor(Math.random() * 126);
            let color2 = Math.floor(Math.random() * 126);
            car.changeColor(color1, color2);
            log("Nouvelle peinture appliquée (" + color1 + ", " + color2 + ").");
        } else {
            log("Vous n'êtes pas dans un véhicule.");
        }
    }

    lockDoors() {
        let car = this.getCurrentCar();
        if (car) {
            car.lockDoors(2);
            log("Portes verrouillées.");
        } else {
            log("Vous n'êtes pas dans un véhicule.");
        }
    }

    unlockDoors() {
        let car = this.getCurrentCar();
        if (car) {
            car.lockDoors(1);
            log("Portes déverrouillées.");
        } else {
            log("Vous n'êtes pas dans un véhicule.");
        }
    }

    setGodMode(enable) {
        let car = this.getCurrentCar();
        if (car) {
            if (enable) {
                car.setProofs(true, true, true, true, true);
                log("Invincibilité du véhicule ACTIVÉE.");
            } else {
                car.setProofs(false, false, false, false, false);
                log("Invincibilité du véhicule DÉSACTIVÉE.");
            }
        } else {
            log("Vous n'êtes pas dans un véhicule.");
        }
    }

    getMenu() {
        return this.menuDef;
    }
}
