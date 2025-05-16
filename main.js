function init() {
  if (isMobile()) {
    console.log("Mobile device detected");
    initAR();
  } else {
    notSupported();
  }
}

function initAR() {
  const script = document.createElement("script");
  script.src = "simple-ar.min.js";
  script.onload = () => {
    console.log("simple-ar loaded");
    onWasmLoaded();
    initScene();
  };
  document.body.appendChild(script);
}

function initScene() {
  console.log("Initializing A-Frame scene");

  const scene = document.createElement("a-scene");
  document.body.appendChild(scene);

  const entity = document.createElement("a-entity");
  entity.setAttribute(
    "simple-ar",
    "src: target.jpg; minCutOffValue: 1; betaValue:0.1; dCutOffValue: 0.001;"
  );
  scene.appendChild(entity);

  const model = document.createElement("a-entity");
  model.setAttribute("id", "detection-model");
  model.setAttribute("fbx-model", "model.fbx");
  model.setAttribute("rotation", "0 90 90");
  model.setAttribute("scale", "10 10 10");
  entity.appendChild(model);

  const camera = document.createElement("a-camera");
  camera.setAttribute("position", "0 0 0");
  camera.setAttribute("look-controls", "enabled: false;");
  scene.appendChild(camera);
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function notSupported() {
  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.top = "50%";
  div.style.transform = "translate(-50%, -50%)";
  div.style.left = "50%";
  div.style.textAlign = "center";
  div.style.fontFamily = "Arial, sans-serif";
  div.style.color = "#333";
  div.style.fontSize = "24px";
  div.innerHTML =
    "This feature is not supported on desktop. Please use a mobile device.";

  document.body.style.backgroundColor = "#fff";
  document.body.appendChild(div);
}

init();