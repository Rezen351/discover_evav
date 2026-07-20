"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronRightIcon, MapPinIcon, SunIcon, SparklesIcon, ArrowsPointingOutIcon, XMarkIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Map, { Marker, type MapRef } from "react-map-gl/maplibre";
import type { Map as MaplibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useSpotlight } from "@/hooks/useSpotlight";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const locations = [
  {
    id: "bair",
    region: "KEI KECIL",
    title: "Pulau Bair",
    subtitle: "Raja Ampat-nya Maluku Tenggara",
    description: "Nikmati sensasi menyusuri lorong tebing karang laut dengan air sebening kaca.",
    image: "/images/eksplorasi/snorkeling-ngurtavur-zanzztoy.jpg",
    longitude: 132.6565,
    latitude: -5.5891,
    stats: [
      { label: "Keunikan", value: "Tebing karang menjulang tinggi & lorong air", icon: <MapPinIcon className="w-5 h-5" /> },
      { label: "Budaya", value: "Wilayah sasi laut yang dijaga kearifan lokal", icon: <SparklesIcon className="w-5 h-5" /> },
      { label: "Pengalaman", value: "Berenang dan kayak di laguna tersembunyi", icon: <SunIcon className="w-5 h-5" /> }
    ]
  },
  {
    id: "ngurbloat",
    region: "KEI KECIL",
    title: "Pantai Ngurbloat",
    subtitle: "Pasir Putih Terhalus di Dunia",
    description: "Bersantai di atas hamparan pasir putih sehalus tepung sepanjang 3 kilometer sambil menikmati keajaiban matahari terbenam.",
    image: "/images/eksplorasi/pantai-pasir-panjang-ilhamarch.jpg",
    longitude: 132.6362,
    latitude: -5.6625,
    stats: [
      { label: "Keunikan", value: "Pasir pantai paling halus di dunia versi NatGeo", icon: <SunIcon className="w-5 h-5" /> },
      { label: "Budaya", value: "Pusat perayaan festival pesona meti Kei", icon: <MapPinIcon className="w-5 h-5" /> },
      { label: "Pengalaman", value: "Menikmati pisang goreng Enbal di pinggir pantai", icon: <SparklesIcon className="w-5 h-5" /> }
    ]
  },
  {
    id: "hawang",
    region: "KEI KECIL",
    title: "Goa Hawang",
    subtitle: "Kolam Biru Mata Air Suci",
    description: "Berenang di dalam goa karst alami dengan air tawar yang sangat jernih dan menyegarkan tubuh.",
    image: "/images/eksplorasi/goa-hawang.jpg",
    longitude: 132.6781,
    latitude: -5.7197,
    stats: [
      { label: "Keunikan", value: "Mata air tawar jernih terhubung laut bawah tanah", icon: <SparklesIcon className="w-5 h-5" /> },
      { label: "Budaya", value: "Legenda batu kutukan anjing dan pemburu", icon: <MapPinIcon className="w-5 h-5" /> },
      { label: "Pengalaman", value: "Sensasi menyelam di kolam biru kristal", icon: <SunIcon className="w-5 h-5" /> }
    ]
  },
  {
    id: "ngurtavur",
    region: "KEI KECIL",
    title: "Pantai Ngurtavur",
    subtitle: "Pasir Timbul Membelah Lautan",
    description: "Berjalan sejauh 2 kilometer di atas pasir putih yang membelah samudra jernih menuju habitat burung Pelikan.",
    image: "/images/eksplorasi/kei_ngurtavur.png",
    longitude: 132.5510,
    latitude: -5.7483,
    stats: [
      { label: "Keunikan", value: "Hamparan pasir putih meliuk 2km di tengah laut", icon: <MapPinIcon className="w-5 h-5" /> },
      { label: "Budaya", value: "Kawasan alam yang dijaga dan dilindungi warga lokal", icon: <SparklesIcon className="w-5 h-5" /> },
      { label: "Pengalaman", value: "Berjumpa langsung dengan migrasi burung Pelikan", icon: <SunIcon className="w-5 h-5" /> }
    ]
  },
  {
    id: "ngilngof",
    region: "KEI KECIL",
    title: "Kampung Ngilngof",
    subtitle: "Pusat Ekowisata & Adat",
    description: "Desa wisata tertua yang menjadi pusat pelestarian budaya Evav dan gerbang utama menuju Pantai Ngurbloat.",
    image: "/images/eksplorasi/desa-wisata-ngilngof-candra-gunawan.jpg",
    longitude: 132.6431,
    latitude: -5.6740,
    stats: [
      { label: "Keunikan", value: "Desa wisata peraih penghargaan dengan tata ruang asri", icon: <SunIcon className="w-5 h-5" /> },
      { label: "Budaya", value: "Menjaga kelestarian ritual leluhur dan hukum Larvul Ngabal", icon: <MapPinIcon className="w-5 h-5" /> },
      { label: "Pengalaman", value: "Menyusuri keramahan warga lokal di sepanjang jalan ohoi", icon: <SparklesIcon className="w-5 h-5" /> }
    ]
  }
];

export default function JourneyMapSection() {
  const [activeId, setActiveId] = useState(locations[0].id);
  const [cardOpen, setCardOpen] = useState(false);
  const [cardOverlay, setCardOverlay] = useState(true);
  const activeLoc = locations.find(l => l.id === activeId) || locations[0];

  const containerRef = useRef<HTMLElement>(null);
  const mapRef = useRef<MapRef>(null);
  const panelParallaxRef = useRef<HTMLDivElement>(null);

  // Calculate bounding box for all locations
  const minLng = Math.min(...locations.map(l => l.longitude));
  const minLat = Math.min(...locations.map(l => l.latitude));
  const maxLng = Math.max(...locations.map(l => l.longitude));
  const maxLat = Math.max(...locations.map(l => l.latitude));
  const initialBounds: [number, number, number, number] = [minLng, minLat, maxLng, maxLat];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        }
      });

      tl.from(".journey-fade", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced && panelParallaxRef.current) {
        gsap.to(panelParallaxRef.current, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // True bila peta menempati lebar penuh (tanpa card di sisi kanan):
  // di mobile/tablet (<lg) card menutupi sebagian, atau saat card ditutup.
  // Saat peta penuh, titik fokus marker harus DI TENGAH layar.
  const isMapFullscreen = (): boolean => {
    if (typeof window === "undefined") return false;
    return !cardOpen || window.innerWidth < 1024;
  };

  // Offset agar titik fokus muncul di sisi KIRI peta (area yang tidak tertutup frame kanan).
  // Offset x negatif menggeser center ke kiri sehingga marker aktif tampak berada di kiri layar.
  // Bila peta penuh (mobile / card tertutup), offset = [0,0] agar marker tepat di tengah.
  const getFocusOffset = (): [number, number] => {
    if (isMapFullscreen()) {
      // Peta penuh (mobile / card tertutup): titik fokus sedikit di bawah tengah
      const y = Math.min(window.innerHeight * 0.1, 90);
      return [0, y];
    }
    // Geser center ke kiri (marker tampak lebih ke kiri) dan ke bawah
    const x = -Math.min(window.innerWidth * 0.3, 460);
    const y = Math.min(window.innerHeight * 0.12, 110);
    return [x, y];
  };

  // Padding untuk fitBounds: beri ruang besar di KANAN (area tertutup frame) agar
  // semua titik tetap terkumpul di sisi KIRI peta, konsisten dengan fokus flyTo.
  // Bila peta penuh, gunakan padding simetris agar titik terpusat di tengah.
  const getFitPadding = () => {
    if (isMapFullscreen()) {
      return { top: 120, bottom: 100, left: 40, right: 40 };
    }
    if (typeof window === "undefined") {
      return { top: 120, bottom: 100, left: 40, right: 320 };
    }
    const w = window.innerWidth;
    // Beri ruang di KANAN (area tertutup frame) agar titik terkumpul di kiri peta.
    // Penting: padding kanan TIDAK BOLEH melebihi lebar kanvas, karena fitBounds
    // dengan padding > lebar viewport menghasilkan viewport terpakai negatif
    // (kamera degenerate / NaN) sehingga peta menjadi KOSONG/blank.
    const maxRight = Math.floor(w * 0.45);
    const right = Math.max(120, Math.min(w * 0.4, maxRight));
    const left = Math.min(48, Math.floor(w * 0.04));
    // Jaga agar total horizontal padding selalu lebih kecil dari lebar kanvas.
    const safeRight = left + right >= w ? Math.max(0, w - left - 40) : right;
    return { top: 120, bottom: 100, left, right: safeRight };
  };

  // Saat card dibuka/ditutup, sesuaikan fokus peta (tengah di mobile / kiri di desktop).
  useEffect(() => {
    if (!mapRef.current) return;
    const t = window.setTimeout(() => {
      try {
        mapRef.current?.fitBounds(initialBounds, { padding: getFitPadding(), duration: 600, pitch: 45, bearing: 15 });
      } catch {
        /* no-op */
      }
    }, 50);
    return () => window.clearTimeout(t);
  }, [cardOpen]);
  const handleMarkerClick = (loc: typeof locations[0], e: { originalEvent: { stopPropagation: () => void } }) => {
    e.originalEvent.stopPropagation();
    setActiveId(loc.id);
    setCardOpen(true);
    mapRef.current?.flyTo({
      center: [loc.longitude, loc.latitude],
      zoom: 12.5,
      pitch: 45,
      bearing: 15,
      offset: getFocusOffset(),
      duration: 1500
    });
  };

  const handlePillClick = (loc: typeof locations[0]) => {
    setActiveId(loc.id);
    setCardOpen(true);
    mapRef.current?.flyTo({
      center: [loc.longitude, loc.latitude],
      zoom: 12.5,
      pitch: 45,
      bearing: 15,
      offset: getFocusOffset(),
      duration: 1500
    });
  };

  const onMapLoad = (e: { target: MaplibreMap }) => {
    const map = e.target;
    const layers = map.getStyle().layers;
    if (!layers) return;
    // Di style Positron: layer "background" mengisi seluruh kanvas (jadi DARATAN/PULAU),
    // layer "water" adalah polygon LAUT yang menutupinya. Untuk membuat pulau menonjol:
    // daratan diberi putih pekat, laut diberi warna section agar menyatu dengan halaman.
    layers.forEach((layer: { id: string }) => {
      if (layer.id === "background") {
        // Daratan/pulau: putih pekat agar bentuk pulau menonjol jelas
        map.setPaintProperty(layer.id, "background-color", "#ffffff");
        map.setPaintProperty(layer.id, "background-opacity", 1);
      } else if (layer.id === "water") {
        // Laut: warna section (pink muda) agar laut menyatu dengan background halaman
        map.setPaintProperty(layer.id, "fill-color", "#FCECEF");
        map.setPaintProperty(layer.id, "fill-opacity", 0.92);
      } else if (layer.id === "water_shadow") {
        // Bayangan tepi laut: warna brand tipis agar garis pantai pulau tegas
        map.setPaintProperty(layer.id, "fill-color", "rgba(230,103,124,0.22)");
        map.setPaintProperty(layer.id, "fill-opacity", 1);
      } else {
        // Sembunyikan elemen lain untuk tampilan ultra-bersih
        map.setLayoutProperty(layer.id, "visibility", "none");
      }
    });

    // Fokus awal: tampilkan semua titik terkumpul di sisi KIRI (tidak tertutup frame kanan)
    // tanpa mengubah styling daratan/lautan.
    map.fitBounds(initialBounds, { padding: getFitPadding(), duration: 0, pitch: 45, bearing: 15 });
    // Pastikan ukuran kanvas sinkron dengan layout (cegah peta kosong akibat init saat 0px).
    requestAnimationFrame(() => {
      try {
        map.resize();
      } catch {
        /* no-op */
      }
    });
  };

  const { onMouseMove, onMouseLeave } = useSpotlight({
    radius: 250,
    from: "var(--color-accent-pink)",
    mid: "var(--color-accent-navy)",
    to: "var(--color-accent-navy)",
  });

  return (
    <section
      id="journey"
      className="relative w-full min-h-screen bg-section pt-28 pb-12 md:pt-32 md:pb-20 z-[5] flex items-center justify-center overflow-hidden snap-start snap-always"
      ref={containerRef}
    >

      {/* Map full-section background layer */}
      <div className="absolute inset-0 z-[1]">
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: activeLoc.longitude,
            latitude: activeLoc.latitude,
            zoom: 11.5,
            pitch: 45,
            bearing: 15
          }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          interactive={true}
          scrollZoom={false}
          dragPan={true}
          onLoad={onMapLoad}
          onError={(e) => {
            if (process.env.NODE_ENV !== "production") {
              console.error("[JourneyMap] maplibre error:", e?.error?.message ?? e);
            }
          }}
          style={{ width: "100%", height: "100%", background: "transparent" }}
        >
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              longitude={loc.longitude}
              latitude={loc.latitude}
              anchor="bottom"
              onClick={(e) => handleMarkerClick(loc, e)}
            >
              <div className="flex flex-col items-center cursor-pointer group">
                <div className={`mt-2 px-3 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-all duration-300 mb-1 shadow-sm ${activeId === loc.id ? 'bg-brand text-white translate-y-0 opacity-100' : 'bg-white text-black/60 opacity-80 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:bg-brand/10'}`} style={{ fontFamily: "var(--font-sans)" }}>
                  {loc.title}
                </div>
                <div className="relative flex justify-center items-center w-4 h-4">
                  <div className={`absolute w-full h-full rounded-full transition-colors duration-300 ${activeId === loc.id ? 'bg-brand' : 'bg-white group-hover:bg-brand'}`}></div>
                  <div className={`absolute w-full h-full rounded-full animate-ping opacity-75 ${activeId === loc.id ? 'bg-brand' : 'bg-white/80'}`}></div>
                  <div className="w-1.5 h-1.5 bg-brand rounded-full z-10"></div>
                </div>
              </div>
            </Marker>
          ))}
        </Map>
      </div>

      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-4 md:px-8 w-full flex flex-col gap-6 md:gap-8 relative z-10 pointer-events-none self-start lg:self-start">

        {/* ROW 1: Header (Title left, Selector tabs right) */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 w-full fade-up-item pb-4 pointer-events-auto">
          <div className="flex-none">
            <span className="text-brand text-xs font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-sans)" }}>
              PETA PENJELAJAHAN KEI
            </span>
            <h2 className="text-4xl md:text-5xl text-black font-normal mt-1" style={{ fontFamily: "var(--font-serif)" }}>
              Rencanakan Perjalanan Anda
            </h2>
          </div>

          <div className="hidden lg:block w-full lg:w-auto overflow-hidden pb-1">
            <div className="flex flex-wrap gap-2 md:gap-3 justify-start pb-1">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => handlePillClick(loc)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs md:text-sm font-medium shadow-sm transition-all duration-300 ${activeId === loc.id
                    ? "bg-nav-gradient text-brand border border-brand/100"
                    : "bg-white/60 text-black/70 hover:bg-brand/15 hover:text-brand"
                    }`}
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {loc.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: Frame floats on the RIGHT over the full-section map; left side stays open to show the map */}
        <div className="relative flex w-full justify-end">

          {/* Fit-bounds control — icon only — Desktop only */}
          <button
            onClick={() => {
              setActiveId("");
              mapRef.current?.fitBounds(initialBounds, { padding: getFitPadding(), duration: 1500, pitch: 0, bearing: 0 });
            }}
            className="absolute left-0 top-0 z-30 bg-white/85 hover:bg-brand hover:text-white text-brand p-3 md:p-2.5 rounded-full backdrop-blur-sm transition-all group border-0 cursor-pointer shadow-md pointer-events-auto min-w-[44px] min-h-[44px] hidden lg:flex items-center justify-center"
            title="Tampilkan Semua Titik (Fit Bounds)"
            aria-label="Tampilkan Semua Titik"
          >
            <ArrowsPointingOutIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>

          {/* Right Column: di desktop floating frame kanan; di mobile jadi modal
              terpusat di atas peta (fixed + backdrop). */}
          {cardOpen && (
            <>
              {/* Backdrop (hanya mobile, menutup card saat diklik) — z di atas navbar (z-100) */}
              <div
                onClick={() => setCardOpen(false)}
                className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm lg:hidden"
                aria-hidden="true"
              />

              <div
                onClick={() => setCardOpen(false)}
                className="fixed inset-0 z-[120] flex items-center justify-center p-4 lg:static lg:inset-auto lg:z-auto lg:p-0 lg:flex lg:w-full lg:justify-end fade-up-item pointer-events-auto"
              >

                {/* Tombol tutup card — di bawah tengah card (mobile), pojok kanan-atas (desktop inline) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCardOpen(false);
                  }}
                  aria-label="Tutup info lokasi"
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white/85 hover:bg-brand hover:text-white text-brand w-9 h-9 rounded-full backdrop-blur-sm transition-all border-0 cursor-pointer shadow-md flex items-center justify-center lg:hidden"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>

                {/* Full Image Frame — headline, tag, stats & CTA all sit ON TOP of the image */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setCardOverlay((v) => !v);
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={cardOverlay ? "Sembunyikan info teks" : "Tampilkan info teks"}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setCardOverlay((v) => !v); } }}
                  className="relative w-full max-w-[420px] lg:max-w-none lg:w-[55%] xl:w-[52%] flex flex-col justify-between overflow-hidden shadow-md group border border-white rounded-lg-design min-h-[440px] lg:min-h-[500px] max-h-[85vh] overflow-y-auto cursor-pointer bg-tropical-dark"
                >
                  {/* Background image */}
                  <Image
                    src={activeLoc.image}
                    alt={activeLoc.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 animate-[zoomFadeIn_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                  />
                  {/* Readability overlay (memudar saat teks disembunyikan) */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/40 pointer-events-none transition-opacity duration-300 ${cardOverlay ? "opacity-100" : "opacity-0"}`} />

                  {/* Top: Region tag + Title/Subtitle (in front of image) */}
                  {cardOverlay && (
                    <div className="relative z-10 p-4 md:p-6">
                      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards] opacity-0" key={`tag-${activeLoc.id}`}>
                        <span className="bg-nav-gradient text-black text-[10px] md:text-xs font-bold tracking-widest px-3 py-1 rounded-xl uppercase" style={{ fontFamily: "var(--font-sans)" }}>
                          {activeLoc.region}
                        </span>
                      </div>
                      <div className="mt-3 animate-[fadeSlideUp_0.6s_ease-out_0.3s_forwards] opacity-0" key={`title-${activeLoc.id}`}>
                        <span className="text-white/90 text-xs font-bold uppercase tracking-widest drop-shadow" style={{ fontFamily: "var(--font-sans)" }}>
                          {activeLoc.subtitle}
                        </span>
                        <h3 className="text-2xl md:text-3xl text-white font-normal mt-0.5 drop-shadow-lg" style={{ fontFamily: "var(--font-sans)" }}>
                          {activeLoc.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  {/* Bottom: Stats Grid + Description & CTA (all in front of image) */}
                  {cardOverlay && (
                    <div className="relative z-10 p-4 md:p-6 pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {activeLoc.stats.map((stat, idx) => (
                          <div
                            key={idx}
                            className="backdrop-blur-[25px] rounded-2xl p-3 flex flex-col items-start shadow-sm border border-white/25 animate-[fadeSlideUp_0.6s_ease-out_forwards] opacity-0"
                            style={{
                              animationDelay: `${0.4 + (idx * 0.1)}s`,
                              background: 'linear-gradient(265deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 100%)'
                            }}
                          >
                            <div className="text-white mb-1.5 flex-none">
                              {stat.icon}
                            </div>
                            <div className="text-[10px] text-white/70 uppercase tracking-wider font-bold mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>{stat.label}</div>
                            <div className="text-xs md:text-sm text-white font-semibold leading-snug drop-shadow" style={{ fontFamily: "var(--font-sans)" }}>{stat.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Description & Button (now inside the frame, on top of image) */}
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mt-4 border-t border-white/20 pt-4 animate-[fadeSlideUp_0.6s_ease-out_0.7s_forwards] opacity-0" key={`desc-${activeLoc.id}`}>
                        <p className="text-xs md:text-sm text-white/80 font-light max-w-md leading-relaxed text-justify drop-shadow" style={{ fontFamily: "var(--font-sans)" }}>
                          {activeLoc.description}
                        </p>
                        <button
                          onMouseMove={onMouseMove}
                          onMouseLeave={onMouseLeave}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-none group/btn flex items-center gap-2 border border-white/80 hover:border-brand text-white hover:text-brand px-5 py-3 rounded-xl font-semibold text-xs transition-all duration-300 hover:scale-[1.02] active:press focus-ring cursor-pointer backdrop-blur-sm bg-white/10 hover:bg-white/20"
                        >
                          Jelajahi Tempat Ini
                          <ChevronRightIcon className="w-3.5 h-3.5 text-current transition-transform group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </>
          )}
        </div>

      </div>

      {/* Mobile Map Controls (visible on <lg, positioned relative to the section) */}
      {!cardOpen && (
        <>
          <button
            onClick={() => {
              setActiveId("");
              mapRef.current?.fitBounds(initialBounds, { padding: getFitPadding(), duration: 1500, pitch: 0, bearing: 0 });
            }}
            className="absolute left-4 bottom-4 lg:hidden z-30 bg-white/85 lg:hover:bg-brand lg:hover:text-white text-brand p-3 rounded-full backdrop-blur-sm transition-all group border-0 cursor-pointer shadow-md min-w-[44px] min-h-[44px] flex items-center justify-center"
            title="Tampilkan Semua Titik (Fit Bounds)"
            aria-label="Tampilkan Semua Titik"
          >
            <ArrowsPointingOutIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>

          {/* Zona scroll transparan di bagian bawah untuk mempermudah scroll halaman di mobile */}
          <div
            className="absolute bottom-0 left-20 right-20 h-24 lg:hidden z-10 bg-transparent pointer-events-auto"
            aria-hidden="true"
          />
        </>
      )}
    </section>
  );
}
