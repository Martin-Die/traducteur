/**
 * Convertit un texte en code Brainfuck optimisé
 * @param {string} text - Le texte à convertir
 * @returns {string} Le code Brainfuck correspondant
 */
export function optimizedTextToBrainfuck(text) {
    let result = '';
    let currentValue = 0;
    let lastValue = 0;

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const diff = charCode - currentValue;

        if (diff === 0) {
            result += '.';
            continue;
        }

        // Optimisation : utiliser des boucles pour les grands nombres
        if (Math.abs(diff) > 10) {
            const factor = Math.floor(Math.sqrt(Math.abs(diff)));
            const remainder = Math.abs(diff) - (factor * factor);

            result += diff > 0 ? '+'.repeat(factor) : '-'.repeat(factor);
            result += '[>';
            result += diff > 0 ? '+'.repeat(factor) : '-'.repeat(factor);
            result += '<-]';
            result += diff > 0 ? '+'.repeat(remainder) : '-'.repeat(remainder);
        } else {
            result += diff > 0 ? '+'.repeat(diff) : '-'.repeat(-diff);
        }

        result += '.';
        currentValue = charCode;
        lastValue = charCode;
    }

    return result;
} 