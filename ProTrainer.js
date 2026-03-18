/// <reference path=".config/sa.d.ts" />

import { drawMenu } from './ProTrainer/core/ui.js';
import { PlayerMenu } from './ProTrainer/modules/player_module.js';
import { WeaponsMenu } from './ProTrainer/modules/weapons_module.js';
import { TeleportMenu } from './ProTrainer/modules/teleport_module.js';
import { VehicleMenu } from './ProTrainer/modules/vehicles_module.js';
import { VehicleModsMenu } from './ProTrainer/modules/vehicle_mods_module.js';
import { WeatherMenu } from './ProTrainer/modules/weather_module.js';


const playerModule = new PlayerMenu();
const weaponsModule = new WeaponsMenu();
const vehicleModule = new VehicleMenu();
const teleportModule = new TeleportMenu();
const vehicleModsModule = new VehicleModsMenu();
const weatherModule = new WeatherMenu();

// --- ARBRE PRINCIPAL DU MENU ---
const mainMenuDef = {
    title: "PRO TRAINER",
    items: [
        playerModule.getMenu(),
        vehicleModule.getMenu(),
        vehicleModsModule.getMenu(),
        teleportModule.getMenu(),
        weaponsModule.getMenu(),
        weatherModule.getMenu()
    ]
};

// --- ÉTAT DU GESTIONNAIRE DE MENU ---
let menuOpen = false;
let lastInput = 0;

let menuHistory = [];
let cursorHistory = [];

let currentMenu = mainMenuDef;
let cursor = 0;


// --- BOUCLE PRINCIPALE ---
(async function () {
    while (true) {
        await asyncWait(0);
        
        // 1. On vérifie si on doit ouvrir ou fermer le menu (Touche F4)
        handleMenuToggle();

        // 2. Si le menu est ouvert, on gère son fonctionnement
        if (menuOpen) {
            drawCurrentMenu();    // Gère l'affichage à l'écran
            handleMenuInputs();   // Gère les touches de navigation
        }
    }
})().catch((e) => log("ProTrainer Error: " + (e ? e.message : "")));

// ==========================================
// ---       LES FONCTIONS DU MENU        ---
// ==========================================

// Gère l'ouverture/fermeture avec F4 (Touche 115)
function handleMenuToggle() {
    const now = Date.now();
    if (Pad.IsKeyPressed(115) && now - lastInput > 200) {
        menuOpen = !menuOpen;
        lastInput = now;
        
        if (menuOpen) {
            // Remise à zéro quand on ouvre le menu
            currentMenu = mainMenuDef;
            cursor = 0;
            menuHistory = [];
            cursorHistory = [];
        }
    }
}

// Prépare les textes et dessine le menu
function drawCurrentMenu() {
    let visibleOptions = currentMenu.items.map(item => {
        let mappedItem = {
            name: (typeof item.name === 'function') ? item.name() : item.name
        };

        if (item.rightText) {
            mappedItem.rightText = (typeof item.rightText === 'function') ? item.rightText() : item.rightText;
        }
        if (item.rightColor) {
            mappedItem.rightColor = (typeof item.rightColor === 'function') ? item.rightColor() : item.rightColor;
        }
        return mappedItem;
    });

    drawMenu(visibleOptions, cursor, currentMenu.title);
}

// Gère la navigation : clavier / manette
function handleMenuInputs() {
    const now = Date.now();
    let currentItem = currentMenu.items[cursor];

    // Vérifie qu'on ne spamme pas les touches
    if (now - lastInput <= 150) return; 

    // Flèche HAUT (38)
    if (Pad.IsKeyPressed(38)) {
        cursor = (cursor - 1 + currentMenu.items.length) % currentMenu.items.length;
        lastInput = now;
    }
    // Flèche BAS (40)
    else if (Pad.IsKeyPressed(40)) {
        cursor = (cursor + 1) % currentMenu.items.length;
        lastInput = now;
    }
    // Flèche GAUCHE (37)
    else if (Pad.IsKeyPressed(37) && currentItem.onLeft) {
        currentItem.onLeft();
        lastInput = now;
    }
    // Flèche DROITE (39)
    else if (Pad.IsKeyPressed(39) && currentItem.onRight) {
        currentItem.onRight();
        lastInput = now;
    }
    // RETOUR / ESPACE (8) - Quitter le sous-menu
    else if (Pad.IsKeyPressed(8) && now - lastInput > 200) {
        if (menuHistory.length > 0) {
            currentMenu = menuHistory.pop();
            cursor = cursorHistory.pop();
        } else {
            menuOpen = false; // Ferme le menu principal
        }
        lastInput = now;
    }
    // ENTRÉE (13) - Valider un choix
    else if (Pad.IsKeyPressed(13) && now - lastInput > 250) {
        if (currentItem.subMenu) {
            menuHistory.push(currentMenu);
            cursorHistory.push(cursor);
            currentMenu = currentItem.subMenu;
            cursor = 0;
        } else if (currentItem.action) {
            (async () => {
                try { await currentItem.action(); } 
                catch(e) { log("Action Error: " + (e ? e.message : "")); }
            })();
        }
        lastInput = now;
    }
}