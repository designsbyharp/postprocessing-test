import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


const effectComposer = new EffectComposer(renderer);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
effectComposer.setSize(window.innerWidth, window.innerHeight);

const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

const dotScreenPass = new DotScreenPass();
dotScreenPass.enabled = false;
effectComposer.addPass(dotScreenPass)

const glitchPass = new GlitchPass();
glitchPass.enabled = false;
glitchPass.goWild = true;
effectComposer.addPass(glitchPass);

const outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera )
outlinePass.overlayMaterial.blending = THREE.CustomBlending
effectComposer.addPass(outlinePass);

window.addEventListener('resize', () =>
{
    // ...

    // Update effect composer
    effectComposer.setSize(sizes.width, sizes.height)
})



const animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // renderer.render( scene, camera );
    effectComposer.setSize(window.innerWidth, window.innerHeight)

    effectComposer.render();
};

animate();