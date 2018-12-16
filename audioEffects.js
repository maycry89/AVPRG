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

/**BUG: Erst den effect off knopf an und aus stellen - danach den hauptknopf */

var context = new AudioContext(),
    //hierunter audio api elemente
    sample1 = new Audio("sounds/sample1.wav"),
    //var sample2 = new Audio(sounds/sample2.wav),
    //var sample2 = new Audio(sounds/sample2.wav),

    visualTestCurve = 0, //[!!Nati Test!!]
    multiplicator = 0,
    request = new XMLHttpRequest(),

    stream1 = context.createMediaElementSource(sample1),
    gain1 = context.createGain(),
    stereoPanner1 = context.createStereoPanner(),
    waveShaper1 = context.createWaveShaper(),
    filter1 = context.createBiquadFilter(),

    stream1Intervall,
    source1, source2, source3, 
    sourceBuffers = [source1, source2, source3],

    mode1changer1 = 200,

    //ab hier referenzen zu grafischen Elementen
    
    sliders = document.getElementsByClassName("slider"),
    effectModeOneButtonOne = document.getElementById("effectButtonOne"), 
    effectModeOneButtonTwo = document.getElementById("effectButtonTwo"),
    effectModeOneButtonThree = document.getElementById("effectButtonThree"), 
    submitButton = document.getElementById("submitBtn"),
    selectList =document.getElementById("selectList"), 
    valueFreqMin = document.getElementById("frequMin"),
    valueFreqMax = document.getElementById("frequMax"); 
    modeOneIsOn = false;
    stream1isPlaying = false;
    stream2isPlaying = false;

    // Hier werden die nodes zusammen gesetzt
    stream1.connect(gain1);
    gain1.connect(waveShaper1);
    waveShaper1.connect(filter1);
    filter1.connect(context.destination);
    stereoPanner1.connect(context.destination);


    request.open('GET', "sounds/sample1.wav");
    request.responseType = 'arraybuffer';
    
    


    // WIP FINGER WEG buffer node stuff
    function getData(i) {
        var request = new XMLHttpRequest();
        request.open('GET',  "sounds/" + (i + 1) + ".wav", true);
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
/* DropDownMenü */
selectList.addEventListener("change", function() {
    var name = selectList.options[selectList.selectedIndex].value;
//    document.getElementById("selectedListOutput").innerHTML = selectList.options[selectList.selectedIndex].value;  // */Wert aus der Liste: selectList.options[selectList.selectedIndex].value;   
    sample1 = new Audio("sounds/" + name + ".wav");
    stream1 = context.createMediaElementSource(sample1);
    stream1.connect(gain1);
 //   sample1 = new Audio("sounds/sample2.wav");
//    loadImpulseResponse(name); //Führt Funktion loadImpulseResponse mit der ausgewählten Datei aus
        
});

function changeParameter() {

    //var value = document.getElementById("moveContainer");
    switch(this.id) {
        case "frequencySlider": //***** */ = ID vom Slider
            //filter.frequency.value = this.value;
          //  document.getElementById("frequencyOutput").innerHTML = this.value + " db"; //*** */aktueller Wert-Output vom Slider + "name"
            gain1.gain.setValueAtTime(this.value, context.currentTime);
            gain1.connect(waveShaper1);
            break;
        case "detuneSlider":
            //filter.detune.value = this.value;
          //  document.getElementById("detuneOutput").innerHTML = this.value ;
          //  document.getElementById("detuneDivContainerOutput").innerHTML = "<br>" + this.value; 
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

var buttonHovorColor = "b4f8c0";
var buttonColor = "white";

//---Effekt 1 Button wird gedrückt
effectModeOneButtonOne.addEventListener("click", function(){ 

    if (stream1isPlaying) { //Wenn aus geht
     //sample1.pause(); 
        waveShaper1.curve = null;
        this.innerHTML = "Effect 1 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white"; 
        multiplicator = 0;
    } else {
        //sample1.play();
        //Wenn an geht
        waveShaper1.curve = makeDistortionCurve(400);
        this.innerHTML = "Effect 1 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
    }
    
        stream1isPlaying = !stream1isPlaying;

});

//---Effekt 2 Button wird gedrückt
effectModeOneButtonTwo.addEventListener("click", function() { //Hauptknopf fürs erste StartModul

    if (modeTwoIsOn) {  //Wenn aus geht
        this.innerHTML = "Effect 2 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white";
        filter1.type = "highpass";
        
    } else {  //Wenn an geht       
        this.innerHTML = "Effect 2 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";  
        filter1.type = null;
    };
    modeTwoIsOn = !modeTwoIsOn;
});

/* //Nat: Wird noch überarbeitet, Hover effekte
effectModeOneButtonOne.addEventListener("mousedown", function() {  //active
   
    this.style.backgroundColor = "#689c68";  
});

effectModeOneButtonOne.addEventListener("mouseover", clickHover);  //hover
  

function clickHover(){
    if(!effectModeOneButtonOne.disabled){
        effectModeOneButtonOne.style.color = "white";
    }else{
        effectModeOneButtonOne.style.color = "#b4f8c0";
    };
};

effectModeOneButtonOne.addEventListener("mouseout", function() {  //mouse out

     this.style.color = buttonColor;

});
 */




//Effekt 3 Button wird gedrückt
effectModeOneButtonThree.addEventListener("click", function(){ 

    if (stream1isPlaying) { //Wenn aus geht

            this.innerHTML = "Effect 3 off"; 
            this.style.backgroundColor = "grey";
            this.style.color = "white"; 
            buttonColor = "white"; 
        } else {
  
            this.innerHTML = "Effect 3 on";
            this.style.backgroundColor = "green";
            this.style.color = "yellow";  
            buttonColor = "yellow";
        }
    
        stream1isPlaying = !stream1isPlaying;

});

// Funktion wird später ausgebaut
/*sample1.addEventListener("ended", function () { //[Nati: function neu einzeln machen und weiter oben erneut aufrufen]
    stream1isPlaying = false;
    effectModeOneButtonOne.innerHTML = "Play";
}); 
*/

//Lässt das "active" Textfeld erscheinen wenn Checkbox aktiviert ist
//checkbox1.addEventListener("onclick", checkFunction1);
function checkFunction1() {
    var checkBox1 = document.getElementById("checkMusic");
    var text = document.getElementById("text");
    if (checkBox1.checked == true){ //Wenn Checkbox aktiv ist
        //text.style.display = "inline"; 
        text.innerHTML ="on"
        multiplicator= 5;       
        stream1Intervall = setInterval(mode1,500);
    } else {
        text.innerHTML = "off"
       clearInterval(stream1Intervall);
       multiplicator = 0;
    };
};

//Submit Button
submitButton.addEventListener("click", function() {
    document.getElementById("frequencySlider").min = valueFreqMin.value;
    document.getElementById("frequencySlider").max = valueFreqMax.value;
})

//DANIEL TEIL -------------------------------------------------------------------------------------------

function mode1(){
    sample1.play();
    if(waveShaper1.curve != null){
        mode1changer1 += 100;
        if(mode1changer1 > 800){
            mode1changer1 = 200;
        }
        waveShaper1.curve = makeDistortionCurve(mode1changer1);
    }

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

      visualTestCurve = curve[i]; //[Nati Test!!]
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




















/**Nati Teil: ***********************************************  Visual Effects ***********************/

/**Button Three */
/*
var isPlaying = false;
modeButtonThree.addEventListener("click", function () {
if (isPlaying) {            
    modeButtonThree.innerHTML = "Play";
    
} else {       
    modeButtonThree.innerHTML = "Stop";
    sample1.play();
}
isPlaying = !isPlaying;
});
*/

/* CANVAS */
window.onload = function(){
    var canvas = document.getElementById("paper"),
        c = canvas.getContext("2d");
        TWO_PI = Math.PI * 2;

        c.fillStyle = "black";
        c.fillRect(0,0, canvas.width, canvas.height);

    
    var posX = 40;
    var posY = 50;
    var plusMinus = 1;
    var curveCos;
    
    setInterval(function(){

        posX += plusMinus;
        posY += 1;
        curveCos = (Math.cos(posX * 0.1));

        if (posX >= 480 || posX <= 20){
            plusMinus *= -1;
        };
        
        
        if (modeOneIsOn){
            multiplicator = (visualTestCurve*100000 - 34880);
         }
         else {
            multiplicator = 0;
        };
         
       //multiplicator = (visualTestCurve*100000 - 34880);
       

    //    document.getElementById("moveCycle").innerHTML = curveCos + " pos: " + posX + "<br> curvenwert: " + visualTestCurve + "<br>Beispielwerte: " + 3.5*(Math.cos(0 )) + "<br>Jetziger wert: " + curveCos + "<br>multiplikator: " + multiplicator; 
        c.fillStyle = "rgba(0,0,0,0.03)";
        c.fillRect(0,0, canvas.width, canvas.height);

        c.fillStyle = "white";
        c.beginPath();
        c.arc(posX, curveCos*multiplicator +125, multiplicator, 0, TWO_PI, false); //x, y, radius
        c.fill();
        //document.getElementById("infoText").innerHTML = "<br> multiplicator: " + curveCos*multiplicator +125 +"<br>mode on?: " + modeOneIsOn; //TEST NATI





    }, 10);

};


