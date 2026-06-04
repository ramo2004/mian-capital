const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

const header = document.querySelector(".site-header");
const steps = Array.from(document.querySelectorAll(".step"));
const panels = Array.from(document.querySelectorAll(".stage-content"));
const scrollySection = document.querySelector(".scrolly");
const stageLabel = document.querySelector("#stage-label");
const stageTitle = document.querySelector("#stage-title");
const counters = Array.from(document.querySelectorAll("[data-count]"));
let stepTicking = false;

const stageCopy = {
  setup: {
    label: "Unified view",
    title: "Assets organized automatically",
  },
  screening: {
    label: "Screening engine",
    title: "Every holding gets a clear reason",
  },
  advice: {
    label: "Advisor dashboard",
    title: "Practical guidance aligned to your values",
  },
};

function setActiveStep(stepName) {
  steps.forEach((step) => {
    step.classList.toggle("is-active", step.dataset.step === stepName);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === stepName);
  });

  if (stageCopy[stepName]) {
    stageLabel.textContent = stageCopy[stepName].label;
    stageTitle.textContent = stageCopy[stepName].title;
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function animateCounter(element) {
  if (element.dataset.counted === "true") return;
  element.dataset.counted = "true";

  const target = Number(element.dataset.count);
  const start = performance.now();
  const duration = prefersReducedMotion ? 1 : 1200;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = formatCurrency(Math.round(target * eased));

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  }

  requestAnimationFrame(tick);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});

const stepObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (visible) {
      setActiveStep(visible.target.dataset.step);
    }
  },
  {
    threshold: [0.32, 0.5, 0.68],
    rootMargin: "-20% 0px -35% 0px",
  },
);

steps.forEach((step) => {
  stepObserver.observe(step);
});

function updateStepFromScroll() {
  stepTicking = false;
  if (!scrollySection || !steps.length) return;

  const sectionRect = scrollySection.getBoundingClientRect();
  const sectionIsVisible =
    sectionRect.bottom > 160 && sectionRect.top < window.innerHeight - 160;
  if (!sectionIsVisible) return;

  const targetLine = window.innerHeight * 0.48;
  const closest = steps.reduce(
    (best, step) => {
      const rect = step.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - targetLine);
      return distance < best.distance ? { step, distance } : best;
    },
    { step: steps[0], distance: Number.POSITIVE_INFINITY },
  );

  setActiveStep(closest.step.dataset.step);
}

function requestStepUpdate() {
  if (stepTicking) return;
  stepTicking = true;
  requestAnimationFrame(updateStepFromScroll);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.6,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  });
});

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
    requestStepUpdate();
  },
  { passive: true },
);

window.addEventListener("resize", requestStepUpdate);

document.querySelectorAll("[data-tilt]").forEach((card) => {
  if (prefersReducedMotion) return;

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${x * -7}deg) rotateX(${y * 5}deg) translateY(-2px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

setActiveStep("setup");
requestStepUpdate();
