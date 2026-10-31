import React, { useState, useEffect } from 'react';
import {
  Check,
  Sparkles,
  Flame,
  Heart,
  Menu,
  X,
  ArrowRight,
  Compass,
  Clock,
  Shuffle,
  ShieldCheck,
  Zap,
  BookOpen,
  Camera,
  Star,
} from 'lucide-react';
import { formatCountdown } from '../utils/trackerLogic';

interface NavbarProps {
  onBuyClick: () => void;
  activeViewMode?: 'all' | 'ebook' | 'gallery' | 'tracker';
  onChangeViewMode?: (mode: 'all' | 'ebook' | 'gallery' | 'tracker') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onBuyClick,
  activeViewMode = 'all',
  onChangeViewMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleModeClick = (
    mode: 'all' | 'ebook' | 'gallery' | 'tracker',
    anchor?: string
  ) => {
    if (onChangeViewMode) {
      onChangeViewMode(mode);
    }
    setMobileMenuOpen(false);
    if (anchor) {
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/15 bg-[#100918]/85 px-4 py-3 shadow-[0_16px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-6">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Brand Identity */}
          <a
            href="#"
            onClick={() => handleModeClick('all')}
            className="flex items-center gap-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF2A6D] via-[#FF5E3A] to-[#FF9F1C] shadow-[0_0_20px_rgba(255,42,109,0.5)]">
              <Flame className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  COUPLE<span className="text-[#FF2A6D]">HUB</span>
                </span>
                <span className="hidden rounded-md border border-[#FF2A6D]/40 bg-[#FF2A6D]/15 px-1.5 py-0.5 font-mono-num text-[10px] font-bold text-[#FF8DA8] sm:inline-block">
                  365 OS
                </span>
              </div>
              <p className="text-[10px] font-medium tracking-wider uppercase text-[#B8A6C9]">
                Hindi Intimacy &amp; Companion Studio
              </p>
            </div>
          </a>

          {/* Center: Interactive Studio Mode Dock */}
          <nav className="hidden lg:flex items-center gap-1 rounded-xl border border-white/10 bg-black/40 p-1">
            <button
              type="button"
              onClick={() => handleModeClick('all')}
              className={`cursor-pointer flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all ${
                activeViewMode === 'all'
                  ? 'bg-gradient-to-r from-[#FF2A6D] to-[#FF6B4A] text-white shadow-[0_0_18px_rgba(255,42,109,0.45)]'
                  : 'text-[#B8A6C9] hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              All-in-One Studio
            </button>
            <button
              type="button"
              onClick={() => handleModeClick('all', '#inside')}
              className="cursor-pointer flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-[#B8A6C9] hover:bg-white/5 hover:text-white transition-all"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#FFD166]" />
              What&apos;s Inside
            </button>
            <button
              type="button"
              onClick={() => handleModeClick('all', '#gallery')}
              className="cursor-pointer flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-[#B8A6C9] hover:bg-white/5 hover:text-white transition-all"
            >
              <Camera className="h-3.5 w-3.5 text-[#FF6B4A]" />
              Cinema Gallery
            </button>
            <button
              type="button"
              onClick={() => handleModeClick('all', '#tracker')}
              className="cursor-pointer flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold text-[#B8A6C9] hover:bg-white/5 hover:text-white transition-all"
            >
              <Compass className="h-3.5 w-3.5 text-[#FF2A6D]" />
              365 Couple Tracker
            </button>
            <a
              href="#reviews"
              className="rounded-lg px-3 py-2 text-xs font-semibold text-[#B8A6C9] hover:bg-white/5 hover:text-white transition-all"
            >
              Reviews
            </a>
          </nav>

          {/* Right: Price Flash Badge + Action CTA */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-[#FFD166]/30 bg-[#FFD166]/10 px-3 py-1.5">
              <span className="font-mono-num text-xs text-white/45 line-through">
                ₹1599
              </span>
              <span className="font-mono-num text-sm font-bold text-[#FFD166]">
                ₹149
              </span>
              <span className="rounded bg-[#FF2A6D] px-1.5 py-0.5 font-mono-num text-[10px] font-bold text-white">
                91% OFF
              </span>
            </div>

            <button
              onClick={onBuyClick}
              className="neon-cta cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold tracking-wider uppercase text-white transition-all sm:px-5"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>Get Ebook</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 p-2 text-white lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="mt-3 border-t border-white/10 pt-3 lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="#inside"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-bold text-white"
              >
                <BookOpen className="h-4 w-4 text-[#FFD166]" />
                What&apos;s Inside
              </a>
              <a
                href="#gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-bold text-white"
              >
                <Camera className="h-4 w-4 text-[#FF6B4A]" />
                Photo Gallery
              </a>
              <a
                href="#tracker"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-bold text-white"
              >
                <Compass className="h-4 w-4 text-[#FF2A6D]" />
                365 Tracker
              </a>
              <a
                href="#reviews"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-bold text-white"
              >
                <Star className="h-4 w-4 text-[#FFD166]" />
                Buyer Reviews
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

const VIBE_MODES = [
  {
    id: 'romantic',
    label: '🌹 Deep Romantic Spark',
    hindiTitle: 'भावनात्मक जुड़ाव और धीमा रोमांस',
    matchPages: 'Chapters 1–4 · 120+ Slow Eye-Contact Positions',
    tip: 'Ideal for couples wanting to break daily boredom and rediscover honeymoon-level closeness.',
    sampleDay: 'Day #14 · The Lotus Embrace (कमल आलिंगन)',
  },
  {
    id: 'pleasure',
    label: '👑 Her Complete Satisfaction',
    hindiTitle: 'महिलाओं को 100% संतुष्टि देने के रहस्य',
    matchPages: 'Chapters 5–8 · Foreplay & Climax Mastery Guide',
    tip: 'Step-by-step illustrated angles & foreplay timing designed specifically for female pleasure.',
    sampleDay: 'Day #89 · Elevated Butterfly (बटरफ्लाई आर्क)',
  },
  {
    id: 'stamina',
    label: '⚡ Stamina & Confidence',
    hindiTitle: 'लंबे समय तक टिकने और आत्मविश्वास के तरीके',
    matchPages: 'Chapters 9–11 · Pacing & Breath Control Positions',
    tip: 'Practical positions that naturally reduce physical strain and double bedroom endurance.',
    sampleDay: 'Day #142 · Pacing Mastery (स्टैमिना कंट्रोल)',
  },
  {
    id: 'wild',
    label: '🔥 23 Wild Bucket List',
    hindiTitle: '23 रोमांचक पोजीशन जो हर कपल को ट्राई करनी चाहिए',
    matchPages: 'Bonus Vault · 23 High-Thrill Bucket List Ideas',
    tip: 'Exciting weekend getaway and late-night adventure positions with easy safety & comfort tips.',
    sampleDay: 'Day #204 · Royal Throne (शाही सिंहासन — Bucket List #1)',
  },
];

const HERO_SPREADS = [
  {
    id: 'cover',
    badge: 'COVER EDITION',
    title: '365 Sex Poses — Complete Hindi + English Visual Edition',
    subtitle: 'हर दिन एक नया रोमांटिक अनुभव · 100% Illustrated',
    src: 'assets/365.png',
    tag: '365 Daily Positions',
  },
  {
    id: 'ch1',
    badge: 'SPREAD #01',
    title: 'Foreplay & Deep Emotional Connection',
    subtitle: 'रोमांस शुरू करने से पहले माहौल और भावनात्मक जुड़ाव कैसे बनाएं',
    src: 'assets/preview-1.png',
    tag: 'Foreplay Mastery',
  },
  {
    id: 'ch2',
    badge: 'SPREAD #02',
    title: 'Comfort Angles & Step-by-Step Visual Clues',
    subtitle: 'बिना किसी झिझक के आसान और आरामदायक पोज़िशन गाइड',
    src: 'assets/preview-2.png',
    tag: 'Easy & Illustrated',
  },
  {
    id: 'ch3',
    badge: 'SPREAD #03',
    title: 'Stamina & Long-Lasting Intimacy Secrets',
    subtitle: 'जल्दी थकने की समस्या से छुटकारा और पार्टनर को दोगुना आनंद',
    src: 'assets/preview-3.jpg',
    tag: 'Confidence Boost',
  },
  {
    id: 'ch4',
    badge: 'SPREAD #04',
    title: '23 Wild Bucket List Positions Vault',
    subtitle: 'अपने रिश्ते में नया रोमांच और सरप्राइज लाने के लिए 23 खास आइडिया',
    src: 'assets/preview-4.jpg',
    tag: '23 Bucket List',
  },
];

export const HeroSection: React.FC<{ onBuyClick: () => void }> = ({
  onBuyClick,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(16354);
  const [selectedVibe, setSelectedVibe] = useState(VIBE_MODES[0]);
  const [activeSpreadIdx, setActiveSpreadIdx] = useState(0);
  const [tonightCardFlipped, setTonightCardFlipped] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev <= 1 ? 16354 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { h: hours, m: minutes, s: seconds } = formatCountdown(
    secondsLeft * 1000
  );
  const activeSpread = HERO_SPREADS[activeSpreadIdx];

  const handleShuffleSpread = () => {
    const nextIdx = (activeSpreadIdx + 1) % HERO_SPREADS.length;
    setActiveSpreadIdx(nextIdx);
    setTonightCardFlipped(true);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 sm:pt-10 sm:pb-24">
      {/* Ambient Neon Spotlight Orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-[#FF2A6D]/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 right-10 h-96 w-96 rounded-full bg-[#9D4EDD]/20 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Interactive Status & Live Countdown Ribbon */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#FF2A6D]/30 bg-gradient-to-r from-[#FF2A6D]/15 via-[#170D24]/90 to-[#FF6B4A]/15 px-4 py-3 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#FF2A6D] shadow-[0_0_12px_#FF2A6D]" />
            <p className="text-xs font-bold tracking-wide text-white sm:text-sm">
              INDIA&apos;S #1 ILLUSTRATED HINDI COUPLE GUIDE{' '}
              <span className="text-[#FFD166]">
                · 10,000+ Couples Reading Tonight
              </span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#FFB3C6]">
              <Clock className="h-3.5 w-3.5 text-[#FF2A6D]" />
              Flash ₹149 Deal Ends In:
            </span>
            <div className="flex items-center gap-1.5 font-mono-num">
              <span className="rounded-lg border border-white/15 bg-black/60 px-2 py-1 text-xs font-bold text-[#FFD166]">
                {hours}h
              </span>
              <span className="text-[#FF2A6D] font-bold">:</span>
              <span className="rounded-lg border border-white/15 bg-black/60 px-2 py-1 text-xs font-bold text-[#FFD166]">
                {minutes}m
              </span>
              <span className="text-[#FF2A6D] font-bold">:</span>
              <span className="rounded-lg border border-white/15 bg-black/60 px-2 py-1 text-xs font-bold text-[#FF2A6D]">
                {seconds}s
              </span>
            </div>
          </div>
        </div>

        {/* Main 12-Column Neon-Glass Split Stage */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left 7 Columns: Bold Hindi Typography + Interactive Vibe Selector + Price Vault */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD166]/35 bg-[#FFD166]/10 px-4 py-1.5 text-xs font-bold text-[#FFD166]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>HINDI + HINGLISH DIGITAL EDITION · 365 VISUAL PAGES</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold leading-[1.14] tracking-tight text-white sm:text-6xl">
              महिलाओं को संतुष्ट करने के{' '}
              <span className="text-gradient-rose">356 सेक्स पोजीशन</span> 🥵
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#D5C6E6] sm:text-lg">
              इस गाइड में शामिल हैं{' '}
              <strong className="text-white">365 रोमांटिक पोज़िशन</strong>, जिन्हें
              सरल हिंदी + इंग्लिश भाषा और स्पष्ट चित्रों के साथ समझाया गया है। अपने
              रिश्ते में नई ऊर्जा, गहराई और रोमांच जोड़ें —{' '}
              <span className="text-[#FFD166] font-semibold">
                One new experience every night.
              </span>
            </p>

            {/* NEW Interactive "Select Your Relationship Vibe" Customizer */}
            <div className="glass-panel rounded-2xl p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-[#FFB3C6]">
                  ✨ Step 1: Tap Your Tonight&apos;s Relationship Goal
                </span>
                <span className="font-mono-num text-[11px] text-[#FFD166]">
                  Interactive Preview
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {VIBE_MODES.map((vibe) => {
                  const active = selectedVibe.id === vibe.id;
                  return (
                    <button
                      key={vibe.id}
                      type="button"
                      onClick={() => setSelectedVibe(vibe)}
                      className={`cursor-pointer rounded-xl px-3 py-2.5 text-left text-xs font-bold transition-all ${
                        active
                          ? 'border border-[#FF2A6D] bg-gradient-to-br from-[#FF2A6D]/30 to-[#FF6B4A]/20 text-white shadow-[0_0_20px_rgba(255,42,109,0.3)]'
                          : 'border border-white/10 bg-white/5 text-[#B8A6C9] hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {vibe.label}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Output Box for Selected Vibe */}
              <div className="mt-3.5 rounded-xl border border-white/10 bg-black/45 p-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-bold text-[#FFD166]">
                    {selectedVibe.hindiTitle}
                  </p>
                  <span className="rounded-md bg-[#FF2A6D]/20 px-2 py-0.5 font-mono-num text-[11px] font-semibold text-[#FF8DA8]">
                    {selectedVibe.matchPages}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#D5C6E6]">{selectedVibe.tip}</p>
                <div className="mt-2.5 flex items-center justify-between border-t border-white/10 pt-2 text-xs">
                  <span className="font-semibold text-white">
                    Featured Inside:{' '}
                    <span className="text-[#FF6B4A]">
                      {selectedVibe.sampleDay}
                    </span>
                  </span>
                  <a
                    href="#tracker"
                    className="font-bold text-[#FFD166] hover:underline"
                  >
                    Try in 365 Tracker →
                  </a>
                </div>
              </div>
            </div>

            {/* Neon Glass Pricing & Instant Checkout Vault */}
            <div className="glass-panel-rose rounded-3xl p-5 sm:p-6">
              <div className="grid grid-cols-3 gap-3 border-b border-white/10 pb-4">
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#B8A6C9]">
                    Regular Price
                  </span>
                  <span className="font-mono-num text-xl font-bold text-white/40 line-through sm:text-2xl">
                    ₹1599
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#FFD166]">
                    Flash Offer
                  </span>
                  <span className="font-mono-num text-3xl font-extrabold text-white sm:text-4xl">
                    ₹149
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#FF8DA8]">
                    Instant Discount
                  </span>
                  <span className="inline-block mt-1 rounded-lg bg-[#FF2A6D] px-2.5 py-1 font-mono-num text-xs font-extrabold text-white sm:text-sm">
                    SAVE 91%
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={onBuyClick}
                  className="neon-cta cursor-pointer flex-1 inline-flex items-center justify-center gap-2.5 rounded-2xl px-6 py-4 text-sm font-extrabold tracking-wider uppercase text-white transition-all sm:text-base"
                >
                  <Zap className="h-5 w-5 fill-current" />
                  <span>UNLOCK FULL 365 EBOOK — ₹149</span>
                  <ArrowRight className="h-5 w-5" />
                </button>

                <a
                  href="#tracker"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-xs font-bold tracking-wider uppercase text-white hover:bg-white/15 transition-all"
                >
                  <Compass className="h-4 w-4 text-[#FFD166]" />
                  <span>Launch 365 Studio</span>
                </a>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 pt-1 sm:grid-cols-4">
                {[
                  '100% Discreet & Private',
                  'Instant PDF Delivery',
                  'Lifetime Updates',
                  'Works on All Phones',
                ].map((perk) => (
                  <div
                    key={perk}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#E2D4F0]"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#FFD166]" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Interactive 3D Book Stage & "Shuffle Tonight's Spread" Deck */}
          <div className="lg:col-span-5">
            <div className="glass-panel relative rounded-3xl p-5 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.75)]">
              {/* Top Bar of Book Stage */}
              <div className="mb-4 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF2A6D]">
                    ● LIVE INTERACTIVE LOOKBOOK
                  </span>
                  <h2 className="text-sm font-bold text-white">
                    Tap Any Spread or Shuffle Tonight&apos;s Page
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={handleShuffleSpread}
                  className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-[#FFD166]/40 bg-[#FFD166]/15 px-3 py-2 text-xs font-bold text-[#FFD166] hover:bg-[#FFD166]/25 transition-all"
                >
                  <Shuffle className="h-3.5 w-3.5" />
                  Shuffle Page
                </button>
              </div>

              {/* 5-Page Selector Pills */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {HERO_SPREADS.map((spread, idx) => (
                  <button
                    key={spread.id}
                    type="button"
                    onClick={() => setActiveSpreadIdx(idx)}
                    className={`cursor-pointer rounded-lg px-2.5 py-1.5 font-mono-num text-[11px] font-bold transition-all ${
                      activeSpreadIdx === idx
                        ? 'bg-[#FF2A6D] text-white shadow-[0_0_14px_rgba(255,42,109,0.5)]'
                        : 'bg-white/5 text-[#B8A6C9] hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {idx === 0 ? 'Cover' : `Page 0${idx}`}
                  </button>
                ))}
              </div>

              {/* Center Visual Artwork Frame */}
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-b from-[#1D102B] to-[#09050E] p-4">
                <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                  <span className="rounded-lg bg-black/80 px-2.5 py-1 font-mono-num text-[10px] font-bold uppercase tracking-wider text-[#FFD166] backdrop-blur-md border border-white/10">
                    {activeSpread.badge}
                  </span>
                  {tonightCardFlipped && (
                    <span className="rounded-lg bg-[#FF2A6D] px-2.5 py-1 text-[10px] font-bold text-white">
                      ✨ Shuffled Pick
                    </span>
                  )}
                </div>

                <div className="flex min-h-[340px] items-center justify-center py-2">
                  <img
                    src={activeSpread.src}
                    alt={activeSpread.title}
                    className="float-book max-h-[330px] w-auto rounded-xl object-contain shadow-[0_25px_55px_rgba(0,0,0,0.85)] border border-white/15"
                  />
                </div>

                {/* Caption Overlay Card */}
                <div className="mt-3 rounded-xl border border-white/10 bg-black/65 p-3.5 backdrop-blur-md">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF8DA8]">
                      {activeSpread.tag}
                    </span>
                    <span className="font-mono-num text-[11px] text-[#FFD166]">
                      Spread {activeSpreadIdx + 1} / {HERO_SPREADS.length}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-white">
                    {activeSpread.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#C9B8D9]">
                    {activeSpread.subtitle}
                  </p>
                </div>
              </div>

              {/* Bottom Quick Stats Strip inside Book Stage */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <span className="block font-mono-num text-base font-extrabold text-[#FFD166]">
                    365
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#B8A6C9]">
                    Illustrated Days
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <span className="block font-mono-num text-base font-extrabold text-[#FF2A6D]">
                    23
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#B8A6C9]">
                    Wild Bucket List
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
                  <span className="block font-mono-num text-base font-extrabold text-emerald-400">
                    4.9★
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#B8A6C9]">
                    Couple Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
