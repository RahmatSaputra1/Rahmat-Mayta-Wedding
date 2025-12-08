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
   ✨ SECTION FADE-IN ANIMATION
   ====================================================== */
(function () {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach(sec => observer.observe(sec));
})();

/* ======================================================
   💍 INTRO SCREEN + MUSIC FADE-IN
   ====================================================== */
(function () {
  const intro = document.getElementById('intro-screen');
  const openBtn = document.getElementById('open-invite');
  const music = document.getElementById('bg-music');

  if (!intro || !openBtn || !music) return;

  music.volume = 0.2;
  music.play().catch(() => {});

  openBtn.addEventListener('click', () => {
    intro.classList.add('hide');

    let vol = 0.2;
    const fadeIn = setInterval(() => {
      if (vol < 1) {
        vol = Math.min(1, vol + 0.06);
        music.volume = vol;
      } else {
        clearInterval(fadeIn);
      }
    }, 180);

    setTimeout(() => {
      intro.style.display = 'none';
      try { music.play(); } catch (e) {}
      document.querySelectorAll('.section').forEach(s => s.classList.add('visible'));
    }, 900);
  });
})();

/* ======================================================
   🎵 TOMBOL MUSIK PLAY/PAUSE
   ====================================================== */
const musicBtn = document.getElementById('music-btn');
const musicBg = document.getElementById('bg-music');
let isPlaying = true;

if (musicBtn && musicBg) {
  musicBtn.addEventListener('click', () => {
    if (isPlaying) musicBg.pause();
    else musicBg.play();

    isPlaying = !isPlaying;
    musicBtn.classList.toggle('off', !isPlaying);
  });
}

/* ======================================================
   🕒 COUNTDOWN PERNIKAHAN
   ====================================================== */
(function () {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  const target = new Date("March 31, 2026 09:00:00").getTime();

  function update() {
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      countdownEl.innerText = "💍 Hari ini adalah hari bahagia kami 💍";
      clearInterval(timer);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    countdownEl.innerText = `💞 ${d} Hari ${h} Jam ${m} Menit ${s} Detik 💞`;
  }

  update();
  const timer = setInterval(update, 1000);
})();

/* ======================================================
   💳 COPY REKENING
   ====================================================== */
function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => alert("Nomor rekening disalin: " + text))
    .catch(() => alert("Gagal menyalin, salin manual: " + text));
}

/* ======================================================
   📸 ANIMASI GALERI — STAGGER REVEAL
   ====================================================== */
(function galleryAnimation() {
  const items = document.querySelectorAll('.gallery-grid-fixed .anim-item');
  if (!items.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const index = Array.from(items).indexOf(el);
      const delay = Math.min(index, 12) * 90;

      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.18 });

  items.forEach(item => observer.observe(item));
})();

/* ======================================================
   💞 ANIMASI INSTAGRAM (FADE + TILT + SHIMMER)
   ====================================================== */
(function instagramAnimation() {
  const cards = document.querySelectorAll('.insta-card');
  if (!cards.length) return;

  /* Fade stagger */
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const index = Array.from(cards).indexOf(el);
      const delay = index * 120;
      setTimeout(() => el.classList.add('visible'), delay);
      obs.unobserve(el);
    });
  }, { threshold: 0.18 });

  cards.forEach(c => io.observe(c));

  /* Tilt hover (desktop only) */
  const tiltEnabled = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!tiltEnabled) return;

  cards.forEach(card => {
    const frame = card.querySelector('.insta-frame');
    if (!frame) return;

    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;

      const rotateY = dx * 6;
      const rotateX = -dy * 6;

      frame.style.transform =
        `translateZ(10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      frame.style.transform = "";
    });
  });
})();
