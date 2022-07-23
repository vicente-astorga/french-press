import Animate from "./components/Animate.js";
import ColorPicker from "./components/ColorPicker.js";
import FrenchPressModel from "./components/FrenchPressModel.js";
import Parts from "./components/Parts.js";

document.addEventListener("DOMContentLoaded", App);
function App() {
  const frenchPress = new FrenchPressModel();

  frenchPress.setup().then(() => {
    const { scene, group, cover, glass, filter, support, plane, plane2 } =
      frenchPress;

    const animation = new Animate(
      scene,
      group,
      cover,
      glass,
      filter,
      support,
      plane,
      plane2
    );
    
    animation.block2();
    animation.block3();
    animation.spinner();
    animation.swipe();
    animation.colorsMotion();

    ColorPicker(cover, filter, glass, support);

    Parts(
      (partsMotion = [
        animation.coverMotion,
        animation.filterMotion,
        animation.glassMotion,
        animation.supportMotion,
      ])
    );
  });
}

