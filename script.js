const DATA = {
  "Website Design": {
    type: "per_unit",
    variations: [
      { id: "web_basic", name: "Basic Static Website", price: 15000 },
      { id: "web_cms", name: "Dynamic CMS Website", price: 25000 },
      { id: "web_ecom", name: "E-commerce Website", price: 40000 },
      { id: "web_custom", name: "Custom Web Application", price: 60000 },
    ],
    addons: [
      { id: "seo", name: "SEO Setup", price: 5000 },
      { id: "responsive", name: "Mobile Responsiveness", price: 3000 },
      { id: "payment", name: "Payment Gateway Integration", price: 8000 },
      { id: "multilang", name: "Additional Language Support", price: 7000 },
      {
        id: "maintenance",
        name: "Monthly Maintenance (first month)",
        price: 2500,
      },
    ],
    note: "Per page pricing: change Units for number of pages.",
  },
  "ERP Software": {
    type: "package",
    variations: [
      { id: "erp_basic", name: "Basic ERP (Single Module)", price: 80000 },
      { id: "erp_standard", name: "Standard ERP (3–5 Modules)", price: 150000 },
      {
        id: "erp_advanced",
        name: "Advanced ERP (Custom Modules)",
        price: 250000,
      },
    ],
    addons: [
      { id: "cloud", name: "Cloud Hosting Setup", price: 15000 },
      { id: "api", name: "API Integration (per API)", price: 10000 },
      { id: "multiuser", name: "Multi-User License", price: 20000 },
      { id: "migration", name: "Data Migration", price: 25000 },
      { id: "training", name: "Training Session", price: 5000 },
    ],
    note: "Package pricing: set Units to 1 unless requesting multiple deployments.",
  },
  "Slot / Casino Game": {
    type: "package",
    variations: [
      { id: "slot_single", name: "Single Game (Basic)", price: 45000 },
      { id: "slot_pack", name: "3-in-1 Game Pack", price: 120000 },
      { id: "slot_suite", name: "Full Casino Suite", price: 300000 },
    ],
    addons: [
      { id: "art", name: "Custom Artwork & Animation", price: 20000 },
      { id: "multiplayer", name: "Multiplayer Mode", price: 35000 },
      { id: "leader", name: "Leaderboards & Tournaments", price: 25000 },
      { id: "wallet", name: "Payment / Wallet Integration", price: 15000 },
      { id: "marketing", name: "Marketing Website for Game", price: 30000 },
    ],
    note: "Package pricing: set Units to 1.",
  },
  "Ludo Game": {
    type: "package",
    variations: [
      { id: "ludo_2p", name: "2 Players Ludo Game", price: 35000 },
      { id: "ludo_3p", name: "3 Players Ludo Game", price: 45000 },
      { id: "ludo_4p", name: "4 Players Ludo Game", price: 55000 },
      { id: "ludo_pvc", name: "Player vs Computer", price: 60000 },
    ],
    addons: [
      { id: "board", name: "Custom Board & Tokens Design", price: 8000 },
      { id: "online", name: "Online Multiplayer", price: 20000 },
      { id: "chat", name: "Chat & Emoji Reactions", price: 6000 },
      { id: "coin", name: "Coin/Point System", price: 12000 },
      { id: "l_leader", name: "Leaderboard & Rewards", price: 10000 },
      { id: "l_payment", name: "Payment Gateway Integration", price: 15000 },
      { id: "builds", name: "Android + iOS Build", price: 18000 },
    ],
    note: "Ludo packages: choose variant and add optional features.",
  },
};

/* Initialize DOM references */
const serviceEl = document.getElementById("service");
const variationEl = document.getElementById("variation");
const unitsEl = document.getElementById("units");
const complexityEl = document.getElementById("complexity");
const urgencyEl = document.getElementById("urgency");
const addonsContainer = document.getElementById("addons");
const currencyEl = document.getElementById("currency");
const priceEl = document.getElementById("price");
const breakList = document.getElementById("break-list");
const subTotalEl = document.getElementById("sub-total");
const addonsTotalEl = document.getElementById("addons-total");
const multTotalEl = document.getElementById("mult-total");
const grandTotalEl = document.getElementById("grand-total");
const serviceBadge = document.getElementById("service-badge");
const ludoVariant = document.getElementById("ludoVariant");
const savedNote = document.getElementById("saved-note");
const discountSection = document.getElementById("discount-section");
const discountAmount = document.getElementById("discount-amount");

/* Currency conversion utilities */
function convertCurrency(inrAmount, targetCurrency) {
  if (targetCurrency === "USD") {
    const rate = 83; // approximate USD to INR rate
    return inrAmount / rate;
  }
  return inrAmount; // return as INR
}

function getCurrencySymbol(currency) {
  return currency === "USD" ? "$" : "₹";
}

function formatCurrencyAmount(amount, currency) {
  const symbol = getCurrencySymbol(currency);
  const convertedAmount = convertCurrency(amount, currency);

  if (currency === "USD") {
    return `${symbol}${formatNumber(convertedAmount)}`;
  } else {
    return `${symbol}${formatNumber(convertedAmount)}`;
  }
}

/* Calculate discount based on amount (in INR) */
function calculateDiscount(amount) {
  if (amount >= 200000) {
    return { rate: 0.15, amount: Math.round(amount * 0.15) };
  } else if (amount >= 100000) {
    return { rate: 0.12, amount: Math.round(amount * 0.12) };
  } else if (amount >= 50000) {
    return { rate: 0.08, amount: Math.round(amount * 0.08) };
  }
  return { rate: 0, amount: 0 };
}

/* Populate service dropdown - keep it clean and simple */
function populateServices() {
  serviceEl.innerHTML = "";
  Object.keys(DATA).forEach((k) => {
    const opt = document.createElement("option");
    opt.value = k;
    opt.textContent = k;
    serviceEl.appendChild(opt);
  });
}

/* When service changes, update variations and addons */
function onServiceChange() {
  const service = serviceEl.value;
  const currency = currencyEl.value;
  serviceBadge.textContent = service;
  const meta = DATA[service];

  // variations - clean approach without excessive styling
  variationEl.innerHTML = "";
  meta.variations.forEach((v) => {
    const o = document.createElement("option");
    o.value = v.id;
    o.dataset.price = v.price;
    o.textContent = `${v.name} — ${formatCurrencyAmount(v.price, currency)}`;
    variationEl.appendChild(o);
  });

  // addons - simple checkbox layout
  addonsContainer.innerHTML = "";
  meta.addons.forEach((a) => {
    const label = document.createElement("label");
    label.className = "checkbox-inline";
    label.innerHTML = `<input type="checkbox" data-price="${a.price}" value="${
      a.id
    }" onchange="recalculate()" /> <span>${a.name} (${formatCurrencyAmount(
      a.price,
      currency
    )})</span>`;
    addonsContainer.appendChild(label);
  });

  // Ludo special variant control
  if (service === "Ludo Game") {
    ludoVariant.style.display = "block";
    ludoVariant.innerHTML = '<option value="0">— choose Ludo variant —</option>';
    
    DATA["Ludo Game"].variations.forEach((v) => {
      const o = document.createElement("option");
      o.value = v.id;
      o.dataset.price = v.price;
      o.textContent = `${v.name} — ${formatCurrencyAmount(v.price, currency)}`;
      ludoVariant.appendChild(o);
    });
    unitsEl.value = 1;
    unitsEl.disabled = true;
  } else {
    ludoVariant.style.display = "none";
    unitsEl.disabled = false;
  }

  recalculate();
}

/* Recalculate totals and update UI */
function recalculate() {
  savedNote.style.display = "none";
  const service = serviceEl.value;
  const meta = DATA[service];
  const variationOption = variationEl.selectedOptions[0];
  const basePrice = variationOption
    ? parseFloat(variationOption.dataset.price)
    : 0;
  const units = Number(unitsEl.value) || 0;
  const complexity = Number(complexityEl.value) || 1;
  const urgency = Number(urgencyEl.value) || 1;
  const currency = currencyEl.value;

  // if Ludo chosen, override basePrice from ludoVariant if selected
  let ludoSelectedPrice = 0;
  if (service === "Ludo Game") {
    const lv = ludoVariant.value;
    if (lv && lv !== "0") {
      const opt = ludoVariant.selectedOptions[0];
      ludoSelectedPrice = parseFloat(opt.dataset.price) || 0;
    }
  }

  const effectiveBase =
    service === "Ludo Game" && ludoSelectedPrice > 0
      ? ludoSelectedPrice
      : basePrice;

  // subtotal depends on service type (calculated in INR)
  let subtotal =
    meta.type === "per_unit"
      ? effectiveBase * units
      : effectiveBase * (units || 1);

  // addons (calculated in INR)
  const addonChecks = Array.from(
    addonsContainer.querySelectorAll('input[type="checkbox"]')
  );
  let addonsTotal = 0;
  let selectedAddons = [];
  addonChecks.forEach((cb) => {
    if (cb.checked) {
      const p = Number(cb.dataset.price) || 0;
      addonsTotal += p;
      selectedAddons.push({
        id: cb.value,
        name: cb.nextSibling.textContent.trim().replace(/\s+\([^)]+\)$/, ""),
        price: p,
      });
    }
  });

  // total with multipliers (before discount, in INR)
  const multiplier = complexity * urgency;
  const totalBeforeDiscount = Math.round((subtotal + addonsTotal) * multiplier);

  // calculate discount (based on INR amount)
  const discount = calculateDiscount(totalBeforeDiscount);
  const finalTotal = totalBeforeDiscount - discount.amount;

  // show/hide discount section
  if (discount.amount > 0) {
    discountSection.style.display = "flex";
    discountAmount.textContent = `-${formatCurrencyAmount(
      discount.amount,
      currency
    )}`;
  } else {
    discountSection.style.display = "none";
  }

  // update UI with currency conversion
  priceEl.textContent = formatCurrencyAmount(finalTotal, currency);
  subTotalEl.textContent = formatCurrencyAmount(subtotal, currency);
  addonsTotalEl.textContent = formatCurrencyAmount(addonsTotal, currency);
  multTotalEl.textContent = `×${multiplier.toFixed(2)}`;
  grandTotalEl.textContent = formatCurrencyAmount(finalTotal, currency);

  // breakdown list
  breakList.innerHTML = "";
  const b1 = document.createElement("div");
  b1.className = "summary-line";
  b1.innerHTML = `<div class="small">Package</div><div class="small">${
    variationOption ? variationOption.textContent : "-"
  }</div>`;
  breakList.appendChild(b1);

  const b2 = document.createElement("div");
  b2.className = "summary-line";
  b2.innerHTML = `<div class="small">Units</div><div class="small">${units}</div>`;
  breakList.appendChild(b2);

  if (selectedAddons.length) {
    selectedAddons.forEach((a) => {
      const r = document.createElement("div");
      r.className = "summary-line";
      r.innerHTML = `<div class="small">${
        a.name
      }</div><div class="small">${formatCurrencyAmount(
        a.price,
        currency
      )}</div>`;
      breakList.appendChild(r);
    });
  } else {
    const r = document.createElement("div");
    r.className = "summary-line";
    r.innerHTML = `<div class="small">No add-ons selected</div><div class="small">—</div>`;
    breakList.appendChild(r);
  }

  // Update the summary section to show total before discount if there's a discount
  const summarySection = grandTotalEl.closest(".breakdown");
  const discountLine = summarySection.querySelector("#discount-section");

  // Remove any existing "Total Before Discount" lines to prevent duplicates
  const existingBeforeDiscountLines = summarySection.querySelectorAll(
    ".before-discount-line"
  );
  existingBeforeDiscountLines.forEach((line) => line.remove());

  // Remove any existing separators
  const existingSeparators = summarySection.querySelectorAll(
    ".discount-separator"
  );
  existingSeparators.forEach((sep) => sep.remove());

  if (
    discount.amount > 0 &&
    discountLine &&
    discountLine.style.display !== "none"
  ) {
    // Add some visual separation
    const separator = document.createElement("div");
    separator.className = "discount-separator";
    separator.style.height = "8px";

    // Update the summary section to show the flow better
    const beforeDiscountLine = document.createElement("div");
    beforeDiscountLine.className = "summary-line before-discount-line";
    beforeDiscountLine.style.fontWeight = "600";
    beforeDiscountLine.innerHTML = `<div class="small">Total Before Discount</div><div class="small">${formatCurrencyAmount(
      totalBeforeDiscount,
      currency
    )}</div>`;

    // Insert this line before the discount section in the summary
    discountLine.parentNode.insertBefore(separator, discountLine);
    discountLine.parentNode.insertBefore(beforeDiscountLine, discountLine);
  }
}

/* Utilities */
function formatNumber(n) {
  if (Number.isInteger(n)) return n.toLocaleString("en-IN");
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

/* Actions */
function resetAll() {
  populateServices();
  onServiceChange();
  unitsEl.value = 1;
  complexityEl.value = "1";
  urgencyEl.value = "1";
  currencyEl.value = "INR";
  const checks = addonsContainer.querySelectorAll('input[type="checkbox"]');
  checks.forEach((c) => (c.checked = false));
  ludoVariant.value = "0";
  recalculate();
}

function saveQuote() {
  const quote = {
    service: serviceEl.value,
    variation: variationEl.value,
    variationLabel: variationEl.selectedOptions[0]
      ? variationEl.selectedOptions[0].textContent
      : "",
    units: unitsEl.value,
    complexity: complexityEl.value,
    urgency: urgencyEl.value,
    addons: Array.from(
      addonsContainer.querySelectorAll('input[type="checkbox"]:checked')
    ).map((c) => ({ id: c.value, price: c.dataset.price })),
    currency: currencyEl.value,
    timestamp: new Date().toISOString(),
  };
  const stored = JSON.parse(localStorage.getItem("suh_quoter") || "[]");
  stored.push(quote);
  localStorage.setItem("suh_quoter", JSON.stringify(stored));
  savedNote.style.display = "block";
  setTimeout(() => (savedNote.style.display = "none"), 2500);
}

function downloadPDF() {
  window.print();
}

function copyShareLink() {
  const state = {
    s: serviceEl.value,
    v: variationEl.value,
    u: unitsEl.value,
    c: complexityEl.value,
    urg: urgencyEl.value,
    addons: Array.from(
      addonsContainer.querySelectorAll('input[type="checkbox"]:checked')
    ).map((c) => c.value),
    cur: currencyEl.value,
    ludo: ludoVariant.value || "",
  };
  const encoded = encodeURIComponent(btoa(JSON.stringify(state)));
  const link = `${location.origin}${location.pathname}?q=${encoded}`;
  navigator.clipboard
    .writeText(link)
    .then(() => {
      alert("Shareable link copied to clipboard");
    })
    .catch(() => {
      alert("Could not copy link - please copy manually:\n" + link);
    });
}

function tryLoadFromQS() {
  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  if (!q) return;
  try {
    const decoded = JSON.parse(atob(decodeURIComponent(q)));
    if (decoded.s) serviceEl.value = decoded.s;
    onServiceChange();
    if (decoded.v) variationEl.value = decoded.v;
    if (decoded.u) unitsEl.value = decoded.u;
    if (decoded.c) complexityEl.value = decoded.c;
    if (decoded.urg) urgencyEl.value = decoded.urg;
    if (decoded.cur) currencyEl.value = decoded.cur;
    if (decoded.addons && decoded.addons.length) {
      Array.from(
        addonsContainer.querySelectorAll('input[type="checkbox"]')
      ).forEach((cb) => {
        cb.checked = decoded.addons.includes(cb.value);
      });
    }
    if (decoded.ludo) ludoVariant.value = decoded.ludo;
    recalculate();
  } catch (e) {
    console.warn("Failed to parse query state", e);
  }
}

/* Add event listener for currency change to update display */
if (currencyEl) {
  currencyEl.addEventListener("change", function () {
    onServiceChange(); // This will update all the dropdowns and addon prices
    recalculate(); // This will update all the calculated values
  });
}

/* Initial boot */
populateServices();
onServiceChange();
tryLoadFromQS();