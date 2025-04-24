const imageList = [
    { src: 'images/brbrpatatim.webp', label: 'Coming soon' },
    { src: 'images/tralala.webp', label: 'Coming soon' },
    { src: 'images/trippitroppi.webp', label: 'Coming soon' },
    { src: 'images/capuchino.webp', label: 'Coming soon' },
    { src: 'images/balerina.webp', label: 'Coming soon' },
    { src: 'images/Comb3.webp', label: 'Coming soon' },
    { src: 'images/Trulimero_trulicina.webp', label: 'Coming soon' },
    { src: 'images/Trulimero_Trulichina.webp', label: 'Coming soon' },
    { src: 'images/Chimpanzeenee_Rubbishineenee.webp', label: 'Coming soon' },
    { src: 'images/Bombini_Gusini.webp', label: 'Coming soon' },
    { src: 'images/Skibidi_Pollastra_Bombastra.webp', label: 'Coming soon' },
    { src: 'images/Aeromucca.webp', label: 'Coming soon' },
    { src: 'images/BallerinoLololo.webp', label: 'Coming soon' },
    { src: 'images/Images_29.webp', label: 'Coming soon' },
    { src: 'images/Bobrini_Cactusini_Su_Saturno.webp', label: 'Coming soon' },
    { src: 'images/Bombardiro_Crocodilo.webp', label: 'Coming soon' },
    { src: 'images/Bomboclat_Crococlat.webp', label: 'Coming soon' },
    { src: 'images/Burbaloni.webp', label: 'Coming soon' },
    { src: 'images/ChimpanziniBananini.webp', label: 'Coming soon' },
    { src: 'images/Coccodrill.webp', label: 'Coming soon' },
    { src: 'images/CrocoPotato.webp', label: 'Coming soon' },
    { src: 'images/Gambero_Spero.webp', label: 'Coming soon' },
    { src: 'images/ChatGPT_Image_Apr_212C_05_13_21_PM.webp', label: 'Coming soon' },
    { src: 'images/Matteo.webp', label: 'Coming soon' },
    { src: 'images/Mousini_Picolini.webp', label: 'Coming soon' },
    { src: 'images/olegini.webp', label: 'Coming soon' },
    { src: 'images/OrangutanAnanas.webp', label: 'Coming soon' },
    { src: 'images/Piccione_Macchina.webp', label: 'Coming soon' },
    { src: 'images/Polpetta.webp', label: 'Coming soon' },
    { src: 'images/Rugginato_LupoGT.webp', label: 'Coming soon' },
    { src: 'images/Sovieto_Elephino.webp', label: 'Coming soon' },
    { src: 'images/Stickinisisis.webp', label: 'Coming soon' },
    { src: 'images/Screenshot_2025-04-11_155955.webp', label: 'Coming soon' },
    { src: 'images/Tracotucotulu_delapeladusduz.webp', label: 'Coming soon' },
    { src: 'images/Tric_Trac_Baraboom.webp', label: 'Coming soon' },
];

const leftImage = document.getElementById('leftImage');
const rightImage = document.getElementById('rightImage');
const foughtPairs = new Set();

function getPairKey(img1, img2) {
    return [img1, img2].sort().join('|');
}

function normalizeSrc(src) {
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
    document.getElementById('iqScore').textContent = Math.floor(Math.random() * 71) + 10;
}

function resetGame() {
    foughtPairs.clear();
    document.querySelector('.container').style.display = 'flex';
    document.querySelector('.why').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    initializeImages();
}

document.getElementById('playAgain').addEventListener('click', resetGame);

function handleClick(keptElement, replacedElement) {
    const kept = normalizeSrc(keptElement.src);
    const replaced = normalizeSrc(replacedElement.src);
    const pairKey = getPairKey(kept, replaced);
    foughtPairs.add(pairKey);

    const available = imageList.filter(img => {
        const currentKey = getPairKey(kept, img.src);
        return img.src !== kept && !foughtPairs.has(currentKey);
    });

    if (available.length === 0) {
        endGame(keptElement.src);
    } else {
        const newImage = available[Math.floor(Math.random() * available.length)];
        replacedElement.src = newImage.src;
        replacedElement.parentNode.querySelector('.image-label').textContent = newImage.label;
        
        // Prevent immediate duplicate matchup
        const newSrc = normalizeSrc(newImage.src);
        const currentPair = getPairKey(kept, newSrc);
        foughtPairs.add(currentPair);
    }
}

leftImage.addEventListener('click', () => handleClick(leftImage, rightImage));
rightImage.addEventListener('click', () => handleClick(rightImage, leftImage));

function initializeImages() {
    let first, second;
    do {
        const shuffled = [...imageList].sort(() => Math.random() - 0.5);
        first = shuffled[0];
        second = shuffled[1];
    } while (first.src === second.src);

    leftImage.src = first.src;
    leftImage.parentNode.querySelector('.image-label').textContent = first.label;
    rightImage.src = second.src;
    rightImage.parentNode.querySelector('.image-label').textContent = second.label;
}

window.addEventListener('DOMContentLoaded', initializeImages);