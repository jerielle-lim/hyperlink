document.addEventListener("DOMContentLoaded", () => {

  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      const parent = btn.closest(".tab-container");

      parent.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      parent.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      parent.querySelector(`#${target}`).classList.add("active");
    });
  });

  const castTrack = document.getElementById("castTrack");
  const castPrev = document.getElementById("castPrev");
  const castNext = document.getElementById("castNext");

  if (castTrack) {
    const scrollStep = () => {
      const card = castTrack.querySelector(".cast-card");
      const gap = 22;
      return card ? card.getBoundingClientRect().width + gap : 240;
    };

    if (castPrev) {
      castPrev.addEventListener("click", () => {
        castTrack.scrollBy({ left: -scrollStep(), behavior: "smooth" });
      });
    }
    if (castNext) {
      castNext.addEventListener("click", () => {
        castTrack.scrollBy({ left: scrollStep(), behavior: "smooth" });
      });
    }

    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    castTrack.addEventListener("mousedown", (e) => {
      isDown = true;
      castTrack.classList.add("dragging");
      startX = e.pageX;
      startScroll = castTrack.scrollLeft;
    });
    window.addEventListener("mouseup", () => {
      isDown = false;
      castTrack.classList.remove("dragging");
    });
    castTrack.addEventListener("mouseleave", () => {
      isDown = false;
      castTrack.classList.remove("dragging");
    });
    castTrack.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const delta = e.pageX - startX;
      castTrack.scrollLeft = startScroll - delta;
    });
  }

  const joinBtn = document.getElementById("joinBtn");
  const hoverText = document.getElementById("hoverText");

  if (joinBtn && hoverText) {
    joinBtn.addEventListener("mouseenter", () => {
      hoverText.style.display = "block";
      hoverText.style.textTransform = "uppercase";
      hoverText.style.color = "var(--maroon-vibrant)";
      hoverText.style.fontWeight = "bold";
      hoverText.style.transform = "scale(1.05)";
    });

    joinBtn.addEventListener("mouseleave", () => {
      hoverText.style.display = "none";
      hoverText.style.textTransform = "none";
      hoverText.style.transform = "scale(1)";
    });
  }

  const modal = document.createElement("div");
  modal.style.cssText = "display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(0,0,0,0.9); z-index:9999; justify-content:center; align-items:center;";
  modal.innerHTML = '<img style="max-width:90%; max-height:90vh; border-radius:10px;" src="">';
  document.body.appendChild(modal);

  const modalImg = modal.querySelector("img");
  document.querySelectorAll(".gallery-img").forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      modalImg.src = img.src;
      modal.style.display = "flex";
    });
  });
  
  modal.addEventListener("click", () => modal.style.display = "none");

  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const overlayMenu = document.querySelector('.overlay-menu');
  const closeBtn = document.querySelector('.close-btn');

  if (hamburgerBtn && overlayMenu) {

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      overlayMenu.classList.toggle('active');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        overlayMenu.classList.remove('active');
      });
    }

    document.addEventListener('click', (e) => {
      if (!overlayMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        overlayMenu.classList.remove('active');
      }
    });
  }
});
