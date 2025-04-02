export function brainfuckToText(bfCode) {
    let output = '';
    const memory = new Uint8Array(30000);
    let pointer = 0;
    let loopStack = [];
    let i = 0;

    const cleanCode = bfCode.replace(/[^><+\-.,[\]]/g, '');

    while (i < cleanCode.length) {
        const cmd = cleanCode[i];

        switch (cmd) {
            case '>': pointer++; break;
            case '<': pointer = Math.max(0, pointer - 1); break;
            case '+': memory[pointer]++; break;
            case '-': memory[pointer]--; break;
            case '.': output += String.fromCharCode(memory[pointer]); break;
            case '[':
                if (memory[pointer] === 0) {
                    let depth = 1;
                    while (depth > 0 && ++i < cleanCode.length) {
                        if (cleanCode[i] === '[') depth++;
                        if (cleanCode[i] === ']') depth--;
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
        }
        i++;
    }

    return output || "(Aucun caractère imprimé)";
} 