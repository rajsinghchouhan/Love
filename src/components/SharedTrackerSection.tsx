import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Flame,
  Star,
  Sparkles,
  Plus,
  Trash2,
  Shuffle,
  Search,
  Calendar,
  Award,
  MessageSquareHeart,
  BookmarkCheck,
  RotateCcw,
  Users,
} from 'lucide-react';
import {
  INITIAL_DAILY_CHALLENGES,
  INITIAL_SHARED_GOALS,
} from '../data/coupleHubData';
import {
  DailyChallengeItem,
  SharedGoalItem,
  calculateTrackerStats,
  filterChallengeItems,
  validateNewGoalInput,
} from '../utils/trackerLogic';

const CHALLENGE_STORAGE_KEY = 'couple_hub_365_challenges_v2';
const GOALS_STORAGE_KEY = 'couple_hub_couple_goals_v2';
const PARTNERS_STORAGE_KEY = 'couple_hub_partner_names_v2';

const CATEGORIES: Array<DailyChallengeItem['category'] | 'All'> = [
  'All',
  'Romantic',
  'Deep Connection',
  'Confidence Boost',
  'Wild Bucket List',
];

export const SharedTrackerSection: React.FC = () => {
  const [challenges, setChallenges] = useState<DailyChallengeItem[]>(() => {
    try {
      const saved = localStorage.getItem(CHALLENGE_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_DAILY_CHALLENGES;
  });

  const [goals, setGoals] = useState<SharedGoalItem[]>(() => {
    try {
      const saved = localStorage.getItem(GOALS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_SHARED_GOALS;
  });

  const [partners, setPartners] = useState<{
    partnerA: string;
    partnerB: string;
  }>(() => {
    try {
      const saved = localStorage.getItem(PARTNERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { partnerA: 'Aarav', partnerB: 'Meera' };
  });

  const [editingPartners, setEditingPartners] = useState(false);
  const [activeTab, setActiveTab] = useState<'365' | 'goals' | 'checkin'>(
    '365'
  );
  const [categoryFilter, setCategoryFilter] = useState<
    DailyChallengeItem['category'] | 'All'
  >('All');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'tried' | 'wishlist' | 'untried'
  >('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [surprisePick, setSurprisePick] = useState<DailyChallengeItem | null>(
    null
  );
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');

  const [goalTitle, setGoalTitle] = useState('');
  const [goalCategory, setGoalCategory] =
    useState<SharedGoalItem['category']>('Intimacy');
  const [goalTargetDate, setGoalTargetDate] = useState('2026-11-15');
  const [goalAssignedTo, setGoalAssignedTo] =
    useState<SharedGoalItem['assignedTo']>('Both');
  const [goalError, setGoalError] = useState('');

  const [checkInScores, setCheckInScores] = useState({
    communication: 9,
    emotionalCloseness: 9,
    bedroomConfidence: 8,
    adventureSpark: 9,
  });
  const [checkInSavedMessage, setCheckInSavedMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(challenges));
    } catch {
      // ignore
    }
  }, [challenges]);

  useEffect(() => {
    try {
      localStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(goals));
    } catch {
      // ignore
    }
  }, [goals]);

  useEffect(() => {
    try {
      localStorage.setItem(PARTNERS_STORAGE_KEY, JSON.stringify(partners));
    } catch {
      // ignore
    }
  }, [partners]);

  const stats = calculateTrackerStats(challenges, goals);
  const filteredChallenges = filterChallengeItems(
    challenges,
    categoryFilter,
    statusFilter,
    searchQuery
  );

  const toggleTried = (id: string) => {
    setChallenges((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              tried: !item.tried,
              partnerRating:
                !item.tried && item.partnerRating === 0
                  ? 5
                  : item.partnerRating,
            }
          : item
      )
    );
  };

  const toggleBookmarked = (id: string) => {
    setChallenges((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
      )
    );
  };

  const setItemRating = (id: string, partnerRating: number) => {
    setChallenges((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, partnerRating } : item
      )
    );
  };

  const saveSharedNote = (id: string) => {
    setChallenges((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, sharedNote: noteDraft.trim() } : item
      )
    );
    setEditingNoteId(null);
    setNoteDraft('');
  };

  const handlePickTonightIdea = () => {
    const untried = challenges.filter((c) => !c.tried);
    const pool = untried.length > 0 ? untried : challenges;
    const randomItem = pool[Math.floor(Math.random() * pool.length)];
    setSurprisePick(randomItem);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateNewGoalInput(goalTitle, goalTargetDate);
    if (!validation.valid) {
      setGoalError(validation.error || 'Invalid input');
      return;
    }
    const newGoal: SharedGoalItem = {
      id: `goal-${Date.now()}`,
      title: goalTitle.trim(),
      category: goalCategory,
      targetDate: goalTargetDate,
      completed: false,
      assignedTo: goalAssignedTo,
    };
    setGoals((prev) => [newGoal, ...prev]);
    setGoalTitle('');
    setGoalError('');
  };

  const toggleGoalCompleted = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const handleResetDemoData = () => {
    setChallenges(INITIAL_DAILY_CHALLENGES);
    setGoals(INITIAL_SHARED_GOALS);
    setSurprisePick(null);
  };

  const harmonyAvg = (
    (checkInScores.communication +
      checkInScores.emotionalCloseness +
      checkInScores.bedroomConfidence +
      checkInScores.adventureSpark) /
    4
  ).toFixed(1);

  return (
    <section
      id="tracker"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-white/10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Command Center Header + Partner Profile Pill */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF2A6D]/40 bg-[#FF2A6D]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FF8DA8]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive 365 Couple Companion OS</span>
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-5xl">
              Shared <span className="text-gradient-rose">365 Intimacy</span>{' '}
              Command Center
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[#C9B8D9] sm:text-base">
              अपने पार्टनर के साथ ट्रैक करें कि आपने कौन-सी पोज़िशन ट्राई की, अपनी
              विशलिस्ट बनाएं, 5-स्टार रेटिंग दें और कपल गोल्स पूरे करें।
            </p>
          </div>

          {/* Partner Sync Bar */}
          <div className="glass-panel flex flex-wrap items-center gap-3 self-start rounded-2xl p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF2A6D] to-[#FF6B4A] text-white">
              <Users className="h-5 w-5" />
            </div>

            {editingPartners ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={partners.partnerA}
                  onChange={(e) =>
                    setPartners((p) => ({ ...p, partnerA: e.target.value }))
                  }
                  aria-label="Partner 1 Name"
                  className="w-24 rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-bold text-white"
                />
                <span className="text-[#FF2A6D] font-bold">❤️</span>
                <input
                  type="text"
                  value={partners.partnerB}
                  onChange={(e) =>
                    setPartners((p) => ({ ...p, partnerB: e.target.value }))
                  }
                  aria-label="Partner 2 Name"
                  className="w-24 rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 text-xs font-bold text-white"
                />
                <button
                  type="button"
                  onClick={() => setEditingPartners(false)}
                  className="rounded-lg bg-[#FF2A6D] px-3 py-1 text-xs font-bold text-white"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="pr-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#B8A6C9]">
                  Active Couple Profile
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-white">
                    {partners.partnerA}{' '}
                    <span className="text-[#FF2A6D]">❤️</span>{' '}
                    {partners.partnerB}
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditingPartners(true)}
                    className="cursor-pointer text-[11px] font-bold text-[#FFD166] underline"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4-Card Neon Telemetry Deck */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-[#FF2A6D]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8A6C9]">
                Tried Together
              </span>
              <CheckCircle2 className="h-4 w-4 text-[#FF2A6D]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono-num text-3xl font-extrabold text-white">
                {stats.triedCount}
              </span>
              <span className="font-mono-num text-xs text-[#B8A6C9]">
                / {challenges.length} ({stats.completionPercent}%)
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF2A6D] to-[#FFD166] transition-all duration-500"
                style={{ width: `${Math.max(stats.completionPercent, 6)}%` }}
              />
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-[#FFD166]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8A6C9]">
                Tonight&apos;s Wishlist
              </span>
              <BookmarkCheck className="h-4 w-4 text-[#FFD166]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono-num text-3xl font-extrabold text-[#FFD166]">
                {stats.bookmarkedCount}
              </span>
              <span className="text-xs text-[#B8A6C9]">Saved Poses</span>
            </div>
            <p className="mt-2 text-xs text-[#D5C6E6]">
              Bookmarked by {partners.partnerA} &amp; {partners.partnerB}
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-[#FF6B4A]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8A6C9]">
                23 Wild Bucket List
              </span>
              <Flame className="h-4 w-4 text-[#FF6B4A]" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono-num text-3xl font-extrabold text-[#FF6B4A]">
                {stats.wildBucketTried}
              </span>
              <span className="font-mono-num text-xs text-[#B8A6C9]">
                / {stats.wildBucketTotal} Unlocked
              </span>
            </div>
            <p className="mt-2 text-xs text-[#D5C6E6]">
              Thrill &amp; weekend adventure poses
            </p>
          </div>

          <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-emerald-400">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8A6C9]">
                Couple Harmony
              </span>
              <Award className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono-num text-3xl font-extrabold text-emerald-400">
                {stats.averageRating || '5.0'}★
              </span>
              <span className="font-mono-num text-xs text-[#B8A6C9]">
                · {stats.goalsCompleted}/{stats.goalsTotal} Goals
              </span>
            </div>
            <p className="mt-2 text-xs text-[#D5C6E6]">
              Harmony Index: {stats.coupleHarmonyScore}%
            </p>
          </div>
        </div>

        {/* Navigation Tabs + Surprise Generator Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/15 bg-[#120A1D] p-3">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('365')}
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === '365'
                  ? 'bg-gradient-to-r from-[#FF2A6D] to-[#FF6B4A] text-white shadow-[0_0_20px_rgba(255,42,109,0.45)]'
                  : 'text-[#B8A6C9] hover:bg-white/5 hover:text-white'
              }`}
            >
              🔥 365 Positions Deck ({challenges.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('goals')}
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'goals'
                  ? 'bg-gradient-to-r from-[#FF2A6D] to-[#FF6B4A] text-white shadow-[0_0_20px_rgba(255,42,109,0.45)]'
                  : 'text-[#B8A6C9] hover:bg-white/5 hover:text-white'
              }`}
            >
              🎯 Couple Goals ({stats.goalsCompleted}/{stats.goalsTotal})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checkin')}
              className={`cursor-pointer rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'checkin'
                  ? 'bg-gradient-to-r from-[#FF2A6D] to-[#FF6B4A] text-white shadow-[0_0_20px_rgba(255,42,109,0.45)]'
                  : 'text-[#B8A6C9] hover:bg-white/5 hover:text-white'
              }`}
            >
              💬 Weekly Intimacy Pulse
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePickTonightIdea}
              className="neon-cta cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white"
            >
              <Shuffle className="h-3.5 w-3.5" />
              🎲 Pick Tonight&apos;s Surprise Pose
            </button>

            <button
              type="button"
              onClick={handleResetDemoData}
              title="Reset Tracker Data"
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-xs font-bold text-[#B8A6C9] hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>

        {/* Surprise Pick Highlight Card */}
        {surprisePick && (
          <div className="mb-8 glass-panel-rose rounded-3xl p-6 shadow-[0_20px_50px_rgba(255,42,109,0.3)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-[#FF2A6D] px-2.5 py-1 font-mono-num text-[11px] font-extrabold uppercase text-white">
                    🎲 TONIGHT&apos;S SURPRISE PICK · DAY #
                    {surprisePick.dayNumber}
                  </span>
                  <span className="rounded-lg border border-[#FFD166]/40 bg-[#FFD166]/15 px-2.5 py-1 text-xs font-bold text-[#FFD166]">
                    {surprisePick.category}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-white">
                  {surprisePick.title}
                </h3>
                <p className="mt-1 text-sm text-[#E2D4F0]">
                  {surprisePick.hindiSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    toggleTried(surprisePick.id);
                    setSurprisePick((prev) =>
                      prev ? { ...prev, tried: !prev.tried } : null
                    );
                  }}
                  className="cursor-pointer rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-extrabold uppercase text-black"
                >
                  {surprisePick.tried ? '✓ Marked Tried' : 'Mark as Tried'}
                </button>
                <button
                  type="button"
                  onClick={handlePickTonightIdea}
                  className="cursor-pointer rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20"
                >
                  Spin Again
                </button>
                <button
                  type="button"
                  onClick={() => setSurprisePick(null)}
                  className="cursor-pointer rounded-xl px-3 py-2 text-xs text-[#B8A6C9] hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 1: 365 Positions Deck */}
        {activeTab === '365' && (
          <div>
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                      categoryFilter === cat
                        ? 'bg-[#FF2A6D] text-white shadow-[0_0_15px_rgba(255,42,109,0.4)]'
                        : 'border border-white/10 bg-white/5 text-[#B8A6C9] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex rounded-xl border border-white/15 bg-black/50 p-1">
                  {(
                    [
                      { id: 'all', label: 'All' },
                      { id: 'tried', label: 'Tried' },
                      { id: 'wishlist', label: 'Wishlist' },
                      { id: 'untried', label: 'Untried' },
                    ] as const
                  ).map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setStatusFilter(st.id)}
                      className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                        statusFilter === st.id
                          ? 'bg-[#FFD166] text-black'
                          : 'text-[#B8A6C9] hover:text-white'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-56">
                  <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#B8A6C9]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search day or Hindi name..."
                    className="w-full rounded-xl border border-white/15 bg-black/50 py-2 pr-3 pl-9 text-xs text-white placeholder-[#8B78A0] focus:border-[#FF2A6D] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {filteredChallenges.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-2xl p-6 transition-all border ${
                    item.tried
                      ? 'border-emerald-500/40 bg-gradient-to-br from-emerald-950/35 to-[#120A1D]'
                      : 'border-white/10 bg-[#150C21] hover:border-[#FF2A6D]/45'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-lg bg-[#FF2A6D]/20 px-2.5 py-0.5 font-mono-num text-xs font-extrabold text-[#FF8DA8]">
                          DAY #{item.dayNumber}
                        </span>
                        <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-semibold text-[#FFD166]">
                          {item.category}
                        </span>
                        <span className="text-[11px] text-[#B8A6C9]">
                          · {item.difficulty}
                        </span>
                      </div>

                      <h4 className="mt-2.5 font-display text-xl font-bold text-white">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-[#D5C6E6]">
                        {item.hindiSubtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleBookmarked(item.id)}
                        aria-label={`Bookmark ${item.title}`}
                        className={`cursor-pointer rounded-xl border p-2 transition-all ${
                          item.bookmarked
                            ? 'border-[#FFD166] bg-[#FFD166]/20 text-[#FFD166]'
                            : 'border-white/15 bg-white/5 text-[#B8A6C9] hover:text-white'
                        }`}
                      >
                        <BookmarkCheck className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => toggleTried(item.id)}
                        className={`cursor-pointer rounded-xl px-3.5 py-2 text-xs font-extrabold uppercase tracking-wider transition-all ${
                          item.tried
                            ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                            : 'border border-[#FF2A6D]/50 bg-[#FF2A6D]/15 text-white hover:bg-[#FF2A6D]'
                        }`}
                      >
                        {item.tried ? '✓ Tried' : 'Mark Tried'}
                      </button>
                    </div>
                  </div>

                  {/* Rating & Private Couple Note */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-semibold text-[#B8A6C9] mr-1">
                        Couple Rating:
                      </span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setItemRating(item.id, star)}
                          aria-label={`Rate ${star} stars`}
                          className="cursor-pointer transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-4 w-4 ${
                              star <= item.partnerRating
                                ? 'fill-[#FFD166] text-[#FFD166]'
                                : 'text-white/20'
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingNoteId(item.id);
                        setNoteDraft(item.sharedNote || '');
                      }}
                      className="cursor-pointer text-xs font-bold text-[#FF8DA8] hover:underline"
                    >
                      {item.sharedNote
                        ? 'Edit Couple Note'
                        : '+ Add Couple Note'}
                    </button>
                  </div>

                  {editingNoteId === item.id ? (
                    <div className="mt-3 flex gap-2">
                      <input
                        type="text"
                        value={noteDraft}
                        onChange={(e) => setNoteDraft(e.target.value)}
                        placeholder="Add a private note for your partner..."
                        className="flex-1 rounded-xl border border-white/20 bg-black/60 px-3 py-1.5 text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => saveSharedNote(item.id)}
                        className="rounded-xl bg-[#FF2A6D] px-3.5 py-1.5 text-xs font-bold text-white"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    item.sharedNote && (
                      <p className="mt-3 rounded-xl border border-white/10 bg-black/40 px-3.5 py-2 text-xs italic text-[#E2D4F0]">
                        &ldquo;{item.sharedNote}&rdquo;
                      </p>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Shared Couple Goals */}
        {activeTab === 'goals' && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <form
                onSubmit={handleAddGoal}
                className="glass-panel rounded-3xl p-6 space-y-4"
              >
                <h3 className="font-display text-xl font-bold text-white">
                  Create New Shared Intimacy Goal
                </h3>
                <p className="text-xs text-[#B8A6C9]">
                  Add a relationship ritual or date-night target for{' '}
                  {partners.partnerA} &amp; {partners.partnerB}.
                </p>

                <div>
                  <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                    Goal Title *
                  </label>
                  <input
                    type="text"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    placeholder="e.g., Try 3 New Romantic Poses This Weekend"
                    className="w-full rounded-xl border border-white/15 bg-black/60 px-3.5 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                    Category
                  </label>
                  <select
                    value={goalCategory}
                    onChange={(e) =>
                      setGoalCategory(
                        e.target.value as SharedGoalItem['category']
                      )
                    }
                    className="w-full rounded-xl border border-white/15 bg-black/80 px-3.5 py-2.5 text-xs text-white"
                  >
                    <option value="Intimacy">Intimacy</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Communication">Communication</option>
                    <option value="Milestone">Milestone</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                      Target Date *
                    </label>
                    <input
                      type="date"
                      value={goalTargetDate}
                      onChange={(e) => setGoalTargetDate(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-[#D5C6E6]">
                      Assigned To
                    </label>
                    <select
                      value={goalAssignedTo}
                      onChange={(e) =>
                        setGoalAssignedTo(
                          e.target.value as SharedGoalItem['assignedTo']
                        )
                      }
                      className="w-full rounded-xl border border-white/15 bg-black/80 px-3 py-2 text-xs text-white"
                    >
                      <option value="Both">Both Partners</option>
                      <option value="Partner A">{partners.partnerA}</option>
                      <option value="Partner B">{partners.partnerB}</option>
                    </select>
                  </div>
                </div>

                {goalError && (
                  <p className="text-xs font-bold text-[#FF2A6D]">{goalError}</p>
                )}

                <button
                  type="submit"
                  className="neon-cta cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-extrabold uppercase tracking-wider text-white"
                >
                  <Plus className="h-4 w-4" />
                  Add Couple Goal
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`flex items-center justify-between gap-4 rounded-2xl border p-5 transition-all ${
                    goal.completed
                      ? 'border-emerald-500/40 bg-emerald-950/25'
                      : 'border-white/10 bg-[#150C21]'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <button
                      type="button"
                      onClick={() => toggleGoalCompleted(goal.id)}
                      className={`cursor-pointer mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border ${
                        goal.completed
                          ? 'border-emerald-400 bg-emerald-500 text-black'
                          : 'border-white/25 bg-black/50 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <div>
                      <h4
                        className={`text-base font-bold ${
                          goal.completed
                            ? 'line-through text-white/50'
                            : 'text-white'
                        }`}
                      >
                        {goal.title}
                      </h4>
                      <p className="text-xs font-semibold text-[#FFD166]">
                        {goal.category}
                      </p>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-[#B8A6C9]">
                        <span className="flex items-center gap-1 font-mono-num">
                          <Calendar className="h-3 w-3 text-[#FF2A6D]" />
                          {goal.targetDate}
                        </span>
                        <span>· {goal.assignedTo}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteGoal(goal.id)}
                    aria-label={`Delete ${goal.title}`}
                    className="cursor-pointer rounded-xl p-2 text-[#B8A6C9] hover:bg-white/10 hover:text-[#FF2A6D]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Weekly Intimacy Pulse Check */}
        {activeTab === 'checkin' && (
          <div className="glass-panel rounded-3xl p-6 sm:p-10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <h3 className="font-display text-2xl font-extrabold text-white">
                  Weekly Couple Intimacy Pulse Check
                </h3>
                <p className="text-sm text-[#C9B8D9]">
                  हर वीकेंड ५ मिनट निकालकर अपने पार्टनर के साथ इन ४ सवालों को १ से १० के
                  स्केल पर रेट करें।
                </p>

                {[
                  {
                    key: 'communication' as const,
                    label: 'Open Communication (बिना झिझक बातचीत)',
                  },
                  {
                    key: 'emotionalCloseness' as const,
                    label: 'Emotional Closeness (भावनात्मक गहराई)',
                  },
                  {
                    key: 'bedroomConfidence' as const,
                    label: 'Bedroom Confidence & Satisfaction (संतुष्टि)',
                  },
                  {
                    key: 'adventureSpark' as const,
                    label: 'Excitement & New Ideas (नया रोमांच)',
                  },
                ].map((metric) => (
                  <div key={metric.key} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white">{metric.label}</span>
                      <span className="font-mono-num text-[#FFD166]">
                        {checkInScores[metric.key]} / 10
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={checkInScores[metric.key]}
                      onChange={(e) =>
                        setCheckInScores((prev) => ({
                          ...prev,
                          [metric.key]: Number(e.target.value),
                        }))
                      }
                      className="w-full accent-[#FF2A6D] cursor-pointer"
                    />
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCheckInSavedMessage(
                      `Saved! ${partners.partnerA} & ${partners.partnerB}'s Harmony Score is ${harmonyAvg}/10.`
                    )
                  }
                  className="neon-cta cursor-pointer rounded-xl px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white"
                >
                  Save Weekly Pulse Check
                </button>

                {checkInSavedMessage && (
                  <p className="text-xs font-bold text-emerald-400">
                    {checkInSavedMessage}
                  </p>
                )}
              </div>

              <div className="lg:col-span-5 text-center glass-panel-rose rounded-3xl p-8">
                <MessageSquareHeart className="mx-auto h-10 w-10 text-[#FF2A6D]" />
                <span className="mt-3 block text-xs font-bold uppercase tracking-widest text-[#FF8DA8]">
                  Current Harmony Score
                </span>
                <div className="mt-2 font-mono-num text-6xl font-extrabold text-white">
                  {harmonyAvg}
                  <span className="text-2xl text-[#FFD166]">/10</span>
                </div>
                <p className="mt-3 text-xs text-[#E2D4F0]">
                  Based on {partners.partnerA} &amp; {partners.partnerB}&apos;s
                  weekly check-in ratings.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
