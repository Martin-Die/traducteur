/**
 * Convertit une exponentiation en code Brainfuck
 * @param {number} exponent - L'exposant de l'opération
 * @returns {string} Le code Brainfuck correspondant à l'exponentiation
 */
export function convertExponentiation(exponent) {
    if (exponent === 0) {
        return "[-]+"; // Retourne 1 si l'exposant est 0
    }

    let brainfuckCode = "";
    
    // Copier la base dans deux cellules temporaires
    brainfuckCode += "[->+>+<<]"; // Copier dans les deux cellules suivantes
    brainfuckCode += ">>[-<<+>>]"; // Restaurer la base
    brainfuckCode += "<"; // Revenir à la première copie
    
    // Effectuer l'exponentiation
    for (let i = 1; i < exponent; i++) {
        // Multiplier la valeur actuelle par la base
        brainfuckCode += "[->[->+>+<<]>>[-<<+>>]<<<]"; // Multiplication
        brainfuckCode += ">[-]>[-<<+>>]<<"; // Nettoyage et restauration
    }
    
    return brainfuckCode;
} 