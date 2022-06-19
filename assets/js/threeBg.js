import * as THREE from "three";

//Get Images
import bg1 from "../images/0.jpg"
import bg2 from "../images/121.jpg"
import bg3 from "../images/137.jpg"
import bg4 from "../images/3.jpg"
import bg5 from "../images/34.jpg"

const container = document.querySelector(".three__bg");
const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGL1Renderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);

//Responsive
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

const geometry = new THREE.PlaneGeometry(15, 8, 15, 9);
const material = new THREE.MeshBasicMaterial({
    map:loader.load(bg5),
    // wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
camera.position.z = 5;


const count = geometry.attributes.position.count;

const clock = new THREE.Clock();

function animate() {
    const time = clock.getElapsedTime();

    for(let i=0; i<count; i++){
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);


        const anim1 =  0.2 * Math.sin(x + 1 * time);
        const anim2 =  0.2 * Math.sin(y + 1 * time);

        geometry.attributes.position.setZ(i, anim1 + anim2);
        geometry.computeVertexNormals();
        geometry.attributes.position.needsUpdate = true;
    }

    requestAnimationFrame(animate);
    renderer.render(scene, camera)
}


animate();