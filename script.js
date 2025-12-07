// 🌸 Efek Kelopak Jatuh — versi lebih cepat & ringan
(function createPetals() {
  const container = document.getElementById('petals');
  const count = 18;
  const h = window.innerHeight;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'petal';
    el.style.left = Math.random() * 100 + '%';
    el.style.top = -Math.random() * 20 - 5 + '%';

    const size = 8 + Math.random() * 10;
    el.style.width = size + 'px';
    el.style.height = size + 'px';

    container.appendChild(el);

    // durasi lebih singkat agar efek tidak lambat
    const dur = 4 + Math.random() * 4;
    const delay = Math.random() * 2;

    el.animate(
      [
        { transform: 'translateY(0) rotate(0deg)' },
        { transform: `translateY(${h + 200}px) rotate(${360 + Math.random() * 720}deg)` }
      ],
      {
        duration: dur * 1000,
        iterations: Infinity,
        delay: delay * 1000,
        easing: 'linear'
      }
    );
  }
})();


// ✨ Animasi scroll setiap section (lebih cepat)
(function () {
  const sections = document.querySelectorAll('.section');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15 } // lebih responsif
  );

  sections.forEach(s => observer.observe(s));
})();


// 💍 Intro Screen + Musik Fade-in lebih cepat
(function () {
  const intro = document.getElementById('intro-screen');
  const openInvite = document.getElementById('open-invite');
  const musicEl = document.getElementById('bg-music');

  musicEl.volume = 0.2;

  // Mencoba memutar musik (kalau diblokir browser tidak error)
  musicEl.play().catch(() => {});

  openInvite.addEventListener('click', () => {
    intro.classList.add('hide');

    let vol = 0.2;
    const fade = setInterval(() => {
      if (vol < 1.0) {
        vol = Math.min(1.0, vol + 0.05);
        musicEl.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 200);

    setTimeout(() => {
      intro.style.display = 'none';
      try {
        musicEl.play();
      } catch (e) {}
    }, 800); // jauh lebih cepat dari versi sebelumnya
  });
})();


// 🎵 Tombol Musik Play / Pause
const music = document.getElementById('bg-music');
const btn = document.getElementById('music-btn');
let playing = true;

if (btn) {
  btn.addEventListener('click', () => {
    if (playing) music.pause();
    else music.play();
    playing = !playing;
    btn.classList.toggle('off', !playing);
  });
}


// ⏳ Countdown Menuju Hari Bahagia
(function () {
  const target = new Date('March 31, 2026 09:00:00').getTime();
  const el = document.getElementById('countdown');

  function update() {
    const now = Date.now();
    const d = target - now;

    if (d <= 0) {
      el.innerText = '💍 Hari ini adalah hari bahagia kami 💍';
      clearInterval(interval);
      return;
    }

    const days = Math.floor(d / (1000 * 60 * 60 * 24));
    const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((d % (1000 * 60)) / 1000);

    el.innerText = `💞 ${days} Hari ${hours} Jam ${minutes} Menit ${seconds} Detik 💞`;
  }

  update();
  const interval = setInterval(update, 1000);
})();


// 💳 Salin Nomor Rekening
function copyText(text) {
  navigator.clipboard.writeText(text);
  alert('Nomor rekening disalin: ' + text);
}
