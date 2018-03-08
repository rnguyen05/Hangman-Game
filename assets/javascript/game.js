//Master Object contains all variables, functions and arrays
var Obj = {
    wins: 0,
    guessesleft: 20,
    userGuessArray: [],
    bandNameArray: [],
    bandDashArray: [],
    soundTrack: new Audio(),
    imgDir: "assets/images/",
    trackDir: "assets/sounds/",
    duplicateInputKeySound: new Audio("assets/sounds/Uh-oh-sound-effect.mp3"),

    masterFunction: function (userKey) {
        //Check to see if input exists in the userGuessArray
        //If not exists then push to array 
        if (this.userGuessArray.indexOf(userKey) === -1) {
            this.userGuessArray.push(userKey);
            document.getElementById("id-guessedwords").innerHTML = this.userGuessArray;
            this.guessesleft--;
            document.getElementById("id-guessesleft").innerHTML = this.guessesleft;
            //If user input matches the current word characters
            //Then pop matched characters to the current word
            var userKeyArr = [];
            for (var i = 0; i <= this.bandNameArray.length; i++) {
                //if user key matches elements in band name then replace dash with user key
                if (userKey === this.bandNameArray[i]) {
                    userKeyArr = this.bandDashArray.splice(i,1,userKey);
                }
                else {
                    userKeyArr = this.bandDashArray.join(" ");
                }
                document.getElementById("id-currentword").innerHTML = userKeyArr;
                //Convert bandNameArray and userKeyArr to strings then compare two strings
                //to determine wins
                if (userKeyArr.toString() === this.bandNameArray.join(" ").toString()) {
                    //Increase wins value by 1 and display to DOM
                    this.wins++;
                    document.getElementById("id-wins").innerHTML = this.wins;
                    //Call Function to Load Band Name and Song Title
                    this.loadBandInfo(bandName);                   
                    //Call Function to Load Album Image when user guessed correct
                    this.loadImage(bandName.album_img);
                    //Call Function to Load Song Track when user guessed correct
                    this.loadSoundTrack(bandName.track);                    
                    //Call Function to reset all variables for the new game
                    this.resetGame();
                }
                else if (this.guessesleft === 0) {
                    //Call Function to reset all variables for the new game
                    this.resetGame();
                }
            }
        }
        else {
            //Play sound if user input key already exists in guessed so far
            this.duplicateInputKeySound.play();
        }
    },
    //Function to generate dash line based on length band names and push each character into array
    generateDashString: function (bn) {
        for (var j = 0; j < bn.length; j++) {
            this.bandDashArray[j] = "- ";
            this.bandNameArray[j] = bn.charAt([j]);
        }
        return this.bandDashArray.join(" ");
    },

    //Load Band Name, Song Title
    loadBandInfo: function (bn) {
        document.getElementById("id-songtitle").innerHTML = "Song: " + bn.song_title;
        document.getElementById("id-bandname").innerHTML = "Band: " + bn.band;
    },

    //Load album image when user guessed correct all letters
    loadImage: function (al_Img) {
        var newImg = document.createElement("img");
        newImg.src = this.imgDir + al_Img;
        document.getElementById("id-album-img").appendChild(newImg);
        var imgDiv = document.getElementById("id-album-img");
        var newImg = imgDiv.replaceChild(newImg, imgDiv.childNodes[0]);
    },

    //Load song track when user guessed correct all letters
    loadSoundTrack: function (sTrack) {
        this.soundTrack.src = this.trackDir + sTrack;
        this.soundTrack.play();
    },

    //Reset Game Function
    resetGame: function () {
        //Reset all variables for new game
        this.userGuessArray.length = 0;
        this.bandDashArray.length = 0;
        bandName.length = 0;
        this.bandNameArray.length = 0;
        this.guessesleft = 20;
        //Display all initial values for new game
        document.getElementById("id-guessesleft").innerHTML = this.guessesleft;
        document.getElementById("id-guessedwords").innerHTML = this.userGuessArray;
        bandName = this.bandsArr[Math.floor(Math.random() * this.bandsArr.length)];
        document.getElementById("id-currentword").innerHTML = this.generateDashString(bandName.band);
    },
    
    //Bands Array
    bandsArr: [
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
    ]
};

//Create new bandName array based on random generated from bandsArr
var bandName = Obj.bandsArr[Math.floor(Math.random() * Obj.bandsArr.length)];

//Display all initial variables
document.getElementById("id-wins").innerHTML = Obj.wins;
document.getElementById("id-guessesleft").innerHTML = Obj.guessesleft;
document.getElementById("id-currentword").innerHTML = Obj.generateDashString(bandName.band);

//User Guess keys listener
document.onkeyup = function (event) {
    //Check to see if user input keys exists in the array
    var userKey = event.key.toUpperCase();
    //Call masterFunction to start the game
    Obj.masterFunction(userKey);
}
