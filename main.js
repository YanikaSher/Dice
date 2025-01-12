import * as THREE from "three";
import { getDiceRandomValue, convertRandomValue } from "./randomValues";

const diceSection = document.querySelector(".section-one");
const diceOutput = document.querySelector(".dice-output");
const imagURLArray = [
  "/one.png",
  "/two.png",
  "/three.png",
  "/four.png",
  "/five.png",
  "/six.png",
];
const cubeSizes = {
  width: diceSection.clientWidth,
  height: diceSection.clientHeight,
};

let cubeMaterials = [];

const diceState = diceSection.getAttribute("data-state");
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

diceSection.appendChild(renderer.domElement);

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
camera.position.y = 0.8;
camera.position.x = -0.1;
camera.rotation.z = 8 * THREE.MathUtils.DEG2RAD;

const exesHelper = new THREE.AxesHelper(5);
scene.add(exesHelper);

function animate() {
  const currentDiceState = diceSection.getAttribute("data-state");
  if (currentDiceState === "rotation") {
    cube.rotation.x += Math.PI / 28;
    cube.rotation.y += Math.PI / 28;
    cube.rotation.z += Math.PI / 28;
    if (cube.rotation.x >= Math.PI * 4) {
      diceSection.setAttribute("data-state", "stop");
    }
  }

  if (currentDiceState === "default") {
    cube.rotation.x = 0;
    cube.rotation.y = 0;
    cube.rotation.z = 0;
  }
  if (currentDiceState === "stop") {
    const randomValue = diceSection.getAttribute("data-value");
    const randomValueObj = convertRandomValue(Number(randomValue));
    if (cube.rotation.x >= randomValueObj.x) {
      cube.rotation.x -= Math.PI / 32;
    }
    if (cube.rotation.y >= randomValueObj.y) {
      cube.rotation.y -= Math.PI / 32;
    }
    if (cube.rotation.z >= randomValueObj.z) {
      cube.rotation.z -= Math.PI / 32;
    }
    if (
      (cube.rotation.z < randomValueObj.z) |
      (cube.rotation.y < randomValueObj.y) |
      (cube.rotation.x < randomValueObj.x)
    ) {
      const output = diceSection.getAttribute("data-value");
      diceOutput.textContent = `Output: ${output}`;
    }
  }

  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  cubeSizes.width = diceSection.clientWidth;
  cubeSizes.height = diceSection.clientHeight;
  camera.aspect = cubeSizes.width / cubeSizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(cubeSizes.width, cubeSizes.height);
  renderer.render(scene, camera);
});

diceSection.addEventListener("click", () => {
  if (diceState !== "rotation") {
    diceSection.setAttribute("data-state", "rotation");
    diceSection.setAttribute("data-value", `${getDiceRandomValue()}`);
  }
});
