// Real vector app icons, keyed by slug. Passed into <Squircle icon={...} />.
// An app without an entry here falls back to its letter glyph.

const fill = { display: "block", width: "100%", height: "100%" };

export const appIcons = {
  clipsave: (
    <svg viewBox="0 0 512 512" style={fill} aria-hidden="true">
      <defs>
        <linearGradient id="csIconBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6E7FE6" />
          <stop offset="1" stopColor="#3A49A8" />
        </linearGradient>
        <linearGradient id="csIconHi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.28" />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="512" height="512" rx="115" fill="url(#csIconBg)" />
      <rect width="512" height="512" rx="115" fill="url(#csIconHi)" />
      <rect x="189" y="179" width="205" height="251" rx="33" fill="#FFFFFF" opacity="0.30" />
      <rect x="159" y="149" width="205" height="251" rx="33" fill="#FFFFFF" opacity="0.58" />
      <rect x="128" y="118" width="205" height="251" rx="33" fill="#F5F7FD" />
      <rect x="161" y="169" width="138" height="23" rx="11" fill="#4A5AC0" />
      <rect x="161" y="220" width="138" height="23" rx="11" fill="#B4BCEC" />
      <rect x="161" y="271" width="92" height="23" rx="11" fill="#B4BCEC" />
    </svg>
  ),
};
