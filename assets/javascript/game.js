//Initial variables
var bandsArray = [{
                    band: "MADONNA",
                    song: "Borderline",
                    album: ""
                }, {
                    band: "QUEEN",
                    song: "Bohemian Rhapsody",
                    album: ""
                }, {
                    band: "PRINCE",
                    song: "Little Red Corvette",
                    album: ""
                }, {
                    band: "EURYTHMICS",
                    song: "Sweet Dreams",
                    album: ""
                }, {
                    band: "AEROSMITH",
                    song: "Angel",
                    album: ""
                }, {
                    band: "JOURNEY",
                    song: "Don't Stop Believin'",
                    album: ""
                }, {
                    band: "BLONDIE",
                    song: "Heart of Glass",
                    album: ""
                }, {
                    band: "FOREIGNER",
                    song: "I Want to Know What Love Is",
                    album: ""
                }];
var bandName = bandsArray[Math.floor(Math.random() * bandsArray.length)];
var userGuessArray = [];
var wins = 0;
var guessedwords;
var guessesleft = 20;
var i = 0;

//Display all initial variables
document.getElementById("id-wins").innerHTML = wins;
document.getElementById("id-guessesleft").innerHTML = guessesleft;
document.getElementById("id-currentword").innerHTML = generateDashString(bandName.band.length);

//Function to generate dash line based on length band names
function generateDashString(bl) {
    var t = " ";
    for (var l = 1; l <= bl; l++) {
        t += "- ";
    }
    return t; 
}

//User Guess keys listener
document.onkeyup = function (event) {
    //Check to see if user input keys exists in the array
    var k = event.key.toUpperCase();
    if () {

    }
    userGuessArray.push(event.key);
    document.getElementById("id-guessedwords").innerHTML = userGuessArray;

}

