# Kitchen by Iqra — Website Guide

A complete, free-to-host website for a homemade kitchen in Jubilee Town, Lahore.
Plain HTML + CSS + JavaScript — no build step, no framework, no monthly cost.
Works on **Vercel** and **Cloudflare Pages** free plans exactly as-is.

---

## 1. What's in the box

| File | What it is |
|---|---|
| `index.html` | Homepage — hero, deal of the day, popular dishes, areas, FAQ |
| `menu.html` | Full menu with category filters, search, quick-view popup, cart |
| `office-deals.html` | Weekly office planner (pick dish + plates per day, send on WhatsApp) |
| `blog.html` | Blog index |
| `blog/*.html` | Three SEO articles targeting your areas |
| `contact.html` | Contact cards, WhatsApp message form, map |
| `css/style.css` | All styling (colors, fonts, mobile layout) |
| `js/menu-data.js` | **★ Dishes, prices, deals, bank details — edit this file most** |
| `js/main.js` | Cart, checkout, popups, GA4 events (rarely needs editing) |
| `js/planner.js` | Office planner logic |
| `sitemap.xml`, `robots.txt` | For Google |
| `vercel.json` | Clean URLs (`/menu` instead of `/menu.html`) on Vercel |

**How ordering works (no database needed):** the customer fills their cart →
taps "Place order on WhatsApp" → WhatsApp opens **on their phone** with the full
order pre-typed (items, total, address, payment choice, order ref like `KBI-483920`)
→ they press send → you receive it at 0336-4780599 and confirm. The office planner
works the same way for weekly plans.

---

## 2. The 10-minute launch checklist ✏️

Search each file for the pencil emoji `✏️` — every placeholder is marked. The list:

1. **GTM ID** — replace `GTM-XXXXXXX` in **every** .html file (8 files) with your
   real Google Tag Manager container ID. Fast way (Mac/Linux terminal, run inside the folder):
   ```bash
   grep -rl "GTM-XXXXXXX" . | xargs sed -i 's/GTM-XXXXXXX/GTM-AB12CD3/g'
   ```
   On Windows, use VS Code → Edit → "Replace in Files".
2. **Domain** — replace `https://www.kitchenbyiqra.com` everywhere with your real
   domain (or your free `*.vercel.app` / `*.pages.dev` URL until you buy one).
   Same find-and-replace trick. This fixes canonicals, sitemap and schema.
3. **Bank details** — in `js/menu-data.js`, fill the real Allied Bank
   `accountTitle`, `accountNumber`, `iban` (shown to customers who choose bank transfer).
4. **Hours & cutoff** — in `js/menu-data.js` (`hours`, `orderCutoff`) and the footer
   of each page if you change timings.
5. **Map pin & coordinates** — the embedded map searches your address automatically.
   For the schema coordinates (`31.4480, 74.2240` in `index.html` and `contact.html`),
   open Google Maps → right-click your kitchen → copy the exact lat/long.
6. **Testimonials** — `index.html` ships with *sample* quotes. Replace them with
   real customer words as soon as you have them (never invent reviews — Google
   and customers both punish it).
7. **Photos** — placeholders come from Unsplash (if one ever breaks, a labelled
   placeholder shows instead). Replace with photos of *your actual food* — phone
   photos in daylight beat stock photos for trust and for Google Images traffic.
   Put files in an `/img` folder and change the `img:` URLs in `js/menu-data.js`.
8. **Prices/dishes/deals** — all live in `js/menu-data.js`. Change once, updates
   everywhere (menu, cart, planner, deal of the day).

---

## 3. Deploy free — two options

### Option A: Vercel via GitHub (recommended — updates are automatic)
1. Create a free account at github.com → "New repository" → name it `kitchen-by-iqra`.
2. Upload this whole folder ("uploading an existing file" → drag everything in) → Commit.
3. Create a free account at vercel.com → "Add New → Project" → Import that repository.
4. Framework preset: **Other**. No build command, no output directory. → **Deploy**.
5. Done — you get `kitchen-by-iqra.vercel.app`. Every future edit you commit on
   GitHub redeploys automatically in ~30 seconds.

### Option B: Cloudflare Pages (drag-and-drop, no GitHub)
1. Free account at dash.cloudflare.com → **Workers & Pages → Create → Pages →
   Upload assets**.
2. Drag the entire folder in → Deploy. You get `kitchen-by-iqra.pages.dev`.
3. To update later, upload again (or connect GitHub the same way as Vercel).

**Clean URLs / slugs:** Cloudflare Pages serves `menu.html` at `/menu`
automatically; on Vercel the included `vercel.json` (`cleanUrls: true`) does the
same. Internal links use `.html` so the site also works when you double-click
files locally.

**Custom domain (optional, ~USD 10–15/yr):** buy `kitchenbyiqra.com` (Namecheap,
Cloudflare Registrar, etc.) → add it in Vercel/Cloudflare project settings →
follow the DNS instructions shown. HTTPS is automatic and free on both.

**Preview locally before deploying:** double-clicking `index.html` works, or for
a proper local server run `npx serve` (Node) or `python -m http.server` inside
the folder and open the printed address.

---

## 4. GA4 + GTM setup (tracking orders & add-to-cart)

The site already pushes proper GA4 e-commerce events to the `dataLayer`:

| Event | Fires when |
|---|---|
| `view_item_list` | Menu page renders |
| `view_item` | Dish popup opened |
| `add_to_cart` / `remove_from_cart` | Cart changes |
| `view_cart` | Cart drawer opened |
| `begin_checkout` | Checkout form opened |
| `purchase` | "Send order on WhatsApp" pressed (with `transaction_id`, value, items) |
| `purchase` with `order_type: weekly_office_plan` | Office plan sent |
| `save_office_plan` | Office plan saved on device |
| `generate_lead` | Contact form sent |

One-time setup (≈15 minutes):
1. Create a **GA4 property** at analytics.google.com → copy the Measurement ID (`G-…`).
2. Create a **GTM container** at tagmanager.google.com → copy the `GTM-…` ID →
   put it in all 8 HTML files (checklist step 1).
3. In GTM: **Tags → New → Google Tag** → paste your `G-…` ID → trigger:
   *Initialization – All Pages* → Save.
4. In GTM: **Tags → New → GA4 Event** → Event name: `{{Event}}` → tick
   **"Send Ecommerce data" → Data layer** → trigger: *Custom Event* with event name
   regex `add_to_cart|remove_from_cart|view_item|view_item_list|view_cart|begin_checkout|purchase|save_office_plan|generate_lead`
   (tick "Use regex matching") → Save.
5. **Preview** in GTM, add a dish to the cart, confirm events appear → **Submit/Publish**.
6. In GA4 you'll now see revenue, items and the full funnel under
   *Reports → Monetization → Ecommerce purchases*.

A note on "purchase": it fires when the customer sends the WhatsApp order, which
is your real confirmation moment for now. If someone sends an order and you
can't fulfil it, just ignore that data point — at your scale the numbers stay honest.

*(If you'd rather skip GTM entirely: each page has a commented-out plain `gtag.js`
block in the `<head>` — delete the GTM blocks, uncomment that, add your `G-…` ID.
You'd then need GTM-style event tags later anyway, so GTM is the better road.)*

---

## 5. Payments in Pakistan — what's realistic (your Allied Bank question)

**Straight answer:** there is no public "Allied Bank API" that a website can use
to auto-confirm transfers into a personal account — no Pakistani bank offers that
for individuals. So the site launches with the two methods that work today with
zero cost and zero paperwork:

1. **Cash on delivery** — default option at checkout.
2. **Bank transfer (Allied Bank)** — when chosen, your account title, number and
   IBAN appear at checkout and inside the WhatsApp order, and the customer is told
   to send the **transfer receipt screenshot on WhatsApp**. You confirm the order
   when the screenshot (or the SMS from ABL) arrives. This *is* how most home
   kitchens in Lahore confirm prepaid orders, and it costs nothing.
   - Tip: ask your ABL branch for a **Raast ID** linked to your mobile number —
     customers can then transfer from any bank/JazzCash/Easypaisa app instantly
     with just your number. Add it to the `bank` block in `js/menu-data.js`.

**Later, when volume justifies it — real payment gateways:** SafePay, PayFast
(by APPS), JazzCash Business and Easypaisa Merchant all work in Pakistan. All of
them require (a) registering as a business/merchant, (b) a small per-transaction
fee (~2–3%), and (c) a tiny backend to receive the "payment succeeded" webhook —
which is exactly when you'd add the serverless function + database described below.
Until you're doing dozens of prepaid orders a day, the screenshot flow is simpler
and free.

---

## 6. Do you need Supabase / a database? (your other question)

**For launch: no.** Here's the logic:

- Orders → arrive on WhatsApp (your real order book is your chat history).
- Cart & saved office plans → stored in the customer's own browser
  (`localStorage`), free and private.
- Menu & prices → one editable file (`js/menu-data.js`).
- Blog → plain HTML files.

Nothing here needs a server, which is why hosting is free and nothing can "go down".

**Add Supabase later if/when you want any of these:**
- An **admin dashboard** of all orders/plans (instead of scrolling WhatsApp).
- Office plans that **sync across devices/teammates** (right now a plan lives on
  the device that made it).
- **Online payments** with automatic confirmation (gateway webhooks must write
  "paid" somewhere — that somewhere is the database).
- Customer accounts / order history.

The upgrade path is gentle and doesn't require rebuilding this site: keep these
exact pages, add Supabase's free tier (Postgres + auth) and a couple of Vercel
serverless functions; the checkout then POSTs the order to the database *and*
still opens WhatsApp. When you reach that point, that's a one-evening project on
top of what you have.

---

## 7. SEO / AEO / GEO — how the ranking plan works

Built-in already:
- **Local pages & copy** repeatedly and naturally mention Jubilee Town, Bahria
  Town, Izmir Town, Tricon Village, Sherawala Heights and Iqbal Avenue.
- **Structured data**: `Restaurant` (with geo, hours, areas, menu link),
  `Menu` with priced items, `FAQPage` on the homepage and every blog post (this
  is what AI answers and Google's rich results read — the AEO part), `BlogPosting`
  + `BreadcrumbList` on articles, `Service` on the office page.
- **Clean slugs**, canonicals, Open Graph, sitemap, robots.txt, fast static pages,
  mobile-first layout (Google ranks the mobile site).

Your part (this is what actually wins "homemade kitchen near Bahria Town"):
1. **Google Business Profile** — create one free at business.google.com for
   "Kitchen by Iqra", category *Home cooking / Caterer / Food delivery*, address
   252-B Jubilee Town, your hours, your website link, real food photos. The
   "near me / near Bahria Town" searches are mostly **map results**, and only a
   Business Profile can appear there. This is the single highest-impact step.
2. **Google Search Console** — add your domain, submit `sitemap.xml`. Takes 10 minutes.
3. **Reviews** — after every few orders, send happy customers your Business
   Profile review link. 15–20 genuine reviews usually owns a local niche like this.
4. **Keep the blog alive** — one honest post a month ("This week's seasonal sabzi
   in Jubilee Town", "Ramadan office iftar plans in Bahria Town"). Copy any post
   file as a template, change the text/title/canonical, add it to `blog.html` and
   `sitemap.xml`.
5. **WhatsApp your link** — every order confirmation that includes your site link
   creates the visit/return pattern Google notices for small local sites.

---

## 8. Everyday edits cheat-sheet

| You want to… | Do this |
|---|---|
| Change a price | `js/menu-data.js` → find the dish → change `price` |
| Add a dish | Copy any block in `MENU`, give it a unique `id`, pick a `cat` |
| Change a daily deal | `js/menu-data.js` → `DEALS` (0=Sun … 6=Sat) |
| Change office perks | `js/menu-data.js` → `OFFICE_PERKS` |
| Change colors | `css/style.css` → the `:root` block at the top |
| Change hero text | `index.html` → the `HERO` section |
| Add a blog post | Copy a file in `/blog`, edit text + `<title>` + canonical + schema, link it on `blog.html`, add to `sitemap.xml` |
| Change WhatsApp number | `js/menu-data.js` (`whatsapp`, `phoneIntl`, `phoneDisplay`) **and** find-replace `923364780599` across the HTML files |

That's everything. Cook well — the website's ready. 🍲
