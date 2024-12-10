// Variable parties gagnées
let parties_gagnees = 0;
let parties_jouees = 0;
const erreurs_autorisees = 7
let mot_a_trouver, mot_trouver, erreurs_commises, lettres_tentees;
const imagesErreurs = [
    "pendu7.png",
    "pendu6.png",
    "pendu5.png",
    "pendu4.png",
    "pendu3.png",
    "pendu2.png",
    "pendu1.png",
    "pendu0.png",
];
// Boucle pour demander au joueur s'il souhaite rejouer
/* let rejouer = true;
while (rejouer) {
    jouer();
    let reponse = window.prompt("Voulez-vous rejouer ? (oui/non)");
    if (reponse.toLowerCase() !== 'oui') {
        rejouer = false;
    }
} */





// Fonction pour remplacer chaque lettre du mot par un tiret
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
    document.getElementById("image-erreur").src = imagesErreurs[0];}

// Boucle principale du jeu
function proposerLettre() {
    let lettre = document.getElementById("lettre-input").value.toLowerCase();
    document.getElementById("lettre-input").value = "";

    if (lettre && lettre.length === 1) {
        if (lettres_tentees.includes(lettre)) {
            document.getElementById("message").innerText = `Vous avez déjà tenté la lettre ${lettre}. Veuillez en essayer une autre.`;
        } else {
            // Ajoute la lettre au tableau des lettres tentées
            lettres_tentees.push(lettre); 

        // Si la lettre est dans le mot à trouver
        if (mot_a_trouver.includes(lettre)) {
            // Remplace les tirets par la lettre correcte
            for (let i = 0; i < mot_a_trouver.length; i++) {
                if (mot_a_trouver[i] === lettre) {
                    mot_trouver = mot_trouver.substring(0, 2 * i) + lettre + mot_trouver.substring(2 * i + 1);
                }
            }
        } else {
            // Affiche les lettres qui ne sont pas dans le mot, incrémente les erreurs
            document.getElementById("message").innerText = `La lettre ${lettre} n'est pas dans le mot. On trace un trait de plus sur la potence!`;
                erreurs_commises++;
                document.getElementById("image-erreur").src = imagesErreurs[erreurs_commises];
            }
            document.getElementById("mot-trouver").innerText = mot_trouver;
            document.getElementById("lettres-tentees").innerText = `Lettres tentées : ${lettres_tentees.join(', ')}`;
    }
} else {
        // Si l'utilisateur n'entre pas une seule lettre
        document.getElementById("message").innerText = "Veuillez entrer une seule lettre.";    
    }


// Vérifie si l'utilisateur a trouvé le mot ou a épuisé ses tentatives
if (mot_trouver.replace(/ /g, '') === mot_a_trouver) {
    document.getElementById("message").innerText = "Félicitations ! Vous avez trouvé le mot : " + mot_a_trouver;
    parties_gagnees++;
    document.getElementById("parties_gagnees").innerText = `Nombre de parties gagnées : ${parties_gagnees}`;
    
} else if (erreurs_commises >= erreurs_autorisees) {
    document.getElementById("message").innerText = "Dommage ! Le mot à trouver était : " + mot_a_trouver;
}

    
}

/* // Affiche le nombre d'erreurs commises et autorisées
console.log(`Nombre d'erreurs commises : ${erreurs_commises}`);
console.log(`Nombre d'erreurs autorisées : ${erreurs_autorisees}`);
// Affiche le nombre de parties gagnées
console.log(`Nombre de parties gagnées : ${parties_gagnees}`);
console.log(`Nombre de parties jouées : ${parties_jouees}`); */


function rejouer() {
    initialiserJeu();
    parties_jouees++;
    document.getElementById("parties_jouees").innerText = `Nombre de parties jouées : ${parties_jouees}`;
}

// Initialiser le jeu au chargement de la page
window.onload = initialiserJeu;