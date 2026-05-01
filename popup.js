console.log("popup loaded");

document.addEventListener("DOMContentLoaded", init);

function init() {
  setupInventoryButton();
  runCardSystem();
}

function setupInventoryButton() {
  document.getElementById("viewInventoryBtn")
    .addEventListener("click", function () {
      browser.tabs.create({
        url: browser.runtime.getURL("inventory.html")
      });
    });
}

function runCardSystem() {
  fetch(browser.runtime.getURL("data/cards.json"))
    .then(res => res.json())
    .then(data => getCurrentTab(data));
}

function getCurrentTab(data) {
  browser.tabs.query({ active: true, currentWindow: true })
    .then(tabs => {
      var url = tabs[0].url;

      var card = findCard(url, data);

      if (card) {
        renderUI(card);
        saveCard(card);
      }
    });
}

function findCard(url, data) {
  var keys = Object.keys(data);

  for (var i = 0; i < keys.length; i++) {
    var site = keys[i];

    if (url.includes(site)) {
      var card = data[site];
      card.site = site;
      return card;
    }
  }

  return null;
}

function renderUI(card) {
  document.getElementById("text").innerText = card.card;

  var img = document.getElementById("img");
  if (img && card.img) {
    img.src = card.img;
  }
}

function saveCard(card) {
  browser.storage.local.get("cards").then(result => {
    var saved = result.cards || [];

    var exists = false;

    for (var i = 0; i < saved.length; i++) {
      if (saved[i].site === card.site) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      saved.push(card);
      browser.storage.local.set({ cards: saved });
    }
  });
}