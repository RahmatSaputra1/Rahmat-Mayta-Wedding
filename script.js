/* ===========================================================
   KELopak BUNGA / PETALS
   =========================================================== */
(function createPetals(){
  const wrap = document.getElementById('petals');
  if(!wrap) return;

  const total = 18;
  const h = window.innerHeight;

  for(let i = 0; i < total; i++){
    const p = document.createElement('div');
    p.className = 'petal';

    p.style.left = Math.random()*100 + '%';
    p.style.top  = -Math.random()*20 - 5 + '%';

    const size = 8 + Math.random()*10;
    p.style.width = size + 'px';
    p.style.height = size + 'px';

    wrap.appendChild(p);

    const dur = 4 + Math.random()*4;
    const del = Math.random()*2;

    p.animate(
      [
        { transform:'translateY(0) rotate(0)', opacity:1 },
        { transform:`translateY(${h+200}px) rotate(${360+Math.random()*720}deg)`, opacity:0.9 }
      ],
      { duration: dur*1000, delay: del*1000, iterations: Infinity, easing:'linear' }
    );
  }
})();


/* ===========================================================
   SECTION FADE-IN
   =========================================================== */
(function(){
  const sections = document.querySelectorAll('.section');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach(s => obs.observe(s));
})();


/* ===========================================================
   INTRO OPEN + MUSIC FADE IN
   =========================================================== */
(function(){
  const intro = document.getElementById('intro-screen');
  const openBtn = document.getElementById('open-invite');
  const music = document.getElementById('bg-music');

  if(!intro || !openBtn) return;

  music.volume = 0.25;

  openBtn.addEventListener('click', ()=>{
    intro.classList.add('hide');

    // Fade in musik
    let vol = 0.25;
    const fade = setInterval(()=>{
      if(vol < 1){
        vol += 0.07;
        music.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 150);

    setTimeout(()=>{
      intro.style.display = 'none';
      music.play().catch(()=>{});
    }, 900);
  });
})();


/* ===========================================================
   MUSIC BUTTON
   =========================================================== */
const musicBtn = document.getElementById('music-btn');
const bgm = document.getElementById('bg-music');
let musicOn = true;

if(musicBtn && bgm){
  musicBtn.addEventListener('click', ()=>{
    if(musicOn) bgm.pause();
    else bgm.play();

    musicOn = !musicOn;
    musicBtn.classList.toggle('off', !musicOn);
  });
}


/* ===========================================================
   COUNTDOWN
   =========================================================== */
(function(){
  const el = document.getElementById('countdown');
  if(!el) return;

  const target = new Date("March 31, 2026 09:00:00").getTime();

  function tick(){
    const now = Date.now();
    const diff = target - now;

    if(diff <= 0){
      el.innerHTML = "💍 Hari ini hari bahagia kami 💍";
      return;
    }

    const d = Math.floor(diff / (864e5));
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1e3);

    el.innerHTML = `💞 ${d} Hari ${h} Jam ${m} Menit ${s} Detik 💞`;
  }

  tick();
  setInterval(tick, 1000);
})();


/* ===========================================================
   GALLERY ANIMATION
   =========================================================== */
(function(){
  const items = document.querySelectorAll(".gallery-grid-fixed .anim-item");
  if(!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const i = [...items].indexOf(entry.target);
        setTimeout(()=> entry.target.classList.add("visible"), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(i => obs.observe(i));
})();


/* ===========================================================
   INSTAGRAM CARD ANIMATION
   =========================================================== */
(function(){
  const cards = document.querySelectorAll(".insta-card");
  if(!cards.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const i = [...cards].indexOf(entry.target);
        setTimeout(()=> entry.target.classList.add("visible"), i * 120);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  cards.forEach(c => obs.observe(c));

  /* Tilt effect (desktop only) */
  if(!window.matchMedia("(hover: hover)").matches) return;

  cards.forEach(card=>{
    const frame = card.querySelector(".insta-frame");

    card.addEventListener("mousemove", e=>{
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) / r.width;
      const dy = (e.clientY - (r.top + r.height/2)) / r.height;

      frame.style.transform =
        `translateZ(12px) rotateX(${dy * -7}deg) rotateY(${dx * 7}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", ()=>{
      frame.style.transform = "";
    });
  });

})();


/* ===========================================================
   MAP BUTTON ANIMATION
   =========================================================== */
document.querySelectorAll(".map-small-btn").forEach(btn => {
  btn.addEventListener("click", ()=>{
    btn.classList.remove("clicked");
    void btn.offsetWidth;
    btn.classList.add("clicked");
  });
});


/* ===========================================================
   RSVP HANDLER
   =========================================================== */
(function(){
  const form = document.getElementById("rsvp-form");
  if(!form) return;

  const nameEl   = document.getElementById("rsvp-name");
  const countEl  = document.getElementById("rsvp-count");
  const attendEl = document.getElementById("rsvp-attend");
  const thanks   = document.getElementById("rsvp-thanks");
  const closeBtn = document.getElementById("rsvp-close");

  form.addEventListener("submit", e=>{
    e.preventDefault();

    if(!nameEl.value.trim() || !attendEl.value){
      alert("Mohon isi nama dan pilih kehadiran.");
      return;
    }

    thanks.setAttribute("aria-hidden", "false");
    form.reset();
    countEl.value = 1;
  });

  if(closeBtn){
    closeBtn.addEventListener("click", ()=>{
      thanks.setAttribute("aria-hidden", "true");
    });
  }
})();


/* ===========================================================
   COPY NOMOR REKENING
   =========================================================== */
function copyText(text){
  navigator.clipboard.writeText(text)
    .then(()=> alert("Nomor rekening disalin: " + text))
    .catch(()=> alert("Gagal menyalin. Silakan salin manual."));
}


/* ===========================================================
   INSTAGRAM CARD LINK ACCESSIBILITY FIX
   =========================================================== */
document.querySelectorAll(".insta-card-link").forEach(a=>{
  a.addEventListener("keydown", e=>{
    if(e.key === "Enter" || e.key === " "){
      e.preventDefault();
      a.click();
    }
  });
});
