import gsap from "https://esm.run/gsap";
import ScrollTrigger from "https://esm.run/gsap/ScrollTrigger";
import SplitText from "https://esm.run/gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initAnimations() {
    const fadeInElements = document.querySelectorAll(".gsap-fadein");
    fadeInElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          toggleActions: "play restart restart restart",
        },
        opacity: 0,
        y: 80,
        duration: 1,
        ease: "power2.out",
      });
    });

    const slideInElements = document.querySelectorAll(".gsap-slidein");
    slideInElements.forEach((el, i) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          toggleActions: "play restart restart restart",
        },
        opacity: 1,
        x: 50,
        duration: 1.2,
        ease: "power2.in",
      });
    });

    const splitChartsTexts = document.querySelectorAll(".gsap-split-chars");
    splitChartsTexts.forEach((st) => {
      const split = new SplitText(st, { type: "chars" });
      gsap.from(split.chars, {
        x: 150,
        opacity: 0,
        duration: 1.5,
        ease: "power2",
        delay: 0.8,
        stagger: 0.05,
        scrollTrigger: {
          trigger: st,
          toggleActions: "play restart restart restart",
        },
      });
    });
}
