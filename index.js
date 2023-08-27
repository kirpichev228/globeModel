import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function setupScene(sceneWidth, sceneHeight, backgroundColor, mouseDrag, cameraPosition) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, sceneWidth / sceneHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = mouseDrag;

    renderer.setSize(sceneWidth, sceneHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = cameraPosition.z;
    camera.position.y = cameraPosition.y;
    camera.position.x = cameraPosition.x;

    scene.background = new THREE.Color(backgroundColor);

    const axesHelper = new THREE.AxesHelper( 180 );
    scene.add( axesHelper );

    return { scene, camera, renderer, controls };
}

function loadModel(scene, pathToObj, modelColor, objectPosition, objectRotation) {
    const loader = new OBJLoader();
    loader.load(pathToObj, function (object) {
        const colorMaterial = new THREE.MeshStandardMaterial({ color: modelColor });
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

function addLights(scene) {
    // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Ambient light
    // scene.add(ambientLight);

    // const directionalLight = new THREE.DirectionalLight(0xffffff, 50); // Directional light
    // directionalLight.position.set(-30, -30, -300);  // Set the light's position
    // scene.add(directionalLight);
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
        sceneWidth = 600,
        sceneHeight = 724,
        backgroundColor = '#2f3035',
        modelColor = 0x55565b,
        objectPosition = { x: 0, y: 0, z: 0 },
        objectRotation = { x: -0.349066, y: 1.029744, z: 3.8571776 },
        mouseDrag = true,
        dragSpeed = 0.0007,
        autoSpeed = 0,
        cameraPosition = {
            x: 100,
            y: 100,
            z: 165
        },
        pathToObj = '/globus/Severin earth model (1) (1).obj'
    } = options;

    const { scene, camera, renderer, controls } = setupScene(sceneWidth, sceneHeight, backgroundColor, mouseDrag, cameraPosition);
    loadModel(scene, pathToObj, modelColor, objectPosition, objectRotation);
    setupMouseMove(scene, dragSpeed);
    addLights(scene);
    animateScene(scene, autoSpeed, controls, camera, renderer);
}

globeDraw();
