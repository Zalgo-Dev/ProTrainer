/// <reference path="../../.config/sa.d.ts" /> 

let fxtCounter = 0;

// --- RÉGLAGES ---
const MENU_X = 20.0;
const MENU_Y = 50.0;
const MENU_WIDTH = 180.0;
const HEADER_HEIGHT = 32.0;
const ITEM_HEIGHT = 28.0;
const MAX_VISIBLE = 10; 

// ==========================================
// --- FONCTION PRINCIPALE (Ultra simplifiée)
// ==========================================
export function drawMenu(options, cursor, title = "PRO TRAINER") {
    fxtCounter = 0; 
    Text.UseCommands(true);
    
    // 1. On calcule ce qui doit être affiché à l'écran
    let { visibleOptions, visibleCursor } = calculateScrolling(options, cursor);

    // 2. On dessine les rectangles de fond et le titre
    drawBackgroundAndHeader(title, visibleOptions.length);

    // 3. On dessine les textes, le curseur, et le compteur
    drawItemsAndCursor(visibleOptions, visibleCursor, options.length, cursor);
    
    Text.UseCommands(false);
}

// ==========================================
// --- SOUS-FONCTIONS LOGIQUES
// ==========================================

// 1. Gère les mathématiques du défilement
function calculateScrolling(options, cursor) {
    let startIdx = 0;
    
    if (options.length > MAX_VISIBLE) {
        startIdx = cursor - Math.floor(MAX_VISIBLE / 2);
        if (startIdx < 0) startIdx = 0;
        if (startIdx + MAX_VISIBLE > options.length) startIdx = options.length - MAX_VISIBLE;
    }

    return {
        visibleOptions: options.slice(startIdx, startIdx + MAX_VISIBLE),
        visibleCursor: cursor - startIdx
    };
}

// 2. Dessine la boîte du menu
function drawBackgroundAndHeader(title, visibleCount) {
    let totalHeight = HEADER_HEIGHT + (visibleCount * ITEM_HEIGHT) + 10.0; 

    // Fond noir semi-transparent
    Hud.DrawRect(MENU_X + (MENU_WIDTH / 2), MENU_Y + (totalHeight / 2), MENU_WIDTH, totalHeight, 0, 0, 0, 180); 
    
    // En-tête bleu/rouge
    Hud.DrawRect(MENU_X + (MENU_WIDTH / 2), MENU_Y + (HEADER_HEIGHT / 2), MENU_WIDTH, HEADER_HEIGHT, 130, 0, 0, 255);

    // Titre
    displayText(MENU_X + 15, MENU_Y + 8.0, title, 255, 255, 255, 255, 1.2, 2);
}

// 3. Dessine le contenu (Curseur, Options, Compteur)
function drawItemsAndCursor(visibleOptions, visibleCursor, totalOptionsCount, realCursor) {
    // Affichage du compteur (ex: 1/14)
    if (totalOptionsCount > MAX_VISIBLE) {
        let counterText = (realCursor + 1).toString() + "/" + totalOptionsCount.toString();
        displayText(MENU_X + MENU_WIDTH - 40.0, MENU_Y + 11.0, counterText, 255, 255, 255, 200, 0.8, 1);
    }

    // Dessin du rectangle de sélection blanc (Le curseur)
    let selectionY = MENU_Y + HEADER_HEIGHT + (visibleCursor * ITEM_HEIGHT) + (ITEM_HEIGHT / 2) + 5.0;
    Hud.DrawRect(MENU_X + (MENU_WIDTH / 2), selectionY, MENU_WIDTH - 6.0, ITEM_HEIGHT - 2.0, 255, 255, 255, 60);

    // Boucle d'affichage des textes
    for (let i = 0; i < visibleOptions.length; i++) {
        let yPos = MENU_Y + HEADER_HEIGHT + (i * ITEM_HEIGHT) + 15.0;
        let opt = visibleOptions[i];
        
        let textLeft = typeof opt === 'string' ? opt : opt.name;
        let textRight = typeof opt === 'string' ? null : opt.rightText;

        if (i === visibleCursor) {
            // OPTION SÉLECTIONNÉE (Jaune)
            displayText(MENU_X + 20, yPos, textLeft, 255, 255, 0, 255, 0.85, 1);
            
            if (textRight) {
                // CORRECTION DU BUG ICI : on lit directement opt.rightColor[0]
                let r = 255, g = 255, b = 0;
                if (opt.rightColor) {
                    r = opt.rightColor[0];
                    g = opt.rightColor[1];
                    b = opt.rightColor[2];
                }
                displayText(MENU_X + MENU_WIDTH - 20, yPos, textRight, r, g, b, 255, 0.85, 1, true);
            }
        } else {
            // OPTION NON SÉLECTIONNÉE (Gris)
            displayText(MENU_X + 20, yPos, textLeft, 220, 220, 220, 255, 0.80, 1);
            if (textRight) {
                displayText(MENU_X + MENU_WIDTH - 20, yPos, textRight, 220, 220, 220, 255, 0.80, 1, true);
            }
        }
    }
}

// ==========================================
// --- MOTEUR DE TEXTE NATIF
// ==========================================
function displayText(x, y, str, r, g, b, a, scale, font = 1, rightAlign = false) {
    let safeStr = str.replace(/ /g, String.fromCharCode(160)); 
    const key = "T" + (fxtCounter++ & 0xFF);
    FxtStore.insert(key, safeStr, false);
    
    Text.SetColor(r, g, b, a);
    Text.SetScale(scale, scale); 
    Text.SetFont(font);
    Text.SetProportional(true);

    if (rightAlign) {
        Text.SetRightJustify(true);
        Text.SetWrapX(x);
    } else {
        Text.SetRightJustify(false);
    }

    Text.Display(x, y, key);
}