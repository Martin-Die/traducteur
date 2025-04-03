/**
 * Copie le contenu d'un élément dans le presse-papiers
 * @param {string} elementId - L'ID de l'élément à copier
 */
export function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');
} 