import * as THREE from "three";

export default function ColorPicker(cover, filter, glass, support) {
  const colors = [
    {
      cover: "#E4DEC6",
      filter: "#A7A7A6",
      glass: "#E4DEC6",
      support: "#A7A7A6",
      //
      coverRoughness: 0.25,
      coverMetalness: 0,
      coverEnvMapIntensity: 0.3,
      //
      glassRoughness: 0.25,
      glassMetalness: 0,
      glassEnvMapIntensity: 0.3,
      glassTransmission: 0,
      //
      supportRoughness: 0,
      supportMetalness: 1,
      supportEnvMapIntensity: 1,
    }, // white plastic
    {
      cover: "#6f6f6f",
      filter: "#E0E0E0",
      glass: "#ffffff",
      support: "#E0E0E0",
      //
      coverRoughness: 0,
      coverMetalness: 1,
      coverEnvMapIntensity: 0.5,
      //
      glassRoughness: 0,
      glassMetalness: 0,
      glassEnvMapIntensity: 1,
      glassTransmission: 1,
      //
      supportRoughness: 0,
      supportMetalness: 1,
      supportEnvMapIntensity: 0.75,
    }, // black metallic
    {
      cover: "#BD9862",
      filter: "#767676",
      glass: "#847E74",
      support: "#767676",
      roughness: 0.4,
      metalness: 0.1,
      //
      coverRoughness: 0.35,
      coverMetalness: 0,
      coverEnvMapIntensity: 0.3,
      //
      glassRoughness: 0.1,
      glassMetalness: 0,
      glassEnvMapIntensity: 0.5,
      glassTransmission: 0,
      //
      supportRoughness: 0,
      supportMetalness: 1,
      supportEnvMapIntensity: 1,
    },
  ];

  const $picker = document.querySelectorAll(".colors__picker__option");

  colors.map((e, index) => {
    $picker[index].style.background = e.glass;
  });

  $picker.forEach((el, index) => {
    el.addEventListener("click", () => {
      //cover
      cover.material.color = new THREE.Color(`${colors[index].cover}`);
      cover.material.metalness = colors[index].coverMetalness;
      cover.material.roughness = colors[index].coverRoughness;
      cover.material.envMapIntensity = colors[index].coverEnvMapIntensity;
      //filter
      filter.material.color = new THREE.Color(`${colors[index].filter}`);
      //glass
      glass.material.color = new THREE.Color(`${colors[index].glass}`);
      glass.material.metalness = colors[index].glassMetalness;
      glass.material.roughness = colors[index].glassRoughness;
      glass.material.envMapIntensity = colors[index].glassEnvMapIntensity;
      glass.material.transmission = colors[index].glassTransmission;
      //colores
      support.material.color = new THREE.Color(`${colors[index].support}`);
      support.material.metalness = colors[index].supportMetalness;
      support.material.roughness = colors[index].supportRoughness;
      support.material.envMapIntensity = colors[index].supportEnvMapIntensity;
    });
  });
}
