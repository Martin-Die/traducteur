/**
 * Convertit une soustraction en code Brainfuck
 * @returns {string} Le code Brainfuck correspondant à la soustraction
 */
export function convertSoustraction() {
    let code = "";
    
    // Initialisation des cellules
    code += ">[-]<<";  // Initialise cell1 à 0
    code += "[->-<]";  // Soustraction de cell0 vers cell1
    code += ">[-<+>]<"; // Restaure cell0 depuis cell1
    
    return code;
} 