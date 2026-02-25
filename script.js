// Reasons I Love You – card data
const reasons = [
  { num: "01", back: "You make ordinary days feel magical just by being in them." },
  { num: "02", back: "Your laugh is the soundtrack I never want to turn off." },
  { num: "03", back: "The way you care for others shows me how beautiful your soul is." },
  { num: "04", back: "You challenge me to be a better version of myself every day." },
  { num: "05", back: "Your smile lights up the darkest corners of my world." },
  { num: "06", back: "I feel at home wherever you are — you are my home." },
  { num: "07", back: "You understand me in ways nobody else ever could." },
  { num: "08", back: "Loving you is the easiest and most rewarding thing I have ever done." },
  { num: "09", back: "You make me believe that real, deep, forever love is possible." },
  { num: "10", back: "Every single day with you is a gift I never take for granted." },
  { num: "11", back: "You see the best in me even when I can't see it myself." },
  { num: "12", back: "You are my first thought in the morning and my last at night." },
];

// Inject flip cards
const grid = document.getElementById('cardsGrid');
reasons.forEach(r => {
  const card = document.createElement('div');
  card.className = 'flip-card';
  card.innerHTML = `
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <div class="card-num">${r.num}</div>
        <div class="card-hint">Tap to reveal 💌</div>
      </div>
      <div class="flip-card-back">${r.back}</div>
    </div>`;
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  grid.appendChild(card);
});

// ── Floating Hearts Background ──────────────────────────────
const heartsBg = document.getElementById('heartsBg');
const heartEmojis = ['❤️','💕','💖','💗','💓','🌹','💞','💝'];
function spawnHeart() {
  const el = document.createElement('div');
  el.className = 'floating-heart';
  el.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = (0.8 + Math.random() * 1.4) + 'rem';
  const dur = 6 + Math.random() * 8;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = (Math.random() * 4) + 's';
  heartsBg.appendChild(el);
  setTimeout(() => el.remove(), (dur + 4) * 1000);
}
setInterval(spawnHeart, 600);
for (let i = 0; i < 10; i++) spawnHeart();

// ── Falling Petals ───────────────────────────────────────────
const petalsContainer = document.getElementById('petalsContainer');
function spawnPetal() {
  const el = document.createElement('div');
  el.className = 'petal';
  el.style.left = Math.random() * 100 + 'vw';
  const dur = 5 + Math.random() * 7;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = (Math.random() * 5) + 's';
  el.style.width = el.style.height = (8 + Math.random() * 12) + 'px';
  el.style.opacity = 0.4 + Math.random() * 0.5;
  petalsContainer.appendChild(el);
  setTimeout(() => el.remove(), (dur + 5) * 1000);
}
setInterval(spawnPetal, 800);
for (let i = 0; i < 8; i++) spawnPetal();

// ── Big Heart Click Counter ──────────────────────────────────
const bigHeart = document.getElementById('bigHeart');
const heartCounter = document.getElementById('heartCounter');
let kisses = 0;

bigHeart.addEventListener('click', () => {
  kisses++;
  heartCounter.textContent = `${kisses} ${kisses === 1 ? 'kiss' : 'kisses'} sent ✨`;

  // Burst animation
  bigHeart.style.animation = 'none';
  bigHeart.style.transform = 'scale(1.4)';
  setTimeout(() => {
    bigHeart.style.transform = '';
    bigHeart.style.animation = 'heartPulse 2s ease infinite';
  }, 150);

  // Spawn mini burst hearts
  for (let i = 0; i < 6; i++) spawnBurstHeart();
});

function spawnBurstHeart() {
  const el = document.createElement('span');
  el.textContent = '💖';
  el.style.cssText = `
    position: fixed;
    pointer-events: none;
    font-size: ${0.8 + Math.random() * 1.2}rem;
    left: 50%;
    top: 50%;
    z-index: 999;
    animation: burstFly 1s ease forwards;
    --tx: ${(Math.random() - 0.5) * 200}px;
    --ty: ${-(60 + Math.random() * 120)}px;
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// Inject burst animation
const burstStyle = document.createElement('style');
burstStyle.textContent = `
  @keyframes burstFly {
    0%   { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
  }
`;
document.head.appendChild(burstStyle);

// ── Intersection Observer: fade-in sections ──────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section:not(.hero)').forEach(sec => {
  sec.style.opacity = '0';
  sec.style.transform = 'translateY(30px)';
  sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(sec);
});
