document.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  // Remove any existing overlay before creating a new one
  const existingOverlay = document.querySelector(".attribute-overlay");
  if (existingOverlay) {
    existingOverlay.remove();
  }

  const element = event.target;

  const attributes = Array.from(element.attributes).map(attr => {
    return `${attr.name}: ${attr.value}`;
  }).join("\n");

  const overlay = document.createElement("div");
  overlay.classList.add("attribute-overlay");

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.classList.add("close-button");
  closeButton.onclick = () => overlay.remove();

  const pre = document.createElement("pre");
  pre.textContent = attributes;

  overlay.appendChild(closeButton);
  overlay.appendChild(pre);
  document.body.appendChild(overlay);

  // Add event listener for clicks outside the overlay
  document.addEventListener("click", (e) => {
    if (!overlay.contains(e.target) && e.target !== element) {
      overlay.remove();
    }
  }, { once: true });
});
