import * as THREE from "three";

const imagURLArray = [
  "/public/one.png",
  "/public/two.png",
  "/public/three.png",
  "/public/four.png",
  "/public/five.png",
  "/public/six.png",
];
let cubeMaterials = [];
const backgroundColor = new THREE.Color("rgb(28, 39, 59)");
const d6CubeColor = new THREE.Color("rgb(237, 229, 203)");

const scene = new THREE.Scene();

scene.background = backgroundColor;
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);
const params = {
  segments: 50,
  edgeRadius: 0.07,
};
const geometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  params.segments,
  params.segments,
  params.segments
);
// const material = new THREE.MeshBasicMaterial(d6CubeColor);

console.log("some words for test");

const textureLoader = new THREE.TextureLoader();
for (let index = 0; index < 6; index++) {
  cubeMaterials.push(
    new THREE.MeshBasicMaterial({
      map: textureLoader.load(imagURLArray[index]),
      color: d6CubeColor,
    })
  );
}

const cube = new THREE.Mesh(geometry, cubeMaterials);
scene.add(cube);

camera.position.z = 5;

function animate() {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
