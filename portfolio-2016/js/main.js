if(document.addEventListener)
    document.addEventListener("DOMContentLoaded",gfyCollection.init,false);
else
    document.attachEvent("onreadystatechange",gfyCollection.init);

var stats;
var camera, scene, renderer, group, particle;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var container = document.getElementById('canvasContainer');

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
    camera.position.z = 1000;

    scene = new THREE.Scene();

    var PI2 = Math.PI * 2;
    var program = function ( context ) {

        context.beginPath();
        context.arc( 0, 0, 0.5, 0, PI2, true );
        context.fill();

    };

    group = new THREE.Group();
    group2 = new THREE.Group();

    scene.add( group );
    scene.add ( group2 )


    var addParticlesToGroup = function( group ) {
        for ( var i = 0; i < 500; i++ ) {

            var material = new THREE.SpriteCanvasMaterial( {
                // color: 0x808080,
                color: 0xdf9fb7,
                // color: Math.random() * 0x808008 + 0x808080,
                program: program
            } );

            particle = new THREE.Sprite( material );
            particle.position.x = Math.random() * 2000 - 1000;
            particle.position.y = Math.random() * 2000 - 1000;
            particle.position.z = Math.random() * 1000 - 500;
            particle.scale.x = particle.scale.y = Math.random() * 3 + 1;
            group.add( particle );
        }
    }

    addParticlesToGroup( group );
    addParticlesToGroup( group2 );

    renderer = new THREE.CanvasRenderer({ alpha: true });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 0);
    container.appendChild( renderer.domElement );

    // var canvas = document.getElementsByTagName('canvas')[0];
    // var dataURL = canvas.toDataURL();
    // container.style.background='url('+dataURL+')';

    // stats = new Stats();
    // container.appendChild( stats.dom );

    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );
    window.addEventListener( 'resize', onWindowResize, false );


}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseMove( event ) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length === 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

//

function animate() {

    requestAnimationFrame( animate );

    render();
    // stats.update();

}

function render() {

    // camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    // camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    // camera.lookAt( scene.position );

    // group.rotation.x += 0.01;
    group.rotation.z += 0.0009;
    group2.rotation.z += 0.0007;

    renderer.render( scene, camera );

}

//
//
//
// function pointerLoop() {
//     $('.projectPointer').animate({'top': '10'}, {
//         duration: 700,
//         complete: function() {
//             $('.projectPointer').animate({'top': 0}, {
//                 duration: 700,
//                 complete: pointerLoop});
//         }});
// }
// pointerLoop();
