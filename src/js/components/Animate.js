export default function Animate(
  scene,
  group,
  cover,
  glass,
  filter,
  support,
  plane,
  plane2
) {
  // GSAP
  gsap.registerPlugin(ScrollTrigger);

  this.ease = "power1";
  this.time = 1.5;
  //  < < < < < < < < < < < < < < < < < < < < < < <

  this.block2 = function () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".block1",
        toggleActions: "restart none none reverse",
        start: "top top",
        end: "bottom end",
        // markers: true,
        scrub: 0.3,
        snap: 1,
      },
    }); //{ paused: true }

    tl.to(
      scene.rotation,
      {
        duration: 2,
        x: 0,
        y: 0,
        z: 0,
        ease: this.ease,
      },
      "<"
    );
    tl.to(
      group.position,
      {
        duration: 2,
        x: -0.5,
        y: -1.25,
        z: -1.9,
        ease: this.ease,
      },
      "<"
    );
    tl.to(
      group.rotation,
      {
        duration: 2,
        x: Math.PI / 4,
        y: Math.PI / -3.1,
        z: Math.PI / 4,
        ease: this.ease,
      },
      "<"
    );
    tl.to(
      cover.position,
      {
        duration: 2,
        y: 12,
        ease: this.ease,
      },
      "<"
    );
    tl.to(
      filter.position,
      {
        duration: 2,
        y: 25.5,
        ease: this.ease,
      },
      "<"
    );
    tl.to(
      support.position,
      {
        duration: 2,
        y: -25,
        ease: this.ease,
      },
      "<"
    );
    tl.to(
      plane.position,
      {
        duration: 2,
        y: -10,
        ease: this.ease,
      },
      "<"
    );
    tl.to(
      plane2.position,
      {
        duration: 2,
        y: -10,
        x: -10,
        ease: this.ease,
      },
      "<"
    );
    tl.to(
      ".svg1",
      {
        opacity: 0,
      },
      "<"
    );
  };

  this.block3 = function () {
    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: ".block2",
        toggleActions: "restart none none reverse",
        start: "top top",
        end: "bottom end",
        // markers: true,
        scrub: 0.3,
        snap: 1,
      },
    }); //{ paused: true }

    tl5.to(
      group.position,
      {
        duration: 2,
        x: -0.75,
        y: -1.25,
        z: 1,
        ease: this.ease,
      },
      "<"
    );
    tl5.to(
      group.rotation,
      {
        duration: 2,
        x: 0,
        y: Math.PI / 4,
        z: 0,
        ease: this.ease,
      },
      "<"
    );
    tl5.to(
      cover.position,
      {
        duration: 2,
        y: 0,
        ease: this.ease,
      },
      "<"
    );
    tl5.to(
      filter.position,
      {
        duration: 2,
        y: 0,
        ease: this.ease,
      },
      "<"
    );
    tl5.to(
      support.position,
      {
        duration: 2,
        y: 0,
        ease: this.ease,
      },
      "<"
    );
  };

  this.spinner = function () {
    gsap.to(
      ".svg1",
      {
        transformOrigin: "50% 50%",
        rotation: 360,
        ease: Linear.easeNone,
        repeat: -1,
        duration: 10,
      },
      "<"
    );
  };

  this.swipe = function () {
    const tlx = gsap.timeline({
      scrollTrigger: {
        trigger: ".block2",
        start: "70% 90%",
        end: "70% 50%",
        scrub: true,
        // pin: true,
        // markers: true,
        toggleActions: "play reverse play reverse",
      },
    });

    const move = 200;
    gsap.set(".parts__box__item", {
      display: "none",
      x: (e) => {
        let res = e < 2 ? `+=${move}` : `-=${move}`;
        return res;
      },
    });

    tlx
      .to(".parts__box__item", {
        display: "flex",
        opacity: 1,
        duration: 0.5,
        x: (e) => {
          let res = e < 2 ? `-=${move}` : `+=${move}`;
          return res;
        },
      })
      .to(
        ".parts__box__item",
        {
          opacity: 0,
          display: "none",
          duration: 0.5,
          x: (e) => {
            let res = e < 2 ? `+=${move}` : `-=${move}`;
            return res;
          },
        },
        0.5
      );
  };

  this.partsHandler = function (timeLine) {
    gsap.set(".parts__box", { display: "none" });

    document.querySelector('body').classList.add('is-loading')

    const $filter = document.querySelector(".parts__info__close");
    $filter.addEventListener("click", filterHandler, false);

    function filterHandler() {
      gsap.set(".parts__info", {
        display: "none",
      });
      timeLine.reverse();

      // remove the listener to improve performance
      $filter.removeEventListener("click", filterHandler);
    }
  };

  this.coverMotion = () => {
    const tl1 = gsap.timeline({
      onReverseComplete: function () {
        gsap.set(".parts__box", { display: "block" });
        document.querySelector('body').classList.remove('is-loading');
      },
      onComplete: function () {
        gsap.set(".parts__info", { display: "flex" });
      },
    });

    this.partsHandler(tl1);

    tl1.to(
      group.position,
      {
        duration: this.time,
        x: 0.5 - 2.2,
        y: -2.5,
        z: 3 + 0.75,
        ease: this.ease,
      },
      "<"
    );
    tl1.to(
      group.rotation,
      {
        duration: this.time,
        x: Math.PI / 4,
        y: Math.PI / 4,
        z: Math.PI / -8,
        ease: this.ease,
      },
      "<"
    );
    tl1.to(
      cover.position,
      {
        duration: this.time,
        y: 15,
        ease: this.ease,
      },
      "<"
    );
  };

  this.filterMotion = () => {
    const tl2 = gsap.timeline({
      onReverseComplete: function () {
        gsap.set(".parts__box", { display: "block" });
        document.querySelector('body').classList.remove('is-loading');
      },
      onComplete: function () {
        gsap.set(".parts__info", { display: "flex" });
      },
    });

    this.partsHandler(tl2);

    tl2.to(
      group.position,
      {
        duration: this.time,
        x: 0.5 - 1.92,
        y: -2.5 + 0.75,
        z: 3 + 0.75,
        ease: this.ease,
      },
      "<"
    );
    tl2.to(
      group.rotation,
      {
        duration: this.time,
        x: Math.PI / 4,
        y: Math.PI / 4,
        z: Math.PI / -8,
        ease: this.ease,
      },
      "<"
    );
    tl2.to(
      cover.position,
      {
        duration: this.time,
        y: 15,
        ease: this.ease,
      },
      "<"
    );
  };

  this.glassMotion = () => {
    const tl3 = gsap.timeline({
      onReverseComplete: function () {
        gsap.set(".parts__box", { display: "block" });
        document.querySelector('body').classList.remove('is-loading');
      },
      onComplete: function () {
        gsap.set(".parts__info", { display: "flex" });
      },
    });
    this.partsHandler(tl3);

    tl3.to(
      group.position,
      {
        duration: this.time,
        x: 0.5 - 0.75,
        y: -2.5 + 2.125,
        z: 3,
        ease: this.ease,
      },
      "<"
    );
    tl3.to(
      group.rotation,
      {
        duration: this.time,
        x: Math.PI / 6,
        y: Math.PI / -8,
        z: Math.PI / 8,
        ease: this.ease,
      },
      "<"
    );
    tl3.to(
      cover.position,
      {
        duration: this.time,
        y: 15,
        ease: this.ease,
      },
      "<"
    );
  };

  this.supportMotion = () => {
    const tl4 = gsap.timeline({
      onReverseComplete: function () {
        gsap.set(".parts__box", { display: "block" });
        document.querySelector('body').classList.remove('is-loading');
      },
      onComplete: function () {
        gsap.set(".parts__info", { display: "flex" });
      },
    });
    this.partsHandler(tl4);

    tl4.to(
      group.position,
      {
        duration: this.time,
        x: 0.5 - 0.75,
        y: -2.5 + 4.2,
        z: 3 + 0.75,
        ease: this.ease,
      },
      "<"
    );
    tl4.to(
      group.rotation,
      {
        duration: this.time,
        x: Math.PI / 8,
        y: Math.PI / 4,
        z: Math.PI / -6,
        ease: this.ease,
      },
      "<"
    );
  };

  this.colorsMotion = () => {
    const tlColors = gsap.timeline({
      scrollTrigger: {
        trigger: ".block3",
        start: "70% 90%",
        end: "70% 50%",
        scrub: true,
        // markers: true,
        toggleActions: "play reverse play reverse",
      }, //colors__title colors__picker
    });

    tlColors
      .to(".colors__title, .colors__picker", {
        opacity: 1,
        duration: 0.5,
      })
      .to(
        ".colors__title, .colors__picker",
        {
          opacity: 0,
          display: "none",
          duration: 0.5,
        },
        0.5
      );
  };
}
