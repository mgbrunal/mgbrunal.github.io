import gsap from "https://esm.run/gsap";
import ScrollTrigger from "https://esm.run/gsap/ScrollTrigger";
import ScrollToPlugin from "https://esm.run/gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function initScrollAnimations() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const col = section.querySelector(".gsap-col");

    const anim = gsap.from(col, {
      yPercent: 50,
      duration: 1,
      paused: true,
    });

    let snapped = false;

    ScrollTrigger.create({
      trigger: section,
      start: "top 60%", // cuando el top de la sección llega al 60% del viewport
      end: "bottom 40%", // cuando el bottom sube hasta 40%
      onEnter: () => {
        if (!snapped) {
          snapped = true;
          gsap.to(window, {
            scrollTo: { y: section, autoKill: false },
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              anim.restart();
            },
          });
        }
      },
      onLeave: () => {
        snapped = false;
      },
      onLeaveBack: () => {
        snapped = false;
      },
    });
  });
}
