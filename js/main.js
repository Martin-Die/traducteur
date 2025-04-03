import { setupEventHandlers } from './eventHandlers.js';
import { convertOperationToBrainfuck, convertBrainfuckToOperation } from './index.js';

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    setupEventHandlers();
});

// Gestion des opérations mathématiques
const inputOperation = document.getElementById('inputOperation');
const outputOperationBrainfuck = document.getElementById('outputOperationBrainfuck');
const copyOperationBtn = document.getElementById('copyOperationBtn');
const copyOperationBrainfuckBtn = document.getElementById('copyOperationBrainfuckBtn');

// Conversion opération vers Brainfuck
inputOperation.addEventListener('input', () => {
    const operation = inputOperation.value;
    const brainfuckCode = convertOperationToBrainfuck(operation);
    outputOperationBrainfuck.value = brainfuckCode;
});

// Conversion Brainfuck vers opération
outputOperationBrainfuck.addEventListener('input', () => {
    const brainfuckCode = outputOperationBrainfuck.value;
    const operation = convertBrainfuckToOperation(brainfuckCode);
    inputOperation.value = operation;
});

// Boutons de copie pour les opérations
copyOperationBtn.addEventListener('click', () => {
    inputOperation.select();
    document.execCommand('copy');
});

copyOperationBrainfuckBtn.addEventListener('click', () => {
    outputOperationBrainfuck.select();
    document.execCommand('copy');
}); 