import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// const container1 = document.querySelector('.enter')

function setupScene(sceneWidth, sceneHeight, backgroundColor, mouseDrag, cameraPosition, container) {
    const scene = new THREE.Scene();

    const aspectRatio = sceneWidth / sceneHeight;

    const camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = mouseDrag;

    renderer.setSize(sceneWidth, sceneHeight);
    container.appendChild(renderer.domElement);

    camera.position.z = cameraPosition.z;
    camera.position.y = cameraPosition.y;
    camera.position.x = cameraPosition.x;

    scene.background = new THREE.Color(backgroundColor);

    // const axesHelper = new THREE.AxesHelper( 180 );
    // scene.add( axesHelper );

    window.addEventListener('resize', () => {
        const newWidth = container.offsetWidth;
        const newHeight = container.offsetHeight;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
    });

    return { scene, camera, renderer, controls };
}

function loadModel(scene, pathToObj, modelColor, objectPosition, objectRotation) {
    const loader = new OBJLoader();
    loader.load(pathToObj, function (object) {
        const colorMaterial = new THREE.MeshPhongMaterial({ color: modelColor });
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

function setupMouseMove(scene, dragSpeed, rotationAngles) {
    let previousMouseX = 0;

    document.addEventListener('mousemove', (event) => {
        const mouseX = event.clientX;

        if (previousMouseX !== 0) {
            const deltaX = mouseX - previousMouseX;
            scene.rotation.y += deltaX * dragSpeed;

            if (scene.rotation.y > rotationAngles.right) {
                scene.rotation.y = rotationAngles.right;
            } else if (scene.rotation.y < rotationAngles.left) {
                scene.rotation.y = rotationAngles.left;
            }
        }

        previousMouseX = mouseX;
    });
}

function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); 
    scene.add(ambientLight);

    const directionalLightRT = new THREE.DirectionalLight(0xffffff, 2);
    directionalLightRT.position.set(0.1, 0.7, -1.5); 
    const directionalLightRB = new THREE.DirectionalLight(0xffffff, 2);
    directionalLightRB.position.set(-1.5, 0.7, -1.7);
    const directionalLightLT = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLightLT.position.set(0.1, -1, -0.4); 
    const directionalLightLB = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLightLB.position.set(-0.1, -1, -0.4);
 
    scene.add(directionalLightRT);
    scene.add(directionalLightRB);
    scene.add(directionalLightLT);
    scene.add(directionalLightLB);

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
        container = document.querySelector('body'),
        sceneWidth = container.offsetWidth,
        sceneHeight = container.offsetHeight,
        backgroundColor = '#2f3035',
        rotationAngles = {
            left: -Math.PI / 6,
            right: Math.PI / 6
        },
        modelColor = 0xFFFFFF,
        objectPosition = { 
            x: 0, 
            y: 0, 
            z: 0 
        },
        objectRotation = { 
            x: -0.349066, 
            y: 1.029744, 
            z: 3.8571776 
        },
        mouseDrag = true,
        dragSpeed = 0.0006,
        autoSpeed = 0,
        cameraPosition = {
            x: 100,
            y: 120,
            z: 300
        },
        pathToObj = '/globus/Severin earth model (1) (1).obj'
    } = options;

    const { scene, camera, renderer, controls } = setupScene(sceneWidth, sceneHeight, backgroundColor, mouseDrag, cameraPosition, container);
    loadModel(scene, pathToObj, modelColor, objectPosition, objectRotation);
    setupMouseMove(scene, dragSpeed, rotationAngles);
    addLights(scene);
    animateScene(scene, autoSpeed, controls, camera, renderer);
}

globeDraw();
