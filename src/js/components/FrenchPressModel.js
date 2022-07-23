import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import loadModel from "../helpers/model-loader.js";
import coffeeMakerModel from "url:../../assets/french-press.glb";
import hdr from "url:../../assets/studio_small_08_1k.hdr";
// import { PCFShadowMap } from "three";

export default function FrenchPressModel() {
  this.vp = {
    width: window.innerWidth,
    height: window.innerHeight,
    dpr: Math.min(devicePixelRatio, 2 || 1),
  };

  this.setup = async function () {
    this.createScene();
    await this.createFrenchPress();
    this.createPlanes();
    this.addLights();

    this.camera.position.set(0, 0, 10);
    this.scene.background = new THREE.Color("#CECECE");

    window.addEventListener("resize", this.resize);
    this.render();
    
    // remove loader
    const $loader = document.querySelector(".loader");
    if($loader.classList.contains('show')){
      $loader.classList.remove('show');
    }
  };

  this.createFrenchPress = async function () {
    this.hdrEquirect = await this.hdrMap();
    this.model = await this.createModel();
    this.group = new THREE.Group();

    this.support =
      this.model.children[0].children[0].children[0].children[0].children[0].children[0].children[0];
    this.support.material = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 1,
      roughness: 0,
      envMap: this.hdrEquirect,
      envMapIntensity: 0.75,
    });
    this.support.castShadow = true;
    this.support.receiveShadow = true;
    this.group.add(this.support);

    this.filter =
      this.model.children[0].children[1].children[0].children[0].children[0].children[0].children[0].children[0];
    this.filter.material = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 1,
      roughness: 0,
      envMap: this.hdrEquirect,
      envMapIntensity: 1,
    });
    this.filter.castShadow = true;
    this.filter.receiveShadow = true;
    this.group.add(this.filter);

    this.glass =
      this.model.children[0].children[2].children[0].children[0].children[0].children[0].children[0];
    this.glass.material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0,
      ior: 1.5,
      thickness: 0.125,
      envMap: this.hdrEquirect,
      envMapIntensity: 1,
      transmission: 1,
      specularIntensity: 2,
      specularColor: 0xffffff,
      opacity: 1,
      side: THREE.DoubleSide,
      transparent: true,
    });
    //
    this.glass.castShadow = true;
    this.glass.receiveShadow = true;
    this.group.add(this.glass);

    this.cover =
      this.model.children[0].children[3].children[0].children[0].children[0].children[0].children[0];
    this.cover.material = new THREE.MeshStandardMaterial({
      color: 0x6f6f6f,
      metalness: 1,
      roughness: 0,
      envMap: this.hdrEquirect,
      envMapIntensity: 0.5,
    });
    this.cover.castShadow = true;
    this.cover.receiveShadow = true;
    this.group.add(this.cover);

    //
    this.group.position.y = -2;
    this.group.scale.set(0.09, 0.09, 0.09);
    this.group.rotation.y = Math.PI / -3;

    this.scene.add(this.group);
    this.scene.rotation.z = Math.PI / 8;
    this.scene.position.set(0.75, 0, 0);
  };

  this.createPlanes = function () {
    //PLANE
    this.planeGeo = new THREE.CircleGeometry(2.5, 50);
    this.planeMat = new THREE.MeshStandardMaterial({
      color: 0xcecece,
      roughness: 0.1,
      metalness: 0,
    });
    this.plane = new THREE.Mesh(this.planeGeo, this.planeMat);
    this.plane.rotation.x = -Math.PI / 2;
    // plane.quaternion.z = Math.PI / 8;
    this.plane.position.y = -2.1;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);

    //PLANE
    this.planeGeo2 = new THREE.CircleGeometry(0.9, 30);
    this.planeMat2 = new THREE.MeshStandardMaterial({
      color: 0xcecece,
      roughness: 0.1,
      metalness: 0,
    });
    this.plane2 = new THREE.Mesh(this.planeGeo2, this.planeMat2);
    this.plane2.rotation.x = -Math.PI / 2;
    this.plane2.quaternion.z = -Math.PI / 8;
    this.plane2.position.y = -1;
    this.plane2.position.x = -2.5;
    this.plane2.receiveShadow = true;
    this.scene.add(this.plane2);
  };

  this.addLights = function () {
    //SPOT LIGHT
    this.light = new THREE.SpotLight(0xffffff, 0.21);
    this.light.position.set(-1.5, 10, -5); //default; light shining from top
    this.light.castShadow = true; // default false
    this.scene.add(this.light);
    // lightHelper = new THREE.SpotLightHelper(light);
    // scene.add(lightHelper);

    //HEMISPHERE LIGHT
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
    this.scene.add(this.hemiLight);
  };

  this.createModel = async function () {
    const { model } = await loadModel(coffeeMakerModel);
    return model;
  };

  this.hdrMap = async function () {
    const hdrEquirect = new RGBELoader().load(hdr, function () {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
    });
    return hdrEquirect;
  };

  this.createScene = function () {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(this.vp.width, this.vp.height);
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container = document.getElementById("container");
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      40,
      this.vp.width / this.vp.height,
      1,
      100
    );
    this.scene = new THREE.Scene();
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.clock = new THREE.Clock();
  };

  this.render = () => {
    // controls.update();
    requestAnimationFrame(this.render);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  };

  this.resize = () => {
    // WINDOW ADAPTATION
    this.vp.width = window.innerWidth;
    this.vp.height = window.innerHeight;

    this.renderer.setSize(this.vp.width, this.vp.height);
    this.camera.aspect = this.vp.width / this.vp.height;
    this.camera.updateProjectionMatrix();
  };
  // this.resize = this.resize.bind(this);
}
