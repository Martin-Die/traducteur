/**
 * Convertit un texte en code Brainfuck optimisé
 * @param {string} text - Le texte à convertir
 * @returns {string} Le code Brainfuck correspondant
 */
export function optimizedTextToBrainfuck(text) {
    let result = '';
    
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        
        // Réinitialiser la mémoire pour chaque caractère
        result += '[-]';
        
        // Ajouter directement la valeur du caractère
        result += '+'.repeat(charCode);
        
        // Afficher le caractère
        result += '.';
    }
    
    return result;
} 