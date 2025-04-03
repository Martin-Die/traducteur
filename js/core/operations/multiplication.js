/**
 * Convertit une multiplication en code Brainfuck
 * @returns {string} Le code Brainfuck correspondant à la multiplication
 */
export function convertMultiplication() {
    // [->[->+>+<<]>>[-<<+>>]<<<] : Multiplication de deux nombres
    return "[->[->+>+<<]>>[-<<+>>]<<<]";
} 