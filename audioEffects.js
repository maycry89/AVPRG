var context = new AudioContext(),
    
//hierunter audio api elemente

    sample1 = new Audio("sounds/sample1.wav"),
    sample2 = new Audio("sounds/sample2.wav"),
    sample3 = new Audio("sounds/sample3.wav"),

    request = new XMLHttpRequest(),

    stream1 = context.createMediaElementSource(sample1),
    gain1 = context.createGain(),
    stereoPanner1 = context.createStereoPanner(),
    waveShaper1 = context.createWaveShaper(),
    filter1 = context.createBiquadFilter(),
    filter12 = context.createBiquadFilter(),

    stream2 = context.createMediaElementSource(sample2),
    gain2 = context.createGain(),
    stereoPanner2 = context.createStereoPanner(),
    waveShaper2 = context.createWaveShaper(),
    filter2 = context.createBiquadFilter(),
    filter22 = context.createBiquadFilter(),

    stream3 = context.createMediaElementSource(sample3),
    gain3 = context.createGain(),
    stereoPanner3 = context.createStereoPanner(),
    waveShaper3 = context.createWaveShaper(),
    filter3 = context.createBiquadFilter(),
    filter32 = context.createBiquadFilter(),

    streamIntervall,
    source1, source2, source3, 
    sourceBuffers = [source1, source2, source3],

    mode1changer1 = 200,
    mode1changer2 = 200,
    mode1changer3 = 200,

    mode3changer1,
    mode3changer2,
    mode3changer3,

    //ab hier referenzen zu grafischen Elementen
    
    visualTestCurve = 0, //[!!Nati Visual curve!!]
    multiplikator1 = 0,
    multiplikator2 = 0,
    multiplikator3 = 0,

    increaseValueOnOff = 5, //Anstieg kurve on Off
    increaseVolueEffectOne = 5,
    increaseVolueEffectTwo = 5,
    increaseVolueEffectThree = 5,

    sliders = document.getElementsByClassName("slider"),
    effectButtons = document.getElementsByClassName("effectButton"),
    playStopButtons = document.getElementsByClassName("playStopButton"),

    playStopButtonOne = document.getElementById("playStopButtonOne"),
    effectModeOneButtonOne = document.getElementById("effectButtonOne"), 
    effectModeOneButtonTwo = document.getElementById("effectButtonTwo"),
    effectModeOneButtonThree = document.getElementById("effectButtonThree"), 

    playStopButtonTwo = document.getElementById("playStopButtonTwo"),
    effectModeTwoButtonOne = document.getElementById("effectTwoButtonOne"), 
    effectModeTwoButtonTwo = document.getElementById("effectTwoButtonTwo"),
    effectModeTwoButtonThree = document.getElementById("effectTwoButtonThree"),

    playStopButtonThree = document.getElementById("playStopButtonThree"),
    effectModeThreeButtonOne = document.getElementById("effectThreeButtonOne"), 
    effectModeThreeButtonTwo = document.getElementById("effectThreeButtonTwo"),
    effectModeThreeButtonThree = document.getElementById("effectThreeButtonThree"),
    
    playStopActivatedAry = [];

    activatedModes = [];
    modeOneIsOn = false;
    modeTwoIsOn = false;
    stream1isPlaying = false;
    stream2isPlaying = false;
    stream3isPlaying = false;
    gainchanger1 = false;
    gainchanger2 = false;
    gainchanger3 = false;

    filter1.type = "allpass";
    filter2.type = "allpass";
    filter3.type = "allpass";

    // Hier werden die nodes zusammen gesetzt
    stream1.connect(gain1);
    gain1.connect(waveShaper1);
    waveShaper1.connect(filter12);
    filter12.connect(filter1);
    filter1.connect(context.destination);

    stream2.connect(gain2);
    gain2.connect(waveShaper2);
    waveShaper2.connect(filter22);
    filter22.connect(filter2);
    filter2.connect(context.destination);

    stream3.connect(gain3);
    gain3.connect(waveShaper3);
    waveShaper3.connect(filter32);
    filter32.connect(filter3);
    filter3.connect(context.destination);

    request.open('GET', "sounds/sample1.wav");
    request.responseType = 'arraybuffer';

    gain1.gain.setValueAtTime(0, context.currentTime);
    gain2.gain.setValueAtTime(0, context.currentTime);
    gain3.gain.setValueAtTime(0, context.currentTime);
    
    streamIntervall = setInterval(streamintervallFunction,5);

    // buffer node stuff
    function getData(i) {
        var request = new XMLHttpRequest();
        request.open('GET',  "sounds/sample/" + (i + 1) + ".wav", true);
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

for (var i = 0; i < sliders.length; i++) {
    sliders[i].addEventListener("mousemove", changeParameter);
}

function changeParameter() {

    switch(this.id) {
        case "frequencySlider": //***** */ = ID vom Slider
            gain1.connect(waveShaper1);
            break;
        case "detuneSlider":
            document.getElementById("moveContainer").style.marginTop = this.value * 5 + "%" ; //margin vom Container wird verändert  

            break;
        case "qSlider":
            document.getElementById("qOutput").innerHTML = this.value;
            break;
        case "gainSlider":
            document.getElementById("gainOutput").innerHTML = this.value + " dB";
            break;
    }
}

/**********************************************BUTTONS**********************************************************************************/
var buttonHovorColor = "b4f8c0";
var buttonColor = "white";

//****************** */Play Stop Buttons 1 - 3 *****************************

//---PlayStop 1 Button wird gedrückt
playStopButtonOne.addEventListener("click", function(){ 

    if (playStopActivatedAry[0]) { //Wenn aus geht     
        this.innerHTML = "Off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white"; 
        gain1.gain.setValueAtTime(0, context.currentTime);
        visualEffect(1);
        multiplikator1 -= increaseValueOnOff; //Mat: Curve

    } else { //Wenn an geht
        this.innerHTML = "On";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
        multiplikator1 += increaseValueOnOff; //Mat: Curve
        visualEffect(1);
 
        gain1.gain.setValueAtTime(1, context.currentTime);
    }   
    playStopActivatedAry[0] = !playStopActivatedAry[0];
});

//---PlayStop 2 Button wird gedrückt
playStopButtonTwo.addEventListener("click", function(){ 

    if (playStopActivatedAry[1]) { //Wenn aus geht
        this.innerHTML = "Off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white"; 
        visualEffect(5);
        multiplikator2 -= increaseValueOnOff;
        gain2.gain.setValueAtTime(0, context.currentTime);
    } else {

        this.innerHTML = "On";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
       multiplikator2 += increaseValueOnOff;
       visualEffect(5);
        gain2.gain.setValueAtTime(1, context.currentTime);
    }   
    playStopActivatedAry[1] = !playStopActivatedAry[1];
});

//---PlayStop 3 Button wird gedrückt 
playStopButtonThree.addEventListener("click", function(){ 

    if (playStopActivatedAry[2]) { //Wenn aus geht
        this.innerHTML = "Off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white"; 
        multiplikator3 -= increaseValueOnOff;
        visualEffect(9);
        gain3.gain.setValueAtTime(0, context.currentTime);

    } else {

        this.innerHTML = "On";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
        multiplikator3 += increaseValueOnOff;
        visualEffect(9);
        gain3.gain.setValueAtTime(1, context.currentTime);
    }   
    playStopActivatedAry[2] = !playStopActivatedAry[2];
});

//**************************** Effect Buttons 1 - 9 *****************************

//---Effekt 1 Button wird gedrückt
effectModeOneButtonOne.addEventListener("click", function(){ 

    if (activatedModes[0]) { //Wenn aus geht
        waveShaper1.curve = null;
        this.innerHTML = "Effect 1 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white"; 
        visualEffect(2);
    } else {
        //Wenn an geht
        waveShaper1.curve = makeDistortionCurve(400);
        this.innerHTML = "Effect 1 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
        visualEffect(2);
    }
        activatedModes[0] = !activatedModes[0];
});

//---Effekt 2 Button wird gedrückt
effectModeOneButtonTwo.addEventListener("click", function() { 

    if (activatedModes[1]) {  //Wenn aus geht
        this.innerHTML = "Effect 2 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white";
        visualEffect(3);
        filter1.type = "allpass";
        
    } else {  //Wenn an geht       
        this.innerHTML = "Effect 2 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow"; 
        visualEffect(3);
        filter1.type = "lowpass";
        filter1.frequency = 3000;
    };
    activatedModes[1] = !activatedModes[1];
});

//---Effekt 3 Button wird gedrückt
effectModeOneButtonThree.addEventListener("click", function() { 

    if (activatedModes[2]) {  //Wenn aus geht
        this.innerHTML = "Effect 3 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white";
        visualEffect(4);
        filter12.Q.value = 0;
    } else {  //Wenn an geht       
        this.innerHTML = "Effect 3 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";  
        visualEffect(4);
        filter12.Q.value = 25;
    };
    activatedModes[2] = !activatedModes[2];
});

//---Effekt 4 Button wird gedrückt ( 2 - 1 )
effectModeTwoButtonOne.addEventListener("click", function(){ 

    if (activatedModes[3]) { //Wenn aus geht
        this.innerHTML = "Effect 1 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white"; 
        multiplikator2 -= increaseVolueEffectOne; //Nat Grafik Kurve
        waveShaper2.curve = null;
    } else {
        this.innerHTML = "Effect 1 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
        multiplikator2 += increaseVolueEffectOne; //Nat Grafik Kurve
        waveShaper2.curve = makeDistortionCurve(400);
    }
        activatedModes[3] = !activatedModes[3];

});

//---Effekt 5 Button wird gedrückt (2 - 2)
effectModeTwoButtonTwo.addEventListener("click", function() { 

    if (activatedModes[4]) {  //Wenn aus geht
        this.innerHTML = "Effect 2 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white"; 
        visualEffect(7);
        filter2.type = "allpass";
    } else { //Wenn an geht
        this.innerHTML = "Effect 2 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
        visualEffect(7);
        filter2.type = "highpass";
        filter2.frequency = 3000;
    };
    activatedModes[4] = !activatedModes[4];
});

//---Effekt 6 Button wird gedrückt (2 - 3)
effectModeTwoButtonThree.addEventListener("click", function() { 

    if (activatedModes[5]) {  //Wenn aus geht
        this.innerHTML = "Effect 3 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white";
        visualEffect(8);
        filter22.Q.value = 0;                                                   
    } else {  //Wenn an geht       
        this.innerHTML = "Effect 3 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";    
        visualEffect(8);
        filter22.Q.value = 25;
    };
    activatedModes[5] = !activatedModes[5];
});

//---Effekt 7 Button wird gedrückt ( 3 - 1 )
effectModeThreeButtonOne.addEventListener("click", function(){ 

    if (activatedModes[6]) { //Wenn aus geht
        this.innerHTML = "Effect 1 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white";  
        multiplikator3 -= increaseVolueEffectOne;
        visualEffect(10);
        waveShaper3.curve = null;       
    } else {   //Wenn an geht
        this.innerHTML = "Effect 1 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
        multiplikator3 += increaseVolueEffectOne;
        visualEffect(10);
        waveShaper3.curve = makeDistortionCurve(400);
    }
        activatedModes[6] = !activatedModes[6];
});

//---Effekt 8 Button wird gedrückt (3 - 2)
effectModeThreeButtonTwo.addEventListener("click", function() { 

    if (activatedModes[7]) {  //Wenn aus geht
        this.innerHTML = "Effect 2 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white";   
        visualEffect(11);
        filter3.type = "allpass";
    } else {  //Wenn an geht  

        this.innerHTML = "Effect 2 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";  
        visualEffect(11);
        filter3.type = "lowpass";
        filter3.frequency = 3000;
    };
    activatedModes[7] = !activatedModes[7];
});

//---Effekt 9 Button wird gedrückt (3 - 3)
effectModeThreeButtonThree.addEventListener("click", function() { 

    if (activatedModes[8]) {  //Wenn aus geht
        this.innerHTML = "Effect 3 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white";
        visualEffect(12);
        filter32.Q.value = 0;
    } else {  //Wenn an geht  

        this.innerHTML = "Effect 3 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";  
        visualEffect(12);
        filter32.Q.value = 25;
    };
    activatedModes[8] = !activatedModes[8];
});

//---Hover Effekt für die Buttons: ---

for (var i = 0; i < effectButtons.length; i++) {
    effectButtons[i].addEventListener("mouseover", clickHover);
}

for (var i = 0; i < playStopButtons.length; i++) {
    playStopButtons[i].addEventListener("mouseover", clickHover);
}

for (var i = 0; i < effectButtons.length; i++) {
    effectButtons[i].addEventListener("mouseout", clickOut);
}

for (var i = 0; i < playStopButtons.length; i++) {
    playStopButtons[i].addEventListener("mouseout", clickOut);
}

function clickHover(){  

        this.style.color = "#b4f8c0";
};

function clickOut(){  

    if( this.style.backgroundColor == "green"){
        this.style.color = "yellow"; 
    }
    else{
        this.style.color = "white";
    }
         
};

//  --------------- Modifcator Sound Effects --------------------

function streamintervallFunction(){
    if((sample1.paused && sample2.paused && sample3.paused)){
        sample1.play();
        sample2.play();
        sample3.play();
    }
};
function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
      n_samples = 5,
      curve = new Float32Array(n_samples),
      deg = Math.PI / 180,
      i = 0,
      x;
    for ( ; i < n_samples; ++i ) {
      x = i * 2 / n_samples - 1;
      curve[i] = ( 0 + k ) * x * 10 * deg / ( Math.PI + k * Math.abs(x) );

      visualTestCurve = curve[i]; //[Nati: Wert für Curve]
      
    }  
    return curve;
  };

/**Nati Teil: *************************  Visual Effects ***********************/

/* CANVAS */
var radiusIncrease = 2;
var radiusBlink = 0.2;
var radiusRed = 4;

var radiusIncreaseWhite = 2;
var radiusBlinkWhite = 0.2;
var radiusWhite = 4;

var radiusIncreaseBlue = 2;
var radiusBlinkBlue = 0.2;
var rectSize = 15;

var effectThreeActive = false;
var effectThreeActiveWhite = false;
var effectThreeActiveBlue = false;

var effectTwoActive = false;
var effectTwoActiveWhite = false;
var onOffEffectThree = false;

var onOffEffectBlue = false;

var borderOn = false;
var splitDotted = 0;
var splitDottedWhite = 0;

var splitRect = 0;


function visualEffect(numberEffect){

    switch(numberEffect) {
        case 1: // /On/Off 1 = Splitt off
            effectTwoActive = !effectTwoActive;
            break;
        case 2: //Effect 1- 1
            multiplikator1 += increaseVolueEffectOne;
            increaseVolueEffectOne *= -1;
            break;
        case 3: //Effect 1- 2    
            radiusRed += radiusIncrease;
            radiusIncrease *= -1;
            break;
        case 4: //Effect 1- 3
            effectThreeActive = !effectThreeActive;
            break;
        case 5: //Effect On OFF 2
            onOffEffectBlue = !onOffEffectBlue;

            break;
        case 6: //Effect 2- 1
 
            break;
        case 7: //Effect 2- 2
            borderOn = !borderOn;
            break;
        case 8: //Effect 2- 3
            effectThreeActiveBlue = !effectThreeActiveBlue;
            break;
        case 9: //Effect On OFF 3
            onOffEffectThree = !onOffEffectThree;
            break;
        case 10: //Effect 3- 1

            break;
        case 11: //Effect 3- 2
            radiusWhite += radiusIncreaseWhite;
            radiusIncreaseWhite *= -1;
            break;
        case 12: //Effect 3- 3
            effectThreeActiveWhite = !effectThreeActiveWhite;
            break;
    }
   
}

window.onload = function(){
    var canvas = document.getElementById("paper"),
        c = canvas.getContext("2d");
        TWO_PI = Math.PI * 2;

        c.fillStyle = "black";
        c.fillRect(0,0, canvas.width, canvas.height);

    
    var posX = 40;
    var posY = 50;
    var posBlue = 130;
    var posWhite = 160;
    var plusMinus = 1;
    var curveCos;
    var radius = 4;
    var radiusW = 4;
   
    var dottedSignValue = 15;

    setInterval(function(){
       
        posX += plusMinus;
        curveCos = (Math.cos(posX * 0.1));

        if (posX >= 480 || posX <= 20){
            plusMinus *= -1;
        };

        c.fillStyle = "rgba(0,0,0,0.05)"; //Bildschirm füllen
        c.fillRect(0,0, canvas.width, canvas.height); //Bildschirm füllen


        if(effectThreeActive){

            radiusRed += radiusBlink;

            if (radiusRed >= 8 || radiusRed <= 3){
                radiusBlink *= -1;
            };
        }
        else{
            if(!effectTwoActive){
                radiusRed = radius + radiusIncrease;
            }
            else{
                radius = 4;
            }
            
        }
        
        if(effectThreeActiveWhite){

            radiusWhite += radiusBlinkWhite;

            if (radiusWhite >= 8 || radiusWhite <= 3){
                radiusBlinkWhite *= -1;
            };
        }
        else{
            if(!effectTwoActiveWhite){
                radiusWhite = radiusW + radiusIncreaseWhite;
            }
            else{
                radiusW = 4;
            }
            
        }

        if(effectThreeActiveBlue){

            rectSize += radiusBlinkBlue;

            if (rectSize >= 20 || rectSize <= 8){
                radiusBlinkBlue *= -1;
            };
        }
        else{
            
            rectSize = 15 + radiusIncreaseBlue;
           
        }

        if (!effectTwoActive){ //Fügt die drei Kugeln wieder zu einer zusammen

            if (splitDotted > 0){
                splitDotted -= 0.5;
            
            c.fillStyle = "red";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator1 +posY + splitDotted/2, radiusRed , 0, TWO_PI, false); //x, y, multiplikator1 = radiusRed;
            c.fill();

            c.fillStyle = "red";
            c.beginPath();
            c.arc(posX +splitDotted , curveCos*multiplikator1 +posY , radiusRed, 0, TWO_PI, false); //x, y, multiplikator1 = radiusRed;
            c.fill();

            c.fillStyle = "red";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator1 +posY - splitDotted/2, radiusRed, 0, TWO_PI, false); //x, y, multiplikator1 = radiusRed;
            c.fill(); 
        }
            c.fillStyle = "red";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator1 +posY, radiusRed+multiplikator1, 0, TWO_PI, false); //x, y, multiplikator1 = radiusRed;
            c.fill();              
        }

        

        else { //Teilt die rote Kugeln in drei auf
            
            if (splitDotted < dottedSignValue){
                splitDotted += 0.5;
            }

          
            c.fillStyle = "red";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator1 +posY + splitDotted/2, radiusRed, 0, TWO_PI, false); //x, y, multiplikator1 = radiusRed;
            c.fill();
           
            c.fillStyle = "red";
            c.beginPath();
            c.arc(posX +splitDotted , curveCos*multiplikator1 +posY , radiusRed, 0, TWO_PI, false); //x, y, multiplikator1 = radiusRed;
            c.fill();
        
            c.fillStyle = "red";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator1 +posY - splitDotted/2, radiusRed, 0, TWO_PI, false); //x, y, multiplikator1 = radiusRed;
            c.fill(); 
        }
        /************************************************************************************************* */
        
        if (!onOffEffectThree){ //Fügt die drei Kugeln wieder zu einer zusammen

            if (splitDottedWhite > 0){
                splitDottedWhite -= 0.5;
            
            c.fillStyle = "white";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator3 +posY+posWhite + splitDottedWhite/2, radiusWhite , 0, TWO_PI, false); //x, y, multiplikator2 = radiusWhite;
            c.fill();

            c.fillStyle = "white";
            c.beginPath();
            c.arc(posX +splitDottedWhite , curveCos*multiplikator3 +posY+posWhite , radiusWhite, 0, TWO_PI, false); //x, y, multiplikator2 = radiusWhite;
            c.fill();

            c.fillStyle = "white";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator3 +posY+posWhite - splitDottedWhite/2, radiusWhite, 0, TWO_PI, false); //x, y, multiplikator2 = radiusWhite;
            c.fill(); 
        }
            c.fillStyle = "white";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator3 +posY+posWhite, radiusWhite+multiplikator3, 0, TWO_PI, false); //x, y, multiplikator2 = radiusWhite;
            c.fill();              
        }

        else { //Teilt die weiße Kugeln in drei auf
            
            if (splitDottedWhite < dottedSignValue){
                splitDottedWhite += 0.5;
            }

            c.fillStyle = "white";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator3 +posY+posWhite + splitDottedWhite/2, radiusWhite, 0, TWO_PI, false); //x, y, multiplikator2 = radiusRed;
            c.fill();
           
            c.fillStyle = "white";
            c.beginPath();
            c.arc(posX +splitDottedWhite , curveCos*multiplikator3 +posY+posWhite , radiusWhite, 0, TWO_PI, false); //x, y, multiplikator2 = radiusRed;
            c.fill();
        
            c.fillStyle = "white";
            c.beginPath();
            c.arc(posX, curveCos*multiplikator3 +posY+posWhite - splitDottedWhite/2, radiusWhite, 0, TWO_PI, false); //x, y, multiplikator2 = radiusRed;
            c.fill(); 
        }/***************************************** */
        
        if (onOffEffectBlue){ // Blauer Quadrat

            if (splitRect < 10){
                splitRect += 0.2;
            }

            if (!borderOn){

                c.fillStyle = "blue";
                c.fillRect(posX-(rectSize/2), curveCos*multiplikator2 +posBlue - (rectSize/2) -splitRect, rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2); // x, y, x-weidth, y-lenght 

                c.fillStyle = "blue";
                c.fillRect(posX-(rectSize/2) + splitRect, curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);

                c.fillStyle = "blue";
                c.fillRect(posX-(rectSize/2), curveCos*multiplikator2 +posBlue - (rectSize/2) +splitRect, rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);

                c.fillStyle = "blue";
                c.fillRect(posX-(rectSize/2) -splitRect, curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);               
            }
            else { // Erstellt blauen Rand

                c.strokeStyle = "blue";
                c.strokeRect(posX-(rectSize/2), curveCos*multiplikator2 +posBlue - (rectSize/2) -splitRect, rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2); // x, y, x-weidth, y-lenght 
    
                c.strokeStyle = "blue";
                c.strokeRect(posX-(rectSize/2) + splitRect, curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);
    
                c.strokeStyle = "blue";
                c.strokeRect(posX-(rectSize/2), curveCos*multiplikator2 +posBlue - (rectSize/2) +splitRect, rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);
    
                c.strokeStyle = "blue";
                c.strokeRect(posX-(rectSize/2) -splitRect, curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);
            }
                 
        }        
        else {

            if (splitRect > 4){
                splitRect -= 0.5; 

                if(!borderOn){
                    c.fillStyle = "blue";
                    c.fillRect(posX-(rectSize/2), curveCos*multiplikator2 +posBlue - (rectSize/2) -splitRect, rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2); // x, y, x-weidth, y-lenght 

                    c.fillStyle = "blue";
                    c.fillRect(posX-(rectSize/2) + splitRect, curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);

                    c.fillStyle = "blue";
                    c.fillRect(posX-(rectSize/2), curveCos*multiplikator2 +posBlue - (rectSize/2) +splitRect, rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);

                    c.fillStyle = "blue";
                    c.fillRect(posX-(rectSize/2) -splitRect, curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2); 
                }

                else{
                    c.strokeStyle = "blue";
                    c.strokeRect(posX-(rectSize/2), curveCos*multiplikator2 +posBlue - (rectSize/2) -splitRect, rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2); // x, y, x-weidth, y-lenght 
    
                    c.strokeStyle = "blue";
                    c.strokeRect(posX-(rectSize/2) + splitRect, curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);
    
                    c.strokeStyle = "blue";
                    c.strokeRect(posX-(rectSize/2), curveCos*multiplikator2 +posBlue - (rectSize/2) +splitRect, rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);
    
                    c.strokeStyle = "blue";
                    c.strokeRect(posX-(rectSize/2) -splitRect, curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize/2 + multiplikator2 , (rectSize/2) + multiplikator2);
                }
                
            }

            else{

                if(!borderOn){

                c.fillStyle = "blue";
                c.fillRect(posX-(rectSize/2) , curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize + multiplikator2 , rectSize + multiplikator2);

                }
                else{
                c.strokeStyle = "blue";
                c.strokeRect(posX-(rectSize/2) , curveCos*multiplikator2 +posBlue - (rectSize/2), rectSize + multiplikator2 , rectSize + multiplikator2);

                }
            }     
        }       
    }, 10);
};

   




