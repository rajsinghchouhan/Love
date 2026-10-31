/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  Lock,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { HeroSection, Navbar } from './components/NavbarAndHero';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { SharedTrackerSection } from './components/SharedTrackerSection';
import {
  CtaBannerSection,
  FaqSection,
  FooterAndStickyBar,
  HowItWorksSection,
  SocialProofSection,
  TestimonialsSection,
  WhatsInsideSection,
  WhoShouldReadSection,
  WhyThisEbookSection,
} from './components/ContentSections';

export default function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet'>(
    'upi'
  );
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOpenCheckout = () => {
    setOrderSuccess(false);
    setCheckoutOpen(true);
  };

  const handleCompletePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#08050B] text-[#FDF8FF] selection:bg-[#FF2A6D] selection:text-white">
      {/* 1. Floating Neon-Glass Studio Dock */}
      <Navbar onBuyClick={handleOpenCheckout} />

      {/* 2. Interactive Split-Stage Hero + Relationship Vibe Selector + 5-Page Shuffler */}
      <main>
        <HeroSection onBuyClick={handleOpenCheckout} />

        {/* 3. Cinema Spotlight Chapter Reader + Interactive Couple Photo Wall */}
        <PhotoGallerySection onBuyClick={handleOpenCheckout} />

        {/* 4. Shared 365 Couple Tracker Command Center */}
        <SharedTrackerSection />

        {/* 5. Mid-Page Flash Offer Banner */}
        <CtaBannerSection onBuyClick={handleOpenCheckout} variant="primary" />

        {/* 6. Why This Ebook — 4 Core Relationship Challenges */}
        <WhyThisEbookSection />

        {/* 7. What's Inside the 365 Illustrated Edition */}
        <WhatsInsideSection onBuyClick={handleOpenCheckout} />

        {/* 8. Who Should Read + How It Works + Social Proof */}
        <WhoShouldReadSection />
        <HowItWorksSection />
        <SocialProofSection />

        {/* 9. Verified Buyer Reviews */}
        <TestimonialsSection />

        {/* 10. Final Flash CTA + FAQ Accordion */}
        <CtaBannerSection onBuyClick={handleOpenCheckout} variant="final" />
        <FaqSection />
      </main>

      {/* 11. Footer & Sticky Instant Checkout Bar */}
      <FooterAndStickyBar onBuyClick={handleOpenCheckout} />

      {/* Instant ₹149 Checkout & PDF Unlock Modal */}
      {checkoutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          onClick={() => setCheckoutOpen(false)}
        >
          <div
            className="glass-panel relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 p-6 sm:p-8 shadow-[0_30px_90px_rgba(255,42,109,0.35)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="absolute top-5 right-5 rounded-xl border border-white/15 bg-white/5 p-2 text-white hover:bg-white/15"
            >
              <X className="h-4 w-4" />
            </button>

            {!orderSuccess ? (
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#FFD166]/40 bg-[#FFD166]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#FFD166]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Instant Digital Delivery · 91% OFF</span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                  Unlock 365 Hindi Intimacy Ebook
                </h3>
                <p className="mt-1 text-xs text-[#C9B8D9]">
                  100% Private Checkout · Instant PDF Link on Screen &amp;
                  WhatsApp/Email
                </p>

                <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#FF2A6D]/35 bg-[#FF2A6D]/15 p-3.5">
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/365.png"
                      alt="365 Ebook"
                      className="h-12 w-10 rounded-lg object-cover border border-white/20"
                    />
                    <div>
                      <p className="text-xs font-extrabold text-white">
                        365 Sex Poses (Hindi + English PDF)
                      </p>
                      <p className="text-[11px] text-[#FFD166]">
                        + Bonus: 23 Wild Bucket List &amp; 365 Tracker
                      </p>
                    </div>
                  </div>
                  <div className="text-right font-mono-num">
                    <span className="block text-xs text-white/45 line-through">
                      ₹1599
                    </span>
                    <span className="text-xl font-extrabold text-[#FFD166]">
                      ₹149
                    </span>
                  </div>
                </div>

                <form onSubmit={handleCompletePurchase} className="mt-5 space-y-3.5">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                      Your Name (Optional for Discreet Access)
                    </label>
                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#FF2A6D] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                        Email for PDF Link *
                      </label>
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#FF2A6D] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white focus:border-[#FF2A6D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#D5C6E6]">
                      Select Instant Payment Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'upi' as const, label: '⚡ UPI / GPay' },
                        { id: 'card' as const, label: '💳 Card' },
                        { id: 'wallet' as const, label: '🔒 NetBanking' },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => setPaymentMethod(m.id)}
                          className={`cursor-pointer rounded-xl border py-2.5 text-xs font-bold transition-all ${
                            paymentMethod === m.id
                              ? 'border-[#FF2A6D] bg-[#FF2A6D]/25 text-white'
                              : 'border-white/15 bg-white/5 text-[#B8A6C9]'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="neon-cta cursor-pointer mt-2 w-full inline-flex items-center justify-center gap-2 rounded-2xl py-4 text-sm font-extrabold uppercase tracking-wider text-white"
                  >
                    <Zap className="h-4 w-4 fill-current" />
                    <span>Pay ₹149 &amp; Unlock PDF Now</span>
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1 text-[11px] text-[#B8A6C9]">
                    <span className="flex items-center gap-1">
                      <Lock className="h-3 w-3 text-[#FFD166]" />
                      256-Bit SSL Encrypted
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-400" />
                      100% Discreet Statement
                    </span>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-4 text-center space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-white">
                  Ebook Unlocked Successfully! 🎉
                </h3>
                <p className="text-xs text-[#D5C6E6] max-w-sm mx-auto">
                  Thank you{buyerName ? `, ${buyerName}` : ''}! Your copy of{' '}
                  <strong className="text-[#FFD166]">
                    365 Sex Poses (Hindi + English Edition)
                  </strong>{' '}
                  is ready, and a backup link has been queued for{' '}
                  <span className="text-white font-semibold">
                    {buyerEmail || 'your email'}
                  </span>
                  .
                </p>

                <div className="flex flex-col gap-2.5 pt-2">
                  <a
                    href="#gallery"
                    onClick={() => setCheckoutOpen(false)}
                    className="neon-cta inline-flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs font-extrabold uppercase tracking-wider text-white"
                  >
                    <Download className="h-4 w-4" />
                    <span>Open Full Cinema Reader &amp; 365 Tracker</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
