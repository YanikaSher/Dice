import * as THREE from "three";
import { getDiceRandomValue } from "./randomValues";

const div = document.querySelector(".section-one");
const imagURLArray = [
  "/one.png",
  "/two.png",
  "/three.png",
  "/four.png",
  "/five.png",
  "/six.png",
];
const cubeSizes = {
  width: div.clientWidth,
  height: div.clientHeight,
};

let cubeMaterials = [];
const backgroundColor = new THREE.Color("rgb(28, 39, 59)");
const d6CubeColor = new THREE.Color("rgb(237, 229, 203)");

const scene = new THREE.Scene();

scene.background = backgroundColor;
const camera = new THREE.PerspectiveCamera(
  75,
  cubeSizes.width / cubeSizes.height,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(cubeSizes.width, cubeSizes.height);

div.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

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

function rotationAnimation() {
  console.log("first");
  cube.rotation.x = cube.rotation.x + 0.1;
  cube.rotation.y = cube.rotation.y + 0.1;
  cube.rotation.z = cube.rotation.z + 0.1;
  setTimeout(() => {
    console.log("second");

    cube.rotation.x = Math.PI;
    cube.rotation.y = Math.PI / 2;
    cube.rotation.z = Math.PI / 1.1;

  }, 2000);
  renderer.render(scene, camera);
}
const exesHelper = new THREE.AxesHelper(5);
scene.add(exesHelper);

function animate() {
  cube.rotation.x = Math.PI / 2;
  cube.rotation.y = Math.PI;
  cube.rotation.z = Math.PI / 1.1;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

div.addEventListener("click", (event) => {
  renderer.setAnimationLoop(rotationAnimation);
});

window.addEventListener("resize", () => {
  cubeSizes.width = div.clientWidth;
  cubeSizes.height = div.clientHeight;
  camera.aspect = cubeSizes.width / cubeSizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(cubeSizes.width, cubeSizes.height);
  renderer.render(scene, camera);
});
