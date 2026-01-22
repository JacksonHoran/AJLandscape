// ===========================
// Header behavior
// ===========================
const header = document.querySelector(".header");
const onScroll = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
};
window.addEventListener("scroll", onScroll);
onScroll();

// ===========================
// Mobile drawer
// ===========================
const drawer = document.querySelector(".drawer");
const openBtn = document.querySelector("[data-open-drawer]");
const closeBtn = document.querySelector("[data-close-drawer]");

function setDrawer(open){
  if (!drawer) return;
  drawer.classList.toggle("open", open);
  document.documentElement.style.overflow = open ? "hidden" : "";
}
openBtn?.addEventListener("click", () => setDrawer(true));
closeBtn?.addEventListener("click", () => setDrawer(false));
drawer?.addEventListener("click", (e) => {
  if (e.target === drawer) setDrawer(false);
});

// ===========================
// Scroll reveal (IntersectionObserver)
// ===========================
const revealables = document.querySelectorAll("[data-reveal], [data-stagger]");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("in");
  });
}, { threshold: 0.16 });

revealables.forEach(el => io.observe(el));

// ===========================
// Testimonial slider (simple)
// ===========================
const slider = document.querySelector("[data-slider]");
const slidesEl = slider?.querySelector(".slides");
const prev = slider?.querySelector("[data-prev]");
const next = slider?.querySelector("[data-next]");

let index = 0;
function goTo(i){
  if (!slidesEl) return;
  const count = slidesEl.children.length;
  index = (i + count) % count;
  slidesEl.style.transform = `translateX(${-index * 100}%)`;
}
prev?.addEventListener("click", () => goTo(index - 1));
next?.addEventListener("click", () => goTo(index + 1));

// Optional auto-advance
let timer = null;
if (slider){
  timer = setInterval(() => goTo(index + 1), 7000);
  slider.addEventListener("mouseenter", () => timer && clearInterval(timer));
  slider.addEventListener("mouseleave", () => timer = setInterval(() => goTo(index + 1), 7000));
}

// ===========================
// Smooth scroll for in-page anchors
// ===========================
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href");
  const el = document.querySelector(id);
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  setDrawer(false);
});
