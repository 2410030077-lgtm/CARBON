// ================================
// GLOBAL MAIN SCRIPT
// ================================

// ---------- THEME (DARK / LIGHT) ----------
function applyTheme(theme) {
  document.body.classList.remove("dark-mode", "light-mode");
  document.body.classList.add(theme);
  localStorage.setItem("theme", theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark-mode";
  applyTheme(savedTheme);
}

function toggleTheme() {
  const isDark = document.body.classList.contains("dark-mode");
  applyTheme(isDark ? "light-mode" : "dark-mode");
}

// ---------- ECO COINS ----------
async function loadEcoCoins() {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch("http://127.0.0.1:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      localStorage.clear();
      return;
    }

    const data = await res.json();
    const coinsEl = document.getElementById("coinsCount");

    if (coinsEl && data.coins !== undefined) {
      coinsEl.textContent = data.coins;
    }
  } catch (err) {
    console.error("Failed to load eco coins");
  }
}

// ---------- USER AUTH CHECK ----------
function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}

// ---------- INIT ----------
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadEcoCoins();

  // Attach theme toggle if button exists
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
});
