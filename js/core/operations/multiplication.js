/**
 * Convertit une multiplication en code Brainfuck
 * @returns {string} Le code Brainfuck correspondant à la multiplication
 */
export function convertMultiplication() {
    let code = "";

    // Initialisation des cellules
    code += ">[-]>>[-]<<<";  // Initialise cell1 et cell2 à 0
    code += "[->+>+<<]";     // Duplique cell0 vers cell1 et cell2
    code += ">>[-<<+>>]<<"; // Restaure cell0 depuis cell2

    // Multiplication
    code += "[->[->+>+<<]>>[-<<+>>]<<<]"; // Multiplie cell0 * cell1 → cell2
    code += ">>[-<<+>>]<<";               // Transfère cell2 → cell0

    return code;
} 