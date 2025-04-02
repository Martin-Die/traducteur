export function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    element.select();
    document.execCommand('copy');

    const btn = element.nextElementSibling;
    const originalText = btn.textContent;
    btn.textContent = 'Copié !';
    setTimeout(() => btn.textContent = originalText, 2000);
} 