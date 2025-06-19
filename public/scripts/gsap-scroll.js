import gsap from "https://esm.run/gsap";
import ScrollTrigger from "https://esm.run/gsap/ScrollTrigger";
import ScrollToPlugin from "https://esm.run/gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function initScrollAnimations() {
  // this scrolling object just allows us to conveniently call scrolling.enable(), scrolling.disable(), and check if scrolling.enabled is true.
  // some browsers (like iOS Safari) handle scrolling on a separate thread and can cause things to get out of sync (jitter/jumpy), so when we're animating the scroll position, force an update of GSAP tweens when there's a scroll event in order to maintain synchronization)
  const scrolling = {
    enabled: true,
    events: "scroll,wheel,touchmove,pointermove".split(","),
    prevent: (e) => e.preventDefault(),
    disable() {
      if (scrolling.enabled) {
        scrolling.enabled = false;
        window.addEventListener("scroll", gsap.ticker.tick, {
          passive: true,
        });
        scrolling.events.forEach((e, i) =>
          (i ? document : window).addEventListener(e, scrolling.prevent, {
            passive: false,
          })
        );
      }
    },
    enable() {
      if (!scrolling.enabled) {
        scrolling.enabled = true;
        window.removeEventListener("scroll", gsap.ticker.tick);
        scrolling.events.forEach((e, i) =>
          (i ? document : window).removeEventListener(e, scrolling.prevent)
        );
      }
    },
  };

  let isScrolling = false;

  function goToSection(section, anim) {
    if (!scrolling.enabled || isScrolling) return;

    isScrolling = true;
    scrolling.disable();

    gsap.to(window, {
      scrollTo: { y: section, autoKill: false },
      duration: 1,
      onComplete: () => {
        scrolling.enable();
        isScrolling = false;
      },
    });

    anim && anim.restart();
  }

  const sections = document.querySelectorAll("section");
  sections.forEach((section, i) => {
    const intoAnim = gsap.from(section.querySelector(".gsap-col"), {
      yPercent: 50,
      duration: 1,
      paused: true,
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top bottom-=1",
      end: "bottom top+=1",
      onEnter: () => goToSection(section, intoAnim),
      onEnterBack: () => {
        const rect = section.getBoundingClientRect();
        if (Math.abs(rect.top) > 1) {
          goToSection(section);
        }
      },
    });
  });
}
