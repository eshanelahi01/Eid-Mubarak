const revealItems = document.querySelectorAll(".reveal");
const siteLoader = document.querySelector(".site-loader");

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
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 90, 320)}ms`;
  revealObserver.observe(item);
});

const tiltCards = document.querySelectorAll(".tilt-card");
const finePointer = window.matchMedia("(pointer: fine)").matches;

if (finePointer) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const bounds = card.getBoundingClientRect();
      const x = event.clientX - bounds.left;
      const y = event.clientY - bounds.top;
      const rotateY = ((x / bounds.width) - 0.5) * 10;
      const rotateX = ((y / bounds.height) - 0.5) * -10;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

const moonWrap = document.querySelector(".moon-wrap");
const eidiModal = document.querySelector(".eidi-modal");
const openEidiButtons = document.querySelectorAll("[data-open-eidi]");
const closeEidiButtons = document.querySelectorAll("[data-close-eidi]");

if (moonWrap) {
  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (ticking) {
        return;
      }

      ticking = true;

      window.requestAnimationFrame(() => {
        const offset = window.scrollY * 0.08;
        moonWrap.style.transform = `translateY(${offset}px)`;
        ticking = false;
      });
    },
    { passive: true }
  );
}

const setEidiModal = (isOpen) => {
  if (!eidiModal) {
    return;
  }

  eidiModal.classList.toggle("is-open", isOpen);
  eidiModal.setAttribute("aria-hidden", String(!isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
};

openEidiButtons.forEach((button) => {
  button.addEventListener("click", () => setEidiModal(true));
});

closeEidiButtons.forEach((button) => {
  button.addEventListener("click", () => setEidiModal(false));
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setEidiModal(false);
  }
});

window.addEventListener("load", () => {
  if (!siteLoader) {
    return;
  }

  window.setTimeout(() => {
    siteLoader.classList.add("is-hidden");
  }, 650);
});
