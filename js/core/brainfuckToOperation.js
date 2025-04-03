/**
 * Convertit du code Brainfuck en opération mathématique
 * @param {string} brainfuckCode - Le code Brainfuck à convertir
 * @returns {string} Le résultat de l'opération
 */
export function convertBrainfuckToOperation(brainfuckCode) {
    // Nettoyer le code Brainfuck
    brainfuckCode = brainfuckCode.replace(/[^+\-<>[\].,]/g, '');

    // Configuration initiale avec gestion de la mémoire optimisée
    const MEMORY_SIZE = 30000;
    const memory = new Array(MEMORY_SIZE).fill(0);
    let pointer = 0;
    let output = "";
    const loopStack = [];
    let i = 0;
    let lastOutput = 0;
    let consecutiveOutputs = 0;
    let isSquareOperation = false;
    let squareValue = 0;

    // Exécution optimisée
    while (i < brainfuckCode.length) {
        const cmd = brainfuckCode[i];

        switch (cmd) {
            case '+':
                memory[pointer] = (memory[pointer] + 1) % 256;
                break;
            case '-':
                memory[pointer] = (memory[pointer] - 1 + 256) % 256;
                break;
            case '>':
                pointer++;
                if (pointer >= MEMORY_SIZE) {
                    throw new Error("Débordement de mémoire");
                }
                break;
            case '<':
                pointer = Math.max(0, pointer - 1);
                break;
            case '[':
                if (memory[pointer] === 0) {
                    let depth = 1;
                    while (depth > 0 && i < brainfuckCode.length) {
                        i++;
                        if (brainfuckCode[i] === '[') depth++;
                        if (brainfuckCode[i] === ']') depth--;
                    }
                    if (depth !== 0) {
                        throw new Error("Boucle non fermée");
                    }
                } else {
                    loopStack.push(i);
                }
                break;
            case ']':
                if (memory[pointer] !== 0) {
                    if (loopStack.length === 0) {
                        throw new Error("Boucle non ouverte");
                    }
                    i = loopStack[loopStack.length - 1];
                } else {
                    loopStack.pop();
                }
                break;
            case '.':
                // Optimisation pour éviter les sorties répétitives
                if (memory[pointer] === lastOutput) {
                    consecutiveOutputs++;
                    if (consecutiveOutputs > 10) {
                        throw new Error("Sortie infinie détectée");
                    }
                } else {
                    consecutiveOutputs = 0;
                    lastOutput = memory[pointer];
                }

                // Gestion spéciale pour les opérations de carré
                if (isSquareOperation) {
                    squareValue = memory[pointer];
                    isSquareOperation = false;
                } else {
                    output += memory[pointer];
                }
                break;
        }
        i++;
    }

    // Vérification finale
    if (loopStack.length > 0) {
        throw new Error("Boucles non fermées");
    }

    return output || "0";
} 