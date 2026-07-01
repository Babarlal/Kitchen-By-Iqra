/* ============================================================
   KITCHEN BY IQRA — MENU & BUSINESS DATA
   ✏️  THIS IS THE FILE YOU EDIT MOST.
   Change a price here and it updates everywhere on the site
   (menu page, cart, deal of the day, office planner).
   ============================================================ */

const KBI = {
  name: "Kitchen by Iqra",
  phoneDisplay: "0336-4780599",
  phoneIntl: "+923364780599",
  whatsapp: "923364780599",            // wa.me number (no + sign)
  email: "Iqralal23@gmail.com",
  address: "252-B Jubilee Town, Lahore",
  hours: "Mon–Sat, 11:00 AM – 9:00 PM", // ✏️ EDIT: confirm your real timings
  orderCutoff: "Order before 11:00 AM for same-day office lunch delivery (1–2 PM).", // ✏️ EDIT
  deliveryNote: "Prices are per plate. Delivery charges are not included and depend on your location.",
  areas: ["Jubilee Town","Bahria Town","Izmir Town","Tricon Village","Sherawala Heights","Iqbal Avenue"],
  bank: {                              // ✏️ EDIT: your real Allied Bank details
    bankName: "Allied Bank Limited (ABL)",
    accountTitle: "IQRA — EDIT ACCOUNT TITLE",
    accountNumber: "0000-0000000000-0000  (EDIT)",
    iban: "PK00ABPA0000000000000000  (EDIT IBAN)"
  }
};

/* Image note: these are real, free-to-use photos of each actual dish from
   Wikimedia Commons (accurate Pakistani/Desi food). If a photo ever fails to
   load, a clean labelled placeholder appears automatically. When you have your
   own photos of Iqra's food, just replace the URL on each dish below — your
   real food sells far better than any stock photo.

   WM("X/XX/File_name.jpg") returns a photo URL.
   IMG(...) is the old Unsplash helper, kept for the few generic items. */

/* Photos are delivered through Photon (i0.wp.com) — Automattic/WordPress's
   free global image CDN. It fetches each real photo from Wikimedia Commons on
   its own servers and serves it from a fast CDN that loads everywhere,
   including networks (e.g. in Pakistan) where upload.wikimedia.org itself is
   blocked or slow. It also resizes on the fly, so small originals never 404. */
const WM = (path, w = 800) =>
  `https://i0.wp.com/upload.wikimedia.org/wikipedia/commons/${path}?w=${w}`;
/* WMO = same CDN, original size (for photos smaller than the thumb width). */
const WMO = (path) =>
  `https://i0.wp.com/upload.wikimedia.org/wikipedia/commons/${path}`;
/* SELF = Iqra's OWN photo in /images, delivered resized via the same CDN.
   The uploaded PNGs are 2–3 MB each; this serves a fast ~800px JPG instead.
   To use a photo at full quality with no CDN, set img to "images/<file>". */
const SELF = (file, w = 800) =>
  `https://i0.wp.com/kitchen-by-iqra.vercel.app/images/${file}?w=${w}&output=jpg&q=82`;
const IMG = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const MENU = [
  /* ---------- Desi Salan & Karahi ---------- */
  { id:"qorma",        cat:"salan", name:"Chicken Qorma",        urdu:"چکن قورمہ",   price:500, unit:"per plate", veg:false,
    desc:"Slow-cooked in browned-onion gravy with home-ground garam masala — Sunday-dawat style.",
    img: WM("a/a8/Chicken_Korma.JPG") },
  { id:"karahi",       cat:"salan", name:"Chicken Karahi",       urdu:"چکن کڑاہی",   price:500, unit:"per plate", veg:false,
    desc:"Tomato-and-green-chilli karahi finished with fresh ginger, just like a home wok.",
    img: WM("c/c4/Pakistani_Food_Karahi_Beef.jpg") },
  { id:"white-karahi", cat:"salan", name:"Chicken White Karahi", urdu:"وائٹ کڑاہی",  price:500, unit:"per plate", veg:false,
    desc:"Creamy yogurt-and-black-pepper karahi — mild, rich and very office-friendly.",
    img: WM("4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg") },
  { id:"white-handi",  cat:"salan", name:"Chicken White Handi",  urdu:"وائٹ ہانڈی",  price:600, unit:"per plate", veg:false,
    desc:"Boneless chicken simmered in a creamy white handi masala.",
    img: WM("8/87/Aesthetic_Chicken_Curry.jpg") },
  { id:"handi",        cat:"salan", name:"Chicken Handi (Simple)", urdu:"چکن ہانڈی", price:500, unit:"per plate", veg:false,
    desc:"Classic desi handi with tomatoes, yogurt and home spices.",
    img: WM("c/c7/IndianChickenCurry.jpg") },
  { id:"kofta",        cat:"salan", name:"Chicken Kofta Curry",  urdu:"چکن کوفتہ",   price:400, unit:"per plate", veg:false,
    desc:"Hand-rolled chicken koftay in a rich, gently spiced curry.",
    img: WM("8/82/NargisiKofta.jpg") },
  { id:"haleem",       cat:"salan", name:"Chicken Haleem",       urdu:"چکن حلیم",    price:400, unit:"per plate", veg:false,
    desc:"Wheat, lentils and chicken stirred for hours — served with tarka, mint and lemon.",
    img: WM("0/0f/Pakistani_Haleem_served_with_garnish.jpg") },
  { id:"nihari",       cat:"salan", name:"Chicken Nihari",       urdu:"چکن نہاری",   price:500, unit:"per plate", veg:false,
    desc:"Slow morning-style nihari with home-blended nihari masala and ginger garnish.",
    img: WM("4/4b/Nalli_Nihari_India.jpg") },

  /* ---------- Sabzi & Daal ---------- */
  { id:"bhindi",        cat:"sabzi", name:"Bhindi Masala",   urdu:"بھنڈی",        price:300, unit:"per plate", veg:true,
    desc:"Crisp okra bhuna with onions and tomatoes — no slime, all flavour.",
    img: SELF("bhindi-masala.png") },
  { id:"bhindi-chicken",cat:"sabzi", name:"Bhindi Chicken",  urdu:"بھنڈی چکن",    price:400, unit:"per plate", veg:false,
    desc:"Okra and chicken bhuna together the ghar way.",
    img: WM("3/38/Stir-Fried-Okra-2008.jpg") },
  { id:"kaddu-chicken", cat:"sabzi", name:"Kaddu Chicken",   urdu:"کدو چکن",      price:350, unit:"per plate", veg:false,
    desc:"Soft pumpkin and chicken salan — light, seasonal comfort food.",
    img: WM("a/a1/Chicken_Dry_Curry_-_Howrah_2015-04-26_8515.JPG") },
  { id:"karela",        cat:"sabzi", name:"Karela Masala",   urdu:"کریلا",        price:300, unit:"per plate", veg:true,
    desc:"Bitter gourd done right: salted, squeezed and bhuna with plenty of onion.",
    img: WMO("4/49/Vegetarian_Curry.jpeg") },
  { id:"daal-karela",   cat:"sabzi", name:"Daal Karela",     urdu:"دال کریلا",    price:350, unit:"per plate", veg:true,
    desc:"Channa daal and karela — the classic gharelu jora.",
    img: SELF("daal-karela.png") },
  { id:"karela-chicken",cat:"sabzi", name:"Chicken Karela",  urdu:"چکن کریلا",    price:400, unit:"per plate", veg:false,
    desc:"Karela with tender chicken in a dry-bhuna masala.",
    img: WM("c/c7/IndianChickenCurry.jpg") },
  { id:"tinday",        cat:"sabzi", name:"Tinday",          urdu:"ٹنڈے",         price:300, unit:"per plate", veg:true,
    desc:"Apple gourd in a light tomato masala — the taste of a desi Tuesday.",
    img: WMO("4/49/Vegetarian_Curry.jpeg") },
  { id:"tinday-gosht",  cat:"sabzi", name:"Tinday Gosht",    urdu:"ٹنڈے گوشت",    price:400, unit:"per plate", veg:false,
    desc:"Tinday simmered with meat for a fuller, hearty salan.",
    img: WM("a/a1/Chicken_Dry_Curry_-_Howrah_2015-04-26_8515.JPG") },
  { id:"daal-mash",     cat:"sabzi", name:"Daal Mash",       urdu:"دال ماش",      price:350, unit:"per plate", veg:true,
    desc:"Dry-style white lentils with ginger juliennes and green chilli tarka.",
    img: WM("6/69/Punjabi_style_Dal_Makhani.jpg") },
  { id:"daal-channa",   cat:"sabzi", name:"Daal Channa",     urdu:"دال چنا",      price:350, unit:"per plate", veg:true,
    desc:"Hearty split-gram daal with a sizzling desi-ghee tarka.",
    img: SELF("dal-chana.png") },
  { id:"daal-moong",    cat:"sabzi", name:"Daal Moong",      urdu:"دال مونگ",     price:350, unit:"per plate", veg:true,
    desc:"Light yellow moong — the easiest daal on the stomach, big on tarka.",
    img: SELF("moong-masoor-dal.png") },
  { id:"daal-masoor",   cat:"sabzi", name:"Daal Masoor",     urdu:"دال مسور",     price:350, unit:"per plate", veg:true,
    desc:"Red lentils cooked soft with garlic tarka and fresh coriander.",
    img: SELF("masoor-dal.png") },
  { id:"karhi-pakora",  cat:"sabzi", name:"Karhi Pakora",    urdu:"کڑھی پکوڑا",   price:350, unit:"per plate", veg:true,
    desc:"Tangy besan karhi with soft pakoray and a red-chilli tarka on top.",
    img: SELF("karhi-pakora.png") },

  /* ---------- Rice & Daily Combos ---------- */
  { id:"biryani",      cat:"chawal", name:"Chicken Biryani", urdu:"چکن بریانی",  price:400, unit:"per plate", veg:false,
    desc:"Layered Lahori biryani with aloo, fried onions and home-mixed masala.",
    img: SELF("chicken-biryani.png") },
  { id:"pulao",        cat:"chawal", name:"Chicken Pulao",   urdu:"چکن پلاؤ",    price:400, unit:"per plate", veg:false,
    desc:"Yakhni pulao — fragrant stock rice with tender chicken.",
    img: WM("4/45/Zafrani_Pulao.jpg") },
  { id:"daal-chawal",  cat:"chawal", name:"Daal Chawal",     urdu:"دال چاول",    price:500, unit:"per plate", veg:true,
    desc:"The nation's comfort plate: daal of the day over steamed rice, with achar.",
    img: WM("5/53/Dal_bhat_Birethani.jpg") },
  { id:"masoor-chawal",cat:"chawal", name:"Masoor Chawal",   urdu:"مسور چاول",   price:550, unit:"per plate", veg:true,
    desc:"Garlicky masoor daal over rice — simple, filling, homemade.",
    img: WM("5/53/Dal_bhat_Birethani.jpg") },
  { id:"plain-rice",   cat:"chawal", name:"Plain / Zeera Rice", urdu:"سادہ چاول", price:0, unit:"on request", veg:true, custom:true,
    desc:"All varieties of rice available on demand — WhatsApp us your requirement.",
    img: IMG("photo-1536304993881-ff6e9eefa2a6") },

  /* ---------- Chinese & Pasta ---------- */
  { id:"spaghetti",    cat:"chinese", name:"Chicken Spaghetti", urdu:"چکن سپیگیٹی", price:450, unit:"per plate", veg:false,
    desc:"Desi-Chinese spaghetti tossed with chicken, capsicum and a gentle kick.",
    img: WM("a/ac/Pasta_Puttanesca.jpg") },
  { id:"macaroni",     cat:"chinese", name:"Chicken Macaroni",  urdu:"چکن میکرونی", price:450, unit:"per plate", veg:false,
    desc:"Saucy macaroni with chicken and vegetables — a lunchbox favourite.",
    img: WM("4/44/Goulash_from_usa_salvaged.jpg") },
  { id:"macaroni-veg", cat:"chinese", name:"Vegetable Macaroni",urdu:"ویجیٹیبل میکرونی", price:400, unit:"per plate", veg:true,
    desc:"Colourful veggie macaroni in a light, tangy sauce.",
    img: WM("e/e1/Pasta_salad_closeup.JPG") },
  { id:"white-pasta",  cat:"chinese", name:"White Sauce Pasta", urdu:"وائٹ ساس پاستا", price:600, unit:"per plate", veg:false,
    desc:"Creamy white-sauce pasta baked-style with chicken — rich and indulgent.",
    img: SELF("chicken-alfredo-pasta.png") },

  /* ---------- Frozen & Add-ons ---------- */
  { id:"shami",   cat:"extras", name:"Shami Kabab (Frozen)", urdu:"شامی کباب", price:60, unit:"per piece", veg:false,
    desc:"Home-made shami kababs, frozen in batches — fry fresh whenever you need.",
    img: WM("d/df/4th_October_2012_Shami_Kebab.jpg") },
  { id:"roti",    cat:"extras", name:"Roti",        urdu:"روٹی",   price:60, unit:"each", veg:true,
    desc:"Fresh, soft roti made to go with your salan.", img: WM("5/5c/Punjabi_Chapati.jpg") },
  { id:"paratha", cat:"extras", name:"Paratha",     urdu:"پراٹھا", price:100, unit:"each", veg:true,
    desc:"Crisp-edged desi paratha.", img: SELF("paratha.png") },
  { id:"salad",   cat:"extras", name:"Fresh Salad", urdu:"سلاد",   price:60, unit:"per serving", veg:true,
    desc:"Kachumber-style salad: onion, tomato, cucumber, lemon.", img: WM("1/12/Kachumber_Salad.JPG") },
  { id:"raita",   cat:"extras", name:"Raita",       urdu:"رائتہ",  price:60, unit:"per serving", veg:true,
    desc:"Cool mint-zeera raita.", img: WM("7/78/Cucumber-raita.jpg") },
  { id:"achar",   cat:"extras", name:"Achar (Pickle)", urdu:"اچار", price:60, unit:"per serving", veg:true,
    desc:"Sharp mixed achar, the proper desi sidekick.", img: WMO("b/b6/Indian-pickle.jpg") }
];

const CATS = [
  { id:"salan",   label:"Desi Salan & Karahi" },
  { id:"sabzi",   label:"Sabzi & Daal" },
  { id:"chawal",  label:"Rice & Combos" },
  { id:"chinese", label:"Chinese & Pasta" },
  { id:"extras",  label:"Frozen & Add-ons" }
];

/* ---------- Deal of the Day (rotates automatically by weekday) ----------
   ✏️ EDIT freely: name, what's included, deal price, "was" price.
   Index = JavaScript weekday: 0 Sun, 1 Mon ... 6 Sat. */
const DEALS = {
  1: { day:"Monday",    name:"Chicken Biryani + Raita",            includes:["biryani"],     price:420, was:460 },
  2: { day:"Tuesday",   name:"Chicken Karahi + 2 Roti",           includes:["karahi"],      price:570, was:620 },
  3: { day:"Wednesday", name:"Daal Mash + 2 Roti",                includes:["daal-mash"],   price:430, was:470 },
  4: { day:"Thursday",  name:"Chicken Haleem + 2 Roti",           includes:["haleem"],      price:430, was:470 },
  5: { day:"Friday",    name:"Chicken Qorma + 2 Roti + Salad",    includes:["qorma"],       price:620, was:680 },
  6: { day:"Saturday",  name:"Chicken Pulao + 2 pc Shami Kabab",  includes:["pulao"],       price:470, was:520 },
  0: { day:"Sunday",    name:"White Sauce Pasta",                 includes:["white-pasta"], price:540, was:600 }
};

/* Office perks shown on the planner page. ✏️ EDIT to match what you actually offer. */
const OFFICE_PERKS = [
  "One fixed daily delivery slot for your office — food arrives together, hot.",
  "Free delivery on 10+ plates per day within our service areas.",
  "Change tomorrow's dish any time before 11:00 AM — just edit your planner.",
  "Roti, salad and raita added per-head so nobody fights over the last piece.",
  "Custom dishes on demand for office dawats and monthly treats."
];
