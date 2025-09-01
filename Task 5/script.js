// Theme: persist + OS preference + instant load
const root = document.documentElement;
const storedTheme = localStorage.getItem("theme");
if (storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  root.classList.add("dark");
}
const toggleBtn = document.getElementById("theme-toggle");
const setIcon = () => toggleBtn.textContent = root.classList.contains("dark") ? "🌙" : "☀️" ;
setIcon();
toggleBtn.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("theme", root.classList.contains("dark") ? "dark" : "light");
  setIcon();
});

// Reveal-on-scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("revealed"); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".will-reveal").forEach(el => observer.observe(el));