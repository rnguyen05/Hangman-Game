var bandsArr = [
    {
        band: "MADONNA",
        song_title: "Borderline",
        album_img: "borderline.png",
        track: "borderline.mp3"
    }, {
        band: "PRINCE",
        song_title: "Little Red Corvette",
        album_img: "little_red_corvette.png",
        track: "little_red_corvette.mp3"
    }, {
        band: "BLONDIE",
        song_title: "Heart of Glass",
        album_img: "heart_of_glass.png",
        track: "heart_of_glass.mp3"
    }, {
        band: "QUEEN",
        song_title: "Bohemian Rhapsody",
        album_img: "bohemian_rhapsody.png",
        track: "bohemian_rhapsody.mp3"
    }, {
        band: "AEROSMITH",
        song_title: "Angel",
        album_img: "angel.png",
        track: "angel.mp3"
    }, {
        band: "JOURNEY",
        song_title: "Don't Stop Believin'",
        album_img: "dont_stop_believing.png",
        track: "dont_stop_believing.mp3"
    }, {
        band: "FOREIGNER",
        song_title: "I Want to Know What Love Is",
        album_img: "i_want_to_know_what_love_is.png",
        track: "i_want_to_know_what_love_is.mp3"
    }, {
        band: "EURYTHMICS",
        song_title: "Sweet Dreams",
        album_img: "sweet_dreams.png",
        track: "sweet_dreams.mp3"
    }
];

var bandName = bandsArr[Math.floor(Math.random() * bandsArr.length)];
var userGuessArray = [];
var bandNameArray = [];
var bandDashArray = [];
var wins = 0;
var guessedwords;
var guessesleft = 20;
var duplicateInputKeySound = new Audio("assets/sounds/Uh-oh-sound-effect.mp3");
var soundTrack = new Audio();
var imgDir = "assets/images/";
var trackDir = "assets/sounds/";

//Display all initial variables
document.getElementById("id-wins").innerHTML = wins;
document.getElementById("id-guessesleft").innerHTML = guessesleft;
document.getElementById("id-currentword").innerHTML = generateDashString(bandName.band);


//Function to generate dash line based on length band names and push each character into array
function generateDashString(bn) {
    for (var j = 0; j < bn.length; j++) {
        bandDashArray[j] = "- ";
        bandNameArray[j] = bn.charAt([j]);
    }
    return bandDashArray.join(" ");
}

//Load Band Name, Song Title
function loadBandInfo (bn) {
    document.getElementById("id-songtitle").innerHTML = "Song: " + bn.song_title;
    document.getElementById("id-bandname").innerHTML = "Band: " + bn.band;
}

//Load album image when user guessed correct
function loadImage (al_Img) {
    var newImg = document.createElement("img");
    newImg.src = imgDir + al_Img;
    document.getElementById("id-album-img").appendChild(newImg);
    var imgDiv = document.getElementById("id-album-img");
    var newImg = imgDiv.replaceChild(newImg, imgDiv.childNodes[0]);
}

//Load song track when user guessed correct
function loadSoundTrack (sTrack) {
    soundTrack.src = trackDir + sTrack;
    soundTrack.play();
}

//Reset Game Function
function resetGame () {
    //Reset all variables for new game
    userGuessArray.length = 0;
    bandDashArray.length = 0;
    bandName.length = 0;
    bandNameArray.length = 0;
    guessesleft = 20;
    //Display all initial values for new game
    document.getElementById("id-guessesleft").innerHTML = guessesleft;
    document.getElementById("id-guessedwords").innerHTML = userGuessArray;
    bandName = bandsArr[Math.floor(Math.random() * bandsArr.length)];
    document.getElementById("id-currentword").innerHTML = generateDashString(bandName.band);
}


//User Guess keys listener
document.onkeyup = function (event) {
    //Check to see if user input keys exists in the array
    var k = event.key.toUpperCase();
   
    //Check to see if input exists in the userGuessArray
    //If not exists then push to array 
    if (userGuessArray.indexOf(k) === -1) {
        userGuessArray.push(k);
        document.getElementById("id-guessedwords").innerHTML = userGuessArray;
        guessesleft--;
        document.getElementById("id-guessesleft").innerHTML = guessesleft;
        //If user input matches the current word characters
        //Then pop matched characters to the current word
        var t = [];
        for (var i = 0; i <= bandNameArray.length; i++) {
            //if user key matches elements in band name then replace dash with user key
            if (k === bandNameArray[i]) {
                t = bandDashArray.splice(i,1,k);
            }
            else {
                t = bandDashArray.join(" ");
            }
            document.getElementById("id-currentword").innerHTML = t;
            //Compare band name Array to user input array to determine win
            if (t.toString() === bandNameArray.join(" ").toString()) {
                //Increase wins value by 1 and display to DOM
                wins++;
                document.getElementById("id-wins").innerHTML = wins;

                //Call load Band Name and Song Title
                loadBandInfo(bandName);
                
                //Call Load Album Image when user guessed correct
                loadImage(bandName.album_img);

                //Call Load Song Track when user guessed correct
                loadSoundTrack(bandName.track);
                
                //Call Reset Game Function to initializing all variables 
                resetGame();
            }
            else if (guessesleft === 0) {
                //Call Reset Game Function to initializing all variables 
                resetGame();
            }
        }
    }
    else {
        //Play sound if user input key already exists in guessed so far
        duplicateInputKeySound.play();
    }
}
