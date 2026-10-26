import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2, Search, ChevronDown, ChevronUp, ChevronRight, ChevronLeft, Bell, Zap, Package,
  ShoppingCart, Truck, Warehouse, Wallet, Network, BarChart3, Settings, Plus, Upload,
  MoreHorizontal, MoreVertical, Filter, ArrowDownUp, Heart, LayoutList, LayoutGrid, Pencil,
  Copy, Tag, ArrowLeftRight, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ürünler | İnşaatÇevrem ERP" },
      { name: "description", content: "Ürün kayıtlarını, varyantlarını, fiyatlarını ve stok bilgilerini yönetin." },
      { property: "og:title", content: "Ürünler | İnşaatÇevrem ERP" },
      { property: "og:description", content: "Ürün ve stok yönetim paneli." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

type P = { name: string; sub: string; sku: string; bc: string; cat: string; stock: number; unit: string; price: string; status: "Aktif" | "Kritik"; pct: number; tone: string };
const products: P[] = [
  { name: "Seramik 60 × 60", sub: "Beyaz Parlak", sku: "SRM-6060-01", bc: "8691234567890", cat: "Seramik", stock: 240, unit: "m²", price: "₺450,00", status: "Aktif", pct: 70, tone: "bg-muted-foreground/30" },
  { name: "Çimento 50 kg", sub: "Portland", sku: "CIM-50-001", bc: "8699876543210", cat: "Çimento", stock: 86, unit: "torba", price: "₺120,00", status: "Aktif", pct: 55, tone: "bg-chart-5/50" },
  { name: "PVC Boru Ø50", sub: "3 metre", sku: "PVC-050-001", bc: "8691111222233", cat: "Boru", stock: 120, unit: "adet", price: "₺85,00", status: "Aktif", pct: 60, tone: "bg-muted-foreground/20" },
  { name: "Kum Torbası 25 kg", sub: "", sku: "KUM-25-001", bc: "8694445555667", cat: "İnşaat Malz.", stock: 15, unit: "torba", price: "₺45,00", status: "Kritik", pct: 15, tone: "bg-chart-4/50" },
  { name: "Alçı Levha 12,5 mm", sub: "", sku: "ALC-125-001", bc: "8697778889990", cat: "İç Mekan", stock: 320, unit: "adet", price: "₺165,00", status: "Aktif", pct: 80, tone: "bg-muted-foreground/25" },
  { name: "Demir Çubuk 12 mm", sub: "", sku: "DMR-12-001", bc: "8690001112223", cat: "Demir", stock: 75, unit: "adet", price: "₺280,00", status: "Aktif", pct: 10, tone: "bg-foreground/70" },
  { name: "Yapıştırıcı 25 kg", sub: "", sku: "YPS-25-001", bc: "8693334445556", cat: "Kimyasal", stock: 40, unit: "torba", price: "₺210,00", status: "Aktif", pct: 50, tone: "bg-chart-5/40" },
  { name: "Boya 20 kg", sub: "İç Cephe - Beyaz", sku: "BOY-20-001", bc: "8696667778889", cat: "Boya", stock: 68, unit: "adet", price: "₺950,00", status: "Aktif", pct: 45, tone: "bg-primary/30" },
];

const menu = [
  { icon: ShoppingCart, label: "Satış" }, { icon: Truck, label: "Satın Alma" },
  { icon: Warehouse, label: "Depo ve Sevkiyat" }, { icon: Wallet, label: "Finans" },
  { icon: Network, label: "Network" }, { icon: BarChart3, label: "Raporlar" }, { icon: Settings, label: "Ayarlar" },
];

function Btn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <button className={`inline-flex h-9 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors ${primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-input bg-card hover:bg-muted"}`}>
      {children}
    </button>
  );
}
function Select({ label }: { label: string }) {
  return <button className="inline-flex h-9 items-center gap-6 rounded-md border border-input bg-card px-3 text-sm">{label}<ChevronDown className="size-4 text-muted-foreground" /></button>;
}

function Index() {
  const [sel, setSel] = useState(0);
  const [tab, setTab] = useState(0);
  const [dTab, setDTab] = useState(0);
  const p = products[sel] ?? products[0]!;
  return (
    <div className="min-h-screen bg-background text-foreground text-sm">
      {/* Header */}
      <header className="flex h-14 items-center gap-6 border-b bg-card px-6">
        <div className="flex w-56 items-center gap-2"><Building2 className="size-8 text-primary" /><span className="text-xl font-bold">İnşaatÇevrem ERP</span></div>
        <div className="relative ml-24 flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input className="h-9 w-full rounded-md border border-input bg-card pl-10 pr-3 outline-none focus:ring-2 focus:ring-ring/30" placeholder="Ürün, müşteri, cari, belge ara... (Ctrl + K)" />
        </div>
        <div className="ml-auto flex items-center gap-5">
          <Select label="Merkez Şube" />
          <div className="relative"><Bell className="size-5" /><span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-destructive text-[10px] text-destructive-foreground">3</span></div>
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-full bg-primary font-semibold text-primary-foreground">MK</div>
            <div className="leading-tight"><div className="font-semibold">Mehmet Kaya</div><div className="text-xs text-muted-foreground">Yönetici</div></div>
            <ChevronDown className="size-4" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 border-r bg-sidebar p-3 min-h-[calc(100vh-3.5rem)]">
          <div className="flex items-center gap-3 rounded-md px-3 py-2.5 font-medium"><Zap className="size-5 text-chart-5" />Hızlı İşlemler<ChevronDown className="ml-auto size-4" /></div>
          <div className="flex items-center gap-3 rounded-md bg-accent px-3 py-2.5 font-medium text-accent-foreground"><Package className="size-5" />Ürün ve Stok<ChevronUp className="ml-auto size-4" /></div>
          <div className="ml-8 mt-1 space-y-0.5">
            <div className="rounded-md bg-accent px-3 py-2 font-medium text-accent-foreground">Ürünler</div>
            {["Stok Durumu", "Stok Hareketleri", "Stok Sayımı", "Stok Uyarıları"].map((s) => <div key={s} className="rounded-md px-3 py-2 text-muted-foreground hover:bg-muted">{s}</div>)}
          </div>
          <div className="mt-3 space-y-1">
            {menu.map(({ icon: I, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-md px-3 py-3 font-medium hover:bg-muted"><I className="size-5" />{label}<ChevronDown className="ml-auto size-4" /></div>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-4 min-w-0">
          <div className="text-muted-foreground">Ürün ve Stok <ChevronRight className="inline size-3" /> <span className="text-foreground">Ürünler</span></div>
          <div className="mt-2 flex items-start gap-4">
            <Building2 className="size-10 text-primary mt-1" />
            <div><h1 className="text-2xl font-bold">Ürünler</h1><p className="text-muted-foreground">Tüm ürün kayıtlarını, varyantlarını, fiyatlarını ve stok bilgilerini yönetin.</p></div>
            <div className="ml-auto flex gap-3">
              <Btn primary><Plus className="size-4" />Yeni Ürün</Btn>
              <Btn><Upload className="size-4" />Excel'den Aktar</Btn>
              <Btn><Settings className="size-4" />Toplu İşlemler</Btn>
              <Btn><MoreHorizontal className="size-4" /></Btn>
            </div>
          </div>

          <div className="mt-4 flex gap-2 px-6">
            {["Tüm Ürünler (1.248)", "Ürün Aileleri (86)", "Toplu İşlemler", "Arşiv (42)"].map((t, i) => (
              <button key={t} onClick={() => setTab(i)} className={`rounded-t-md px-5 py-2 ${tab === i ? "border border-b-0 bg-card font-medium text-primary border-b-2" : "bg-muted text-foreground/80"}`} style={tab === i ? { borderBottomColor: "var(--primary)" } : undefined}>{t}</button>
            ))}
          </div>

          <div className="rounded-lg border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input className="h-9 w-full rounded-md border border-input pl-9 pr-3 outline-none" placeholder="Ürün, SKU, barkod veya kategori ara..." />
              </div>
              <Btn><Filter className="size-4" />Filtreler</Btn>
              <Select label="Kategori" /><Select label="Marka" /><Select label="Durum" />
              <MoreVertical className="size-4 text-muted-foreground" />
              <div className="ml-auto flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-2"><ArrowDownUp className="size-4" />Sırala: Varsayılan<ChevronDown className="size-4" /></button>
                <Heart className="mx-2 size-4 text-muted-foreground" />
                <button className="grid size-9 place-items-center rounded-md bg-accent text-primary"><LayoutList className="size-4" /></button>
                <button className="grid size-9 place-items-center rounded-md text-muted-foreground"><LayoutGrid className="size-4" /></button>
              </div>
            </div>

            <div className="mt-3 flex gap-3">
              {/* Table */}
              <div className="flex-[1.15] min-w-0">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b text-left font-semibold">
                      <th className="w-8 p-2"><input type="checkbox" /></th><th className="p-2">Ürün</th><th className="p-2">SKU / Barkod</th><th className="p-2">Kategori</th><th className="p-2">Stok</th><th className="p-2">Satış Fiyatı</th><th className="p-2">Durum</th><th className="p-2"><MoreVertical className="size-4" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((r, i) => (
                      <tr key={r.sku} onClick={() => setSel(i)} className={`cursor-pointer border-b ${sel === i ? "bg-accent/60" : "hover:bg-muted"}`}>
                        <td className="p-2"><input type="checkbox" checked={sel === i} readOnly className="accent-primary" /></td>
                        <td className="p-2"><div className="flex items-center gap-2"><div className={`size-8 rounded ${r.tone}`} /><div><div className="font-medium">{r.name}</div><div className="text-muted-foreground">{r.sub}</div></div></div></td>
                        <td className="p-2"><div>{r.sku}</div><div className="text-muted-foreground">{r.bc}</div></td>
                        <td className="p-2 text-muted-foreground">{r.cat}</td>
                        <td className="p-2"><div className={r.status === "Kritik" ? "text-destructive" : ""}>{r.stock} {r.unit}</div><div className="mt-1 h-1 w-12 rounded bg-muted"><div className={`h-1 rounded ${r.status === "Kritik" ? "bg-destructive" : "bg-success"}`} style={{ width: `${r.pct}%` }} /></div></td>
                        <td className="p-2 text-center"><div>{r.price}</div><div className="text-muted-foreground">{r.unit}</div></td>
                        <td className="p-2"><span className={`rounded px-2 py-1 ${r.status === "Kritik" ? "bg-danger-soft text-destructive" : "bg-success-soft text-success-foreground"}`}>{r.status}</span></td>
                        <td className="p-2"><MoreVertical className="size-4" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex items-center justify-between px-2 text-muted-foreground">
                  <span>1.248 kayıttan 1-10 arası gösteriliyor</span>
                  <div className="flex gap-1">
                    <button className="grid size-7 place-items-center rounded border"><ChevronLeft className="size-3" /></button>
                    {["1", "2", "3", "4", "5", "…", "125"].map((n) => <button key={n} className={`grid h-7 min-w-7 place-items-center rounded px-1.5 text-xs ${n === "1" ? "bg-primary text-primary-foreground" : n === "…" ? "" : "border text-foreground"}`}>{n}</button>)}
                    <button className="grid size-7 place-items-center rounded border"><ChevronRight className="size-3" /></button>
                  </div>
                </div>
              </div>

              {/* Detail */}
              <div className="flex-1 min-w-0 rounded-lg border p-4">
                <div className="flex gap-4">
                  <div className={`size-16 rounded-md border ${p.tone}`} />
                  <div className="flex-1">
                    <h2 className="text-lg font-bold">{p.name}</h2>
                    <div className="text-muted-foreground">{p.sub}</div>
                    <div className="mt-1 flex gap-2 text-xs">
                      <span className="rounded bg-success-soft px-2 py-0.5 text-success-foreground">{p.status}</span>
                      <span className="rounded bg-accent px-2 py-0.5 text-accent-foreground">Stoklu Ürün</span>
                      <span className="rounded bg-violet-soft px-2 py-0.5 text-violet-foreground">Varyantlı</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <MoreVertical className="size-4 text-muted-foreground" />
                    <div className="flex gap-2"><Btn><Pencil className="size-4 text-primary" /><span className="text-primary">Düzenle</span></Btn><Btn><Copy className="size-4" />Kopyala</Btn></div>
                  </div>
                </div>
                <div className="mt-4 flex gap-1 border-b text-xs">
                  {["Genel", "Varyantlar (12)", "Birimler", "Fiyatlar", "Stok", "Tedarikçiler", "Geçmiş"].map((t, i) => (
                    <button key={t} onClick={() => setDTab(i)} className={`px-3 py-2 -mb-px ${dTab === i ? "border-b-2 border-primary font-semibold text-primary" : "text-foreground/80"}`}>{t}</button>
                  ))}
                </div>
                {dTab === 1 ? <VariantMatrix /> : (<>
                <div className="mt-3 flex gap-4 text-xs">
                  <div className="flex-[1.6]">
                    <div className="mb-2 font-semibold text-sm">Temel Bilgiler</div>
                    {[["SKU", p.sku], ["Barkod", p.bc], ["Kategori", p.cat], ["Marka", "ABC Seramik"], ["Model", "Classic"], ["Renk", "Beyaz"], ["Yüzey", "Parlak"], ["Ebat", "60 × 60 cm"], ["Kalınlık", "10 mm"], ["Ağırlık", "18 kg/m²"]].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-2 border-b py-1"><span className="text-muted-foreground">{k}</span><span>{v}</span></div>
                    ))}
                    <div className="mt-3 font-semibold text-sm">Açıklama</div>
                    <p className="mt-1 text-muted-foreground">İç ve dış mekanlarda kullanılabilen, yüksek dayanımlı porselen seramik. Modern ve şık görünümü ile tüm yaşam alanları için uygundur.</p>
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 font-semibold text-sm">Görsel</div>
                    <div className={`h-28 rounded-md ${p.tone}`} />
                    <div className="mt-2 grid grid-cols-4 gap-1.5">
                      <div className="h-8 rounded border-2 border-primary bg-muted" /><div className="h-8 rounded bg-muted-foreground/40" /><div className="h-8 rounded bg-foreground/80" />
                      <div className="grid h-8 place-items-center rounded bg-foreground/50 text-primary-foreground">+2</div>
                    </div>
                    <div className="mt-4 font-semibold text-sm">Stok Özeti</div>
                    {[["Mevcut Stok", "240 m²"], ["Rezerve", "25 m²"], ["Kullanılabilir", "215 m²"], ["Yoldaki", "0 m²"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between py-0.5"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
                    ))}
                    <a className="mt-1 inline-flex items-center gap-1 font-medium text-primary">Stok Detayını Gör <ArrowRight className="size-3" /></a>
                  </div>
                </div>
                <div className="mt-3 font-semibold">Hızlı İşlemler</div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <button className="inline-flex h-8 items-center gap-2 rounded-md bg-success px-4 text-primary-foreground"><ShoppingCart className="size-4" />Satış Yap</button>
                  <button className="inline-flex h-8 items-center gap-2 rounded-md bg-accent px-3 text-accent-foreground"><Tag className="size-4" />Fiyat Güncelle</button>
                  <button className="inline-flex h-8 items-center gap-2 rounded-md border px-3"><ArrowLeftRight className="size-4" />Stok Hareketi</button>
                  <button className="inline-flex h-8 items-center gap-2 rounded-md border px-3"><Copy className="size-4" />Ürünü Kopyala</button>
                </div>
                </>)}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
