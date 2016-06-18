
var socket = io();

const ArrforEachProto = Array.prototype.forEach;
const createNode = document.createElement;
const gameWrapper = document.getElementById('gameWrapper');



// -----------------------------------------------------------------------------
// *****************************************************************************
// MODEL ***********************************************************************
// *****************************************************************************
// -----------------------------------------------------------------------------

const playerO = 'o'
const playerX = 'x'

// board constructor
const createBoard = (dimension) => {
  return {
    turn        : playerO,
    boxes       : (new Array(9)).fill(null),
    active      : true,
    cutscene    : false,
    end         : false,
    winPos      : [],
    gameID      : '',
    gameType    : '',
    gameDim     : dimension,
    games       : [],
    opponentID  : null,
    clientID    : null
  }
}

const board = createBoard();

const resetModel = (model) => {
    model = createBoard()
}

const resetBoxes = (model) => {
    model.boxes = (new Array(9).fill(null));
    return model.boxes;
}

const updateModel = (model, boxId) => {
    var model = model

    //if multiplayer without another player
    if (model.gameType === "multi" && model.opponentID === null) {
        return model
    }

    // Ignore if box already clicked or game not active
    if (model.boxes[boxId] !== null || !model.active) {
      return model
    }

    // updateModel: box
    model.boxes[boxId] = model.turn;

    // ifGameOver deactivate model
    if ( isWin(model).state === 'draw' ) {
        model.active = false
        // reset2DModel(model)
        return model
    }

    // win condition
    if ( isWin(model).state === 'win' ) {
        model.active = false
        socket.emit('game:state', model.active);
        model.winPos = isWin(model).winPositions
        model.cutscene = 'sink'
        // reset2DModel(model);
        return model
    }

    // updateModel: turn
    if( model.turn === playerX ) {
        model.turn = playerO
    } else {
        model.turn = playerX
    }

    return model;
}

const isWin = (model) => {
    var drawCounter = 0;
    var topLeft = model.boxes[0];
    var topMid = model.boxes[1];
    var topRight = model.boxes[2];
    var midLeft = model.boxes[3];
    var midMid = model.boxes[4];
    var midRight = model.boxes[5];
    var botLeft = model.boxes[6];
    var botMid = model.boxes[7];
    var botRight = model.boxes[8];

    // var winStates = [[0, 1, 2],
    //                  [3, 4, 5],
    //                  [6, 7, 8],
    //                  [0, 3, 6],
    //                  [1, 4, 7],
    //                  [2, 5, 8],
    //                  [0, 4, 8],
    //                  [2, 4, 6]]
    //
    // winStates.forEach(function(state){
    //     // loop through win states
    //     // check to see if the win states are satisified
    //     // append to a counter
    //     state.forEach(function(pos) {
    //         var currentBox = model.boxes[pos];
    //
    //     })
    //
    //     // if its 3 then then a win state has been found
    // })


    if ((topLeft !== null) && (topMid !== null) && (topRight !== null)) {
        if((topLeft === topMid) && (topMid === topRight)) return {state: 'win', winPositions: [0, 1, 2]};
    };
    if ((midLeft !== null) && (midMid !== null) && (midRight !== null)) {
        if((midLeft === midMid) && (midMid === midRight)) return {state: 'win', winPositions: [3, 4, 5]};
    };
    if ((botLeft !== null) && (botMid !== null) && (botRight !== null)) {
        if((botLeft === botMid) && (botMid === botRight)) return {state: 'win', winPositions: [6, 7, 8]};
    };
    // // VERTICAL
    if ((topLeft !== null) && (midLeft !== null) && (botLeft !== null)) {
        if((topLeft === midLeft) && (midLeft === botLeft)) return {state: 'win', winPositions: [0, 3, 6]};
    };
    if ((topMid!== null) && (midMid!== null) && (botMid!== null)) {
        if((topMid=== midMid) && (midMid=== botMid)) return {state: 'win', winPositions: [1, 4, 7]};
    };
    if ((topRight !== null) && (midRight !== null) && (botRight !== null)) {
        if((topRight === midRight) && (midRight === botRight)) return {state: 'win', winPositions: [2, 5, 8]};
    };
    // // CROSS
    if ((topLeft !== null) && (midMid !== null) && (botRight !== null)) {
        if((topLeft === midMid) && (midMid === botRight)) return {state: 'win', winPositions: [0, 4, 8]};
    };
    if ((topRight !== null) && (midMid !== null) && (botLeft !== null)) {
        if((topRight === midMid) && (midMid === botLeft)) return {state: 'win', winPositions: [2, 4, 6]};
    };

    for (var i = 0; i < model.boxes.length; i += 1) {
        if (model.boxes[i] !== null) drawCounter += 1;
        if (drawCounter === (model.boxes.length)) {
            return {state: 'draw', winPositions: [0, 1, 2]};
        }

    }

    return false;
}

// -----------------------------------------------------------------------------
// *****************************************************************************
// 3D GAME *********************************************************************
// *****************************************************************************
// -----------------------------------------------------------------------------

const OBJ = {}
const SCENE = {}
const RENDER = {}
var scene;

const color = {
  red         : 0xf25346,
  white       : 0xd8d0d1,
  brown       : 0x59332e,
  pink        : 0xF5986E,
  brownDark   : 0x23190f,
  blue        : 0x68c3c0,
  green       : 0xBED730,
}

// DEV *************************************************************************

var camControls = new function () {
    this.rotationSpeed = 0
    this.camX = -30
    this.camY = 60
    this.camZ = 30
}

var objControls = new function () {
    // this.scaleX = 1
    // this.scaleY = 1
    // this.scaleZ = 1
    this.positionX = 1
    this.positionY = 1
    this.positionZ = 1

}


const createGUIHelper = () => {

    const gui = new dat.GUI();

    [ [ 'rotationSpeed', 0, 1 ]
    , [ 'camX', -100, 0 ]
    , [ 'camY', 0, 100 ]
    , [ 'camZ', 0, 100 ]
    ]
    .forEach( ([prop, low, high]) => {
        gui.add( camControls, prop, low, high );
    });

    var cube1Folder = gui.addFolder('Cube_1');

    [
    //   [ 'scaleX', 0, 5, .001 ]
    // , [ 'scaleY', 0, 5, .001 ]
    // , [ 'scaleZ', 0, 5, .001 ]
    // ,
      [ 'positionX', -100, 100, .001 ]
    , [ 'positionY', -100, 100, .001 ]
    , [ 'positionZ', -100, 100, .001 ]
    ]
    .forEach( ([prop, low, high]) => {
        cube1Folder.add( objControls, prop, low, high );
    });

};

const devAnimations = () => {

    OBJ.cube.rotation.x += camControls.rotationSpeed;
    OBJ.cube.rotation.z += camControls.rotationSpeed;
    OBJ.cube.position.x += camControls.rotationSpeed;

    SCENE.camera.position.x = camControls.camX;
    SCENE.camera.position.y = camControls.camY;
    SCENE.camera.position.z = camControls.camZ;

    // OBJ.water.scale.x = objControls.scaleX;
    // OBJ.water.scale.y = objControls.scaleY;
    // OBJ.water.scale.z = objControls.scaleZ;

    OBJ.water.position.x = objControls.positionX;
    OBJ.water.position.y = objControls.positionY;
    OBJ.water.position.z = objControls.positionZ;
}

// UTIL ************************************************************************

const getObjectsByName = (sceneObject, name) => {
    return sceneObject.children.filter(item => {
      if (!item.name) { return false }
      return item.name.split('-')[0] === name
    })
}

// ANIMATION MODEL *************************************************************

// updateAnimationModel()
// constantly checking the state of the scene to change the board
// model is thus animation dependent
//  this means something for th

const updateAnimationModel = (model) => {

    var newModel = model;
    var cubeAmount = getObjectsByName(scene, 'cube').length;
    var sinkCounter = 0, riseCounter = 0;


    scene.children.forEach((object) => {
        // cube objects
        if (object.name.slice(0, object.name.indexOf('-')) === 'cube') {
            // if sunk, then turn 'rise' switch on
            if (object.position.y <= -4) {
                sinkCounter += 1;
            }
            // if risen, turn cutscene to false
            if (object.position.y > 10 && model.cutscene !== "sink") {
                riseCounter += 1;
            }
        }
        // other objects to come
    });

    if(sinkCounter === cubeAmount) {
        model.cutscene = 'rise';
        model.boxes = [null, null, null, null, null, null, null, null, null];
    }

    if (riseCounter === cubeAmount) {
        model.cutscene = false;
        if (!model.cutscene && !model.active) {
            socket.emit('game:state', true);
        }
        model.active = true;
    }

    return newModel;
}

// RENDER **********************************************************************

const addCamera = () => {
    SCENE.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 800)
    SCENE.camera.position.x = -30;
    SCENE.camera.position.y = 60;
    SCENE.camera.position.z = 30;
    SCENE.camera.lookAt(scene.position);
};

const addRenderer = () => {
    SCENE.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    SCENE.renderer.setSize(window.innerWidth, window.innerHeight);
    SCENE.renderer.shadowMap.enabled = true;
};

const addPlane = () => {
    var planeGeo = new THREE.PlaneGeometry(50, 50);
    var planeMat = new THREE.MeshLambertMaterial({color: color.blue});
    var plane = new THREE.Mesh(planeGeo, planeMat);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
};

const addGrid3D = () => {
    var cubeId = 0;
    for (var h = 0; h < 3; h += 1) {
        for (var w = 0; w < 3; w += 1) {
            addCube(w, h, cubeId);
            cubeId += 1;
        }
    }
};

const addCube = (w, h, cubeId) => {
    var cubeGeo = new THREE.BoxGeometry(5, 5, 5);
    var cubeMat = new THREE.MeshLambertMaterial({color: color.red});
    OBJ.cube = new THREE.Mesh(cubeGeo, cubeMat);
    OBJ.cube.castShadow = true;
    OBJ.cube.position.x = -13 + (h * 8);
    OBJ.cube.position.y = 10;
    OBJ.cube.position.z = -4.5 + (w * 8);
    OBJ.cube.name = 'cube-' + cubeId;
    scene.add(OBJ.cube);
}

const addLight = () => {
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    scene.add(spotLight);
}

const addGround = () => {
    var geo = new THREE.BoxGeometry(100, 100, 100);
    var mat = new THREE.MeshLambertMaterial({color: color.green});

    OBJ.water = new THREE.Mesh(geo, mat)

    OBJ.water.castShadow = true;

    OBJ.water.position.x = 1.5;
    OBJ.water.position.y = -51;
    OBJ.water.position.z = -7.4;

    scene.add(OBJ.water);
}

const updateColor = (object) => {
    object.material.color = new THREE.Color(color.brown);
};

const rotateCube = (model, object) => {
        var cubeId = object.name.slice(5, object.name.length);
        var cubeData = model.boxes[cubeId];
        if(cubeData !== null) {
            object.rotation.x += 0.01 * Math.random();
            object.rotation.z += 0.01 * Math.random();
            object.rotation.y += 0.01 * Math.random();
        } else {
        }
};

const sinkCube = (model, cube) => {
    if(model.cutscene === 'sink') {
        var winPosArr = model.winPos;
        if(winPosArr.length >= 3) {
            // 1. SINK THE 'NON-WIN' CUBES FIRST
            // if the current cube is not any of the names in the win
            // position than sink the cube
            var matchLength = 0;
            winPosArr.forEach(function(pos) {
                var winCubeName = 'cube-' + pos;
                if(winCubeName !== cube.name) {
                    matchLength += 1;
                }
            });
            // THE 'NON WIN CUBES'
            if(matchLength === winPosArr.length) {
                if (cube.position.y >= -4) {
                    cube.position.y -= 0.1 * Math.random() + 0.1;
                }
            // THE WIN CUBES
            } else {
                // SINK WIN CUBES
                if (cube.position.y >= -4) {
                    cube.position.y -= 0.1 * Math.random();
                }
            }
        }
    }

    // if all cubes are sinked rotate them to the
    // original position
    if (model.cutscene === 'rise') {
        cube.position.y += 0.1 * Math.random();
        cube.rotation.x = 0;
        cube.rotation.z = 0;
        cube.rotation.y = 0;
        cube.material.color = new THREE.Color(color.red);
    }

    if (model.cutscene === false) {

    }
}

const changeCubeColor = (sceneObject, model) => {
    sceneObject.children.forEach(function(object) {
        if(object.name.slice(0, 4) === "cube") {
            var cubeId = object.name.slice(5, object.name.length);
            var cubeData = model.boxes[cubeId];
            if(cubeData !== null) {
                if(cubeData === playerX) {
                    object.material.color = new THREE.Color(color.pink);
                } else {
                    object.material.color = new THREE.Color(color.brown);
                }
            }

        }
    });
};

const animateObjects = (sceneObject, model, callback) => {
    sceneObject.forEach((object) => {
        callback(model, object);
    })
};

const updateAnimation = (model) => {
    var newModel = updateAnimationModel(model);
    animateObjects(getObjectsByName(scene, 'cube'), model, rotateCube);
    animateObjects(getObjectsByName(scene, 'cube'), model, sinkCube);
};

const updateRender3D = (sceneObject, model) => {
    changeCubeColor(sceneObject, model);
}

// EVENTS **********************************************************************

// What we need to do is listen for click events from the DOM version
//

const socketHandler3D = (data) => {

    // origin client event
        // mark x on thing
        // emit x to server

    // server
        // recieve data
        // emit to clients

    // dest client event
        // recieve mark x data
        // mark x on board

    // CASES ----------------------

    // 3d to 2d socket

    // 2 DESKTOP CLIENTS

    // >2 connected client
    var newModel = updateModel(board, data);
    updateRender3D(scene, newModel);
}

const clickHandler3D = (evt) => {
    // vector is created based on the position that
    // we've clicked on, on the screen.

    var vector = new THREE.Vector3(
        (event.clientX / window.innerWidth ) * 2 - 1,
       -(event.clientY / window.innerHeight ) * 2 + 1, 0.5);

    //with the unprojectVector function we convert the
    //clicked position on the screen, to coordinates in our Three.js scene.

    vector = vector.unproject(SCENE.camera);

    //send out a ray into the world from the position we've clicked on,
    //on the screen.

    var raycaster = new THREE.Raycaster(SCENE.camera.position, vector.sub(SCENE.camera.position).normalize());

    // get the clicked object if it is of the type we specify ie. name = 'cube';

    var intersectCube = raycaster.intersectObjects(getObjectsByName(scene, 'cube'));

    // -------------------------------------------------

    // if we clicked on the cube object then;
    var newModel = board;

    var selectedCubeId, selectedObject;

    if (intersectCube.length !== 0) {
        selectedCubeId = intersectCube[0].object.name.slice(5, 6);
        selectedObject = intersectCube[0].object;
        console.log(selectedCubeId);
        newModel = updateModel(board, selectedCubeId);
        socket.emit('game:play', selectedCubeId);
    } else if (false) {
        // if clicked on another element, do something
    } else if (false) {
        // same same
    }
    updateRender3D(scene, newModel);
};

var loop3D = () => {
    devAnimations();
    updateAnimation(board);
    requestAnimationFrame(loop3D);
    SCENE.renderer.render(scene, SCENE.camera);
}

var renderScene3D = () => {
    addLight();
    addCamera();
    addRenderer();
    addPlane();
    addGrid3D();
    addGround();
    loop3D();
    getObjectsByName(scene, 'cube');
}

const init3D = () => {
    gameWrapper.innerHTML = "";
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0xf7d9aa, 0.015, 160 );
    renderScene3D();
    gameWrapper.appendChild(SCENE.renderer.domElement);
    document.addEventListener('mousedown', clickHandler3D, false);
    createGUIHelper();
    socket.on('game:play', (data) => {
        socketHandler3D(data);
    })
}

// -----------------------------------------------------------------------------
// *****************************************************************************
// 2D GAME *********************************************************************
// *****************************************************************************
// -----------------------------------------------------------------------------

const reset2DModel = (model) => {
    // turn        : playerO,
    // boxes       : (new Array(9)).fill(null),
    // active      : true,
    // cutscene    : false,
    // end         : false,
    // winPos      : [],

    // in updateModel()
    // model.cutscene = 'sink'

    // CUTSCENE: model.cutscene = rise
    // RESET MODEL: mode.boxes = reset
    // ACTIVATE: model.cutscene = false

    // GOAL: RESET BOARD

    var newModel = model;
    if (newModel.gameDim === "2d") {
        newModel.turn        = playerO
        newModel.boxes       = (new Array(9)).fill(null)
        newModel.active      = true
        newModel.cutscene    = false
        newModel.end         = false
        newModel.winPos      = []
    }
    return newModel;
}


// RENDER **********************************************************************

const renderState = (model, domNode) => {
    var gameState = document.createElement('div');
        gameStateString = " "
        gameStateString += model.turn
        gameStateString += ', ' + model.active
        gameStateString += ', ' + model.cutscene
        gameStateString += ', ' + model.end
        gameStateString += ', ' + model.winPos
        gameState.innerHTML = gameStateString;
    gameWrapper.appendChild(gameState);
}

const appendChildDiv = (parent, className, htmlContent) => {
    var child = document.createElement('div');
    child.className = className;
    child.innerHTML = htmlContent;
    return parent.appendChild(child);
}

const renderBox = (currentPlay, id, domNode) => {
    var box = document.createElement('div');
    var htmlContent = currentPlay ? currentPlay : "box";
    box.className = "box";
    box.dataset.box = id;
    domNode.appendChild(box);
    appendChildDiv(appendChildDiv(box, 'child', ''), 'innerChild', htmlContent);
}

const render2D = (model, domNode) => {
    var currentPositions = model.boxes;
    domNode.innerHTML = '';
    currentPositions.forEach((currentPlay, index) => {
        renderBox(currentPlay, index, domNode);
    });
    renderState(model, domNode);
}

const addListener = (action, callback) => {
    return (node, i) => {
        node.addEventListener(action, callback);
    }
}

const forEachElementByClass = (className, callback) => {
    var boxNodes = document.getElementsByClassName(className);
    return ArrforEachProto.apply(boxNodes, [callback]);
}

// EVENTS **********************************************************************

const onSink = (model, callback) => {
    if(model.cutscene === 'sink') callback(model);
}

const socketHandler2D = (data, domNode) => {
    var newModel = updateModel(board, data);
    render2D(newModel, domNode);
}

const boxClick = (model, gameNode) => {
    return (event) => {
        var clickedId = event.currentTarget.dataset.box;
        console.log('clicked: ', clickedId);
        console.log('before update model: ', model);
        updateModel(model, clickedId);
        console.log('after update model: ', model);
        render2D(model, gameNode);
        forEachElementByClass('box',
            addListener('click', boxClick(model, gameNode)));
        socket.emit('game:play', clickedId);
        onSink(model, () => {
            console.log('on sink callback ------')
            console.log(reset2DModel(model).boxes);
        });
    }
}

const init2D = (gameID) => {
    gameWrapper.innerHTML = "";
    var game2D = document.createElement('div')
        gameWrapper.appendChild(game2D);
    render2D(board, game2D);
    forEachElementByClass('box', addListener('click', boxClick(board, game2D)));
    socket.on('game:play', (data) => {
        socketHandler2D(data, game2D);
        forEachElementByClass('box',
            addListener('click', boxClick(board, game2D)));
    });
}

// -----------------------------------------------------------------------------
// *****************************************************************************
// HOME ************************************************************************
// *****************************************************************************
// -----------------------------------------------------------------------------

const renderGameTypeScreen = () => {
    gameType = $('<div>');
    gameTypeList = $('<ul>')
    gameType.addClass('gameType');
    gameType.append(gameTypeList);
    gameTypeList.append('<li id="single"> <div> LONESOME </div> </li> ');
    gameTypeList.append('<li id="multi"> <div> COMRADE  </div> </li> ');
    $(gameWrapper).append(gameType);
}

const appendLI = (parent, text, id, className) => {
    var li;
    li = $('<li>');
    li.text(text);
    li.addClass(className);
    li[0].dataset.id = id;
    parent.append(li);
}

const renderGameList = () => {
    var $gameList = $('<div>')
    var $gameListUL = $('<ul>')
    $(gameWrapper).html('')
    $(gameWrapper).append($gameList)
    $gameList.addClass('gameList')
    $($gameList).append($gameListUL)
    $($gameListUL).append('<li id="createGame"> Start your game </li>')
    board.games.forEach((gameId) => {
        appendLI($gameListUL, gameId, gameId, 'openGames');
    });
}

const generateID = () => {
    var gameID = "ID-";
    gameID += Math.round(Math.random() * 128)
    gameID += "-"
    gameID += Math.round(Math.random() * 42123123)
    gameID += "-"
    gameID += new Date().getTime();
    return gameID;
}

const initGame = (gameID) => {
    var windowWidth = $(window).width();
    board.gameID = gameID;
    if(windowWidth <= 800) {
        board.gameDim = '2d';
        init2D();
    } else {
        board.gameDim = '3d';
        init3D();
    }
}

const init = () => {

    board.clientID = socket.id;

    renderGameTypeScreen();

    $(document).on('click', '#single', (e) => {
        board.gameType = "single";
        // INIT game with single player
    });

    $(document).on('click', '#multi', (e) => {
        board.gameType = "multi";
        // render game list screen
        renderGameList();
    });

    $(document).on('click', "#createGame", (e) => {
        // initialise a 3D or 2D game
        socket.emit('connect:host', generateID());
        initGame();
    });

    // JOIN OPEN GAME
    // - join the room with the current ID

    $(document).on('click', ".openGames", (e) => {
        var selectedID = e.target.dataset.id
        socket.emit('connect:join', selectedID);
        initGame(selectedID);
    });

    socket.on('player:host', (data) => {
        console.log('player:host')
        console.log('you have joined: ', data);
        console.log(data)
        board.opponentID = data;
    })

    socket.on('player:joined', (data) => {
        console.log('player:joined')
        console.log('a player has joined your game')
        console.log(data);
        board.opponentID = data;
    })

    // GAME LIST EVENTS


    socket.on('gamelist:added', (data) => {
        console.log('socket - gamelist:added')
        console.log('gamelist:added,', data);
        board.games.push(data);
        console.log(board.games);
    });

    socket.on('gamelist:removed', (data) => {
        console.log('gamelist:removed', data);
        board.games = data;
    })

    socket.on('gamelist:all', (data) => {
        console.log('socket - gamelist:all: ', data);
        board.games = data;
        console.log(board.games);
    });

    socket.on('game:state', (data) => {
        console.log('recieved oponent game state: ', data);
    })
}


// -----------------------------------------------------------------------------
// *****************************************************************************
// INIT ************************************************************************
// *****************************************************************************
// -----------------------------------------------------------------------------
socket.on("connect", () => {
    console.log('you are connected as: ', socket.id);
    board.clientID = socket.id;
    init();

    // DEV STUFF ********************************
    // LAUNCH GAME ON STARTUP
    socket.emit('connect:host', generateID());
    initGame();

})
