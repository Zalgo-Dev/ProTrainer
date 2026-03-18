/// <reference path="../../.config/sa.d.ts" />

const WeatherList = [
    { id: 0, name: "Extra Sunny LA" },
    { id: 1, name: "Sunny LA" },
    { id: 2, name: "Extra Sunny Smog LA" },
    { id: 3, name: "Sunny Smog LA" },
    { id: 4, name: "Cloudy LA" },
    { id: 5, name: "Sunny SF" },
    { id: 6, name: "Extra Sunny SF" },
    { id: 7, name: "Cloudy SF" },
    { id: 8, name: "Rainy SF" },
    { id: 9, name: "Foggy SF" },
    { id: 10, name: "Sunny Vegas" },
    { id: 11, name: "Extra Sunny Vegas" },
    { id: 12, name: "Cloudy Vegas" },
    { id: 13, name: "Extra Sunny Countryside" },
    { id: 14, name: "Sunny Countryside" },
    { id: 15, name: "Cloudy Countryside" },
    { id: 16, name: "Rainy Countryside" },
    { id: 17, name: "Extra Sunny Desert" },
    { id: 18, name: "Sunny Desert" },
    { id: 19, name: "Sandstorm Desert" },
    { id: 20, name: "Underwater" },
    { id: 21, name: "Extra Colours 1" },
    { id: 22, name: "Extra Colours 2" }
];

export class WeatherMenu {
    constructor() {
        this.state = {
            currentWeatherIndex: 0,
            selectedHour: Math.trunc((Clock.GetGameTimer() / 3600000) % 24),
            timeScale: 1.0
        };

        this.menuDef = {
            name: "Weather",
            subMenu: {
                title: "WEATHER OPTIONS",
                items: [
                    {
                        name: "Change Weather",
                        rightText: () => `< ${WeatherList[this.state.currentWeatherIndex].name} >`,
                        onLeft: () => {
                            this.state.currentWeatherIndex--;
                            if (this.state.currentWeatherIndex < 0) {
                                this.state.currentWeatherIndex = WeatherList.length - 1;
                            }
                        },
                        onRight: () => {
                            this.state.currentWeatherIndex++;
                            if (this.state.currentWeatherIndex >= WeatherList.length) {
                                this.state.currentWeatherIndex = 0;
                            }
                        },
                        action: () => {
                            const weatherId = WeatherList[this.state.currentWeatherIndex].id;
                            this.applyWeather(weatherId);
                        }
                    },
                    { 
                        name: "Reset Weather Logic", 
                        action: () => {
                            Weather.Release();
                        } 
                    },
                    {
                        name: "Set Hour",
                        rightText: () => `< ${this.state.selectedHour}:00 >`,
                        onLeft: () => {
                            this.state.selectedHour = (this.state.selectedHour - 1 + 24) % 24;
                        },
                        onRight: () => {
                            this.state.selectedHour = (this.state.selectedHour + 1) % 24;
                        },
                        action: () => {
                            Clock.SetTimeOfDay(this.state.selectedHour, 0);
                        }
                    },
                    {
                        name: "Time Speed",
                        rightText: () => `< x${this.state.timeScale.toFixed(1)} >`,
                        onLeft: () => {
                            this.state.timeScale = Math.max(0.0, this.state.timeScale - 0.2);
                            Clock.SetTimeScale(this.state.timeScale);
                        },
                        onRight: () => {
                            this.state.timeScale = Math.min(5.0, this.state.timeScale + 0.2);
                            Clock.SetTimeScale(this.state.timeScale);
                        },
                        action: () => {
                            timeScale = this.state.timeScale;
                            Clock.SetTimeScale(timeScale);
                        }
                    }
                ]
            }
        };
    }

    getMenu() {
        return this.menuDef;
    }

    applyWeather(typeId) {
        try {
            Weather.ForceNow(typeId);
            Weather.Release(); 
        } catch (error) {
            print("Erreur météo: " + error);
        }
    }
}