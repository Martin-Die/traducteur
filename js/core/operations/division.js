/**
 * Convertit une division en code Brainfuck
 * @returns {string} Le code Brainfuck correspondant à la division
 */
export function convertDivision() {
    // Division de deux nombres avec gestion du reste
    return "[->-[>+>>]>[+[-<+>]>+>>]<<<<<]>>>>[-<<<<+>>>>]<<";
} 