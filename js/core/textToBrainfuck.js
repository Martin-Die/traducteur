/**
 * Convertit un texte en code Brainfuck optimisé
 * @param {string} text - Le texte à convertir
 * @returns {Promise<string>} Une promesse qui résout avec le code Brainfuck correspondant
 */
export function optimizedTextToBrainfuck(text) {
    return new Promise((resolve) => {
        // Créer le worker
        const worker = new Worker(new URL('./brainfuckWorker.js', import.meta.url), { type: 'module' });
        
        // Écouter les messages du worker
        worker.onmessage = function(e) {
            resolve(e.data);
            worker.terminate();
        };
        
        // Envoyer le texte au worker
        worker.postMessage(text);
    });
} 