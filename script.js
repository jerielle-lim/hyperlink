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

  // Compact Liquid Glass Menu Logic
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const overlayMenu = document.querySelector('.overlay-menu');

  if (hamburgerBtn && overlayMenu) {
    // Toggle menu on hamburger click
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevents document click from instantly firing
      overlayMenu.classList.toggle('active');
    });

    // Close menu when clicking anywhere outside of it
    document.addEventListener('click', (e) => {
      if (!overlayMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        overlayMenu.classList.remove('active');
      }
    });
  }
});
