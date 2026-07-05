// ─────────────────────────────────────────────────────────────────────────
//  YOUR PLAY STORE APPS
//  Add a new object to this array for each app. Everything on /apps and each
//  /apps/<slug> page is generated from here, no page code to touch.
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
//   installs      e.g. "10K+"  (use "-" before launch)
//   summary       1–2 sentence description (cards + landing intro)
//   features      [{ title, body }] , "why you'll like it"
//   highlights    [{ k, v }]        , 3 small stats
//   screens       [{ label, from, to }], phone mock screens (gradient + label)
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
    accent: "#4E5FB5",
    accentSoft: "#EAEDF9",
    glyph: "CS",
    android: "Android 8+",
    rating: "New",
    installs: "-",
    summary:
      "A clipboard manager that quietly remembers everything you copy, text, links, and codes, so you can find and paste it again in seconds.",
    features: [
      { title: "Saved as you go", body: "Copy in any app, open ClipSave, and it's saved automatically, your recent copies are always a tap away." },
      { title: "Tap to re-copy", body: "One tap puts any old clip back on your clipboard, ready to paste anywhere." },
      { title: "Pin what matters", body: "Keep important clips, emails, addresses, links, at the top in a dedicated Pinned tab." },
      { title: "Instant search", body: "Filter hundreds of clips as you type to find the one you need in a second." },
      { title: "Swipe to delete, with Undo", body: "Clear single clips or wipe everything, and undo if you remove one by accident." },
      { title: "Material You & dark mode", body: "A clean Material 3 design with full dark mode and dynamic color on Android 12+." },
    ],
    highlights: [
      { k: "0", v: "permissions required" },
      { k: "On-device", v: "no cloud, no accounts" },
      { k: "No ads", v: "no trackers or analytics" },
    ],
    screens: [
      { label: "Clips", img: "/apps/clipsave/1-clips.png" },
      { label: "Pinned", img: "/apps/clipsave/2-pinned.png" },
      { label: "Search", img: "/apps/clipsave/3-search.png" },
      { label: "Private", img: "/apps/clipsave/4-private.png" },
      { label: "Dark mode", img: "/apps/clipsave/5-dark.png" },
    ],
    faqs: [
      { q: "How does it capture what I copy?", a: "When you open ClipSave it saves whatever you last copied. Android restricts background clipboard access for privacy, so ClipSave captures on open, copy in any app, switch back to ClipSave, and it's saved." },
      { q: "Is my clipboard sent anywhere?", a: "No. Everything is stored locally on your device, no account, no cloud, and it's left out of backups." },
      { q: "Does it save passwords or OTPs?", a: "No. ClipSave skips anything the source app marks as sensitive, such as passwords and one-time codes." },
      { q: "Which Android versions are supported?", a: "Android 8 and above." },
    ],
    privacy: {
      updated: "5 July 2026",
      intro:
        "ClipSave is built to keep your clipboard private. Here is exactly how it handles your data.",
      sections: [
        { h: "What the app stores", p: "When you turn on Auto-save, ClipSave saves the text you copy into a private database on your device only. This history never leaves your device, is not uploaded to us or anyone else, and is excluded from cloud backup and device-to-device transfer. Delete any clip by swiping, clear everything with Clear all, or uninstall the app to remove it entirely." },
        { h: "Sensitive content", p: "ClipSave does not save clipboard content that the source app marks as sensitive, for example passwords or one-time codes copied from a password manager." },
        { h: "Permissions and data collection", p: "ClipSave requests no Android permissions and reads the clipboard only while the app is open on screen. We collect, transmit, sell, and share no personal or usage data, and the app contains no third-party SDKs, advertising, or analytics." },
        { h: "Children", p: "The app is safe for general audiences and collects no data from anyone, including children." },
        { h: "Contact", p: "Questions about this policy? Email thepolishedpixels@gmail.com. If this policy changes, we will update the date above." },
      ],
    },
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
    installs: "-",
    summary:
      "A growing collection of quick, classic games in one light app, no wifi, no ads mid-game, and one profile that levels up across every title.",
    features: [
      { title: "Play anywhere", body: "Every game runs fully offline. Flights, tunnels, dead zones, all fair game." },
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
      { q: "Will more games be added?", a: "Yes, new titles drop into the same app and share your profile and coins." },
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
    installs: "-",
    summary:
      "A warm library of short poems for children, read aloud in a friendly voice, perfect for bedtime, car rides, and screen-free listening.",
    features: [
      { title: "Read aloud", body: "Every poem is narrated clearly, so pre-readers can enjoy them too." },
      { title: "Bite-sized", body: "Short poems sized for little attention spans and quiet moments." },
      { title: "Screen-free listening", body: "Press play and put the phone down, it's made for ears, not eyes." },
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
      { q: "Is it suitable for young kids?", a: "Yes, it's built for children, with clear narration and short, gentle poems." },
      { q: "Can it play with the screen off?", a: "Yes, audio keeps playing so kids can just listen." },
      { q: "Is there a free version?", a: "Yes, with a selection of poems free and more available in the full library." },
    ],
  },
];

export const getApp = (slug) => apps.find((a) => a.slug === slug);
export const appCategories = [...new Set(apps.map((a) => a.category))];
