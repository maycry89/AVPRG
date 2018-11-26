//Kommentar hinter der Zeile

/* Kommentar über dem Absatz 
----------
----------
*/

// !!! Änderung Name
// ??? Warum ist das so ????

// [Nur für mich]

/* [Kommentar über dem Absatz Nur für mich ]
----------
-----------
*/

modeButtonThree = document.getElementById("playStopButtonThree"), 
streamisPlaying = false;


//---Play/Stop Button wird gedrückt
modeButtonThree.addEventListener("click", function () {
if (streamisPlaying) {            
    modeButtonThree.innerHTML = "Play";
} else {       
    modeButtonThree.innerHTML = "Stop";
}

streamisPlaying = !streamisPlaying;
});
