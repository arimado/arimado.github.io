// MODEL GLOBALS

var board = {};
    board.turn = 'o';
    board.boxes = [null, null, null, null, null, null, null, null, null];
    board.active = true;
    board.cutscene = false;
    board.end = false;
    board.winPos = [];

// VIEW GLOBALS
var OBJ = {};
var SCENE = {};
var RENDER = {};
var color = {};
    color.red = 0xf25346;
    color.white = 0xd8d0d1;
    color.brown = 0x59332e;
    color.pink = 0xF5986E;
    color.brownDark = 0x23190f;
    color.blue = 0x68c3c0;


// ---------------------------
// DEV ***********************
// ---------------------------

var controls = new function () {
    this.rotationSpeed = 0;
    this.camX = -30;
    this.camY = 60;
    this.camZ = 30;
}

var gui = new dat.GUI();

gui.add(controls, 'rotationSpeed', 0, 1);
gui.add(controls, 'camX', -100, 0);
gui.add(controls, 'camY', 0, 100);
gui.add(controls, 'camZ', 0, 100);

// ---------------------------------

var getObjectsByName = function (sceneObject, name) {
    var objects = [];
    sceneObject.children.forEach(function(item) {
        var slicedName;
        if(item.name) {
            slicedName = item.name.slice(0, item.name.indexOf('-'));
            if(slicedName === name) {
                objects.push(item);
            }
        }
    });
    return objects;
}

// ---------------------------------

// SCENE

var scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xf7d9aa, 0.015, 160 );

// var axes = new THREE.AxisHelper(20);
// scene.add(axes);

// MODEL

var resetModel = function (model) {
    model.turn = 'o';
    model.boxes = [null, null, null, null, null, null, null, null, null];
    model.active = true;
    model.cutscene = false;
    model.end = false;
    model.winPos = [];
}

var updateModel = function (model, boxId) {
    var newModel = model;
    if (newModel.boxes[boxId] === null) {
        if(newModel.active) { // if model active
            // updateModel: box
            newModel.boxes[boxId] = newModel.turn;
            // ifGameOver deactivate model
            if(isWin(newModel).state === 'draw') {
                newModel.active = false;
            }

            // win condition
            if(isWin(newModel).state === 'win') {
                newModel.active = false;
                newModel.winPos = isWin(newModel).winPositions;
                newModel.cutscene = 'sink';
            }
            // updateModel: turn
            if(newModel.turn === 'x') {
                newModel.turn = 'o';
            } else {
                newModel.turn = 'x';
            }
        } else { // if the model has been deactivated
        }
    }

    return newModel;
}

var updateAnimationModel = function (model) {
    // if objects hit certain critiera, then update the model being fed to it

    // constantly listening to scene.children
        // scene.children.forEach();
            // if this - cutscene = 'sink'
            // if that - cutscene = 'rise'
            // if that - cutscene = 'crazy'

    var newModel = model;
    var cubeAmount = getObjectsByName(scene, 'cube').length;
    var sinkCounter = 0, riseCounter = 0;


    scene.children.forEach(function(object){
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
        model.active = true;
    }

    return newModel;
}

var isWin = function (model) {

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

// RENDER

var addCamera = function () {
    SCENE.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    SCENE.camera.position.x = -30;
    SCENE.camera.position.y = 60;
    SCENE.camera.position.z = 30;
    SCENE.camera.lookAt(scene.position);
};

var addRenderer = function () {
    SCENE.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    SCENE.renderer.setSize(window.innerWidth, window.innerHeight);
    SCENE.renderer.shadowMap.enabled = true;
};

var addPlane = function () {
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

var addGrid = function () {
    var cubeId = 0;
    for (var h = 0; h < 3; h += 1) {
        for (var w = 0; w < 3; w += 1) {
            addCube(w, h, cubeId)
            cubeId += 1;
        }
    }
};

var addCube = function (w, h, cubeId) {
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

var addLight = function () {
    var spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set( -40, 60, -10 );
    spotLight.castShadow = true;
    scene.add(spotLight);
}

var updateColor = function (object) {
    object.material.color = new THREE.Color(color.brown);
};

var rotateCube = function (model, object) {
        var cubeId = object.name.slice(5, object.name.length);
        var cubeData = model.boxes[cubeId];
        if(cubeData !== null) {
            object.rotation.x += 0.01 * Math.random();
            object.rotation.z += 0.01 * Math.random();
            object.rotation.y += 0.01 * Math.random();
        } else {
        }
};

var sinkCube = function (model, cube) {
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

var changeCubeColor = function (sceneObject, model) {
    sceneObject.children.forEach(function(object) {
        if(object.name.slice(0, 4) === "cube") {
            var cubeId = object.name.slice(5, object.name.length);
            var cubeData = model.boxes[cubeId];
            if(cubeData !== null) {
                if(cubeData === 'x') {
                    object.material.color = new THREE.Color(color.pink);
                } else {
                    object.material.color = new THREE.Color(color.brown);
                }
            }

        }
    });
};

var animateObjects = function (sceneObject, model, callback) {
    sceneObject.forEach(function(object) {
        callback(model, object);
    })
};


var updateAnimation = function (model) {
    var newModel = updateAnimationModel(model);
    animateObjects(getObjectsByName(scene, 'cube'), model, rotateCube);
    animateObjects(getObjectsByName(scene, 'cube'), model, sinkCube);
};

var updateRender = function (sceneObject, model) {
    changeCubeColor(sceneObject, model);
}

// EVENTS --------------------

var clickHandler = function (evt) {
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
    } else if (false) {
        // if clicked on another element, do something
    } else if (false) {
        // same same
    }
    updateRender(scene, newModel);
};

var loop = function () {
    OBJ.cube.rotation.x += controls.rotationSpeed;
    OBJ.cube.rotation.z += controls.rotationSpeed;
    OBJ.cube.position.x += controls.rotationSpeed;
    SCENE.camera.position.x = controls.camX;
    SCENE.camera.position.y = controls.camY;
    SCENE.camera.position.z = controls.camZ;
    updateAnimation(board);
    requestAnimationFrame(loop);
    SCENE.renderer.render(scene, SCENE.camera);
}

var renderScene = function () {
    addLight();
    addCamera();
    addRenderer();
    addPlane();
    addGrid();
    loop();
    getObjectsByName(scene, 'cube');
}

renderScene();

document.getElementById('gameWrapper').appendChild(SCENE.renderer.domElement);
document.addEventListener('mousedown', clickHandler, false);
