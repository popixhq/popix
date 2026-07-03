// ─────────────────────────────────────────────────────────────────────────
//  YOUR PLAY STORE APPS
//  Add a new object to this array for each app. Everything on /apps and each
//  /apps/<slug> page is generated from here — no page code to touch.
//
//  Fields:
//   slug          url segment  → /apps/<slug>
//   name          app name
//   tagline       one short line under the name
//   category      shown as a chip / filter
//   status        "live" | "coming-soon"
//   playUrl       Google Play listing URL ("" while coming soon)
//   accent        main accent color (hex)  → repaints the whole app page
//   accentSoft    very light tint of the accent (hero/section backgrounds)
//   glyph         1–2 characters shown in the squircle icon (or an emoji)
//   rating        e.g. "4.8"   (use "New" before you have ratings)
//   installs      e.g. "10K+"  (use "—" before launch)
//   summary       1–2 sentence description (cards + landing intro)
//   features      [{ title, body }]  — "why you'll like it"
//   highlights    [{ k, v }]         — 3 small stats
//   screens       [{ label, from, to }] — phone mock screens (gradient + label)
//   faqs          [{ q, a }]
// ─────────────────────────────────────────────────────────────────────────

export const apps = [
  {
    slug: "clipsave",
    name: "ClipSave",
    tagline: "Every copy, saved and searchable.",
    category: "Productivity",
    status: "coming-soon",
    playUrl: "",
    accent: "#2563EB",
    accentSoft: "#EAF0FF",
    glyph: "CS",
    rating: "New",
    installs: "—",
    summary:
      "A clipboard manager that quietly remembers everything you copy — text, links, and codes — so you can find and paste it again in seconds.",
    features: [
      { title: "Unlimited history", body: "Your last copy is never the only one you can reach. Scroll back through everything." },
      { title: "Instant search", body: "Type a word and jump straight to the snippet you need — no more re-copying." },
      { title: "Pin what matters", body: "Keep addresses, codes, and canned replies one tap away, always." },
      { title: "Private by design", body: "Everything stays on your device. No account, no cloud, no tracking." },
    ],
    highlights: [
      { k: "1-tap", v: "paste anything" },
      { k: "0", v: "data leaves your phone" },
      { k: "∞", v: "clipboard history" },
    ],
    screens: [
      { label: "History", from: "#2563EB", to: "#60A5FA" },
      { label: "Search", from: "#1D4ED8", to: "#93C5FD" },
      { label: "Pinned", from: "#3B82F6", to: "#BFDBFE" },
    ],
    faqs: [
      { q: "Does it work in the background?", a: "Yes — ClipSave captures copies via a lightweight foreground service so nothing gets lost." },
      { q: "Is my clipboard sent anywhere?", a: "No. Everything is stored locally on your device. There's no account and no cloud sync." },
      { q: "Which Android versions are supported?", a: "Android 10 and above." },
    ],
  },
  {
    slug: "playdeck",
    name: "PlayDeck",
    tagline: "A whole arcade that works offline.",
    category: "Games",
    status: "coming-soon",
    playUrl: "",
    accent: "#EC4899",
    accentSoft: "#FDE9F3",
    glyph: "PD",
    rating: "New",
    installs: "—",
    summary:
      "A growing collection of quick, classic games in one light app — no wifi, no ads mid-game, and one profile that levels up across every title.",
    features: [
      { title: "Play anywhere", body: "Every game runs fully offline. Flights, tunnels, dead zones — all fair game." },
      { title: "One profile, many games", body: "Coins and progress carry across the whole deck, not just one title." },
      { title: "Tiny download", body: "A shared engine keeps the app small even as the game count grows." },
      { title: "Pick up in seconds", body: "No logins, no tutorials to sit through. Tap a tile and you're playing." },
    ],
    highlights: [
      { k: "100%", v: "offline" },
      { k: "1", v: "profile everywhere" },
      { k: "10+", v: "games and growing" },
    ],
    screens: [
      { label: "Game shelf", from: "#EC4899", to: "#F9A8D4" },
      { label: "2048", from: "#DB2777", to: "#FBCFE8" },
      { label: "Rewards", from: "#F472B6", to: "#FCE7F3" },
    ],
    faqs: [
      { q: "Do I need an internet connection?", a: "No. The whole deck is playable offline, forever." },
      { q: "Will more games be added?", a: "Yes — new titles drop into the same app and share your profile and coins." },
      { q: "Are there ads?", a: "Never in the middle of a game. The experience is built to stay uninterrupted." },
    ],
  },
  {
    slug: "echopoem",
    name: "EchoPoem",
    tagline: "Poems kids can listen to and love.",
    category: "Kids & Family",
    status: "coming-soon",
    playUrl: "",
    accent: "#F59E0B",
    accentSoft: "#FFF4E0",
    glyph: "EP",
    rating: "New",
    installs: "—",
    summary:
      "A warm library of short poems for children, read aloud in a friendly voice — perfect for bedtime, car rides, and screen-free listening.",
    features: [
      { title: "Read aloud", body: "Every poem is narrated clearly, so pre-readers can enjoy them too." },
      { title: "Bite-sized", body: "Short poems sized for little attention spans and quiet moments." },
      { title: "Screen-free listening", body: "Press play and put the phone down — it's made for ears, not eyes." },
      { title: "Fresh weekly", body: "New poems are added regularly to keep the library growing." },
    ],
    highlights: [
      { k: "Audio", v: "first, every poem" },
      { k: "2 min", v: "average listen" },
      { k: "Weekly", v: "new additions" },
    ],
    screens: [
      { label: "Library", from: "#F59E0B", to: "#FCD34D" },
      { label: "Now playing", from: "#D97706", to: "#FDE68A" },
      { label: "Favorites", from: "#FBBF24", to: "#FEF3C7" },
    ],
    faqs: [
      { q: "Is it suitable for young kids?", a: "Yes — it's built for children, with clear narration and short, gentle poems." },
      { q: "Can it play with the screen off?", a: "Yes, audio keeps playing so kids can just listen." },
      { q: "Is there a free version?", a: "Yes, with a selection of poems free and more available in the full library." },
    ],
  },
];

export const getApp = (slug) => apps.find((a) => a.slug === slug);
export const appCategories = [...new Set(apps.map((a) => a.category))];
