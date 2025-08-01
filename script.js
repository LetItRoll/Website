document.addEventListener("DOMContentLoaded", () => {
  // ===== Burger Menu Toggle =====
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav-menu");

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    burger.classList.toggle("active");
    navMenu.classList.toggle("active");
    window.scrollTo({ top: 0 });
  });

  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !burger.contains(e.target)
    ) {
      burger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });

  // Listeners top left bar
  document.getElementById("letItRoll").addEventListener("click", () => {
    window.location.href = "index.html";
  });
  document.getElementById("autoSchool").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("siteLogo");
    if (logo) {
      logo.style.cursor = "pointer"; // optional: show clickable cursor
      logo.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }
  });

  // ===== Hide current page link in menu =====
  let current = window.location.pathname.split("/").pop();
  if (!current) current = "index.html";

  document.querySelectorAll("#nav-menu a").forEach((link) => {
    const href = link
      .getAttribute("href")
      .split("/")
      .pop()
      .split("#")[0]
      .split("?")[0];
    link.style.display = href === current ? "none" : "";
  });

  // ===== Testimonials Carousel =====
  let idx = 0;
  const testimonials = document.querySelectorAll(".testimonial");
  if (testimonials.length > 0) {
    testimonials[0].classList.add("active");
    setInterval(() => {
      testimonials[idx].classList.remove("active");
      idx = (idx + 1) % testimonials.length;
      testimonials[idx].classList.add("active");
    }, 4000);
  }

  // ===== FAQ Modal =====
  const faqBtn = document.getElementById("faq-btn");
  const faqModal = document.getElementById("faq-modal");
  const faqClose = document.getElementById("faq-close");

  if (faqBtn && faqModal && faqClose) {
    faqBtn.addEventListener("click", () => faqModal.classList.add("active"));
    faqClose.addEventListener("click", () =>
      faqModal.classList.remove("active")
    );
    faqModal.addEventListener("click", (e) => {
      if (!e.target.closest("a")) faqModal.classList.remove("active");
    });
  }

  // ===== Photo Gallery Modal =====
  const imageCount = 73;
  const gallery = document.getElementById("photoGallery");
  const modal = document.getElementById("modal1");
  const imgEl = document.getElementById("modal1Image");
  let currentIdx = 0;

  if (gallery && modal && imgEl) {
    for (let i = 1; i <= imageCount; i++) {
      const thumb = document.createElement("img");
      thumb.src = `Images/Passed/Passed_Test_${i}.jpg`;
      thumb.dataset.index = i - 1;
      thumb.addEventListener("click", openModal);
      gallery.appendChild(thumb);
    }

    function openModal(e) {
      currentIdx = +e.target.dataset.index;
      showImage();
      modal.classList.add("open");
    }

    function closeModal() {
      modal.classList.remove("open");
    }

    function showImage() {
      imgEl.src = `Images/Passed/Passed_Test_${currentIdx + 1}.jpg`;
    }

    function prev() {
      currentIdx = (currentIdx - 1 + imageCount) % imageCount;
      showImage();
    }

    function next() {
      currentIdx = (currentIdx + 1) % imageCount;
      showImage();
    }

    document.getElementById("modal1Close").onclick = closeModal;
    document.getElementById("modal1Prev").onclick = prev;
    document.getElementById("modal1Next").onclick = next;

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Swipe
    let startX = null;
    modal.addEventListener(
      "touchstart",
      (e) => (startX = e.touches[0].clientX)
    );
    modal.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 50) prev();
      else if (diff < -50) next();
      startX = null;
    });
  }
});

/* Swipe handler logic */
function showImage(direction) {
  imgEl.classList.remove("slide-in-left", "slide-in-right");
  void imgEl.offsetWidth; // force reflow
  imgEl.src = `Images/Passed/Passed_Test_${currentIdx + 1}.jpg`;
  imgEl.classList.add(
    direction === "next" ? "slide-in-right" : "slide-in-left"
  );
}

// In your touchend handler:
if (diff > 50) {
  prev();
  showImage("prev");
}
if (diff < -50) {
  next();
  showImage("next");
}

document.querySelectorAll("[data-link]").forEach((sec) => {
  sec.style.cursor = "pointer";
  sec.addEventListener("click", () => {
    window.location.href = sec.dataset.link;
  });
});
