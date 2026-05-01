console.log("inventory.js loaded");

document.addEventListener("DOMContentLoaded", function () {
  console.log("inventory DOM ready");

  var container = document.getElementById("cards");

  if (!container) {
    console.log("Cards container NOT found");
    return;
  }

  browser.storage.local.get("cards").then(function (result) {
    console.log("Loaded storage:", result);

    var savedCards = result.cards || [];

    console.log("Saved cards:", savedCards);

    for (var i = 0; i < savedCards.length; i++) {
      var card = savedCards[i];

      console.log("Rendering card:", card);

      var img = document.createElement("img");
      img.src = card.img;
      img.className = "cardimg";

      container.appendChild(img);
    }
  }).catch(function (err) {
    console.log("Storage error:", err);
  });
});