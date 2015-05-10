$(document).ready(function() {

	var audio = $("#audio")[0];
	var button = $("#playButton")[0]; 
	var musicSource = $('#mainMusicSource')[0]; 

	var musicFilename, musicArtistName, musicSongName; 

	var artistName = $("#artistName")[0];
	var songName = $("#songName")[0]; 

	songName.innerHTML = 'suup';

	var button1 = $('.choice1'); 
	var button2 = $('.choice2'); 

	var button3 = $('.choice3'); 

	var button1Pressed = false;
	var button2Pressed = false;
	var button3Pressed = false;
	var startButtonPressed = false; 

	$(document).keydown(function(e) {
		var downStyle = {
				backgroundColor: "white",
				color: "#fd7fe7" }
		if(e.keyCode == 49) {
			button1.css(downStyle);
			button1Pressed = true;
		}
		if(e.keyCode == 50) {
			button2.css(downStyle);	
			button2Pressed = true;	
		}
		if(e.keyCode == 51) {
			button3.css(downStyle);	
			button3Pressed = true;	
		}
		if(e.keyCode == 13) {
			console.log('enter');
			startButtonPressed = true;
		}
	});
 
	$(document).keyup(function(e) {
		var upStyle = {
				backgroundColor: "#fd7fe7", 
				color: "white"
			}
		if(e.keyCode == 49) {
			button1.css(upStyle);
			button1Pressed = false;
		}
		if(e.keyCode == 50) {
			button2.css(upStyle);	
			button2Pressed = false;
		}
		if(e.keyCode == 51) {
			button3.css(upStyle);
			button3Pressed = false;		
		}
		if(e.keyCode == 13) {
			startButtonPressed = false;
		}
	}); 

	// GENERAL 

	var screenSlide = false; 

	var gameScreen = $("#gameScreen");
	var loseScreen = $("#loseScreen");
	var startScreen = $("#startScreen");  

	var sceneBox = $("#lvlPic");
	var lvlTitle = $(".title")[0]; 
	var lvlInfoListElement = $("#lvlInfoListElement")[0]; 

	var loseDialogue = $("#loseDialogue")[0]; 
	var winDialogue = $("#winDialogue")[0]; 

	var dialogue = $( "#screen" )[ 0 ]; 
	var dialogueElement = ("#screen"); 
	var be = 'beforeend';

	
	var frontWrapConsole = '<div class="dialogueBox">';
	var endWrapConsole = '</div>';

	var frontWrapUser = '<div class="dialogueBox user">';
	var endWrapUser = '</div>' ;

	var frontWrapList = '<li class="lvlItem">';
	var endWrapList = '</li>';

	var choice1 = $('.choice1 .description');
	var choice2 = $('.choice2 .description');
	var choice3 = $('.choice3 .description');

	var choices = [choice1, choice2, choice3];

	var currentChoice; 

	var choice = [['Kindly Accept.', 'Ignore.', 'Fuck you dad.'], 
						[['Ask for more. ', 'Spit it out.', 'Throw a tantrum.'],  //1
							[['Run', 'Fight', 'Hold head in shame.'], 
								[['Continue', 'Continue', 'Continue'], 
									[["Torreto! SWAT came into my house, and disrespected my whole family. Someone narc'd me out And you know what...", "Torreto! SWAT came into my house, and disrespected my whole family. Someone narc'd me out And you know what...", "Torreto! SWAT came into my house, and disrespected my whole family. Someone narc'd me out And you know what..."], 
										[['It was you!', 'it was u!!!!11', '1t wa5 yew?~~~'], 
											[['sexy dodge left', 'sexy crouch', 'reverse 360 body-spin hammer fist to chin'], 
												[['swift knee-kick to head','left hook','push kick to solar-plexus'],
													[['stomp on his head till he isnt breathing','walk away to your vehicle so you can race','eat dom'], 
														[['#5']],
														[['I only race for pink slips',"$2 say i win","I'll rek u m8 i swear on me mum"],
															[['Recline car top','Smile and wait for v-tec to kick in','Push NOS'],
																[['clutch','gas','push NoS'],
																	[['increase gear +1','increase gear +2','floor it!'],
																		[['Push NOS', 'Wait for the V-TEC', 'Increase gear +1'],
																			[['@@1121#1']],
																			[['Push NOS', 'Gas', 'Take the UZI from the glovebox and empty the clip into his face.'],
																				[['WOO!', 'WOOOOOOO!', 'WEEOOOOWWW!!!'],
																					[['Im going to find that son of a bitch','That Jetta is mine','nah ceeb. dont even want it.'],
																						[['Go to the local mosque','Go to the local bar','Go to the local police station.'],
																							[['Introduce yourself and ask if anyone has seen a man who goes by "jesse".','Take the 2 UZIs holstered behind your back and shoot all clerics but one.','Go to the bar instead. This place is for narcs.'],
																								[['Go to the bar','Go to the bar','Go to the bar'],
																									[['@@2#3']],[['@@2#3']],[['@@2#3']]],
																								[['Go to the bar','Go to the bar','Go to the bar'],
																									[['@@2#3']],[['@@2#3']],[['@@2#3']]],
																								[['Go to the bar','Go to the bar','Go to the bar'],
																									[['@@2#3']],[['@@2#3']],[['@@2#3']]]
																							],
																							[['Introduce yourself and ask if anyone has seen a man who goes by "jesse".','With the 2 UZIs you got try and shoot all soldiers but one.','Sit down for a drink'],
																								[['@@12311#2'],[],[],[]],
																								[['#4'],[],[],[]],
																								[['Whiskey','Beer','Soju'],
																									[['Introduce yourself and ask if anyone has seen a man who goes by "jesse".','Grab his his face and hold it against the table, pressing your uzi into the side of his head threaten to kill the barman if hes doesnt cooperate','ignore him and drink till your dead, cos fuck it youll never fucken find this guy. why the fuck are you in iraq? fuck'],
																										[['Decline Help','Accept Help','Go to the police station'],
																											[['#4']],
																											[['Drive head on toward Jesse','Tell the Iraqi soldiers to throw down some smokes to cover your position','Run'],
																												[['#3']],
																												[['Drift Normally','Open All three of your NOS tanks.','ceeb, just drive on.'],
																													[['#4']],
																													[['Apply pit manoveore to Jesses car','Ram him forward','Try and beat him to the humvees'],
																														[['Wait for the VTEC', 'Wait for the VTEC', 'Wait for the VTEC'],
																															[['"Fucking rekt m8"','"Way too soon Junior"','"Didn\'t even want the Jetta anway."'],
																																[['Kindly Accept', 'Ignore', 'Fuck you dad'],
																																	[['The End', 'The End', 'The End'],
																																		[['The End', 'The End', 'The End'], 
																																			[],
																																			[],
																																			[]
																																		],
																																		[['@@111#1']],
																																		[['@@111#1']]
																																	],
																																	[['@@111#1']],
																																	[['@@111#1']]
																																],
																																[['@@111#1']],
																																[['@@111#1']]
																															],
																															[['@@211#1']],
																															[['@@211#1']]
																														],
																														[['#4']],
																														[['#4']]
																													],
																													[['#4']]
																												],
																												[['#3']]
																											],
																											[['#4']]
																										],
																										[['#3']],
																										[['#3']]
																									],
																									[['@@231#2']],
																									[['@@231#2']]
																								]
																							],
																							[['#2']]
																						],
																						[['@@111#2']],
																						[['#3']]
																					],
																					[['@@211#2']], 
																					[['@@211#2']]
																				],
																				[['#3']],
																				[['#3']]
																			],
																			[['#3']]
																		],
																		[['@@111#2'],[],[],[]],
																		[['#3']] //
																	],
																	[['increase gear +1','Push NOS','Floor it!'],
																		[['@@111#2']],
																		[['#2']],
																		[['#2']]
																	],
																	[['#3']]
																],
																[['@@211#3']],
																[['#2']]
															],
															[['@@121#2'],
																[['@@11#2']],
																[['#3']],
																[['#3']]
															],
															[['@@121#2']]
														],
														[['#5']]
													],
													[['@@111#1']],
													[['@@111#1']]
												], 
												[['@@111#1']], 
												[['#3']]
												], 
											[['@@111#1', '111112 c2', '111112 c3'], 
												[], 
												[], 
												[]
											], 
											[['@@111#1', '111112 c3', '111112 c3'], 
												[], 
												[], 
												[]
											]
										], 
										[['@@111#1', '112 c2', '112 c3']], 
										[['@@111#1', '112 c2', '112 c3']]
									], 
									[['@@111#1', '112 c2', '112 c3'], 
										[], 
										[], 
										[]
									], 
									[['@@111#1']]
								], 
								[['@@111#1', '11121 c2', '11121 c3'], //11
									[['1121 c1', '1121 c2', '1121 c3'], 
										[], 
										[], 
										[]
									], 
									[['1122 c1', '1122 c2', '1122 c3'], 
										[], 
										[], 
										[]
									], 
									[['1123 c1', '1123 c2', '1123 c3'], 
										[], 
										[], 
										[]
									]
								], 
								[['@@111#1', 'a', 'a'], 
									[], 
									[], 
									[]
								]
						   ], 
							[['@@111#1', '112 c2', '112 c3'], 
								[], 
								[], 
								[]
							], 
							[['@@111#1', 'a', 'a'], 
								[], 
								[], 
								[]
							]
						], 
						[['Hit dad.', 'Say sorry and ask for kimchi.', 'Ignore him'], //2
							[['@@111#1'], 
								[], 
								[], 
								[]
							], 
							[['@@111#1', '22 c2', '22 c2'], 
								[], 
								[], 
								[]
							], 
							[['@@111#1', '23 c2', '23 c3'], 
								[['231 c1', '231 c1', '231 c1'], 
									[['2311 c1', '2311 c1', '2311 c1'], 
										[], 
										[], 
										[]
									], 
									[['211 c1', '221 c1', '231 c1'], 
										[], 
										[], 
										[]
									], 
									[]
								], 
								[], 
								[['233 c1', '233 c2', '233 c2'], 
										[], 
										[], 
										[]
								]
							]
						], 
						[['@@002#1', '3 c2', '3 c3'], 
							[], 
							[], 
							[]
						]
					]

	var responses2 = ['You are at your familys korean lunch. Your father passes you the kimchi.', 
								['You eat the kimchi. It is delish.', 
										 ['Before you can do anything, police storm into your house. Coming to arrest you.', 
											['The police taze your face. You are kocked-out and cuffed. ' , 
												["After applying for bail. You go to the dragon raceway where sweet drags n shit happen. You see torretto on his way to his car. ur deeply shamed from the police raid @ ur house. He must of NARC'd u out. You call out to him:", 
													["Dom begins to walk toward you. Carrying his gains with him.", 
														["Dom punches you in the face, you fall down a bit. Another punch is coming", 
															["Dom misses his punch and then attempts to tackle you.", 
																["You knock-out Dom cold.", 
																	["You're fucked mate. The cops come and charge you for murder. Multiple witnesses.", 
																		["", [],[],[]],
																		["", [],[],[]],
																		["", [],[],[]]
																	],
																	["You are at the starting line, in your s2000. You have been matched with a VW Jetta. You taunt the driver: ", 
																		['The driver nods. </br> The race begins </br> The Jetta is off to a head start', 
																			["You approach the max revs on your current gear", 
																				["You are at optimum revs for gear change.", 
																					['as you are just about to gain on the Jetta, the driver hits NOS and gains good distance. However VTEC is about to kick in',
																						['',
																							[],
																							[],
																							[]
																						],
																						['V-TEC kicks in! You storm forward. You are now head to head.',
																							['You blast forward past the finish line. </br></br> You say to yourself - "Too soon junior."', 
																								['The jetta drives off with your car. </br> Dom says he does not know where he is going', 
																									["the sun shines bright, as you storm through the desert,leaving a cloud of dust in your path. You're in Iraq and You're here to find Jesse. That motherfucker that has your jetta.You decide to ask the locals if they have seen Jesse or his Jetta.", 
																										['There is a group of muslim clerics standing together and conversing', 
																											['They take one look at the photo and they all repeat "Allahu Akbar!" while running crazy around the room and frothing at the mouth',[],[],[]],
																											['You shoot em all  up till there is one last remaining. He tells you to go to the bar.',[],[],[]],
																											['You leave.',[],[],[]]
																										],
																										['the bar is filled with off-duty fully armed iraqi soldiers.', 
																											['', [],[],[]],
																											['You manage to kill 2 soldiers before 24 ak47s are emptied into you', [],[],[]],
																											['The barman asks what you want?', 
																												['"Excellent choice sir. What is a man like you doing in Iraq?"', 
																													['We know this man. He his guilty of countless attrocities against our countrymen. He is currently in Raqqa, but the city is heavily guarded by ISIS militia. You will need the help of our men to get to him.', 
																														['Alone in your dusty s2000, You fang it towards the city of Raqqa on your own. All mortars and machine gun fire is aimed directly at you. You are dead.', [],[],[]],
																														['in your dusty s2000, you lead a pack of humvees and apcs to the ISIS capital in syria. After dodging mortar fire, and running over some ISIS dudes. you get to the city. In the corner of your eye you see jesse run into his a garage, then his jetta bursting out, heavily armoured. fully equiped with sidemounted machine guns. "FOOL, UR DRIVING AN UN-ARMORED S2000!" He storms toward you.', 
																															['Jesse fires his sidemounted machineguns straight at your s2000. You die'],
																															['Jesse is disoriented and cannot get a clear shot. You plan to tokyo-drift around the block under the cover of your smoke to manoveore yourself behind jesse. But your doubting you could do it in time',
																																['You dont make it in time, Jesse destroys your convoy. And you are surrounded and killed by militants.'],
																																['With great speed you drift around the block and find yourself behind Jesse.', 
																																	['You turn his car sideward, directing his machinegun fire away from the iraqi humvees towards the ISIS militants, as you push it along the street towards them. He is pinned between your s2000 and the humvees.',
																																		['V-TEC kicks in, coupled with an engine filled with NOS. You gain so much speed you break through the Jetta, splitting it in half.', 
																																			['The Iraqi soldiers then move on to destroy what is left of ISIS in the city. The taking of Raqqa served as a strategic strongpoint to the final push in defeating ISIS, a combination of Turkish, Iraqi, Peshmerga and NATO forces closed in and eliminated the threat. </br> the US government expunges your criminal record and flys you back Home. </br> You are having dinner with your family, and your father passes you the kimchi.',
																																				['The whole family laughs, and you join in. Living a happily ever.', 
																																					['/end'],
																																					['/end'],
																																					['/end']
																																				],
																																				[],
																																				[]
																																			],
																																			[],
																																			[]
																																		],
																																		[],
																																		[]
																																	],
																																	['Jesse is jolted from behind but continues to shoot down the humvees. You are surrounded. You die.',[],[],[]],
																																	['Jesse guns down the humvees. You are surrounded. You die.',[],[],[]]
																																],
																																['Jesse sees you through the smoke. You are gunned down.']
																															],
																															['Yeah nice.']
																														],
																														['You are deported to china', 
																															[],
																															[],
																															[]
																														]
																													],
																													['You get 24 ak47s emptied into you.', [],[],[]],
																													['You die from alcohol poisoining. ', [],[],[]]
																												],
																												['', [],[],[]],
																												['', [],[],[]]
																											]
																										],
																										['the police deport you to china.', [],[],[]]
																									],
																									['', [],[],[]],
																									['Fine dont play.', [],[],[]]
																								],
																								[],
																								[]
																							],
																							[],
																							['You kill Jesse. But you are eventually arrested for murder. Nice one. ']
																						],
																						['Premature gear change, you lose the edge. Jesse wins.',[],[],[]]
																					],
																					['pus'],
																					['You blew your engine. GJ.']
																				],
																				["You over-rev your vehicle there is a chance you may blow your manifolds.", 
																					[],
																					["You blew the manifolds on your s2000!"],
																					[]
																				],
																				[["You blew the manifolds on your s2000!"]]
																			],
																			["", [],[],[]],
																			["You blew the manifolds on your s2000!", [],[],[]]
																		],
																		["", [],[],[]],
																		["", [],[],[]]
																	],
																	["You're fucked mate. Just fucked.", [],[],[]]
																],
																["", [],[],[]],
																["", [],[],[]]
															],
															["", [],[],[]
															],
															["Reverse hammer fist is weak and stupid. You get punched in the head and die.", [],[],[]
															]
														],
														["", [],[],[]],
														["", [],[],[]]
													],
													["", [],[],[]
													],
													["", [],[],[]
													]
												], 
												['Fight attempt', [], [], []
												], 
												['Shame attempt', [], [], []
												]
											], 
											['You attempt to stab the officer with the table knife. It misses and you are tazed in the face.', 
												['1-1-2-1-0', 
													[['or this', [], [], []]], 
													[['txt', [], [], []]], 
													[['txt', [], [], []]]
												], 
												[['1-1-2-3-0', [], [], []]], 
												[['1-1-2-3-0', [], [], []]]
											], 
											['Shame attempt', 
												[], [], []]], 
										 ['You lunge at the first officer you see with a table knife. </br> </br>You are tazed in the face.', 
										 	['R 1-2-1-0', [], [], []], 
										 	['txt', [], [], []], 
										 	['txt', [], [], []]], 
										 ['Your father tells you to look at him, before slapping you hard across the face. You are cuffed.', 
											 ['R', [], [], []], 
											 ['txt', [], [], []], 
											 ['txt', [], [], []]]
								], 
								['Your father raises his fist to hit you.', 
										['R 2-1-0', 
											['R 2-1-1-0', [], [], []], 
											['txt', [], [], []], 
											['txt', [], [], []]], 
										 ['txt', 
											 ['txt', [], [], []], 
											 ['txt', [], [], []], 
											 ['txt', [], [], []] 
								], 
										 ['R 2-3-0', 
										 	['txt', [], [], []], 
										 	['txt', [], [], []], 
										 	['txt', [], [], []]]], 
								['', 
									['aa', 
										['txasdt', [], [], []], 
										['txasdt', [], [], []], 
										['asd', [], [], []]], 
							      ['txasdast', 
							      	['tasdxt', [], [], []], 
							      	['tasdxt', [], [], []], 
							      	['txasdt', [], [], []]], 
							      ['txasdt', 
							      	['txt', [], [], []], 
							      	['tasdxt', [], [], []], 
							      	['txasdt', [], [], []]]
							    ]
							]; 

	var lvlDetails = [
			{name: 'Tran Home', img: 'jtran_fam.gif', artistName: 'Chinese', songName: 'Traditional', musicSrc: 'chinese.mp3'}, //1
			{name: 'Torreto', img: 'toretto.gif', artistName: 'Prodigy', songName: 'Breathe', musicSrc: 'breathe.mp3'}, //2
			{name: 'The Race', img: 'the-race.gif', artistName: 'Teriyaki Boyz', songName: 'Tokyo Drift', musicSrc: 'tokyo-drift.mp3'}, //3
			{name: 'Baghdad', img: 'baghdad.gif', artistName: 'Muadin Hafiz Mustafa Özcan', songName: 'Azan', musicSrc: 'azan.mp3'}, //4
			{name: 'Assault on Raqqa', img: 'raqqa.gif', artistName: 'Hanz Zimmer', songName: 'Leave no man behind', musicSrc: 'blackhawkdown.mp3'}, //5
			{name: 'Tran Home', img: 'jtran_fam.gif', artistName: 'Chinese', songName: 'Traditional', musicSrc: 'chinese.mp3'}, //6
		]; 

	//LEVELS  

	var currentLvl; 
	var currentChoiceLvl; 
	var currentLvlString = ""; 
	var currentArrayLvl = []; 
	var arrayLvl = [];
	var currentLvlLength;

	var lvl; 

	var currentChoices = choice;
	var currentResponses = responses2;  
	var currentChoice; 
	var nextChoices; 
	var currentResponse; 
	var loseResponse; 

	var redirectChoice; 
	var redirectChoiceIdentifier;
	var redirectChoiceChars = []; 

	var removeLvlAmount; 

	//used as parramaters in getRedirects(); 
	var linearValue = 1; 
	var parallelValue = 2; 

	//PANEL VARIABLES 
	var imgUrl, lvlName, lvlNum, sceneBoxStyles; 
	var previousLvlNum; 
	var lvlIncrement = 0; 
	var changeArrayLvl = [0, 4, 8, 17, 22, 27]; 


	// LEVEL 0 

	dialogue.insertAdjacentHTML(be, frontWrapConsole + "You are at your familys korean lunch. Your father passes you the kimchi." + endWrapConsole); 
	for (var i = 0; i < choices.length; i++) {
		choices[i].text(choice[0][i]); 
	}
	
	for (var i = 0; i < lvlDetails.length; i++) {
		lvlInfoListElement.insertAdjacentHTML(be, frontWrapList + lvlDetails[i].name + endWrapList); 
	}
	checkScene(); 
	checkMusic();
	//MUSIC CONTROLS 

	function controls() {
		if (audio.paused) {
	          audio.play();
	          button.innerHTML = "||";
	       } else {
	          audio.pause();
	          button.innerHTML = ">";
		}
	}

	button.onclick = function() {
		controls();
	};

	// ************************* GAME ENGINE *********************** STARTS

	function shiftNoise() {

	}

	function checkLvlIncrement() {
		if(currentArrayLvl.length < 4) {
			lvlIncrement = 0; 
		} else if (currentArrayLvl.length >= 4 && currentArrayLvl.length < 8) {
			lvlIncrement = 1; 
		} else if (currentArrayLvl.length >= 8 && currentArrayLvl.length < 17) {
			lvlIncrement = 2; 
		} else if (currentArrayLvl.length >= 17 && currentArrayLvl.length < 22) {
			lvlIncrement = 3; 
		} else if (currentArrayLvl.length >= 22 && currentArrayLvl.length < 27) {
			lvlIncrement = 4; 
		} else if (currentArrayLvl.length >= 27) {
			lvlIncrement = 5; 
		}
		console.log('lvlIncrement = ' + lvlIncrement);
	}

	function checkScene() {
		// switch(currentArrayLvl.length) { 
		// 	case 0:
		//         lvlName = lvlDetails[lvlIncrement].name; 
		//         imgUrl = lvlDetails[lvlIncrement].img; 
		//         musicArtistName = lvlDetails[lvlIncrement].artistName;
		//         musicSongName = lvlDetails[lvlIncrement].songName;
		//         musicFilename = lvlDetails[lvlIncrement].musicSrc;
		//         lvlNum = lvlIncrement + 1; 
		//         checkLevel(); 
		//         lvlIncrement++;
		//         console.log('lvlChanged'); 
		//         break;
		//     case 2:
		//        lvlName = lvlDetails[lvlIncrement].name; 
		//         imgUrl = lvlDetails[lvlIncrement].img; 
		//         musicArtistName = lvlDetails[lvlIncrement].artistName;
		//         musicSongName = lvlDetails[lvlIncrement].songName;
		//         musicFilename = lvlDetails[lvlIncrement].musicSrc;
		//         lvlNum = lvlIncrement + 1; 
		//         checkLevel(); 
		//         lvlIncrement++; 
		//         console.log('lvlChanged'); 
		//         break;
		//     case 4:
		//         lvlName = lvlDetails[lvlIncrement].name; 
		//         imgUrl = lvlDetails[lvlIncrement].img; 
		//         musicArtistName = lvlDetails[lvlIncrement].artistName;
		//         musicSongName = lvlDetails[lvlIncrement].songName;
		//         musicFilename = lvlDetails[lvlIncrement].musicSrc;
		//         lvlNum = lvlIncrement + 1; 
		//         checkLevel(); 
		//         lvlIncrement++; 
		//         console.log('lvlChanged'); 
		//         break;
		//     case 5:
		//         lvlName = lvlDetails[lvlIncrement].name; 
		//         imgUrl = lvlDetails[lvlIncrement].img; 
		//         musicArtistName = lvlDetails[lvlIncrement].artistName;
		//         musicSongName = lvlDetails[lvlIncrement].songName;
		//         musicFilename = lvlDetails[lvlIncrement].musicSrc;
		//         lvlNum = lvlIncrement + 1; 
		//         checkLevel(); 
		//         lvlIncrement++;  
		//         console.log('lvlChanged'); 
		//         break;
		//     case 6:
		//         lvlName = lvlDetails[lvlIncrement].name; 
		//         imgUrl = lvlDetails[lvlIncrement].img; 
		//         musicArtistName = lvlDetails[lvlIncrement].artistName;
		//         musicSongName = lvlDetails[lvlIncrement].songName;
		//         musicFilename = lvlDetails[lvlIncrement].musicSrc;
		//         lvlNum = lvlIncrement + 1; 
		//         checkLevel(); 
		//         lvlIncrement++;  
		//         console.log('lvlChanged'); 
		//         break;
		//     case 7:
		//         lvlName = lvlDetails[lvlIncrement].name; 
		//         imgUrl = lvlDetails[lvlIncrement].img; 
		//         musicArtistName = lvlDetails[lvlIncrement].artistName;
		//         musicSongName = lvlDetails[lvlIncrement].songName;
		//         musicFilename = lvlDetails[lvlIncrement].musicSrc;
		//         lvlNum = lvlIncrement + 1; 
		//         checkLevel(); 
		//         lvlIncrement++; 
		//         console.log('lvlChanged'); 
		//         break;   
		// }
		var previousLvlIncrement = lvlIncrement; 
		for(i = 0; i < changeArrayLvl.length; i++) {
			checkLvlIncrement(); 
			if(changeArrayLvl[i] === currentArrayLvl.length) {
			   lvlName = lvlDetails[lvlIncrement].name; 
		        imgUrl = lvlDetails[lvlIncrement].img; 
		        musicArtistName = lvlDetails[lvlIncrement].artistName;
		        musicSongName = lvlDetails[lvlIncrement].songName;
		        musicFilename = lvlDetails[lvlIncrement].musicSrc;
		        lvlNum = lvlIncrement + 1; 
		        checkLevel(); 
		        
			}
		}

		//setStyleForSelectedLvl 

		sceneBoxStyles = {
			background: 'url(images/' + imgUrl + ') no-repeat',
			'background-cover' : 'cover'
		};

		sceneBox.css(sceneBoxStyles); 

		//setMusicForSelectedLvl 

		// var artistName = $("#musicName")[0];
		// var songName = $("#songName")[0];
		console.log('prev ' + previousLvlIncrement);
		console.log('current ' + lvlIncrement)
		if(previousLvlIncrement !== lvlIncrement) {
			checkMusic();
		}
			
	} 

	function setChoice() {
		for (var i = 0; i < choices.length; i++) {
			choices[i].text(currentChoices[0][i]); 
		} 
	}

	function getLevel() {
		lvl = currentArrayLvl.length - 1; 
		if(lvl == NaN) {
			lvl = 0;
		}
	}

	function getCurrentChoiceLvl() {
		if(currentArrayLvl[lvl] - 1 == NaN) {
			currentChoiceLvl = 0; 
		} else {
			currentChoiceLvl = currentArrayLvl[lvl] - 1; 
		} 
	}

	function getRedirects(x) {
		var linearFix = 0; 
		if(x == parallelValue) {
			linearFix = 2;
		} else {
			linearFix = 0;
		}
		for(i = x; i < currentChoices[0][0].length; i++) {
			if(currentChoices[0][0][i] !== "#") {
				redirectChoiceChars[i - linearFix] = currentChoices[0][0][i]; 

			} else {
				//breaks at #
				removeLvlAmount = currentChoices[0][0][i + 1]; 
				break; 
			}
		} 
	} 

	function addRedirects() {
		for(i = lvl; i < lvl + redirectChoiceChars.length; i++) {
				currentArrayLvl[i - 2] = redirectChoiceChars[i - (lvl)];
		}  
	}

	function removeRedirects(x) {	
		if(x == linearValue) {
			removeLvlAmount = currentChoices[0][0][1]; 
		} 
		// console.log('removeLvlAmount: ' + removeLvlAmount);
		// console.log('currentArrayLvl before splice: ') 
		// console.log(currentArrayLvl);
		currentArrayLvl.splice(currentArrayLvl.length - removeLvlAmount); 
		// console.log('currentArrayLvl after splice: ') 
		// console.log(currentArrayLvl);
	}

	function getCurrentChoiceResponse() {
		//get lvl value
		getLevel();
		//get currentChoiceLvl value
		getCurrentChoiceLvl();
		//set whole choice, responses to temp variable. 
		currentChoices = choice;
		currentResponses = responses2;  
		currentResponse = '';
		//get choice/response from identified path 
		for(i = 0; i < currentArrayLvl.length; i++) {
			currentChoices = currentChoices[currentArrayLvl[i]]; 
			currentResponses = currentResponses[currentArrayLvl[i]];
		}
		currentResponse = currentResponses[0];  
	} 

	function getCurrentLinearChoiceResponse() {
		//get lvl value
		getLevel();
		//get currentChoiceLvl value
		getCurrentChoiceLvl();
		//set whole choice, responses to temp variable. 
		currentChoices = choice;
		currentResponses = responses2;  
		currentResponse = '';
		//get choice/response from identified path 
		for(i = 0; i < currentArrayLvl.length; i++) {
			currentChoices = currentChoices[currentArrayLvl[i]]; 
			currentResponses = currentResponses[currentArrayLvl[i]];
		}
		currentResponse = currentResponses[0];  
	}

	function checkLevel() {

		var lvlItems = [];
		var i = 0;
		var lvlOnStyles = {
						background: 'white',
						color: '#fd7fe7'

						};
		var lvlOffStyles = {
							background: '#fd7fe7',
							color: 'white'
						};

		var lvlInfo = $('.lvlItem').each(function(){
			i++;
			lvlItems[i] = this; 
		});

		for(i = 1; i < lvlItems.length; i++) {
			if(i == lvlNum) {
				$(lvlItems[i]).css(lvlOnStyles); 
			} else {
				$(lvlItems[i]).css(lvlOffStyles); 
			}
		} 
		//lvlNum reset back to  
	}

	function checkMusic() {
		artistName.innerHTML = musicArtistName; 
		songName.innerHTML = musicSongName; 
		musicSource.src = 'assets/' + musicFilename; 
		audio.load();
		audio.addEventListener('ended', function(){
			this.currentTime = 0;
			this.play(); 
			console.log('ended song')
		}, false);
		audio.play();


	}


	function setLevel() {
		console.log('currentArrayLvl.length');
		console.log(currentArrayLvl.length);

		//scrollDialogue

		getLevel();
		getCurrentChoiceLvl();

		// ***** Current Choice -------- begin
		currentChoice = currentChoices[0][currentChoiceLvl]; 
		currentChoices = currentChoices[currentArrayLvl[lvl]]; 
		dialogue.insertAdjacentHTML(be, frontWrapUser + currentChoice + endWrapUser); 
		previousLvlNum = lvlNum; 
		checkScene();

		// ***** Current Choice -------- end

		// ***** Redirect -------------- begin

		if(currentChoices[0][0][0] == "@") { 
			
			if(currentChoices[0][0][1] == "@") {
				// Parrallel Redirect 
				// console.log('@@ found!'); 
				getRedirects(parallelValue);  //gets array of choice
				removeRedirects(parallelValue); //removes array 
				// console.log('redirectChoiceChars before addRedirects(): '); 
				// console.log(redirectChoiceChars); 
				addRedirects(); 
				// console.log('currentArrayLvl after addRedirects(); : ');
				// console.log(currentArrayLvl);
				getCurrentChoiceResponse(); 

			} else { 
				// Linear Redirect 
				// console.log('@ found!'); 
				// console.log('currentArrayLvl before redirects');
				//console.log(currentArrayLvl);
				getRedirects(linearValue);
				//console.log('redirectChoiceChars');
				//console.log(redirectChoiceChars);
				//add redirectChars to the end of currentArrayLvl 
				addRedirects(); 
				//console.log('currentArrayLvl after redirects');
				//console.log(currentArrayLvl);
				getCurrentLinearChoiceResponse(); 
				//console.log('currentChoices');
				//console.log(currentChoices);  
			}	

		} else if (currentChoices[0][0][0] == "#") {
			//Lose outcome 
			//console.log('found #');
			//console.log(currentResponses);
			loseResponse = currentResponses[currentArrayLvl[lvl]][0]; 
			loseDialogue.innerHTML = '';
			loseDialogue.insertAdjacentHTML(be, frontWrapConsole + loseResponse + endWrapConsole);
			screenSlide = true;
			removeRedirects(linearValue); 
			gameScreen.css('display', 'none');
			loseScreen.css('display', 'block');
			getCurrentChoiceResponse();  
			//clearDialogue 
			dialogue.innerHTML = ''; 
			//get redirected response 
			dialogue.insertAdjacentHTML(be, frontWrapConsole + currentResponse + endWrapConsole);
			lvlNum = previousLvlNum;
			checkScene();
			audio.pause();
		} else {
			currentResponse = currentResponses[currentChoiceLvl + 1][0]; 
			currentResponses = currentResponses[currentArrayLvl[lvl]]; 
		} 

		// ***** Redirect -------------- end
		
		//print current response
		if(!screenSlide) dialogue.insertAdjacentHTML(be, frontWrapConsole + currentResponse + endWrapConsole);

		//sets choices from currentChoices array at index 0 
		setChoice();

		//reset redirectChoiceChars 
		redirectChoiceChars = []; 

	}

	// ************************* GAME ENGINE *********************** ENDS

	$(document).keydown(function(e) {
		if(!screenSlide) {
			if(button1Pressed) {
				currentArrayLvl.push("1"); 
			}
			if(button2Pressed ) {
				currentArrayLvl.push("2");	
			}
			if(button3Pressed) {
				currentArrayLvl.push("3");
			}
			if (button1Pressed || button2Pressed || button3Pressed ) {
				setLevel(); 
				shiftNoise();
			}			
		}

		if(screenSlide){
			if(startButtonPressed) {
				screenSlide = false;
				audio.play();
				gameScreen.css('display', 'block');
				loseScreen.css('display', 'none');
			}
		}

		//checkLevel();

		var screenHeight = dialogue.scrollHeight; 
		$("#screen").animate({scrollTop:screenHeight}, '1000', 'swing', function() { 
		   console.log('scrolled');
		});
	});
	
});




















