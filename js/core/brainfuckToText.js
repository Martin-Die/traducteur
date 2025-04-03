/**
 * Convertit du code Brainfuck en texte
 * @param {string} brainfuckCode - Le code Brainfuck à convertir
 * @returns {string} Le texte correspondant
 */
export function brainfuckToText(brainfuckCode) {
    const memory = new Array(30000).fill(0);
    let pointer = 0;
    let output = '';
    const loopStack = [];
    let i = 0;

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
                break;
            case '<':
                pointer = Math.max(0, pointer - 1);
                break;
            case '[':
                if (memory[pointer] === 0) {
                    let depth = 1;
                    while (depth > 0) {
                        i++;
                        if (brainfuckCode[i] === '[') depth++;
                        if (brainfuckCode[i] === ']') depth--;
                    }
                } else {
                    loopStack.push(i);
                }
                break;
            case ']':
                if (memory[pointer] !== 0) {
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

    return output;
} 