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


    request = new XMLHttpRequest(),

    stream1 = context.createMediaElementSource(sample1),
    gain1 = context.createGain(),
    stereoPanner1 = context.createStereoPanner(),
    waveShaper1 = context.createWaveShaper(),

    stream1Intervall,
    source1, source2, source3, 
    sourceBuffers = [source1, source2, source3],

    //ab hier referenzen zu grafischen Elementen
    
    sliders = document.getElementsByClassName("slider"),
    modeButtonOne = document.getElementById("playStopButtonOne"), 
    modeButtonTwo = document.getElementById("playStopButtonTwo"),
    modeButton3 = document.getElementById("playStopButtonThree"), 
    submitButton = document.getElementById("submitBtn"),
    selectList =document.getElementById("selectList"), 
    valueFreqMin = document.getElementById("frequMin"),
    valueFreqMax = document.getElementById("frequMax"); 
    stream1isPlaying = false;
    stream2isPlaying = false;

    // Hier werden die nodes zusammen gesetzt
    stream1.connect(gain1);
    gain1.connect(waveShaper1);
    waveShaper1.connect(stereoPanner1);
    stereoPanner1.connect(context.destination);


    request.open('GET', "sounds/sample1.wav");
    request.responseType = 'arraybuffer';
    
    



    function getData(i) {
        var request = new XMLHttpRequest();
        request.open('GET',  "../sounds/drumsounds/sound" + (i + 1) + ".wav", true);
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

    function playSound(i) {
        getData(i);
        sourceBuffers[i].start(0);
    }

for (var i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter);
}

selectList.addEventListener("change", function() {
    var name = selectList.options[selectList.selectedIndex].value;
    document.getElementById("selectedListOutput").innerHTML = selectList.options[selectList.selectedIndex].value;  // */Wert aus der Liste: selectList.options[selectList.selectedIndex].value;   
    sample1 = new Audio("sounds/" + name + ".wav");
 //   sample1 = new Audio("sounds/sample2.wav");
//    loadImpulseResponse(name); //Führt Funktion loadImpulseResponse mit der ausgewählten Datei aus
        
});



/*
function loadImpulseResponse(name) {
    var request = new XMLHttpRequest();
    request.open("GET",  ("../sounds/impulseResponses/" + name + ".wav"), true);
    request.responseType = "arraybuffer";

    request.onload = function () {
        var undecodedAudio = request.response;
        context.decodeAudioData(undecodedAudio, function (buffer) {
            if (convolver) {convolver.disconnect(); }
            convolver = context.createConvolver();
            convolver.buffer = buffer;
            convolver.normalize = true;

            source.connect(convolver);
            convolver.connect(context.destination);
        });
    };
    request.send();
}
*/


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
        //sample1.pause(); 
        waveShaper1.curve = null;
        modeButtonOne.innerHTML = "Play";
    } else {
        //sample1.play();
        waveShaper1.curve = makeDistortionCurve(400);

        modeButtonOne.innerHTML = "Stop";
    }

    stream1isPlaying = !stream1isPlaying;
})


//Testvorgangs Button FUNZT
//---Play/Stop Button 2 wird gedrückt
modeButtonTwo.addEventListener("click", function () {

    if (stream2isPlaying) { 
        //stream1 = context.createMediaElementSource(sample1),
        sample1 = new Audio("sounds/sample1.wav"),
        modeButtonTwo.innerHTML = "Play";
    } else {
        //sample1.play();
        sample1 = new Audio("sounds/sample2.wav"),
        modeButtonTwo.innerHTML =  "Stop";
    }

    stream2isPlaying = !stream2isPlaying;
})


// Funktion wird später ausgebaut
/*sample1.addEventListener("ended", function () { //[Nati: function neu einzeln machen und weiter oben erneut aufrufen]
    stream1isPlaying = false;
    modeButtonOne.innerHTML = "Play";
}); 
*/

//Lässt das "active" Textfeld erscheinen wenn Checkbox aktiviert ist
//checkbox1.addEventListener("onclick", checkFunction1);
    
function checkFunction1() {
    var checkBox1 = document.getElementById("checkMusic");
    var text = document.getElementById("text");
    if (checkBox1.checked == true){ //Wenn Checkbox aktiv ist
        text.style.display = "inline"; 
        //Hier Code Daniel
        
        stream1Intervall = setInterval(mode1,500);
    } else {
       text.style.display = "none";
       clearInterval(stream1Intervall);
    }
}

//Submit Button
submitButton.addEventListener("click", function () {
    document.getElementById("frequencySlider").min = valueFreqMin.value;
    document.getElementById("frequencySlider").max = valueFreqMax.value;
})

//DANIEL TEIL -------------------------------------------------------------------------------------------

function mode1(){
    sample1.play();
    //Alternative hier
    //playSound(1);
    /*
    var undecodedAudio = request.response;
    context.decodeAudioData(undecodedAudio, function (buffer){
        var sourceBuffer = context.createBufferSource();
        sourceBuffer.buffer = buffer;
        sourceBuffer.connect(context.destination);
        sourceBuffer.start(context.currentTime);
    });

    request.send();
    */
}

function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 44100,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
  };

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




















/*************************************************  Visual Effects **********/

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

/* CANVAS */
window.onload = function(){
    var canvas = document.getElementById("paper"),
        c = canvas.getContext("2d");
        TWO_PI = Math.PI * 2;

        c.fillStyle = "black";
        c.fillRect(0,0, canvas.width, canvas.height);

    
    var posX = 50;
    var posY = 50;
    setInterval(function(){

        posX += 1;
        posY += 1;

        

        document.getElementById("moveCycle").innerHTML = Math.cos(posY) + " pos: " + posY ; 
        c.fillStyle = "rgba(0,0,0,0.03)";
        c.fillRect(0,0, canvas.width, canvas.height);

        c.fillStyle = "white";
        c.beginPath();
        c.arc(posX, Math.cos(posY)*30 + 50, 30, 0, TWO_PI, false); //x, y, radius
        c.fill();



    }, 50);

};


