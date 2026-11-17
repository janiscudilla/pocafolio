import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Search, Plus, X, Pencil, Trash2, Image as ImageIcon, Download, Upload, ChevronDown, RotateCcw, Settings } from 'lucide-react';

const LOGO_DATA_URI = 'data:image/png;base64,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';
const STORAGE_KEY = 'photocards-v2';
const CUSTOM_LISTS_KEY = 'photocards-lists-v1';
const SAVED_VIEWS_KEY = 'photocards-views-v1';

// "Card Type / Benefit" (legacy key: category) — answers why/how a card was issued.
const DEFAULT_CATEGORIES = [
  "Album Inclusion", "Broadcast", "Cafe Event", "Collaboration Benefit", "Fansign", "Fanmeeting Benefit",
  "Holo Benefit", "Japan Fan Club Exclusive", "Lucky Draw", "Membership Exclusive", "Merch Inclusion", "POB",
  "Pop-up Benefit", "Random Pull / Trading", "Retail Exclusive", "Special Event", "Tour / Concert Benefit", "Venue Limited",
  "Video Call / Fancall", "Other",
];
// "Source / Retailer / Distributor / Partner" — who sold, distributed, hosted, or issued the benefit.
const HARDCODED_SOURCES = [
  "ATEEZ Official / KQ", "4nologue", "ALLMD", "Apple Music", "B.Stage", "Barnes & Noble",
  "Beatroad", "Billboard Magazine", "Bonus Exclusive", "Brmud", "CGV", "CU",
  "Cashbee", "Cawaii!", "DICON", "DMC Music", "DearMyMuse", "EMART",
  "EU Exclusive", "Everline", "FNAC", "Fromm Store", "HELLO82", "HELLOLIVE",
  "HIGHER", "HMV Japan", "Houseofkpop", "Idol Radio", "Indie Exclusive", "Interasia",
  "International Exclusive", "JJ Muze", "Japan Fan Club", "Jump Up Ent", "K*Bang Magazine", "KMonstar",
  "KNPOPS", "KPOPSTORE", "KTOWN4U", "Kaura", "Kplayground", "Kpop Nara",
  "Kpop2gether", "LATAM Exclusive", "Line Friends", "Lotte", "MAMA", "MBC Gayo Daejeon",
  "MMT / MyMusicTaste", "Makestar", "Matsukiyo", "Mernel", "MiniRecord", "Mokketshop",
  "Music Art", "Music Core", "Music Korea", "Music Plant", "Musinsa", "NHN Ticketlink",
  "NY Music", "Nacific", "Neotokyo", "Neowing", "Olive Young", "Ourbakery",
  "Pepsi", "Perrier", "Pott", "Rakuten Japan", "SBS Gayo Daejeon", "Seoul Festa",
  "Silent Soul", "Soundwave", "Subk Shop", "Synnara", "TOKTOQ", "Target",
  "TheSandbox", "Tower Records Japan", "UK Exclusive", "UMS", "US Exclusive", "Universal",
  "Universal Studios Japan", "Urban Outfitters", "Vandythepink", "WW", "Walmart", "Whosfan Cafe",
  "WithDrama", "WithMUU", "Wonderwall", "YES24", "YZY", "Other",
];
// Source values that indicate a Japan-market retailer/platform — used to narrow the Release/Edition
// autocomplete toward Japan Release editions when picking Music Release cards (see JP-narrowing below).
const JP_SOURCES = [
  "HMV Japan", "Rakuten Japan", "Tower Records Japan", "Japan Fan Club", "Neowing", "Kpop Nara",
  "Universal Studios Japan", "UMS",
];
// "Item Type" — the actual physical collectible/object. Photocard is the default and stays first.
const DEFAULT_ITEM_TYPES = [
  "Photocard",
  "Bookmark", "Character Card", "Film Photo", "ID Card", "ID Photo",
  "Image Card", "Mini Poster", "Photo Set", "Polaroid", "Postcard", "QR Card",
  "Sticker", "Timepiece Card", "Trading Card", "Other",
];
// "Product / Format" — the product/package the collectible came from. Keep the three common album formats first.
const DEFAULT_PRODUCT_FORMATS = [
  "Photobook Album", "POCAALBUM", "Digipack",
  "Birthday MD", "CD Player", "CD Player Album", "Character Merch", "Collaboration Product", "DVD / Blu-ray",
  "Fanmeeting Merch", "HIGHER TIMEPIECE", "ID Photo Set", "Japan Fan Club Membership", "Jewel Case",
  "Lenticular", "Membership Kit", "Official Merch / MD", "Photo Set", "Photobook", "Platform Album",
  "Pop-up Merch", "Season's Greetings", "Single CD / Jewel Case", "Spring Special MD", "Summer Special MD",
  "Tour / Concert Merch", "Trading Card / Photocard Pack", "Travel Pack", "Vinyl", "Vinyl / LP",
  "Winter Special MD", "Other",
];
// "Version / Edition" — a pure differentiator, separate from Card Type / Benefit.
const DEFAULT_VERSION_DETAILS = [
  "1.0", "2.0", "3.0", "1", "2", "3", "A", "Z", "Diary", "Red", "Pink", "Limited", "Standard", "Exclusive",
  "Hongjoong", "Jongho", "Mingi", "San", "Seonghwa", "Wooyoung", "Yeosang", "Yunho",
  "Winter", "Summer", "Spring", "Glossy", "Matte",
  "Week 1", "Week 2", "Week 3", "Week 4", "Week 5",
  "Round 1", "Round 2", "Round 3", "Round 4", "Round 5", "Round 6", "Round 7", "Round 8", "Round 9", "Round 10",
  "Streaming Event", "Streaming Event Unit", "Streaming Event Group", "Download Event", "Unit",
];
// "Character Series" and "Character" — which character IP / specific character.
const DEFAULT_CHARACTER_SERIES = ['ANITEEZ', 'MIGHTEEZ', 'Birthday Characters'];

// Bump number/date/note on EVERY build so the owner can tell at a glance which version is live and
// what changed. Rendered in the footer for the signed-in owner only (visitors never see it).
const BUILD_INFO = { number: 10, date: 'Nov 17, 2026', note: 'Each card now saves on its own (small, fast saves); leaving mid-save is warned' };

// ==== 3-tier Release taxonomy: Release Category → Collection/Line → Release/Edition ====
// Release Category is the new top-level field. Collection/Line's *options* are scoped by which
// category is selected (see RELEASE_CATEGORY_LINES below); Release/Edition (the existing `album`
// field, just relabeled) stays free text with autocomplete, same as before.
const RELEASE_CATEGORIES = ['Music Release', 'Merch Collection', 'Concert / Tour'];
const RELEASE_CATEGORY_LINES = {
  'Music Release': ['Full Album', 'Mini Album', 'Single', 'Special Album', 'Japan Release'],
  'Merch Collection': [
    'ANITEEZ', 'MIGHTEEZ', '8M1S', 'HIGHER TIMEPIECE', "Season's Greetings", 'Summer Photobook',
    'SuperStar', 'ATINY Fankit', 'Anniversary', 'Pop-up Event', 'Other',
  ],
  // Concert / Tour's second tier is Tour vs. Fanmeeting rather than a picked-from-list Collection/Line —
  // still stored in the same `collectionLine` field so the rest of the app doesn't need a separate slot.
  'Concert / Tour': ['Tour', 'Fanmeeting'],
};
// Release/Edition (the `album` field) → its parent Collection/Line, for auto-fill and one-time migration
// of existing cards. Picking a Release/Edition that's in this table auto-fills Release Category +
// Collection/Line so Janis never has to set those two manually in normal use.
const RELEASE_TO_COLLECTION_LINE = {
  "TREASURE EP.FIN: All To Action": { cat: "Music Release", line: "Full Album" },
  "ZERO : FEVER Part.1": { cat: "Music Release", line: "Full Album" },
  "THE WORLD EP.FIN: WILL": { cat: "Music Release", line: "Full Album" },
  "Ashes to Light": { cat: "Music Release", line: "Full Album" },
  "TREASURE EP.1: All To Zero": { cat: "Music Release", line: "Mini Album" },
  "TREASURE EP.2: Zero To One": { cat: "Music Release", line: "Mini Album" },
  "TREASURE EP.3: One To All": { cat: "Music Release", line: "Mini Album" },
  "TREASURE EPILOGUE: Action To Answer": { cat: "Music Release", line: "Mini Album" },
  "ZERO : FEVER Part.2": { cat: "Music Release", line: "Mini Album" },
  "ZERO : FEVER Part.3": { cat: "Music Release", line: "Mini Album" },
  "ZERO : FEVER EPILOGUE": { cat: "Music Release", line: "Mini Album" },
  "THE WORLD EP.1: MOVEMENT": { cat: "Music Release", line: "Mini Album" },
  "THE WORLD EP.2: OUTLAW": { cat: "Music Release", line: "Mini Album" },
  "GOLDEN HOUR : Part.1": { cat: "Music Release", line: "Mini Album" },
  "GOLDEN HOUR : Part.2": { cat: "Music Release", line: "Mini Album" },
  "GOLDEN HOUR : Part.3": { cat: "Music Release", line: "Mini Album" },
  "GOLDEN HOUR : Part.4": { cat: "Music Release", line: "Mini Album" },
  "GOLDEN HOUR : Part.5": { cat: "Music Release", line: "Mini Album" },
  "Birthday": { cat: "Music Release", line: "Mini Album" },
  "GOLDEN HOUR : Part.3 In Your Fantasy Edition": { cat: "Music Release", line: "Special Album" },
  "SPIN OFF: FROM THE WITNESS": { cat: "Music Release", line: "Single" },
  "Dreamers": { cat: "Music Release", line: "Single" },
  "Limitless": { cat: "Music Release", line: "Single" },
  "NOT OKAY": { cat: "Music Release", line: "Single" },
  "TREASURE EP.EXTRA: Shift The Map": { cat: "Music Release", line: "Japan Release" },
  "Into the A to Z": { cat: "Music Release", line: "Japan Release" },
  "BEYOND : ZERO": { cat: "Music Release", line: "Japan Release" },
  "BAD (Japanese ver.)": { cat: "Music Release", line: "Japan Release" },
  "THE WORLD EP. Paradigm": { cat: "Music Release", line: "Japan Release" },
  "ANITEEZ IN ILLUSION": { cat: "Merch Collection", line: "ANITEEZ" },
  "ANITEEZ IN ICE CITY": { cat: "Merch Collection", line: "ANITEEZ" },
  "ANITEEZ IN DREAMLAND": { cat: "Merch Collection", line: "ANITEEZ" },
  "ANITEEZ IN TREASURE": { cat: "Merch Collection", line: "ANITEEZ" },
  "ANITEEZ IN THE CALLING": { cat: "Merch Collection", line: "ANITEEZ" },
  "ANITEEZ IN DEJA VU": { cat: "Merch Collection", line: "ANITEEZ" },
  "Press, Start! Enter the MIGHTEEZ World": { cat: "Merch Collection", line: "MIGHTEEZ" },
  "MIGHTEEZ Wonder Room": { cat: "Merch Collection", line: "MIGHTEEZ" },
  "GOLDEN HOUR : Part.4 NASA": { cat: "Merch Collection", line: "HIGHER TIMEPIECE" },
  "GOLDEN HOUR : Part.4 SPACE ver.": { cat: "Merch Collection", line: "HIGHER TIMEPIECE" },
  "2020 Season's Greetings": { cat: "Merch Collection", line: "Season's Greetings" },
  "2021 Season's Greetings": { cat: "Merch Collection", line: "Season's Greetings" },
  "2022 Season's Greetings": { cat: "Merch Collection", line: "Season's Greetings" },
  "2023 Season's Greetings": { cat: "Merch Collection", line: "Season's Greetings" },
  "2024 Season's Greetings": { cat: "Merch Collection", line: "Season's Greetings" },
  "2025 Season's Greetings": { cat: "Merch Collection", line: "Season's Greetings" },
  "2026 Season's Greetings": { cat: "Merch Collection", line: "Season's Greetings" },
  "2022 Summer Photobook": { cat: "Merch Collection", line: "Summer Photobook" },
  "2023 Summer Photobook": { cat: "Merch Collection", line: "Summer Photobook" },
  "2024 Summer Photobook": { cat: "Merch Collection", line: "Summer Photobook" },
  "Madrid Edition": { cat: "Merch Collection", line: "SuperStar" },
  "Toronto Edition": { cat: "Merch Collection", line: "SuperStar" },
  "Sydney Edition": { cat: "Merch Collection", line: "SuperStar" },
  "London Edition": { cat: "Merch Collection", line: "SuperStar" },
  "Tokyo Edition": { cat: "Merch Collection", line: "SuperStar" },
  "2nd Fankit": { cat: "Merch Collection", line: "ATINY Fankit" },
  "3rd Fankit": { cat: "Merch Collection", line: "ATINY Fankit" },
  "4th Fankit": { cat: "Merch Collection", line: "ATINY Fankit" },
  "5th Fankit": { cat: "Merch Collection", line: "ATINY Fankit" },
  "6th Fankit": { cat: "Merch Collection", line: "ATINY Fankit" },
  "2nd Anniversary: Port of Call": { cat: "Merch Collection", line: "Anniversary" },
  "7th Anniversary": { cat: "Merch Collection", line: "Anniversary" },
  "8ROOM": { cat: "Merch Collection", line: "Pop-up Event" },
  "Destiny's Memories": { cat: "Merch Collection", line: "Pop-up Event" },
  "Harajuku XYZ Pop-up": { cat: "Merch Collection", line: "Pop-up Event" },
  "Taiwan Thunder Merch Pop-up": { cat: "Merch Collection", line: "Pop-up Event" },
  "Treasure Cafe": { cat: "Merch Collection", line: "Pop-up Event" },
  "ATINY Room": { cat: "Merch Collection", line: "Pop-up Event" },
  "XR Concert": { cat: "Merch Collection", line: "Pop-up Event" },
};
// Titles that exist on BOTH the KR and JP sides with the identical name (so the title string alone
// can't tell them apart — only Collection/Line can). Mapped above to their KR-side default; flagged
// here so the migration can call them out for a manual double-check rather than silently guessing.
const AMBIGUOUS_KR_JP_TITLES = ["Limitless", "NOT OKAY", "Birthday", "Ashes to Light"];
// Concert/Tour's Tour-vs-Fanmeeting sub-tier, auto-filled the same way Collection/Line is elsewhere.
const TOUR_FANMEETING_MAP = {
  "The Expedition Tour": "Tour",
  "The Fellowship: Map The Treasure": "Tour",
  "The Fellowship: Beginning of the End": "Tour",
  "The Fellowship: Break The Wall": "Tour",
  "Towards The Light: Will To Power": "Tour",
  "In Your Fantasy": "Tour",
  "ATINY's Voyage: From A to Z": "Fanmeeting",
  "ATINY's Voyage : From A to Z": "Fanmeeting",
  "DAWN:26": "Fanmeeting",
  "ATINY's Voyage: Tiny Mystery": "Fanmeeting",
  "ATINY's Voyage : Tiny Mystery": "Fanmeeting",
};
const CHARACTER_MAP = {
  ANITEEZ: ['Jjoongrami', 'Ddeongbyeoli', 'Tyudeongi', 'Hetmongi', 'Sandeoki', 'Bbyongming', 'Wooyonyang', 'Jjongbear'],
  MIGHTEEZ: ['Hongyo', 'Ddeongyo', 'Tyuyo', 'Ddangyo', 'Saniyo', 'Mingyo', 'Kkamyo', 'Jjongyo'],
  'Birthday Characters': ['Hoi', 'Silbeoni', 'Pudeongi', 'Hehetmon', 'Sandeongi', 'Mingtteok', 'Wooyeowoo', 'Jjongdoli'],
};
// Same member order each CHARACTER_MAP array above was written in — lets Stats map a
// missing character (e.g. "Sandeoki") back to its member (e.g. "San") for completion tracking.
const ATEEZ_MEMBER_ORDER = ['Hongjoong', 'Seonghwa', 'Yunho', 'Yeosang', 'San', 'Mingi', 'Wooyoung', 'Jongho'];
const OWNED_COLOR = '#7FA687';
const SOLD_COLOR = '#6B6470';
const STATUSES = [
  { value: 'Unowned', color: '#5B6472' },
  { value: 'Wishlist', color: '#8B8FC9' },
  { value: 'Purchased', color: '#E3A34A' },
  { value: 'Owned', color: OWNED_COLOR },
  { value: 'Sold', color: SOLD_COLOR },
];

const theme = {
  bg: '#F4F0E7',
  surface: '#FFFFFF',
  surfaceAlt: '#EDE6D8',
  border: '#DDD2BE',
  text: '#2A241E',
  muted: '#8C8070',
  accent: '#2A241E',
  plum: '#4B3F52',
  sage: '#5C6650',
  mauve: '#6E4F52',
};
const PLACEHOLDER_PALETTE = ['#4B3F52', '#6E4F52', '#5C6650', '#5A4D3E'];
function placeholderColorFor(id) {
  let h = 0;
  for (let i = 0; i < (id || '').length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return PLACEHOLDER_PALETTE[h % PLACEHOLDER_PALETTE.length];
}

const emptyForm = {
  group: '', member: '', album: '', itemType: '', productFormat: '',
  category: '', releaseDate: '',
  releaseCategory: '', collectionLine: '',
  coMembers: [],
  source: '', versionDetail: [],
  characterSeries: '', character: '',
  status: 'Unowned', frontImage: '', backImage: '', dateSold: '', notes: '', copies: [],
  imageCrop: null,
  backImageCrop: null,
};

// The prompt Janis pastes into a Claude chat (together with a screenshot of a fan-made photocard
// template) to get back the JSON that "Bulk create from list" reads. Built on demand so the lists
// it quotes (known release names, item types, card types, formats) always match what the app uses.
function buildBulkCreatePrompt(lists = {}) {
  // `lists` carries her live values (custom item types, product formats, shops, releases she's already
  // entered) so the reply uses her spellings; the built-in defaults are the fallback.
  const itemTypes = lists.itemTypes || DEFAULT_ITEM_TYPES;
  const categories = lists.categories || DEFAULT_CATEGORIES;
  const productFormats = lists.productFormats || DEFAULT_PRODUCT_FORMATS;
  const sources = lists.sources || HARDCODED_SOURCES;
  const seedTitles = [...Object.keys(RELEASE_TO_COLLECTION_LINE), ...Object.keys(TOUR_FANMEETING_MAP)]
    .filter(t => !/ : /.test(t) || !TOUR_FANMEETING_MAP[t.replace(' : ', ': ')]);
  const releaseNames = [...seedTitles];
  (lists.albums || []).forEach(a => { if (!releaseNames.some(t => looseKey(t) === looseKey(a))) releaseNames.push(a); });
  return [
    "I'm attaching a screenshot of a fan-made photocard template. List EVERY individual card shown — each thumbnail is one card; don't skip any and don't merge any.",
    '',
    'Reply with ONLY a JSON array — no commentary, no markdown code fence. One object per card:',
    '{',
    '  "group": "e.g. ATEEZ",',
    '  "member": "full stage name of the member on the card",',
    '  "coMembers": ["any OTHER members on the same card — only for duo/unit cards; otherwise []"],',
    '  "album": "the release this card belongs to",',
    '  "itemType": "what the object is",',
    '  "productFormat": "the product it came with, if shown — else \\"\\"",',
    '  "versionDetail": ["short version tags"],',
    '  "category": "the card type / benefit, if the template shows one — else \\"\\"",',
    '  "releaseDate": "YYYY, YYYY-MM or YYYY-MM-DD if you can tell — else \\"\\"",',
    '  "source": "the store / platform / partner named in the template — else \\"\\"",',
    '  "notes": "see Notes below"',
    '}',
    '',
    'MEMBERS',
    '- Use full stage names. For ATEEZ: Hongjoong, Seonghwa, Yunho, Yeosang, San, Mingi, Wooyoung, Jongho. Templates often use initials instead (HJ, SH, YH, YS, SN, MG, WY, JH) — expand them.',
    "- Take the member from the template's own labels: column headers, row labels, captions.",
    '- If the cards are NOT labeled and a set has exactly 8 cards (one per member), they follow the standard order above — template makers almost always do. Read in normal reading order: left to right, then top to bottom. A 4 + 4 grid reads Hongjoong, Seonghwa, Yunho, Yeosang, then San, Mingi, Wooyoung, Jongho. If every row or section holds its own 8 (e.g. one row per version), the order starts over in each row.',
    '- If the cards are NOT labeled and the set does not have exactly 8 cards (for example a duo/unit sheet), leave "member" as "" and write "members not labeled" in notes — don\'t guess. Never work out who someone is from their face.',
    '- If one card shows two or more members, put the first-listed one in "member" and the rest in "coMembers".',
    '',
    'RELEASE (album)',
    'Use these exact spellings whenever the template\'s release matches one of them; otherwise copy the template\'s own spelling:',
    releaseNames.join(' | '),
    '',
    'ITEM TYPE — use one of: ' + itemTypes.filter(t => t !== 'Other').join(', ') + '.',
    'If a row or section label starts with the item type (e.g. "CHARACTER CARD A VER"), that is the itemType and the rest is the version. Postcard templates are itemType "Postcard".',
    '',
    'VERSION (versionDetail) — an array of short tags. Keep the version name together with any photo-variant letter or number, exactly as labeled but tidied: "A ver. A", "A ver. Z", "Diary ver. A", "Z ver. Z", "Z ver. 1", "Kongsoonteez ver.". A row labeled "A VER A" becomes ["A ver. A"]. A section labeled only "A VER" becomes ["A ver."]. Extra attributes can be extra tags, e.g. ["Black ver.", "Image Card"].',
    '',
    'CARD TYPE / BENEFIT (category) — use one of: ' + categories.filter(t => t !== 'Other').join(', ') + '. Banners like "pre-order benefit", "lucky draw", "gift with purchase" or "offline" map to the nearest one; if none fits, leave it "" and mention the banner text in notes.',
    '',
    'PRODUCT / FORMAT (productFormat) — use one of: ' + productFormats.filter(t => t !== 'Other').join(', ') + ' — only if the template says so.',
    '',
    'SOURCE — the store / platform / partner named in the template. If it matches one of these, use that exact spelling; otherwise copy the template\'s own: ' + sources.filter(t => t !== 'Other').join(', ') + '.',
    '',
    'NOTES — the template credit if visible (e.g. "Template: @inateezna"), plus anything notable you couldn\'t put in another field. Otherwise "".',
    '',
    'Leave a field "" (or [] for the lists) rather than guessing when it isn\'t shown or legible.',
  ].join('\n');
}

function toTags(v) {
  if (Array.isArray(v)) return v;
  if (v) return [v];
  return [];
}

// Loose normalization for duplicate-entry matching — case/whitespace only, not a fuzzy match.
function normVal(v) {
  return (v || '').toString().trim().toLowerCase().replace(/\s+/g, ' ');
}

// Every member a card is listed under: its main member first, then anyone else on the card
// (duo / unit cards). The card is still ONE card — this only controls whose filters, searches
// and per-member breakdowns it appears in.
function cardMembers(card) {
  const out = [];
  [card.member, ...toTags(card.coMembers)].forEach(m => {
    const t = (m || '').toString().trim();
    if (t && !out.some(x => normVal(x) === normVal(t))) out.push(t);
  });
  return out;
}
function memberLabel(card) {
  return cardMembers(card).join(' & ');
}
function allMembersOf(list) {
  return list.reduce((acc, c) => acc.concat(cardMembers(c)), []);
}

// Turns http(s) links inside free text (e.g. Notes) into real links that open in a new tab. Only
// http/https are linked. Punctuation that usually trails a link in a sentence (. , ; : ! ?) stays
// outside it, and so does a closing ")" unless the URL has a matching "(" (e.g. Wikipedia-style links).
function linkifyText(text) {
  return String(text).split(/(https?:\/\/[^\s<>"']+)/g).map((part, i) => {
    if (!/^https?:\/\//.test(part)) return part;
    let url = part, trail = '';
    while (url.length > 0) {
      const last = url[url.length - 1];
      const unbalancedParen = last === ')' && (url.match(/\)/g) || []).length > (url.match(/\(/g) || []).length;
      if (/[.,;:!?]/.test(last) || unbalancedParen) { trail = last + trail; url = url.slice(0, -1); } else break;
    }
    return (
      <React.Fragment key={i}>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: theme.plum, textDecoration: 'underline' }}>{url}</a>{trail}
      </React.Fragment>
    );
  });
}

// ---- Importing cards from fan-made templates ----
// Looser than normVal on purpose: two templates often spell the same thing a little differently
// ("Kongsoonteez ver." vs "kongsoonteez ver", "Voyage : Tiny" vs "Voyage: Tiny"). This is only used to
// FLAG likely repeats for review and to snap known release names to one spelling — never to drop anything.
function looseKey(v) {
  return normVal(v).replace(/[.'’`"]/g, '').replace(/\s*:\s*/g, ':');
}
const ATEEZ_ABBREVIATIONS = { hj: 'Hongjoong', sh: 'Seonghwa', yh: 'Yunho', ys: 'Yeosang', sn: 'San', mg: 'Mingi', wy: 'Wooyoung', jh: 'Jongho' };
// Expands initials (HJ → Hongjoong) and fixes casing for ATEEZ members; anything else is left as written.
function canonicalMemberName(name, group) {
  const t = (name || '').toString().trim();
  if (!t) return '';
  const k = normVal(t);
  const isAteez = !group || normVal(group) === 'ateez';
  if (isAteez && ATEEZ_ABBREVIATIONS[k]) return ATEEZ_ABBREVIATIONS[k];
  if (isAteez) {
    const known = ATEEZ_MEMBER_ORDER.find(m => normVal(m) === k);
    if (known) return known;
  }
  return t;
}
// Prefers the spelling already used in her binder, then the seed catalog's, then whatever was written.
function canonicalAlbumFor(album, existingAlbums) {
  const key = looseKey(album);
  if (!key) return album;
  const mine = existingAlbums.find(a => looseKey(a) === key);
  if (mine) return mine;
  const seed = [...Object.keys(RELEASE_TO_COLLECTION_LINE), ...Object.keys(TOUR_FANMEETING_MAP)].find(t => looseKey(t) === key);
  return seed || album;
}
// Release Category + Collection/Line for a known release name (same lookup the Add form's auto-fill uses).
function taxonomyFor(album) {
  const key = looseKey(album);
  if (!key) return null;
  const releaseHit = Object.keys(RELEASE_TO_COLLECTION_LINE).find(t => looseKey(t) === key);
  if (releaseHit) return { releaseCategory: RELEASE_TO_COLLECTION_LINE[releaseHit].cat, collectionLine: RELEASE_TO_COLLECTION_LINE[releaseHit].line };
  const tourHit = Object.keys(TOUR_FANMEETING_MAP).find(t => looseKey(t) === key);
  if (tourHit) return { releaseCategory: 'Concert / Tour', collectionLine: TOUR_FANMEETING_MAP[tourHit] };
  return null;
}
// "Probably the same card": same group, same set of members, same release, same version tags — and
// product / card type / item type either match or are blank on one side (a different template may simply
// not mention them). Source is ignored: the same card is often credited to different shops.
//
// Pass { source: true } to ALSO require the shops to be compatible — used when she types a card in by hand,
// where two POB cards for the same member and version from different shops really are different cards.
// Compatible = either is blank, or one shop's words are all contained in the other's ("KQ" inside
// "ATEEZ Official / KQ", "Whosfan" inside "Whosfan Cafe"). Imports leave it off, since a different template
// may credit the same card to a differently-spelled shop.
function sourcesCompatible(x, y) {
  const words = v => looseKey(v).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  const a = words(x), b = words(y);
  if (a.length === 0 || b.length === 0) return true;
  const [small, big] = a.length <= b.length ? [a, b] : [b, a];
  return small.every(w => big.includes(w));
}
function sameCardLoose(a, b, opts = {}) {
  const eq = (x, y) => !normVal(x) || !normVal(y) || normVal(x) === normVal(y);
  const membersKey = c => cardMembers(c).map(normVal).sort().join('&');
  const versionKey = c => toTags(c.versionDetail).map(looseKey).sort().join('+');
  return eq(a.group, b.group)
    && membersKey(a) === membersKey(b)
    && looseKey(a.album) === looseKey(b.album)
    && versionKey(a) === versionKey(b)
    && eq(a.itemType, b.itemType) && eq(a.productFormat, b.productFormat) && eq(a.category, b.category)
    && (!opts.source || sourcesCompatible(a.source, b.source));
}
// One-line descriptions of an existing card, for the duplicate warning.
function cardSummaryLine(c) {
  return [memberLabel(c), c.album, toTags(c.versionDetail).join(' · '), c.source].filter(Boolean).join(' · ');
}
function cardHoldingLine(c) {
  const n = (c.copies || []).length;
  const b = cardBadge(c);
  return `${b ? b.label : 'Unowned'}${n > 0 ? ` · ${n} cop${n !== 1 ? 'ies' : 'y'}` : ''}`;
}

// Crop box aspect ratio the card frame displays at (55:85, real photocard proportions). The box
// you drag in ImageCropper is freeform (see note below) — this constant is what CroppedImage uses
// to pick the sub-window of that box it actually shows, and what ImageCropper now uses to draw a
// preview outline of that same sub-window, so the tool doesn't visually imply more gets kept than
// actually does.
const CROP_RATIO = 85 / 55;

// A sensible centered crop box (in natural pixel units) for an image whose crop hasn't been set yet.
function defaultCropFor(natW, natH) {
  const w = Math.min(natW, natH / CROP_RATIO);
  const h = w * CROP_RATIO;
  return { x: (natW - w) / 2, y: (natH - h) / 2, w, h };
}

function clampNum(v, min, max) { return Math.max(min, Math.min(max, v)); }

// Computes a new crop box after dragging one of the 8 handles by (dxPx, dyPx) natural pixels.
// Freeform: each handle moves only the edge(s) it touches; the box's aspect ratio is not locked.
// (Locking this was tried and explicitly reverted — a locked ratio forces either cutting off
// part of the photo or leaving unwanted padding when the source image isn't card-shaped.
// CROP_RATIO is only a starting suggestion via defaultCropFor below.)
function resizeCropBox(handleId, start, dxPx, dyPx, natW, natH) {
  const MIN = Math.min(natW, natH) * 0.05;
  const { x, y, w, h } = start;
  let nx = x, ny = y, nw = w, nh = h;

  switch (handleId) {
    case 'tl': { const bx = x + w, by = y + h; nw = w - dxPx; nh = h - dyPx; nx = bx - nw; ny = by - nh; break; }
    case 'tr': { const by = y + h; nw = w + dxPx; nh = h - dyPx; ny = by - nh; break; }
    case 'bl': { const bx = x + w; nw = w - dxPx; nh = h + dyPx; nx = bx - nw; break; }
    case 'br': { nw = w + dxPx; nh = h + dyPx; break; }
    case 'top': { const by = y + h; nh = h - dyPx; ny = by - nh; break; }
    case 'bottom': { nh = h + dyPx; break; }
    case 'left': { const bx = x + w; nw = w - dxPx; nx = bx - nw; break; }
    case 'right': { nw = w + dxPx; break; }
    default: break;
  }

  nw = clampNum(nw, MIN, natW);
  nh = clampNum(nh, MIN, natH);
  nx = clampNum(nx, 0, natW - nw);
  ny = clampNum(ny, 0, natH - nh);
  return { x: nx, y: ny, w: nw, h: nh };
}

// Renders an image cropped to a natural-pixel box (or a sensible default), using pure CSS
// percentages so it works at any container size without measuring layout. If the crop's own
// shape doesn't match the display frame, it's letterboxed (never stretched/distorted).
function CroppedImage({ src, crop, style, onError }) {
  const [nat, setNat] = useState(null);
  const imgRef = useRef(null);
  useEffect(() => {
    setNat(null);
    // Data: URI images can finish decoding before this effect attaches a fresh onLoad
    // listener (especially once the browser already has them in memory), so onLoad alone
    // can be missed — check synchronously in case the image is already complete.
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth) {
      setNat({ w: img.naturalWidth, h: img.naturalHeight });
    }
  }, [src]);
  function handleLoad(e) {
    setNat({ w: e.target.naturalWidth, h: e.target.naturalHeight });
  }
  let imgStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' };
  if (nat) {
    const c = (crop && crop.w) ? crop : defaultCropFor(nat.w, nat.h);
    // Same "largest sub-window matching CROP_RATIO, centered in the box" math ImageCropper uses
    // for its gold guide — kept in lockstep so what's previewed there is exactly what renders here.
    const targetAspect = 55 / 85;
    const boxAspect = c.w / c.h;
    let visX, visY, visW, visH;
    if (boxAspect > targetAspect) {
      visH = c.h; visW = c.h * targetAspect;
      visX = c.x + (c.w - visW) / 2; visY = c.y;
    } else {
      visW = c.w; visH = c.w / targetAspect;
      visX = c.x; visY = c.y + (c.h - visH) / 2;
    }
    imgStyle = {
      position: 'absolute',
      width: `${(nat.w / visW) * 100}%`,
      height: `${(nat.h / visH) * 100}%`,
      left: `${-(visX / visW) * 100}%`,
      top: `${-(visY / visH) * 100}%`,
      maxWidth: 'none',
    };
  }
  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      onLoad={handleLoad}
      onError={onError}
      style={{ ...style, ...imgStyle }}
    />
  );
}

function versionName(card) {
  return [card.source, ...toTags(card.versionDetail)].filter(Boolean).join(' ').trim();
}

function resolveImageUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('data:')) return trimmed;
  const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return `https://drive.google.com/thumbnail?id=${fileMatch[1]}&sz=w1000`;
  const openMatch = trimmed.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) return `https://drive.google.com/thumbnail?id=${openMatch[1]}&sz=w1000`;
  const ucMatch = trimmed.match(/drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/);
  if (ucMatch) return `https://drive.google.com/thumbnail?id=${ucMatch[1]}&sz=w1000`;
  return trimmed;
}

function fileToCompressedDataUrl(file, maxDim = 700, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) { height = Math.round(height * (maxDim / width)); width = maxDim; }
        else if (height >= width && height > maxDim) { width = Math.round(width * (maxDim / height)); height = maxDim; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function parsePrice(str) {
  if (!str) return 0;
  const match = String(str).match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

function sumSpent(card) {
  return (card.copies || []).reduce((sum, c) => sum + parsePrice(c.price), 0);
}

// The most recent copy date for a card (its "purchased" position), or null if it has
// no dated copies yet. Dates are YYYY/YYYY-MM/YYYY-MM-DD strings, which sort correctly
// as plain strings.
function cardPurchaseDate(card) {
  const dates = (card.copies || []).map(c => c.date).filter(Boolean);
  return dates.length > 0 ? dates.reduce((max, d) => (d > max ? d : max)) : null;
}

// Renders a computed money total with thousands separators, e.g. 1000 -> "1,000.00".
function formatCurrency(n) {
  return (n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Copy dates are stored as "YYYY", "YYYY-MM", or "YYYY-MM-DD" — the string length
// itself tells us how precisely the user actually knows the date.
function getDatePrecision(dateStr) {
  if (!dateStr) return null;
  if (dateStr.length === 4) return 'year';
  if (dateStr.length === 7) return 'month';
  if (dateStr.length >= 10) return 'day';
  return null;
}

function copyDateRange(dateStr) {
  const precision = getDatePrecision(dateStr);
  if (precision === 'day') return [dateStr.slice(0, 10), dateStr.slice(0, 10)];
  if (precision === 'month') {
    const [y, m] = dateStr.split('-');
    const lastDay = new Date(parseInt(y, 10), parseInt(m, 10), 0).getDate();
    return [`${dateStr}-01`, `${dateStr}-${pad2(lastDay)}`];
  }
  if (precision === 'year') return [`${dateStr}-01-01`, `${dateStr}-12-31`];
  return [null, null];
}

function periodBoundsFor(period, customStart, customEnd) {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
  const monthStr = todayStr.slice(0, 7);
  const yearStr = String(now.getFullYear());
  if (period === 'today') return { type: 'day', value: todayStr, label: formatFlexDate(todayStr) };
  if (period === 'month') return { type: 'month', value: monthStr, label: formatFlexDate(monthStr) };
  if (period === 'year') return { type: 'year', value: yearStr, label: yearStr };
  if (period === 'custom') {
    const s = customStart || '0001-01-01';
    const e = customEnd || '9999-12-31';
    const label = (customStart && customEnd) ? `${formatFlexDate(customStart)} – ${formatFlexDate(customEnd)}` : 'Pick a range below';
    return { type: 'range', start: s, end: e, label };
  }
  return { type: 'all', label: 'All time' };
}

// Respects precision: a "2026" purchase never counts as belonging to a specific
// day or month, only to that year (and All Time / a range that covers it).
function copyMatchesPeriod(copy, bounds) {
  if (!copy || !copy.date) return false;
  const precision = getDatePrecision(copy.date);
  if (!precision) return false;
  if (bounds.type === 'all') return true;
  if (bounds.type === 'day') return precision === 'day' && copy.date === bounds.value;
  if (bounds.type === 'month') return precision !== 'year' && copy.date.slice(0, 7) === bounds.value;
  if (bounds.type === 'year') return copy.date.slice(0, 4) === bounds.value;
  if (bounds.type === 'range') {
    const [minD, maxD] = copyDateRange(copy.date);
    if (!minD) return false;
    return minD <= bounds.end && maxD >= bounds.start;
  }
  return false;
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function mostCommon(arr) {
  const counts = {};
  arr.forEach(v => { if (v) counts[v] = (counts[v] || 0) + 1; });
  let best = '', bestCount = 0;
  Object.entries(counts).forEach(([k, c]) => { if (c > bestCount) { best = k; bestCount = c; } });
  return best;
}

// Once it's bought, it's yours — Purchased counts as owned alongside Owned.
// (They're still separate statuses: Purchased = paid for, not in hand yet.)
function isOwned(card) {
  return card.status === 'Owned' || card.status === 'Purchased';
}

function cardBadge(card) {
  if (!card.status || card.status === 'Unowned') return null;
  const s = STATUSES.find(s => s.value === card.status);
  return { label: card.status, color: s ? s.color : theme.muted };
}

// Drawn inline on purpose: the standalone build swaps lucide-react for its own small icon set,
// so a new library icon would need a matching hand-added shim there. This works in both.
function CopyIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="pc-label block text-[10px] mb-1" style={{ color: theme.muted }}>{label}</span>
      {children}
    </label>
  );
}

function ImageField({ label, value, onChange, crop, onCropChange }) {
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [dropError, setDropError] = useState('');
  const [showCrop, setShowCrop] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);

  async function processFile(file) {
    if (!file) return;
    setBusy(true);
    setDropError('');
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      setDropError("Couldn't read that photo — try again, or save it to your device first.");
    } finally {
      setBusy(false);
    }
  }

  async function handleFile(e) {
    await processFile(e.target.files[0]);
    e.target.value = '';
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
      return;
    }
    // Some sources (e.g. dragging an <img> straight off a webpage) don't hand over an
    // actual file — just a link to it. Treat that the same as pasting a link instead of
    // silently doing nothing.
    const url = (e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('URL') || e.dataTransfer.getData('text/plain') || '').trim();
    if (/^https?:\/\//i.test(url)) {
      onChange(url);
      setDropError('');
      return;
    }
    setDropError("Couldn't get an image from that — try dragging a saved photo file, or paste a link below instead.");
  }

  const hasImage = !!value;
  return (
    <div>
      <span className="pc-label block text-[10px] mb-1.5" style={{ color: theme.muted }}>{label}</span>
      <div
        onDragOver={e => { if (!hasImage) { e.preventDefault(); setDragOver(true); } }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { if (!hasImage) handleDrop(e); }}
        className="relative mx-auto rounded overflow-hidden"
        style={{
          width: '100%', maxWidth: 220, aspectRatio: '55 / 85',
          background: hasImage ? theme.surfaceAlt : (dragOver ? theme.surfaceAlt : 'transparent'),
          border: `1.5px dashed ${dragOver ? theme.accent : theme.border}`,
        }}
      >
        {hasImage ? (
          <>
            <CroppedImage src={resolveImageUrl(value)} crop={crop} />
            <button type="button" onClick={() => onChange('')} title="Remove" className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)' }}>
              <X size={12} color="#fff" />
            </button>
            {onCropChange && (
              <button type="button" onClick={() => setShowCrop(s => !s)} title="Adjust crop" className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)' }}>
                <Pencil size={11} color="#fff" />
              </button>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-4">
            <div className="w-7 h-7 rounded flex items-center justify-center" style={{ border: `1px solid ${theme.border}` }}>
              <Plus size={14} style={{ color: theme.muted }} />
            </div>
            <span className="text-[11px]" style={{ color: theme.muted }}>
              {busy ? 'Processing photo...' : <>Drop a scan<br />or click to browse</>}
            </span>
            <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" title="" />
          </div>
        )}
      </div>

      {dropError && <p className="text-[11px] mt-1.5 text-center" style={{ color: '#A24A3E' }}>{dropError}</p>}

      {!hasImage && (
        showLinkInput ? (
          <input autoFocus value={value} onChange={e => onChange(e.target.value)} placeholder="Drive, Pinterest, Canva link" className="w-full mt-2 px-2.5 py-1.5 rounded text-xs" style={{ maxWidth: 220, marginLeft: 'auto', marginRight: 'auto', display: 'block' }} />
        ) : (
          <button type="button" onClick={() => setShowLinkInput(true)} className="block mx-auto mt-1.5 text-[11px] underline" style={{ color: theme.muted }}>
            or paste a link instead
          </button>
        )
      )}

      {hasImage && showCrop && onCropChange && (
        <div className="mt-3">
          <ImageCropper src={resolveImageUrl(value)} crop={crop} onChange={onCropChange} />
        </div>
      )}
    </div>
  );
}

function SelectOrNew({ label, value, options, onChange, placeholder, compact }) {
  const [query, setQuery] = useState(value || '');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => { setQuery(value || ''); }, [value]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));
  const exactMatch = options.some(o => o.toLowerCase() === query.trim().toLowerCase());

  function selectValue(v) {
    onChange(v);
    setQuery(v);
    setOpen(false);
  }

  const inputEl = (
    <input
      value={query}
      onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
      onFocus={() => setOpen(true)}
      placeholder={placeholder}
      className={compact ? 'w-full px-2 py-1.5 rounded text-xs' : 'w-full px-2.5 py-1.5 rounded text-sm'}
    />
  );

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      {label ? (
        <label className="block">
          <span className="pc-label block text-[10px] mb-1" style={{ color: theme.muted }}>{label}</span>
          {inputEl}
        </label>
      ) : inputEl}
      {open && (filtered.length > 0 || query.trim()) && (
        <div className="absolute left-0 right-0 mt-1 rounded overflow-y-auto pc-scroll z-20" style={{ maxHeight: 180, background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
          {filtered.map(o => (
            <button key={o} type="button" onClick={() => selectValue(o)} className="block w-full text-left px-3 py-2 text-sm" style={{ borderBottom: `1px solid ${theme.border}` }}>
              {o}
            </button>
          ))}
          {query.trim() && !exactMatch && (
            <button type="button" onClick={() => selectValue(query.trim())} className="block w-full text-left px-3 py-2 text-sm font-medium" style={{ color: theme.accent }}>
              + Add "{query.trim()}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function ImageCropper({ src, crop, onChange }) {
  const [nat, setNat] = useState(null);
  useEffect(() => { setNat(null); }, [src]);
  const containerRef = useRef(null);
  const dragRef = useRef(null);
  const DISPLAY_W = 260; // preferred width — the actual rendered width can end up narrower on
  // small screens (maxWidth: 100% below), so drag math measures the real width at drag-start
  // rather than assuming this number, and the container itself uses aspect-ratio (not a fixed
  // pixel height) so it's never disproportionate to however wide it actually rendered.

  function handleImgLoad(e) {
    const w = e.target.naturalWidth, h = e.target.naturalHeight;
    setNat({ w, h });
    if (!crop || !crop.w) onChange(defaultCropFor(w, h));
  }

  function currentScale() {
    const renderedW = containerRef.current ? containerRef.current.getBoundingClientRect().width : DISPLAY_W;
    return renderedW / nat.w;
  }

  function handleMove(e) {
    const d = dragRef.current;
    if (!d || !nat) return;
    const dxPx = (e.clientX - d.startClientX) / d.scale;
    const dyPx = (e.clientY - d.startClientY) / d.scale;
    if (d.mode === 'pan') {
      const newX = clampNum(d.start.x + dxPx, 0, nat.w - d.start.w);
      const newY = clampNum(d.start.y + dyPx, 0, nat.h - d.start.h);
      onChange({ x: newX, y: newY, w: d.start.w, h: d.start.h });
    } else {
      onChange(resizeCropBox(d.mode, d.start, dxPx, dyPx, nat.w, nat.h));
    }
  }
  function handleUp() {
    dragRef.current = null;
    window.removeEventListener('pointermove', handleMove);
    window.removeEventListener('pointerup', handleUp);
  }
  function startDrag(mode, e, c) {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = { mode, startClientX: e.clientX, startClientY: e.clientY, start: { x: c.x, y: c.y, w: c.w, h: c.h }, scale: currentScale() };
    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
  }

  if (!nat) {
    return (
      <div style={{ width: DISPLAY_W, maxWidth: '100%', margin: '0 auto' }}>
        <img src={src} alt="" onLoad={handleImgLoad} style={{ width: '100%', opacity: 0, display: 'block' }} />
        <p className="text-[10px] text-center mt-1" style={{ color: theme.muted }}>Loading image…</p>
      </div>
    );
  }

  const c = (crop && crop.w) ? crop : defaultCropFor(nat.w, nat.h);
  // Percentages of the natural image size — correct at any rendered width, no scale factor needed.
  const box = { left: (c.x / nat.w) * 100, top: (c.y / nat.h) * 100, width: (c.w / nat.w) * 100, height: (c.h / nat.h) * 100 };
  const overlay = 'rgba(0,0,0,0.55)';

  // The box you drag is freeform, but the card everywhere else is always shown at CROP_RATIO —
  // CroppedImage center-crops down to that ratio at display time. Compute that same sub-window
  // here (standard "cover" math) so this tool's guide matches what actually ends up on the card,
  // instead of implying the whole dashed box is what's kept.
  const targetAspect = 55 / 85;
  const boxAspect = c.w / c.h;
  let visX, visY, visW, visH;
  if (boxAspect > targetAspect) {
    visH = c.h; visW = c.h * targetAspect;
    visX = c.x + (c.w - visW) / 2; visY = c.y;
  } else {
    visW = c.w; visH = c.w / targetAspect;
    visX = c.x; visY = c.y + (c.h - visH) / 2;
  }
  const visBox = { left: (visX / nat.w) * 100, top: (visY / nat.h) * 100, width: (visW / nat.w) * 100, height: (visH / nat.h) * 100 };
  const showVisGuide = Math.abs(visBox.width - box.width) > 0.5 || Math.abs(visBox.height - box.height) > 0.5;

  const handleDefs = [
    { id: 'tl', style: { top: -6, left: -6, width: 12, height: 12 }, cursor: 'nwse-resize' },
    { id: 'tr', style: { top: -6, right: -6, width: 12, height: 12 }, cursor: 'nesw-resize' },
    { id: 'bl', style: { bottom: -6, left: -6, width: 12, height: 12 }, cursor: 'nesw-resize' },
    { id: 'br', style: { bottom: -6, right: -6, width: 12, height: 12 }, cursor: 'nwse-resize' },
    { id: 'top', style: { top: -5, left: '50%', transform: 'translateX(-50%)', width: 28, height: 8 }, cursor: 'ns-resize' },
    { id: 'bottom', style: { bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 28, height: 8 }, cursor: 'ns-resize' },
    { id: 'left', style: { left: -5, top: '50%', transform: 'translateY(-50%)', width: 8, height: 28 }, cursor: 'ew-resize' },
    { id: 'right', style: { right: -5, top: '50%', transform: 'translateY(-50%)', width: 8, height: 28 }, cursor: 'ew-resize' },
  ];

  return (
    <div>
      <div
        ref={containerRef}
        style={{ position: 'relative', width: DISPLAY_W, maxWidth: '100%', aspectRatio: `${nat.w} / ${nat.h}`, margin: '0 auto', borderRadius: 8, overflow: 'hidden', touchAction: 'none' }}
      >
        <img src={src} alt="" draggable={false} style={{ width: '100%', height: '100%', display: 'block', userSelect: 'none', objectFit: 'contain' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: `${box.top}%`, background: overlay, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, top: `${box.top + box.height}%`, right: 0, bottom: 0, background: overlay, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: 0, top: `${box.top}%`, width: `${box.left}%`, height: `${box.height}%`, background: overlay, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', left: `${box.left + box.width}%`, top: `${box.top}%`, right: 0, height: `${box.height}%`, background: overlay, pointerEvents: 'none' }} />
        <div
          onPointerDown={e => startDrag('pan', e, c)}
          style={{ position: 'absolute', left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: `${box.height}%`, border: '2px dashed rgba(255,255,255,0.9)', cursor: 'grab' }}
        >
          {showVisGuide && (
            <div
              style={{
                position: 'absolute',
                left: `${((visBox.left - box.left) / box.width) * 100}%`,
                top: `${((visBox.top - box.top) / box.height) * 100}%`,
                width: `${(visBox.width / box.width) * 100}%`,
                height: `${(visBox.height / box.height) * 100}%`,
                border: `2px solid ${theme.accent}`,
                pointerEvents: 'none',
              }}
            />
          )}
          {handleDefs.map(h => (
            <div
              key={h.id}
              onPointerDown={e => startDrag(h.id, e, c)}
              style={{ position: 'absolute', background: 'rgba(255,255,255,0.35)', border: '1.5px solid rgba(255,255,255,0.9)', borderRadius: 3, cursor: h.cursor, ...h.style }}
            />
          ))}
        </div>
      </div>
      <p className="text-[10px] text-center mt-1.5" style={{ color: theme.muted }}>
        Drag the box to move it · drag a handle to resize that side
        {showVisGuide && <> · <span style={{ color: theme.accent }}>gold outline</span> is what actually shows on the card</>}
      </p>
    </div>
  );
}

function TagMultiSelect({ label, values, options, onChange, placeholder }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const remaining = options.filter(o => !values.includes(o));
  const filtered = remaining.filter(o => o.toLowerCase().includes(query.toLowerCase()));
  const exactMatch = remaining.some(o => o.toLowerCase() === query.trim().toLowerCase());

  function addTag(tag) {
    const t = tag.trim();
    if (!t || values.includes(t)) return;
    onChange([...values, t]);
    setQuery('');
  }
  function removeTag(tag) {
    onChange(values.filter(v => v !== tag));
  }

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <label className="block">
        <span className="pc-label block text-[10px] mb-1" style={{ color: theme.muted }}>{label}</span>
        {values.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {values.map(v => (
              <span key={v} className="flex items-center gap-1 px-2 py-0.5 rounded text-xs" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                {v}
                <button type="button" onClick={() => removeTag(v)} style={{ color: theme.muted }}><X size={10} /></button>
              </span>
            ))}
          </div>
        )}
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(query); } }}
          placeholder={placeholder}
          className="w-full px-2.5 py-1.5 rounded text-sm"
        />
      </label>
      {open && (filtered.length > 0 || query.trim()) && (
        <div className="absolute left-0 right-0 mt-1 rounded overflow-y-auto pc-scroll z-20" style={{ maxHeight: 180, background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
          {filtered.map(o => (
            <button key={o} type="button" onClick={() => addTag(o)} className="block w-full text-left px-3 py-2 text-sm" style={{ borderBottom: `1px solid ${theme.border}` }}>
              {o}
            </button>
          ))}
          {query.trim() && !exactMatch && (
            <button type="button" onClick={() => addTag(query.trim())} className="block w-full text-left px-3 py-2 text-sm font-medium" style={{ color: theme.accent }}>
              + Add "{query.trim()}"
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Dates are stored as plain strings using an ISO-style prefix: "" (unset), "YYYY",
// "YYYY-MM", or "YYYY-MM-DD" — whichever precision the user actually knows.
function parseFlexDate(v) {
  if (!v) return { year: '', month: '', day: '' };
  const parts = v.split('-');
  return { year: parts[0] || '', month: parts[1] || '', day: parts[2] || '' };
}

function formatFlexDate(v) {
  if (!v) return '';
  const { year, month, day } = parseFlexDate(v);
  const mi = parseInt(month, 10) - 1;
  if (day && MONTH_NAMES[mi]) return `${MONTH_NAMES[mi]} ${parseInt(day, 10)}, ${year}`;
  if (month && MONTH_NAMES[mi]) return `${MONTH_NAMES[mi]} ${year}`;
  return year;
}

const MONTH_LOOKUP = {
  jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3, apr: 4, april: 4,
  may: 5, jun: 6, june: 6, jul: 7, july: 7, aug: 8, august: 8,
  sep: 9, sept: 9, september: 9, oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12,
};

function pad2(n) { return String(n).padStart(2, '0'); }

// Accepts whatever precision the user actually knows, in several common forms, and
// normalizes to a canonical "YYYY", "YYYY-MM", or "YYYY-MM-DD" string.
function parseFreeformDate(text) {
  if (!text) return '';
  const t = text.trim();
  if (!t) return '';

  let m = t.match(/^(\d{4})$/);
  if (m) return m[1];

  m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) return `${m[1]}-${pad2(m[2])}-${pad2(m[3])}`;

  m = t.match(/^(\d{4})-(\d{1,2})$/);
  if (m) return `${m[1]}-${pad2(m[2])}`;

  m = t.match(/^(\d{1,2})[-/](\d{4})$/);
  if (m) {
    const mo = parseInt(m[1], 10);
    if (mo >= 1 && mo <= 12) return `${m[2]}-${pad2(mo)}`;
  }

  m = t.match(/^([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})$/);
  if (m) {
    const mo = MONTH_LOOKUP[m[1].toLowerCase()];
    if (mo) return `${m[3]}-${pad2(mo)}-${pad2(m[2])}`;
  }

  m = t.match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
  if (m) {
    const mo = MONTH_LOOKUP[m[1].toLowerCase()];
    if (mo) return `${m[2]}-${pad2(mo)}`;
  }

  // Couldn't confidently parse — keep the raw text so nothing typed is lost.
  return t;
}

function FreeformDateInput({ value, onChange, compact }) {
  const [draft, setDraft] = useState(value || '');

  useEffect(() => { setDraft(value || ''); }, [value]);

  function commit() {
    const parsed = parseFreeformDate(draft);
    setDraft(parsed);
    onChange(parsed);
  }

  return (
    <input
      type="text"
      placeholder="2026, 2026-01, Jan 2026, Jan 1 2026..."
      value={draft}
      onChange={e => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commit(); e.target.blur(); } }}
      className={compact ? 'w-full px-2 py-1.5 rounded text-xs' : 'w-full px-2.5 py-2 rounded-lg text-sm'}
    />
  );
}


function ValueManagerSection({ title, usage, onRename, onDelete }) {
  const [editingVal, setEditingVal] = useState(null);
  const [editText, setEditText] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [showUnused, setShowUnused] = useState(false);
  const [query, setQuery] = useState('');

  if (usage.length === 0) return null;

  const used = usage.filter(([, count]) => count > 0);
  const unused = usage.filter(([, count]) => count === 0);
  const q = query.trim().toLowerCase();
  // While actively filtering, search across everything (used + unused) regardless of the
  // "show unused" toggle — she's looking for a specific value, not browsing by usage.
  const visible = q ? usage.filter(([val]) => val.toLowerCase().includes(q)) : (showUnused ? usage : used);

  function renderRow([val, count]) {
    return (
      <div key={val} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
        {editingVal === val ? (
          <>
            <input autoFocus value={editText} onChange={e => setEditText(e.target.value)} className="flex-1 min-w-0 px-2 py-1 rounded text-sm" style={{ background: theme.surface, border: `1px solid ${theme.border}` }} />
            <button type="button" onClick={() => { onRename(val, editText.trim()); setEditingVal(null); }} className="text-xs font-medium shrink-0" style={{ color: theme.accent }}>Save</button>
            <button type="button" onClick={() => setEditingVal(null)} className="text-xs shrink-0" style={{ color: theme.muted }}>Cancel</button>
          </>
        ) : (
          <>
            <span className="flex-1 truncate">{val}</span>
            <span className="text-xs shrink-0" style={{ color: theme.muted }}>{count}</span>
            <button type="button" onClick={() => { setEditingVal(val); setEditText(val); }} className="shrink-0" style={{ color: theme.muted }}><Pencil size={13} /></button>
            <button type="button" onClick={() => onDelete(val)} className="shrink-0" style={{ color: '#A24A3E' }}><Trash2 size={13} /></button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mb-2.5 rounded-xl overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
      <button type="button" onClick={() => setExpanded(e => !e)} className="w-full flex items-center justify-between gap-2 px-3 py-2.5 text-left" style={{ background: theme.surfaceAlt }}>
        <span className="text-sm font-semibold">{title}</span>
        <span className="flex items-center gap-2 shrink-0">
          <span className="text-xs" style={{ color: theme.muted }}>{used.length > 0 ? `${used.length} in use` : usage.length}</span>
          <ChevronDown size={14} style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform .15s', color: theme.muted }} />
        </span>
      </button>
      {expanded && (
        <div className="p-2.5 space-y-1.5" style={{ background: theme.surface }}>
          {usage.length > 8 && (
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder={`Filter ${title.toLowerCase()}...`} className="w-full px-2.5 py-1.5 rounded-lg text-xs mb-1" />
          )}
          {visible.map(renderRow)}
          {q && visible.length === 0 && (
            <p className="text-xs text-center py-2" style={{ color: theme.muted }}>No matches.</p>
          )}
          {!q && unused.length > 0 && (
            <button type="button" onClick={() => setShowUnused(s => !s)} className="w-full text-center text-xs py-1.5" style={{ color: theme.accent }}>
              {showUnused ? 'Hide unused values' : `Show ${unused.length} unused value${unused.length !== 1 ? 's' : ''}`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// A single "fact" row in the card detail modal's ruled table — label left, value right,
// divider below. Returns null (renders nothing) when there's no value to show.
function DetailRow({ label, value, mono }) {
  if (!value) return null;
  return (
    <div className="flex items-baseline justify-between gap-3 py-1.5" style={{ borderBottom: `1px solid ${theme.border}` }}>
      <dt className="pc-label text-[10px] shrink-0" style={{ color: theme.muted }}>{label}</dt>
      <dd className="text-xs text-right" style={{ fontFamily: mono ? "ui-monospace, 'SF Mono', Menlo, monospace" : undefined }}>{value}</dd>
    </div>
  );
}

// Shows the first `initialCount` rows with a "Show N more" link for longer lists
// (e.g. Spending by source, Top releases) so Stats doesn't turn into endless scrolling.
function CappedList({ items, initialCount = 6, renderRow }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, initialCount);
  const hiddenCount = items.length - visible.length;
  return (
    <div className="space-y-1.5">
      {visible.map(renderRow)}
      {hiddenCount > 0 && (
        <button type="button" onClick={() => setExpanded(true)} className="w-full text-center text-xs py-1.5" style={{ color: theme.accent }}>
          Show {hiddenCount} more
        </button>
      )}
    </div>
  );
}

// A labeled group of toggle chips for multi-select filters (Member, Release, Card Type, Source, Status).
function ChipMultiSelect({ label, options, selected, onToggle, initialCount = 12 }) {
  const [expanded, setExpanded] = useState(false);
  if (options.length === 0) return null;
  const visible = expanded ? options : options.slice(0, initialCount);
  const hiddenCount = options.length - visible.length;
  return (
    <div>
      <p className="text-[11px] mb-1.5" style={{ color: theme.muted }}>{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {visible.map(opt => {
          const active = selected.has(opt);
          return (
            <button key={opt} type="button" onClick={() => onToggle(opt)}
              className="px-2 py-0.5 rounded text-[11px] font-medium"
              style={{ background: active ? theme.accent : 'transparent', color: active ? theme.bg : theme.text, border: `1px solid ${active ? theme.accent : theme.border}` }}>
              {opt}
            </button>
          );
        })}
        {hiddenCount > 0 && (
          <button type="button" onClick={() => setExpanded(true)} className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ color: theme.accent }}>
            +{hiddenCount} more
          </button>
        )}
      </div>
    </div>
  );
}

export default function PhotocardTracker({ isOwner = true } = {}) {
  const [cards, setCards] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState('');
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState('all'); // all | member | album | category | source | notes
  const [filterOwned, setFilterOwned] = useState('');
  const [filterGroup, setFilterGroup] = useState('');
  const [selectedMemberFilters, setSelectedMemberFilters] = useState(() => new Set());
  const [selectedAlbumFilters, setSelectedAlbumFilters] = useState(() => new Set());
  const [selectedReleaseCategoryFilters, setSelectedReleaseCategoryFilters] = useState(() => new Set());
  const [selectedCollectionLineFilters, setSelectedCollectionLineFilters] = useState(() => new Set());
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState(() => new Set());
  const [selectedSourceFilters, setSelectedSourceFilters] = useState(() => new Set());
  const [selectedStatusFilters, setSelectedStatusFilters] = useState(() => new Set());
  const [filterVersionTag, setFilterVersionTag] = useState('');
  const [filterItemType, setFilterItemType] = useState('');
  const [filterProductFormat, setFilterProductFormat] = useState('');
  const [filterCharacterSeries, setFilterCharacterSeries] = useState('');
  const [filterCharacter, setFilterCharacter] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [purchaseDateFrom, setPurchaseDateFrom] = useState('');
  const [purchaseDateTo, setPurchaseDateTo] = useState('');
  const [gridDensity, setGridDensity] = useState('comfortable'); // compact | comfortable | gallery
  const [savedViews, setSavedViews] = useState([]);
  const [savingView, setSavingView] = useState(false);
  const [savedViewName, setSavedViewName] = useState('');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [visibleCount, setVisibleCount] = useState(60);
  const [modalMode, setModalMode] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [detailSide, setDetailSide] = useState('front');
  const [editImageSide, setEditImageSide] = useState('front');
  const [cropCard, setCropCard] = useState(null);
  const [cropDraft, setCropDraft] = useState(null);
  const [cropSide, setCropSide] = useState('front');
  const [showFilters, setShowFilters] = useState(false);
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkForm, setBulkForm] = useState({ group: '', member: '', album: '', releaseCategory: '', collectionLine: '', itemType: '', productFormat: '', source: '', versionDetail: [], category: '', characterSeries: '', character: '', releaseDate: '', status: '', dateSold: '', notes: '' });
  // "Duplicate for other members" dialog: the source card, which members are ticked, any extra
  // member names typed in, and the status the new cards are created with.
  const [dupCard, setDupCard] = useState(null);
  const [dupMembers, setDupMembers] = useState(() => new Set());
  const [dupExtra, setDupExtra] = useState([]);
  const [dupExtraInput, setDupExtraInput] = useState('');
  const [dupStatus, setDupStatus] = useState('Wishlist');
  const [bulkCreateOpen, setBulkCreateOpen] = useState(false);
  const [bulkCreateText, setBulkCreateText] = useState('');
  const [bulkCreateError, setBulkCreateError] = useState('');
  const [promptCopied, setPromptCopied] = useState(false);
  // "Show prompt" in the Bulk create dialog: whether the box is open, and her own edited version of the
  // prompt (null = use the generated one). Edits last until the page reloads; Reset clears them.
  const [bulkPromptOpen, setBulkPromptOpen] = useState(false);
  // Preview mode for the card popup: opened from the duplicate warning in the Add/Edit form, so she can look at
  // the existing card without leaving (or losing) what she's typing. Read-only, and layered above the form.
  const [peekMode, setPeekMode] = useState(false);
  const [bulkPromptEdit, setBulkPromptEdit] = useState(null);
  // Per-row tick overrides in the import review list (row index → true/false). A row with no override
  // follows its default: ticked if it looks new, unticked if it looks like a repeat.
  const [bulkCreateOverrides, setBulkCreateOverrides] = useState({});
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [view, setView] = useState('main');
  const [statsPeriod, setStatsPeriod] = useState('month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [statsCardFilter, setStatsCardFilter] = useState(null);
  const [manageOpen, setManageOpen] = useState(false);
  const [manageDrawerVisible, setManageDrawerVisible] = useState(false);
  const [duplicatesOpen, setDuplicatesOpen] = useState(false);
  const [duplicatesDrawerVisible, setDuplicatesDrawerVisible] = useState(false);
  const [customSources, setCustomSources] = useState(HARDCODED_SOURCES);
  const [customCategories, setCustomCategories] = useState(DEFAULT_CATEGORIES);
  const [customItemTypes, setCustomItemTypes] = useState(DEFAULT_ITEM_TYPES);
  const [customProductFormats, setCustomProductFormats] = useState(DEFAULT_PRODUCT_FORMATS);

  // Closing the preview (any way) clears preview mode, so the next normal popup has its full controls.
  useEffect(() => { if (!selectedCard) setPeekMode(false); }, [selectedCard]);

  // If she signs out (or the session ends) while on Stats, drop back to the Binder instead of an empty page.
  useEffect(() => {
    if (!isOwner && view === 'stats') setView('main');
  }, [isOwner, view]);

  useEffect(() => {
    if (modalMode) {
      const raf = requestAnimationFrame(() => setDrawerVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [modalMode]);

  useEffect(() => {
    if (manageOpen) {
      const raf = requestAnimationFrame(() => setManageDrawerVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [manageOpen]);

  useEffect(() => {
    if (duplicatesOpen) {
      const raf = requestAnimationFrame(() => setDuplicatesDrawerVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [duplicatesOpen]);

  function closeManage() {
    setManageDrawerVisible(false);
    setTimeout(() => setManageOpen(false), 220);
  }

  function closeDuplicates() {
    setDuplicatesDrawerVisible(false);
    setTimeout(() => setDuplicatesOpen(false), 220);
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          // one-time migration: the "OTW" status was renamed to "Purchased"
          let statusMigrated = false;
          const withMigratedStatus = parsed.map(c => {
            if (c.status === 'OTW') { statusMigrated = true; return { ...c, status: 'Purchased' }; }
            return c;
          });
          setCards(withMigratedStatus);
          if (statusMigrated) {
            await window.storage.set(STORAGE_KEY, JSON.stringify(withMigratedStatus), false);
          }
        } else {
          // migrate from the earlier version of this app, if present
          try {
            const old = await window.storage.get('photocards-v1', false);
            if (old && old.value) {
              const oldCards = JSON.parse(old.value);
              const migrated = oldCards.map(c => {
                const owned = ['Owned', 'Duplicate', 'Trading'].includes(c.status);
                return {
                  id: c.id, createdAt: c.createdAt,
                  group: c.group || '', member: c.member || '', album: '',
                  category: c.category || '', releaseDate: '',
                  status: owned ? 'Wishlist' : 'Wishlist',
                  frontImage: c.frontImage || '', backImage: c.backImage || '',
                  dateSold: '', notes: c.notes || '',
                  copies: owned ? [{ id: uid(), date: c.dateReceived || c.datePurchased || '', price: c.price || '', seller: c.seller || '' }] : [],
                };
              });
              setCards(migrated);
              await window.storage.set(STORAGE_KEY, JSON.stringify(migrated), false);
            }
          } catch (e2) {
            // nothing to migrate
          }
        }
      } catch (e) {
        // no saved data yet
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(CUSTOM_LISTS_KEY, false);
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          setCustomSources(parsed.sources || HARDCODED_SOURCES);
          setCustomCategories(parsed.categories || DEFAULT_CATEGORIES);
          // itemTypes/productFormats are newer keys — older saved lists won't have them yet.
          setCustomItemTypes(parsed.itemTypes || DEFAULT_ITEM_TYPES);
          setCustomProductFormats(parsed.productFormats || DEFAULT_PRODUCT_FORMATS);
        } else {
          // first run — move the hardcoded defaults into real, editable storage
          await window.storage.set(CUSTOM_LISTS_KEY, JSON.stringify({ sources: HARDCODED_SOURCES, categories: DEFAULT_CATEGORIES, itemTypes: DEFAULT_ITEM_TYPES, productFormats: DEFAULT_PRODUCT_FORMATS }), false);
        }
      } catch (e) {
        try {
          await window.storage.set(CUSTOM_LISTS_KEY, JSON.stringify({ sources: HARDCODED_SOURCES, categories: DEFAULT_CATEGORIES, itemTypes: DEFAULT_ITEM_TYPES, productFormats: DEFAULT_PRODUCT_FORMATS }), false);
        } catch (e2) {
          // storage unavailable — fall back to the hardcoded defaults for this session
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(SAVED_VIEWS_KEY, false);
        if (res && res.value) setSavedViews(JSON.parse(res.value));
      } catch (e) {
        // no saved views yet, or storage unavailable — start with an empty list
      }
    })();
  }, []);

  async function persistCustomLists(sources, categories, itemTypes, productFormats) {
    try {
      await window.storage.set(CUSTOM_LISTS_KEY, JSON.stringify({ sources, categories, itemTypes, productFormats }), false);
    } catch (e) {
      // best-effort — the in-memory lists still update either way
    }
  }

  // Returns true/false so callers can tell whether the save actually landed — every caller below
  // now checks this before showing a success toast, instead of always assuming it worked (that
  // gap is what let a real save failure go completely unnoticed: the success toast fired right
  // after persist() regardless, stomping the failure message this shows).
  const persist = useCallback(async (next) => {
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(next), false);
      return true;
    } catch (e) {
      // Surface the real reason (Firebase error code) so a repeat failure can be diagnosed instead
      // of showing the same generic line every time.
      const code = (e && (e.code || e.name)) || 'unknown';
      const hints = {
        'permission-denied': 'You look signed out or the session expired — sign out, sign back in as owner, then retry.',
        'unauthenticated': 'Your sign-in expired — sign out and back in, then retry.',
        'resource-exhausted': 'Firebase quota or size limit reached for now.',
        'invalid-argument': 'The data is too large for one save.',
        'unavailable': 'Cannot reach Firebase — check your connection or an ad/privacy blocker.',
        'deadline-exceeded': 'Firebase timed out — check your connection and retry.'
      };
      try { console.error('[Pocafolio] save failed', e); } catch (_) {}
      setToast("Save failed — this change is NOT saved. [" + code + "] " + (hints[code] || (e && e.message ? String(e.message).slice(0, 120) : 'Try again before closing this tab.')));
      setTimeout(() => setToast(''), 12000);
      return false;
    }
  }, []);

  // One-time migration for the new Release Category / Collection Line taxonomy: backfills those two
  // fields on existing cards from their current `album` value, using the lookup tables above. Cards
  // whose album isn't in the table (typos, older/uncommon titles, anything not yet in the seed data)
  // are left uncategorized for manual review rather than guessed at. Also merges the new seed values
  // into the persisted custom lists (Source/Card Type/Item Type/Product Format) and standardizes any
  // "Digipak" spelling to "Digipack". Manually triggered from Manage Values — never runs on its own.
  const [migrationResult, setMigrationResult] = useState(null);
  const [migrationRunning, setMigrationRunning] = useState(false);
  async function runTaxonomyMigration() {
    setMigrationRunning(true);
    let categorized = 0, ambiguousFlagged = 0, needsReview = 0, digipakFixed = 0;
    const reviewList = [];
    const nextCards = cards.map(c => {
      let next = c;
      if (!next.releaseCategory && next.album) {
        const hit = RELEASE_TO_COLLECTION_LINE[next.album];
        const tourHit = TOUR_FANMEETING_MAP[next.album];
        if (hit) {
          next = { ...next, releaseCategory: hit.cat, collectionLine: hit.line };
          categorized += 1;
          if (AMBIGUOUS_KR_JP_TITLES.includes(next.album)) ambiguousFlagged += 1;
        } else if (tourHit) {
          next = { ...next, releaseCategory: 'Concert / Tour', collectionLine: tourHit };
          categorized += 1;
        } else {
          needsReview += 1;
          reviewList.push(next.album);
        }
      }
      if (next.productFormat === 'Digipak') {
        next = { ...next, productFormat: 'Digipack' };
        digipakFixed += 1;
      }
      return next;
    });
    setCards(nextCards);
    const ok = await persist(nextCards);

    const nextSources = [...new Set([...customSources, ...HARDCODED_SOURCES])];
    const nextCategories = [...new Set([...customCategories, ...DEFAULT_CATEGORIES])];
    const nextItemTypes = [...new Set([...customItemTypes, ...DEFAULT_ITEM_TYPES])];
    const nextProductFormats = [...new Set([...customProductFormats, ...DEFAULT_PRODUCT_FORMATS])];
    setCustomSources(nextSources);
    setCustomCategories(nextCategories);
    setCustomItemTypes(nextItemTypes);
    setCustomProductFormats(nextProductFormats);
    await persistCustomLists(nextSources, nextCategories, nextItemTypes, nextProductFormats);

    setMigrationRunning(false);
    setMigrationResult({
      ok, categorized, ambiguousFlagged, needsReview,
      reviewList: [...new Set(reviewList)].sort(),
      digipakFixed,
    });
  }

  const groups = useMemo(() => [...new Set(cards.map(c => c.group).filter(Boolean))].sort(), [cards]);
  const filterMembers = useMemo(() => [...new Set(allMembersOf(cards.filter(c => !filterGroup || c.group === filterGroup)))].sort(), [cards, filterGroup]);
  const filterAlbums = useMemo(() => [...new Set(cards.filter(c => !filterGroup || c.group === filterGroup).map(c => c.album).filter(Boolean))].sort(), [cards, filterGroup]);
  const filterCollectionLines = useMemo(() => [...new Set(cards.filter(c => selectedReleaseCategoryFilters.size === 0 || selectedReleaseCategoryFilters.has(c.releaseCategory)).map(c => c.collectionLine).filter(Boolean))].sort(), [cards, selectedReleaseCategoryFilters]);
  const allMembers = useMemo(() => [...new Set(allMembersOf(cards))].sort(), [cards]);
  const allAlbums = useMemo(() => [...new Set(cards.map(c => c.album).filter(Boolean))].sort(), [cards]);
  const allCollectionLines = useMemo(() => [...new Set(cards.map(c => c.collectionLine).filter(Boolean))].sort(), [cards]);

  const albumUsage = useMemo(() => {
    const map = {};
    cards.forEach(c => { if (c.album) map[c.album] = (map[c.album] || 0) + 1; });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cards]);
  const sourceUsage = useMemo(() => {
    const map = {};
    customSources.forEach(s => { map[s] = 0; });
    cards.forEach(c => { if (c.source) map[c.source] = (map[c.source] || 0) + 1; });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cards, customSources]);
  const categoryUsage = useMemo(() => {
    const map = {};
    customCategories.forEach(c => { map[c] = 0; });
    cards.forEach(c => { if (c.category) map[c.category] = (map[c.category] || 0) + 1; });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cards, customCategories]);
  const versionTagUsage = useMemo(() => {
    const map = {};
    cards.forEach(c => toTags(c.versionDetail).forEach(t => { map[t] = (map[t] || 0) + 1; }));
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cards]);
  const itemTypeUsage = useMemo(() => {
    const map = {};
    customItemTypes.forEach(v => { map[v] = 0; });
    cards.forEach(c => { if (c.itemType) map[c.itemType] = (map[c.itemType] || 0) + 1; });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cards, customItemTypes]);
  const productFormatUsage = useMemo(() => {
    const map = {};
    customProductFormats.forEach(v => { map[v] = 0; });
    cards.forEach(c => { if (c.productFormat) map[c.productFormat] = (map[c.productFormat] || 0) + 1; });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cards, customProductFormats]);
  const characterSeriesUsage = useMemo(() => {
    const map = {};
    cards.forEach(c => { if (c.characterSeries) map[c.characterSeries] = (map[c.characterSeries] || 0) + 1; });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cards]);
  const characterUsage = useMemo(() => {
    const map = {};
    cards.forEach(c => { if (c.character) map[c.character] = (map[c.character] || 0) + 1; });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cards]);

  async function renameFieldValue(field, oldVal, newVal) {
    if (!newVal || newVal === oldVal) return;
    let next;
    if (field === 'versionDetail') {
      next = cards.map(c => {
        const tags = toTags(c.versionDetail);
        if (!tags.includes(oldVal)) return c;
        return { ...c, versionDetail: [...new Set(tags.map(t => (t === oldVal ? newVal : t)))] };
      });
    } else {
      next = cards.map(c => (c[field] === oldVal ? { ...c, [field]: newVal } : c));
    }
    setCards(next);
    const ok = await persist(next);

    if (ok) {
      if (field === 'source') {
        const nextSources = [...new Set(customSources.map(s => (s === oldVal ? newVal : s)))];
        setCustomSources(nextSources);
        await persistCustomLists(nextSources, customCategories, customItemTypes, customProductFormats);
      } else if (field === 'category') {
        const nextCategories = [...new Set(customCategories.map(c => (c === oldVal ? newVal : c)))];
        setCustomCategories(nextCategories);
        await persistCustomLists(customSources, nextCategories, customItemTypes, customProductFormats);
      } else if (field === 'itemType') {
        const nextItemTypes = [...new Set(customItemTypes.map(v => (v === oldVal ? newVal : v)))];
        setCustomItemTypes(nextItemTypes);
        await persistCustomLists(customSources, customCategories, nextItemTypes, customProductFormats);
      } else if (field === 'productFormat') {
        const nextProductFormats = [...new Set(customProductFormats.map(v => (v === oldVal ? newVal : v)))];
        setCustomProductFormats(nextProductFormats);
        await persistCustomLists(customSources, customCategories, customItemTypes, nextProductFormats);
      }
      setToast(`Renamed "${oldVal}" to "${newVal}".`);
    }
    setTimeout(() => setToast(''), 2500);
  }

  async function deleteFieldValue(field, val) {
    if (!confirm(`Remove "${val}" from every card that has it? This can't be undone automatically.`)) return;
    let next;
    if (field === 'versionDetail') {
      next = cards.map(c => {
        const tags = toTags(c.versionDetail);
        if (!tags.includes(val)) return c;
        return { ...c, versionDetail: tags.filter(t => t !== val) };
      });
    } else {
      next = cards.map(c => (c[field] === val ? { ...c, [field]: '' } : c));
    }
    setCards(next);
    const ok = await persist(next);

    if (ok) {
      if (field === 'source') {
        const nextSources = customSources.filter(s => s !== val);
        setCustomSources(nextSources);
        await persistCustomLists(nextSources, customCategories, customItemTypes, customProductFormats);
      } else if (field === 'category') {
        const nextCategories = customCategories.filter(c => c !== val);
        setCustomCategories(nextCategories);
        await persistCustomLists(customSources, nextCategories, customItemTypes, customProductFormats);
      } else if (field === 'itemType') {
        const nextItemTypes = customItemTypes.filter(v => v !== val);
        setCustomItemTypes(nextItemTypes);
        await persistCustomLists(customSources, customCategories, nextItemTypes, customProductFormats);
      } else if (field === 'productFormat') {
        const nextProductFormats = customProductFormats.filter(v => v !== val);
        setCustomProductFormats(nextProductFormats);
        await persistCustomLists(customSources, customCategories, customItemTypes, nextProductFormats);
      }
      setToast(`Deleted "${val}".`);
    }
    setTimeout(() => setToast(''), 2500);
  }

  const orderedWithExtras = useCallback((defaults, extras) => {
    const defaultSet = new Set(defaults);
    const customExtras = [...new Set(extras.filter(Boolean).filter(v => !defaultSet.has(v)))].sort((a, b) => a.localeCompare(b));
    const otherIndex = defaults.indexOf('Other');
    if (otherIndex === -1) return [...defaults, ...customExtras];
    return [...defaults.slice(0, otherIndex), ...customExtras, 'Other'];
  }, []);

  const categories = useMemo(() => {
    const extras = [...customCategories];
    cards.forEach(c => { if (c.category) extras.push(c.category); });
    return orderedWithExtras(DEFAULT_CATEGORIES, extras);
  }, [cards, customCategories, orderedWithExtras]);
  const sourceOptions = useMemo(() => {
    const extras = [...customSources];
    cards.forEach(c => { if (c.source) extras.push(c.source); });
    return orderedWithExtras(HARDCODED_SOURCES, extras);
  }, [cards, customSources, orderedWithExtras]);
  const versionDetailOptions = useMemo(() => {
    const extras = [];
    cards.forEach(c => toTags(c.versionDetail).forEach(t => extras.push(t)));
    return orderedWithExtras(DEFAULT_VERSION_DETAILS, extras);
  }, [cards, orderedWithExtras]);
  const sellerOptions = useMemo(() => {
    const set = new Set();
    cards.forEach(c => (c.copies || []).forEach(cp => { if (cp.seller) set.add(cp.seller); }));
    return [...set].sort();
  }, [cards]);
  const itemTypeOptions = useMemo(() => {
    const extras = [...customItemTypes];
    cards.forEach(c => { if (c.itemType) extras.push(c.itemType); });
    return orderedWithExtras(DEFAULT_ITEM_TYPES, extras);
  }, [cards, customItemTypes, orderedWithExtras]);
  const productFormatOptions = useMemo(() => {
    const extras = [...customProductFormats];
    cards.forEach(c => { if (c.productFormat) extras.push(c.productFormat); });
    return orderedWithExtras(DEFAULT_PRODUCT_FORMATS, extras);
  }, [cards, customProductFormats, orderedWithExtras]);
  const characterSeriesOptions = useMemo(() => {
    const all = new Set(DEFAULT_CHARACTER_SERIES);
    cards.forEach(c => { if (c.characterSeries) all.add(c.characterSeries); });
    return [...all].sort();
  }, [cards]);
  const characterOptions = useMemo(() => {
    const all = new Set(Object.values(CHARACTER_MAP).flat());
    cards.forEach(c => { if (c.character) all.add(c.character); });
    return [...all].sort();
  }, [cards]);
  // In the Add/Edit form, Character suggestions narrow to the chosen Character Series
  // (falling back to every known character if the series isn't a recognized one).
  const formCharacterOptions = useMemo(() => {
    const base = CHARACTER_MAP[form.characterSeries];
    if (!base) return characterOptions;
    const used = cards.filter(c => c.characterSeries === form.characterSeries).map(c => c.character).filter(Boolean);
    return [...new Set([...base, ...used])].sort();
  }, [cards, form.characterSeries, characterOptions]);
  const members = useMemo(() => [...new Set(allMembersOf(cards.filter(c => !form.group || c.group === form.group)))].sort(), [cards, form.group]);
  // Live "do I already have this?" check for the Add/Edit form. Needs Member + Release (the identifying
  // basics) before it speaks up, then compares everything that distinguishes one card from another — set of
  // members, release, version tags, item type / product / card type, and shop. Editing a card ignores itself.
  const formDuplicates = useMemo(() => {
    if (!modalMode || !form.member.trim() || !form.album.trim()) return [];
    return cards
      .filter(c => c.id !== editingId && sameCardLoose(c, form, { source: true }))
      .sort((a, b) => (isOwned(b) ? 1 : 0) - (isOwned(a) ? 1 : 0));   // a card she holds outranks a placeholder
  }, [modalMode, form, cards, editingId]);
  // The live banner waits until at least one distinguishing detail is filled in, so it doesn't flash the
  // moment she picks a member and release; the confirm on Save always uses the full list.
  const formHasDetail = toTags(form.versionDetail).length > 0 || !!(form.productFormat || '').trim() || !!(form.category || '').trim() || !!(form.source || '').trim();
  const formDuplicatesShown = formHasDetail ? formDuplicates : [];
  function peekExisting(card) {
    setSelectedCard(card);
    setDetailSide('front');
    setPeekMode(true);
  }
  function openExistingFromForm(card) {
    closeModal();
    setSelectedCard(card);
    setDetailSide('front');
  }

  // Release/Edition autocomplete: her own past entries, plus the full seed catalog narrowed to
  // whatever Release Category / Collection Line is currently selected (all of it if neither is set
  // yet). When the Source is a JP-market retailer, Japan Release titles are surfaced first — Music
  // Release only, per spec; Merch Collection isn't organized by country.
  const formAlbums = useMemo(() => {
    const fromCards = cards.filter(c => !form.group || c.group === form.group).map(c => c.album).filter(Boolean);
    const tourTitles = Object.keys(TOUR_FANMEETING_MAP);
    let seedTitles;
    if (form.releaseCategory === 'Concert / Tour') {
      seedTitles = tourTitles.filter(t => !form.collectionLine || TOUR_FANMEETING_MAP[t] === form.collectionLine);
    } else if (form.releaseCategory) {
      seedTitles = Object.keys(RELEASE_TO_COLLECTION_LINE).filter(t => {
        const hit = RELEASE_TO_COLLECTION_LINE[t];
        return hit.cat === form.releaseCategory && (!form.collectionLine || hit.line === form.collectionLine);
      });
    } else {
      seedTitles = [...Object.keys(RELEASE_TO_COLLECTION_LINE), ...tourTitles];
    }
    const combined = [...new Set([...fromCards, ...seedTitles])];
    const isJpSource = JP_SOURCES.indexOf(form.source) !== -1;
    if (isJpSource && form.releaseCategory !== 'Merch Collection' && form.releaseCategory !== 'Concert / Tour') {
      const isJapanRelease = t => RELEASE_TO_COLLECTION_LINE[t] && RELEASE_TO_COLLECTION_LINE[t].line === 'Japan Release';
      const jp = combined.filter(isJapanRelease).sort();
      const rest = combined.filter(t => !isJapanRelease(t)).sort();
      return [...jp, ...rest];
    }
    return combined.sort();
  }, [cards, form.group, form.releaseCategory, form.collectionLine, form.source]);

  const filtered = useMemo(() => {
    if (statsCardFilter) {
      return cards.filter(c => statsCardFilter.has(c.id));
    }
    const minP = priceMin !== '' ? parseFloat(priceMin) : null;
    const maxP = priceMax !== '' ? parseFloat(priceMax) : null;
    let list = cards.filter(c => {
      const owned = isOwned(c);
      if (filterOwned === 'owned' && !owned) return false;
      if (filterOwned === 'missing' && owned) return false;
      if (filterOwned === 'wishlist' && c.status !== 'Wishlist') return false;
      if (filterGroup && c.group !== filterGroup) return false;
      if (selectedMemberFilters.size > 0 && !cardMembers(c).some(m => selectedMemberFilters.has(m))) return false;
      if (selectedAlbumFilters.size > 0 && !selectedAlbumFilters.has(c.album)) return false;
      if (selectedReleaseCategoryFilters.size > 0 && !selectedReleaseCategoryFilters.has(c.releaseCategory)) return false;
      if (selectedCollectionLineFilters.size > 0 && !selectedCollectionLineFilters.has(c.collectionLine)) return false;
      if (selectedCategoryFilters.size > 0 && !selectedCategoryFilters.has(c.category)) return false;
      if (selectedSourceFilters.size > 0 && !selectedSourceFilters.has(c.source)) return false;
      if (selectedStatusFilters.size > 0 && !selectedStatusFilters.has(c.status)) return false;
      if (filterVersionTag && !toTags(c.versionDetail).includes(filterVersionTag)) return false;
      if (filterItemType && c.itemType !== filterItemType) return false;
      if (filterProductFormat && c.productFormat !== filterProductFormat) return false;
      if (filterCharacterSeries && c.characterSeries !== filterCharacterSeries) return false;
      if (filterCharacter && c.character !== filterCharacter) return false;
      if (minP !== null || maxP !== null) {
        const copies = c.copies || [];
        const priceMatch = copies.some(cp => {
          const p = parsePrice(cp.price);
          if (minP !== null && p < minP) return false;
          if (maxP !== null && p > maxP) return false;
          return true;
        });
        if (!priceMatch) return false;
      }
      if (purchaseDateFrom || purchaseDateTo) {
        const copies = c.copies || [];
        const dateMatch = copies.some(cp => {
          if (!cp.date) return false;
          if (purchaseDateFrom && cp.date < purchaseDateFrom) return false;
          if (purchaseDateTo && cp.date > purchaseDateTo) return false;
          return true;
        });
        if (!dateMatch) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        let hay;
        if (searchField === 'member') hay = cardMembers(c).join(' ').toLowerCase();
        else if (searchField === 'album') hay = (c.album || '').toLowerCase();
        else if (searchField === 'category') hay = (c.category || '').toLowerCase();
        else if (searchField === 'source') hay = (c.source || '').toLowerCase();
        else if (searchField === 'notes') hay = (c.notes || '').toLowerCase();
        else hay = [c.group, ...cardMembers(c), c.album, c.releaseCategory, c.collectionLine, c.category, c.source, c.itemType, c.productFormat, c.characterSeries, c.character, ...toTags(c.versionDetail), c.notes, ...(c.copies || []).map(cp => cp.seller)].join(' ').toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    switch (sortBy) {
      case 'group': list = [...list].sort((a, b) => (a.group || '').localeCompare(b.group) || (a.member || '').localeCompare(b.member)); break;
      case 'member': list = [...list].sort((a, b) => (a.member || '').localeCompare(b.member)); break;
      case 'version': list = [...list].sort((a, b) => versionName(a).localeCompare(versionName(b))); break;
      case 'release': list = [...list].sort((a, b) => (b.releaseDate || '').localeCompare(a.releaseDate || '')); break;
      case 'spent-high': list = [...list].sort((a, b) => sumSpent(b) - sumSpent(a)); break;
      case 'spent-low': list = [...list].sort((a, b) => sumSpent(a) - sumSpent(b)); break;
      case 'purchased': list = [...list].sort((a, b) => (cardPurchaseDate(b) || '').localeCompare(cardPurchaseDate(a) || '')); break;
      default: list = [...list].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
    return list;
  }, [cards, statsCardFilter, filterOwned, filterGroup, selectedMemberFilters, selectedAlbumFilters, selectedCategoryFilters, selectedSourceFilters, selectedStatusFilters, filterVersionTag, filterItemType, filterProductFormat, filterCharacterSeries, filterCharacter, priceMin, priceMax, purchaseDateFrom, purchaseDateTo, search, searchField, sortBy]);

  const visible = filtered.slice(0, visibleCount);
  const activeFilterCount = [
    filterGroup, filterVersionTag, filterItemType, filterProductFormat, filterCharacterSeries, filterCharacter,
    priceMin, priceMax, purchaseDateFrom, purchaseDateTo,
  ].filter(Boolean).length + selectedMemberFilters.size + selectedAlbumFilters.size + selectedReleaseCategoryFilters.size + selectedCollectionLineFilters.size + selectedCategoryFilters.size + selectedSourceFilters.size + selectedStatusFilters.size + (searchField !== 'all' ? 1 : 0);
  const ownedCount = useMemo(() => cards.filter(isOwned).length, [cards]);
  const totalPhysical = useMemo(() => cards.filter(isOwned).reduce((sum, c) => sum + (c.copies || []).length, 0), [cards]);
  const duplicateCount = Math.max(0, totalPhysical - ownedCount);

  // Groups of separate card ENTRIES that look like the same card typed in twice — matched on
  // member/album/item type/product format/card type/version, regardless of status, source, or
  // copies (those are exactly the fields that'd legitimately differ between two real entries of
  // the same card, e.g. one bulk-created and one filled in by hand). Groups of 1 aren't shown.
  const duplicateGroups = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      const key = [
        normVal(c.group), cardMembers(c).map(normVal).sort().join('&'), normVal(c.album), normVal(c.itemType),
        normVal(c.productFormat), normVal(c.category),
        toTags(c.versionDetail).map(normVal).sort().join('+'),
      ].join('::');
      (map[key] = map[key] || []).push(c);
    });
    return Object.values(map).filter(g => g.length > 1).sort((a, b) => b.length - a.length);
  }, [cards]);

  const statsBounds = useMemo(() => periodBoundsFor(statsPeriod, customStart, customEnd), [statsPeriod, customStart, customEnd]);

  const statsData = useMemo(() => {
    const matches = [];
    cards.forEach(card => {
      (card.copies || []).forEach(copy => {
        if (copyMatchesPeriod(copy, statsBounds)) matches.push({ card, copy });
      });
    });
    const cardsBought = matches.length;
    const uniqueIds = new Set(matches.map(m => m.card.id));
    const uniqueCards = uniqueIds.size;
    const duplicateCopies = cardsBought - uniqueCards;
    const amountSpent = matches.reduce((sum, m) => sum + parsePrice(m.copy.price), 0);
    const duplicateCardIds = [...uniqueIds].filter(id => matches.filter(m => m.card.id === id).length > 1);

    const byCategory = {};
    matches.forEach(m => {
      const cat = m.card.category || 'Uncategorized';
      if (!byCategory[cat]) byCategory[cat] = { count: 0, spent: 0, ids: new Set() };
      byCategory[cat].count += 1;
      byCategory[cat].spent += parsePrice(m.copy.price);
      byCategory[cat].ids.add(m.card.id);
    });

    // A duo/unit card counts toward each member on it here, so these rows can add up to more than the
    // overall totals above (which count every copy exactly once).
    const byMember = {};
    matches.forEach(m => {
      const mems = cardMembers(m.card);
      (mems.length ? mems : ['Unknown']).forEach(mem => {
        if (!byMember[mem]) byMember[mem] = { count: 0, spent: 0, ids: new Set() };
        byMember[mem].count += 1;
        byMember[mem].spent += parsePrice(m.copy.price);
        byMember[mem].ids.add(m.card.id);
      });
    });
    const hasSharedCards = matches.some(m => cardMembers(m.card).length > 1);

    const bySource = {};
    matches.forEach(m => {
      const src = m.card.source || 'Unknown';
      if (!bySource[src]) bySource[src] = { count: 0, spent: 0, ids: new Set() };
      bySource[src].count += 1;
      bySource[src].spent += parsePrice(m.copy.price);
      bySource[src].ids.add(m.card.id);
    });

    let priciestMatch = null;
    matches.forEach(m => {
      const price = parsePrice(m.copy.price);
      if (!priciestMatch || price > priciestMatch.price) priciestMatch = { card: m.card, price };
    });

    const avgCost = cardsBought > 0 ? amountSpent / cardsBought : 0;

    let timeBreakdown = [];
    if (statsBounds.type === 'month') {
      const byDay = {};
      matches.forEach(m => {
        if (getDatePrecision(m.copy.date) === 'day') {
          const d = m.copy.date;
          if (!byDay[d]) byDay[d] = { count: 0, spent: 0, ids: new Set() };
          byDay[d].count += 1;
          byDay[d].spent += parsePrice(m.copy.price);
          byDay[d].ids.add(m.card.id);
        }
      });
      timeBreakdown = Object.entries(byDay).sort((a, b) => a[0].localeCompare(b[0])).map(([d, v]) => {
        const { month, day } = parseFlexDate(d);
        const mi = parseInt(month, 10) - 1;
        const shortLabel = MONTH_NAMES[mi] ? `${MONTH_NAMES[mi].slice(0, 3)} ${parseInt(day, 10)}` : d;
        return { label: shortLabel, count: v.count, spent: v.spent, ids: v.ids };
      });
    } else if (statsBounds.type === 'year') {
      const byMonth = {};
      matches.forEach(m => {
        const precision = getDatePrecision(m.copy.date);
        if (precision === 'day' || precision === 'month') {
          const mo = m.copy.date.slice(0, 7);
          if (!byMonth[mo]) byMonth[mo] = { count: 0, spent: 0, ids: new Set() };
          byMonth[mo].count += 1;
          byMonth[mo].spent += parsePrice(m.copy.price);
          byMonth[mo].ids.add(m.card.id);
        }
      });
      timeBreakdown = Object.entries(byMonth).sort((a, b) => a[0].localeCompare(b[0])).map(([mo, v]) => ({ label: formatFlexDate(mo), count: v.count, spent: v.spent, ids: v.ids }));
    } else if (statsBounds.type === 'all' || statsBounds.type === 'range') {
      const byYear = {};
      matches.forEach(m => {
        const yr = m.copy.date.slice(0, 4);
        if (!byYear[yr]) byYear[yr] = { count: 0, spent: 0, ids: new Set() };
        byYear[yr].count += 1;
        byYear[yr].spent += parsePrice(m.copy.price);
        byYear[yr].ids.add(m.card.id);
      });
      timeBreakdown = Object.entries(byYear).sort((a, b) => a[0].localeCompare(b[0])).map(([yr, v]) => ({ label: yr, count: v.count, spent: v.spent, ids: v.ids }));
    }

    const addedIds = new Set();
    cards.forEach(card => {
      if (card.createdAt) {
        const d = new Date(card.createdAt);
        const ds = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
        if (statsBounds.type === 'all') addedIds.add(card.id);
        else if (statsBounds.type === 'day' && ds === statsBounds.value) addedIds.add(card.id);
        else if (statsBounds.type === 'month' && ds.slice(0, 7) === statsBounds.value) addedIds.add(card.id);
        else if (statsBounds.type === 'year' && ds.slice(0, 4) === statsBounds.value) addedIds.add(card.id);
        else if (statsBounds.type === 'range' && ds >= statsBounds.start && ds <= statsBounds.end) addedIds.add(card.id);
      }
    });

    const recentHauls = matches
      .slice()
      .sort((a, b) => (b.copy.date || '').localeCompare(a.copy.date || ''))
      .slice(0, 8);

    return { matches, cardsBought, uniqueIds, uniqueCards, duplicateCopies, duplicateCardIds, amountSpent, avgCost, byCategory, byMember, bySource, priciestMatch, timeBreakdown, addedIds, recentHauls, hasSharedCards };
  }, [cards, statsBounds]);

  const memberOwnedBreakdown = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      if (!isOwned(c)) return;
      const mems = cardMembers(c);
      (mems.length ? mems : ['Unknown']).forEach(mem => {
        if (!map[mem]) map[mem] = { count: 0, spent: 0, ids: new Set() };
        map[mem].count += 1;
        map[mem].spent += sumSpent(c);
        map[mem].ids.add(c.id);
      });
    });
    return Object.entries(map).sort((a, b) => b[1].count - a[1].count);
  }, [cards]);

  // "What's actually in the binder" — owned cards grouped by Item Type / Product Format / Release.
  const itemTypeBreakdown = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      if (!isOwned(c)) return;
      const v = c.itemType || 'Unspecified';
      if (!map[v]) map[v] = { count: 0, spent: 0, ids: new Set() };
      map[v].count += 1;
      map[v].spent += sumSpent(c);
      map[v].ids.add(c.id);
    });
    return Object.entries(map).sort((a, b) => b[1].count - a[1].count);
  }, [cards]);
  const productFormatBreakdown = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      if (!isOwned(c)) return;
      const v = c.productFormat || 'Unspecified';
      if (!map[v]) map[v] = { count: 0, spent: 0, ids: new Set() };
      map[v].count += 1;
      map[v].spent += sumSpent(c);
      map[v].ids.add(c.id);
    });
    return Object.entries(map).sort((a, b) => b[1].count - a[1].count);
  }, [cards]);
  const albumBreakdown = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      if (!isOwned(c)) return;
      const v = c.album || 'Unspecified';
      if (!map[v]) map[v] = { count: 0, spent: 0, ids: new Set() };
      map[v].count += 1;
      map[v].spent += sumSpent(c);
      map[v].ids.add(c.id);
    });
    return Object.entries(map).sort((a, b) => b[1].count - a[1].count);
  }, [cards]);

  // Real (non-"OT8 / Group") members ever recorded per group — the roster a release is checked against.
  const groupRosterMap = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      if (!c.group) return;
      cardMembers(c).filter(m => m !== 'OT8 / Group').forEach(m => {
        if (!map[c.group]) map[c.group] = new Set();
        map[c.group].add(m);
      });
    });
    return map;
  }, [cards]);

  // OT8 completion per release: how many of the group's members you have an owned card from.
  const releaseCompletion = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      const mems = cardMembers(c).filter(m => m !== 'OT8 / Group');
      if (!isOwned(c) || !c.album || !c.group || mems.length === 0) return;
      if (!map[c.album]) map[c.album] = { group: c.group, members: new Set(), ids: new Set() };
      mems.forEach(m => map[c.album].members.add(m));
      map[c.album].ids.add(c.id);
    });
    const rows = Object.entries(map).map(([album, v]) => {
      const roster = groupRosterMap[v.group];
      const total = roster ? roster.size : v.members.size;
      const missing = roster ? [...roster].filter(m => !v.members.has(m)).sort() : [];
      return { album, owned: v.members.size, total, missing, ids: v.ids };
    }).filter(r => r.total >= 2);
    rows.sort((a, b) => (a.missing.length - b.missing.length) || a.album.localeCompare(b.album));
    return rows;
  }, [cards, groupRosterMap]);

  // Character-set completion against the known ANITEEZ/MIGHTEEZ/Birthday Characters rosters.
  const characterCompletion = useMemo(() => {
    const result = [];
    Object.entries(CHARACTER_MAP).forEach(([series, roster]) => {
      const owned = new Set();
      const ids = new Set();
      cards.forEach(c => {
        if (isOwned(c) && c.characterSeries === series && c.character) {
          owned.add(c.character);
          ids.add(c.id);
        }
      });
      if (owned.size === 0) return; // only surface series she's actually collecting
      const missing = roster.map((ch, i) => ({ character: ch, member: ATEEZ_MEMBER_ORDER[i] })).filter(x => !owned.has(x.character));
      result.push({ series, owned: owned.size, total: roster.length, missing, ids });
    });
    return result;
  }, [cards]);

  // Full lifecycle breakdown (Unowned/Wishlist/.../Owned/Sold), all-time, in STATUSES order.
  const statusOverview = useMemo(() => {
    const map = {};
    cards.forEach(c => {
      const st = c.status || 'Unowned';
      if (!map[st]) map[st] = { count: 0, ids: new Set() };
      map[st].count += 1;
      map[st].ids.add(c.id);
    });
    return STATUSES.map(s => ({ value: s.value, color: s.color, count: map[s.value] ? map[s.value].count : 0, ids: map[s.value] ? map[s.value].ids : new Set() })).filter(s => s.count > 0);
  }, [cards]);

  // Oldest recorded purchase date across every copy of every card — i.e. when she actually
  // started buying, not when a card happened to get entered into the app. Copy dates are
  // "YYYY" | "YYYY-MM" | "YYYY-MM-DD" strings, which sort/compare correctly as plain strings.
  const collectingSince = useMemo(() => {
    const dates = [];
    cards.forEach(c => (c.copies || []).forEach(cp => { if (cp.date) dates.push(cp.date); }));
    return dates.length > 0 ? dates.reduce((min, d) => (d < min ? d : min)) : null;
  }, [cards]);

  // Title click → back to the plain home state: main collection view, nothing selected,
  // no filters/search/stat-drill-down left applied.
  // Logo → the full gallery: every card regardless of status (owned, purchased, unowned,
  // wishlist, sold). clearFilters() alone doesn't touch the Everything/Owned/Not owned/Wishlist
  // pills, so reset those explicitly — otherwise coming from Binder would stay stuck on Owned.
  function goHome() {
    setView('main');
    setSelectedCard(null);
    setStatsCardFilter(null);
    setSelectMode(false);
    setSelectedIds(new Set());
    setManageOpen(false);
    clearFilters();
    setFilterOwned('');
    setVisibleCount(60);
  }

  // "Binder" nav shortcut: like opening a real binder, shows only what's actually in hand —
  // Owned plus Purchased (isOwned covers both) — instead of the full everything-including-wishlist
  // gallery. The logo's goHome() still lands on the unfiltered view.
  function goBinder() {
    goHome();
    setFilterOwned('owned');
    setVisibleCount(60);
  }

  // ---- Duplicate a card for other members ----
  // Same definition of "the same card" that Find duplicates uses (everything except status/copies/photos),
  // so a member who already has this card is flagged instead of getting a second entry.
  function cardSignature(c) {
    return [
      normVal(c.group), cardMembers(c).map(normVal).sort().join('&'), normVal(c.album), normVal(c.itemType),
      normVal(c.productFormat), normVal(c.category),
      toTags(c.versionDetail).map(normVal).sort().join('+'),
    ].join('::');
  }
  function computeDupCandidates(card, extras) {
    if (!card) return [];
    const isAteez = normVal(card.group) === 'ateez';
    const order = isAteez ? ATEEZ_MEMBER_ORDER : [];
    const known = allMembersOf(cards.filter(c => c.group === card.group));
    const rest = [...new Set([...known, ...extras])].filter(m => !order.includes(m)).sort();
    const names = [...order, ...rest].filter(m => !cardMembers(card).some(x => normVal(x) === normVal(m)));
    const existing = new Set(cards.map(cardSignature));
    return names.map(m => ({ member: m, exists: existing.has(cardSignature({ ...card, member: m, coMembers: [] })) }));
  }
  function openDuplicate(card) {
    const cands = computeDupCandidates(card, []);
    setDupCard(card);
    setDupExtra([]);
    setDupExtraInput('');
    setDupStatus('Wishlist');
    setDupMembers(new Set(cands.filter(c => !c.exists).map(c => c.member)));
    setSelectedCard(null);
  }
  function toggleDupMember(m) {
    setDupMembers(prev => {
      const next = new Set(prev);
      if (next.has(m)) next.delete(m); else next.add(m);
      return next;
    });
  }
  function addDupExtra() {
    const name = dupExtraInput.trim();
    if (!name || !dupCard) return;
    const already = computeDupCandidates(dupCard, dupExtra).some(c => normVal(c.member) === normVal(name));
    if (already || cardMembers(dupCard).some(x => normVal(x) === normVal(name))) { setDupExtraInput(''); return; }
    setDupExtra(prev => [...prev, name]);
    setDupMembers(prev => new Set([...prev, name]));
    setDupExtraInput('');
  }
  async function createDuplicates() {
    if (!dupCard) return;
    const targets = computeDupCandidates(dupCard, dupExtra).filter(c => !c.exists && dupMembers.has(c.member)).map(c => c.member);
    if (targets.length === 0) return;
    const now = Date.now();
    const isAteez = normVal(dupCard.group) === 'ateez';
    const roster = CHARACTER_MAP[dupCard.characterSeries];
    const newCards = targets.map((m, i) => {
      const idx = ATEEZ_MEMBER_ORDER.indexOf(m);
      return {
        ...emptyForm,
        group: dupCard.group, member: m, coMembers: [], album: dupCard.album,
        releaseCategory: dupCard.releaseCategory || '', collectionLine: dupCard.collectionLine || '',
        itemType: dupCard.itemType || '', productFormat: dupCard.productFormat || '', category: dupCard.category || '',
        releaseDate: dupCard.releaseDate || '', source: dupCard.source || '',
        versionDetail: [...toTags(dupCard.versionDetail)],
        // Characters belong to a specific member, so give each new card its own rather than copying Mingi's.
        characterSeries: dupCard.characterSeries || '',
        character: roster && isAteez && idx >= 0 ? roster[idx] : '',
        status: dupStatus,
        copies: [],
        id: uid(),
        // Newest-first sort: give the first member the latest timestamp so they land in roster order.
        createdAt: now + (targets.length - 1 - i),
        updatedAt: now,
      };
    });
    const next = [...cards, ...newCards];
    setCards(next);
    setDupCard(null);
    const ok = await persist(next);
    if (ok) {
      setToast(`Created ${newCards.length} card${newCards.length !== 1 ? 's' : ''} as ${dupStatus}.`);
      setTimeout(() => setToast(''), 3500);
    }
  }

  function showStatCards(ids) {
    setStatsCardFilter(new Set(ids));
    setView('main');
  }
  function clearStatsCardFilter() {
    setStatsCardFilter(null);
  }

  function openAdd() {
    const defaultGroup = mostCommon(cards.map(c => c.group));
    const defaultMember = mostCommon(cards.filter(c => c.group === defaultGroup).map(c => c.member));
    setForm({ ...emptyForm, group: defaultGroup, member: defaultMember, itemType: 'Photocard', copies: [] });
    setEditingId(null);
    setEditImageSide('front');
    setModalMode('add');
  }
  function openEdit(card) {
    setForm({ ...emptyForm, ...card, copies: card.copies ? card.copies.map(c => ({ ...c })) : [] });
    setEditingId(card.id);
    setEditImageSide('front');
    setModalMode('edit');
    setSelectedCard(null);
  }
  function closeModal() {
    setDrawerVisible(false);
    setTimeout(() => {
      setModalMode(null);
      setForm(emptyForm);
      setEditingId(null);
    }, 220);
  }

  function handleAlbumChange(v) {
    setForm(f => {
      const next = { ...f, album: v };
      const hit = RELEASE_TO_COLLECTION_LINE[v];
      const tourHit = TOUR_FANMEETING_MAP[v];
      if (hit) {
        next.releaseCategory = hit.cat;
        next.collectionLine = hit.line;
      } else if (tourHit) {
        next.releaseCategory = 'Concert / Tour';
        next.collectionLine = tourHit;
      }
      return next;
    });
  }

  function addCopy() {
    setForm(f => ({ ...f, status: 'Owned', copies: [...f.copies, { id: uid(), date: '', price: '', seller: '' }] }));
  }
  // Unowned: + marks Wishlist (no copy yet). Purchased/Owned: + logs another real copy
  // (so the count stays accurate for Stats). Wishlist/Sold: + is inert — only the badge
  // advances those.
  async function quickAddCopy(cardId) {
    let message = null;
    const next = cards.map(c => {
      if (c.id !== cardId) return c;
      if (!c.status || c.status === 'Unowned') {
        message = 'Added to wishlist.';
        return { ...c, status: 'Wishlist' };
      }
      if (c.status === 'Wishlist' || c.status === 'Sold') {
        return c; // inert in these states
      }
      // Purchased or Owned
      message = 'Copy added.';
      return { ...c, copies: [...(c.copies || []), { id: uid(), date: '', price: '', seller: '' }] };
    });
    if (!message) return;
    setCards(next);
    const ok = await persist(next);
    if (ok) {
      setToast(message);
      setTimeout(() => setToast(''), 2000);
    }
  }
  // Badge always advances one stage: Wishlist -> Purchased -> Owned -> Sold -> Unowned.
  // Wishlist -> Purchased also logs the first copy, so the count shows 1 (unless copies
  // already exist from an earlier cycle, in which case that history is kept as-is).
  async function cycleStatus(cardId) {
    const next = cards.map(c => {
      if (c.id !== cardId) return c;
      if (c.status === 'Wishlist') {
        const copies = c.copies && c.copies.length > 0 ? c.copies : [{ id: uid(), date: '', price: '', seller: '' }];
        return { ...c, status: 'Purchased', copies };
      }
      if (c.status === 'Purchased') return { ...c, status: 'Owned' };
      if (c.status === 'Owned') return { ...c, status: 'Sold' };
      if (c.status === 'Sold') return { ...c, status: 'Unowned' };
      return c;
    });
    setCards(next);
    const ok = await persist(next);
    if (ok) {
      setToast('Status updated.');
      setTimeout(() => setToast(''), 2000);
    }
  }
  function updateCopy(idx, key, value) {
    setForm(f => ({ ...f, copies: f.copies.map((c, i) => (i === idx ? { ...c, [key]: value } : c)) }));
  }
  function removeCopy(idx) {
    setForm(f => ({ ...f, copies: f.copies.filter((_, i) => i !== idx) }));
  }

  async function saveForm() {
    if (!form.member.trim() || !form.album.trim()) {
      const missing = [];
      if (!form.member.trim()) missing.push('Member');
      if (!form.album.trim()) missing.push('Release');
      setToast(`${missing.join(' and ')} ${missing.length > 1 ? 'are' : 'is'} required.`);
      setTimeout(() => setToast(''), 3000);
      return;
    }
    if (!editingId && formDuplicates.length > 0) {
      const d = formDuplicates[0];
      if (!confirm(`This looks like a card you already have:\n\n${cardSummaryLine(d)} (${cardHoldingLine(d)})\n\nIf you bought another copy, add a copy to that card instead.\n\nSave this as a new card anyway?`)) return;
    }
    let next;
    if (editingId) {
      next = cards.map(c => (c.id === editingId ? { ...c, ...form, updatedAt: Date.now() } : c));
    } else {
      next = [...cards, { ...form, id: uid(), createdAt: Date.now(), updatedAt: Date.now() }];
    }
    setCards(next);
    closeModal();
    const ok = await persist(next);
    if (ok) {
      setToast(editingId ? 'Photocard updated.' : 'Photocard added.');
      setTimeout(() => setToast(''), 2500);
    }
  }
  async function saveFormAndAddAnother() {
    if (!form.member.trim() || !form.album.trim()) {
      const missing = [];
      if (!form.member.trim()) missing.push('Member');
      if (!form.album.trim()) missing.push('Release');
      setToast(`${missing.join(' and ')} ${missing.length > 1 ? 'are' : 'is'} required.`);
      setTimeout(() => setToast(''), 3000);
      return;
    }
    if (!editingId && formDuplicates.length > 0) {
      const d = formDuplicates[0];
      if (!confirm(`This looks like a card you already have:\n\n${cardSummaryLine(d)} (${cardHoldingLine(d)})\n\nIf you bought another copy, add a copy to that card instead.\n\nSave this as a new card anyway?`)) return;
    }
    const next = [...cards, { ...form, id: uid(), createdAt: Date.now(), updatedAt: Date.now() }];
    setCards(next);
    const ok = await persist(next);
    if (ok) {
      setToast('Photocard added.');
      setTimeout(() => setToast(''), 2000);
    }
    // Same release is likely next too — keep Group/Release, clear Member since that's
    // usually what changes from card to card in a batch add.
    setForm({ ...emptyForm, group: form.group, album: form.album, itemType: 'Photocard', copies: [] });
    setEditingId(null);
  }

  async function deleteCard(id) {
    const next = cards.filter(c => c.id !== id);
    setCards(next);
    setSelectedCard(null);
    const ok = await persist(next);
    if (ok) {
      setToast('Photocard deleted.');
      setTimeout(() => setToast(''), 2500);
    }
  }

  function openQuickCrop(card, side = 'front') {
    setCropCard(card);
    setCropSide(side);
    setCropDraft((side === 'front' ? card.imageCrop : card.backImageCrop) || null);
  }
  function closeQuickCrop() {
    setCropCard(null);
    setCropDraft(null);
    setCropSide('front');
  }
  async function saveQuickCrop() {
    const field = cropSide === 'front' ? 'imageCrop' : 'backImageCrop';
    const next = cards.map(c => (c.id === cropCard.id ? { ...c, [field]: cropDraft, updatedAt: Date.now() } : c));
    setCards(next);
    setSelectedCard(sc => (sc && sc.id === cropCard.id ? { ...sc, [field]: cropDraft, updatedAt: Date.now() } : sc));
    closeQuickCrop();
    const ok = await persist(next);
    if (ok) {
      setToast('Crop updated.');
      setTimeout(() => setToast(''), 2000);
    }
  }

  function toggleSelectMode() {
    setSelectMode(m => !m);
    setSelectedIds(new Set());
  }
  function toggleSelected(id) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }
  async function bulkDelete() {
    const count = selectedIds.size;
    const next = cards.filter(c => !selectedIds.has(c.id));
    setCards(next);
    setSelectedIds(new Set());
    setSelectMode(false);
    const ok = await persist(next);
    if (ok) {
      setToast(`${count} photocard${count !== 1 ? 's' : ''} deleted.`);
      setTimeout(() => setToast(''), 2500);
    }
  }
  async function applyBulkEdit() {
    const count = selectedIds.size;
    const next = cards.map(c => {
      if (!selectedIds.has(c.id)) return c;
      const updated = { ...c };
      if (bulkForm.group) updated.group = bulkForm.group;
      if (bulkForm.member) updated.member = bulkForm.member;
      if (bulkForm.album) updated.album = bulkForm.album;
      if (bulkForm.releaseCategory) updated.releaseCategory = bulkForm.releaseCategory;
      if (bulkForm.collectionLine) updated.collectionLine = bulkForm.collectionLine;
      if (bulkForm.itemType) updated.itemType = bulkForm.itemType;
      if (bulkForm.productFormat) updated.productFormat = bulkForm.productFormat;
      if (bulkForm.source) updated.source = bulkForm.source;
      if (bulkForm.versionDetail.length > 0) updated.versionDetail = bulkForm.versionDetail;
      if (bulkForm.category) updated.category = bulkForm.category;
      if (bulkForm.characterSeries) updated.characterSeries = bulkForm.characterSeries;
      if (bulkForm.character) updated.character = bulkForm.character;
      if (bulkForm.releaseDate) updated.releaseDate = bulkForm.releaseDate;
      if (bulkForm.status) updated.status = bulkForm.status;
      if (bulkForm.dateSold) updated.dateSold = bulkForm.dateSold;
      if (bulkForm.notes) updated.notes = bulkForm.notes;
      return updated;
    });
    setCards(next);
    setBulkOpen(false);
    setBulkForm({ group: '', member: '', album: '', releaseCategory: '', collectionLine: '', itemType: '', productFormat: '', source: '', versionDetail: [], category: '', characterSeries: '', character: '', releaseDate: '', status: '', dateSold: '', notes: '' });
    setSelectedIds(new Set());
    setSelectMode(false);
    const ok = await persist(next);
    if (ok) {
      setToast(`Bulk update applied to ${count} card${count !== 1 ? 's' : ''}.`);
      setTimeout(() => setToast(''), 2500);
    }
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(cards, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `photocards-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Human-readable purchase log, distinct from the JSON backup above — one row per physical
  // copy (since purchase date/price/seller live on the copy, not the card), for reading in
  // Excel/Sheets rather than for restoring app state. Cards with no recorded copies (wishlist/
  // unowned) are skipped since there's no purchase to log.
  function csvEscape(value) {
    const s = value === null || value === undefined ? '' : String(value);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }
  function exportPurchaseLogCsv() {
    const header = ['Release Category', 'Collection/Line', 'Album/Release', 'Product/Format', 'Version/Edition', 'Source', 'Seller', 'Purchase Date', 'Price'];
    const rows = [header];
    cards.forEach(c => {
      (c.copies || []).forEach(copy => {
        rows.push([
          c.releaseCategory || '',
          c.collectionLine || '',
          c.album || '',
          c.productFormat || '',
          toTags(c.versionDetail).join(' · '),
          c.source || '',
          copy.seller || '',
          copy.date || '',
          copy.price || '',
        ]);
      });
    });
    const csv = rows.map(row => row.map(csvEscape).join(',')).join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `photocard-purchases-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // "Bulk create from list" — parses the JSON Janis pastes back from a Claude chat (see
  // buildBulkCreatePrompt) into new, imageless cards. Loose on purpose: unknown/missing fields are just
  // blank, malformed rows are dropped rather than failing the whole batch, and stray text or a ```json
  // fence around the array is ignored.
  function parseBulkCreateInput(text) {
    const start = text.indexOf('[');
    const end = text.lastIndexOf(']');
    const body = start >= 0 && end > start ? text.slice(start, end + 1) : text;
    let raw;
    try {
      raw = JSON.parse(body);
    } catch {
      return { rows: [], error: "Couldn't read that as JSON — check for a stray comma or missing bracket." };
    }
    if (!Array.isArray(raw)) return { rows: [], error: 'Expected a JSON array of cards (e.g. [ {...}, {...} ]).' };
    const existingAlbums = [...new Set(cards.map(c => c.album).filter(Boolean))];
    const str = v => (v || '').toString().trim();
    const rows = raw
      .filter(r => r && typeof r === 'object')
      .map(r => {
        const group = str(r.group);
        // Accept either member + coMembers, or a single "members" list (first one is the main member).
        const listed = Array.isArray(r.members) ? r.members.map(str).filter(Boolean) : [];
        const mainName = str(r.member) || listed[0] || '';
        const extra = [...(listed.length && !str(r.member) ? listed.slice(1) : listed), ...toTags(r.coMembers).flatMap(m => str(m).split(/\s*(?:,|&|\/|\band\b)\s*/i))];
        const member = canonicalMemberName(mainName, group);
        const coMembers = [];
        extra.map(m => canonicalMemberName(m, group)).filter(Boolean).forEach(m => {
          if (normVal(m) !== normVal(member) && !coMembers.some(x => normVal(x) === normVal(m))) coMembers.push(m);
        });
        const album = canonicalAlbumFor(str(r.album), existingAlbums);
        const tax = taxonomyFor(album);
        return {
          group, member, coMembers, album,
          releaseCategory: str(r.releaseCategory) || (tax ? tax.releaseCategory : ''),
          collectionLine: str(r.collectionLine) || (tax ? tax.collectionLine : ''),
          itemType: str(r.itemType),
          productFormat: str(r.productFormat),
          category: str(r.category),
          versionDetail: toTags(r.versionDetail).map(str).filter(Boolean),
          releaseDate: str(r.releaseDate),
          source: str(r.source),
          characterSeries: str(r.characterSeries),
          character: str(r.character),
          notes: str(r.notes),
        };
      })
      .filter(r => r.group || r.member || r.album || r.versionDetail.length > 0);
    if (rows.length === 0) return { rows: [], error: 'Found JSON, but no usable card rows in it.' };
    return { rows, error: '' };
  }

  // What the review list shows: every parsed row, flagged when it looks like a card she already has
  // ("existing") or one that appears earlier in the same paste ("repeat"). Flagged rows start unticked.
  const bulkPreview = useMemo(() => {
    if (!bulkCreateOpen || !bulkCreateText.trim()) return null;
    const { rows, error } = parseBulkCreateInput(bulkCreateText);
    if (error) return { error, items: [] };
    const items = rows.map((row, idx) => {
      let status = 'new';
      if (cards.some(c => sameCardLoose(c, row))) status = 'existing';
      else if (rows.slice(0, idx).some(prev => sameCardLoose(prev, row))) status = 'repeat';
      return { idx, row, status };
    });
    return { error: '', items };
  }, [bulkCreateOpen, bulkCreateText, cards]);
  const bulkRowOn = it => (bulkCreateOverrides[it.idx] !== undefined ? bulkCreateOverrides[it.idx] : it.status === 'new');

  async function createBulkCards() {
    if (!bulkPreview) { setBulkCreateError('Paste the JSON reply first.'); return; }
    if (bulkPreview.error) { setBulkCreateError(bulkPreview.error); return; }
    const picked = bulkPreview.items.filter(bulkRowOn);
    if (picked.length === 0) { setBulkCreateError('Nothing is ticked — tick at least one card to create.'); return; }
    const skipped = bulkPreview.items.length - picked.length;
    const now = Date.now();
    // Newest-first sort: give the first row the latest timestamp so cards land in the template's order.
    const newCards = picked.map((it, i) => ({
      ...emptyForm, ...it.row, copies: [], id: uid(), createdAt: now + (picked.length - 1 - i), updatedAt: now,
    }));
    const next = [...cards, ...newCards];
    setCards(next);
    setBulkCreateOpen(false);
    setBulkCreateText('');
    setBulkCreateError('');
    setBulkCreateOverrides({});
    const ok = await persist(next);
    if (ok) {
      setToast(`${newCards.length} card${newCards.length !== 1 ? 's' : ''} created${skipped > 0 ? ` (${skipped} skipped)` : ''} — add photos when ready.`);
      setTimeout(() => setToast(''), 3500);
    }
  }

  function currentBulkPrompt() {
    return bulkPromptEdit !== null ? bulkPromptEdit : buildBulkCreatePrompt({ itemTypes: itemTypeOptions, categories, productFormats: productFormatOptions, sources: sourceOptions, albums: allAlbums });
  }
  async function copyBulkCreatePrompt() {
    try {
      await navigator.clipboard.writeText(currentBulkPrompt());
      setPromptCopied(true);
      setTimeout(() => setPromptCopied(false), 2000);
    } catch {
      setToast("Couldn't copy — select and copy the prompt manually.");
      setTimeout(() => setToast(''), 2500);
    }
  }

  function importJson(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!Array.isArray(data)) throw new Error('bad format');
        setCards(data);
        const ok = await persist(data);
        if (ok) {
          setToast(`Imported ${data.length} photocards.`);
          setTimeout(() => setToast(''), 3000);
        }
      } catch (err) {
        setToast('Import failed — file is not a valid backup.');
        setTimeout(() => setToast(''), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function clearFilters() {
    clearFiltersOnly();
    setSearch('');
  }
  // Clears filters but leaves the search box alone — used by the "nothing found" state,
  // where she wants to keep searching, just without whatever filters are hiding the result.
  function clearFiltersOnly() {
    setFilterGroup(''); setSelectedMemberFilters(new Set()); setSelectedAlbumFilters(new Set());
    setSelectedReleaseCategoryFilters(new Set()); setSelectedCollectionLineFilters(new Set());
    setSelectedCategoryFilters(new Set()); setSelectedSourceFilters(new Set()); setSelectedStatusFilters(new Set());
    setFilterVersionTag(''); setFilterItemType(''); setFilterProductFormat(''); setFilterCharacterSeries(''); setFilterCharacter('');
    setPriceMin(''); setPriceMax(''); setPurchaseDateFrom(''); setPurchaseDateTo(''); setSearchField('all');
  }
  function toggleSetValue(setter, value) {
    setter(prev => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value); else next.add(value);
      return next;
    });
  }

  // Small edit-distance check for the "did you mean" hint when a search comes up empty.
  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] : 1 + Math.min(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]);
      }
    }
    return d[m][n];
  }
  function didYouMeanSuggestions(query, pool) {
    const q = query.toLowerCase();
    if (!q) return [];
    const scored = pool.filter(Boolean).map(val => ({ val, dist: levenshtein(q, val.toLowerCase()) }))
      .filter(s => s.dist > 0 && s.dist <= Math.max(2, Math.ceil(q.length * 0.4)));
    scored.sort((a, b) => a.dist - b.dist);
    const seen = new Set();
    const out = [];
    for (const s of scored) {
      if (seen.has(s.val)) continue;
      seen.add(s.val);
      out.push(s.val);
      if (out.length >= 3) break;
    }
    return out;
  }

  // Which field a search hit landed on, for the small match badge on a card tile.
  function searchMatchLabel(card, query) {
    const q = query.toLowerCase();
    if (cardMembers(card).some(m => m.toLowerCase().includes(q))) return 'MEMBER MATCH';
    if ((card.album || '').toLowerCase().includes(q)) return 'RELEASE MATCH';
    if ((card.category || '').toLowerCase().includes(q)) return 'CARD TYPE MATCH';
    if ((card.source || '').toLowerCase().includes(q)) return 'SOURCE MATCH';
    if ((card.notes || '').toLowerCase().includes(q)) return 'NOTES MATCH';
    return null;
  }

  function currentFilterSnapshot() {
    return {
      search, searchField, filterOwned, filterGroup,
      selectedMemberFilters: [...selectedMemberFilters], selectedAlbumFilters: [...selectedAlbumFilters],
      selectedReleaseCategoryFilters: [...selectedReleaseCategoryFilters], selectedCollectionLineFilters: [...selectedCollectionLineFilters],
      selectedCategoryFilters: [...selectedCategoryFilters], selectedSourceFilters: [...selectedSourceFilters],
      selectedStatusFilters: [...selectedStatusFilters],
      filterVersionTag, filterItemType, filterProductFormat, filterCharacterSeries, filterCharacter,
      priceMin, priceMax, purchaseDateFrom, purchaseDateTo, sortBy,
    };
  }
  async function saveCurrentView() {
    const name = savedViewName.trim();
    if (!name) return;
    const next = [...savedViews, { id: uid(), name, snapshot: currentFilterSnapshot() }];
    setSavedViews(next);
    setSavingView(false);
    setSavedViewName('');
    try { await window.storage.set(SAVED_VIEWS_KEY, JSON.stringify(next), false); } catch (e) {}
    setToast('View saved.');
    setTimeout(() => setToast(''), 2000);
  }
  function applyView(view) {
    const s = view.snapshot;
    setSearch(s.search || ''); setSearchField(s.searchField || 'all'); setFilterOwned(s.filterOwned || ''); setFilterGroup(s.filterGroup || '');
    setSelectedMemberFilters(new Set(s.selectedMemberFilters || [])); setSelectedAlbumFilters(new Set(s.selectedAlbumFilters || []));
    setSelectedReleaseCategoryFilters(new Set(s.selectedReleaseCategoryFilters || [])); setSelectedCollectionLineFilters(new Set(s.selectedCollectionLineFilters || []));
    setSelectedCategoryFilters(new Set(s.selectedCategoryFilters || [])); setSelectedSourceFilters(new Set(s.selectedSourceFilters || []));
    setSelectedStatusFilters(new Set(s.selectedStatusFilters || []));
    setFilterVersionTag(s.filterVersionTag || ''); setFilterItemType(s.filterItemType || ''); setFilterProductFormat(s.filterProductFormat || '');
    setFilterCharacterSeries(s.filterCharacterSeries || ''); setFilterCharacter(s.filterCharacter || '');
    setPriceMin(s.priceMin || ''); setPriceMax(s.priceMax || ''); setPurchaseDateFrom(s.purchaseDateFrom || ''); setPurchaseDateTo(s.purchaseDateTo || '');
    setSortBy(s.sortBy || 'recent');
    setVisibleCount(60);
    setShowFilters(true);
  }
  async function deleteView(id) {
    const next = savedViews.filter(v => v.id !== id);
    setSavedViews(next);
    try { await window.storage.set(SAVED_VIEWS_KEY, JSON.stringify(next), false); } catch (e) {}
  }

  // Only meaningful when sorted by purchase date — buckets the visible cards into
  // month sections with a running count + spend, in the same order `visible` is already
  // sorted (newest month first, undated cards in their own group at the end).
  const monthGroups = useMemo(() => {
    if (sortBy !== 'purchased') return null;
    const map = {};
    const order = [];
    visible.forEach(card => {
      const d = cardPurchaseDate(card);
      const key = d ? d.slice(0, 7) : '__none__';
      if (!map[key]) { map[key] = { cards: [], spend: 0 }; order.push(key); }
      map[key].cards.push(card);
      map[key].spend += sumSpent(card);
    });
    return order.map(key => ({
      key,
      label: key === '__none__' ? 'No purchase date' : key.length === 4 ? `Sometime in ${key}` : new Date(`${key}-01T00:00:00`).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      cards: map[key].cards,
      spend: map[key].spend,
    }));
  }, [visible, sortBy]);

  function renderCardTile(card) {
    const badge = cardBadge(card);
    const copyCount = (card.copies || []).length;
    const showCount = card.status === 'Purchased' || card.status === 'Owned' || card.status === 'Sold';
    const displayCount = card.status === 'Sold' ? 0 : copyCount;
    return (
      <div key={card.id}>
        <div className="flex items-baseline justify-between gap-1 mb-1.5">
          <span className="text-sm font-semibold truncate">{card.group || '—'}</span>
          <span className="text-sm font-semibold truncate text-right" title={memberLabel(card)}>{memberLabel(card)}</span>
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => { selectMode ? toggleSelected(card.id) : (setSelectedCard(card), setDetailSide('front')); }}
          onKeyDown={e => { if (e.key === 'Enter') { selectMode ? toggleSelected(card.id) : (setSelectedCard(card), setDetailSide('front')); } }}
          className="pc-card rounded-xl overflow-hidden relative cursor-pointer"
          style={{ background: card.frontImage ? theme.surfaceAlt : placeholderColorFor(card.id), border: selectMode && selectedIds.has(card.id) ? `2px solid ${theme.accent}` : `1px solid ${theme.border}` }}
        >
          {card.frontImage ? (
            <CroppedImage
              src={resolveImageUrl(card.frontImage)}
              crop={card.imageCrop}
              onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'; }}
            />
          ) : null}
          <div className="w-full h-full items-center justify-center flex-col gap-1" style={{ display: card.frontImage ? 'none' : 'flex', color: theme.bg, opacity: 0.75 }}>
            <ImageIcon size={20} />
            <span className="text-[10px]">No image</span>
          </div>
          {selectMode ? (
            <div
              className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: selectedIds.has(card.id) ? theme.accent : 'rgba(0,0,0,0.5)', border: '1.5px solid rgba(255,255,255,0.8)' }}
            >
              {selectedIds.has(card.id) && <span style={{ color: theme.bg, fontSize: 11, fontWeight: 700 }}>✓</span>}
            </div>
          ) : (
            badge && (
              isOwner ? (
                <button
                  onClick={e => { e.stopPropagation(); cycleStatus(card.id); }}
                  title="Tap to change status"
                  className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide"
                  style={{ background: badge.color, color: '#1A1410' }}
                >
                  {badge.label}
                </button>
              ) : (
                <span
                  className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide"
                  style={{ background: badge.color, color: '#1A1410' }}
                >
                  {badge.label}
                </span>
              )
            )
          )}
          {!selectMode && card.backImage && (
            <div className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.55)' }} title="Has a back image">
              <RotateCcw size={11} color="#fff" />
            </div>
          )}
          {isOwner && !selectMode && (
            <button
              onClick={e => { e.stopPropagation(); quickAddCopy(card.id); }}
              title={
                card.status === 'Purchased' || card.status === 'Owned' ? 'Add another copy'
                : card.status === 'Sold' ? 'Sold — no longer in your inventory'
                : card.status === 'Wishlist' ? 'On your wishlist'
                : 'Add to wishlist'
              }
              className="absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'rgba(0,0,0,0.55)', color: '#fff', border: '1px solid rgba(255,255,255,0.35)' }}
            >
              {showCount ? displayCount : <Plus size={12} />}
            </button>
          )}
        </div>
        <div className="mt-1.5">
          {card.album && <p className="text-[11px] truncate" style={{ color: theme.muted }}>{card.album}</p>}
          {(card.source || card.category) && (
            <div className="flex items-end justify-between gap-1.5">
              <span className="text-xs truncate min-w-0">{card.source}</span>
              {card.category && <span className="text-[10px] italic shrink-0" style={{ color: theme.muted }}>{card.category}</span>}
            </div>
          )}
          {toTags(card.versionDetail).length > 0 && <p className="text-xs font-semibold truncate">{toTags(card.versionDetail).join(' · ')}</p>}
        </div>
        {search && searchField === 'all' && searchMatchLabel(card, search) && (
          <p className="text-[9px] font-bold uppercase tracking-wide mt-1" style={{ color: theme.accent }}>{searchMatchLabel(card, search)}</p>
        )}
      </div>
    );
  }
  const gridColsStyle = { gridTemplateColumns: `repeat(auto-fill, minmax(${gridDensity === 'compact' ? 110 : gridDensity === 'gallery' ? 210 : 150}px, 1fr))` };
  const chip = (active) => ({
    background: active ? theme.accent : 'transparent',
    color: active ? theme.bg : theme.text,
    border: `1px solid ${active ? theme.accent : theme.border}`,
  });

  return (
    <div style={{ background: theme.bg, color: theme.text, minHeight: '100%', fontFamily: "'Inter', system-ui, sans-serif" }} className="w-full min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500;1,9..144,600&family=Inter:wght@400;500;600&display=swap');
        .pc-font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; font-weight: 500; }
        .pc-label { text-transform: uppercase; letter-spacing: 0.08em; }
        .pc-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
        .pc-scroll::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 3px; }
        .pc-card { aspect-ratio: 55 / 85; }
        input, select, textarea { background: ${theme.surfaceAlt}; border: 1px solid ${theme.border}; color: ${theme.text}; }
        input::placeholder, textarea::placeholder { color: ${theme.muted}; }
        input:focus, select:focus, textarea:focus { outline: 2px solid ${theme.accent}; outline-offset: 1px; }
      `}</style>

      {/* ==== Main view / Home view — search, filters, and the card grid ==== */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-end justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <button type="button" onClick={goHome} style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }} title="Back to home">
              <img src={LOGO_DATA_URI} alt="" className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0" />
            </button>
            <div>
              <h1 className="pc-font-display text-2xl sm:text-3xl leading-none">Pocafolio</h1>
              <p className="text-xs italic mt-1" style={{ color: theme.muted }}>janis' photocard tracker because she can't stop buying ATEEZ pcs</p>
            </div>
          </div>
          {isOwner && (
            <button onClick={() => setManageOpen(true)} title="Manage values" className="w-7 h-7 flex items-center justify-center rounded shrink-0" style={{ background: 'transparent', border: `1px solid ${theme.border}` }}>
              <Settings size={12} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-5 mb-4 pb-3 flex-wrap" style={{ borderBottom: `1px solid ${theme.border}` }}>
          <nav className="flex items-center gap-4 shrink-0">
            <button type="button" onClick={goBinder} className="pc-label text-[11px] font-semibold" title="Everything you own or have purchased"
              style={{ color: view === 'main' ? theme.text : theme.muted, background: 'transparent', border: 'none', borderBottom: view === 'main' ? `1.5px solid ${theme.text}` : '1.5px solid transparent', paddingBottom: 3, cursor: 'pointer' }}>
              Binder
            </button>
            {/* Stats is owner-only, so signed-out visitors don't get a tab that leads to an empty page. */}
            {isOwner && (
              <button type="button" onClick={() => setView('stats')} className="pc-label text-[11px] font-semibold"
                style={{ color: view === 'stats' ? theme.text : theme.muted, background: 'transparent', border: 'none', borderBottom: view === 'stats' ? `1.5px solid ${theme.text}` : '1.5px solid transparent', paddingBottom: 3, cursor: 'pointer' }}>
                Stats
              </button>
            )}
          </nav>
          <div className="relative flex-1 min-w-[160px] flex items-center gap-2" style={{ borderBottom: `1px solid ${theme.border}`, paddingBottom: 5 }}>
            <Search size={12} style={{ color: theme.muted }} className="shrink-0" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setVisibleCount(60); }}
              placeholder="Search group, member, release, item type, source, character, seller, notes..."
              className="w-full text-sm"
              style={{ background: 'transparent', border: 'none', padding: 0 }}
            />
          </div>
          {isOwner && view === 'main' && (
            <button onClick={toggleSelectMode} className="px-2.5 py-1.5 rounded text-xs font-medium shrink-0" style={chip(selectMode)}>
              {selectMode ? 'Cancel' : 'Select'}
            </button>
          )}
          {isOwner && (
            <button onClick={openAdd} className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium shrink-0" style={{ background: theme.accent, color: theme.bg }}>
              <Plus size={14} /> Add card
            </button>
          )}
        </div>

        {view === 'main' && (
          <>
        {statsCardFilter && (
          <div className="flex items-center justify-between px-3 py-2 rounded mb-3 text-xs" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
            <span>Showing {statsCardFilter.size} card{statsCardFilter.size !== 1 ? 's' : ''} from Stats</span>
            <button onClick={clearStatsCardFilter} className="underline font-medium">Clear</button>
          </div>
        )}

        {search && (
          <p className="text-xs mb-3" style={{ color: theme.muted }}>
            {filtered.length} card{filtered.length !== 1 ? 's' : ''} match &ldquo;{search}&rdquo;
          </p>
        )}

        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto pc-scroll pb-1">
            {[{ value: '', label: 'Everything' }, { value: 'owned', label: 'Owned' }, { value: 'missing', label: 'Not owned' }, { value: 'wishlist', label: 'Wishlist' }].map(o => (
              <button key={o.value} onClick={() => { setFilterOwned(o.value); setVisibleCount(60); }}
                className="px-2.5 py-1 rounded text-[11px] font-medium shrink-0 whitespace-nowrap"
                style={chip(filterOwned === o.value)}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="relative flex items-center gap-1.5 shrink-0">
            {[{ value: 'compact', label: 'Compact' }, { value: 'comfortable', label: 'Comfortable' }, { value: 'gallery', label: 'Gallery' }].map(d => (
              <button key={d.value} onClick={() => setGridDensity(d.value)} className="px-2.5 py-1 rounded text-[11px] font-medium shrink-0"
                style={chip(gridDensity === d.value)}>
                {d.label}
              </button>
            ))}
            <div className="w-px h-4 shrink-0" style={{ background: theme.border }} />
            <button onClick={() => setShowFilters(s => !s)} className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium shrink-0"
              style={chip(!!activeFilterCount)}>
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              <ChevronDown size={12} style={{ transform: showFilters ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }} />
            </button>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} className="flex items-center gap-1 px-2 py-1 rounded text-[11px] shrink-0" style={{ color: theme.muted }}>
                <RotateCcw size={11} /> Clear
              </button>
            )}

            {showFilters && (
              <div className="absolute right-0 top-full mt-2 z-30 p-3 space-y-3.5 overflow-y-auto pc-scroll"
                style={{ background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 6, width: 'min(90vw, 460px)', maxHeight: '70vh', boxShadow: '0 12px 32px rgba(0,0,0,0.15)' }}>
                <div>
                  <p className="pc-label text-[10px] mb-1.5" style={{ color: theme.muted }}>Search field</p>
                  <div className="flex flex-wrap gap-1.5">
                    {[{ value: 'all', label: 'All fields' }, { value: 'member', label: 'Member' }, { value: 'album', label: 'Release' }, { value: 'category', label: 'Card Type' }, { value: 'source', label: 'Source' }, { value: 'notes', label: 'Notes' }].map(f => (
                      <button key={f.value} onClick={() => setSearchField(f.value)} className="px-2 py-0.5 rounded text-[11px] font-medium shrink-0"
                        style={chip(searchField === f.value)}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] mt-1.5" style={{ color: theme.muted }}>
                    {searchField === 'all' ? "Searching member, release, card type, source, notes." : `Only matching the "${{ member: 'Member', album: 'Release', category: 'Card Type', source: 'Source', notes: 'Notes' }[searchField]}" field.`}
                  </p>
                </div>

            {savedViews.length > 0 && (
              <div>
                <p className="text-[11px] mb-1.5" style={{ color: theme.muted }}>Saved views</p>
                <div className="flex flex-wrap gap-1.5">
                  {savedViews.map(v => (
                    <span key={v.id} className="flex items-center gap-1 pl-2.5 pr-1.5 py-1 rounded text-xs font-medium" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <button type="button" onClick={() => applyView(v)}>{v.name}</button>
                      <button type="button" onClick={() => deleteView(v.id)} style={{ color: theme.muted }}><X size={11} /></button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <ChipMultiSelect label="Member" options={filterMembers} selected={selectedMemberFilters} onToggle={v => { toggleSetValue(setSelectedMemberFilters, v); setVisibleCount(60); }} />
            <ChipMultiSelect label="Release Category" options={RELEASE_CATEGORIES} selected={selectedReleaseCategoryFilters} onToggle={v => { toggleSetValue(setSelectedReleaseCategoryFilters, v); setVisibleCount(60); }} />
            <ChipMultiSelect label="Collection / Line" options={filterCollectionLines} selected={selectedCollectionLineFilters} onToggle={v => { toggleSetValue(setSelectedCollectionLineFilters, v); setVisibleCount(60); }} />
            <ChipMultiSelect label="Release" options={filterAlbums} selected={selectedAlbumFilters} onToggle={v => { toggleSetValue(setSelectedAlbumFilters, v); setVisibleCount(60); }} />
            <ChipMultiSelect label="Card type" options={categories} selected={selectedCategoryFilters} onToggle={v => { toggleSetValue(setSelectedCategoryFilters, v); setVisibleCount(60); }} />
            <ChipMultiSelect label="Source" options={sourceOptions} selected={selectedSourceFilters} onToggle={v => { toggleSetValue(setSelectedSourceFilters, v); setVisibleCount(60); }} />
            <ChipMultiSelect label="Status" options={STATUSES.map(s => s.value)} selected={selectedStatusFilters} onToggle={v => { toggleSetValue(setSelectedStatusFilters, v); setVisibleCount(60); }} />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] mb-1.5" style={{ color: theme.muted }}>Price paid (₱)</p>
                <div className="flex items-center gap-2">
                  <input type="number" min="0" value={priceMin} onChange={e => { setPriceMin(e.target.value); setVisibleCount(60); }} placeholder="Min" className="w-full px-2.5 py-1.5 rounded text-sm" />
                  <span style={{ color: theme.muted }}>–</span>
                  <input type="number" min="0" value={priceMax} onChange={e => { setPriceMax(e.target.value); setVisibleCount(60); }} placeholder="Max" className="w-full px-2.5 py-1.5 rounded text-sm" />
                </div>
              </div>
              <div>
                <p className="text-[11px] mb-1.5" style={{ color: theme.muted }}>Purchased between</p>
                <div className="flex items-center gap-2">
                  <input type="date" value={purchaseDateFrom} onChange={e => { setPurchaseDateFrom(e.target.value); setVisibleCount(60); }} className="w-full px-2 py-1.5 rounded text-sm" />
                  <input type="date" value={purchaseDateTo} onChange={e => { setPurchaseDateTo(e.target.value); setVisibleCount(60); }} className="w-full px-2 py-1.5 rounded text-sm" />
                </div>
              </div>
            </div>

            <div>
              <button type="button" onClick={() => setShowMoreFilters(s => !s)} className="flex items-center gap-1 text-xs font-medium" style={{ color: theme.accent }}>
                More filters <ChevronDown size={12} style={{ transform: showMoreFilters ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }} />
              </button>
              {showMoreFilters && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                  <select value={filterGroup} onChange={e => { setFilterGroup(e.target.value); setSelectedMemberFilters(new Set()); setSelectedAlbumFilters(new Set()); setVisibleCount(60); }} className="px-2 py-2 rounded text-sm">
                    <option value="">All groups</option>
                    {groups.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <select value={filterItemType} onChange={e => { setFilterItemType(e.target.value); setVisibleCount(60); }} className="px-2 py-2 rounded text-sm">
                    <option value="">All item types</option>
                    {itemTypeOptions.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <select value={filterProductFormat} onChange={e => { setFilterProductFormat(e.target.value); setVisibleCount(60); }} className="px-2 py-2 rounded text-sm">
                    <option value="">All formats</option>
                    {productFormatOptions.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <select value={filterVersionTag} onChange={e => { setFilterVersionTag(e.target.value); setVisibleCount(60); }} className="px-2 py-2 rounded text-sm">
                    <option value="">All versions/editions</option>
                    {versionDetailOptions.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <select value={filterCharacterSeries} onChange={e => { setFilterCharacterSeries(e.target.value); setVisibleCount(60); }} className="px-2 py-2 rounded text-sm">
                    <option value="">All character series</option>
                    {characterSeriesOptions.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                  <select value={filterCharacter} onChange={e => { setFilterCharacter(e.target.value); setVisibleCount(60); }} className="px-2 py-2 rounded text-sm">
                    <option value="">All characters</option>
                    {characterOptions.map(v => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-2 pt-1" style={{ borderTop: `1px solid ${theme.border}` }}>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-2 py-2 rounded text-sm">
                <option value="recent">Recently added</option>
                <option value="group">Group A–Z</option>
                <option value="member">Member A–Z</option>
                <option value="version">Version / edition A–Z</option>
                <option value="release">Release date</option>
                <option value="spent-high">Total spent: high to low</option>
                <option value="spent-low">Total spent: low to high</option>
                <option value="purchased">Purchase date (groups by month)</option>
              </select>
              {savingView ? (
                <div className="flex items-center gap-1.5">
                  <input autoFocus value={savedViewName} onChange={e => setSavedViewName(e.target.value)} placeholder="View name" className="px-2 py-1.5 rounded text-xs w-28" />
                  <button type="button" onClick={saveCurrentView} className="text-xs font-medium" style={{ color: theme.accent }}>Save</button>
                  <button type="button" onClick={() => { setSavingView(false); setSavedViewName(''); }} className="text-xs" style={{ color: theme.muted }}>Cancel</button>
                </div>
              ) : (
                <button type="button" onClick={() => setSavingView(true)} className="text-xs font-medium underline" style={{ color: theme.muted }}>Save this as a view</button>
              )}
            </div>
          </div>
        )}
          </div>
        </div>

        {!loaded ? (
          <div className="text-sm py-12 text-center" style={{ color: theme.muted }}>Loading your collection...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 rounded-xl px-6" style={{ background: theme.surface, border: `1px dashed ${theme.border}` }}>
            {cards.length === 0 ? (
              <p className="text-sm" style={{ color: theme.muted }}>No photocards yet. Add your first one.</p>
            ) : (
              <>
                <p className="text-sm mb-1">Nothing matches that yet</p>
                {(activeFilterCount > 0 || search) && (
                  <p className="text-xs mb-4" style={{ color: theme.muted }}>
                    {activeFilterCount > 0 && `${activeFilterCount} filter${activeFilterCount !== 1 ? 's are' : ' is'} still on, which might be hiding it. `}
                    {search && "You can also add this as a wishlist entry so it's waiting for you when it arrives."}
                  </p>
                )}
                <div className="flex items-center justify-center gap-2 flex-wrap mb-3">
                  {isOwner && search && (
                    <button onClick={() => { setForm({ ...emptyForm, status: 'Wishlist', notes: `Searched: ${search}` }); setEditingId(null); setModalMode('add'); }}
                      className="px-3 py-1.5 rounded text-xs font-medium" style={{ background: theme.accent, color: theme.bg }}>
                      Add to wishlist
                    </button>
                  )}
                  {activeFilterCount > 0 && (
                    <button onClick={clearFiltersOnly} className="px-3 py-1.5 rounded text-xs font-medium" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      Clear {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''}
                    </button>
                  )}
                  {search && searchField !== 'all' && (
                    <button onClick={() => setSearchField('all')} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      Search all fields
                    </button>
                  )}
                </div>
                {search && (() => {
                  const pool = [...allAlbums, ...allMembers, ...categories, ...sourceOptions];
                  const suggestions = didYouMeanSuggestions(search, pool);
                  return suggestions.length > 0 ? (
                    <p className="text-xs">
                      <span style={{ color: theme.muted }}>Did you mean: </span>
                      {suggestions.map((s, i) => (
                        <span key={s}>
                          {i > 0 && <span style={{ color: theme.muted }}> · </span>}
                          <button onClick={() => setSearch(s)} className="underline" style={{ color: theme.accent }}>{s}</button>
                        </span>
                      ))}
                    </p>
                  ) : null;
                })()}
              </>
            )}
          </div>
        ) : (
          <>
            {monthGroups ? (
              <div className="space-y-6">
                {monthGroups.map(group => (
                  <div key={group.key}>
                    <div className="flex items-baseline justify-between mb-3 pb-2" style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <h3 className="text-sm font-semibold">{group.label}</h3>
                      <span className="text-xs" style={{ color: theme.muted }}>{group.cards.length} card{group.cards.length !== 1 ? 's' : ''} · ₱{formatCurrency(group.spend)}</span>
                    </div>
                    <div className="grid gap-x-3 gap-y-5" style={gridColsStyle}>
                      {group.cards.map(renderCardTile)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-x-3 gap-y-5" style={gridColsStyle}>
                {visible.map(renderCardTile)}
              </div>
            )}
            {visibleCount < filtered.length && (
              <div className="text-center mt-5">
                <button onClick={() => setVisibleCount(v => v + 60)} className="px-4 py-2 rounded-full text-sm" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                  Load more ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}

        <div className="flex items-center justify-center gap-4 mt-8 pt-4 flex-wrap" style={{ borderTop: `1px solid ${theme.border}` }}>
          <button onClick={exportJson} className="flex items-center gap-1.5 text-xs" style={{ color: theme.muted }}><Download size={13} /> Export backup</button>
          <button onClick={exportPurchaseLogCsv} className="flex items-center gap-1.5 text-xs" style={{ color: theme.muted }}><Download size={13} /> Export purchases (CSV)</button>
          {isOwner && (
            <label className="flex items-center gap-1.5 text-xs cursor-pointer" style={{ color: theme.muted }}>
              <Upload size={13} /> Import backup
              <input type="file" accept=".json" onChange={importJson} className="hidden" />
            </label>
          )}
          {isOwner && (
            <button onClick={() => setBulkCreateOpen(true)} className="flex items-center gap-1.5 text-xs" style={{ color: theme.muted }}><Plus size={13} /> Bulk create from list</button>
          )}
          {isOwner && (
            <button onClick={() => setDuplicatesOpen(true)} className="flex items-center gap-1.5 text-xs" style={{ color: theme.muted }}>
              <Search size={13} /> Find duplicates{duplicateGroups.length > 0 ? ` (${duplicateGroups.length})` : ''}
            </button>
          )}
        </div>
          </>
        )}

        {view === 'stats' && isOwner && (
          <div>
            <div className="p-5 sm:p-6 rounded-xl mb-5" style={{ background: theme.plum, color: '#fff' }}>
              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <span className="pc-label text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {statsPeriod === 'today' ? 'Today' : statsPeriod === 'month' ? 'This month' : statsPeriod === 'year' ? 'The year so far' : statsPeriod === 'custom' ? 'Custom range' : 'All time'}
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto pc-scroll pb-1">
                  {[['today', 'Today'], ['month', 'This Month'], ['year', 'This Year'], ['all', 'All Time'], ['custom', 'Custom']].map(([p, label]) => (
                    <button key={p} onClick={() => setStatsPeriod(p)} className="px-2.5 py-1 rounded text-[11px] font-medium shrink-0 whitespace-nowrap"
                      style={{ background: statsPeriod === p ? '#fff' : 'transparent', color: statsPeriod === p ? theme.plum : 'rgba(255,255,255,0.85)', border: `1px solid ${statsPeriod === p ? '#fff' : 'rgba(255,255,255,0.35)'}` }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {statsPeriod === 'custom' && (
                <div className="flex gap-2 mb-3">
                  <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} className="px-2.5 py-1.5 rounded text-sm flex-1" style={{ color: theme.text }} />
                  <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} className="px-2.5 py-1.5 rounded text-sm flex-1" style={{ color: theme.text }} />
                </div>
              )}
              <h2 className="pc-font-display text-2xl sm:text-3xl mb-1">
                {statsData.cardsBought} card{statsData.cardsBought !== 1 ? 's' : ''} <em style={{ opacity: 0.85 }}>{statsBounds.label}</em>
              </h2>
              {collectingSince && (
                <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>Collecting since {new Date(collectingSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                <button onClick={() => showStatCards(statsData.uniqueIds)} className="text-left">
                  <p className="pc-font-display text-xl">{statsData.cardsBought}</p>
                  <p className="pc-label text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Cards bought</p>
                </button>
                <button onClick={() => showStatCards(statsData.uniqueIds)} className="text-left">
                  <p className="pc-font-display text-xl">{statsData.uniqueCards}</p>
                  <p className="pc-label text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Unique cards</p>
                </button>
                <button onClick={() => showStatCards(statsData.duplicateCardIds)} className="text-left">
                  <p className="pc-font-display text-xl">{statsData.duplicateCopies}</p>
                  <p className="pc-label text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Duplicate copies</p>
                </button>
                <div>
                  <p className="pc-font-display text-xl">₱{formatCurrency(statsData.amountSpent)}</p>
                  <p className="pc-label text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Amount spent</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {statsData.timeBreakdown.length > 0 && (() => {
                const maxSpent = Math.max(...statsData.timeBreakdown.map(t => t.spent), 1);
                return (
                  <div className="p-4 rounded-xl" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                    <div className="flex items-baseline justify-between mb-4">
                      <h3 className="pc-font-display text-base">Spend by month</h3>
                      <p className="text-[11px]" style={{ color: theme.muted }}>₱{formatCurrency(statsData.amountSpent)} · avg ₱{formatCurrency(statsData.avgCost)}</p>
                    </div>
                    <div className="flex items-end gap-2 overflow-x-auto pc-scroll" style={{ height: 140 }}>
                      {statsData.timeBreakdown.map(t => (
                        <button key={t.label} onClick={() => showStatCards(t.ids)} className="flex flex-col items-center justify-end gap-1 shrink-0" style={{ width: 32, height: '100%' }} title={`${t.label}: ${t.count} card${t.count !== 1 ? 's' : ''}, ₱${formatCurrency(t.spent)}`}>
                          {t.spent > 0 && <span className="text-[9px]" style={{ color: theme.muted }}>{t.spent >= 1000 ? `${(t.spent / 1000).toFixed(1)}k` : formatCurrency(t.spent)}</span>}
                          <div style={{ width: '100%', height: `${Math.max(4, (t.spent / maxSpent) * 90)}px`, background: theme.plum, borderRadius: 2 }} />
                          <span className="text-[9px]" style={{ color: theme.muted }}>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {statsData.recentHauls.length > 0 && (
                <div className="p-4 rounded-xl" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="pc-font-display text-base">Recent hauls</h3>
                    <p className="text-[11px]" style={{ color: theme.muted }}>All {statsData.recentHauls.length}</p>
                  </div>
                  <div className="space-y-1.5">
                    {statsData.recentHauls.map(({ card, copy }) => (
                      <button
                        key={copy.id}
                        onClick={() => { setSelectedCard(card); setDetailSide('front'); }}
                        className="w-full flex items-center gap-2.5 py-1.5 text-left"
                      >
                        <div className="w-7 shrink-0 rounded overflow-hidden relative flex items-center justify-center" style={{ aspectRatio: '55 / 85', background: card.frontImage ? theme.surfaceAlt : placeholderColorFor(card.id) }}>
                          {card.frontImage ? (
                            <CroppedImage src={resolveImageUrl(card.frontImage)} crop={card.imageCrop} onError={e => { e.target.style.display = 'none'; }} />
                          ) : (
                            <ImageIcon size={10} style={{ color: theme.bg, opacity: 0.75 }} />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{[memberLabel(card), card.album].filter(Boolean).join(' · ') || 'Untitled card'}</p>
                          <p className="text-[11px]" style={{ color: theme.muted }}>{formatFlexDate(copy.date)}</p>
                        </div>
                        <span className="text-sm shrink-0" style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}>₱{formatCurrency(parsePrice(copy.price))}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {Object.keys(statsData.byMember).length > 0 && (() => {
                const entries = Object.entries(statsData.byMember).sort((a, b) => b[1].spent - a[1].spent);
                const maxSpent = Math.max(...entries.map(([, v]) => v.spent), 1);
                return (
                  <div className="p-4 rounded-xl" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                    <div className="flex items-baseline justify-between mb-3">
                      <h3 className="pc-font-display text-base">Where it went, by member</h3>
                      <p className="text-[11px]" style={{ color: theme.muted }}>SPEND · CARDS</p>
                    </div>
                    {statsData.hasSharedCards && (
                      <p className="text-[10px] mb-3" style={{ color: theme.muted }}>Duo/unit cards count toward each member on them, so these rows can add up to more than your total.</p>
                    )}
                    <div className="space-y-2">
                      {entries.map(([mem, v]) => (
                        <button key={mem} onClick={() => showStatCards(v.ids)} className="w-full text-left">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="text-sm truncate">{mem}</span>
                            <span className="text-[11px] shrink-0" style={{ color: theme.muted }}>₱{formatCurrency(v.spent)} · {v.count}</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: theme.surfaceAlt }}>
                            <div style={{ width: `${(v.spent / maxSpent) * 100}%`, height: '100%', background: theme.plum }} />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {Object.keys(statsData.byCategory).length > 0 && (
                <div className="p-4 rounded-xl" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                  <h3 className="pc-font-display text-base mb-3">By card type</h3>
                  <div>
                    {Object.entries(statsData.byCategory).sort((a, b) => b[1].spent - a[1].spent).map(([cat, v]) => (
                      <button key={cat} onClick={() => showStatCards(v.ids)} className="flex items-center justify-between w-full py-2 text-sm text-left" style={{ borderBottom: `1px solid ${theme.border}` }}>
                        <span className="truncate pr-2">{cat}</span>
                        <span className="shrink-0" style={{ color: theme.muted }}>{v.count} card{v.count !== 1 ? 's' : ''} · ₱{formatCurrency(v.spent)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {statsData.priciestMatch && statsData.priciestMatch.price > 0 && (
              <button onClick={() => showStatCards([statsData.priciestMatch.card.id])} className="w-full p-3 rounded-xl text-left mb-6 flex items-center justify-between gap-3" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                <div className="min-w-0">
                  <p className="text-xs" style={{ color: theme.muted }}>Priciest card this period</p>
                  <p className="text-sm font-medium mt-0.5 truncate">{[memberLabel(statsData.priciestMatch.card), statsData.priciestMatch.card.album].filter(Boolean).join(' · ') || 'Untitled card'}</p>
                </div>
                <p className="pc-font-display text-lg shrink-0">₱{formatCurrency(statsData.priciestMatch.price)}</p>
              </button>
            )}

            {Object.keys(statsData.bySource).length > 0 && (
              <div className="mb-6">
                <h3 className="pc-font-display text-base mb-3">Spending by source</h3>
                <CappedList
                  items={Object.entries(statsData.bySource).sort((a, b) => b[1].spent - a[1].spent)}
                  renderRow={([src, v]) => (
                    <button key={src} onClick={() => showStatCards(v.ids)} className="flex items-center justify-between w-full px-3 py-2 rounded text-sm" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <span className="truncate pr-2">{src}</span>
                      <span className="shrink-0" style={{ color: theme.muted }}>{v.count} card{v.count !== 1 ? 's' : ''} · ₱{formatCurrency(v.spent)}</span>
                    </button>
                  )}
                />
              </div>
            )}

            {itemTypeBreakdown.length > 0 && (
              <div className="mb-6">
                <h3 className="pc-font-display text-base mb-3">Collection by item type <span className="font-normal" style={{ color: theme.muted }}>(all time)</span></h3>
                <div className="space-y-1.5">
                  {itemTypeBreakdown.map(([v, d]) => (
                    <button key={v} onClick={() => showStatCards(d.ids)} className="flex items-center justify-between w-full px-3 py-2 rounded text-sm" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <span>{v}</span>
                      <span style={{ color: theme.muted }}>{d.count} card{d.count !== 1 ? 's' : ''} · ₱{formatCurrency(d.spent)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {productFormatBreakdown.length > 0 && (
              <div className="mb-6">
                <h3 className="pc-font-display text-base mb-3">Collection by product/format <span className="font-normal" style={{ color: theme.muted }}>(all time)</span></h3>
                <div className="space-y-1.5">
                  {productFormatBreakdown.map(([v, d]) => (
                    <button key={v} onClick={() => showStatCards(d.ids)} className="flex items-center justify-between w-full px-3 py-2 rounded text-sm" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <span>{v}</span>
                      <span style={{ color: theme.muted }}>{d.count} card{d.count !== 1 ? 's' : ''} · ₱{formatCurrency(d.spent)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {albumBreakdown.length > 0 && (
              <div className="mb-6">
                <h3 className="pc-font-display text-base mb-3">Top releases <span className="font-normal" style={{ color: theme.muted }}>(all time)</span></h3>
                <CappedList
                  items={albumBreakdown}
                  renderRow={([v, d]) => (
                    <button key={v} onClick={() => showStatCards(d.ids)} className="flex items-center justify-between w-full px-3 py-2 rounded text-sm" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <span className="truncate pr-2">{v}</span>
                      <span className="shrink-0" style={{ color: theme.muted }}>{d.count} card{d.count !== 1 ? 's' : ''} · ₱{formatCurrency(d.spent)}</span>
                    </button>
                  )}
                />
              </div>
            )}

            {characterCompletion.length > 0 && (
              <div className="mb-6">
                <h3 className="pc-font-display text-base mb-3">Character set completion <span className="font-normal" style={{ color: theme.muted }}>(all time)</span></h3>
                <div className="space-y-1.5">
                  {characterCompletion.map(c => (
                    <button key={c.series} onClick={() => showStatCards(c.ids)} className="w-full px-3 py-2 rounded text-sm text-left" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <div className="flex items-center justify-between">
                        <span>{c.series}</span>
                        <span style={{ color: c.missing.length === 0 ? theme.accent : theme.muted }}>{c.missing.length === 0 ? 'Complete ✓' : `${c.owned} of ${c.total}`}</span>
                      </div>
                      {c.missing.length > 0 && (
                        <p className="text-xs mt-1" style={{ color: theme.muted }}>Missing: {c.missing.map(m => `${m.member} (${m.character})`).join(', ')}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {releaseCompletion.length > 0 && (
              <div className="mb-6">
                <h3 className="pc-font-display text-base mb-3">Set completion by release <span className="font-normal" style={{ color: theme.muted }}>(all time)</span></h3>
                <CappedList
                  items={releaseCompletion}
                  renderRow={r => (
                    <button key={r.album} onClick={() => showStatCards(r.ids)} className="w-full px-3 py-2 rounded text-sm text-left" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <div className="flex items-center justify-between">
                        <span className="truncate pr-2">{r.album}</span>
                        <span className="shrink-0" style={{ color: r.missing.length === 0 ? theme.accent : theme.muted }}>{r.missing.length === 0 ? 'Complete ✓' : `${r.owned}/${r.total}`}</span>
                      </div>
                      {r.missing.length > 0 && (
                        <p className="text-xs mt-1" style={{ color: theme.muted }}>Missing: {r.missing.join(', ')}</p>
                      )}
                    </button>
                  )}
                />
              </div>
            )}

            {memberOwnedBreakdown.length > 0 && (
              <div className="mb-6">
                <h3 className="pc-font-display text-base mb-3">Owned cards by member <span className="font-normal" style={{ color: theme.muted }}>(all time)</span></h3>
                <div className="space-y-1.5">
                  {memberOwnedBreakdown.map(([mem, v]) => (
                    <button key={mem} onClick={() => showStatCards(v.ids)} className="flex items-center justify-between w-full px-3 py-2 rounded text-sm" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <span>{mem}</span>
                      <span style={{ color: theme.muted }}>{v.count} card{v.count !== 1 ? 's' : ''} · ₱{formatCurrency(v.spent)}</span>
                    </button>
                  ))}
                </div>
                {cards.some(c => isOwned(c) && cardMembers(c).length > 1) && (
                  <p className="text-[10px] mt-2" style={{ color: theme.muted }}>Duo/unit cards count toward each member on them, so these rows can add up to more than your total.</p>
                )}
              </div>
            )}

            {statusOverview.length > 0 && (
              <div className="mb-6">
                <h3 className="pc-font-display text-base mb-3">Status overview <span className="font-normal" style={{ color: theme.muted }}>(all time)</span></h3>
                <div className="space-y-1.5">
                  {statusOverview.map(s => (
                    <button key={s.value} onClick={() => showStatCards(s.ids)} className="flex items-center justify-between w-full px-3 py-2 rounded text-sm" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <span className="flex items-center gap-2">
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
                        {s.value}
                      </span>
                      <span style={{ color: theme.muted }}>{s.count} card{s.count !== 1 ? 's' : ''}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="pc-font-display text-base mb-3">Also in this period</h3>
              <button onClick={() => showStatCards(statsData.addedIds)} className="w-full p-3 rounded-lg text-left" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                <p className="pc-font-display text-xl">{statsData.addedIds.size}</p>
                <p className="text-xs" style={{ color: theme.muted }}>Added to tracker</p>
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs mt-8 pt-4" style={{ color: theme.muted, borderTop: `1px solid ${theme.border}` }}>
          {/* e.g. "129 cards · 72 owned (57 unique, 15 duplicates)" — owned = physical copies in hand,
              unique = distinct cards among them. The parenthetical is dropped when there are no
              duplicates, since "57 owned (57 unique)" would just say the same thing twice. */}
          {cards.length} card{cards.length !== 1 ? 's' : ''} · {totalPhysical} owned{duplicateCount > 0 ? ` (${ownedCount} unique, ${duplicateCount} duplicate${duplicateCount !== 1 ? 's' : ''})` : ''}
        </p>
        {isOwner && (
          <p className="text-center text-[10px] mt-2" style={{ color: theme.muted, opacity: 0.75 }} title="Only you can see this">
            Build {BUILD_INFO.number} · {BUILD_INFO.date} · {BUILD_INFO.note} · {cards.reduce((n, c) => n + (c.frontImage ? 1 : 0) + (c.backImage ? 1 : 0), 0)} photos
          </p>
        )}
      </div>

      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5"
          style={{ background: 'rgba(0,0,0,0.72)', opacity: drawerVisible ? 1 : 0, transition: 'opacity 180ms ease-out' }}
          onClick={closeModal}
        >
          <div
            onClick={e => e.stopPropagation()}
            onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); saveForm(); } }}
            className="w-full max-w-5xl max-h-[94vh] overflow-y-auto pc-scroll rounded-xl"
            style={{
              background: theme.surface,
              border: `1px solid ${theme.border}`,
              boxShadow: '0 24px 80px rgba(0,0,0,0.45)',
              transform: drawerVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.99)',
              transition: 'transform 180ms ease-out',
            }}
          >
            <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4 flex items-start justify-between gap-4" style={{ borderBottom: `1px solid ${theme.border}` }}>
              <div>
                <h2 className="pc-font-display text-2xl sm:text-3xl leading-none" style={{ fontWeight: 600 }}>
                  {editingId ? 'Edit card' : 'Add a card'}
                </h2>
                <p className="text-xs sm:text-sm mt-2" style={{ color: theme.muted }}>
                  {editingId ? 'Update any details — everything else stays as it is.' : 'Add what you know now — the rest can always be filled in later.'}
                </p>
                {editingId && form.updatedAt && (
                  <p className="text-[11px] mt-1" style={{ color: theme.muted }}>
                    Last edited {new Date(form.updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                )}
              </div>
              <button type="button" onClick={closeModal} className="w-7 h-7 flex items-center justify-center shrink-0" style={{ background: 'transparent', border: 'none', color: theme.muted }}>
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-6 px-5 sm:px-7 py-5 sm:py-6">
              <aside className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className="flex rounded overflow-hidden text-[11px]" style={{ border: `1px solid ${theme.border}` }}>
                    <button type="button" onClick={() => setEditImageSide('front')} className="px-3 py-1 font-medium" style={{ background: editImageSide === 'front' ? theme.accent : 'transparent', color: editImageSide === 'front' ? theme.bg : theme.text }}>Front</button>
                    <button type="button" onClick={() => setEditImageSide('back')} className="px-3 py-1 font-medium" style={{ background: editImageSide === 'back' ? theme.accent : 'transparent', color: editImageSide === 'back' ? theme.bg : theme.text }}>Back</button>
                  </div>
                </div>

                {editImageSide === 'front' ? (
                  <ImageField
                    label="Front image"
                    value={form.frontImage}
                    onChange={v => setForm(f => ({ ...f, frontImage: v, imageCrop: null }))}
                    crop={form.imageCrop}
                    onCropChange={c => setForm(f => ({ ...f, imageCrop: c }))}
                  />
                ) : (
                  <ImageField
                    label="Back image (optional)"
                    value={form.backImage}
                    onChange={v => setForm(f => ({ ...f, backImage: v, backImageCrop: null }))}
                    crop={form.backImageCrop}
                    onCropChange={c => setForm(f => ({ ...f, backImageCrop: c }))}
                  />
                )}

                <p className="text-[10px] text-center" style={{ color: theme.muted }}>Cards without a scan show a placeholder sleeve in the grid.</p>
              </aside>

              <section className="min-w-0">
                {formDuplicatesShown.length > 0 && (
                  <div role="alert" className="mb-4 p-3 rounded" style={{ background: '#FBF3E2', border: '1px solid #E3C98A' }}>
                    <p className="text-xs font-semibold" style={{ color: '#7A5A12' }}>
                      {editingId ? 'This matches another card in your binder' : 'You may already have this card'}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {formDuplicatesShown.slice(0, 5).map(d => (
                        <li key={d.id} className="text-xs" style={{ color: theme.text }}>
                          <button type="button" onClick={() => peekExisting(d)} className="underline text-left" style={{ color: '#7A5A12' }} title="Preview this card without leaving the form">
                            {cardSummaryLine(d)}
                          </button>
                          <span style={{ color: theme.muted }}> — {cardHoldingLine(d)}</span>
                        </li>
                      ))}
                      {formDuplicatesShown.length > 5 && <li className="text-xs" style={{ color: theme.muted }}>+{formDuplicatesShown.length - 5} more</li>}
                    </ul>
                    <p className="text-[10px] mt-1" style={{ color: theme.muted }}>Click a name to preview that card — your form stays as it is.</p>
                    {!editingId && (
                      <>
                        <p className="text-[11px] mt-1" style={{ color: theme.muted }}>
                          {isOwned(formDuplicatesShown[0])
                            ? 'Bought another copy? Add a copy to that card instead of making a new one.'
                            : "It's already tracked as a placeholder. If you've bought it, open it and add a copy (Edit → Add a copy) instead of making a new card."}
                        </p>
                        <button type="button" onClick={() => openExistingFromForm(formDuplicatesShown[0])} className="mt-2 px-2.5 py-1 rounded text-[11px] font-medium" style={{ border: '1px solid #E3C98A', background: '#FFFFFF', color: '#7A5A12' }}>
                          Open that card instead (closes this form)
                        </button>
                      </>
                    )}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-4">
                  <SelectOrNew label="Group" value={form.group} options={groups} placeholder="New group name" onChange={v => setForm(f => ({ ...f, group: v }))} />
                  <SelectOrNew label="Member *" value={form.member} options={members} placeholder="New member name" onChange={v => setForm(f => ({ ...f, member: v, coMembers: toTags(f.coMembers).filter(m => normVal(m) !== normVal(v)) }))} />
                  <TagMultiSelect label="Also features (duo / unit cards)" values={toTags(form.coMembers)} options={members.filter(m => normVal(m) !== normVal(form.member))} onChange={v => setForm(f => ({ ...f, coMembers: v }))} placeholder="Add another member on this card" />

                  <Field label="Release Category">
                    <select value={form.releaseCategory} onChange={e => setForm(f => ({ ...f, releaseCategory: e.target.value, collectionLine: '' }))} className="w-full px-2.5 py-2 rounded text-sm">
                      <option value="">Optional</option>
                      {RELEASE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <SelectOrNew label="Collection / Line" value={form.collectionLine} options={form.releaseCategory ? RELEASE_CATEGORY_LINES[form.releaseCategory] : []} placeholder={form.releaseCategory ? 'Auto-fills from Release/Edition below' : 'Pick a Release Category first'} onChange={v => setForm(f => ({ ...f, collectionLine: v }))} />
                  <SelectOrNew label="Release / Edition *" value={form.album} options={formAlbums} placeholder="Album / collection / drop name" onChange={handleAlbumChange} />

                  <SelectOrNew label="Item Type" value={form.itemType} options={itemTypeOptions} placeholder="e.g. Photocard" onChange={v => setForm(f => ({ ...f, itemType: v }))} />
                  <SelectOrNew label="Card Type / Benefit" value={form.category} options={categories} placeholder="e.g. POB, Lucky Draw" onChange={v => setForm(f => ({ ...f, category: v }))} />
                  <SelectOrNew label="Product / Format" value={form.productFormat} options={productFormatOptions} placeholder="e.g. POCAALBUM" onChange={v => setForm(f => ({ ...f, productFormat: v }))} />

                  <SelectOrNew label="Source / Retailer / Partner" value={form.source} options={sourceOptions} placeholder="Retailer, platform, partner" onChange={v => setForm(f => ({ ...f, source: v }))} />
                  <TagMultiSelect label="Version / Edition" values={toTags(form.versionDetail)} options={versionDetailOptions} onChange={v => setForm(f => ({ ...f, versionDetail: v }))} placeholder="e.g. 1.0, A, Pink" />
                  <Field label="Date released"><FreeformDateInput value={form.releaseDate} onChange={v => setForm(f => ({ ...f, releaseDate: v }))} /></Field>

                  <SelectOrNew label="Character Series" value={form.characterSeries} options={characterSeriesOptions} placeholder="Optional" onChange={v => setForm(f => ({ ...f, characterSeries: v }))} />
                  <SelectOrNew label="Character" value={form.character} options={formCharacterOptions} placeholder="Optional" onChange={v => setForm(f => ({ ...f, character: v }))} />
                  <Field label="Status">
                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full px-2.5 py-2 rounded text-sm">
                      {STATUSES.map(s => <option key={s.value} value={s.value}>{s.value}</option>)}
                    </select>
                  </Field>

                  <div className="sm:col-span-2 xl:col-span-3">
                    <Field label="Notes">
                      <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} placeholder="Optional notes" className="w-full px-2.5 py-2 rounded text-sm resize-none" />
                    </Field>
                  </div>
                </div>

                {(form.source || toTags(form.versionDetail).length > 0) && (
                  <p className="text-xs mt-2" style={{ color: theme.muted }}>Descriptor: {versionName(form) || '—'}</p>
                )}

                <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${theme.border}` }}>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-sm font-semibold">Copies of this card</h3>
                      <p className="text-[11px] mt-0.5" style={{ color: theme.muted }}>Each physical copy keeps its own purchase date, price, and seller.</p>
                    </div>
                    <button type="button" onClick={addCopy} className="shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded font-medium" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                      <Plus size={12} /> {form.copies.length === 0 ? 'Add a copy' : 'Add another'}
                    </button>
                  </div>

                  {form.copies.length === 0 ? (
                    <div className="rounded-xl px-3 py-4 text-xs text-center" style={{ color: theme.muted, background: theme.surfaceAlt, border: `1px dashed ${theme.border}` }}>
                      No physical copies recorded yet.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {form.copies.map((copy, idx) => (
                        <div key={copy.id} className="grid grid-cols-1 sm:grid-cols-[1fr_150px_120px_auto] gap-2 items-center p-2.5 rounded-xl" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
                          <SelectOrNew value={copy.seller} options={sellerOptions} placeholder="Seller / source" onChange={v => updateCopy(idx, 'seller', v)} compact />
                          <FreeformDateInput value={copy.date} onChange={v => updateCopy(idx, 'date', v)} compact />
                          <input type="text" placeholder="Price" value={copy.price} onChange={e => updateCopy(idx, 'price', e.target.value)} className="px-2 py-1.5 rounded text-xs" />
                          <button type="button" onClick={() => removeCopy(idx)} className="p-1.5 justify-self-end" style={{ color: '#A24A3E' }} title="Remove copy"><X size={14} /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <Field label="Date sold (optional)"><FreeformDateInput value={form.dateSold} onChange={v => setForm(f => ({ ...f, dateSold: v }))} /></Field>
                </div>
              </section>
            </div>

            <div className="px-5 sm:px-7 py-4 flex flex-wrap items-center gap-2 justify-end" style={{ borderTop: `1px solid ${theme.border}`, background: theme.surfaceAlt }}>
              {editingId && (
                <button type="button" onClick={() => deleteCard(editingId)} className="mr-auto px-3 py-2 rounded text-sm flex items-center gap-1" style={{ color: '#A24A3E' }}>
                  <Trash2 size={14} /> Delete
                </button>
              )}
              {!editingId && <span className="mr-auto text-[11px] hidden sm:inline" style={{ color: theme.muted }}>Ctrl/⌘ + Enter to save</span>}
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded text-sm font-medium" style={{ border: `1px solid ${theme.border}`, background: theme.surface }}>
                Cancel
              </button>
              {!editingId && (
                <button type="button" onClick={saveFormAndAddAnother} className="px-4 py-2 rounded text-sm font-medium" style={{ border: `1px solid ${theme.border}`, background: theme.surface }}>
                  Save and add another
                </button>
              )}
              <button type="button" onClick={saveForm} className="px-5 py-2 rounded text-sm font-medium" style={{ background: theme.accent, color: theme.bg }}>
                {editingId ? 'Save changes' : 'Save card'}
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedCard && (!modalMode || peekMode) && (() => {
        const peek = peekMode;
        const badge = cardBadge(selectedCard);
        const spent = sumSpent(selectedCard);
        return (
          <div className={`fixed inset-0 ${peek ? 'z-[60]' : 'z-50'} flex items-end sm:items-center justify-center p-0 sm:p-4`} style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setSelectedCard(null)}>
            <div
              onClick={e => e.stopPropagation()}
              className="relative w-full sm:max-w-md md:max-w-3xl max-h-[90vh] rounded-t-xl sm:rounded-xl overflow-hidden flex flex-col md:flex-row"
              style={{ background: theme.surface, border: `1px solid ${theme.border}` }}
            >
              <button onClick={() => setSelectedCard(null)} className="absolute top-3 right-3 z-10 w-7 h-7 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)', borderRadius: 4 }}>
                <X size={16} color="#fff" />
              </button>
              {/* Photo — pinned; the info column scrolls independently. Left column on md+, top on mobile.
                  No md:self-start here on purpose: the plum background needs to stretch to match
                  whichever side is taller, so a card with lots of filled-in fields doesn't leave a
                  mismatched white gap below a shorter photo panel. */}
              <div className="shrink-0 p-4 md:p-5 md:w-72 lg:w-80 flex flex-col justify-center" style={{ background: theme.plum }}>
                <div style={{ aspectRatio: '55 / 85', maxHeight: '55vh', margin: '0 auto', background: 'rgba(255,255,255,0.08)', position: 'relative', borderRadius: 10 }} className="overflow-hidden flex items-center justify-center shrink-0 w-full">
                  {selectedCard.category && (
                    <span className="pc-label absolute top-2 left-2 z-10 text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.75)' }}>{selectedCard.category}</span>
                  )}
                  {(detailSide === 'front' ? selectedCard.frontImage : selectedCard.backImage) ? (
                    <CroppedImage
                      src={resolveImageUrl(detailSide === 'front' ? selectedCard.frontImage : selectedCard.backImage)}
                      crop={detailSide === 'front' ? selectedCard.imageCrop : selectedCard.backImageCrop}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                      <ImageIcon size={24} /><span className="text-xs">No {detailSide} image</span>
                    </div>
                  )}
                  {isOwner && !peek && (detailSide === 'front' ? selectedCard.frontImage : selectedCard.backImage) && (
                    <button onClick={() => openQuickCrop(selectedCard, detailSide)} className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.5)' }} title={`Adjust ${detailSide} crop`}>
                      <Pencil size={12} color="#fff" />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-center mt-3">
                  <div className="flex rounded overflow-hidden text-[11px]" style={{ border: `1px solid rgba(255,255,255,0.3)` }}>
                    <button onClick={() => setDetailSide('front')} className="px-3 py-1 font-medium" style={{ background: detailSide === 'front' ? theme.bg : 'transparent', color: detailSide === 'front' ? theme.text : 'rgba(255,255,255,0.8)' }}>Front</button>
                    <button onClick={() => setDetailSide('back')} className="px-3 py-1 font-medium" style={{ background: detailSide === 'back' ? theme.bg : 'transparent', color: detailSide === 'back' ? theme.text : 'rgba(255,255,255,0.8)' }}>Back</button>
                  </div>
                </div>
                <p className="text-[10px] text-center mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {(selectedCard.copies || []).length > 0
                    ? `${selectedCard.copies.length} cop${selectedCard.copies.length !== 1 ? 'ies' : 'y'} tracked.`
                    : 'Cards without a scan show a placeholder sleeve in the grid.'}
                </p>
              </div>
              <div className="p-5 flex-1 min-h-0 overflow-y-auto pc-scroll">

                <div className="flex items-start justify-between mb-1 gap-2 pr-9">
                  <h2 className="pc-font-display text-xl" style={{ fontWeight: 600 }}>{memberLabel(selectedCard) || selectedCard.group}</h2>
                  {badge && (
                    isOwner && !peek ? (
                      <button
                        onClick={() => cycleStatus(selectedCard.id)}
                        title="Tap to change status"
                        className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide shrink-0 mt-1"
                        style={{ background: badge.color, color: '#1A1410' }}
                      >
                        {badge.label}{isOwned(selectedCard) && selectedCard.copies && selectedCard.copies.length > 0 ? ` · ${selectedCard.copies.length}` : ''}
                      </button>
                    ) : (
                      <span
                        className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide shrink-0 mt-1"
                        style={{ background: badge.color, color: '#1A1410' }}
                      >
                        {badge.label}{isOwned(selectedCard) && selectedCard.copies && selectedCard.copies.length > 0 ? ` · ${selectedCard.copies.length}` : ''}
                      </span>
                    )
                  )}
                </div>
                <p className="text-sm italic mb-4" style={{ color: theme.accent }}>
                  {selectedCard.group}{selectedCard.album ? ` · ${selectedCard.album}` : ''}
                </p>
                {selectedCard.updatedAt && (
                  <p className="text-[11px] -mt-3 mb-4" style={{ color: theme.muted }}>
                    Last edited {new Date(selectedCard.updatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                )}

                {peek && (
                  <p className="text-[11px] mb-4 px-2.5 py-1.5 rounded" style={{ color: '#7A5A12', background: '#FBF3E2', border: '1px solid #E3C98A' }}>
                    Previewing from your form — close this to go back to what you were typing.
                  </p>
                )}
                {isOwner && !peek && (
                  <div className="flex gap-2 mb-4">
                    <button onClick={() => openEdit(selectedCard)} className="flex-1 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1.5" style={{ background: theme.accent, color: theme.bg }}>
                      <Pencil size={12} /> Edit card
                    </button>
                    {(selectedCard.status === 'Purchased' || selectedCard.status === 'Owned') && (
                      <button onClick={() => quickAddCopy(selectedCard.id)} className="flex-1 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1.5" style={{ border: `1px solid ${theme.border}` }}>
                        <Plus size={12} /> Add copy
                      </button>
                    )}
                    <button onClick={() => openDuplicate(selectedCard)} title="Create this card for other members" className="flex-1 py-1.5 rounded text-xs font-medium flex items-center justify-center gap-1.5" style={{ border: `1px solid ${theme.border}` }}>
                      <CopyIcon size={12} /> Duplicate
                    </button>
                    <button onClick={() => deleteCard(selectedCard.id)} className="py-1.5 px-2.5 rounded text-xs flex items-center gap-1.5" style={{ color: '#A24A3E', border: `1px solid ${theme.border}` }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                )}

                {/* Facts as a ruled table — label left, value right. Two columns once there's room,
                    so a fully-filled-out card doesn't need much more vertical space than a sparse one
                    (keeps this side closer in height to the photo panel instead of sprawling past it). */}
                <dl className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                  <DetailRow label="Group" value={selectedCard.group} />
                  <DetailRow label="Release Cat." value={selectedCard.releaseCategory} />
                  <DetailRow label="Collection / Line" value={selectedCard.collectionLine} />
                  <DetailRow label="Item type" value={selectedCard.itemType} />
                  <DetailRow label="Product" value={selectedCard.productFormat} />
                  <DetailRow label="Version" value={toTags(selectedCard.versionDetail).length > 0 ? toTags(selectedCard.versionDetail).join(' · ') : ''} />
                  <DetailRow label="Character" value={selectedCard.character ? (selectedCard.characterSeries ? `${selectedCard.character} (${selectedCard.characterSeries})` : selectedCard.character) : selectedCard.characterSeries} />
                  <DetailRow label="Release date" value={formatFlexDate(selectedCard.releaseDate)} />
                  <DetailRow label="Source" value={selectedCard.source} />
                  <DetailRow label="Card type" value={selectedCard.category} />
                  <DetailRow label="Sold" value={formatFlexDate(selectedCard.dateSold)} />
                </dl>

                {(selectedCard.copies || []).length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-baseline justify-between mb-1">
                      <p className="text-sm font-semibold pc-font-display">Copies</p>
                      {spent > 0 && <p className="text-xs" style={{ color: theme.muted, fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}>₱{formatCurrency(spent)} total</p>}
                    </div>
                    <div>
                      {selectedCard.copies.map((c) => (
                        <div key={c.id} className="flex items-baseline justify-between gap-2 py-2 text-sm" style={{ borderBottom: `1px solid ${theme.border}` }}>
                          <span className="truncate">{c.seller || 'Unknown seller'}</span>
                          <span className="shrink-0" style={{ color: theme.muted }}>{c.date ? formatFlexDate(c.date) : 'no date'}</span>
                          {c.price ? (
                            <span className="shrink-0" style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}>₱{formatCurrency(parsePrice(c.price))}</span>
                          ) : <span className="shrink-0" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {selectedCard.notes && (
                  <p className="text-xs mb-4" style={{ color: theme.muted, overflowWrap: 'anywhere' }}><span style={{ color: theme.text }}>Notes:</span> {linkifyText(selectedCard.notes)}</p>
                )}
              </div>

            </div>
          </div>
        );
      })()}

      {cropCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)' }} onClick={closeQuickCrop}>
          <div onClick={e => e.stopPropagation()} className="w-full sm:max-w-sm rounded-2xl p-5" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="pc-font-display text-lg" style={{ fontWeight: 600 }}>Adjust {cropSide} crop</h2>
              <button type="button" onClick={closeQuickCrop}><X size={18} /></button>
            </div>
            <ImageCropper src={resolveImageUrl(cropSide === 'front' ? cropCard.frontImage : cropCard.backImage)} crop={cropDraft} onChange={setCropDraft} />
            <div className="flex gap-2 mt-5">
              <button type="button" onClick={closeQuickCrop} className="flex-1 py-2 rounded-full text-sm font-medium" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>Cancel</button>
              <button type="button" onClick={saveQuickCrop} className="flex-1 py-2 rounded-full text-sm font-medium" style={{ background: theme.accent, color: theme.bg }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {selectMode && selectedIds.size > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-2.5 rounded-full shadow-lg" style={{ background: theme.surface, border: `1px solid ${theme.border}`, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
          <span className="text-sm font-medium pl-1">{selectedIds.size} selected</span>
          <div className="w-px h-5" style={{ background: theme.border }} />
          <button onClick={() => setBulkOpen(true)} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: theme.accent, color: theme.bg }}>Bulk edit</button>
          <button onClick={bulkDelete} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ color: '#A24A3E', border: `1px solid ${theme.border}` }}>Delete</button>
        </div>
      )}

      {bulkOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)' }} onClick={() => setBulkOpen(false)}>
          <div onClick={e => e.stopPropagation()} className="w-full sm:max-w-sm rounded-2xl p-5 max-h-[85vh] overflow-y-auto pc-scroll" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="pc-font-display text-lg" style={{ fontWeight: 600 }}>Bulk edit {selectedIds.size} card{selectedIds.size !== 1 ? 's' : ''}</h2>
              <button type="button" onClick={() => setBulkOpen(false)}><X size={18} /></button>
            </div>
            <p className="text-xs mb-3" style={{ color: theme.muted }}>Leave a field blank to keep each card's existing value there.</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <SelectOrNew label="Group" value={bulkForm.group} options={groups} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, group: v }))} />
                <SelectOrNew label="Member" value={bulkForm.member} options={allMembers} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, member: v }))} />
              </div>
              <SelectOrNew label="Release / Edition" value={bulkForm.album} options={allAlbums} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, album: v }))} />
              <Field label="Release Category">
                <select value={bulkForm.releaseCategory} onChange={e => setBulkForm(f => ({ ...f, releaseCategory: e.target.value }))} className="w-full px-2.5 py-2 rounded text-sm">
                  <option value="">Leave unchanged</option>
                  {RELEASE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <SelectOrNew label="Collection / Line" value={bulkForm.collectionLine} options={bulkForm.releaseCategory ? RELEASE_CATEGORY_LINES[bulkForm.releaseCategory] : allCollectionLines} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, collectionLine: v }))} />
              <div className="grid grid-cols-2 gap-2">
                <SelectOrNew label="Item Type" value={bulkForm.itemType} options={itemTypeOptions} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, itemType: v }))} />
                <SelectOrNew label="Product / Format" value={bulkForm.productFormat} options={productFormatOptions} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, productFormat: v }))} />
              </div>
              <TagMultiSelect label="Version / edition" values={bulkForm.versionDetail} options={versionDetailOptions} onChange={v => setBulkForm(f => ({ ...f, versionDetail: v }))} placeholder="Leave blank to skip" />
              <SelectOrNew label="Source / Retailer / Partner" value={bulkForm.source} options={sourceOptions} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, source: v }))} />
              <div className="grid grid-cols-2 gap-2">
                <SelectOrNew label="Card Type / Benefit" value={bulkForm.category} options={categories} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, category: v }))} />
                <Field label="Date released"><FreeformDateInput value={bulkForm.releaseDate} onChange={v => setBulkForm(f => ({ ...f, releaseDate: v }))} /></Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <SelectOrNew label="Character Series" value={bulkForm.characterSeries} options={characterSeriesOptions} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, characterSeries: v }))} />
                <SelectOrNew label="Character" value={bulkForm.character} options={characterOptions} placeholder="Leave blank to skip" onChange={v => setBulkForm(f => ({ ...f, character: v }))} />
              </div>
              <Field label="Status">
                <select value={bulkForm.status} onChange={e => setBulkForm(f => ({ ...f, status: e.target.value }))} className="w-full px-2.5 py-2 rounded-lg text-sm">
                  <option value="">Leave unchanged</option>
                  {STATUSES.map(s => <option key={s.value} value={s.value}>{s.value}</option>)}
                </select>
              </Field>
              <Field label="Date sold (optional)"><FreeformDateInput value={bulkForm.dateSold} onChange={v => setBulkForm(f => ({ ...f, dateSold: v }))} /></Field>
              <Field label="Notes">
                <textarea value={bulkForm.notes} onChange={e => setBulkForm(f => ({ ...f, notes: e.target.value }))} rows={2} placeholder="Leave blank to skip" className="w-full px-2.5 py-2 rounded-lg text-sm resize-none" />
              </Field>
            </div>
            <button type="button" onClick={applyBulkEdit} className="w-full py-2 rounded-full text-sm font-medium mt-5" style={{ background: theme.accent, color: theme.bg }}>
              Apply to {selectedIds.size} card{selectedIds.size !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}

      {bulkCreateOpen && (() => {
        const items = bulkPreview && !bulkPreview.error ? bulkPreview.items : [];
        const newCount = items.filter(it => it.status === 'new').length;
        const existingCount = items.filter(it => it.status === 'existing').length;
        const repeatCount = items.filter(it => it.status === 'repeat').length;
        const pickedCount = items.filter(bulkRowOn).length;
        // Closing keeps the pasted text and any ticks (so a stray click outside doesn't lose a big paste); creating clears them.
        const closeBulkCreate = () => { setBulkCreateOpen(false); setBulkCreateError(''); };
        return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)' }} onClick={closeBulkCreate}>
          <div onClick={e => e.stopPropagation()} className="w-full sm:max-w-lg rounded-xl p-5 max-h-[88vh] overflow-y-auto pc-scroll" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="pc-font-display text-lg" style={{ fontWeight: 600 }}>Bulk create from list</h2>
              <button type="button" onClick={closeBulkCreate}><X size={18} /></button>
            </div>
            <p className="text-xs mb-3" style={{ color: theme.muted }}>
              Creates new cards from a fan-made template — details only, no photos. You'll see every card it found first, with likely repeats flagged, before anything is created.
            </p>
            <div className="rounded-lg p-3 mb-3" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
              <p className="text-xs mb-2" style={{ color: theme.muted }}>
                1. Copy this prompt. 2. Paste it into a Claude chat along with a screenshot of the template. 3. Paste Claude's reply below.
              </p>
              <button type="button" onClick={copyBulkCreatePrompt} className="w-full py-1.5 rounded text-xs font-medium" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
                {promptCopied ? 'Copied!' : 'Copy extraction prompt'}
              </button>
              <div className="flex items-center justify-between mt-2">
                <button type="button" onClick={() => setBulkPromptOpen(o => !o)} className="text-[11px] underline" style={{ color: theme.muted }}>
                  {bulkPromptOpen ? 'Hide prompt' : 'Show prompt'}
                </button>
                {bulkPromptOpen && bulkPromptEdit !== null && (
                  <button type="button" onClick={() => setBulkPromptEdit(null)} className="text-[11px] underline" style={{ color: theme.muted }}>Reset to default</button>
                )}
              </div>
              {bulkPromptOpen && (
                <>
                  <textarea
                    aria-label="Extraction prompt"
                    value={currentBulkPrompt()}
                    onChange={e => setBulkPromptEdit(e.target.value)}
                    rows={9}
                    className="w-full mt-1.5 px-2.5 py-2 rounded text-[10px] resize-y"
                    style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", lineHeight: 1.45 }}
                  />
                  <p className="text-[10px] mt-1" style={{ color: theme.muted }}>
                    You can edit this — Copy uses whatever is here. Changes last until you reload the page.
                  </p>
                </>
              )}
            </div>
            <Field label="Paste the JSON reply here">
              <textarea
                value={bulkCreateText}
                onChange={e => { setBulkCreateText(e.target.value); setBulkCreateError(''); setBulkCreateOverrides({}); }}
                rows={6}
                placeholder='[{"group":"ATEEZ","member":"Mingi","coMembers":[],"album":"GOLDEN HOUR : Part.5","itemType":"Photocard","versionDetail":["A ver. A"], ...}]'
                className="w-full px-2.5 py-2 rounded text-xs resize-none"
                style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace" }}
              />
            </Field>
            {bulkPreview && bulkPreview.error && <p className="text-xs mt-1.5" style={{ color: '#A24A3E' }}>{bulkPreview.error}</p>}

            {items.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <p className="text-xs font-medium">
                    {items.length} card{items.length !== 1 ? 's' : ''} found · {newCount} new
                    {existingCount > 0 && <span style={{ color: theme.muted }}> · {existingCount} already in your binder</span>}
                    {repeatCount > 0 && <span style={{ color: theme.muted }}> · {repeatCount} repeated in this paste</span>}
                  </p>
                  <span className="flex items-center gap-2 shrink-0">
                    <button type="button" className="text-[11px] underline" style={{ color: theme.muted }}
                      onClick={() => setBulkCreateOverrides(Object.fromEntries(items.map(it => [it.idx, it.status === 'new'])))}>New only</button>
                    <button type="button" className="text-[11px] underline" style={{ color: theme.muted }}
                      onClick={() => setBulkCreateOverrides(Object.fromEntries(items.map(it => [it.idx, true])))}>All</button>
                  </span>
                </div>
                <div className="rounded overflow-y-auto pc-scroll" style={{ maxHeight: '38vh', border: `1px solid ${theme.border}` }}>
                  {items.map(it => {
                    const on = bulkRowOn(it);
                    const versions = toTags(it.row.versionDetail).join(' · ');
                    return (
                      <label key={it.idx} className="flex items-start gap-2 px-2.5 py-1.5 cursor-pointer" style={{ borderBottom: `1px solid ${theme.border}`, opacity: on ? 1 : 0.6 }}>
                        <input type="checkbox" checked={on} onChange={() => setBulkCreateOverrides(o => ({ ...o, [it.idx]: !on }))} className="mt-0.5 shrink-0" style={{ accentColor: theme.accent }} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs font-medium truncate">{[memberLabel(it.row) || '(no member)', it.row.album].filter(Boolean).join(' · ')}{versions ? ` · ${versions}` : ''}</span>
                          <span className="block text-[10px] truncate" style={{ color: theme.muted }}>{[it.row.itemType, it.row.category, it.row.source].filter(Boolean).join(' · ') || '—'}</span>
                        </span>
                        {it.status !== 'new' && (
                          <span className="shrink-0 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wide" style={{ border: `1px dashed ${theme.border}`, color: theme.muted }}>
                            {it.status === 'existing' ? 'Already in binder' : 'Repeat in paste'}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {bulkCreateError && <p className="text-xs mt-1.5" style={{ color: '#A24A3E' }}>{bulkCreateError}</p>}
            <button type="button" onClick={createBulkCards} disabled={items.length === 0 || pickedCount === 0} className="w-full py-2 rounded text-sm font-medium mt-4 disabled:opacity-40" style={{ background: theme.accent, color: theme.bg }}>
              {items.length > 0 ? `Create ${pickedCount} card${pickedCount !== 1 ? 's' : ''}` : 'Create cards'}
            </button>
          </div>
        </div>
        );
      })()}

      {dupCard && (() => {
        const cands = computeDupCandidates(dupCard, dupExtra);
        const available = cands.filter(c => !c.exists);
        const pickedCount = available.filter(c => dupMembers.has(c.member)).length;
        const allPicked = available.length > 0 && pickedCount === available.length;
        const summary = [dupCard.album, toTags(dupCard.versionDetail).join(' · '), dupCard.source].filter(Boolean).join(' · ');
        return (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setDupCard(null)}>
            <div onClick={e => e.stopPropagation()} className="w-full sm:max-w-md max-h-[90vh] overflow-y-auto pc-scroll rounded-t-xl sm:rounded-xl p-5" style={{ background: theme.surface, border: `1px solid ${theme.border}` }}>
              <div className="flex items-start justify-between gap-3 mb-1">
                <h2 className="pc-font-display text-xl" style={{ fontWeight: 600 }}>Duplicate for other members</h2>
                <button type="button" onClick={() => setDupCard(null)} className="w-7 h-7 flex items-center justify-center shrink-0" style={{ background: 'transparent', border: 'none', color: theme.muted }}>
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs mb-4" style={{ color: theme.muted }}>
                Makes the same card for each member you pick{summary ? `: ${summary}` : ''}. Photos, purchase copies and notes aren't copied.
              </p>

              <div className="flex items-center justify-between mb-2">
                <span className="pc-label text-[10px]" style={{ color: theme.muted }}>Members</span>
                {available.length > 0 && (
                  <button type="button" className="text-[11px] underline" style={{ color: theme.muted }}
                    onClick={() => setDupMembers(allPicked ? new Set() : new Set(available.map(c => c.member)))}>
                    {allPicked ? 'Select none' : 'Select all'}
                  </button>
                )}
              </div>
              {cands.length === 0 ? (
                <p className="text-xs mb-2" style={{ color: theme.muted }}>No other members found for this group yet — add one below.</p>
              ) : (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {cands.map(c => (
                    <button key={c.member} type="button" disabled={c.exists}
                      onClick={() => toggleDupMember(c.member)}
                      title={c.exists ? 'This card already exists for this member' : ''}
                      className="px-2.5 py-1 rounded text-[11px] font-medium"
                      style={c.exists
                        ? { background: 'transparent', color: theme.muted, border: `1px dashed ${theme.border}`, opacity: 0.6, cursor: 'default' }
                        : chip(dupMembers.has(c.member))}>
                      {c.member}{c.exists ? ' · already added' : ''}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex gap-2 mb-5">
                <input value={dupExtraInput} onChange={e => setDupExtraInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addDupExtra(); } }}
                  placeholder="Add another member…" className="flex-1 px-2.5 py-1.5 rounded text-sm" />
                <button type="button" onClick={addDupExtra} className="px-3 py-1.5 rounded text-xs font-medium" style={chip(false)}>Add</button>
              </div>

              <span className="pc-label text-[10px] block mb-2" style={{ color: theme.muted }}>Create them as</span>
              <div className="flex gap-1.5 mb-5">
                {['Wishlist', 'Unowned'].map(st => (
                  <button key={st} type="button" onClick={() => setDupStatus(st)} className="px-3 py-1 rounded text-[11px] font-medium" style={chip(dupStatus === st)}>{st}</button>
                ))}
              </div>

              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setDupCard(null)} className="px-4 py-2 rounded text-sm font-medium" style={{ border: `1px solid ${theme.border}`, background: theme.surface }}>Cancel</button>
                <button type="button" onClick={createDuplicates} disabled={pickedCount === 0} className="px-5 py-2 rounded text-sm font-medium"
                  style={{ background: theme.accent, color: theme.bg, opacity: pickedCount === 0 ? 0.45 : 1 }}>
                  Create {pickedCount} card{pickedCount !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {manageOpen && (
        <div
          className="fixed inset-0 z-50"
          style={{ background: 'rgba(0,0,0,0.6)', opacity: manageDrawerVisible ? 1 : 0, transition: 'opacity 220ms ease-out' }}
          onClick={closeManage}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] overflow-y-auto pc-scroll p-5"
            style={{
              background: theme.surface,
              borderLeft: `1px solid ${theme.border}`,
              transform: manageDrawerVisible ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 220ms ease-out',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="pc-font-display text-lg" style={{ fontWeight: 600 }}>Manage values</h2>
              <button type="button" onClick={closeManage}><X size={18} /></button>
            </div>
            <p className="text-xs mb-4" style={{ color: theme.muted }}>Tap a section to open it. Rename fixes it everywhere at once (merges it if the new name already exists). Delete clears it from every card that has it.</p>

            <div className="mb-5 p-3 rounded-lg" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}` }}>
              <p className="text-sm font-medium mb-1">Categorize into Release Category / Collection Line</p>
              <p className="text-xs mb-3" style={{ color: theme.muted }}>
                One-time: backfills Release Category and Collection Line on existing cards from their Release/Edition, and adds the new seed values to Source/Card Type/Item Type/Product Format. Safe to run more than once — already-categorized cards are left alone.
              </p>
              <button
                onClick={runTaxonomyMigration}
                disabled={migrationRunning}
                className="px-3 py-1.5 rounded text-xs font-medium"
                style={{ background: theme.accent, color: theme.bg, opacity: migrationRunning ? 0.6 : 1 }}
              >
                {migrationRunning ? 'Running…' : 'Run categorization'}
              </button>
              {migrationResult && (
                <div className="mt-3 text-xs space-y-1">
                  {!migrationResult.ok && <p style={{ color: '#A24A3E' }}>Save failed — try again before closing this tab.</p>}
                  <p>{migrationResult.categorized} card{migrationResult.categorized !== 1 ? 's' : ''} categorized automatically.</p>
                  {migrationResult.ambiguousFlagged > 0 && (
                    <p style={{ color: theme.muted }}>{migrationResult.ambiguousFlagged} of those share a title with a JP release (Limitless / NOT OKAY / Birthday / Ashes to Light) — categorized as the KR-side default; double-check any that are actually the Japan pressing.</p>
                  )}
                  {migrationResult.digipakFixed > 0 && <p>{migrationResult.digipakFixed} card{migrationResult.digipakFixed !== 1 ? 's' : ''} had "Digipak" standardized to "Digipack".</p>}
                  {migrationResult.needsReview > 0 && (
                    <div>
                      <p style={{ color: theme.muted }}>{migrationResult.needsReview} card{migrationResult.needsReview !== 1 ? 's' : ''} need manual categorization — Release/Edition wasn't in the seed list:</p>
                      <ul className="mt-1 ml-4 list-disc" style={{ color: theme.muted }}>
                        {migrationResult.reviewList.map(a => <li key={a}>{a}</li>)}
                      </ul>
                    </div>
                  )}
                  {migrationResult.categorized === 0 && migrationResult.needsReview === 0 && <p style={{ color: theme.muted }}>No cards needed categorizing.</p>}
                </div>
              )}
            </div>

            <ValueManagerSection title="Release / Edition" usage={albumUsage} onRename={(o, n) => renameFieldValue('album', o, n)} onDelete={v => deleteFieldValue('album', v)} />
            <ValueManagerSection title="Item Type" usage={itemTypeUsage} onRename={(o, n) => renameFieldValue('itemType', o, n)} onDelete={v => deleteFieldValue('itemType', v)} />
            <ValueManagerSection title="Product / Format" usage={productFormatUsage} onRename={(o, n) => renameFieldValue('productFormat', o, n)} onDelete={v => deleteFieldValue('productFormat', v)} />
            <ValueManagerSection title="Version / edition" usage={versionTagUsage} onRename={(o, n) => renameFieldValue('versionDetail', o, n)} onDelete={v => deleteFieldValue('versionDetail', v)} />
            <ValueManagerSection title="Source / Retailer / Partner" usage={sourceUsage} onRename={(o, n) => renameFieldValue('source', o, n)} onDelete={v => deleteFieldValue('source', v)} />
            <ValueManagerSection title="Card Type / Benefit" usage={categoryUsage} onRename={(o, n) => renameFieldValue('category', o, n)} onDelete={v => deleteFieldValue('category', v)} />
            <ValueManagerSection title="Character Series" usage={characterSeriesUsage} onRename={(o, n) => renameFieldValue('characterSeries', o, n)} onDelete={v => deleteFieldValue('characterSeries', v)} />
            <ValueManagerSection title="Character" usage={characterUsage} onRename={(o, n) => renameFieldValue('character', o, n)} onDelete={v => deleteFieldValue('character', v)} />
            {albumUsage.length === 0 && sourceUsage.length === 0 && versionTagUsage.length === 0 && categoryUsage.length === 0 && itemTypeUsage.length === 0 && productFormatUsage.length === 0 && characterSeriesUsage.length === 0 && characterUsage.length === 0 && (
              <p className="text-sm text-center py-6" style={{ color: theme.muted }}>Nothing to manage yet.</p>
            )}
          </div>
        </div>
      )}

      {duplicatesOpen && (
        <div
          className="fixed inset-0 z-50"
          style={{ background: 'rgba(0,0,0,0.6)', opacity: duplicatesDrawerVisible ? 1 : 0, transition: 'opacity 220ms ease-out' }}
          onClick={closeDuplicates}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] overflow-y-auto pc-scroll p-5"
            style={{
              background: theme.surface,
              borderLeft: `1px solid ${theme.border}`,
              transform: duplicatesDrawerVisible ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 220ms ease-out',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="pc-font-display text-lg" style={{ fontWeight: 600 }}>Possible duplicates</h2>
              <button type="button" onClick={closeDuplicates}><X size={18} /></button>
            </div>
            <p className="text-xs mb-4" style={{ color: theme.muted }}>
              Grouped when member, album, item type, product/format, card type, and version/edition all match — a likely sign the same card got entered twice.
            </p>
            {duplicateGroups.length === 0 ? (
              <p className="text-sm text-center py-8" style={{ color: theme.muted }}>No duplicates found.</p>
            ) : (
              <div className="space-y-4">
                {duplicateGroups.map((group, gi) => (
                  <div key={gi} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${theme.border}` }}>
                    <div className="px-3 py-2 text-xs font-medium" style={{ background: theme.surfaceAlt, color: theme.text }}>
                      {[memberLabel(group[0]), group[0].album, toTags(group[0].versionDetail).join(' · ')].filter(Boolean).join(' · ') || 'Untitled card'}
                      <span style={{ color: theme.muted }}> — {group.length} entries</span>
                    </div>
                    <div className="p-2 space-y-1.5">
                      {group.map(c => {
                        const badge = cardBadge(c);
                        return (
                          <div key={c.id} className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm">
                            <div className="w-8 shrink-0 rounded overflow-hidden relative flex items-center justify-center" style={{ aspectRatio: '55 / 85', background: theme.surfaceAlt }}>
                              {c.frontImage ? (
                                <CroppedImage src={resolveImageUrl(c.frontImage)} crop={c.imageCrop} onError={e => { e.target.style.display = 'none'; }} />
                              ) : (
                                <ImageIcon size={12} style={{ color: theme.muted }} />
                              )}
                            </div>
                            <span className="flex-1 min-w-0 truncate text-xs" style={{ color: theme.muted }}>
                              {badge ? badge.label : 'Unowned'}{c.source ? ` · ${c.source}` : ''}{(c.copies || []).length > 0 ? ` · ${c.copies.length} cop${c.copies.length !== 1 ? 'ies' : 'y'}` : ''}
                            </span>
                            <button type="button" onClick={() => { closeDuplicates(); setSelectedCard(c); setDetailSide('front'); }} className="text-xs font-medium shrink-0" style={{ color: theme.accent }}>View</button>
                            <button type="button" onClick={() => deleteCard(c.id)} className="shrink-0" style={{ color: '#A24A3E' }}><Trash2 size={13} /></button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm z-50 text-center" style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, maxWidth: '90vw' }}>
          {toast}
        </div>
      )}
    </div>
  );
}
