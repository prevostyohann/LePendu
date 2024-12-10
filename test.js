let parties_gagnees = 0;
let mot_a_trouver, mot_trouver, erreurs_commises, lettres_tentees;

function underscore(mot_a_trouver) {
    let mot_trouver = "";
    for (let i = 0; i < mot_a_trouver.length; i++) {
        mot_trouver += "- ";
    }
    return mot_trouver;
}

function initialiserJeu() {
    const index = Math.floor(Math.random() * wordsArray.length);
    console.log(wordsArray[index]);

    mot_a_trouver = wordsArray[index];
    erreurs_commises = 0;
    lettres_tentees = [];
    mot_trouver = underscore(mot_a_trouver);
    document.getElementById("mot-trouver").innerText = mot_trouver;
    document.getElementById("message").innerText = "";
    document.getElementById("lettres-tentees").innerText = "";
    document.getElementById("parties_gagnees").innerText = `Nombre de parties gagnées : ${parties_gagnees}`;
}

function proposerLettre() {
    let lettre = document.getElementById("lettre-input").value.toLowerCase();
    document.getElementById("lettre-input").value = "";

    if (lettre && lettre.length === 1) {
        if (lettres_tentees.includes(lettre)) {
            document.getElementById("message").innerText = `Vous avez déjà tenté la lettre ${lettre}. Veuillez en essayer une autre.`;
        } else {
            lettres_tentees.push(lettre);

            if (mot_a_trouver.includes(lettre)) {
                for (let i = 0; i < mot_a_trouver.length; i++) {
                    if (mot_a_trouver[i] === lettre) {
                        mot_trouver = mot_trouver.substring(0, 2 * i) + lettre + mot_trouver.substring(2 * i + 1);
                    }
                }
            } else {
                document.getElementById("message").innerText = `La lettre ${lettre} n'est pas dans le mot. On trace un trait de plus sur la potence!`;
                erreurs_commises++;
            }
            document.getElementById("mot-trouver").innerText = mot_trouver;
            document.getElementById("lettres-tentees").innerText = `Lettres tentées : ${lettres_tentees.join(', ')}`;
        }
    } else {
        document.getElementById("message").innerText = "Veuillez entrer une seule lettre.";
    }

    if (mot_trouver.replace(/ /g, '') === mot_a_trouver) {
        document.getElementById("message").innerText = "Félicitations ! Vous avez trouvé le mot : " + mot_a_trouver;
        parties_gagnees++;
        document.getElementById("parties_gagnees").innerText = `Nombre de parties gagnées : ${parties_gagnees}`;
    } else if (erreurs_commises >= 10) {
        document.getElementById("message").innerText = "Dommage ! Le mot à trouver était : " + mot_a_trouver;
    }
}

function rejouer() {
    initialiserJeu();
}

// Initialiser le jeu au chargement de la page
window.onload = initialiserJeu;
