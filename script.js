const imageList = [
    'images/brbrpatatim.webp',
    'images/tralala.webp',
    'images/trippitroppi.webp',
    'images/capuchino.webp',
    'images/balerina.webp',
    'images/Comb3.webp',
    'images/Trulimero_trulicina.webp',
    'images/Trulimero_Trulichina.webp',
    'images/Chimpanzeenee_Rubbishineenee.webp',
    'images/Bombini_Gusini.webp',
    'images/Skibidi_Pollastra_Bombastra.webp',
    'images/Aeromucca.webp',
    'images/BallerinoLololo.webp',
    'images/Images_29.webp',
    'images/Bobrini_Cactusini_Su_Saturno.webp',
    'images/Bombardiro_Crocodilo.webp',
    'images/Bomboclat_Crococlat.webp',
    'images/Burbaloni.webp',
    'images/ChimpanziniBananini.webp',
    'images/Coccodrill.webp',
    'images/CrocoPotato.webp',
    'images/Gambero_Spero.webp',
    'images/ChatGPT_Image_Apr_212C_05_13_21_PM.webp',
    'images/Matteo.webp',
    'images/Mousini_Picolini.webp',
    'images/olegini.webp',
    'images/OrangutanAnanas.webp',
    'images/Piccione_Macchina.webp',
    'images/Polpetta.webp',
    'images/Rugginato_LupoGT.webp',
    'images/Sovieto_Elephino.webp',
    'images/Stickinisisis.webp',
    'images/Screenshot_2025-04-11_155955.webp',
    'images/Tracotucotulu_delapeladusduz.webp',
    'images/Tric_Trac_Baraboom.webp',
];



const leftImage = document.getElementById('leftImage');
const rightImage = document.getElementById('rightImage');
const foughtPairs = new Set();

function getPairKey(img1, img2) {
    return [img1, img2].sort().join('|');
}

function getImageName(src) {
    const url = new URL(src, window.location.href);
    return url.pathname.startsWith('/') 
        ? url.pathname.substring(1)
        : url.pathname;
}

function endGame(winnerSrc) {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.why').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    document.getElementById('winnerImage').src = winnerSrc;
    document.getElementById('iqScore').textContent = Math.floor(Math.random() * 71) + 10; // 10-80
}

// reset the game data
function resetGame() {
    foughtPairs.clear();
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.why').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    initializeImages();
}

// event listener for play again button
document.getElementById('playAgain').addEventListener('click', resetGame);

function handleClick(keptElement, replacedElement) {
    const kept = getImageName(keptElement.src);
    const replaced = getImageName(replacedElement.src);
    const pairKey = getPairKey(kept, replaced);
    foughtPairs.add(pairKey);

    const available = imageList.filter(img => {
        const imgKey = getPairKey(kept, img);
        return img !== kept && !foughtPairs.has(imgKey);
    });

    if (available.length === 0) {
        endGame(keptElement.src);
    } else {
        const newImage = available[Math.floor(Math.random() * available.length)];
        replacedElement.src = newImage;
    }
}

leftImage.addEventListener('click', () => handleClick(leftImage, rightImage));
rightImage.addEventListener('click', () => handleClick(rightImage, leftImage));

function initializeImages() {
    const shuffled = [...imageList].sort(() => Math.random() - 0.5);
    leftImage.src = shuffled[0];
    rightImage.src = shuffled[1];
}

window.addEventListener('DOMContentLoaded', initializeImages);