"use client";
import { useEffect, useRef, useState } from "react";

const ADMIN_EMAIL = "emirasafsimsek2577@gmail.com";
const ADMIN_PASS = "canımablam";
const COLORS = ["#D4537E","#EF9F27","#1D9E75","#7F77DD","#D85A30","#378ADD","#639922","#BA7517","#533AB7","#0F6E56"];

export default function Carki() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [items, setItems] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");
  const [angle, setAngle] = useState(0);
  const [newItem, setNewItem] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const angleRef = useRef(0);

  useEffect(() => {
    drawWheel(angleRef.current);
  }, [items]);

  function drawWheel(ang: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const cx = 160, cy = 160, r = 145;
    ctx.clearRect(0, 0, 320, 320);

    if (items.length === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "#F1EFE8";
      ctx.fill();
      ctx.strokeStyle = "#B4B2A9";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#888780";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Henüz ödül yok", cx, cy - 8);
      ctx.fillText("Admin eklesin", cx, cy + 12);
      drawPointer(ctx, cx, cy, r);
      return;
    }

    const slice = (Math.PI * 2) / items.length;
    items.forEach((item, i) => {
      const start = ang + i * slice;
      const end = start + slice;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, start, end);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(start + slice / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "white";
      ctx.font = "bold 13px sans-serif";
      let text = item;
      while (ctx.measureText(text).width > r - 30 && text.length > 3) text = text.slice(0, -1) + "…";
      ctx.fillText(text, r - 10, 5);
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(cx, cy, 18, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.strokeStyle = "#D4537E";
    ctx.lineWidth = 2;
    ctx.stroke();
    drawPointer(ctx, cx, cy, r);
  }

  function drawPointer(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(cx + r + 10, cy);
    ctx.lineTo(cx + r - 18, cy - 10);
    ctx.lineTo(cx + r - 18, cy + 10);
    ctx.closePath();
    ctx.fillStyle = "#D4537E";
    ctx.fill();
  }

  function spin() {
    if (spinning || items.length === 0) return;
    setSpinning(true);
    setResult("");
    const extraSpins = (5 + Math.random() * 5) * Math.PI * 2;
    const startAngle = angleRef.current;
    const targetAngle = startAngle + extraSpins;
    const duration = 4000;
    const start = performance.now();

    function animate(now: number) {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const current = startAngle + (targetAngle - startAngle) * ease;
      angleRef.current = current;
      drawWheel(current);
      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        const finalAngle = targetAngle % (Math.PI * 2);
        angleRef.current = finalAngle;
        setSpinning(false);
        const slice = (Math.PI * 2) / items.length;
        const normalized = ((Math.PI * 2) - (finalAngle % (Math.PI * 2))) % (Math.PI * 2);
        const idx = Math.floor(normalized / slice) % items.length;
        setResult("Tebrikler! " + items[idx] + " kazandın!");
      }
    }
    requestAnimationFrame(animate);
  }

  function addItem() {
    if (!newItem.trim()) return;
    setItems(prev => [...prev, newItem.trim()]);
    setNewItem("");
  }

  function removeItem(i: number) {
    setItems(prev => prev.filter((_, idx) => idx !== i));
  }

  function doLogin() {
    if (email.trim().toLowerCase() === ADMIN_EMAIL && pass === ADMIN_PASS) {
      setShowLogin(false);
      setShowAdmin(true);
      setLoginErr("");
    } else {
      setLoginErr("E-posta veya şifre hatalı.");
    }
  }

  return (
    <div style={{ padding: "1rem 0", maxWidth: 400, margin: "0 auto" }}>
      <canvas ref={canvasRef} width={320} height={320} style={{ display: "block", margin: "0 auto" }} />
      <div style={{ textAlign: "center", fontSize: 18, fontWeight: 500, minHeight: 28, marginTop: 8 }}>{result}</div>
      <button
        onClick={spin}
        disabled={spinning || items.length === 0}
        style={{ background: "#D4537E", color: "white", border: "none", padding: "10px 32px", borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: "pointer", display: "block", margin: "12px auto 0", opacity: (spinning || items.length === 0) ? 0.5 : 1 }}
      >
        Çevir!
      </button>

      {showLogin && (
        <div style={{ background: "#fff", border: "0.5px solid #ddd", borderRadius: 12, padding: "1rem 1.25rem", margin: "1rem 0" }}>
          <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}>Admin girişi</h3>
          <input type="email" placeholder="E-posta" value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", marginBottom: 8, padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
          <input type="password" placeholder="Şifre" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && doLogin()} style={{ width: "100%", marginBottom: 8, padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
          <button onClick={doLogin} style={{ width: "100%", padding: 8, borderRadius: 6, background: "#D4537E", color: "white", border: "none", cursor: "pointer" }}>Giriş yap</button>
          {loginErr && <p style={{ color: "red", fontSize: 13, marginTop: 6 }}>{loginErr}</p>}
        </div>
      )}

      {showAdmin && (
        <div style={{ background: "#fff", border: "0.5px solid #ddd", borderRadius: 12, padding: "1rem 1.25rem", margin: "1rem 0" }}>
          <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: 10 }}>Çark yönetimi</h3>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input type="text" placeholder="Ödül ekle (örn: Pasta)" value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === "Enter" && addItem()} style={{ flex: 1, padding: 8, borderRadius: 6, border: "1px solid #ddd" }} />
            <button onClick={addItem} style={{ padding: "8px 16px", borderRadius: 6, background: "#D4537E", color: "white", border: "none", cursor: "pointer" }}>Ekle</button>
          </div>
          <div>
            {items.length === 0
              ? <p style={{ fontSize: 13, color: "#888", textAlign: "center", padding: "1rem 0" }}>Henüz ödül eklenmedi</p>
              : items.map((it, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f5f5f5", border: "0.5px solid #ddd", borderRadius: 8, padding: "4px 10px", fontSize: 13, margin: "4px 4px 4px 0" }}>
                  {it}
                  <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, lineHeight: 1, padding: 0, color: "#888" }}>×</button>
                </span>
              ))
            }
          </div>
          <button onClick={() => { setShowAdmin(false); }} style={{ marginTop: 8, fontSize: 13, color: "#888", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>Çıkış yap</button>
        </div>
      )}

      {!showAdmin && (
        <p onClick={() => setShowLogin(v => !v)} style={{ fontSize: 13, color: "#888", textAlign: "center", marginTop: 8, cursor: "pointer", textDecoration: "underline" }}>Admin girişi</p>
      )}
    </div>
  );
}
