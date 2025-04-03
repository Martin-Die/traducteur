/**
 * Convertit une addition en code Brainfuck
 * @returns {string} Le code Brainfuck correspondant à l'addition
 */
export function convertAddition() {
    let code = "";
    
    // Initialisation des cellules
    code += ">[-]<<";  // Initialise cell1 à 0
    code += "[->+<]";  // Addition de cell0 vers cell1
    code += ">[-<+>]<"; // Restaure cell0 depuis cell1
    
    return code;
} 