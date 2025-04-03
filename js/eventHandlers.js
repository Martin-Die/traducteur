import { optimizedTextToBrainfuck } from './core/textToBrainfuck.js';
import { brainfuckToText } from './core/brainfuckToText.js';
import { copyToClipboard } from './utils/utils.js';

let isUpdating = false;
let lastText = '';
let updateQueue = [];

export function setupEventHandlers() {
    const textInput = document.getElementById('inputText');
    const bfInput = document.getElementById('outputBrainfuck');
    const copyTextBtn = document.getElementById('copyTextBtn');
    const copyBrainfuckBtn = document.getElementById('copyBrainfuckBtn');

    textInput.addEventListener('input', handleTextInput);
    bfInput.addEventListener('input', updateText);
    copyTextBtn.addEventListener('click', () => copyToClipboard('inputText'));
    copyBrainfuckBtn.addEventListener('click', () => copyToClipboard('outputBrainfuck'));
}

function handleTextInput() {
    const text = document.getElementById('inputText').value;
    lastText = text;
    
    if (!isUpdating) {
        processUpdateQueue();
    }
}

async function processUpdateQueue() {
    if (isUpdating || !lastText) return;
    
    isUpdating = true;
    const text = lastText;
    
    try {
        const brainfuckCode = await optimizedTextToBrainfuck(text);
        
        // Vérifier si le texte n'a pas changé pendant le traitement
        if (text === lastText) {
            document.getElementById('outputBrainfuck').value = brainfuckCode;
            
            // Vérifier que le nombre de points (.) correspond au nombre de caractères
            const pointCount = (brainfuckCode.match(/\./g) || []).length;
            if (pointCount !== text.length) {
                console.warn(`Nombre de caractères différent: texte=${text.length}, brainfuck=${pointCount}`);
                // Si le texte n'a pas changé, retenter la conversion
                if (text === lastText) {
                    const retryCode = await optimizedTextToBrainfuck(text);
                    document.getElementById('outputBrainfuck').value = retryCode;
                }
            }
        }
    } catch (error) {
        console.error('Erreur lors de la génération du code Brainfuck:', error);
    } finally {
        isUpdating = false;
        // Vérifier s'il y a des mises à jour en attente
        if (lastText !== text) {
            processUpdateQueue();
        }
    }
}

function updateText() {
    if (isUpdating) return;
    isUpdating = true;

    const bfCode = document.getElementById('outputBrainfuck').value;
    document.getElementById('inputText').value = bfCode === '' ? '' : brainfuckToText(bfCode);

    isUpdating = false;
} 