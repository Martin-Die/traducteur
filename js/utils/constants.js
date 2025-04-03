/**
 * Constantes et types pour le convertisseur d'opérations
 */

// Opérations supportées
export const SUPPORTED_OPERATIONS = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/',
    SQUARE: '**'
};

// Messages d'erreur
export const ERROR_MESSAGES = {
    INVALID_CHARACTERS: "Erreur : Caractères non valides",
    INVALID_SQUARE_SYNTAX: "Erreur : Syntaxe ** invalide",
    NOTHING_TO_SQUARE: "Erreur : Rien à mettre au carré"
};

// Expressions régulières
export const REGEX = {
    VALID_CHARACTERS: /^[\d+\-*\/()]+$/,
    DIGITS: /\d/,
    SQUARE_OPERATOR: /\*\*/
}; 