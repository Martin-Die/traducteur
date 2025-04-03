/**
 * Convertit une exponentiation en code Brainfuck
 * @param {number} exponent - L'exposant de l'opération
 * @returns {string} Le code Brainfuck correspondant à l'exponentiation
 */
export function convertExponentiation(exponent) {
    if (exponent === 0) {
        return "[-]+"; // 1 dans la cellule 0
    }

    let code = "";

    // Copie de la base (cell0) vers cell1
    code += ">[-]>>[-]<<<";  // Initialise cell1 et cell2 à 0
    code += "[->+>+<<]";     // Duplique cell0 vers cell1 et cell2
    code += ">>[-<<+>>]<<"; // Restaure cell0 depuis cell2

    // Multiplication itérative
    for (let i = 1; i < exponent; i++) {
        code += "[->[->+>+<<]>>[-<<+>>]<<<]"; // Multiplie cell0 * cell1 → cell2
        code += ">>[-<<+>>]<<";               // Transfère cell2 → cell0
    }

    return code;
}
