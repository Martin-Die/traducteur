/**
 * Convertit une division en code Brainfuck
 * @returns {string} Le code Brainfuck correspondant à la division
 */
export function convertDivision() {
    let code = "";
    
    // Initialisation des cellules
    code += ">[-]>>[-]<<<";  // Initialise cell1 et cell2 à 0
    code += "[->+>+<<]";     // Duplique cell0 vers cell1 et cell2
    code += ">>[-<<+>>]<<"; // Restaure cell0 depuis cell2
    
    // Division avec gestion du reste
    code += "[->-[>+>>]>[+[-<+>]>+>>]<<<<<]"; // Division de cell0 par cell1
    code += ">>>>[-<<<<+>>>>]<<";              // Restaure le quotient dans cell0
    
    return code;
} 