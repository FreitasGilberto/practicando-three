import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// The default rotation unit in Three.js is _____.
// You establish a parent-child relationship by adding an object to another object.

function init() {
  var scene = new THREE.Scene();

  var gui = new dat.GUI();

  var enableFog = false;

  if (enableFog) {
    scene.fog = new THREE.FogExp2(0xffffff, 0.2);
  }

  var box = getBox(1, 1, 1);
  var plane = getPlane(20);
  var pointLight = getPointLight(1);
  var sphere = getSphere(0.05);

  plane.name = "plane-1";

  // At the bare minimum you need to have a scene and a camera to render a three.js scene

  box.position.y = box.geometry.parameters.height / 2;

  // Radians is the default unit for rotation in Three.js.

  plane.rotation.x = Math.PI / 2;
  pointLight.position.y = 2;
  pointLight.intensity = 2;
  gui.add(pointLight, "intensity", 0, 10);
  gui.add(pointLight.position, "y", 0, 5);

  scene.add(box);
  scene.add(plane);
  pointLight.add(sphere);
  scene.add(pointLight);

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.x = 1;
  camera.position.y = 2;
  camera.position.z = 5;

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  //WebGL is a low level JavaScript API. it doesn’t have as many abstractions as Three.js. It is more verbose and harder to use.

  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor("rgb(120, 120, 120)");
  document.getElementById("webgl").appendChild(renderer.domElement);

  var controls = new OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls);
}

function getBox(w, h, d) {
  var geometry = new THREE.BoxGeometry(w, h, d);
  var material = new THREE.MeshPhongMaterial({
    color: "rgb(120, 120, 120)",
  });

  // You need to provide a mesh with a geometry and a material to define it.

  var mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  return mesh;
}

function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size, size);
  var material = new THREE.MeshPhongMaterial({
    color: "rgb(120, 120, 120)",
    side: THREE.DoubleSide,
  });

  var mesh = new THREE.Mesh(geometry, material);

  mesh.receiveShadow = true;

  return mesh;
}

function getSphere(size) {
  var geometry = new THREE.SphereGeometry(size, 24, 24);
  var material = new THREE.MeshBasicMaterial({
    color: "rgb(250, 250, 250)",
  });

  // You need to provide a mesh with a geometry and a material to define it.

  var mesh = new THREE.Mesh(geometry, material);

  return mesh;
}

function getPointLight(intensity) {
  var light = new THREE.PointLight(0xffffff, intensity);
  light.castShadow = true;

  return light;
}

function update(renderer, scene, camera, controls) {
  renderer.render(scene, camera);
  controls.update();

  // Using the requestAnimationFrame function we are able to do continuous rendering in Three.js

  requestAnimationFrame(function () {
    update(renderer, scene, camera, controls);
  });
}

init();
