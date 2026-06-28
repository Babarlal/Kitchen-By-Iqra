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

/* Image note: these are free Unsplash placeholders. If a photo ever fails
   to load, a clean labelled placeholder appears automatically. Replace with
   real photos of your dishes when you can — it sells far better. */
const IMG = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

const MENU = [
  /* ---------- Desi Salan & Karahi ---------- */
  { id:"qorma",        cat:"salan", name:"Chicken Qorma",        urdu:"چکن قورمہ",   price:500, unit:"per plate", veg:false,
    desc:"Slow-cooked in browned-onion gravy with home-ground garam masala — Sunday-dawat style.",
    img: IMG("photo-1585937421612-70a008356fbe") },
  { id:"karahi",       cat:"salan", name:"Chicken Karahi",       urdu:"چکن کڑاہی",   price:500, unit:"per plate", veg:false,
    desc:"Tomato-and-green-chilli karahi finished with fresh ginger, just like a home wok.",
    img: IMG("photo-1565557623262-b51c2513a641") },
  { id:"white-karahi", cat:"salan", name:"Chicken White Karahi", urdu:"وائٹ کڑاہی",  price:500, unit:"per plate", veg:false,
    desc:"Creamy yogurt-and-black-pepper karahi — mild, rich and very office-friendly.",
    img: IMG("photo-1631452180519-c014fe946bc7") },
  { id:"white-handi",  cat:"salan", name:"Chicken White Handi",  urdu:"وائٹ ہانڈی",  price:600, unit:"per plate", veg:false,
    desc:"Boneless chicken simmered in a creamy white handi masala.",
    img: IMG("photo-1567188040759-fb8a883dc6d8") },
  { id:"handi",        cat:"salan", name:"Chicken Handi (Simple)", urdu:"چکن ہانڈی", price:500, unit:"per plate", veg:false,
    desc:"Classic desi handi with tomatoes, yogurt and home spices.",
    img: IMG("photo-1574653853027-5382a3d23a15") },
  { id:"kofta",        cat:"salan", name:"Chicken Kofta Curry",  urdu:"چکن کوفتہ",   price:400, unit:"per plate", veg:false,
    desc:"Hand-rolled chicken koftay in a rich, gently spiced curry.",
    img: IMG("photo-1545247181-516773cae754") },
  { id:"haleem",       cat:"salan", name:"Chicken Haleem",       urdu:"چکن حلیم",    price:350, unit:"per plate", veg:false,
    desc:"Wheat, lentils and chicken stirred for hours — served with tarka, mint and lemon.",
    img: IMG("photo-1547592180-85f173990554") },
  { id:"nihari",       cat:"salan", name:"Chicken Nihari",       urdu:"چکن نہاری",   price:500, unit:"per plate", veg:false,
    desc:"Slow morning-style nihari with home-blended nihari masala and ginger garnish.",
    img: IMG("photo-1603894584373-5ac82b2ae398") },

  /* ---------- Sabzi & Daal ---------- */
  { id:"bhindi",        cat:"sabzi", name:"Bhindi Masala",   urdu:"بھنڈی",        price:300, unit:"per plate", veg:true,
    desc:"Crisp okra bhuna with onions and tomatoes — no slime, all flavour.",
    img: IMG("photo-1512621776951-a57141f2eefd") },
  { id:"bhindi-chicken",cat:"sabzi", name:"Bhindi Chicken",  urdu:"بھنڈی چکن",    price:400, unit:"per plate", veg:false,
    desc:"Okra and chicken bhuna together the ghar way.",
    img: IMG("photo-1455619452474-d2be8b1e70cd") },
  { id:"kaddu-chicken", cat:"sabzi", name:"Kaddu Chicken",   urdu:"کدو چکن",      price:350, unit:"per plate", veg:false,
    desc:"Soft pumpkin and chicken salan — light, seasonal comfort food.",
    img: IMG("photo-1476718406336-bb5a9690ee2a") },
  { id:"karela",        cat:"sabzi", name:"Karela Masala",   urdu:"کریلا",        price:300, unit:"per plate", veg:true,
    desc:"Bitter gourd done right: salted, squeezed and bhuna with plenty of onion.",
    img: IMG("photo-1604908176997-125f25cc6f3d") },
  { id:"daal-karela",   cat:"sabzi", name:"Daal Karela",     urdu:"دال کریلا",    price:350, unit:"per plate", veg:true,
    desc:"Channa daal and karela — the classic gharelu jora.",
    img: IMG("photo-1546833999-b9f581a1996d") },
  { id:"karela-chicken",cat:"sabzi", name:"Chicken Karela",  urdu:"چکن کریلا",    price:400, unit:"per plate", veg:false,
    desc:"Karela with tender chicken in a dry-bhuna masala.",
    img: IMG("photo-1567337710282-00832b415979") },
  { id:"tinday",        cat:"sabzi", name:"Tinday",          urdu:"ٹنڈے",         price:300, unit:"per plate", veg:true,
    desc:"Apple gourd in a light tomato masala — the taste of a desi Tuesday.",
    img: IMG("photo-1543339308-43e59d6b73a6") },
  { id:"tinday-gosht",  cat:"sabzi", name:"Tinday Gosht",    urdu:"ٹنڈے گوشت",    price:400, unit:"per plate", veg:false,
    desc:"Tinday simmered with meat for a fuller, hearty salan.",
    img: IMG("photo-1505253716362-afaea1d3d1af") },
  { id:"daal-mash",     cat:"sabzi", name:"Daal Mash",       urdu:"دال ماش",      price:350, unit:"per plate", veg:true,
    desc:"Dry-style white lentils with ginger juliennes and green chilli tarka.",
    img: IMG("photo-1626500155537-93690c24099a") },
  { id:"daal-channa",   cat:"sabzi", name:"Daal Channa",     urdu:"دال چنا",      price:350, unit:"per plate", veg:true,
    desc:"Hearty split-gram daal with a sizzling desi-ghee tarka.",
    img: IMG("photo-1631515243349-e0cb75fb8d3a") },
  { id:"daal-moong",    cat:"sabzi", name:"Daal Moong",      urdu:"دال مونگ",     price:350, unit:"per plate", veg:true,
    desc:"Light yellow moong — the easiest daal on the stomach, big on tarka.",
    img: IMG("photo-1547496502-affa22d38842") },
  { id:"daal-masoor",   cat:"sabzi", name:"Daal Masoor",     urdu:"دال مسور",     price:350, unit:"per plate", veg:true,
    desc:"Red lentils cooked soft with garlic tarka and fresh coriander.",
    img: IMG("photo-1585032226651-759b368d7246") },
  { id:"karhi-pakora",  cat:"sabzi", name:"Karhi Pakora",    urdu:"کڑھی پکوڑا",   price:300, unit:"per plate", veg:true,
    desc:"Tangy besan karhi with soft pakoray and a red-chilli tarka on top.",
    img: IMG("photo-1606491956689-2ea866880c84") },

  /* ---------- Rice & Daily Combos ---------- */
  { id:"biryani",      cat:"chawal", name:"Chicken Biryani", urdu:"چکن بریانی",  price:400, unit:"per plate", veg:false,
    desc:"Layered Lahori biryani with aloo, fried onions and home-mixed masala.",
    img: IMG("photo-1589302168068-964664d93dc0") },
  { id:"pulao",        cat:"chawal", name:"Chicken Pulao",   urdu:"چکن پلاؤ",    price:400, unit:"per plate", veg:false,
    desc:"Yakhni pulao — fragrant stock rice with tender chicken.",
    img: IMG("photo-1596797038530-2c107229654b") },
  { id:"daal-chawal",  cat:"chawal", name:"Daal Chawal",     urdu:"دال چاول",    price:500, unit:"per plate", veg:true,
    desc:"The nation's comfort plate: daal of the day over steamed rice, with achar.",
    img: IMG("photo-1567620905732-2d1ec7ab7445") },
  { id:"masoor-chawal",cat:"chawal", name:"Masoor Chawal",   urdu:"مسور چاول",   price:550, unit:"per plate", veg:true,
    desc:"Garlicky masoor daal over rice — simple, filling, homemade.",
    img: IMG("photo-1516684732162-798a0062be99") },
  { id:"plain-rice",   cat:"chawal", name:"Plain / Zeera Rice", urdu:"سادہ چاول", price:0, unit:"on request", veg:true, custom:true,
    desc:"All varieties of rice available on demand — WhatsApp us your requirement.",
    img: IMG("photo-1536304993881-ff6e9eefa2a6") },

  /* ---------- Chinese & Pasta ---------- */
  { id:"spaghetti",    cat:"chinese", name:"Chicken Spaghetti", urdu:"چکن سپیگیٹی", price:450, unit:"per plate", veg:false,
    desc:"Desi-Chinese spaghetti tossed with chicken, capsicum and a gentle kick.",
    img: IMG("photo-1551183053-bf91a1d81141") },
  { id:"macaroni",     cat:"chinese", name:"Chicken Macaroni",  urdu:"چکن میکرونی", price:450, unit:"per plate", veg:false,
    desc:"Saucy macaroni with chicken and vegetables — a lunchbox favourite.",
    img: IMG("photo-1621996346565-e3dbc646d9a9") },
  { id:"macaroni-veg", cat:"chinese", name:"Vegetable Macaroni",urdu:"ویجیٹیبل میکرونی", price:400, unit:"per plate", veg:true,
    desc:"Colourful veggie macaroni in a light, tangy sauce.",
    img: IMG("photo-1473093295043-cdd812d0e601") },
  { id:"white-pasta",  cat:"chinese", name:"White Sauce Pasta", urdu:"وائٹ ساس پاستا", price:600, unit:"per plate", veg:false,
    desc:"Creamy white-sauce pasta baked-style with chicken — rich and indulgent.",
    img: IMG("photo-1645112411341-6c4fd023714a") },

  /* ---------- Frozen & Add-ons ---------- */
  { id:"shami",   cat:"extras", name:"Shami Kabab (Frozen)", urdu:"شامی کباب", price:60, unit:"per piece", veg:false,
    desc:"Home-made shami kababs, frozen in batches — fry fresh whenever you need.",
    img: IMG("photo-1601050690597-df0568f70950") },
  { id:"roti",    cat:"extras", name:"Roti",        urdu:"روٹی",   price:60, unit:"each", veg:true,
    desc:"Fresh, soft roti made to go with your salan.", img: IMG("photo-1565280654386-36c3ea205462") },
  { id:"paratha", cat:"extras", name:"Paratha",     urdu:"پراٹھا", price:60, unit:"each", veg:true,
    desc:"Crisp-edged desi paratha.", img: IMG("photo-1606471191009-63994c53433b") },
  { id:"salad",   cat:"extras", name:"Fresh Salad", urdu:"سلاد",   price:60, unit:"per serving", veg:true,
    desc:"Kachumber-style salad: onion, tomato, cucumber, lemon.", img: IMG("photo-1546069901-ba9599a7e63c") },
  { id:"raita",   cat:"extras", name:"Raita",       urdu:"رائتہ",  price:60, unit:"per serving", veg:true,
    desc:"Cool mint-zeera raita.", img: IMG("photo-1571212515416-fef01fc43637") },
  { id:"achar",   cat:"extras", name:"Achar (Pickle)", urdu:"اچار", price:60, unit:"per serving", veg:true,
    desc:"Sharp mixed achar, the proper desi sidekick.", img: IMG("photo-1589135233689-31ad9b4f9a3c") }
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
  1: { day:"Monday",    name:"Daal Mash + 2 Roti",                 includes:["daal-mash"],  price:440, was:470 },
  2: { day:"Tuesday",   name:"Chicken Biryani + Raita",            includes:["biryani"],    price:430, was:460 },
  3: { day:"Wednesday", name:"Karhi Pakora + 2 Roti",              includes:["karhi-pakora"],price:390, was:420 },
  4: { day:"Thursday",  name:"Chicken White Handi + 2 Roti",       includes:["white-handi"],price:690, was:720 },
  5: { day:"Friday",    name:"Chicken Qorma + 2 Roti + Salad",     includes:["qorma"],      price:590, was:620 },
  6: { day:"Saturday",  name:"Chicken Pulao + 2 pc Shami Kabab",   includes:["pulao"],      price:480, was:520 },
  0: { day:"Sunday",    name:"Chicken Haleem + 2 Roti",            includes:["haleem"],     price:440, was:470 }
};

/* Office perks shown on the planner page. ✏️ EDIT to match what you actually offer. */
const OFFICE_PERKS = [
  "One fixed daily delivery slot for your office — food arrives together, hot.",
  "Free delivery on 10+ plates per day within our service areas.",
  "Change tomorrow's dish any time before 11:00 AM — just edit your planner.",
  "Roti, salad and raita added per-head so nobody fights over the last piece.",
  "Custom dishes on demand for office dawats and monthly treats."
];
