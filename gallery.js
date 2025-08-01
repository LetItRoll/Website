const imageCount = 73;
const gallery = document.getElementById("photoGallery");
const modal = document.getElementById("modal1");
const imgEl = document.getElementById("modal1Image");
let idx = 0;

// Populate thumbnails
for (let i = 1; i <= imageCount; i++) {
  const thumb = document.createElement("img");
  thumb.src = `Images/Passed/Passed_Test_${i}.jpg`;
  thumb.dataset.index = i - 1;
  thumb.addEventListener("click", openModal);
  gallery.appendChild(thumb);
}

function openModal(e) {
  idx = +e.target.dataset.index;
  show();
  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
}
function show() {
  imgEl.src = `Images/Passed/Passed_Test_${idx + 1}.jpg`;
}
function prev() {
  idx = (idx - 1 + imageCount) % imageCount;
  show();
}
function next() {
  idx = (idx + 1) % imageCount;
  show();
}

// Event listeners
document.getElementById("modal1Close").onclick = closeModal;
document.getElementById("modal1Prev").onclick = prev;
document.getElementById("modal1Next").onclick = next;

// Close on backdrop
modal.onclick = (e) => {
  if (e.target === modal) closeModal();
};

// Swipe
let startX = null;
modal.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
modal.addEventListener("touchend", (e) => {
  if (startX === null) return;
  const diff = e.changedTouches[0].clientX - startX;
  if (diff > 50) prev();
  if (diff < -50) next();
  startX = null;
});
