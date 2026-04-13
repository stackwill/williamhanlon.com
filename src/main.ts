import "./styles.css";
import { siteData } from "./content/site";
import { renderAppHtml, renderCarouselOutcome } from "./render";

document.documentElement.classList.add("js");

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

app.innerHTML = renderAppHtml();

const slides = Array.from(document.querySelectorAll<HTMLElement>(".carousel-slide"));
const dots = Array.from(document.querySelectorAll<HTMLButtonElement>(".carousel-dot"));
const carouselShell = document.querySelector<HTMLElement>(".carousel-shell");
const carouselStatus = document.querySelector<HTMLElement>(".carousel-status-value");
const carouselOutcomeHost = document.querySelector<HTMLElement>(".carousel-outcome-host");

let activeSlide = 0;
let carouselTimer: number | undefined;

const setActiveSlide = (index: number) => {
  if (slides.length === 0) {
    return;
  }

  activeSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, slideIndex) => {
    slide.dataset.active = String(slideIndex === activeSlide);
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.dataset.active = String(isActive);
    dot.setAttribute("aria-current", String(isActive));
  });

  if (carouselStatus) {
    carouselStatus.textContent = `${activeSlide + 1}/${slides.length}`;
  }

  if (carouselOutcomeHost) {
    carouselOutcomeHost.innerHTML = renderCarouselOutcome(siteData.carouselSlides[activeSlide]);
  }
};

const stopCarousel = () => {
  if (carouselTimer) {
    window.clearInterval(carouselTimer);
    carouselTimer = undefined;
  }
};

const startCarousel = () => {
  if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  stopCarousel();
  carouselTimer = window.setInterval(() => {
    setActiveSlide(activeSlide + 1);
  }, 5600);
};

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.index);
    setActiveSlide(index);
    startCarousel();
  });
});

if (carouselShell) {
  carouselShell.addEventListener("mouseenter", stopCarousel);
  carouselShell.addEventListener("mouseleave", startCarousel);
  carouselShell.addEventListener("focusin", stopCarousel);
  carouselShell.addEventListener("focusout", startCarousel);
}

setActiveSlide(0);
startCarousel();

const updateScrollCue = () => {
  document.documentElement.dataset.scrolled = String(window.scrollY > 8);
};

updateScrollCue();
window.addEventListener("scroll", updateScrollCue, { passive: true });

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const scrollProgressTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-progress]"));
const scrollRevealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
let scrollEffectFrame: number | undefined;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const setStaticScrollState = () => {
  scrollProgressTargets.forEach((target) => {
    target.style.setProperty("--scroll-progress", "0");
    target.style.setProperty("--scroll-copy-y", "0px");
    target.style.setProperty("--scroll-media-y", "0px");
    target.style.setProperty("--scroll-media-scale", "1");
    target.style.setProperty("--scroll-section-y", "0px");
  });

  scrollRevealTargets.forEach((target) => {
    target.dataset.inview = "true";
  });
};

const updateScrollEffects = () => {
  scrollEffectFrame = undefined;

  if (reducedMotionQuery.matches) {
    setStaticScrollState();
    return;
  }

  const viewportHeight = window.innerHeight || 1;

  scrollProgressTargets.forEach((target) => {
    const rect = target.getBoundingClientRect();
    const travel = Math.max(rect.height - viewportHeight * 0.6, viewportHeight * 0.8);
    const progress = clamp(-rect.top / travel, 0, 1);
    const lead = clamp((progress - 0.08) / 0.82, 0, 1);

    target.style.setProperty("--scroll-progress", progress.toFixed(3));
    target.style.setProperty("--scroll-copy-y", `${(-22 * lead).toFixed(1)}px`);
    target.style.setProperty("--scroll-media-y", `${(34 * lead).toFixed(1)}px`);
    target.style.setProperty("--scroll-media-scale", (1 - lead * 0.035).toFixed(3));
    target.style.setProperty("--scroll-section-y", `${(-16 * lead).toFixed(1)}px`);
  });

  scrollRevealTargets.forEach((target) => {
    const rect = target.getBoundingClientRect();
    const shouldShow = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * -0.2;
    target.dataset.inview = String(shouldShow);
  });
};

const requestScrollEffects = () => {
  if (scrollEffectFrame !== undefined) {
    return;
  }

  scrollEffectFrame = window.requestAnimationFrame(updateScrollEffects);
};

const handleMotionPreferenceChange = () => {
  requestScrollEffects();

  if (reducedMotionQuery.matches) {
    stopCarousel();
  } else {
    startCarousel();
  }
};

updateScrollEffects();
window.addEventListener("scroll", requestScrollEffects, { passive: true });
window.addEventListener("resize", requestScrollEffects);
reducedMotionQuery.addEventListener("change", handleMotionPreferenceChange);
