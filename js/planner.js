/* ============================================================
   KITCHEN BY IQRA — planner.js (Office Weekly Meal Planner)
   Offices pick a dish + plate count for each working day,
   see the weekly estimate, save it, and send it on WhatsApp.
   The plan stays editable — change tomorrow's dish any time.
   Depends on: js/menu-data.js and js/main.js (for styles only).
   ============================================================ */

(function () {
  "use strict";
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const money = (n) => "PKR " + Number(n).toLocaleString("en-PK");
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const KEY = "kbi_office_plan_v1";

  const mem = {};
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return mem[k] || null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { mem[k] = v; } }
  };

  window.dataLayer = window.dataLayer || [];
  const push = (o) => window.dataLayer.push(o);

  const root = $("#plannerDays");
  if (!root) return;

  /* Dishes suitable for office lunch = everything priced per plate */
  const OPTIONS = MENU.filter((m) => !m.custom && m.cat !== "extras");
  const byId = (id) => MENU.find((m) => m.id === id);

  /* ---------- Load saved plan ---------- */
  let plan;
  try { plan = JSON.parse(store.get(KEY) || "null"); } catch (e) { plan = null; }
  if (!plan) {
    plan = { office: "", contact: "", phone: "", area: KBI.areas[0], address: "", time: "1:00 PM",
      days: DAYS.map((d, i) => ({ day: d, on: i < 5, dish: OPTIONS[i % OPTIONS.length].id, plates: 10 })) };
  }

  /* ---------- Render day cards ---------- */
  function optionsHtml(selected) {
    return OPTIONS.map((o) =>
      '<option value="' + o.id + '"' + (o.id === selected ? " selected" : "") + ">" +
      o.name + " — " + money(o.price) + "</option>").join("");
  }
  root.innerHTML = plan.days.map((d, i) =>
    '<div class="day-card' + (d.on ? "" : " is-off") + '" data-i="' + i + '">' +
      '<div class="day-card-top"><span class="day-name">' + d.day + "</span>" +
        '<label class="day-toggle"><input type="checkbox" data-on ' + (d.on ? "checked" : "") + "> deliver this day</label></div>" +
      '<div class="day-fields">' +
        '<select data-dish aria-label="Dish for ' + d.day + '">' + optionsHtml(d.dish) + "</select>" +
        '<input type="number" data-plates min="1" max="500" value="' + d.plates + '" aria-label="Plates for ' + d.day + '">' +
      "</div>" +
      '<div class="day-sub" data-sub></div>' +
    "</div>").join("");

  /* Office details inputs (already in HTML) — prefill from saved plan */
  const F = { office: $("#plOffice"), contact: $("#plContact"), phone: $("#plPhone"),
              area: $("#plArea"), address: $("#plAddress"), time: $("#plTime") };
  KBI.areas.concat(["Other (nearby Lahore)"]).forEach((a) => {
    const o = document.createElement("option"); o.textContent = a; F.area.appendChild(o);
  });
  Object.keys(F).forEach((k) => { if (plan[k]) F[k].value = plan[k]; });

  /* ---------- Totals ---------- */
  function recalc() {
    let weekTotal = 0, weekPlates = 0;
    const lines = [];
    plan.days.forEach((d, i) => {
      const card = root.children[i];
      card.classList.toggle("is-off", !d.on);
      const dish = byId(d.dish);
      const dayTotal = d.on ? dish.price * d.plates : 0;
      card.querySelector("[data-sub]").innerHTML = d.on
        ? d.plates + " plates × " + money(dish.price) + " = <b>" + money(dayTotal) + "</b>"
        : "No delivery this day";
      if (d.on) {
        weekTotal += dayTotal; weekPlates += Number(d.plates);
        lines.push({ day: d.day, dish: dish.name, plates: d.plates, total: dayTotal });
      }
    });
    $("#planLines").innerHTML = lines.length
      ? lines.map((l) => "<li><span>" + l.day.slice(0, 3) + " · " + l.dish + " × " + l.plates +
          "</span><span>" + money(l.total) + "</span></li>").join("")
      : '<li><span>No days selected yet</span><span>—</span></li>';
    $("#planTotal").innerHTML = "<span>Weekly estimate</span><b>" + money(weekTotal) + "</b>";
    $("#planPlates").textContent = weekPlates + " plates/week · delivery " +
      (lines.length && Math.min.apply(null, lines.map((l) => l.plates)) >= 10
        ? "FREE (10+ plates/day)" : "as per location");
    return { weekTotal, lines };
  }

  /* ---------- Events ---------- */
  root.addEventListener("change", (e) => {
    const card = e.target.closest(".day-card"); if (!card) return;
    const d = plan.days[+card.dataset.i];
    if (e.target.matches("[data-on]")) d.on = e.target.checked;
    if (e.target.matches("[data-dish]")) d.dish = e.target.value;
    if (e.target.matches("[data-plates]")) d.plates = Math.max(1, parseInt(e.target.value || "1", 10));
    recalc();
  });

  function readForm() { Object.keys(F).forEach((k) => (plan[k] = F[k].value.trim())); }

  $("#savePlanBtn").addEventListener("click", () => {
    readForm(); store.set(KEY, JSON.stringify(plan));
    const t = $("#planSavedMsg"); t.hidden = false; setTimeout(() => (t.hidden = true), 2500);
    push({ event: "save_office_plan", plan_days: plan.days.filter((d) => d.on).length });
  });

  $("#sendPlanBtn").addEventListener("click", () => {
    readForm();
    if (!plan.office || !plan.phone) {
      alert("Please add your office name and a contact number so we know who the plan is for.");
      return;
    }
    store.set(KEY, JSON.stringify(plan));
    const { weekTotal, lines } = recalc();
    if (!lines.length) { alert("Select at least one delivery day."); return; }
    const ref = "KBI-PLAN-" + Date.now().toString().slice(-6);
    const msg =
      "🗓️ *Weekly office plan — Kitchen by Iqra* (" + ref + ")\n\n" +
      "🏢 " + plan.office + "\n👤 " + (plan.contact || "—") + " · 📞 " + plan.phone +
      "\n📍 " + plan.area + " — " + plan.address +
      "\n⏰ Deliver around " + plan.time + "\n\n" +
      lines.map((l) => "• " + l.day + ": " + l.dish + " × " + l.plates + " = " + money(l.total)).join("\n") +
      "\n\n*Weekly estimate: " + money(weekTotal) + "* (delivery as per location; free on 10+ plates/day)" +
      "\n\nWe may change a day's dish before 11 AM via this planner.";
    push({ ecommerce: null });
    push({ event: "purchase", ecommerce: { transaction_id: ref, currency: "PKR", value: weekTotal,
      items: lines.map((l) => ({ item_id: "plan-" + l.day.toLowerCase(), item_name: l.dish,
        item_category: "office_plan", price: l.total / l.plates, quantity: l.plates })) },
      order_type: "weekly_office_plan" });
    window.open("https://wa.me/" + KBI.whatsapp + "?text=" + encodeURIComponent(msg), "_blank");
  });

  recalc();
})();
