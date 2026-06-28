/* ============================================================
   KITCHEN BY IQRA — main.js
   Cart, WhatsApp checkout, deal of the day, menu rendering,
   GA4 (via GTM dataLayer) ecommerce events, mobile menu.
   Depends on: js/menu-data.js (loaded first on every page).
   ============================================================ */

(function () {
  "use strict";

  /* Mark that JS is running, so the scroll-reveal hidden state only applies
     when we can guarantee the elements will be un-hidden again. */
  document.documentElement.classList.add("js");

  /* ---------- Safe storage (falls back to memory if blocked) ---------- */
  const mem = {};
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return mem[k] || null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { delete mem[k]; } }
  };

  /* ---------- Helpers ---------- */
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const money = (n) => "PKR " + Number(n).toLocaleString("en-PK");
  const FALLBACK = (name) =>
    "https://placehold.co/800x600/F7EFDE/8C2F1B?text=" + encodeURIComponent(name);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function imgTag(item, cls) {
    return '<img class="' + (cls || "") + '" src="' + item.img + '" alt="' +
      esc(item.name) + " — homemade by Kitchen by Iqra, Lahore\" loading=\"lazy\" " +
      "onerror=\"this.onerror=null;this.src='" + FALLBACK(item.name) + "'\">";
  }

  /* ---------- GA4 / GTM tracking ---------- */
  window.dataLayer = window.dataLayer || [];
  function gaItem(it, qty) {
    return { item_id: it.id, item_name: it.name, item_category: it.cat || "deal",
             price: it.price, quantity: qty || it.qty || 1 };
  }
  function track(event, ecommerce, extra) {
    window.dataLayer.push({ ecommerce: null });           // clear previous (GA4 best practice)
    window.dataLayer.push(Object.assign({ event: event, ecommerce: ecommerce }, extra || {}));
    // Send straight to GA4 via gtag too, so events are tracked without needing
    // a Google Tag Manager container. (gtag is defined by the GA4 snippet in <head>.)
    if (typeof window.gtag === "function") {
      window.gtag("event", event, Object.assign({}, ecommerce || {}, extra || {}));
    }
  }

  /* ---------- Cart state ---------- */
  const CART_KEY = "kbi_cart_v1";
  let cart = [];
  try { cart = JSON.parse(store.get(CART_KEY) || "[]"); } catch (e) { cart = []; }
  const saveCart = () => store.set(CART_KEY, JSON.stringify(cart));
  const cartCount = () => cart.reduce((n, l) => n + l.qty, 0);
  const cartTotal = () => cart.reduce((n, l) => n + l.qty * l.price, 0);
  const findItem = (id) => MENU.find((m) => m.id === id);

  /* ---------- Inject shared UI (drawer, modals, toast, floaters) ---------- */
  const ui = document.createElement("div");
  ui.innerHTML =
    /* Cart drawer */
    '<div class="drawer" id="cartDrawer" aria-hidden="true">' +
      '<div class="drawer-panel" role="dialog" aria-label="Your order">' +
        '<div class="drawer-head"><h3>Your order</h3>' +
          '<button class="cart-btn" data-close-drawer aria-label="Close cart">✕</button></div>' +
        '<div class="drawer-items" id="cartItems"></div>' +
        '<div class="drawer-foot">' +
          '<div class="cart-total-row"><span>Subtotal</span><span id="cartTotal">PKR 0</span></div>' +
          '<p class="cart-note">Per-plate prices. Delivery charges are added as per your location.</p>' +
          '<button class="btn btn--masala btn--block" id="checkoutBtn">Place order on WhatsApp</button>' +
        '</div></div></div>' +
    /* Quick view modal */
    '<div class="modal" id="quickView" aria-hidden="true"><div class="modal-card" role="dialog" aria-label="Dish details" style="position:relative">' +
      '<button class="modal-close" data-close-modal aria-label="Close">✕</button>' +
      '<div class="modal-media" id="qvMedia"></div><div class="modal-body" id="qvBody"></div></div></div>' +
    /* Checkout modal */
    '<div class="modal" id="checkoutModal" aria-hidden="true"><div class="modal-card" role="dialog" aria-label="Confirm order" style="position:relative">' +
      '<button class="modal-close" data-close-modal aria-label="Close">✕</button>' +
      '<div class="modal-body"><h3 style="margin-top:4px">Confirm your order</h3>' +
      '<p class="muted" style="margin-top:-4px;font-size:.92rem">We finalise every order on WhatsApp — it opens with your order pre-typed, you just press send.</p>' +
      '<form class="form-grid" id="checkoutForm">' +
        '<div><label for="coName">Your name</label><input id="coName" required placeholder="e.g. Ahmed Raza"></div>' +
        '<div><label for="coPhone">Phone / WhatsApp number</label><input id="coPhone" required type="tel" placeholder="03xx-xxxxxxx"></div>' +
        '<div><label for="coArea">Delivery area</label><select id="coArea"></select></div>' +
        '<div><label for="coAddress">Office / home address</label><textarea id="coAddress" rows="2" required placeholder="Office name, floor, street…"></textarea></div>' +
        '<div><label>Payment</label><div class="radio-cards">' +
          '<label class="radio-card"><input type="radio" name="coPay" value="Cash on Delivery" checked><span>Cash on delivery</span></label>' +
          '<label class="radio-card"><input type="radio" name="coPay" value="Bank Transfer (Allied Bank)"><span>Bank transfer</span></label>' +
        '</div><div class="bank-box" id="bankBox" hidden></div></div>' +
        '<div><label for="coNote">Note (optional)</label><input id="coNote" placeholder="Less spicy, deliver by 1 pm…"></div>' +
        '<button class="btn btn--wa btn--block" type="submit">' + waIcon() + ' Send order on WhatsApp</button>' +
        '<p class="cart-note" style="text-align:center;margin:2px 0 0">Order ref &amp; total are included automatically.</p>' +
      '</form></div></div></div>' +
    /* Toast + floaters */
    '<div class="toast" id="toast" role="status"></div>' +
    '<button class="cart-bar" id="cartBar"><span id="cartBarLabel">View order</span><span class="cart-bar-total" id="cartBarTotal"></span></button>' +
    '<a class="wa-float" href="https://wa.me/' + KBI.whatsapp +
      '?text=' + encodeURIComponent("Assalam o Alaikum! I'd like to order from today's menu.") +
      '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' + waIcon(26) + "</a>";
  document.body.appendChild(ui);

  function waIcon(size) {
    const s = size || 18;
    return '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3.2-.5 0-.2 0-.4-.1-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.4Z"/></svg>';
  }

  /* Fill area select */
  const areaSel = $("#coArea");
  KBI.areas.concat(["Other (nearby Lahore)"]).forEach((a) => {
    const o = document.createElement("option"); o.textContent = a; areaSel.appendChild(o);
  });
  $("#bankBox").innerHTML =
    "Transfer to <strong>" + esc(KBI.bank.bankName) + "</strong><br>" +
    "Title: <strong>" + esc(KBI.bank.accountTitle) + "</strong><br>" +
    "Account #: <strong>" + esc(KBI.bank.accountNumber) + "</strong><br>" +
    "IBAN: <strong>" + esc(KBI.bank.iban) + "</strong><br>" +
    "Then send the receipt screenshot on WhatsApp to confirm your order.";

  /* ---------- Toast ---------- */
  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }

  /* ---------- Cart UI ---------- */
  function renderCart() {
    $$(".cart-count").forEach((b) => (b.textContent = cartCount()));
    const box = $("#cartItems");
    if (!cart.length) {
      box.innerHTML = '<div class="cart-empty"><span class="big">🍲</span>' +
        "Your handi is empty.<br>Add something from the <a href=\"" + pathTo("menu.html") + '">menu</a>.</div>';
    } else {
      box.innerHTML = cart.map((l, i) =>
        '<div class="cart-line">' + imgTag(l) +
        '<div class="cart-line-info"><strong>' + esc(l.name) + "</strong>" +
        '<span class="muted">' + money(l.price) + " · " + esc(l.unit) + "</span>" +
        '<div class="cart-line-qty">' +
          '<button data-qty="-1" data-i="' + i + '" aria-label="Decrease">−</button><b>' + l.qty + "</b>" +
          '<button data-qty="1" data-i="' + i + '" aria-label="Increase">+</button>' +
          '<button class="cart-remove" data-remove="' + i + '">remove</button>' +
        "</div></div>" +
        '<div class="cart-line-price">' + money(l.price * l.qty) + "</div></div>"
      ).join("");
    }
    $("#cartTotal").textContent = money(cartTotal());
    const bar = $("#cartBar");
    if (cartCount() > 0) {
      bar.classList.add("show");
      $("#cartBarLabel").textContent = "View order · " + cartCount() + (cartCount() === 1 ? " item" : " items");
      $("#cartBarTotal").textContent = money(cartTotal());
    } else bar.classList.remove("show");
    saveCart();
  }

  function addToCart(entry, qty) {
    qty = qty || 1;
    const line = cart.find((l) => l.id === entry.id);
    if (line) line.qty += qty;
    else cart.push({ id: entry.id, name: entry.name, price: entry.price, unit: entry.unit || "per plate",
                     img: entry.img, cat: entry.cat || "deal", qty: qty });
    renderCart();
    toast("Added: " + entry.name);
    track("add_to_cart", { currency: "PKR", value: entry.price * qty, items: [gaItem(entry, qty)] });
  }

  /* path helper: blog pages live one level deep */
  function pathTo(file) { return (document.body.dataset.depth === "1" ? "../" : "") + file; }

  /* ---------- Drawer / modal open-close ---------- */
  function openDrawer() {
    $("#cartDrawer").classList.add("open");
    track("view_cart", { currency: "PKR", value: cartTotal(), items: cart.map((l) => gaItem(l)) });
  }
  function closeAll() {
    $$(".drawer.open,.modal.open,.mobile-menu.open").forEach((el) => el.classList.remove("open"));
  }
  document.addEventListener("click", (e) => {
    const t = e.target;

    /* Count every "order on WhatsApp" click as a conversion in GA4.
       Orders are finalised on WhatsApp, so a WhatsApp click is the key
       conversion. Fires generate_lead (a GA4 recommended conversion event);
       mark it as a Key Event in GA4 to treat WhatsApp as a sale/conversion.
       (The cart checkout flow additionally fires a full `purchase` event.) */
    const waLink = t.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"], a[href*="whatsapp.com/send"]');
    if (waLink) {
      track("generate_lead", { currency: "PKR", value: cartTotal() },
            { method: "WhatsApp", link_text: (waLink.textContent || "WhatsApp").trim().slice(0, 60) });
    }

    if (t.closest("[data-open-cart]")) { e.preventDefault(); openDrawer(); }
    if (t.closest("[data-close-drawer]") || t.closest("[data-close-modal]")) closeAll();
    if (t.classList.contains("drawer") || t.classList.contains("modal") || t.classList.contains("mobile-menu")) closeAll();
    if (t.closest("#cartBar")) openDrawer();

    const addBtn = t.closest("[data-add]");
    if (addBtn) {
      const it = findItem(addBtn.dataset.add);
      if (it) { if (it.custom) { openQuickView(it.id); } else addToCart(it); }
    }
    const qv = t.closest("[data-view]");
    if (qv) openQuickView(qv.dataset.view);

    const qtyBtn = t.closest("[data-qty]");
    if (qtyBtn) {
      const i = +qtyBtn.dataset.i, line = cart[i];
      line.qty += +qtyBtn.dataset.qty;
      if (line.qty <= 0) cart.splice(i, 1);
      renderCart();
    }
    const rm = t.closest("[data-remove]");
    if (rm) {
      const line = cart[+rm.dataset.remove];
      track("remove_from_cart", { currency: "PKR", value: line.price * line.qty, items: [gaItem(line)] });
      cart.splice(+rm.dataset.remove, 1); renderCart();
    }
    if (t.closest("#checkoutBtn")) {
      if (!cart.length) { toast("Add a dish first 🙂"); return; }
      closeAll(); $("#checkoutModal").classList.add("open");
      track("begin_checkout", { currency: "PKR", value: cartTotal(), items: cart.map((l) => gaItem(l)) });
    }
    if (t.closest("[data-add-deal]")) addDealToCart();
    if (t.closest(".hamburger")) $("#mobileMenu").classList.add("open");
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAll(); });
  document.addEventListener("change", (e) => {
    if (e.target.name === "coPay") $("#bankBox").hidden = e.target.value.indexOf("Bank") === -1;
  });

  /* ---------- Quick view ---------- */
  function openQuickView(id) {
    const it = findItem(id); if (!it) return;
    $("#qvMedia").innerHTML = imgTag(it);
    $("#qvBody").innerHTML =
      '<div class="dish-name"><h3 style="font-size:1.4rem">' + esc(it.name) + '</h3><span class="dish-urdu urdu">' + it.urdu + "</span></div>" +
      '<p class="muted">' + esc(it.desc) + "</p>" +
      (it.custom
        ? '<a class="btn btn--wa btn--block" target="_blank" rel="noopener" href="https://wa.me/' + KBI.whatsapp +
          "?text=" + encodeURIComponent("Assalam o Alaikum! I'd like to ask about: " + it.name) + '">' + waIcon() + " Ask on WhatsApp</a>"
        : '<div class="qty-row"><span class="price-tag">' + money(it.price) + " <small>" + esc(it.unit) + "</small></span>" +
          '<div class="qty"><button id="qvMinus" aria-label="Decrease">−</button><span id="qvQty">1</span><button id="qvPlus" aria-label="Increase">+</button></div></div>' +
          '<button class="btn btn--primary btn--block" id="qvAdd">Add to order</button>');
    $("#quickView").classList.add("open");
    track("view_item", { currency: "PKR", value: it.price, items: [gaItem(it, 1)] });
    if (it.custom) return;
    let q = 1;
    $("#qvMinus").onclick = () => { q = Math.max(1, q - 1); $("#qvQty").textContent = q; };
    $("#qvPlus").onclick = () => { q++; $("#qvQty").textContent = q; };
    $("#qvAdd").onclick = () => { addToCart(it, q); closeAll(); };
  }

  /* ---------- Checkout → WhatsApp ---------- */
  $("#checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const pay = document.querySelector('input[name="coPay"]:checked').value;
    const ref = "KBI-" + Date.now().toString().slice(-6);
    const lines = cart.map((l) => "• " + l.name + " × " + l.qty + " = " + money(l.price * l.qty));
    const msg =
      "🍲 *New order — Kitchen by Iqra* (" + ref + ")\n\n" +
      lines.join("\n") +
      "\n\n*Subtotal: " + money(cartTotal()) + "* (plus delivery as per location)\n\n" +
      "👤 " + $("#coName").value + "\n📞 " + $("#coPhone").value +
      "\n📍 " + $("#coArea").value + " — " + $("#coAddress").value +
      "\n💳 " + pay +
      ($("#coNote").value ? "\n📝 " + $("#coNote").value : "") +
      (pay.indexOf("Bank") > -1 ? "\n\n(I will send the transfer receipt here to confirm.)" : "");
    track("purchase", {
      transaction_id: ref, currency: "PKR", value: cartTotal(),
      items: cart.map((l) => gaItem(l))
    }, { payment_type: pay, delivery_area: $("#coArea").value });
    window.open("https://wa.me/" + KBI.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
    cart = []; renderCart(); closeAll();
    toast("Order opened in WhatsApp — press send to confirm ✔");
  });

  /* ---------- Deal of the day ---------- */
  function todaysDeal() { return DEALS[new Date().getDay()]; }
  function addDealToCart() {
    const d = todaysDeal();
    const base = findItem(d.includes[0]) || {};
    addToCart({ id: "deal-" + new Date().getDay(), name: "Deal of the Day: " + d.name,
                price: d.price, unit: "per deal", img: base.img || FALLBACK(d.name), cat: "deal" });
  }
  const dealSlot = $("#dealSlot");
  if (dealSlot) {
    const d = todaysDeal();
    const base = findItem(d.includes[0]) || { img: FALLBACK(d.name), name: d.name };
    dealSlot.innerHTML =
      '<div class="deal-card reveal">' +
        '<div class="deal-media">' + imgTag({ img: base.img, name: d.name }) +
          '<span class="deal-ribbon">Deal of the day</span></div>' +
        '<div class="deal-body"><div class="stripe stripe--thin"></div>' +
          '<span class="deal-day">' + d.day + " special</span>" +
          "<h3 style=\"font-size:1.5rem;margin:0\">" + esc(d.name) + "</h3>" +
          '<p class="muted" style="margin:0">Cooked fresh this morning in our home kitchen. Limited plates — first come, first served.</p>' +
          '<div class="deal-price">' + money(d.price) + " <s>" + money(d.was) + "</s></div>" +
          '<div class="deal-actions"><button class="btn btn--masala" data-add-deal>Add today\u2019s deal</button>' +
          '<a class="btn btn--ghost btn--sm" href="' + pathTo("menu.html") + '">Browse full menu</a></div>' +
        "</div></div>";
  }

  /* ---------- Menu page rendering ---------- */
  const menuRoot = $("#menuRoot");
  if (menuRoot) {
    const chipsBox = $("#menuChips");
    chipsBox.innerHTML = '<button class="chip active" data-cat="all">All dishes</button>' +
      CATS.map((c) => '<button class="chip" data-cat="' + c.id + '">' + c.label + "</button>").join("");
    function dishCard(it) {
      return '<article class="dish-card reveal" data-name="' + esc(it.name.toLowerCase()) + '">' +
        '<button class="dish-media" data-view="' + it.id + '" aria-label="View ' + esc(it.name) + '">' +
          imgTag(it) +
          '<span class="dish-tag ' + (it.veg ? "dish-tag--veg" : "") + '">' + (it.veg ? "Veg" : "Chicken") + "</span></button>" +
        '<div class="dish-body"><div class="dish-name"><h3>' + esc(it.name) + '</h3><span class="dish-urdu urdu">' + it.urdu + "</span></div>" +
        '<p class="dish-desc">' + esc(it.desc) + "</p>" +
        '<div class="dish-foot">' +
          (it.custom ? '<span class="price-tag">On demand</span>'
                     : '<span class="price-tag">' + money(it.price) + " <small>" + esc(it.unit) + "</small></span>") +
          '<button class="add-btn" data-add="' + it.id + '">' + (it.custom ? "Ask us" : "+ Add") + "</button>" +
        "</div></div></article>";
    }
    menuRoot.innerHTML = CATS.map((c) =>
      '<section class="menu-cat" data-cat="' + c.id + '" id="' + c.id + '">' +
        '<div class="menu-cat-title"><h2>' + c.label + "</h2></div>" +
        '<div class="grid grid--3">' + MENU.filter((m) => m.cat === c.id).map(dishCard).join("") + "</div></section>"
    ).join("");
    track("view_item_list", { item_list_name: "Full menu",
      items: MENU.filter((m) => !m.custom).map((m) => gaItem(m, 1)) });

    chipsBox.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip"); if (!chip) return;
      $$(".chip", chipsBox).forEach((c) => c.classList.toggle("active", c === chip));
      $$(".menu-cat", menuRoot).forEach((sec) =>
        sec.style.display = (chip.dataset.cat === "all" || sec.dataset.cat === chip.dataset.cat) ? "" : "none");
    });
    const search = $("#menuSearch");
    if (search) search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      $$(".dish-card", menuRoot).forEach((card) =>
        card.style.display = card.dataset.name.indexOf(q) > -1 ? "" : "none");
      $$(".menu-cat", menuRoot).forEach((sec) => {
        const visible = $$(".dish-card", sec).some((c) => c.style.display !== "none");
        sec.style.display = visible ? "" : "none";
      });
    });
  }

  /* ---------- "Popular this week" on home ---------- */
  const popular = $("#popularGrid");
  if (popular) {
    const picks = ["biryani", "karahi", "daal-chawal", "white-pasta", "haleem", "karhi-pakora"];
    popular.innerHTML = picks.map((id) => {
      const it = findItem(id);
      return '<article class="dish-card reveal">' +
        '<button class="dish-media" data-view="' + it.id + '">' + imgTag(it) +
        '<span class="dish-tag ' + (it.veg ? "dish-tag--veg" : "") + '">' + (it.veg ? "Veg" : "Chicken") + "</span></button>" +
        '<div class="dish-body"><div class="dish-name"><h3>' + esc(it.name) + '</h3><span class="dish-urdu urdu">' + it.urdu + "</span></div>" +
        '<div class="dish-foot"><span class="price-tag">' + money(it.price) + "</span>" +
        '<button class="add-btn" data-add="' + it.id + '">+ Add</button></div></div></article>';
    }).join("");
  }

  /* ---------- Reveal on scroll (never traps content) ---------- */
  const revealAll = () => $$(".reveal:not(.in)").forEach((el) => el.classList.add("in"));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((es) =>
      es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" });
    const watch = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));
    watch();
    setTimeout(watch, 250);
    setTimeout(watch, 800);
    // Safety net: whatever the observer hasn't revealed within 1.5s, show anyway.
    setTimeout(revealAll, 1500);
    window.addEventListener("load", () => setTimeout(revealAll, 400));
  } else {
    revealAll();
  }

  /* ---------- Footer year + initial paint ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  renderCart();
})();
