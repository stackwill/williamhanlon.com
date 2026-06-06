import "./styles.css";
import { siteData } from "./content/site";
import { renderCarouselOutcome, renderPageHtml } from "./render";

document.documentElement.classList.add("js");

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root not found");
}

const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

document.body.dataset.route = currentPath === "/card" ? "card" : "home";
app.innerHTML = renderPageHtml(currentPath);

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

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const lightboxTriggers = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-lightbox-src]"));
const lightbox = document.createElement("div");
let lightboxLastFocused: HTMLElement | null = null;

lightbox.className = "image-lightbox";
lightbox.hidden = true;
lightbox.innerHTML = `
  <button class="image-lightbox-backdrop" type="button" aria-label="Close full screen image"></button>
  <figure class="image-lightbox-frame" role="dialog" aria-modal="true" aria-labelledby="image-lightbox-caption">
    <button class="image-lightbox-close" type="button" aria-label="Close full screen image">Close</button>
    <img class="image-lightbox-image" alt="" />
    <figcaption class="image-lightbox-caption" id="image-lightbox-caption"></figcaption>
  </figure>
`;

document.body.append(lightbox);

const lightboxImage = lightbox.querySelector<HTMLImageElement>(".image-lightbox-image");
const lightboxCaption = lightbox.querySelector<HTMLElement>(".image-lightbox-caption");
const lightboxCloseControls = Array.from(
  lightbox.querySelectorAll<HTMLButtonElement>(".image-lightbox-close, .image-lightbox-backdrop")
);

const closeLightbox = () => {
  if (lightbox.hidden) {
    return;
  }

  lightbox.dataset.open = "false";
  document.body.dataset.lightboxOpen = "false";

  window.setTimeout(
    () => {
      lightbox.hidden = true;
      lightboxLastFocused?.focus();
      lightboxLastFocused = null;
    },
    reducedMotionQuery.matches ? 0 : 220
  );
};

const openLightbox = (trigger: HTMLButtonElement) => {
  if (!lightboxImage || !lightboxCaption) {
    return;
  }

  lightboxLastFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  lightboxImage.src = trigger.dataset.lightboxSrc ?? "";
  lightboxImage.alt = trigger.dataset.lightboxAlt ?? "";
  lightboxCaption.textContent = trigger.dataset.lightboxCaption ?? "";
  lightbox.hidden = false;
  document.body.dataset.lightboxOpen = "true";

  window.requestAnimationFrame(() => {
    lightbox.dataset.open = "true";
    lightboxCloseControls[0]?.focus();
  });
};

lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => openLightbox(trigger));
});

lightboxCloseControls.forEach((control) => {
  control.addEventListener("click", closeLightbox);
});

lightboxImage?.addEventListener("click", closeLightbox);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

const updateScrollCue = () => {
  document.documentElement.dataset.scrolled = String(window.scrollY > 8);
};

updateScrollCue();
window.addEventListener("scroll", updateScrollCue, { passive: true });

const scrollProgressTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-progress]"));
const scrollRevealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
const featuredProjectCopy = document.querySelector<HTMLElement>(".featured-project-copy");
let scrollEffectFrame: number | undefined;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const setStaticScrollState = () => {
  scrollProgressTargets.forEach((target) => {
    target.style.setProperty("--scroll-progress", "0");
    target.style.setProperty("--scroll-copy-y", "0px");
    target.style.setProperty("--scroll-media-y", "0px");
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
    target.style.setProperty("--scroll-section-y", `${(-16 * lead).toFixed(1)}px`);
  });

  scrollRevealTargets.forEach((target) => {
    const rect = target.getBoundingClientRect();
    const shouldShow = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * -0.2;
    target.dataset.inview = String(shouldShow);

    if (target === featuredProjectCopy && shouldShow && target.dataset.glintPlayed !== "true") {
      target.dataset.glintPlayed = "true";
      target.dataset.glintActive = "true";
    }
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
