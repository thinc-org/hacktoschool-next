const randomTextColor = () => {
    return randomFromArr(textColors);
}

const randomUserName = () => {
    return randomFromArr(userNameList);
}

const randomFromArr = (arr : Array<String>) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const textColors = [
    "#5996A5",  // GT Cyan
    "#639B6D",  // GT Green
    "#A15993",  // GT Pink
    "#A95151",  // GT Red
    "#C4A24C",  // GT Yellow
    "#CB5B43",  // GT Orange
]

// 40 random username from One Piece & Attack on Titan
const userNameList = ["Monkey D. Luffy", "Roronoa Zoro", "Nami", "Usopp", "Sanji", "Tony Tony Chopper", "Nico Robin", "Franky", "Brook", "Jimbei", "Shanks", "Whitebeard", "Sabo", "Dragon", "Kaido", "Big Mom", "Blackbeard", "Bartholomew Kuma", "Marshall D. Teach", "Crocodile", "Eren Yeager", "Mikasa Ackerman", "Armin Arlert", "Levi", "Erwin Smith", "Hange Zoe", "Reiner Braun", "Bertholdt Hoover", "Annie Leonhart", "Ymir", "Connie Springer", "Sasha Braus", "Jean Kirstein", "Marco Bodt", "Historia Reiss", "Grisha Yeager", "Dot Pixis", "Keith Shadis", "Nanaba", "Gelgar"]

export { randomUserName, randomTextColor }