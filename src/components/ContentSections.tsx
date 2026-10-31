import React, { useState } from 'react';
import {
  Check,
  Star,
  ChevronDown,
  Zap,
  X,
  FileText,
  Mail,
  ArrowRight,
  Flame,
} from 'lucide-react';
import {
  PROBLEM_QUESTIONS,
  WHATS_INSIDE_ITEMS,
  WHO_SHOULD_READ,
  HOW_IT_WORKS_STEPS,
  TESTIMONIALS,
  FAQ_ITEMS,
} from '../data/coupleHubData';

export const CtaBannerSection: React.FC<{
  onBuyClick: () => void;
  variant?: 'primary' | 'final';
}> = ({ onBuyClick, variant = 'primary' }) => {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel-rose relative overflow-hidden rounded-3xl p-8 sm:p-12 shadow-[0_25px_70px_rgba(255,42,109,0.22)]">
          <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-[#FF2A6D]/25 blur-[90px]" />

          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD166]/40 bg-[#FFD166]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FFD166]">
                <Flame className="h-3.5 w-3.5" />
                <span>
                  {variant === 'final'
                    ? 'FINAL FLASH OFFER · 91% INSTANT DISCOUNT'
                    : 'INSTANT DIGITAL ACCESS · 100% PRIVATE'}
                </span>
              </div>

              <h2 className="mt-3 font-display text-2xl font-extrabold text-white sm:text-4xl">
                {variant === 'final'
                  ? 'आज ही अपने रिश्ते में नया रोमांच और गहराई जोड़ें ❤️'
                  : 'Ready to Unlock All 365 Illustrated Positions Tonight?'}
              </h2>
              <p className="mt-2 text-sm text-[#E2D4F0] sm:text-base">
                सरल हिंदी + इंग्लिश गाइड, स्पष्ट चित्र, 23 Wild Bucket List आइडिया और
                लाइफटाइम पीडीएफ एक्सेस — सिर्फ{' '}
                <strong className="text-[#FFD166]">₹149</strong> (मूल कीमत ₹1599)।
              </p>
            </div>

            <div className="flex flex-col items-stretch sm:items-end gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={onBuyClick}
                className="neon-cta cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-extrabold uppercase tracking-wider text-white"
              >
                <Zap className="h-5 w-5 fill-current" />
                <span>GET INSTANT ACCESS — ₹149</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <span className="text-center text-[11px] font-medium text-[#C9B8D9]">
                🔒 100% Discreet Billing · Instant PDF Download on Mobile
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyThisEbookSection: React.FC = () => {
  const emojis = ['🔁', '💭', '✨', '🤫'];
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block rounded-full border border-[#FF2A6D]/40 bg-[#FF2A6D]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FF8DA8]">
            THE REAL PROBLEM IN INDIAN RELATIONSHIPS
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-5xl">
            यह ई-बुक हर कपल के लिए{' '}
            <span className="text-gradient-rose">क्यों ज़रूरी है?</span>
          </h2>
          <p className="mt-3 text-sm text-[#C9B8D9] sm:text-base">
            अक्सर कपल्स एक-दूसरे से प्यार तो करते हैं, लेकिन सही जानकारी और झिझक के
            कारण अपने रिश्ते का पूरा आनंद नहीं ले पाते।
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEM_QUESTIONS.map((question, index) => (
            <div
              key={index}
              className="glass-panel group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF2A6D]/50"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono-num text-3xl font-extrabold text-[#FF2A6D]/80">
                  0{index + 1}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-xl">
                  {emojis[index % emojis.length]}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-white leading-snug">
                {question}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[#B8A6C9]">
                इस 365 गाइड में आपको बिना किसी झिझक के रोज़ एक नया और आसान तरीका
                मिलेगा।
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhatsInsideSection: React.FC<{ onBuyClick: () => void }> = ({
  onBuyClick,
}) => {
  const icons = ['🔥', '⚡', '👑', '📱'];
  return (
    <section
      id="inside"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left 5 Cols: Book Showcase */}
          <div className="lg:col-span-5">
            <div className="glass-panel relative overflow-hidden rounded-3xl p-6 text-center">
              <span className="inline-block rounded-full bg-[#FFD166]/20 px-3 py-1 font-mono-num text-[11px] font-bold text-[#FFD166]">
                COMPLETE 2026 DIGITAL EDITION
              </span>
              <div className="my-6 flex justify-center">
                <img
                  src="assets/365.png"
                  alt="365 Sex Poses Hindi Ebook"
                  className="float-book max-h-[340px] w-auto rounded-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="rounded-xl border border-white/10 bg-black/45 p-3">
                  <span className="font-mono-num text-lg font-extrabold text-[#FFD166]">
                    365+
                  </span>
                  <p className="text-xs text-[#C9B8D9]">
                    Visual Illustrated Poses
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/45 p-3">
                  <span className="font-mono-num text-lg font-extrabold text-[#FF2A6D]">
                    Hindi + Eng
                  </span>
                  <p className="text-xs text-[#C9B8D9]">
                    Easy Bilingual Explanations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Feature Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block rounded-full border border-[#FFD166]/40 bg-[#FFD166]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FFD166]">
              INSIDE THE 365 MONOGRAPH
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl">
              इस गाइड के अंदर आपको{' '}
              <span className="text-gradient-gold">क्या-क्या मिलेगा?</span>
            </h2>
            <p className="text-sm text-[#C9B8D9] sm:text-base">
              हर पोज़िशन को इस तरह डिज़ाइन किया गया है कि नए और अनुभवी दोनों कपल्स
              आसानी से समझ सकें और अपने रिश्ते में तुरंत बदलाव महसूस करें।
            </p>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {WHATS_INSIDE_ITEMS.map((itemText, idx) => (
                <div
                  key={idx}
                  className="glass-panel flex items-start gap-3.5 rounded-2xl p-4"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FF2A6D]/20 text-lg">
                    {icons[idx % icons.length]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-relaxed">
                      {itemText}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onBuyClick}
                className="neon-cta cursor-pointer inline-flex items-center gap-2.5 rounded-2xl px-7 py-4 text-sm font-extrabold uppercase tracking-wider text-white"
              >
                <Zap className="h-4 w-4 fill-current" />
                <span>Download Complete Edition — ₹149</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhoShouldReadSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="mx-auto max-w-6xl">
        <div className="glass-panel rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF8DA8]">
              DESIGNED FOR EVERY COUPLE
            </span>
            <h2 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-4xl">
              यह गाइड किन कपल्स के लिए सबसे बेस्ट है?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {WHO_SHOULD_READ.map((group, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-black/45 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{group.emoji}</span>
                  <h3 className="font-display text-lg font-bold text-[#FFD166]">
                    {group.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {group.lines.map((line, lIdx) => (
                    <div key={lIdx} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
                      <p className="text-xs sm:text-sm text-[#E2D4F0] leading-relaxed">
                        {line}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FFD166]">
            INSTANT 3-STEP DELIVERY
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
            ई-बुक कैसे डाउनलोड करें?
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="glass-panel relative rounded-3xl p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF2A6D] to-[#FF6B4A] font-mono-num text-lg font-extrabold text-white shadow-[0_0_20px_rgba(255,42,109,0.5)]">
                0{idx + 1}
              </div>
              <h3 className="font-display text-lg font-bold text-white">
                {step.emoji} {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#D5C6E6]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const SocialProofSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: '10,000+', label: 'Happy Indian Couples' },
            { value: '4.9 / 5', label: 'Average Reader Rating' },
            { value: '365', label: 'Illustrated Positions' },
            { value: '100%', label: 'Private & Discreet PDF' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass-panel rounded-2xl p-5 text-center"
            >
              <span className="block font-mono-num text-2xl font-extrabold text-[#FFD166] sm:text-3xl">
                {stat.value}
              </span>
              <span className="mt-1 block text-xs font-semibold text-[#C9B8D9]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TestimonialsSection: React.FC = () => {
  return (
    <section
      id="reviews"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block rounded-full border border-[#FFD166]/40 bg-[#FFD166]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FFD166]">
            VERIFIED READER REVIEWS
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-5xl">
            10,000+ कपल्स का{' '}
            <span className="text-gradient-rose">भरोसा और अनुभव</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((review, index) => (
            <div
              key={index}
              className="glass-panel flex flex-col justify-between rounded-3xl p-6"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-[#FFD166] text-[#FFD166]"
                      />
                    ))}
                  </div>
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    ✓ Verified Buyer
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[#E2D4F0]">
                  &ldquo;{review.review}&rdquo;
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF2A6D]/25 font-mono-num text-[10px] font-bold text-[#FF8DA8]">
                    {review.initials}
                  </span>
                  <span className="font-bold text-white">{review.name}</span>
                </div>
                <span className="text-[#B8A6C9]">{review.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF8DA8]">
            GOT QUESTIONS? WE HAVE ANSWERS
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
            अक्सर पूछे जाने वाले सवाल (FAQ)
          </h2>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="glass-panel overflow-hidden rounded-2xl border border-white/15"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="cursor-pointer flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className="text-sm font-bold text-white sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#FFD166] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/10 px-6 py-4 text-xs leading-relaxed text-[#D5C6E6] sm:text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const FooterAndStickyBar: React.FC<{ onBuyClick: () => void }> = ({
  onBuyClick,
}) => {
  const [modalDoc, setModalDoc] = useState<
    'privacy' | 'terms' | 'refund' | 'contact' | null
  >(null);

  return (
    <>
      <footer className="border-t border-white/10 bg-[#050308] pt-14 pb-28 text-xs text-[#B8A6C9]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF2A6D] text-white">
                  <Flame className="h-4 w-4" />
                </div>
                <span className="font-display text-lg font-extrabold text-white">
                  COUPLE<span className="text-[#FF2A6D]">HUB</span>
                </span>
              </div>
              <p className="mt-2 max-w-md text-xs text-[#9C89B0]">
                Educational intimacy &amp; relationship wellness resource for
                consenting adults (18+). 100% private digital delivery.
              </p>
            </div>

            <div className="flex flex-wrap gap-5 font-semibold text-white">
              <button
                type="button"
                onClick={() => setModalDoc('privacy')}
                className="cursor-pointer hover:text-[#FFD166]"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setModalDoc('terms')}
                className="cursor-pointer hover:text-[#FFD166]"
              >
                Terms &amp; Conditions
              </button>
              <button
                type="button"
                onClick={() => setModalDoc('refund')}
                className="cursor-pointer hover:text-[#FFD166]"
              >
                Refund Policy
              </button>
              <button
                type="button"
                onClick={() => setModalDoc('contact')}
                className="cursor-pointer hover:text-[#FFD166]"
              >
                Support
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#7D6B91]">
            <p>© 2026 Couple Hub Digital Studio. All rights reserved.</p>
            <p>100% Discreet Checkout · Instant PDF Download</p>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Glass Bar */}
      <div className="fixed right-0 bottom-0 left-0 z-40 border-t border-white/15 bg-[#0E0716]/90 px-4 py-3 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="assets/365.png"
              alt="365 Ebook"
              className="hidden h-11 w-9 rounded-lg object-cover sm:block border border-white/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-white sm:text-sm">
                  365 Hindi Intimacy Guide
                </span>
                <span className="rounded bg-[#FF2A6D] px-1.5 py-0.5 font-mono-num text-[10px] font-extrabold text-white">
                  91% OFF
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono-num text-xs text-white/40 line-through">
                  ₹1599
                </span>
                <span className="font-mono-num text-sm font-extrabold text-[#FFD166]">
                  ₹149 Only
                </span>
                <span className="hidden text-[11px] text-[#B8A6C9] sm:inline">
                  · Instant PDF + 365 Tracker
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onBuyClick}
            className="neon-cta cursor-pointer inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white sm:px-7 sm:py-3"
          >
            <Zap className="h-4 w-4 fill-current" />
            <span>Download Now — ₹149</span>
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      {modalDoc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          onClick={() => setModalDoc(null)}
        >
          <div
            className="glass-panel w-full max-w-lg rounded-3xl border border-white/20 p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                {modalDoc === 'contact' ? (
                  <Mail className="h-5 w-5 text-[#FF2A6D]" />
                ) : (
                  <FileText className="h-5 w-5 text-[#FFD166]" />
                )}
                <h3 className="font-display text-lg font-bold text-white uppercase">
                  {modalDoc} Info
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalDoc(null)}
                className="rounded-lg bg-white/10 p-1.5 text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-[#D5C6E6]">
              {modalDoc === 'privacy' && (
                <p>
                  Your privacy is 100% protected. Billing statements show a
                  neutral merchant name and all tracker/gallery entries stay
                  privately in your browser storage.
                </p>
              )}
              {modalDoc === 'terms' && (
                <p>
                  This digital guide is intended strictly for consenting adults
                  (18+) for relationship wellness and educational purposes.
                </p>
              )}
              {modalDoc === 'refund' && (
                <p>
                  Due to instant digital PDF delivery, if you face any download
                  issue our support team resolves it or issues a full refund
                  within 24 hours.
                </p>
              )}
              {modalDoc === 'contact' && (
                <p>
                  Need help downloading your PDF? Email us at{' '}
                  <strong className="text-[#FFD166]">
                    learnhub400@gmail.com
                  </strong>{' '}
                  for priority assistance within 2 hours.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
