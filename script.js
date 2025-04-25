const imageList = [
    { src: 'images/brbrpatatim.webp', label: 'Brr brr Patapim' },
    { src: 'images/tralala.webp', label: 'Tralalero Tralala' },
    { src: 'images/trippitroppi.webp', label: 'Trippi Troppi' },
    { src: 'images/capuchino.webp', label: 'Capuchino Assassino' },
    { src: 'images/balerina.webp', label: 'Ballerina Cappuccina' },
    { src: 'images/Comb3.webp', label: 'Trippa Troppa Tralala Lirilì Rilà Tung Tung Sahur Boneca Tung Tung Tralalelo Trippi Troppa Crocodina' },
    { src: 'images/Trulimero_Trulichina.webp', label: 'Trulimero Trulicina' },
    { src: 'images/Chimpanzeenee_Rubbishineenee.webp', label: 'Chimpanzeenee Rubbishineenee' },
    { src: 'images/Bombini_Gusini.webp', label: 'Bombombini Gusini' },
    { src: 'images/Skibidi_Pollastra_Bombastra.webp', label: 'Skibidi Pollastra Bombastra' },
    { src: 'images/Aeromucca.webp', label: 'Aeromucca Armata' },
    { src: 'images/BallerinoLololo.webp', label: 'Ballerino Lololo' },
    { src: 'images/Images_29.webp', label: 'Bluberini Octopusini' },
    { src: 'images/Bobrini_Cactusini_Su_Saturno.webp', label: 'Bobrini Cactusini Su Saturno' },
    { src: 'images/Bombardiro_Crocodilo.webp', label: 'Bombardiro Crocodillo' },
    { src: 'images/Bomboclat_Crococlat.webp', label: 'Bomboclat Crococlat' },
    { src: 'images/Burbaloni.webp', label: 'Burbaloni Luliloli' },
    { src: 'images/ChimpanziniBananini.webp', label: 'Chimpanzini Bananini' },
    { src: 'images/Coccodrill.webp', label: 'Coccodrillo Robloxino' },
    { src: 'images/CrocoPotato.webp', label: 'Crocodilo Potatino' },
    { src: 'images/Gambero_Spero.webp', label: 'Gambero Spero' },
    { src: 'images/ChatGPT_Image_Apr_212C_05_13_21_PM.webp', label: 'Margeriti Octopusini' },
    { src: 'images/Matteo.webp', label: 'Matteo' },
    { src: 'images/Mousini_Picolini.webp', label: 'Mousarini Pistolini' },
    { src: 'images/olegini.webp', label: 'Olegolini, der Zauberini' },
    { src: 'images/OrangutanAnanas.webp', label: 'Orangutini Ananasini' },
    { src: 'images/Piccione_Macchina.webp', label: 'Piccione Macchina' },
    { src: 'images/Polpetta.webp', label: 'Polpetta Erbivora' },
    { src: 'images/Rugginato_LupoGT.webp', label: 'Rugginato LupoGT (Il Cannone Stradale)' },
    { src: 'images/Sovieto_Elephino.webp', label: 'Sovieto Elephino' },
    { src: 'images/Stickinisisis.webp', label: 'Stickini Joe Ini Crawfishini Terroristini' },
    { src: 'images/Screenshot_2025-04-11_155955.webp', label: 'Tirilicalica Tirilicalaco' },
    { src: 'images/Tracotucotulu_delapeladusduz.webp', label: 'Tracotucotulu Delapeladustuz' },
    { src: 'images/Tric_Trac_Baraboom.webp', label: 'Tric Trac baraboom' },
];

const leftImage = document.getElementById('leftImage');
const rightImage = document.getElementById('rightImage');
const foughtPairs = new Set();

function normalizeSrc(src) {
    return src.split('/').pop();
}

function getPairKey(img1, img2) {
    return [img1, img2].sort().join('|');
}

function checkAllPairsFought() {
    const totalPairs = (imageList.length * (imageList.length - 1)) / 2;
    return foughtPairs.size >= totalPairs;
}

function endGame(winnerSrc) {
    document.querySelector('.container').style.display = 'none';
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    document.getElementById('winnerImage').src = winnerSrc;
    document.getElementById('iqScore').textContent = Math.floor(Math.random() * 71) + 10;
}

function resetGame() {
    foughtPairs.clear();
    document.querySelector('.container').style.display = 'flex';
    document.getElementById('result').style.display = 'none';
    initializeImages();
}

function handleClick(keptElement, replacedElement) {
    const kept = normalizeSrc(keptElement.src);
    const replaced = normalizeSrc(replacedElement.src);
    foughtPairs.add(getPairKey(kept, replaced));

    const available = imageList.filter(img => {
        const imgSrc = normalizeSrc(img.src);
        const currentKey = getPairKey(kept, imgSrc);
        return imgSrc !== kept && !foughtPairs.has(currentKey);
    });

    if (available.length === 0 || checkAllPairsFought()) {
        endGame(keptElement.src);
    } else {
        const newImage = available[Math.floor(Math.random() * available.length)];
        replacedElement.src = newImage.src;
        replacedElement.parentNode.querySelector('.image-label').textContent = newImage.label;
        foughtPairs.add(getPairKey(kept, normalizeSrc(newImage.src)));
    }
}

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

    foughtPairs.add(getPairKey(normalizeSrc(first.src), normalizeSrc(second.src)));
}

document.getElementById('playAgain').addEventListener('click', resetGame);
leftImage.addEventListener('click', () => handleClick(leftImage, rightImage));
rightImage.addEventListener('click', () => handleClick(rightImage, leftImage));

window.addEventListener('DOMContentLoaded', initializeImages);