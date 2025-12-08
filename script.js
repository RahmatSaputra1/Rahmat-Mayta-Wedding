/* ======================================================
   🌸 EFEK KELOPAK BUNGA
   ====================================================== */
(function createPetals() {
  const container = document.getElementById('petals');
  if (!container) return;

  const count = 18;
  const screenHeight = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'petal';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = -Math.random() * 20 - 5 + '%';

    const size = 8 + Math.random() * 10;
    el.style.width = size + 'px';
    el.style.height = size + 'px';

    container.appendChild(el);

    const duration = 4 + Math.random() * 4;
    const delay = Math.random() * 2;

    el.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        {
          transform: `translateY(${screenHeight + 200}px) rotate(${360 + Math.random() * 720}deg)`,
          opacity: 0.9
        }
      ],
      {
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: Infinity,
        easing: 'linear'
      }
    );
  }
})();

/* ======================================================
   ✨ SECTION FADE-IN
   ====================================================== */
(function () {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.15 }
  );
  sections.forEach(s => observer.observe(s));
})();

/* ======================================================
   💍 INTRO + FADE-IN MUSIC
   ====================================================== */
(function () {
  const intro = document.getElementById('intro-screen');
  const openBtn = document.getElementById('open-invite');
  const music = document.getElementById('bg-music');

  if (!intro || !openBtn || !music) return;

  music.volume = 0.25;
  music.play().catch(() => {});

  openBtn.addEventListener('click', () => {
    intro.classList.add('hide');

    let vol = 0.25;
    const fade = setInterval(() => {
      if (vol < 1) {
        vol += 0.07;
        music.volume = vol;
      } else clearInterval(fade);
    }, 160);

    setTimeout(() => {
      intro.style.display = "none";
      try { music.play(); } catch (e) {}
    }, 900);
  });
})();

/* ======================================================
   🎵 TOMBOL MUSIK
   ====================================================== */
const musicBtn = document.getElementById("music-btn");
const musicBg = document.getElementById("bg-music");
let isPlaying = true;

if (musicBtn && musicBg) {
  musicBtn.addEventListener("click", () => {
    if (isPlaying) musicBg.pause(); else musicBg.play();
    isPlaying = !isPlaying;
    musicBtn.classList.toggle("off", !isPlaying);
  });
}

/* ======================================================
   ⏳ COUNTDOWN
   ====================================================== */
(function () {
  const el = document.getElementById("countdown");
  if (!el) return;

  const target = new Date("March 31, 2026 09:00:00").getTime();

  function update() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      el.innerText = "💍 Hari ini adalah hari bahagia kami 💍";
      return;
    }
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    el.innerText = `💞 ${d} Hari ${h} Jam ${m} Menit ${s} Detik 💞`;
  }

  setInterval(update, 1000);
  update();
})();

/* ======================================================
   💳 COPY TEXT
   ====================================================== */
function copyText(txt) {
  navigator.clipboard.writeText(txt)
    .then(() => alert("Disalin: " + txt))
    .catch(() => alert("Gagal menyalin"));
}

/* ======================================================
   📸 GALLERY ANIMATION
   ====================================================== */
(function () {
  const items = document.querySelectorAll('.gallery-grid-fixed .anim-item');
  if (!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const index = [...items].indexOf(e.target);
      setTimeout(() => e.target.classList.add('visible'), index * 90);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.18 });

  items.forEach(i => obs.observe(i));
})();

/* ======================================================
   💞 INSTAGRAM ANIMATION + TILT
   ====================================================== */
(function () {
  const cards = document.querySelectorAll('.insta-card');
  if (!cards.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const index = [...cards].indexOf(e.target);
      setTimeout(() => e.target.classList.add('visible'), index * 120);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.18 });

  cards.forEach(c => obs.observe(c));

  if (!window.matchMedia("(hover: hover)").matches) return;

  cards.forEach(card => {
    const frame = card.querySelector('.insta-frame');

    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;

      frame.style.transform =
        `translateZ(10px) rotateX(${dy * -7}deg) rotateY(${dx * 7}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
      frame.style.transform = "";
    });
  });
})();

/* ======================================================
   📍 ANIMASI KLIK TOMBOL GOOGLE MAPS
   ====================================================== */
document.querySelectorAll('.map-small-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.remove('clicked');
    void btn.offsetWidth;
    btn.classList.add('clicked');
  });
});
