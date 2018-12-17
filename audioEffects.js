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
    sample2 = new Audio("sounds/sample2.wav"),
    sample3 = new Audio("sounds/sample3.wav"),

    visualTestCurve = 0, //[!!Nati Test!!]
    multiplicator = 0,
    request = new XMLHttpRequest(),

    stream1 = context.createMediaElementSource(sample1),
    gain1 = context.createGain(),
    stereoPanner1 = context.createStereoPanner(),
    waveShaper1 = context.createWaveShaper(),
    filter1 = context.createBiquadFilter(),

    stream2 = context.createMediaElementSource(sample2),
    gain2 = context.createGain(),
    stereoPanner2 = context.createStereoPanner(),
    waveShaper2 = context.createWaveShaper(),
    filter2 = context.createBiquadFilter(),

    stream3 = context.createMediaElementSource(sample3),
    gain3 = context.createGain(),
    stereoPanner3 = context.createStereoPanner(),
    waveShaper3 = context.createWaveShaper(),
    filter3 = context.createBiquadFilter(),

    streamIntervall,
    source1, source2, source3, 
    sourceBuffers = [source1, source2, source3],

    mode1changer1 = 200,

    //ab hier referenzen zu grafischen Elementen
    
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

    submitButton = document.getElementById("submitBtn"),
    selectList =document.getElementById("selectList"), 
    valueFreqMin = document.getElementById("frequMin"),
    valueFreqMax = document.getElementById("frequMax"); 

    activatedModes = [];
    modeOneIsOn = false;
    modeTwoIsOn = false;
    stream1isPlaying = false;
    stream2isPlaying = false;
    stream3isPlaying = false;

    filter1.type = "allpass";
    filter2.type = "allpass";
    filter3.type = "allpass";

    // Hier werden die nodes zusammen gesetzt
    stream1.connect(gain1);
    gain1.connect(waveShaper1);
    waveShaper1.connect(filter1);
    filter1.connect(context.destination);
    //stereoPanner1.connect(context.destination);

    stream2.connect(gain2);
    gain2.connect(waveShaper2);
    waveShaper2.connect(filter2);
    filter2.connect(context.destination);
    //stereoPanner1.connect(context.destination);

    stream3.connect(gain3);
    gain3.connect(waveShaper3);
    waveShaper3.connect(filter3);
    filter3.connect(context.destination);
    //stereoPanner1.connect(context.destination);



    request.open('GET', "sounds/sample1.wav");
    request.responseType = 'arraybuffer';

    gain1.gain.setValueAtTime(0, context.currentTime);
    gain2.gain.setValueAtTime(0, context.currentTime);
    gain3.gain.setValueAtTime(0, context.currentTime);
    
    streamIntervall = setInterval(streamintervallFunction,5);


    // WIP FINGER WEG buffer node stuff
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
            //gain1.gain.setValueAtTime(this.value, context.currentTime);
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

/**********************************************BUTTONS**********************************************************************************/
var buttonHovorColor = "b4f8c0";
var buttonColor = "white";

//****************** */Play Stop Buttons 1 - 3 *****************************

//---PlayStop 1 Button wird gedrückt
playStopButtonOne.addEventListener("click", function(){ 
    if (playStopActivatedAry[0]) { //Wenn aus geht
        //clearInterval(stream1Intervall);      
        this.innerHTML = "Off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white"; 
        gain1.gain.setValueAtTime(0, context.currentTime);

        multiplicator -= 5; //Mat: Curve

    } else { //Wenn an geht
        //waveShaper1.curve = makeDistortionCurve(400);
        //stream1Intervall = setInterval(stream1intervallFunction,500);  // War das hier auskommentiert??
        this.innerHTML = "On";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
        multiplicator += 5; //Mat: Curve
        //increaseRadius(5); //Mat Curve
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
        gain2.gain.setValueAtTime(0, context.currentTime);
    } else {

        this.innerHTML = "On";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
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
        gain3.gain.setValueAtTime(0, context.currentTime);
    } else {

        this.innerHTML = "On";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
        gain3.gain.setValueAtTime(1, context.currentTime);
    }   
    playStopActivatedAry[2] = !playStopActivatedAry[2];
});



//**************************** Effect Buttons 1 - 9 *****************************

//---Effekt 1 Button wird gedrückt
effectModeOneButtonOne.addEventListener("click", function(){ 

    if (activatedModes[0]) { //Wenn aus geht
     //sample1.pause(); 
        waveShaper1.curve = null;
        this.innerHTML = "Effect 1 off"; 
        this.style.backgroundColor = "grey";
        this.style.color = "white"; 
        buttonColor = "white"; 
        multiplicator -= 5; //Mat: Curve
        

    } else {
        //sample1.play();
        //Wenn an geht
        waveShaper1.curve = makeDistortionCurve(400);
        this.innerHTML = "Effect 1 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
        multiplicator += 5; //Mat: Curve
       
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
        multiplicator -= 3; //Mat: Curve

        filter1.type = "allpass";
        
    } else {  //Wenn an geht       
        this.innerHTML = "Effect 2 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow"; 
        multiplicator += 3; //Mat: Curve 

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
        
        gain1.value(100);
        
    } else {  //Wenn an geht       
        this.innerHTML = "Effect 3 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";  
        
        gain1.value(0);
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
        waveShaper2.curve = null;

    } else {
        //Wenn an geht
   
        this.innerHTML = "Effect 1 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";
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

        filter2.type = "allpass";

    } else { //Wenn an geht
   
        this.innerHTML = "Effect 2 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";

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
                                                               
    } else {  //Wenn an geht       
        this.innerHTML = "Effect 3 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";    
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
        waveShaper3.curve = null;       
    } else {   //Wenn an geht
        
        this.innerHTML = "Effect 1 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";

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

        filter3.type = "allpass";
        
    } else {  //Wenn an geht  

        this.innerHTML = "Effect 2 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";  

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

    } else {  //Wenn an geht  

        this.innerHTML = "Effect 3 on";
        this.style.backgroundColor = "green";
        this.style.color = "yellow";  
        buttonColor = "yellow";  
        
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




// Funktion wird später ausgebaut
/*sample1.addEventListener("ended", function () { //[Nati: function neu einzeln machen und weiter oben erneut aufrufen]
    stream1isPlaying = false;
    effectModeOneButtonOne.innerHTML = "Play";
}); 
*/



//Submit Button
submitButton.addEventListener("click", function() {
    document.getElementById("frequencySlider").min = valueFreqMin.value;
    document.getElementById("frequencySlider").max = valueFreqMax.value;
})

//DANIEL TEIL -------------------------------------------------------------------------------------------

function streamintervallFunction(){
    //getData(1);
    //SourceBuffers[1].start(0);
    if((playStopActivatedAry && sample1.paused && sample2.paused && sample3.paused)){
        sample1.play();
        sample2.play();
        sample3.play();
        if(playStopActivatedAry[0]){
            
            if(activatedModes[0]){
                mode1changer1 += 100;
                if(mode1changer1 > 800){
                    mode1changer1 = 200;
                }
                waveShaper1.curve = makeDistortionCurve(mode1changer1);
            }
            if(activatedModes[1]){
                //possible stuff...
            }
            if(activatedModes[2]){
                //mode3changer1 = Math.random()*100;
                //gain1.value(mode3changer1);
            }
        }
    
        if(playStopActivatedAry[1]){
            
            if(activatedModes[3]){
                mode1changer2 += 100;
                if(mode1changer2 > 800){
                    mode1changer2 = 200;
                }
                waveShaper2.curve = makeDistortionCurve(mode1changer2);
            }
            if(activatedModes[4]){
                //possible stuff...
            }
            if(activatedModes[5]){
                //mode3changer1 = Math.random()*100;
                //gain1.value(mode3changer1);
            }
        }
    
        if(playStopActivatedAry[2]){
            
            if(activatedModes[6]){
                mode1changer3 += 100;
                if(mode1changer3 > 800){
                    mode1changer3 = 200;
                }
                waveShaper3.curve = makeDistortionCurve(mode1changer3);
            }
            if(activatedModes[7]){
                //possible stuff...
            }
            if(activatedModes[8]){
                //mode3changer1 = Math.random()*100;
                //gain1.value(mode3changer1);
            }
        }

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
      curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );

      visualTestCurve = curve[i]; //[Nati: Wert für Curve]
      
    }
    

    return curve;
  };

/*
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
    var radius = 4;
    var radiusNew = radius +multiplicator;
    
    setInterval(function(){
       
        posX += plusMinus;
        posY += 1;
        curveCos = (Math.cos(posX * 0.1));

        if (posX >= 480 || posX <= 20){
            plusMinus *= -1;
        };

    

          
    // multi = ((visualTestCurve*100000 - 34500)/100); //~ 6.5
    //    document.getElementById("moveCycle").innerHTML = curveCos + " pos: " + posX + "<br> curvenwert: " + visualTestCurve + "<br>Beispielwerte: " + 3.5*(Math.cos(0 )) + "<br>Jetziger wert: " + curveCos + "<br>multiplikator: " + multiplicator; 

        c.fillStyle = "rgba(0,0,0,0.05)"; //Bildschirm füllen
        c.fillRect(0,0, canvas.width, canvas.height); //Bildschirm füllen

        c.fillStyle = "white";
        c.beginPath();
        c.arc(posX, curveCos*multiplicator +125, radiusNew, 0, TWO_PI, false); //x, y (Abstand nach Oben unten), multiplicator = radius;
        c.fill();

        c.fillStyle = "red";
        c.beginPath();
        c.arc(posX, curveCos*multiplicator +100, radius+multiplicator, 0, TWO_PI, false); //x, y, multiplicator = radius;
        c.fill();

        c.fillStyle = "blue";
        c.fillRect(posX-10, curveCos*multiplicator +140, 15 + multiplicator ,15 + multiplicator); // x, y, x-weidth, y-lenght 

        document.getElementById("infoText").innerHTML = "<br> multiplicator * cos + 125: " + curveCos*multiplicator +125  + "<br> radius: " + multiplicator + "<br> visTest Curve: " + ((visualTestCurve*100000 - 34500)/100); //TEST NATI

    }, 10);


};



