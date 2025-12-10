/* Petals (kelopak) */
(function createPetals(){
  const wrap = document.getElementById('petals');
  if(!wrap) return;
  const count = 18;
  const h = window.innerHeight;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random()*100 + '%';
    p.style.top = -Math.random()*20 - 5 + '%';
    const size = 8 + Math.random()*10;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    wrap.appendChild(p);
    const dur = 4 + Math.random()*4;
    const del = Math.random()*2;
    p.animate(
      [{transform:'translateY(0) rotate(0)', opacity:1},
       {transform:`translateY(${h+200}px) rotate(${360+Math.random()*720}deg)`, opacity:0.9}],
      { duration: dur*1000, delay: del*1000, iterations: Infinity, easing:'linear' }
    );
  }
})();

/* Section fade-in */
(function(){
  const sect = document.querySelectorAll('.section');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  sect.forEach(s=>obs.observe(s));
})();

/* Intro open + music */
(function(){
  const intro = document.getElementById('intro-screen');
  const openBtn = document.getElementById('open-invite');
  const music = document.getElementById('bg-music');
  if(!intro || !openBtn) return;
  music.volume = 0.25;
  openBtn.addEventListener('click', ()=>{
    intro.classList.add('hide');
    let vol = 0.25;
    const fade = setInterval(()=>{
      if(vol < 1){ vol += 0.07; music.volume = vol; } else clearInterval(fade);
    }, 160);
    setTimeout(()=>{ intro.style.display = 'none'; music.play().catch(()=>{}); }, 900);
  });
})();

/* Music button */
const musicBtn = document.getElementById('music-btn');
const bgm = document.getElementById('bg-music');
let on = true;
if(musicBtn && bgm){
  musicBtn.addEventListener('click', ()=>{
    if(on) bgm.pause(); else bgm.play();
    on = !on;
    musicBtn.classList.toggle('off', !on);
  });
}

/* Countdown */
(function(){
  const el = document.getElementById('countdown');
  if(!el) return;
  const target = new Date('March 31, 2026 09:00:00').getTime();
  function tick(){
    const now = Date.now();
    const diff = target - now;
    if(diff <= 0){ el.innerHTML = '💍 Hari ini hari bahagia kami 💍'; return; }
    const d = Math.floor(diff / (864e5));
    const h = Math.floor((diff % 864e5) / 36e5);
    const m = Math.floor((diff % 36e5) / 6e4);
    const s = Math.floor((diff % 6e4) / 1e3);
    el.innerHTML = `💞 ${d} Hari ${h} Jam ${m} Menit ${s} Detik 💞`;
  }
  tick(); setInterval(tick, 1000);
})();

/* Galeri animation */
(function(){
  const items = document.querySelectorAll('.gallery-grid-fixed .anim-item');
  if(!items.length) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const i = [...items].indexOf(e.target);
      setTimeout(()=> e.target.classList.add('visible'), i * 80);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.18 });
  items.forEach(i=>obs.observe(i));
})();

/* Instagram tilt + reveal */
(function(){
  const cards = document.querySelectorAll('.insta-card');
  if(!cards.length) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const i = [...cards].indexOf(e.target);
      setTimeout(()=> e.target.classList.add('visible'), i * 120);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.18 });
  cards.forEach(c=>obs.observe(c));
  if(!window.matchMedia('(hover: hover)').matches) return;
  cards.forEach(card=>{
    const frame = card.querySelector('.insta-frame');
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) / r.width;
      const dy = (e.clientY - (r.top + r.height/2)) / r.height;
      frame.style.transform = `translateZ(12px) rotateX(${dy * -7}deg) rotateY(${dx * 7}deg) scale(1.03)`;
    });
    card.addEventListener('mouseleave', ()=>{ frame.style.transform = ''; });
  });
})();

/* Map button click effect */
document.querySelectorAll('.map-small-btn').forEach(b=>{
  b.addEventListener('click', ()=>{
    b.classList.remove('clicked');
    void b.offsetWidth;
    b.classList.add('clicked');
  });
});

/* RSVP handler */
(function rsvpHandler(){
  const form = document.getElementById('rsvp-form');
  if(!form) return;
  const nameEl = document.getElementById('rsvp-name');
  const countEl = document.getElementById('rsvp-count');
  const attendEl = document.getElementById('rsvp-attend');
  const thanks = document.getElementById('rsvp-thanks');
  const closeBtn = document.getElementById('rsvp-close');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(!nameEl.value.trim() || !attendEl.value){ alert('Mohon isi nama dan pilih kehadiran.'); return; }
    if(thanks) thanks.setAttribute('aria-hidden','false');
    form.reset(); countEl.value = 1;
  });

  if(closeBtn) closeBtn.addEventListener('click', ()=>{ if(thanks) thanks.setAttribute('aria-hidden','true'); });
})();

/* Copy account number */
function copyText(text){
  navigator.clipboard.writeText(text).then(()=> alert('Nomor rekening disalin: ' + text))
  .catch(()=> alert('Gagal menyalin. Silakan salin manual: ' + text));
}
