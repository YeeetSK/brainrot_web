// List of image sources
const imageList = [
    'images/brbrpatatim.webp',
    'images/tralala.webp',
    'images/trippitroppi.webp',
    "images/capuchino.webp",
    "images/balerina.webp",
    "images/Comb3.webp",
    "images/Trulimero_trulicina.webp",
    "images/Trulimero_Trulichina.webp",
    "images/Chimpanzeenee_Rubbishineenee.webp",
    "images/Bombini_Gusini.webp",
    "images/Skibidi_Pollastra_Bombastra.webp",
    "images/Aeromucca.webp",
    "images/BallerinoLololo.webp",
    "images/Images_29.webp",
    "images/Bobrini_Cactusini_Su_Saturno.webp",
    "images/Bombardiro_Crocodilo.webp",
    "images/Bomboclat_Crococlat.webp",
    "images/Burbaloni.webp",
    "images/ChimpanziniBananini.webp",
    "images/Coccodrill.webp",
    "images/CrocoPotato.webp",
    "images/Gambero_Spero.webp",
    "images/ChatGPT_Image_Apr_212C_05_13_21_PM.webp",
    "images/Matteo.webp",
    "images/Mousini_Picolini.webp",
    "images/Olegini%2C_der_Zauberini.webp",
    "images/OrangutanAnanas.webp",
    "images/Piccione_Macchina.webp",
    "images/Polpetta.webp",
    "images/Rugginato_LupoGT.webp",
    "images/Sovieto_Elephino.webp",
    "images/Stickinisisis.webp",
    "images/Screenshot_2025-04-11_155955.webp",
    "images/Tracotucotulu_delapeladusduz.webp",
    "images/Tric_Trac_Baraboom.webp",
];

// Get DOM elements
const leftImage = document.getElementById('leftImage');
const rightImage = document.getElementById('rightImage');

// Helper: Get a different image from the excluded one
function getDifferentImage(exclude) {
    // Filter out the excluded image
    const availableImages = imageList.filter(img => 
        !exclude || !exclude.endsWith(img)
    );
    
    // If no images left (edge case with only 1 image), return the excluded one
    if (availableImages.length === 0) return exclude;
    
    // Return random image from remaining options
    return availableImages[Math.floor(Math.random() * availableImages.length)];
}

// Initialize both images with different sources
function initializeImages() {
    const left = imageList[Math.floor(Math.random() * imageList.length)];
    const right = getDifferentImage(left);

    leftImage.src = left;
    rightImage.src = right;
}

// Click on left image = keep it, change right
leftImage.addEventListener('click', () => {
    rightImage.src = getDifferentImage(leftImage.src);
});

// Click on right image = keep it, change left
rightImage.addEventListener('click', () => {
    leftImage.src = getDifferentImage(rightImage.src);
});

// Run on load
window.addEventListener('DOMContentLoaded', initializeImages);