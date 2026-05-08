const weddingDate = new Date("2026-08-15T15:00:00+05:00").getTime();
const RSVP_ENDPOINT = CONFIG.RSVP_ENDPOINT;
// Scroll Progress Bar
function updateProgressBar() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) progressBar.style.width = scrollPercent + '%';
}

// Fade-in Animation on Scroll
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add('visible');
    }
  });
  updateProgressBar();
}

function updateTimer() {
  const now = Date.now();
  const diff = weddingDate - now;
  if (diff <= 0) {
    const el = document.getElementById("daysLeft");
    if (el) el.textContent = "00";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const el = document.getElementById("daysLeft");
  if (el) {
    el.style.transform = 'scale(1.1)';
    setTimeout(() => {
      el.textContent = String(days).padStart(2, "0");
      el.style.transform = 'scale(1)';
    }, 150);
  }
}

updateTimer();
setInterval(updateTimer, 1000);

// Music Player
function initMusicPlayer() {
  const audio = document.getElementById('backgroundMusic');
  const toggleBtn = document.getElementById('musicToggle');
  const musicIconOff = document.getElementById('musicIconOff');
  const musicIconOn = document.getElementById('musicIconOn');
  
  if (!audio || !toggleBtn) {
    console.error("Audio element or toggle button not found");
    return;
  }

  // Изначально выключено
  audio.muted = false;
  audio.pause();
  musicIconOff.style.display = 'block';
  musicIconOn.style.display = 'none';

  toggleBtn.addEventListener('click', function() {
    if (audio.paused) {
      audio.play().then(() => {
        musicIconOff.style.display = 'none';
        musicIconOn.style.display = 'block';
      }).catch(err => {
        console.error("Play failed:", err);
      });
    } else {
      audio.pause();
      musicIconOff.style.display = 'block';
      musicIconOn.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('scroll', handleScrollAnimations);
  window.addEventListener('resize', handleScrollAnimations);
  handleScrollAnimations();
  initMusicPlayer();

  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      hero.style.transform = `translateY(${window.scrollY * 0.5}px)`;
    });
  }

  const rsvpForm = document.getElementById('rsvpForm');
  const formStatus = document.getElementById('formStatus');

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(rsvpForm);
      const payload = Object.fromEntries(formData.entries());
      payload.submittedAt = new Date().toISOString();

      const submitText = document.getElementById('submitText');
      const submitSpinner = document.getElementById('submitSpinner');
      const submitButton = rsvpForm.querySelector('button[type="submit"]');

      submitText.style.display = 'none';
      submitSpinner.style.display = 'block';
      submitButton.disabled = true;
      submitButton.style.opacity = '0.7';

      try {
        // Google Apps Script блокирует CORS preflight.
        // no-cors + URLSearchParams — данные доходят без preflight.
        await fetch(RSVP_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(payload).toString(),
        });

        submitText.textContent = "ЖІБЕРУЛДІ ✓";
        submitText.style.display = 'inline';
        submitSpinner.style.display = 'none';
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        
        formStatus.textContent = "Рақмет! Жауабыңыз қабылданды. ✓";
        formStatus.style.color = "#16a34a";
        rsvpForm.reset();
      } catch (error) {
        console.error("RSVP submit failed:", error);
        
        submitText.textContent = "ҚАЙТА ЖІБЕРУ";
        submitText.style.display = 'inline';
        submitSpinner.style.display = 'none';
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
        
        formStatus.textContent = "Қате орын алды. Кейінірек қайталап көріңіз.";
        formStatus.style.color = "#dc2626";
      }
    });
  }
});

// Landscape rotation overlay
function handleOrientation() {
  const overlay = document.getElementById('rotateOverlay');
  if (!overlay) return;
  const isMobile = window.innerWidth <= 900 || ('ontouchstart' in window);
  const isLandscape = window.innerWidth > window.innerHeight;
  overlay.style.display = (isMobile && isLandscape) ? 'flex' : 'none';
}

window.addEventListener('orientationchange', () => setTimeout(handleOrientation, 150));
window.addEventListener('resize', handleOrientation);
document.addEventListener('DOMContentLoaded', handleOrientation);