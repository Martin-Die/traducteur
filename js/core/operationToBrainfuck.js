import { ERROR_MESSAGES, REGEX } from '../utils/constants.js';
import * as operations from './operations/index.js';

/**
 * Convertit une opération mathématique en code Brainfuck
 * @param {string} operation - L'opération à convertir
 * @returns {string} Le code Brainfuck correspondant ou un message d'erreur
 */
export function convertOperationToBrainfuck(operation) {
    // Normalisation et validation
    operation = operation.replace(/\s+/g, '').toLowerCase();
    if (!REGEX.VALID_CHARACTERS.test(operation.replace(REGEX.SQUARE_OPERATOR, ''))) {
        return ERROR_MESSAGES.INVALID_CHARACTERS;
    }
    if (operation.includes('***') || operation.startsWith('**') || operation.endsWith('**')) {
        return ERROR_MESSAGES.INVALID_SQUARE_SYNTAX;
    }

    // Validation des parenthèses
    let stack = [];
    for (let char of operation) {
        if (char === '(') stack.push(char);
        else if (char === ')') {
            if (stack.pop() !== '(') return ERROR_MESSAGES.INVALID_PARENTHESES;
        }
    }
    if (stack.length !== 0) return ERROR_MESSAGES.INVALID_PARENTHESES;

    let brainfuckCode = "";
    let cellPointer = 0;
    let stackFrames = [];

    for (let i = 0; i < operation.length; i++) {
        const char = operation[i];

        if (char === '(') {
            stackFrames.push({ brainfuckCode, cellPointer });
            brainfuckCode = "";
            cellPointer = 0;
            continue;
        }

        if (char === ')') {
            if (stackFrames.length === 0) return ERROR_MESSAGES.INVALID_PARENTHESES;
            const frame = stackFrames.pop();
            brainfuckCode = frame.brainfuckCode + brainfuckCode;
            cellPointer = frame.cellPointer;
            continue;
        }

        if (REGEX.DIGITS.test(char)) {
            let numStr = char;
            while (i + 1 < operation.length && REGEX.DIGITS.test(operation[i + 1])) {
                numStr += operation[++i];
            }
            const value = parseInt(numStr);

            // Placer le nombre dans la cellule actuelle
            brainfuckCode += "+".repeat(value);

            // Si ce n'est pas une exponentiation, passer à la cellule suivante
            if (!(i + 2 <= operation.length && operation.substr(i + 1, 2) === "**")) {
                brainfuckCode += ">";
                cellPointer++;
            }
            continue;
        }

        if (char === '*' && i + 1 < operation.length && operation[i + 1] === '*') {
            let exponentStr = '';
            i += 2;
            while (i < operation.length && REGEX.DIGITS.test(operation[i])) {
                exponentStr += operation[i++];
            }
            i--;

            const exponent = parseInt(exponentStr);
            if (isNaN(exponent)) return ERROR_MESSAGES.INVALID_EXPONENT;

            // Pour l'exponentiation, nous ne voulons pas avancer le pointeur
            // car nous allons utiliser les cellules suivantes pour le calcul
            brainfuckCode += operations.convertExponentiation(exponent);
            continue;
        }

        switch (char) {
            case '+': 
                brainfuckCode += operations.convertAddition();
                break;
            case '-': 
                brainfuckCode += operations.convertSoustraction();
                break;
            case '*': 
                brainfuckCode += operations.convertMultiplication();
                cellPointer++;
                break;
            case '/': 
                brainfuckCode += operations.convertDivision();
                cellPointer += 2;
                break;
            default: 
                return ERROR_MESSAGES.INVALID_CHARACTERS;
        }
    }

    // Retourner au début de la mémoire
    if (cellPointer > 0) {
        brainfuckCode += "<".repeat(cellPointer);
    }
    
    // Afficher le résultat
    brainfuckCode += ".";
    
    return brainfuckCode;
}