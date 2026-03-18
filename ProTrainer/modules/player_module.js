/// <reference path="../../.config/sa.d.ts" />

export class PlayerMenu {
    constructor() {
        this.state = {
            godMode: false,
            neverWanted: false,
            invisible: false,
            ignored: false,
            infiniteOxygen: false,
            drunk: false,
            moneyOptions: [1000, 10000, 50000, 100000, 250000, 500000, 1000000],
            currentMoneyIndex: 2
        };

        this.menuDef = {
            name: "CJ Options",
            subMenu: {
                title: "PLAYER OPTIONS",
                items: [
                    {
                        name: "Cash Drop",
                        rightText: () => `< ${this.state.moneyOptions[this.state.currentMoneyIndex]} $ >`,
                        onLeft: () => {
                            this.state.currentMoneyIndex--;
                            if (this.state.currentMoneyIndex < 0) {
                                this.state.currentMoneyIndex = this.state.moneyOptions.length - 1;
                            }
                        },
                        onRight: () => {
                            this.state.currentMoneyIndex++;
                            if (this.state.currentMoneyIndex >= this.state.moneyOptions.length) {
                                this.state.currentMoneyIndex = 0;
                            }
                        },
                        action: () => {
                            let amount = this.state.moneyOptions[this.state.currentMoneyIndex];
                            this.giveMoney(amount); 
                        }
                    },
                    { name: "No Wanted", action: () => this.setWantedLvl() },
                    { name: "Full Medkit", action: () => this.healPlayer() },
                    {
                        name: "Invincibility (God)",
                        rightText: () => (this.state.godMode ? "ON" : "OFF"),
                        rightColor: () => (this.state.godMode ? [0, 255, 0] : [255, 0, 0]), 
                        action: () => {
                            this.state.godMode = !this.state.godMode;
                            this.setGodMode(this.state.godMode);
                        }
                    },
                    { name: "Set Armor 100%", action: () => this.giveMaxArmor() },
                    { name: "Weapon Kit", action: () => this.giveWeaponKit() },
                    { name: "Mastery Stats (Muscles, Endurance...)", action: () => this.setMaxStats() },
                    { name: "Kill Self", action: () => this.suicide() }
                ]
            }
        };
    }

    getMenu() {
        return this.menuDef;
    }

    giveMoney(amount = 100000) {
        let p = new Player(0);
        p.addScore(amount);
    }

    setWantedLvl(amout = 0) {
        let p = new Player(0);
        p.alterWantedLevel(amout);
    }

    healPlayer() {
        let p = new Player(0);
        let char = p.getChar();
        char.setHealth(250.0);
    }

    setGodMode(enable) {
        let p = new Player(0);
        let char = p.getChar();

        if (enable === true) {
            char.setProofs(true, true, true, true, true);
            char.setSuffersCriticalHits(false);
            char.health = 200.0;
            char.armor = 100.0;
        }
        else {
            char.setProofs(false, false, false, false, false);
            char.setSuffersCriticalHits(true);
        }
    }

    giveMaxArmor() {
        let p = new Player(0);
        let char = p.getChar();
        char.addArmor(100.0);
    }

    giveWeaponKit() {
        try {
            let p = new Player(0);
            let char = p.getChar();
            char.giveWeapon(31, 9999);
            char.giveWeapon(24, 9999);
            char.giveWeapon(27, 9999);
            char.giveWeapon(38, 9999);
            char.giveWeapon(34, 9999);
            char.giveWeapon(16, 99);
            char.giveWeapon(46, 1);
            char.setCurrentWeapon(31);
        } catch(e) {}
    }

    setMaxStats() {
        try {
            for (let i = 22; i <= 25; i++) {
                Stat.SetFloat(i, 1000.0);
            }
            Stat.SetFloat(160, 1000.0);
            for (let i = 68; i <= 79; i++) {
                Stat.SetFloat(i, 1000.0);
            }
        } catch(e) {}
    }

    suicide() {
        try {
            let char = new Player(0).getChar();
            char.health = 0.0;
        } catch(e) {}
    }
}
