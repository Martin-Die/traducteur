// this website helped me to get the maths : https://copy.sh/brainfuck/text.html

// Pré-calcul des tables pour les opérations + et -
const plusMap = [''];
const minusMap = [''];
for (let i = 1; i < 256; i++) {
    plusMap[i] = plusMap[i - 1] + '+';
    minusMap[i] = minusMap[i - 1] + '-';
}

// Fonction pour calculer le PGCD
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Fonction pour calculer l'inverse modulaire
function inverseMod(a, m) {
    let old_r = a;
    let r = m;
    let old_s = 1;
    let s = 0;

    while (r !== 0) {
        const quotient = Math.floor(old_r / r);
        let temp = r;
        r = old_r - quotient * r;
        old_r = temp;
        temp = s;
        s = old_s - quotient * s;
        old_s = temp;
    }

    return ((old_s % m) + m) % m;
}

// Génération de la table de conversion
const conversionMap = [];
for (let x = 0; x < 256; x++) {
    conversionMap[x] = [];
    for (let y = 0; y < 256; y++) {
        let delta = y - x;
        if (delta > 128) delta -= 256;
        if (delta < -128) delta += 256;
        conversionMap[x][y] = delta >= 0 ? plusMap[delta] : minusMap[-delta];
    }
}

// Optimisation de la table avec des boucles
function optimizeTable() {
    for (let c = 0; c < 256; c++) {
        for (let a = 1; a < 40; a++) {
            const f = inverseMod(a, 256) & 255;
            for (let d = 1; d < 40; d++) {
                if (gcd(a, d) === 1) {
                    // Optimisation pour les nombres impairs
                    if (a & 1) {
                        let b = 0;
                        let e = (c * f) & 255;
                        let target = (d * e) & 255;
                        if (a + d + 5 < conversionMap[c][target].length) {
                            conversionMap[c][target] = `[${minusMap[a]}>${plusMap[d]}<]>`;
                        }
                    } else {
                        // Optimisation pour les nombres pairs
                        let b = c;
                        let e = 0;
                        while (e < 256 && b) {
                            b = (b - a) & 255;
                            e++;
                        }
                        if (b === 0) {
                            let target = (d * e) & 255;
                            if (a + d + 5 < conversionMap[c][target].length) {
                                conversionMap[c][target] = `[${minusMap[a]}>${plusMap[d]}<]>`;
                            }
                        }
                    }
                }
            }
        }
    }

    // Optimisation des chemins indirects
    for (let c = 0; c < 256; c++) {
        for (let e = 0; e < 256; e++) {
            for (let b = 0; b < 256; b++) {
                const direct = conversionMap[c][b];
                const indirect = conversionMap[c][e] + conversionMap[e][b];
                if (indirect.length < direct.length) {
                    conversionMap[c][b] = indirect;
                }
            }
        }
    }
}

// Optimisation initiale de la table
optimizeTable();

export function optimizedTextToBrainfuck(text) {
    let result = '';
    let currentValue = 0;
    let lastChar = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === lastChar) {
            result += '.';
        } else {
            const charCode = char.charCodeAt(0) & 255;
            const direct = '>' + conversionMap[0][charCode];
            const relative = conversionMap[currentValue][charCode];

            result += (direct.length < relative.length ? direct : relative) + '.';
            currentValue = charCode;
        }
        lastChar = char;
    }

    return result;
} 