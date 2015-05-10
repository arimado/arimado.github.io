
window.onload = function(){

	var image = new Image();

	var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

	if(is_chrome) {

		var global_init = false; 

		$("#instructScreen").fadeIn(5000, function(){
			$("#initButton").fadeIn(2000);
			$(document).keydown(function(e){
				if(e.keyCode == 13) {
					if(!global_init) {
						$("#instructScreen").fadeOut("fast");
						$("#loadingScreen").fadeIn(3000, function(){
							globalInit();
							global_init = true; 
						}); 
						
					}
				}
			});
		});


		function globalInit() {
			console.log('globalInit started');
			image.onload = function() {

				$("#submitButton").click(function(){
					postStatus(); 
				});

				$("#inputBox").keydown(function(e) {
					
					if(e.keyCode == 13) {
						postStatus(); 
						inputBoxElement.value = '';
					}
		
				});

				function init() {
					$("#loadingScreen").fadeOut("slow",function(){
						$("#mainWrapper").fadeIn(5000); 
					}); 

					if(statusCount == 0) {
						setInterval(function () {instructAnim();}, 10000);
					}
				}

				function postStatus() {
					playSound(); 
					console.log('clicked draw button')
					ascii.innerHTML = ''; 
					getText();
					printChars(); 
					statusCount++; 
					moveAscii(); 
				}

				function instructAnim() {

					if(statusCount <= 1) {
						$("#instructBox").fadeIn(3000, function(){
							$("#instructBox").fadeOut(3000); 
						});
					}
				}

				function moveAscii() {

					$('.animWrap').animate(
						{'top': '-10%', 
						 'transform': 'translate(-50%, -1000%)'}, 
						5000, 'easeInOutQuint', function(){
						$('.animWrap').animate(
							{'top': '50%',
							 'transform': 'translate(-50%, -10%)'}, 
							5000 , 'easeInOutQuint', moveAscii());
					}) 
				} 

				Howler.volume(0.3);

				var globalVolume = .5;

				var soundPostHit = new Howl({
					urls: ['sound/posthit.mp3'] 
				});  

				var soundBGMusic = new Howl({
					urls: ['sound/whoami.mp3'],
					buffer: true,
					onload: function(){
						init();
					}
				});

				var soundTyping = new Howl({
					urls: ['sound/soundType_a.mp3'], 
					volume: 0
				}); 

				var soundTypingLoop = new Howl({
					urls: ['sound/soundType_a.mp3'],
					loop: true,
					volume: 1
				}); 

				var soundCrowd = new Howl({
					urls: ['sound/crowd.mp3'],
					loop: true,
					volume: globalVolume
				}); 

				var soundTraffic = new Howl({
					urls: ['sound/traffic.mp3'],
					loop: true,
					volume: globalVolume
				}); 

				var soundConnection = new Howl({
					urls: ['sound/connection_a.mp3'],
					loop: true,
					volume: .1
				}); 

				function playSound() {

					soundPostHit.play();  

					if(statusCount == 0) {	
						soundBGMusic.play(); 
						soundTypingLoop.play();
					}

					if(statusCount == 1) {	
						soundCrowd.fadeIn(globalVolume, 20000); 
						soundTypingLoop.play();
					}

					if(statusCount == 2) {	
						soundConnection.fadeIn(0.1, 20000); 
						soundTraffic.fadeIn(globalVolume, 20000);
					}

					if(statusCount == 3) {	
						
					}

					if(statusCount == 4) {	
					}

				} 

				var statusCount = 0; 

				var inputBox = $("#inputBox");
				var inputBoxElement = $("#inputBox")[0]; 

				var stars = document.getElementById("stars");  
				var ascii = document.getElementById("ascii");

				var sprite = document.getElementById("sprite");
				var spriteWidth = sprite.width; 
				var spriteHeight = sprite.height; 

				var tempCanvasElement = document.createElement("canvas");
				tempCanvasElement.id = "sprite"; 
				tempCanvasElement.width = spriteWidth; 
				tempCanvasElement.height = spriteHeight; 

				var tempCanvasCtx = tempCanvasElement.getContext("2d"); 

				tempCanvasCtx.fillStyle = "white"; 
				tempCanvasCtx.fillRect(0, 0, spriteWidth, spriteHeight);

				tempCanvasCtx.drawImage(image,0,0,spriteWidth, spriteHeight);

				var pixelData = tempCanvasCtx.getImageData(0, 0, spriteWidth, spriteHeight);
				var colourData = pixelData.data; 

				// console.log(pixelData); 
				//star vars

				var nullData = [];
				var starLine = ""; 

				//color vars 
				var r, g, b, shade;
				var character, wrappedChar, wrappedLine, lastPixel = 0, lineCount = 0, pixelCount = 0, line = "";
				var shadeData = []; 
				var totalColourData = [];  
				var charData = []; 
				var currentShadeData = []; 
				var currentString = ''; 
				var randChar = '';
				shadeDataGot = true; 
				var shadeDataNull = [];

				var shadeData_1 = [];
				var shadeData_2 = []; 
				var shadeData_3 = []; 
				var shadeData_4 = []; 
				var shadeData_5 = [];  
				var shadeData_6 = []; 
				var shadeData_7 = []; 
				var shadeData_8 = []; 
				var shadeData_9 = [];

				var currentStringHeavy, currentStringMedium; 

				var currentStringHeavy = [], currentStringMedium = []; 

				// var heavyString = 'abcdeghkmnopqrswxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890#%@&'; 
				// var mediumString = 'fijlt';
				// var lightString = "~!^*-+()'";

				var stringAll = 'abcdefhiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
				var stringHeavy = 'behkmnwxzBEHKMNWXZ';
				var stringMedium = 'acdfoquvACDFOQUV';
				var stringLight = 'fijlt';
				var stringSymbolsHeavy = '@#';
				var stringSymbolsMedium = '$%&=' ;
				var stringSymbolsLight = '~!*+><' ;
				var stringSymbolsVeryLight = "`^',." + '"' ;

				var currentStringAll = [];
				var currentStringHeavy = [];
				var currentStringMedium = [];
				var currentStringLight = [];
				var currentStringSymbolsHeavy = [];
				var currentStringSymbolsMedium = []; 
				var currentStringSymbolsLight = [];
				var currentStringSymbolsVeryLight = [];

				var charVolume; 

				var currentData = []; 

				var heavyChars = [];
				var mediumChars = []; 
				var lightChars = [];

				//animation vars
				var animInitiated = false; 

				//testColoutDataArray 
				var colourLine = ""; 
				var colourTestElement = document.getElementById("colourTest"); 

				//intitalise charData array 
				for(var i = 0; i < colourData.length; i = i+4) charData.push(" "); 

				function getText() {
					currentString = inputBox.val(); 
					console.log(inputBox.val());
				}

				//print intitial data 
				function printCharData() {
					for(var i = 0; i < charData.length; i++) {
						if(i !=0 && i%spriteWidth == 0) {
								ascii.appendChild(document.createTextNode(line));
								//newline
								ascii.appendChild(document.createElement("br"));
								//emptying line for the next row of pixels.
								line = "";
						} else {
							line += charData[i];
						} 
					}
					console.log('chars printed');
				}

				function printTotalColourData() {
					for(var i = 0; i < totalColourData.length; i++) {
						if(i !=0 && i%spriteWidth == 0) {
								colourTestElement.appendChild(document.createTextNode(colourLine));
								//newline
								colourTestElement.appendChild(document.createElement("br"));
								//emptying line for the next row of pixels.
								colourline = "";
						} else {
							colourLine += totalColourData[i];
						} 
					}
				}

				function getShadeData() {

					// console.log('shadeData length: ' + shadeData.length); 
					// console.log('colour data length: ' + colourData.length);

					for(var i = 0; i < colourData.length; i = i+4){
						//get colour data 
						r = colourData[i]; 
						g = colourData[i+1];
						b = colourData[i+2];
						shade = r + g + b;
						//create shade data
						totalColourData.push(shade); 
					} 

					var colourArray = []; 

					for(var i = 0; i < totalColourData.length; i++) {
						if($.inArray(totalColourData[i], colourArray) == -1) {
							colourArray.push(totalColourData[i]); 
						}
						if(totalColourData[i] == colourArray[0]) {
							shadeData.push(0); 
						} else if (totalColourData[i] == colourArray[1]) {
							shadeData.push(1); 
						} else if (totalColourData[i] == colourArray[2]) {
							shadeData.push(2); 
						} else if (totalColourData[i] == colourArray[3]) {
							shadeData.push(3); 
						} else if (totalColourData[i] == colourArray[4]) {
							shadeData.push(4); 
						} else if (totalColourData[i] == colourArray[5]) {
							shadeData.push(5); 
						} else if (totalColourData[i] == colourArray[6]) {
							shadeData.push(6); 
						} else if (totalColourData[i] == colourArray[7]) {
							shadeData.push(7); 
						} else if (totalColourData[i] == colourArray[8]) {
							shadeData.push(8); 
						} else if (totalColourData[i] == colourArray[9]) {
							shadeData.push(9); 
						}
					} 
					console.log(colourArray); 

					if(shadeDataGot) {
						for(var i = 0; i < shadeData.length; i++) {
							// put these things into arrays that clear themeselves 
							if(shadeData[i] == 9) shadeData_9.push(i);
							if(shadeData[i] == 8) shadeData_8.push(i);
							if(shadeData[i] == 7) shadeData_7.push(i);
							if(shadeData[i] == 6) shadeData_6.push(i);
							if(shadeData[i] == 5) shadeData_5.push(i);						
							if(shadeData[i] == 4) shadeData_4.push(i);
							if(shadeData[i] == 3) shadeData_3.push(i);
							if(shadeData[i] == 2) shadeData_2.push(i); 					
							if(shadeData[i] == 1) shadeData_1.push(i);					
							if(shadeData[i] == 0) shadeDataNull.push(i);
						}
						shadeDataGot = false;
					}
				}

				function filterChars() {

					var csIndex;
					for(csIndex = 0; csIndex < currentString.length; csIndex++) {
						//get heavy characters and append to a heavy character array
						for(var i = 0; i < stringAll.length; i++) {
							if(currentString[csIndex] == stringAll[i]){ 
								currentStringAll.push(currentString[csIndex]); 
							}
						}
						for(var i = 0; i < stringHeavy.length; i++) {
							if(currentString[csIndex] == stringHeavy[i]){ 
								currentStringHeavy.push(currentString[csIndex]); 
							}
						}
						for(var i = 0; i < stringMedium.length; i++) {
							if(currentString[csIndex] == stringMedium[i]){ 
								currentStringMedium.push(currentString[csIndex]); 
							}
						}
						for(var i = 0; i < stringLight.length; i++) {
							if(currentString[csIndex] == stringLight[i]){ 
								currentStringLight.push(currentString[csIndex]); 
							}
						}
						for(var i = 0; i < stringSymbolsHeavy.length; i++) {
							if(currentString[csIndex] == stringSymbolsHeavy[i]){ 
								currentStringSymbolsHeavy.push(currentString[csIndex]); 
							}
						}
						for(var i = 0; i < stringSymbolsMedium.length; i++) {
							if(currentString[csIndex] == stringSymbolsMedium[i]){ 
								currentStringSymbolsMedium.push(currentString[csIndex]); 
							}
						}
						for(var i = 0; i < stringSymbolsLight.length; i++) {
							if(currentString[csIndex] == stringSymbolsLight[i]){ 
								currentStringSymbolsLight.push(currentString[csIndex]); 
							}
						}
						for(var i = 0; i < stringSymbolsVeryLight.length; i++) {
							if(currentString[csIndex] == stringSymbolsVeryLight[i]){ 
								currentStringSymbolsVeryLight.push(currentString[csIndex]); 
							}
						}
					}

					// console.log('stringAll: ' + currentStringAll);
					// console.log('stringHeavy: ' + currentStringHeavy);
					// console.log('stringMedium: ' + currentStringMedium);
					// console.log('stringLight: ' + currentStringLight);
					// console.log('stringSymbolsHeavy: ' + currentStringSymbolsHeavy);
					// console.log('stringSymbolsMedium: ' + currentStringSymbolsMedium);
					// console.log('stringSymbolsLight: ' + currentStringSymbolsLight);
					// console.log('stringSymbolsVeryLight: ' + currentStringSymbolsVeryLight);

					currentData = [	
									{string: currentStringAll, shade: [shadeData_3,]},
									{string: currentStringHeavy, shade: [shadeData_9,]},
									{string: currentStringMedium, shade: [shadeData_8, shadeData_6, shadeData_7]},
									{string: currentStringLight, shade: [shadeData_1]},
									{string: currentStringSymbolsHeavy, shade: [shadeData_9]},
									{string: currentStringSymbolsMedium, shade: [shadeData_8]},
									{string: currentStringSymbolsLight, shade: [shadeData_2]},
									{string: currentStringSymbolsVeryLight, shade: [shadeData_1]},
								]; 
				}

				function insertChars() {

					var randIndex, randShadeIndex;
					var volume = [100, 700, 1500, 2000, 3000, 5000]; 
					var changeLvls = [2, 5, 8, 11, 14, 17]; 
					
					if(statusCount == 0) charVolume = 100; 
					if(statusCount == 2) charVolume = 200; 
					if(statusCount == 5) charVolume = 700; 
					if(statusCount == 8) charVolume = 1500; 
					if(statusCount == 11) charVolume = 2000; 
					if(statusCount == 14) charVolume = 3000; 
					if(statusCount == 17) charVolume = 5000; 
					if(statusCount == 20) charVolume = 6000; 
				

					console.log('current char volume: ' + charVolume); 

					for(var i = 0; i < currentData.length; i++) {
						if(currentData[i].string.length > 0) {
							for(var t = 0; t < charVolume; t++) {
								for(var j = 0; j < currentData[i].shade.length; j++) {
									var randIndex = Math.floor(Math.random() * currentData[i].string.length);
									var randShadeIndex = Math.floor(Math.random() * currentData[i].shade[j].length); 
									charData[currentData[i].shade[j][randShadeIndex]] = currentData[i].string[randIndex]; 
								}


							}
							
						}
					}

					for(var i = 0; i < charVolume; i++) {
			
						var randShadeIndex_1 = Math.floor(Math.random() * shadeData_1.length); 
						charData[shadeData_1[randShadeIndex_2]] = '.';
						var randShadeIndex_2 = Math.floor(Math.random() * shadeData_2.length); 
						charData[shadeData_2[randShadeIndex_2]] = '+';
						var randShadeIndex_3 = Math.floor(Math.random() * shadeData_3.length); 
						charData[shadeData_3[randShadeIndex_3]] = '*';
						var randShadeIndex_4 = Math.floor(Math.random() * shadeData_4.length); 
						charData[shadeData_4[randShadeIndex_4]] = '.'; 
						var randShadeIndex_5 = Math.floor(Math.random() * shadeData_5.length); 
						charData[shadeData_5[randShadeIndex_5]] = '.';
						// var randShadeIndex_6 = Math.floor(Math.random() * shadeData_6.length); 
						// charData[shadeData_6[randShadeIndex_6]] = '@';
						var randShadeIndex_7 = Math.floor(Math.random() * shadeData_7.length); 
						charData[shadeData_7[randShadeIndex_7]] = '@';
						// var randShadeIndex_8 = Math.floor(Math.random() * shadeData_8.length); 
						// charData[shadeData_8[randShadeIndex_8]] = '@';
						// var randShadeIndex_9 = Math.floor(Math.random() * shadeData_9.length); 
						// charData[shadeData_9[randShadeIndex_9]] = '@';
					} 



					currentStringAll = [];
					currentStringHeavy = [];
					currentStringMedium = [];
					currentStringLight = [];
					currentStringSymbolsHeavy = [];
					currentStringSymbolsMedium = []; 
					currentStringSymbolsLight = [];
					currentStringSymbolsVeryLight = [];



					
					//empty current strings
				} 

				function insertStars() {
					for(var i = 0; i < 1000; i++) {
						if(statusCount < 1) {
							var randNullShadeIndex = Math.floor(Math.random() * shadeDataNull.length); 
							var randHalf = Math.random();
							if(randHalf > .5) {
								charData[shadeDataNull[randNullShadeIndex]] = '1'; 
							} else if(randHalf < .5) {
								charData[shadeDataNull[randNullShadeIndex]] = '0'; 
							}
							
						}
					}
				}
				function printChars() {

					//intialises: shadeData,shadeDataHeavy, shadeDataMedium 
					if(shadeDataGot) {
						getShadeData(); 
					} 

					//filter charac
					filterChars(); 

					//getCurrentData 

					//insert characters into relevant arrays 
					insertChars(); 

					insertStars(); 

					//printChars 
					printCharData(); 

					var frames = 10, container, frame_width;

					var starFrames = 3, starContainer, starFrame_width;

					if(!animInitiated) {
						//ascii animation
						frames = 10;
						container = document.getElementById("AnimContainer");
						frame_width = parseInt(window.getComputedStyle(container).width)/frames;
						container.style.width = frame_width+"px"; 
						ascii.style.marginLeft = "0";  
						animInitiated = true;
					}

					//print colour Data 
					// printTotalColourData(); 


					setInterval(loop, 1000/10); 

					function loop() {

						var currentMarginLeft = parseFloat(ascii.style.marginLeft); 
						var currentStarMarginLeft = parseFloat(stars.style.marginLeft); 
						
						if(currentMarginLeft == frame_width*(frames-1)*-1) {
							ascii.style.marginLeft = "0"; 
							//stars.style.marginLeft = "0"; 
						} else {
							ascii.style.marginLeft = (currentMarginLeft - frame_width) + "px"; 
							//stars.style.marginLeft = (currentMarginLeft - frame_width) + "px"; 
						}
					} 


				} 



				sprite.parentNode.insertBefore(tempCanvasElement, sprite);
			}
			image.crossOrigin="anonymous";
		    image.src="http://i.imgur.com/lbyJPOR.gif";
		}


	} else {

		$("#compatScreen").fadeIn("slow"); 
		$("#loadingScreen").fadeOut("fast");
	}
}



// var tempCanvasElement = document.getElementById("tempCanvas"); 
// 	tempCanvasElement.width = spriteWidth; 
// 	tempCanvasElement.height = spriteHeight;

// var tempCanvas = tempCanvasElement.getContext("2d");

// tempCanvas.fillStyle = "white"; 
// tempCanvas.fillRect(0,0,spriteWidth,spriteHeight);

// tempCanvas.drawImage(sprite, 0, 0, spriteWidth, spriteHeight);

// tempCanvas.getImageData(0, 0, spriteWidth, spriteHeight);




