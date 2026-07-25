import { useMemo, useRef, useState } from "react";
import ToolShell from "./ToolShell";
import { getTool } from "./toolsData";
import { elementToPdf } from "./helpers";

const ACCENT = getTool("invoice-generator").accent;

const TEMPLATES = [
  { id: "band-blue", name: "Classic Blue", layout: "band", accent: "#2563EB", font: "Inter, system-ui, sans-serif" },
  { id: "minimal-slate", name: "Slate Minimal", layout: "minimal", accent: "#0F172A", font: "Inter, system-ui, sans-serif" },
  { id: "band-emerald", name: "Emerald", layout: "band", accent: "#059669", font: "Inter, system-ui, sans-serif" },
  { id: "sidebar-indigo", name: "Indigo Sidebar", layout: "sidebar", accent: "#4F46E5", font: "Inter, system-ui, sans-serif" },
  { id: "modern-amber", name: "Bold Amber", layout: "modern", accent: "#D97706", font: "Inter, system-ui, sans-serif" },
  { id: "modern-rose", name: "Modern Rose", layout: "modern", accent: "#E11D48", font: "Inter, system-ui, sans-serif" },
  { id: "minimal-teal", name: "Teal Minimal", layout: "minimal", accent: "#0D9488", font: "Inter, system-ui, sans-serif" },
  { id: "sidebar-navy", name: "Corporate Navy", layout: "sidebar", accent: "#1E3A8A", font: "Georgia, 'Times New Roman', serif" },
  { id: "band-violet", name: "Violet", layout: "band", accent: "#7C3AED", font: "Inter, system-ui, sans-serif" },
  { id: "modern-charcoal", name: "Charcoal", layout: "modern", accent: "#111827", font: "Inter, system-ui, sans-serif" },
];

const CURRENCIES = [["$", "USD"], ["€", "EUR"], ["£", "GBP"], ["₹", "INR"], ["¥", "JPY"], ["A$", "AUD"], ["C$", "CAD"]];

const emptyItem = () => ({ desc: "", qty: 1, rate: 0 });

export default function InvoiceGenerator() {
  const [tpl, setTpl] = useState(TEMPLATES[0]);
  const [cur, setCur] = useState("$");
  const [d, setD] = useState({
    from: "Your Business Name",
    fromDetails: "123 Street\nCity, Country\ncontact@yourbusiness.com",
    to: "Client Name",
    toDetails: "Client address\nclient@email.com",
    number: "INV-001",
    date: "",
    due: "",
    notes: "Thank you for your business.",
    taxRate: 0,
  });
  const [items, setItems] = useState([{ desc: "Design work", qty: 10, rate: 50 }]);
  const [busy, setBusy] = useState(false);
  const previewRef = useRef(null);

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, it) => s + (+it.qty || 0) * (+it.rate || 0), 0);
    const tax = (subtotal * (+d.taxRate || 0)) / 100;
    return { subtotal, tax, total: subtotal + tax };
  }, [items, d.taxRate]);

  const money = (n) => cur + n.toFixed(2);
  const set = (k, v) => setD((p) => ({ ...p, [k]: v }));
  const setItem = (i, k, v) => setItems((p) => p.map((it, j) => (j === i ? { ...it, [k]: v } : it)));

  async function download() {
    setBusy(true);
    try {
      await elementToPdf(previewRef.current, `${d.number || "invoice"}.pdf`);
    } finally {
      setBusy(false);
    }
  }

  const inputCls = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400";

  return (
    <ToolShell slug="invoice-generator" wide>
      <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
        {/* Form */}
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Template</p>
            <div className="grid grid-cols-2 gap-2">
              {TEMPLATES.map((t) => (
                <button key={t.id} onClick={() => setTpl(t)} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium ${tpl.id === t.id ? "border-slate-900 bg-slate-50" : "border-slate-200"}`}>
                  <span className="h-4 w-4 shrink-0 rounded" style={{ background: t.accent }} />
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Invoice #" value={d.number} onChange={(v) => set("number", v)} cls={inputCls} />
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-600">Currency</label>
              <select value={cur} onChange={(e) => setCur(e.target.value)} className={inputCls}>
                {CURRENCIES.map(([sym, code]) => <option key={code} value={sym}>{code} ({sym})</option>)}
              </select>
            </div>
            <Field label="Date" type="date" value={d.date} onChange={(v) => set("date", v)} cls={inputCls} />
            <Field label="Due date" type="date" value={d.due} onChange={(v) => set("due", v)} cls={inputCls} />
          </div>

          <Field label="From (your business)" value={d.from} onChange={(v) => set("from", v)} cls={inputCls} />
          <Area label="Your details" value={d.fromDetails} onChange={(v) => set("fromDetails", v)} cls={inputCls} />
          <Field label="Bill to" value={d.to} onChange={(v) => set("to", v)} cls={inputCls} />
          <Area label="Client details" value={d.toDetails} onChange={(v) => set("toDetails", v)} cls={inputCls} />

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">Line items</p>
            <div className="space-y-2">
              {items.map((it, i) => (
                <div key={i} className="flex gap-2">
                  <input placeholder="Description" value={it.desc} onChange={(e) => setItem(i, "desc", e.target.value)} className={inputCls} />
                  <input type="number" placeholder="Qty" value={it.qty} onChange={(e) => setItem(i, "qty", e.target.value)} className="w-16 rounded-lg border border-slate-200 px-2 py-2 text-sm" />
                  <input type="number" placeholder="Rate" value={it.rate} onChange={(e) => setItem(i, "rate", e.target.value)} className="w-20 rounded-lg border border-slate-200 px-2 py-2 text-sm" />
                  <button onClick={() => setItems((p) => p.filter((_, j) => j !== i))} className="px-1 text-slate-400 hover:text-red-500">&times;</button>
                </div>
              ))}
            </div>
            <button onClick={() => setItems((p) => [...p, emptyItem()])} className="mt-2 text-sm font-semibold" style={{ color: ACCENT }}>+ Add item</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tax %" type="number" value={d.taxRate} onChange={(v) => set("taxRate", v)} cls={inputCls} />
          </div>
          <Area label="Notes" value={d.notes} onChange={(v) => set("notes", v)} cls={inputCls} />

          <button onClick={download} disabled={busy} className="w-full rounded-xl px-5 py-3 text-sm font-semibold text-white disabled:opacity-40" style={{ background: ACCENT }}>
            {busy ? "Preparing PDF…" : "Download PDF invoice"}
          </button>
        </div>

        {/* Live preview */}
        <div className="overflow-x-auto">
          <div className="mx-auto w-[720px] max-w-full">
            <div ref={previewRef} style={{ width: 720, background: "#fff", color: "#0f172a", fontFamily: tpl.font }}>
              <InvoicePreview tpl={tpl} d={d} items={items} totals={totals} money={money} />
            </div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

function InvoicePreview({ tpl, d, items, totals, money }) {
  const a = tpl.accent;
  const Meta = () => (
    <div style={{ fontSize: 13, lineHeight: 1.5 }}>
      <div><b>Invoice</b> {d.number}</div>
      {d.date && <div>Date: {d.date}</div>}
      {d.due && <div>Due: {d.due}</div>}
    </div>
  );
  const Parties = () => (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 24, marginTop: 24, fontSize: 13 }}>
      <div style={{ maxWidth: 300 }}>
        <div style={{ color: a, fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>From</div>
        <div style={{ fontWeight: 700, marginTop: 2 }}>{d.from}</div>
        <div style={{ whiteSpace: "pre-line", color: "#475569" }}>{d.fromDetails}</div>
      </div>
      <div style={{ maxWidth: 300 }}>
        <div style={{ color: a, fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: "uppercase" }}>Bill to</div>
        <div style={{ fontWeight: 700, marginTop: 2 }}>{d.to}</div>
        <div style={{ whiteSpace: "pre-line", color: "#475569" }}>{d.toDetails}</div>
      </div>
    </div>
  );
  const Table = () => (
    <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 24, fontSize: 13 }}>
      <thead>
        <tr style={{ background: tpl.layout === "minimal" ? "transparent" : `${a}14`, color: tpl.layout === "minimal" ? "#0f172a" : a }}>
          <th style={{ textAlign: "left", padding: "8px 10px", borderBottom: `2px solid ${a}` }}>Description</th>
          <th style={{ textAlign: "right", padding: "8px 10px", borderBottom: `2px solid ${a}`, width: 60 }}>Qty</th>
          <th style={{ textAlign: "right", padding: "8px 10px", borderBottom: `2px solid ${a}`, width: 90 }}>Rate</th>
          <th style={{ textAlign: "right", padding: "8px 10px", borderBottom: `2px solid ${a}`, width: 100 }}>Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map((it, i) => (
          <tr key={i}>
            <td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0" }}>{it.desc}</td>
            <td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", textAlign: "right" }}>{it.qty}</td>
            <td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", textAlign: "right" }}>{money(+it.rate || 0)}</td>
            <td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", textAlign: "right" }}>{money((+it.qty || 0) * (+it.rate || 0))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  const Totals = () => (
    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
      <div style={{ width: 240, fontSize: 13 }}>
        <Row l="Subtotal" r={money(totals.subtotal)} />
        {(+d.taxRate || 0) > 0 && <Row l={`Tax (${d.taxRate}%)`} r={money(totals.tax)} />}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "10px 12px", background: a, color: "#fff", borderRadius: 8, fontWeight: 700, fontSize: 15 }}>
          <span>Total</span><span>{money(totals.total)}</span>
        </div>
      </div>
    </div>
  );
  const Notes = () => d.notes ? <div style={{ marginTop: 24, fontSize: 12, color: "#64748b", borderTop: "1px solid #e2e8f0", paddingTop: 12, whiteSpace: "pre-line" }}>{d.notes}</div> : null;

  // Header per layout
  if (tpl.layout === "sidebar") {
    return (
      <div style={{ display: "flex", minHeight: 900 }}>
        <div style={{ width: 200, background: a, color: "#fff", padding: 28 }}>
          <div style={{ fontSize: 22, fontWeight: 800 }}>INVOICE</div>
          <div style={{ marginTop: 24, fontSize: 12, opacity: 0.9 }}>
            <div>{d.number}</div>
            {d.date && <div style={{ marginTop: 6 }}>Date<br />{d.date}</div>}
            {d.due && <div style={{ marginTop: 6 }}>Due<br />{d.due}</div>}
          </div>
        </div>
        <div style={{ flex: 1, padding: 32 }}>
          <Parties /><Table /><Totals /><Notes />
        </div>
      </div>
    );
  }
  if (tpl.layout === "modern") {
    return (
      <div style={{ padding: 40, minHeight: 900 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: a, letterSpacing: -1 }}>Invoice</div>
          <Meta />
        </div>
        <Parties /><Table /><Totals /><Notes />
      </div>
    );
  }
  if (tpl.layout === "minimal") {
    return (
      <div style={{ padding: 40, minHeight: 900 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `2px solid ${a}`, paddingBottom: 12 }}>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{d.from}</div>
          <Meta />
        </div>
        <Parties /><Table /><Totals /><Notes />
      </div>
    );
  }
  // band (default)
  return (
    <div style={{ minHeight: 900 }}>
      <div style={{ background: a, color: "#fff", padding: "28px 40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 26, fontWeight: 800 }}>{d.from}</div>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>INVOICE</div>
      </div>
      <div style={{ padding: 40 }}>
        <Meta /><Parties /><Table /><Totals /><Notes />
      </div>
    </div>
  );
}

function Row({ l, r }) {
  return <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 12px" }}><span style={{ color: "#64748b" }}>{l}</span><span>{r}</span></div>;
}
function Field({ label, value, onChange, type = "text", cls }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
    </div>
  );
}
function Area({ label, value, onChange, cls }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-600">{label}</label>
      <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={cls} />
    </div>
  );
}
