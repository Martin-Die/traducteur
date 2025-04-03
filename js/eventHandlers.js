import { optimizedTextToBrainfuck } from './core/textToBrainfuck.js';
import { brainfuckToText } from './core/brainfuckToText.js';
import { copyToClipboard } from './utils/utils.js';

let isUpdating = false;

export function setupEventHandlers() {
    const textInput = document.getElementById('inputText');
    const bfInput = document.getElementById('outputBrainfuck');
    const copyTextBtn = document.getElementById('copyTextBtn');
    const copyBrainfuckBtn = document.getElementById('copyBrainfuckBtn');

    textInput.addEventListener('input', updateBrainfuck);
    bfInput.addEventListener('input', updateText);
    copyTextBtn.addEventListener('click', () => copyToClipboard('inputText'));
    copyBrainfuckBtn.addEventListener('click', () => copyToClipboard('outputBrainfuck'));
}

async function updateBrainfuck() {
    if (isUpdating) return;
    isUpdating = true;

    const text = document.getElementById('inputText').value;
    if (text === '') {
        document.getElementById('outputBrainfuck').value = '';
        isUpdating = false;
        return;
    }

    try {
        const brainfuckCode = await optimizedTextToBrainfuck(text);
        document.getElementById('outputBrainfuck').value = brainfuckCode;
    } catch (error) {
        console.error('Erreur lors de la génération du code Brainfuck:', error);
    } finally {
        isUpdating = false;
    }
}

function updateText() {
    if (isUpdating) return;
    isUpdating = true;

    const bfCode = document.getElementById('outputBrainfuck').value;
    document.getElementById('inputText').value = bfCode === '' ? '' : brainfuckToText(bfCode);

    isUpdating = false;
} 