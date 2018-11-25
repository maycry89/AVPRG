//Kommentar hinter der Zeile

/* Kommentar über dem Absatz 
----------
----------- TEEEST
*/

// !!! Änderung Name
// ??? Warum ist das so ????

// [Nur für mich]

/* [Kommentar über dem Absatz ]
----------
-----------
*/

//Button nameBtn
//


var context = new AudioContext(),
    //hierunter audio api elemente
    sample1 = new Audio("sounds/sample1.wav"),
    //var sample2 = new Audio(sounds/sample2.wav),
    //var sample2 = new Audio(sounds/sample2.wav),

    stream1 = context.createMediaElementSource(sample1),
    gain1 = context.createGain(),
    stereoPanner1 = context.createStereoPanner(),

    //ab hier referenzen zu grafischen Elementen
    sliders = document.getElementsByClassName("slider"),
    modeButtonOne = document.getElementById("playStopButtonOne"), 
    modeButton2 = document.getElementById("playStopButtonTwo"),
    modeButton3 = document.getElementById("playStopButtonThree"), 
    submitButton = document.getElementById("submitBtn"),
    selectList =document.getElementById("selectList"), 
    valueFreqMin = document.getElementById("frequMin");
    valueFreqMax = document.getElementById("frequMax"); 
    stream1isPlaying = false;

    stream1.connect(gain1);
    gain1.connect(stereoPanner1);
    stereoPanner1.connect(context.destination);
/*   
    sound = new Audio("../sounds/sound.wav"),
    source = context.createMediaElementSource(sound),
    filter = context.createBiquadFilter();

sound.loop = true;
source.connect(filter);
filter.connect(context.destination);
*/


for (var i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter);
}

selectList.addEventListener("change", function() {
    document.getElementById("selectedListOutput").innerHTML = selectList.options[selectList.selectedIndex].value;  // */Wert aus der Liste: selectList.options[selectList.selectedIndex].value;
    loadImpulseResponse(name); //Führt Funktion loadImpulseResponse mit der ausgewählten Datei aus
});

/*
selectList.addEventListener("change", function() {
    //filter.type = selectList.options[selectList.selectedIndex].value;
});
*/

function changeParameter() {

    //var value = document.getElementById("moveContainer");
    switch(this.id) {
        case "frequencySlider": //***** */ = ID vom Slider
            //filter.frequency.value = this.value;
            document.getElementById("frequencyOutput").innerHTML = this.value + " Hz"; //*** */aktueller Wert-Output vom Slider + "name"
            break;
        case "detuneSlider":
            //filter.detune.value = this.value;
            document.getElementById("detuneOutput").innerHTML = this.value + " Cents";
            document.getElementById("detuneDivContainerOutput").innerHTML = this.value; 
            document.getElementById("moveContainer").style.marginTop = this.value * 5 + "%" ; //margin vom Container wird verändert       
            break;
        case "qSlider":
            //filter.Q.value = this.value;
            document.getElementById("qOutput").innerHTML = this.value;
            break;
        case "gainSlider":
            //filter.gain.value = this.value;
            document.getElementById("gainOutput").innerHTML = this.value + " dB";
            break;
    }
}

//---Play/Stop Button wird gedrückt
modeButtonOne.addEventListener("click", function () {
    if (stream1isPlaying) { 
        //sound.pause(); 
        
        modeButtonOne.innerHTML = "Play";
    } else {
        sample1.play();
        
        modeButtonOne.innerHTML =  "Stop";
    }

    stream1isPlaying = !stream1isPlaying;
})


sample1.addEventListener("ended", function () {
    isPlaying = false;
    playStopButton.innerHTML = "Play All";
}); 


//Lässt das "active" Textfeld erscheinen wenn Checkbox aktiviert ist
function checkFunction() {
    var checkBox = document.getElementById("checkMusic");
    var text = document.getElementById("text");
    if (checkBox.checked == true){ //Wenn Checkbox aktiv ist
        text.style.display = "inline";
    } else {
       text.style.display = "none";
    }
}

//Submit Button
submitButton.addEventListener("click", function () {
    document.getElementById("frequencySlider").min = valueFreqMin.value;
    document.getElementById("frequencySlider").max = valueFreqMax.value;
})

//DANIEL TEIL -------------------------------------------------------------------------------------------

function mode1(){
    
}

/*
function getData(i) {
    var request = new XMLHttpRequest();
    request.open('GET',  "../sounds/sample" + (i + 1) + ".wav", true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        var undecodedAudio = request.response;

        context.decodeAudioData(undecodedAudio, function (buffer) {
            sourceBuffers[i] = context.createBufferSource();
            sourceBuffers[i].buffer = buffer;
            sourceBuffers[i].connect(context.destination);
        });
    };
    request.send();
}

function playSounds(i){
    getData(i);
    sourceBuffers[i].start(0);
}

function playSounds(buffer, time) {
    var source = context.createBufferSource();
    source.buffer = buffer;
    source.connect(context.destination);
    source.start(time);
}
*/