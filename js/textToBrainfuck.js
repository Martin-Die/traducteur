export function optimizedTextToBrainfuck(text) {
    let result = '';
    let currentValue = 0;

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const diff = charCode - currentValue;

        // Trouver la meilleure méthode
        const methods = [
            simpleMethod(diff),
            loopMethod(charCode),
            resetMethod(charCode)
        ];

        // Choisir la méthode la plus courte
        const bestMethod = methods.reduce((a, b) =>
            a.code.length < b.code.length ? a : b);

        result += bestMethod.code;
        currentValue = bestMethod.newValue;
    }

    return result;
}

function simpleMethod(diff) {
    const code = diff > 0 ? '+'.repeat(diff) : '-'.repeat(-diff);
    return {
        code: code + '.',
        newValue: diff > 0 ? diff : -diff
    };
}

function loopMethod(target) {
    if (target < 10) return { code: '', newValue: 0 }; // Pas efficace pour petits nombres

    // Trouver le meilleur multiplicateur (entre 2 et 20)
    let bestLength = Infinity;
    let bestCode = '';

    for (let m = 2; m <= Math.min(20, target); m++) {
        const q = Math.floor(target / m);
        const r = target % m;

        const code = `[-]>${'+'.repeat(m)}[<${'+'.repeat(q)}>-]<${'+'.repeat(r)}.`;
        if (code.length < bestLength) {
            bestLength = code.length;
            bestCode = code;
        }
    }

    return {
        code: bestCode,
        newValue: target
    };
}

function resetMethod(target) {
    return {
        code: '[-]' + '+'.repeat(target) + '.',
        newValue: target
    };
} 