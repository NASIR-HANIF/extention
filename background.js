chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "showAttributes",
    title: "Show Element Attributes",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "showAttributes") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: displayAttributes
    });
  }
});

function displayAttributes() {
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();

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

    document.addEventListener("click", (e) => {
      if (!overlay.contains(e.target) && e.target !== element) {
        overlay.remove();
      }
    }, { once: true });
  });
}
