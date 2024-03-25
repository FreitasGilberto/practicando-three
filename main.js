import * as THREE from "three";

// The default rotation unit in Three.js is _____.
//

function init() {
  var scene = new THREE.Scene();

  var box = getBox(1, 1, 1);
  var plane = getPlane(4);

  // At the bare minimum you need to have a scene and a camera to render a three.js scene

  box.position.y = box.geometry.parameters.height / 2;

  // Radians is the default unit for rotation in Three.js.

  plane.rotation.x = Math.PI / 2;

  scene.add(box);

  scene.add(plane);

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
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("webgl").appendChild(renderer.domElement);
  update(renderer, scene, camera);
}

function getBox(w, h, d) {
  var geometry = new THREE.BoxGeometry(w, h, d);
  var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  });

  // You need to provide a mesh with a geometry and a material to define it.

  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function getPlane(size) {
  var geometry = new THREE.PlaneGeometry(size, size);
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
  });

  var mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function update(renderer, scene, camera) {
  renderer.render(scene, camera);
  requestAnimationFrame(function () {
    update(renderer, scene, camera);
  });
}

var scene = init();
