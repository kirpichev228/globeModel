import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function setupScene(sceneWidth, sceneHeight, backgroundColor, mouseDrag, zoom) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, sceneWidth / sceneHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = mouseDrag;

    renderer.setSize(sceneWidth, sceneHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = zoom;
    scene.background = new THREE.Color(backgroundColor);

    return { scene, camera, renderer, controls };
}

function loadModel(scene, pathToObj, modelColor, objectPosition, objectRotation) {
    const loader = new OBJLoader();
    loader.load(pathToObj, function (object) {
        const colorMaterial = new THREE.MeshBasicMaterial({ color: modelColor });
        object.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material = colorMaterial;
            }
        });

        object.position.set(objectPosition.x, objectPosition.y, objectPosition.z);
        object.rotation.set(objectRotation.x, objectRotation.y, objectRotation.z);
        scene.add(object);
    });
}

function setupMouseMove(scene, dragSpeed) {
    let previousMouseX = 0;

    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;

        if (previousMouseX !== 0) {
            const deltaX = mouseX - previousMouseX;
            scene.rotation.y += deltaX * dragSpeed;
        }

        previousMouseX = mouseX;
    });
}

function animateScene(scene, rotationSpeed, controls, camera, renderer) {
    function animate() {
        requestAnimationFrame(animate);
        scene.rotation.y += rotationSpeed;
        renderer.render(scene, camera);
        controls.update();
    }

    animate();
}

export function globeDraw(options = {}) {
    const {
        sceneWidth = window.innerWidth,
        sceneHeight = window.innerHeight,
        backgroundColor = '#2f3035',
        modelColor = 0xFFFFFF,
        objectPosition = { x: 0, y: 0, z: 0 },
        objectRotation = { x: Math.PI * 1.3, y: Math.PI / 1.8, z: 0 },
        mouseDrag = false,
        dragSpeed = 0.001,
        autoSpeed = 0,
        zoom = 180,
        pathToObj = '/globus/Severin earth model (1) (1).obj'
    } = options;

    const { scene, camera, renderer, controls } = setupScene(sceneWidth, sceneHeight, backgroundColor, mouseDrag, zoom);
    loadModel(scene, pathToObj, modelColor, objectPosition, objectRotation);
    setupMouseMove(scene, dragSpeed);
    animateScene(scene, autoSpeed, controls, camera, renderer);
}

globeDraw();
