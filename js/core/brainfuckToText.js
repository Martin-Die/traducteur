/**
 * Convertit du code Brainfuck en texte
 * @param {string} brainfuckCode - Le code Brainfuck à convertir
 * @returns {string} Le texte correspondant
 */
export function brainfuckToText(brainfuckCode) {
    // Nettoyer le code Brainfuck
    brainfuckCode = brainfuckCode.replace(/[^+\-<>[\].,]/g, '');
    
    // Initialiser la mémoire et les variables
    const memory = new Array(30000).fill(0);
    let pointer = 0;
    let output = '';
    const loopStack = [];
    let i = 0;
    
    // Fonction pour exécuter le code Brainfuck
    function executeBrainfuck() {
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
                    if (pointer >= memory.length) {
                        pointer = 0;
                    }
                    break;
                case '<':
                    pointer = Math.max(0, pointer - 1);
                    break;
                case '[':
                    if (memory[pointer] === 0) {
                        // Chercher la fin de la boucle
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
                    output += String.fromCharCode(memory[pointer]);
                    break;
            }
            i++;
        }
        
        if (loopStack.length > 0) {
            throw new Error("Boucles non fermées");
        }
    }
    
    // Exécuter le code Brainfuck
    try {
        executeBrainfuck();
    } catch (error) {
        console.error("Erreur lors de l'exécution du code Brainfuck:", error);
        return "Erreur: " + error.message;
    }
    
    return output;
} 