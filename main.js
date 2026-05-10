// No imports needed for static version (using CDNs)

// Prevent browser from auto-restoring scroll position on load
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Global YouTube API player variable
let player;

document.addEventListener("DOMContentLoaded", () => {
  // --- Sparks Generator (Canvas Optimized for Performance) ---
  const sparksContainer = document.getElementById("sparks");
  if (sparksContainer) {
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    sparksContainer.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    let width, height;
    const sparks = [];
    
    const resize = () => {
      width = canvas.width = sparksContainer.offsetWidth;
      height = canvas.height = sparksContainer.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();
    
    class Spark {
      constructor() {
        this.init();
      }
      init() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * height;
        this.size = 1 + Math.random() * 2;
        this.speedY = 1 + Math.random() * 2;
        this.speedX = -0.5 + Math.random() * 1;
        this.opacity = 0.3 + Math.random() * 0.5;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y > height) this.init();
      }
      draw() {
        ctx.fillStyle = `rgba(197, 160, 89, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    for (let i = 0; i < 50; i++) sparks.push(new Spark());
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      sparks.forEach(s => {
        s.update();
        s.draw();
      });
      requestAnimationFrame(animate);
    };
    animate();
  }

  // --- Countdown Timer ---
  const weddingDate = new Date("May 29, 2026 20:00:00").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      const countdownEl = document.getElementById("countdown");
      if (countdownEl) countdownEl.innerHTML = "<h3>The Celebration has Begun!</h3>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById("days");
    const hEl = document.getElementById("hours");
    const mEl = document.getElementById("minutes");
    const sEl = document.getElementById("seconds");

    if (dEl) dEl.innerText = days.toString().padStart(2, "0");
    if (hEl) hEl.innerText = hours.toString().padStart(2, "0");
    if (mEl) mEl.innerText = minutes.toString().padStart(2, "0");
    if (sEl) sEl.innerText = seconds.toString().padStart(2, "0");
  };

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // --- QR Code Generation (Reliable Fallback) ---
  const generateQR = () => {
    const qrContainer = document.querySelector(".qr-container");
    const currentUrl = window.location.href;

    // Use an Image API as the primary method because it's much more reliable
    const qrImg = document.createElement("img");
    qrImg.id = "qrcode-img";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(currentUrl)}&color=4a3728`;
    qrImg.alt = "QR Code";
    qrImg.style.width = "160px";
    qrImg.style.height = "160px";
    qrImg.style.borderRadius = "10px";
    qrImg.style.padding = "8px";
    qrImg.style.background = "white";
    qrImg.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
    
    const existingCanvas = document.getElementById("qrcode");
    if (existingCanvas) {
      existingCanvas.parentNode.replaceChild(qrImg, existingCanvas);
    }
  };
  generateQR();

  // --- Particle container (prevents overflow) ---
  const particleOverlay = document.getElementById('particle-overlay');

  // --- Flower Effect ---
  function spawnFlowers(e, button = null, count = 12) {
    let x, y;
    if (button) {
      const rect = button.getBoundingClientRect();
      x = e.clientX || (rect.left + rect.width / 2);
      y = e.clientY || (rect.top + rect.height / 2);
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    
    if (!x || !y) return;

    const emojis = ['🌸', '🌺', '🌹', '🌼', '✨'];

    for (let i = 0; i < count; i++) {
      const flower = document.createElement("div");
      flower.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      flower.className = "flower-particle";
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 30 + Math.random() * 60;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 30;
      
      flower.style.left = `${x}px`;
      flower.style.top = `${y}px`;
      flower.style.setProperty("--tx", `${tx}px`);
      flower.style.setProperty("--ty", `${ty}px`);
      
      particleOverlay.appendChild(flower);
      setTimeout(() => flower.remove(), 1500);
    }
  }

  // --- Gold Sparks Effect (For Buttons) ---
  function spawnGoldSparks(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX || (rect.left + rect.width / 2);
    const y = e.clientY || (rect.top + rect.height / 2);

    for (let i = 0; i < 20; i++) {
      const spark = document.createElement("div");
      spark.className = "gold-spark";
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = 40 + Math.random() * 100;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity - 60;
      
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.setProperty("--tx", `${tx}px`);
      spark.style.setProperty("--ty", `${ty}px`);
      spark.style.backgroundColor = Math.random() > 0.5 ? '#b8860b' : '#e0c58c';
      
      particleOverlay.appendChild(spark);
      setTimeout(() => spark.remove(), 1000);
    }
  }

  // Global Page Click Flower Effect
  document.body.addEventListener("click", (e) => {
    // Only spawn global flowers if they didn't click a specific button (which have their own bigger bursts)
    if (!e.target.closest('button') && !e.target.closest('.audio-control') && !e.target.closest('a')) {
      spawnFlowers(e, null, 4); // Small burst of 4 flowers for general taps
    }
  });

  // --- Share Functionality ---
  const shareBtn = document.getElementById("copy-link");
  if (shareBtn) {
    shareBtn.addEventListener("click", async (e) => {
      spawnGoldSparks(e, shareBtn);
      const currentUrl = window.location.href;
      
      const updateButtonState = () => {
        const originalText = shareBtn.innerText;
        shareBtn.innerText = "Link Copied!";
        shareBtn.classList.remove("btn-primary");
        shareBtn.classList.add("btn-gold");
        
        setTimeout(() => {
          shareBtn.innerText = originalText;
          shareBtn.classList.remove("btn-gold");
          shareBtn.classList.add("btn-primary");
        }, 2000);
      };

      // Try modern clipboard API first
      let copied = false;
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(currentUrl);
          copied = true;
        } catch (err) {
          console.error("Clipboard API failed:", err);
        }
      }

      // Fallback for non-HTTPS local testing or older mobile browsers
      if (!copied) {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = currentUrl;
          textArea.style.position = "fixed"; // Avoid scrolling
          textArea.style.left = "-999999px";
          textArea.style.top = "-999999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          if (successful) copied = true;
        } catch (err) {
          console.error("execCommand copy failed:", err);
        }
      }

      if (copied) {
        updateButtonState();
      }

      // Then try native share if available
      if (navigator.share) {
        try {
          await navigator.share({
            title: "دعوة زفاف مجتبى وإيثار",
            text: "يسعدنا دعوتكم لحضور حفل زفافنا. انضموا إلينا للاحتفال!",
            url: currentUrl,
          });
        } catch (err) {
          console.error("Share failed:", err);
        }
      }
    });
  }

  // --- RSVP / Confetti ---
  const rsvpBtn = document.getElementById("rsvp-btn");
  if (rsvpBtn) {
    rsvpBtn.addEventListener("click", (e) => {
      spawnGoldSparks(e, rsvpBtn);
      rsvpBtn.innerText = "Thank You! See You There";
      rsvpBtn.disabled = true;
    });
  }

  // --- YouTube Audio Toggle (no API - simple src toggle) ---
  const audioToggle = document.getElementById("audio-toggle");
  const ytFrame = document.getElementById("yt-music-player");
  const YT_SRC = "https://www.youtube.com/embed/Qe2G6Vs1V_Q?autoplay=1&controls=0&loop=1&playlist=Qe2G6Vs1V_Q&start=45&rel=0&iv_load_policy=3&mute=0";
  let musicPlaying = false;
  let userInteracted = false;

  const startMusic = () => {
    if (!musicPlaying && ytFrame) {
      ytFrame.src = YT_SRC;
      if (audioToggle) audioToggle.classList.add("playing");
      musicPlaying = true;
    }
  };

  if (audioToggle && ytFrame) {
    // Start with src empty so no autoplay error in console
    ytFrame.src = "";

    audioToggle.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent global click from firing
      musicPlaying = !musicPlaying;
      if (musicPlaying) {
        ytFrame.src = YT_SRC;
        audioToggle.classList.add("playing");
      } else {
        ytFrame.src = "";
        audioToggle.classList.remove("playing");
      }
    });
  }

  // Attempt to autoplay immediately on load
  setTimeout(() => {
    startMusic();
  }, 500);

});


