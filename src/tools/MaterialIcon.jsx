// Material Symbols per tool, matching the Stitch design.
export const SYMBOL = {
  "merge-pdf": "merge_type",
  "split-pdf": "content_cut",
  "compress-pdf": "compress",
  "flatten-pdf": "layers_clear",
  "jpg-to-pdf": "image",
  "txt-to-pdf": "description",
  "html-to-pdf": "html",
  "excel-to-pdf": "table_chart",
  "ods-to-pdf": "table_chart",
  "zip-to-pdf": "folder_zip",
  "pdf-to-jpg": "photo_library",
  "pdf-to-excel": "table_view",
  "protect-pdf": "verified_user",
  "pdf-password-remover": "vpn_key",
  "watermark-pdf": "branding_watermark",
  "compress-image": "photo_size_select_large",
  "invoice-generator": "receipt_long",
  "audio-to-text": "settings_voice",
  "video-to-text": "movie",
};

export const symbolFor = (slug) => SYMBOL[slug] || "description";

export default function MaterialIcon({ name, className = "", style, fill = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ ...(fill ? { fontVariationSettings: "'FILL' 1" } : {}), ...style }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
