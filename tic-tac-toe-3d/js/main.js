// MODEL GLOBALS

var board = {};
    board.turn = 'o';
    board.boxes = [null, null, null, null, null, null, null, null, null];
    board.active = true;

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

var getCubes = function () {
    var cubes = [];
    scene.children.forEach(function(item) {
        if(item.name.slice(0, 4) === "cube") {
            cubes.push(item);
        }
    });
    return cubes;
}

// ---------------------------------

var scene = new THREE.Scene();

scene.fog=new THREE.Fog( 0xf7d9aa, 0.015, 160 );
//
var axes = new THREE.AxisHelper(20);
scene.add(axes);

// MODEL
var updateModel = function (model, boxId) {
    var newModel = model;
    // update here
    newModel.boxes[boxId] = newModel.turn;

    if(isWin(newModel)) {
        console.log('Winner: ' + newModel.turn);
    }
    if(newModel.turn === 'x') {
        newModel.turn = 'o';
    } else {
        newModel.turn = 'x';
    }

    return newModel;
}

var isWin = function (model) {

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
        if((topLeft === topMid) && (topMid === topRight)) return true;
    };
    if ((midLeft !== null) && (midMid !== null) && (midRight !== null)) {
        if((midLeft === midMid) && (midMid === midRight)) return true;
    };
    if ((botLeft !== null) && (botMid !== null) && (botRight !== null)) {
        if((botLeft === botMid) && (botMid === botRight)) return true;
    };
    // // VERTICAL
    if ((topLeft !== null) && (midLeft !== null) && (botLeft !== null)) {
        if((topLeft === midLeft) && (midLeft === botLeft)) return true;
    };
    if ((topMid!== null) && (midMid!== null) && (botMid!== null)) {
        if((topMid=== midMid) && (midMid=== botMid)) return true;
    };
    if ((topRight !== null) && (midRight !== null) && (botRight !== null)) {
        if((topRight === midRight) && (midRight === botRight)) return true;
    };
    // // CROSS
    if ((topLeft !== null) && (midMid !== null) && (botRight !== null)) {
        if((topLeft === midMid) && (midMid === botRight)) return true;
    };
    if ((topRight !== null) && (midMid !== null) && (botLeft !== null)) {
        if((topRight === midMid) && (midMid === botLeft)) return true;
    };

    return false;
}

// RENDER

var addCamera = function () {
    SCENE.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
    SCENE.camera.position.x = -30;
    SCENE.camera.position.y = 60;
    SCENE.camera.position.z = 30;
    SCENE.camera.lookAt(scene.position);
}

var addRenderer = function () {
    SCENE.renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    SCENE.renderer.setSize(window.innerWidth, window.innerHeight);
    SCENE.renderer.shadowMap.enabled = true;
}

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

var addSea = function () {
}

var addCube = function (w, h) {
    var cubeGeo = new THREE.BoxGeometry(5, 5, 5);
    var cubeMat = new THREE.MeshLambertMaterial({color: color.red});
    OBJ.cube = new THREE.Mesh(cubeGeo, cubeMat);
    OBJ.cube.castShadow = true;
    OBJ.cube.position.x = -13 + (h * 8);
    OBJ.cube.position.y = 10;
    OBJ.cube.position.z = -4.5 + (w * 8);
    OBJ.cube.name = 'cube-' + (scene.children.length - 3);
    scene.add(OBJ.cube);
};

var addRow = function (h) {
    for (var w = 0; w < 3; w += 1) {
        addCube(w, h);
    }
}

var addGrid = function () {
    for (var h = 0; h < 3; h += 1) {
        addRow(h);
    }
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
    //in the loop function
        // this function will check all scene objects
        // if it is matched with a value then it will rotate

    // if supposed to be rotating
    // then
        // += the property
    // else
        // = set the property

    if(object.name.slice(0, 4) === "cube") {
        var cubeId = object.name.slice(5, object.name.length);
        var cubeData = model.boxes[cubeId];
        if(cubeData !== null) {
            object.rotation.x += 0.02 * Math.random();
            object.rotation.z += 0.02 * Math.random();
        } else {

        }

    }

}

var animateObjects = function (objects, model, callback) {
    objects.forEach(function(object) {
        callback(model, object);
    })
}

var updateRender = function (model) {

    //get cubes from scene childeren
    //update attributes based on model
    // cell array
    scene.children.forEach(function(object) {
        if(object.name.slice(0, 4) === "cube") {
            // add a color to the cube if there is one in the model
            // if there isnt leave it alone
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
    })
}

// EVENTS --------------------

var clickHandler = function (evt) {

    // 1. First, a vector is created based on the position that
    // we've clicked on, on the screen.
    // 2. Next, with the unprojectVector function we convert the
    //clicked position on the screen, to coordinates in our Three.js scene.
    // 3. Next, we use a THREE.Raycaster object to send out a ray
    // into the world from the position we've clicked on, on the screen.

    var vector = new THREE.Vector3(
        (event.clientX / window.innerWidth ) * 2 - 1,
       -(event.clientY / window.innerHeight ) * 2 + 1, 0.5);

    vector = vector.unproject(SCENE.camera);

    var raycaster = new THREE.Raycaster(SCENE.camera.position,
    vector.sub(SCENE.camera.position).normalize());

    var intersects = raycaster.intersectObjects(getCubes());
    var selectedCubeId = intersects[0].object.name.slice(5, 6);
    if(intersects[0]) console.log(selectedCubeId);
    var selectedObject = intersects[0].object;
    var newModel = updateModel(board, selectedCubeId);
    console.log(newModel);
    updateRender(newModel);

    // updateModel(model, selectedObjectNumber);
        // returns newModel

    // updateRender(model)
            // render -> cells
            // render -> current turn
            // render -> win

};

var loop = function () {
    OBJ.cube.rotation.x += controls.rotationSpeed;
    OBJ.cube.rotation.z += controls.rotationSpeed;
    OBJ.cube.position.x += controls.rotationSpeed;
    SCENE.camera.position.x = controls.camX;
    SCENE.camera.position.y = controls.camY;
    SCENE.camera.position.z = controls.camZ;
    animateObjects(scene.children, board, rotateCube);
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
}


renderScene();

document.getElementById('gameWrapper').appendChild(SCENE.renderer.domElement);
document.addEventListener('mousedown', clickHandler, false);
