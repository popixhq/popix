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
        { h: "Contact", p: "Questions about this policy? Email contact@popixhq.com. If this policy changes, we will update the date above." },
      ],
    },
  },
  {
    slug: "pocket-play",
    name: "Pocket Play",
    tagline: "22 classic games in one offline app.",
    category: "Games",
    status: "coming-soon",
    playUrl: "",
    accent: "#6C4CF0",
    accentSoft: "#EEEBFD",
    glyph: "🎮",
    android: "Android 7+",
    rating: "New",
    installs: "-",
    summary:
      "A pocket-sized arcade of 22 classic games, chess, sudoku, solitaire, ludo, 2048 and more, that all run fully offline, with one profile of coins and best scores that carries across every game.",
    features: [
      { title: "Play anywhere, offline", body: "Every game runs with no wifi and no data. Flights, tunnels, and dead zones are all fair game." },
      { title: "One profile, every game", body: "Coins, streaks, and best scores carry across all 22 games, not just one." },
      { title: "22 games, one small app", body: "A shared engine keeps the download tiny even with two dozen games inside." },
      { title: "Pick up in seconds", body: "No logins, no sign-ups, no long tutorials. Tap a tile and you're playing." },
      { title: "Solo or two-player", body: "Play the computer or pass-and-play a friend on the same phone in Chess, Ludo, Tic Tac Toe and more." },
      { title: "Something for every mood", body: "Number puzzles, word games, board classics, cards, and quick arcade games in one place." },
    ],
    highlights: [
      { k: "22", v: "games in one app" },
      { k: "100%", v: "offline, no wifi" },
      { k: "1", v: "profile everywhere" },
    ],
    screens: [
      { label: "Game shelf", from: "#4F7CFF", to: "#8B5CF0" },
      { label: "Chess", from: "#8B5CF0", to: "#D94BD0" },
      { label: "2048", from: "#31C6FF", to: "#4F7CFF" },
      { label: "Best scores", from: "#D94BD0", to: "#FF5C9D" },
    ],
    faqs: [
      { q: "Do I need an internet connection?", a: "No. All 22 games are fully playable offline, forever. Pocket Play never needs wifi or data to play." },
      { q: "How many games are included?", a: "22 classic games, including Chess, Sudoku, Solitaire, Ludo, 2048, Ball Crusher, Word Search, Minesweeper, and more." },
      { q: "Do I need an account?", a: "No. There are no accounts or sign-ups. Your coins and best scores are saved right on your device." },
      { q: "Are there ads?", a: "The app never interrupts you in the middle of a game." },
    ],
    privacy: {
      updated: "14 July 2026",
      intro:
        "Pocket Play is an offline games app that keeps everything on your device. Here is exactly how it handles your data.",
      sections: [
        { h: "What the app stores", p: "Pocket Play saves your game progress, best scores, coins, streak, favorite games, and settings in the app's private storage on your device only. This information never leaves your device and is not uploaded to us or anyone else. Clearing the app's data or uninstalling it removes everything." },
        { h: "Permissions and data collection", p: "Pocket Play requests no special Android permissions and uses no internet connection to play. We collect, transmit, sell, and share no personal or usage data, and there are no accounts or sign-in." },
        { h: "Third-party services", p: "The app contains no third-party advertising, analytics, or tracking SDKs. If we ever add any in the future, for example advertising to keep the app free, we will update this policy and disclose it in the app before it takes effect." },
        { h: "Children", p: "Pocket Play is safe for general audiences and collects no data from anyone, including children." },
        { h: "Contact", p: "Questions about this policy? Email contact@popixhq.com. If this policy changes, we will update the date above." },
      ],
    },
    terms: {
      updated: "14 July 2026",
      intro:
        "These terms cover your use of the Pocket Play app. By downloading or using the app, you agree to them.",
      sections: [
        { h: "Using the app", p: "Pocket Play is free to download and use for your own personal, non-commercial entertainment. Please don't resell, redistribute, decompile, or modify the app or its games, or try to disrupt how it works for others." },
        { h: "Coins, scores, and progress", p: "Coins, streaks, rewards, and scores in Pocket Play are for in-game fun only. They have no real-world or monetary value, cannot be bought, sold, or exchanged for money, and may be reset if you clear the app's data or uninstall it." },
        { h: "Availability and changes", p: "We may add, change, or remove games and features over time to keep the app fresh. The app is provided \"as is\", without warranties of any kind, and is meant simply for your enjoyment." },
        { h: "Limitation of liability", p: "To the fullest extent permitted by law, Polished Pixels is not liable for any loss or damage arising from your use of, or inability to use, the app." },
        { h: "Contact", p: "Questions about these terms? Email contact@popixhq.com. If these terms change, we will update the date above." },
      ],
    },
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
