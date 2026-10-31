import React, { useState, useEffect } from 'react';
import {
  Heart,
  Search,
  ZoomIn,
  X,
  Plus,
  Camera,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Lock,
  Unlock,
  Upload,
  Sparkles,
  Film,
  Eye,
} from 'lucide-react';
import {
  INITIAL_GALLERY_PHOTOS,
  EBOOK_PREVIEW_CARDS,
} from '../data/coupleHubData';
import {
  GalleryPhotoItem,
  filterGalleryPhotos,
} from '../utils/trackerLogic';

const GALLERY_STORAGE_KEY = 'couple_hub_photo_gallery_v2';

const CATEGORIES: Array<GalleryPhotoItem['category'] | 'All'> = [
  'All',
  'Chapter Previews',
  'Romantic Ideas',
  'Couple Memories',
  'Bucket List',
];

export const PhotoGallerySection: React.FC<{ onBuyClick: () => void }> = ({
  onBuyClick,
}) => {
  const [photos, setPhotos] = useState<GalleryPhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_GALLERY_PHOTOS;
  });

  const [activeCategory, setActiveCategory] = useState<
    GalleryPhotoItem['category'] | 'All'
  >('All');
  const [onlyLiked, setOnlyLiked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxPhotoId, setLightboxPhotoId] = useState<string | null>(null);
  const [selectedPreviewIndex, setSelectedPreviewIndex] = useState<
    number | null
  >(null);
  const [spotlightIndex, setSpotlightIndex] = useState<number>(0);
  const [unlockedPreviews, setUnlockedPreviews] = useState<
    Record<string, boolean>
  >({
    'preview-1': true,
    'preview-2': true,
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newChapterInfo, setNewChapterInfo] = useState('');
  const [newCategory, setNewCategory] =
    useState<GalleryPhotoItem['category']>('Couple Memories');
  const [newImageSrc, setNewImageSrc] = useState('/assets/preview-3.jpg');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(photos));
    } catch {
      // ignore storage errors
    }
  }, [photos]);

  const filteredPhotos = filterGalleryPhotos(
    photos,
    activeCategory,
    onlyLiked,
    searchQuery
  );

  const activeLightboxIndex = filteredPhotos.findIndex(
    (p) => p.id === lightboxPhotoId
  );
  const activeLightboxPhoto =
    activeLightboxIndex >= 0 ? filteredPhotos[activeLightboxIndex] : null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPreviewIndex !== null) {
        if (e.key === 'Escape') setSelectedPreviewIndex(null);
        if (e.key === 'ArrowRight') {
          setSelectedPreviewIndex((prev) =>
            prev !== null ? (prev + 1) % EBOOK_PREVIEW_CARDS.length : null
          );
        }
        if (e.key === 'ArrowLeft') {
          setSelectedPreviewIndex((prev) =>
            prev !== null
              ? (prev - 1 + EBOOK_PREVIEW_CARDS.length) %
                EBOOK_PREVIEW_CARDS.length
              : null
          );
        }
      } else if (lightboxPhotoId !== null && filteredPhotos.length > 0) {
        if (e.key === 'Escape') setLightboxPhotoId(null);
        if (e.key === 'ArrowRight' && activeLightboxIndex >= 0) {
          const next =
            filteredPhotos[(activeLightboxIndex + 1) % filteredPhotos.length];
          if (next) setLightboxPhotoId(next.id);
        }
        if (e.key === 'ArrowLeft' && activeLightboxIndex >= 0) {
          const prev =
            filteredPhotos[
              (activeLightboxIndex - 1 + filteredPhotos.length) %
                filteredPhotos.length
            ];
          if (prev) setLightboxPhotoId(prev.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedPreviewIndex,
    lightboxPhotoId,
    activeLightboxIndex,
    filteredPhotos,
  ]);

  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPhotos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p))
    );
  };

  const handleToggleUnlock = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setUnlockedPreviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setNewImageSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || newTitle.trim().length < 3) {
      setFormError('Please enter a photo title (at least 3 characters).');
      return;
    }
    const created: GalleryPhotoItem = {
      id: `gal-${Date.now()}`,
      src: newImageSrc || '/assets/preview-3.jpg',
      title: newTitle.trim(),
      subtitle: newSubtitle.trim() || 'कपल स्पेशल मोमेंट',
      category: newCategory,
      date: 'Just Added',
      liked: true,
      isLockedPreview: false,
      chapterInfo:
        newChapterInfo.trim() ||
        'A special couple memory added to our private relationship wall.',
    };
    setPhotos((prev) => [created, ...prev]);
    setNewTitle('');
    setNewSubtitle('');
    setNewChapterInfo('');
    setFormError('');
    setShowAddModal(false);
  };

  const currentSpotlight =
    EBOOK_PREVIEW_CARDS[spotlightIndex] || EBOOK_PREVIEW_CARDS[0];
  const isSpotlightUnlocked = !!unlockedPreviews[currentSpotlight.id];

  return (
    <section
      id="gallery"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      {/* Part 1: Cinema Spotlight Chapter Reader + Filmstrip */}
      <div className="mx-auto max-w-7xl mb-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF2A6D]/40 bg-[#FF2A6D]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FF8DA8]">
              <Film className="h-3.5 w-3.5" />
              <span>Cinema Chapter Spotlight · 6 Visual Spreads</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-5xl">
              Ebook <span className="text-gradient-rose">Cinema Preview</span>{' '}
              Studio
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#C9B8D9] sm:text-base">
              नीचे दिए गए किसी भी चैप्टर थंबनेल पर टैप करें और बड़े सिनेमा स्पॉटलाइट
              स्क्रीन पर हिंदी + इंग्लिश सीक्रेट नोट्स अनलॉक करें।
            </p>
          </div>

          <button
            onClick={onBuyClick}
            className="neon-cta cursor-pointer self-start md:self-auto inline-flex items-center gap-2 rounded-2xl px-6 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white"
          >
            <BookOpen className="h-4 w-4" />
            <span>Unlock All 365 Pages — ₹149</span>
          </button>
        </div>

        {/* Main Cinema Spotlight Dual Panel */}
        <div className="glass-panel overflow-hidden rounded-3xl border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left 7 Cols: Large Artwork Stage */}
            <div className="relative flex min-h-[340px] sm:min-h-[440px] items-center justify-center bg-gradient-to-br from-[#1B0E2A] via-[#0B0612] to-[#1F0B1D] p-6 lg:col-span-7">
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="rounded-xl border border-white/15 bg-black/75 px-3 py-1 font-mono-num text-xs font-bold text-[#FFD166]">
                  CHAPTER 0{spotlightIndex + 1} / 0{EBOOK_PREVIEW_CARDS.length}
                </span>
                <span className="rounded-xl bg-[#FF2A6D]/25 border border-[#FF2A6D]/40 px-3 py-1 text-xs font-bold text-[#FF8DA8]">
                  {currentSpotlight.label}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPreviewIndex(spotlightIndex)}
                className="cursor-pointer group relative text-center"
              >
                <img
                  src={currentSpotlight.src}
                  alt={currentSpotlight.chapterTitle}
                  className="max-h-[360px] w-auto rounded-2xl object-contain shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/15 transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3.5 py-1.5 text-xs font-bold text-white border border-white/15">
                  <ZoomIn className="h-3.5 w-3.5 text-[#FFD166]" />
                  Click Artwork for Fullscreen Zoom
                </span>
              </button>
            </div>

            {/* Right 5 Cols: Chapter Details, Secret Note Unlocker & Controls */}
            <div className="flex flex-col justify-between border-t border-white/10 p-6 sm:p-8 lg:col-span-5 lg:border-t-0 lg:border-l">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono-num text-xs font-bold uppercase tracking-widest text-[#FFD166]">
                    {currentSpotlight.pages}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleToggleUnlock(currentSpotlight.id, e)}
                    className={`cursor-pointer inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      isSpotlightUnlocked
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-[#FF2A6D]/20 text-[#FF8DA8] border border-[#FF2A6D]/40 hover:bg-[#FF2A6D]/30'
                    }`}
                  >
                    {isSpotlightUnlocked ? (
                      <>
                        <Unlock className="h-3.5 w-3.5" />
                        Secret Note Unlocked
                      </>
                    ) : (
                      <>
                        <Lock className="h-3.5 w-3.5" />
                        Tap to Unlock Chapter Note
                      </>
                    )}
                  </button>
                </div>

                <h3 className="mt-4 font-display text-2xl font-extrabold text-white sm:text-3xl">
                  {currentSpotlight.chapterTitle}
                </h3>
                <p className="mt-2 text-base font-semibold text-[#FFD166]">
                  {currentSpotlight.hindiDesc}
                </p>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/50 p-4">
                  <div className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF8DA8]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Chapter Highlights &amp; Practical Takeaway</span>
                  </div>
                  {isSpotlightUnlocked ? (
                    <p className="text-sm leading-relaxed text-[#E2D4F0]">
                      Includes full step-by-step visual posture guidance,
                      comfort pillow angles, breathing cues, and Hindi + English
                      communication tips for {currentSpotlight.chapterTitle}.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-[#B8A6C9]">
                        This chapter&apos;s practical intimacy tip is locked in
                        preview mode. Tap the button below to reveal it
                        instantly!
                      </p>
                      <button
                        type="button"
                        onClick={(e) =>
                          handleToggleUnlock(currentSpotlight.id, e)
                        }
                        className="cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-[#FF2A6D] px-3 py-1.5 text-xs font-bold text-white"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        Reveal Chapter Tip Free
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSpotlightIndex(
                        (spotlightIndex - 1 + EBOOK_PREVIEW_CARDS.length) %
                          EBOOK_PREVIEW_CARDS.length
                      )
                    }
                    className="cursor-pointer flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-bold text-white hover:bg-white/15"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev Spread
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSpotlightIndex(
                        (spotlightIndex + 1) % EBOOK_PREVIEW_CARDS.length
                      )
                    }
                    className="cursor-pointer flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-bold text-white hover:bg-white/15"
                  >
                    Next Spread
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPreviewIndex(spotlightIndex)}
                  className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#FFD166]/40 bg-[#FFD166]/10 py-3 text-xs font-extrabold uppercase tracking-wider text-[#FFD166] hover:bg-[#FFD166]/20"
                >
                  <ZoomIn className="h-4 w-4" />
                  Open Fullscreen Reader Modal
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Interactive 6-Chapter Filmstrip Selector */}
          <div className="border-t border-white/10 bg-black/50 p-4 sm:p-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {EBOOK_PREVIEW_CARDS.map((card, index) => {
                const isSelected = spotlightIndex === index;
                return (
                  <div
                    key={card.id}
                    onClick={() => setSpotlightIndex(index)}
                    className={`cursor-pointer group rounded-2xl border p-2.5 transition-all ${
                      isSelected
                        ? 'border-[#FF2A6D] bg-[#FF2A6D]/20 shadow-[0_0_20px_rgba(255,42,109,0.35)]'
                        : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10'
                    }`}
                  >
                    <div className="relative h-24 overflow-hidden rounded-xl bg-black">
                      <img
                        src={card.src}
                        alt={card.chapterTitle}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-1.5 left-1.5 rounded bg-black/80 px-1.5 py-0.5 font-mono-num text-[10px] font-bold text-[#FFD166]">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-1 text-xs font-bold text-white">
                      {card.chapterTitle}
                    </p>
                    <p className="line-clamp-1 text-[10px] text-[#B8A6C9]">
                      {card.pages}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Neon-Glass Couple Photo Gallery & Memory Wall */}
      <div className="mx-auto max-w-7xl">
        <div className="glass-panel rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD166]/35 bg-[#FFD166]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FFD166]">
                <Camera className="h-3.5 w-3.5" />
                <span>Interactive Couple Photo &amp; Moodboard Wall</span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-white sm:text-4xl">
                Visual Moodboard &amp;{' '}
                <span className="text-gradient-gold">Shared Memories</span>
              </h3>
              <p className="mt-1 text-sm text-[#B8A6C9]">
                फ़ोटो सेव करें, कैटेगरी के अनुसार फ़िल्टर करें, या अपनी कपल मेमोरी
                अपलोड करें (100% प्राइवेट आपके ब्राउज़र में)।
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setOnlyLiked((prev) => !prev)}
                className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all border ${
                  onlyLiked
                    ? 'bg-[#FF2A6D] text-white border-[#FF2A6D] shadow-[0_0_16px_rgba(255,42,109,0.45)]'
                    : 'bg-white/5 text-[#D5C6E6] border-white/15 hover:bg-white/10'
                }`}
              >
                <Heart
                  className={`h-4 w-4 ${onlyLiked ? 'fill-current' : ''}`}
                />
                Saved ({photos.filter((p) => p.liked).length})
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="neon-cta cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white"
              >
                <Plus className="h-4 w-4" />
                Add Couple Memory
              </button>
            </div>
          </div>

          {/* Filter Pills & Search Input */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      active
                        ? 'bg-gradient-to-r from-[#FF2A6D] to-[#FF6B4A] text-white shadow-[0_0_14px_rgba(255,42,109,0.4)]'
                        : 'border border-white/10 bg-white/5 text-[#B8A6C9] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#B8A6C9]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapter, Hindi title..."
                className="w-full rounded-xl border border-white/15 bg-black/50 py-2.5 pr-9 pl-10 text-xs text-white placeholder-[#8B78A0] focus:border-[#FF2A6D] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#B8A6C9] hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Photo Cards Grid */}
          {filteredPhotos.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/15 bg-black/30 p-12 text-center">
              <p className="text-base font-bold text-white">
                No matching photos or spreads found
              </p>
              <p className="mt-1 text-xs text-[#B8A6C9]">
                Reset filters to view all visual cards and saved memories.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('All');
                  setOnlyLiked(false);
                  setSearchQuery('');
                }}
                className="mt-4 rounded-xl bg-[#FF2A6D] px-4 py-2 text-xs font-bold text-white"
              >
                Reset Gallery Filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setLightboxPhotoId(photo.id)}
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-[#150C21] transition-all duration-300 hover:-translate-y-1 hover:border-[#FF2A6D]/50 hover:shadow-[0_18px_45px_rgba(255,42,109,0.22)] flex flex-col"
                >
                  <div className="relative h-60 overflow-hidden bg-black">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#150C21] via-transparent to-black/30" />

                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="rounded-lg border border-white/15 bg-black/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#FFD166] backdrop-blur-md">
                        {photo.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => handleToggleLike(photo.id, e)}
                      aria-label={`Save ${photo.title}`}
                      className={`cursor-pointer absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl border transition-all ${
                        photo.liked
                          ? 'border-[#FF2A6D] bg-[#FF2A6D] text-white shadow-[0_0_15px_rgba(255,42,109,0.6)]'
                          : 'border-white/20 bg-black/60 text-white hover:bg-black/80'
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          photo.liked ? 'fill-current' : ''
                        }`}
                      />
                    </button>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-mono-num text-[11px] font-bold text-[#FF8DA8]">
                        {photo.date}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-lg bg-black/70 px-2.5 py-1 text-[10px] font-bold text-white border border-white/10">
                        <ZoomIn className="h-3 w-3 text-[#FFD166]" />
                        View
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h4 className="font-display text-lg font-bold text-white">
                        {photo.title}
                      </h4>
                      <p className="mt-0.5 text-xs font-semibold text-[#FFD166]">
                        {photo.subtitle}
                      </p>
                      {photo.chapterInfo && (
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#B8A6C9]">
                          {photo.chapterInfo}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal 1: Ebook Chapter Preview Lightbox */}
      {selectedPreviewIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          onClick={() => setSelectedPreviewIndex(null)}
        >
          <div
            className="glass-panel relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-5 w-5 text-[#FF2A6D]" />
                <span className="text-sm font-bold text-white">
                  {EBOOK_PREVIEW_CARDS[selectedPreviewIndex].chapterTitle}
                </span>
                <span className="rounded-md bg-[#FFD166]/20 px-2 py-0.5 font-mono-num text-xs font-bold text-[#FFD166]">
                  {selectedPreviewIndex + 1} / {EBOOK_PREVIEW_CARDS.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPreviewIndex(null)}
                className="rounded-xl border border-white/15 bg-white/5 p-2 text-white hover:bg-white/15"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative flex items-center justify-center bg-black p-6">
                <img
                  src={EBOOK_PREVIEW_CARDS[selectedPreviewIndex].src}
                  alt={EBOOK_PREVIEW_CARDS[selectedPreviewIndex].chapterTitle}
                  className="max-h-[420px] w-auto rounded-xl object-contain"
                />
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPreviewIndex(
                      (selectedPreviewIndex - 1 + EBOOK_PREVIEW_CARDS.length) %
                        EBOOK_PREVIEW_CARDS.length
                    )
                  }
                  className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-white/20 bg-black/75 p-2.5 text-white hover:bg-[#FF2A6D]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPreviewIndex(
                      (selectedPreviewIndex + 1) % EBOOK_PREVIEW_CARDS.length
                    )
                  }
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-white/20 bg-black/75 p-2.5 text-white hover:bg-[#FF2A6D]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <span className="inline-block rounded-lg bg-[#FF2A6D]/20 px-3 py-1 text-xs font-bold text-[#FF8DA8]">
                    {EBOOK_PREVIEW_CARDS[selectedPreviewIndex].pages}
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-extrabold text-white">
                    {EBOOK_PREVIEW_CARDS[selectedPreviewIndex].chapterTitle}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-[#FFD166]">
                    {EBOOK_PREVIEW_CARDS[selectedPreviewIndex].hindiDesc}
                  </p>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#FF8DA8] mb-1">
                      What You&apos;ll Learn Inside:
                    </p>
                    <p className="text-sm leading-relaxed text-[#E2D4F0]">
                      Step-by-step illustrated guide with comfort angles,
                      communication cues, and practical Hindi + Hinglish tips.
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPreviewIndex(null);
                      onBuyClick();
                    }}
                    className="neon-cta cursor-pointer w-full rounded-xl py-3.5 text-xs font-extrabold uppercase tracking-wider text-white"
                  >
                    Download Complete 365 Ebook — ₹149
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Photo Gallery Lightbox */}
      {activeLightboxPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl"
          onClick={() => setLightboxPhotoId(null)}
        >
          <div
            className="glass-panel relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="rounded-lg bg-[#FF2A6D]/20 px-2.5 py-1 text-xs font-bold text-[#FF8DA8]">
                  {activeLightboxPhoto.category}
                </span>
                <span className="font-mono-num text-xs text-[#FFD166]">
                  {activeLightboxPhoto.date}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxPhotoId(null)}
                className="rounded-xl border border-white/15 bg-white/5 p-2 text-white hover:bg-white/15"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="relative flex items-center justify-center bg-black p-6 md:col-span-7">
                <img
                  src={activeLightboxPhoto.src}
                  alt={activeLightboxPhoto.title}
                  className="max-h-[420px] w-auto rounded-xl object-contain"
                />
              </div>

              <div className="flex flex-col justify-between p-6 md:col-span-5">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {activeLightboxPhoto.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[#FFD166]">
                    {activeLightboxPhoto.subtitle}
                  </p>
                  {activeLightboxPhoto.chapterInfo && (
                    <p className="mt-4 text-sm leading-relaxed text-[#D5C6E6]">
                      {activeLightboxPhoto.chapterInfo}
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    type="button"
                    onClick={() => handleToggleLike(activeLightboxPhoto.id)}
                    className={`cursor-pointer w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold border transition-all ${
                      activeLightboxPhoto.liked
                        ? 'bg-[#FF2A6D] text-white border-[#FF2A6D]'
                        : 'bg-white/5 text-white border-white/15 hover:bg-white/10'
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        activeLightboxPhoto.liked ? 'fill-current' : ''
                      }`}
                    />
                    {activeLightboxPhoto.liked
                      ? 'Saved to Favorites'
                      : 'Save to Favorites'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Add Couple Memory Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="glass-panel w-full max-w-lg rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Camera className="h-5 w-5 text-[#FF2A6D]" />
                <h3 className="font-display text-xl font-bold text-white">
                  Add Couple Photo Memory
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl border border-white/15 bg-white/5 p-1.5 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                  Memory Title (English) *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Anniversary Candlelight Date"
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-[#FF2A6D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                    Hindi Subtitle
                  </label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    placeholder="e.g., हमारी खास शाम"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-[#FF2A6D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(
                        e.target.value as GalleryPhotoItem['category']
                      )
                    }
                    className="w-full rounded-xl border border-white/15 bg-black/80 px-3.5 py-2.5 text-sm text-white focus:border-[#FF2A6D] focus:outline-none"
                  >
                    <option value="Couple Memories">Couple Memories</option>
                    <option value="Romantic Ideas">Romantic Ideas</option>
                    <option value="Bucket List">Bucket List</option>
                    <option value="Chapter Previews">Chapter Previews</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                  Upload Photo or Pick Preset Cover
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-xs font-bold text-white hover:bg-white/10">
                    <Upload className="h-4 w-4 text-[#FFD166]" />
                    <span>Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <div className="flex gap-1.5">
                    {[
                      '/assets/preview-1.png',
                      '/assets/preview-2.png',
                      '/assets/preview-3.jpg',
                      '/assets/preview-4.jpg',
                    ].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setNewImageSrc(preset)}
                        className={`h-9 w-9 overflow-hidden rounded-lg border-2 ${
                          newImageSrc === preset
                            ? 'border-[#FF2A6D]'
                            : 'border-transparent opacity-60'
                        }`}
                      >
                        <img
                          src={preset}
                          alt="Preset"
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                  Private Couple Note
                </label>
                <textarea
                  rows={2}
                  value={newChapterInfo}
                  onChange={(e) => setNewChapterInfo(e.target.value)}
                  placeholder="Write what made this moment unforgettable..."
                  className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2 text-sm text-white focus:border-[#FF2A6D] focus:outline-none"
                />
              </div>

              {formError && (
                <p className="text-xs font-bold text-[#FF2A6D]">{formError}</p>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-bold text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="neon-cta cursor-pointer rounded-xl px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white"
                >
                  Save to Gallery Wall
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
