/**
 * Convertit un texte en code Brainfuck optimisé
 * @param {string} text - Le texte à convertir
 * @returns {string} Le code Brainfuck correspondant
 */
export function optimizedTextToBrainfuck(text) {
    // Préparation des tables de conversion
    const plusMap = [""];
    const minusMap = [""];
    
    // Générer les tables de + et -
    for (let i = 1; i < 256; i++) {
        plusMap[i] = plusMap[i-1] + "+";
        minusMap[i] = minusMap[i-1] + "-";
    }
    
    // Fonction pour calculer le PGCD
    function gcd(a, b) {
        return b === 0 ? a : gcd(b, a % b);
    }
    
    // Fonction pour calculer l'inverse modulaire
    function inverseMod(a, m) {
        let m0 = m;
        let y = 0;
        let x = 1;
        
        if (m === 1) return 0;
        
        while (a > 1) {
            const q = Math.floor(a / m);
            let t = m;
            m = a % m;
            a = t;
            t = y;
            y = x - q * y;
            x = t;
        }
        
        if (x < 0) x += m0;
        return x;
    }
    
    // Fonction pour trouver la chaîne la plus courte
    function shortestStr(arr) {
        let shortest = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i].length < arr[shortest].length) {
                shortest = i;
            }
        }
        return shortest;
    }
    
    // Générer la table de conversion
    const map = [];
    for (let x = 0; x < 256; x++) {
        map[x] = [];
        for (let y = 0; y < 256; y++) {
            let delta = y - x;
            if (delta > 128) delta -= 256;
            if (delta < -128) delta += 256;
            map[x][y] = delta >= 0 ? plusMap[delta] : minusMap[-delta];
        }
    }
    
    // Optimisation avec des boucles
    for (let c = 0; c < 256; c++) {
        for (let a = 1; a < 40; a++) {
            const f = inverseMod(a, 256) & 255;
            for (let d = 1; d < 40; d++) {
                if (gcd(a, d) === 1) {
                    // Cas 1: a impair
                    if (a & 1) {
                        let b = 0;
                        let e = (c * f) & 255;
                        if (b === 0) {
                            b = (d * e) & 255;
                            if (a + d + 5 < map[c][b].length) {
                                map[c][b] = "[" + minusMap[a] + ">" + plusMap[d] + "<]>";
                            }
                        }
                    } else {
                        // Cas 2: a pair
                        let b = c;
                        let e = 0;
                        while (e < 256 && b) {
                            b = (b - a) & 255;
                            e++;
                        }
                        if (b === 0) {
                            b = (d * e) & 255;
                            if (a + d + 5 < map[c][b].length) {
                                map[c][b] = "[" + minusMap[a] + ">" + plusMap[d] + "<]>";
                            }
                        }
                    }
                    
                    // Cas 3: a impair (négatif)
                    if (a & 1) {
                        let b = 0;
                        let e = (-c * f) & 255;
                        if (b === 0) {
                            b = (-d * e) & 255;
                            if (a + d + 5 < map[c][b].length) {
                                map[c][b] = "[" + plusMap[a] + ">" + minusMap[d] + "<]>";
                            }
                        }
                    } else {
                        // Cas 4: a pair (négatif)
                        let b = c;
                        let e = 0;
                        while (e < 256 && b) {
                            b = (b + a) & 255;
                            e++;
                        }
                        if (b === 0) {
                            b = (-d * e) & 255;
                            if (a + d + 5 < map[c][b].length) {
                                map[c][b] = "[" + plusMap[a] + ">" + minusMap[d] + "<]>";
                            }
                        }
                    }
                }
            }
        }
    }
    
    // Optimisation supplémentaire avec des chemins intermédiaires
    for (let c = 0; c < 256; c++) {
        const a = map[c];
        for (let e = 0; e < 256; e++) {
            const f = map[e];
            const d = a[e];
            for (let b = 0; b < 256; b++) {
                if (d.length + f[b].length < a[b].length) {
                    a[b] = d + f[b];
                }
            }
        }
    }
    
    // Générer le code Brainfuck
    let result = "";
    let currentValue = 0;
    
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) & 255;
        const options = [">" + map[0][charCode], map[currentValue][charCode]];
        const shortest = shortestStr(options);
        result += options[shortest] + ".";
        currentValue = charCode;
    }
    
    return result;
} 