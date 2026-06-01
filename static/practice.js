// =====================
// practice.js — SRS Flashcard Logic
// Implements SM-2 algorithm with localStorage persistence.
// Supports both verb-generated cards and raw Anki import cards.
// No external dependencies. Vanilla JS only.
// =====================

const DECK_KEY = "srs_deck";

// =====================
// SM-2 ALGORITHM
// rating: 0 = total blackout, 5 = perfect recall
// Returns updated card scheduling fields.
// =====================
function sm2(easeFactor, interval, repetitions, rating) {
  rating = Math.max(0, Math.min(5, rating));

  let newInterval, newRepetitions;

  if (rating >= 3) {
    // Correct response
    if (repetitions === 0)       newInterval = 1;
    else if (repetitions === 1)  newInterval = 6;
    else                         newInterval = Math.round(interval * easeFactor);
    newRepetitions = repetitions + 1;
  } else {
    // Incorrect — reset to start
    newInterval    = 1;
    newRepetitions = 0;
  }

  // Ease factor adjustment (floor 1.3 so cards never become unlearnable)
  let newEaseFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
  newEaseFactor = Math.max(1.3, newEaseFactor);

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    easeFactor:     parseFloat(newEaseFactor.toFixed(4)),
    interval:       newInterval,
    repetitions:    newRepetitions,
    nextReviewDate: nextReviewDate.toISOString().slice(0, 10), // YYYY-MM-DD
  };
}

// =====================
// DECK HELPERS
// =====================

function loadDeck() {
  try {
    return JSON.parse(localStorage.getItem(DECK_KEY)) || [];
  } catch {
    return [];
  }
}

function saveDeck(deck) {
  localStorage.setItem(DECK_KEY, JSON.stringify(deck));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function getDueCards() {
  const t = today();
  return loadDeck().filter(card => card.nextReviewDate <= t);
}

// =====================
// CARD SCHEMA
// Every card — whether from a verb lookup or an Anki import — uses this shape:
// {
//   id:             string  — unique key (verb string for verb cards, "anki_<noteId>" for imports)
//   label:          string  — short plain-text label shown in the deck list
//   front:          string  — HTML shown on the question side
//   back:           string  — HTML shown on the answer side
//   source:         string  — "verb" | "anki"
//   easeFactor:     number
//   interval:       number  (days)
//   repetitions:    number
//   nextReviewDate: string  (YYYY-MM-DD)
//   addedDate:      string  (YYYY-MM-DD)
// }
// =====================

function _newCardDefaults(id, label, front, back, source) {
  return {
    id,
    label,
    front,
    back,
    source,
    easeFactor:     2.5,
    interval:       1,
    repetitions:    0,
    nextReviewDate: today(),
    addedDate:      today(),
  };
}

// =====================
// ADD VERB CARD
// Calls /practice/conjugate/<verb> to validate and get front/back HTML.
// =====================
async function addVerbCard(verb) {
  verb = verb.trim();
  if (!verb) return { ok: false, error: "empty input" };

  const deck = loadDeck();
  if (deck.find(c => c.id === verb)) {
    return { ok: false, error: "already in deck" };
  }

  const res  = await fetch(`/practice/conjugate/${encodeURIComponent(verb)}`);
  const data = await res.json();
  if (!data.ok) return { ok: false, error: data.error };

  deck.push(_newCardDefaults(data.id, data.label, data.front, data.back, "verb"));
  saveDeck(deck);
  return { ok: true, label: data.label };
}

// =====================
// REVIEW CARD
// Runs SM-2 on a card by id and saves the result.
// =====================
function reviewCard(id, rating) {
  const deck = loadDeck();
  const idx  = deck.findIndex(c => c.id === id);
  if (idx === -1) return;

  const card   = deck[idx];
  const result = sm2(card.easeFactor, card.interval, card.repetitions, rating);
  deck[idx]    = { ...card, ...result };
  saveDeck(deck);
}

// =====================
// ANKI .APKG IMPORT
// POSTs the file to /practice/import (server-side parsing).
// Server returns card objects with front/back HTML already built.
// We merge them into the deck, skipping duplicates.
// =====================
async function importApkg(file) {
  const formData = new FormData();
  formData.append("deck", file);

  const res  = await fetch("/practice/import", { method: "POST", body: formData });
  const data = await res.json();

  if (!data.ok) return { ok: false, error: data.error };

  const deck = loadDeck();
  let imported = 0, skipped = 0;

  data.cards.forEach(c => {
    if (deck.find(existing => existing.id === c.id)) {
      skipped++;
      return;
    }
    deck.push(_newCardDefaults(c.id, c.label, c.front, c.back, "anki"));
    imported++;
  });

  saveDeck(deck);
  return {
    ok:          true,
    imported,
    skipped,
    media_saved: data.media_saved,
  };
}

// =====================
// UI STATE
// =====================

let sessionQueue    = [];
let sessionIndex    = 0;
let sessionReviewed = 0;

function showView(id) {
  ["view-deck", "view-review", "view-done"].forEach(v => {
    document.getElementById(v).style.display = v === id ? "" : "none";
  });
}

// =====================
// DECK VIEW
// =====================

function updateDeckView() {
  const due   = getDueCards().length;
  const total = loadDeck().length;
  document.getElementById("due-count").textContent   = due;
  document.getElementById("total-count").textContent = total;

  const listEl = document.getElementById("deck-list");
  listEl.innerHTML = "";
  const deck = loadDeck();

  if (deck.length === 0) {
    listEl.innerHTML = "<li style='color:#888'>No cards yet.</li>";
    return;
  }

  deck.forEach(card => {
    const li     = document.createElement("li");
    const isDue  = card.nextReviewDate <= today();
    const source = card.source === "anki" ? " <span style='color:#88f;font-size:0.75em'>[anki]</span>" : "";

    li.innerHTML = `
      <span>${card.label}${source}</span>
      <span style="color:${isDue ? "#e07" : "#888"}; font-size:0.85em; margin-left:auto">
        ${isDue ? "due" : "next: " + card.nextReviewDate}
      </span>
      <button data-id="${card.id}" class="remove-btn" style="cursor:pointer; margin-left:8px">✕</button>
    `;
    listEl.appendChild(li);
  });

  listEl.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      saveDeck(loadDeck().filter(c => c.id !== btn.dataset.id));
      updateDeckView();
    });
  });
}

// =====================
// REVIEW SESSION
// =====================

async function startReview() {
  sessionQueue    = getDueCards();
  sessionIndex    = 0;
  sessionReviewed = 0;

  if (sessionQueue.length === 0) {
    alert("No cards due today!");
    return;
  }

  showView("view-review");
  loadReviewCard();
}

function loadReviewCard() {
  const card = sessionQueue[sessionIndex];

  document.getElementById("review-progress").textContent =
    `${sessionIndex + 1} / ${sessionQueue.length}`;

  // Front side
  document.getElementById("review-front").innerHTML = card.front;

  // Hide answer + ratings until user clicks Show Answer
  document.getElementById("review-answer").style.display  = "none";
  document.getElementById("review-rating").style.display  = "none";
  document.getElementById("show-answer-btn").style.display = "";
}

function showAnswer() {
  const card = sessionQueue[sessionIndex];

  document.getElementById("show-answer-btn").style.display = "none";
  document.getElementById("review-answer").innerHTML       = card.back;
  document.getElementById("review-answer").style.display  = "";
  document.getElementById("review-rating").style.display  = "";
}

function rateCard(rating) {
  const card = sessionQueue[sessionIndex];
  reviewCard(card.id, rating);
  sessionReviewed++;
  sessionIndex++;

  if (sessionIndex >= sessionQueue.length) {
    document.getElementById("done-count").textContent = sessionReviewed;
    showView("view-done");
    updateDeckView();
    return;
  }

  loadReviewCard();
}

// =====================
// INIT
// =====================
document.addEventListener("DOMContentLoaded", () => {
  updateDeckView();
  showView("view-deck");

  // Add verb card manually
  document.getElementById("add-btn").addEventListener("click", async () => {
    const input    = document.getElementById("add-input");
    const statusEl = document.getElementById("add-status");
    statusEl.textContent = "Checking…";

    const result = await addVerbCard(input.value);
    if (result.ok) {
      statusEl.textContent = `✓ Added: ${result.label}`;
      input.value = "";
      updateDeckView();
    } else {
      statusEl.textContent = `✗ ${result.error}`;
    }
  });

  document.getElementById("add-input").addEventListener("keydown", e => {
    if (e.key === "Enter") document.getElementById("add-btn").click();
  });

  // Start review session
  document.getElementById("start-review-btn").addEventListener("click", startReview);

  // Exit review → back to deck
  document.getElementById("exit-review-btn").addEventListener("click", () => {
    showView("view-deck");
    updateDeckView();
  });

  // Show answer
  document.getElementById("show-answer-btn").addEventListener("click", showAnswer);

  // Rating buttons — Again / Hard / Good / Easy → SM-2 ratings 1 / 2 / 4 / 5
  document.getElementById("btn-again").addEventListener("click", () => rateCard(1));
  document.getElementById("btn-hard").addEventListener("click",  () => rateCard(2));
  document.getElementById("btn-good").addEventListener("click",  () => rateCard(4));
  document.getElementById("btn-easy").addEventListener("click",  () => rateCard(5));

  // Done → back to deck
  document.getElementById("back-to-deck-btn").addEventListener("click", () => {
    showView("view-deck");
    updateDeckView();
  });

  // Anki .apkg import
  document.getElementById("anki-import-input").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const statusEl = document.getElementById("anki-import-status");
    statusEl.textContent = "Importing… (this may take a moment for large decks)";

    const result = await importApkg(file);
    e.target.value = ""; // reset so same file can be re-uploaded

    if (!result.ok) {
      statusEl.textContent = `✗ ${result.error}`;
      return;
    }

    let msg = `✓ Imported ${result.imported} card(s).`;
    if (result.skipped)      msg += ` ${result.skipped} already in deck.`;
    if (result.media_saved)  msg += ` ${result.media_saved} media file(s) saved.`;
    statusEl.textContent = msg;
    updateDeckView();
  });
});
