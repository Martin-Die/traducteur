import { ERROR_MESSAGES, REGEX } from '../utils/constants.js';

/**
 * Convertit une opération mathématique en code Brainfuck
 * @param {string} operation - L'opération à convertir
 * @returns {string} Le code Brainfuck correspondant
 */
export function convertOperationToBrainfuck(operation) {
    // Normaliser l'entrée
    operation = operation.replace(/\s+/g, '').toLowerCase();

    // Valider la syntaxe
    if (!REGEX.VALID_CHARACTERS.test(operation.replace(REGEX.SQUARE_OPERATOR, ''))) {
        return ERROR_MESSAGES.INVALID_CHARACTERS;
    }

    // Vérifier la structure des **
    if (operation.includes('***') || /^\*\*/.test(operation) || /\*\*$/.test(operation)) {
        return ERROR_MESSAGES.INVALID_SQUARE_SYNTAX;
    }

    // Vérifier les parenthèses
    let parenthesesCount = 0;
    for (let char of operation) {
        if (char === '(') parenthesesCount++;
        if (char === ')') parenthesesCount--;
        if (parenthesesCount < 0) return ERROR_MESSAGES.INVALID_PARENTHESES;
    }
    if (parenthesesCount !== 0) return ERROR_MESSAGES.INVALID_PARENTHESES;

    let brainfuckCode = "";
    let cellCount = 0;
    let cells = [];
    let i = 0;
    let tempCells = [];

    while (i < operation.length) {
        const char = operation[i];

        if (char === '(') {
            // Sauvegarder l'état actuel
            tempCells.push({ cells: [...cells], cellCount, brainfuckCode });
            cells = [];
            cellCount = 0;
            brainfuckCode = "";
            i++;
            continue;
        }

        if (char === ')') {
            if (tempCells.length === 0) return ERROR_MESSAGES.INVALID_PARENTHESES;
            const savedState = tempCells.pop();
            // Fusionner les résultats
            brainfuckCode = savedState.brainfuckCode + brainfuckCode;
            cells = [...savedState.cells, ...cells];
            cellCount = savedState.cellCount + cellCount;
            i++;
            continue;
        }

        if (REGEX.DIGITS.test(char)) {
            // Gestion optimisée des grands nombres
            let value = parseInt(char);
            while (i + 1 < operation.length && REGEX.DIGITS.test(operation[i + 1])) {
                value = value * 10 + parseInt(operation[++i]);
            }

            // Optimisation pour les grands nombres
            if (value > 20) {
                const factor = Math.floor(Math.sqrt(value));
                const remainder = value - (factor * factor);
                brainfuckCode += "+".repeat(factor) + "[>" + "+".repeat(factor) + "<-]";
                if (remainder > 0) {
                    brainfuckCode += "+".repeat(remainder);
                }
            } else {
                brainfuckCode += "+".repeat(value);
            }

            cells.push(value);
            cellCount++;

            if (!(i + 2 <= operation.length && operation.substr(i + 1, 2) === "**")) {
                brainfuckCode += ">";
            }
            i++;
        }
        else if (char === '*' && i + 1 < operation.length && operation[i + 1] === '*') {
            if (cells.length < 1) return ERROR_MESSAGES.NOTHING_TO_SQUARE;

            // Simplification de l'opération de carré
            brainfuckCode += "[->+>+<<]>>[-<<+>>]<"; // Dupliquer la valeur
            brainfuckCode += "[->[->+>+<<]>>[-<<+>>]<<<]>[-]>[-<<+>>]<<"; // Multiplier
            cellCount += 2;
            i += 2;
        }
        else {
            switch (char) {
                case '+':
                    brainfuckCode += "[-<+>]<";
                    cellCount--;
                    break;
                case '-':
                    brainfuckCode += "[-<->]<";
                    cellCount--;
                    break;
                case '*':
                    brainfuckCode += "[->[->+>+<<]>>[-<<+>>]<<<]>[-]>[-<<+>>]<<";
                    cellCount += 2;
                    break;
                case '/':
                    // Division optimisée
                    brainfuckCode += "[->-[>+>>]>[+[-<+>]>+>>]<<<<<]>>>>[-<<<<+>>>>]<<";
                    cellCount += 3;
                    break;
            }
            i++;
        }
    }

    if (cellCount > 0) {
        brainfuckCode += "<".repeat(cellCount - 1);
    }
    brainfuckCode += ".";

    return brainfuckCode;
} 