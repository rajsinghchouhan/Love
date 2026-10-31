export interface DailyChallengeItem {
  id: string;
  dayNumber: number;
  title: string;
  hindiSubtitle: string;
  category: 'Romantic' | 'Deep Connection' | 'Confidence Boost' | 'Wild Bucket List';
  difficulty: 'Easy' | 'Moderate' | 'Adventurous';
  tried: boolean;
  bookmarked: boolean;
  partnerRating: number; // 0 to 5
  sharedNote: string;
  triedDate?: string;
}

export interface SharedGoalItem {
  id: string;
  title: string;
  category: 'Intimacy' | 'Date Night' | 'Communication' | 'Milestone';
  assignedTo: 'Both' | 'Partner A' | 'Partner B';
  completed: boolean;
  targetDate: string;
}

export interface GalleryPhotoItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
  category: 'Chapter Previews' | 'Romantic Ideas' | 'Couple Memories' | 'Bucket List';
  date: string;
  liked: boolean;
  isLockedPreview?: boolean;
  chapterInfo?: string;
}

export interface TrackerSummaryStats {
  totalDays: number;
  triedCount: number;
  bookmarkedCount: number;
  completionPercent: number;
  averageRating: number;
  wildBucketTried: number;
  wildBucketTotal: number;
  goalsCompleted: number;
  goalsTotal: number;
  coupleHarmonyScore: number;
}

export function calculateTrackerStats(
  items: DailyChallengeItem[],
  goals: SharedGoalItem[],
  totalEbookPositions = 365
): TrackerSummaryStats {
  const triedItems = items.filter((item) => item.tried);
  const bookmarkedItems = items.filter((item) => item.bookmarked);
  const ratedItems = triedItems.filter((item) => item.partnerRating > 0);

  const triedCount = triedItems.length;
  const bookmarkedCount = bookmarkedItems.length;
  const completionPercent = Math.min(
    100,
    Math.round((triedCount / Math.max(1, items.length)) * 100)
  );

  const averageRating =
    ratedItems.length > 0
      ? Number(
          (
            ratedItems.reduce((sum, item) => sum + item.partnerRating, 0) /
            ratedItems.length
          ).toFixed(1)
        )
      : 0;

  const wildItems = items.filter((item) => item.category === 'Wild Bucket List');
  const wildBucketTried = wildItems.filter((item) => item.tried).length;
  const wildBucketTotal = wildItems.length;

  const goalsCompleted = goals.filter((g) => g.completed).length;
  const goalsTotal = goals.length;

  const goalRatio = goalsTotal > 0 ? goalsCompleted / goalsTotal : 0;
  const challengeRatio = items.length > 0 ? triedCount / items.length : 0;
  const coupleHarmonyScore = Math.min(
    100,
    Math.round(55 + challengeRatio * 25 + goalRatio * 20)
  );

  return {
    totalDays: totalEbookPositions,
    triedCount,
    bookmarkedCount,
    completionPercent,
    averageRating,
    wildBucketTried,
    wildBucketTotal,
    goalsCompleted,
    goalsTotal,
    coupleHarmonyScore,
  };
}

export function filterChallengeItems(
  items: DailyChallengeItem[],
  category: string,
  statusFilter: 'all' | 'tried' | 'wishlist' | 'untried',
  searchQuery: string
): DailyChallengeItem[] {
  const q = searchQuery.trim().toLowerCase();
  return items.filter((item) => {
    if (category !== 'All' && item.category !== category) {
      return false;
    }
    if (statusFilter === 'tried' && !item.tried) return false;
    if (statusFilter === 'wishlist' && !item.bookmarked) return false;
    if (statusFilter === 'untried' && item.tried) return false;
    if (q) {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchHindi = item.hindiSubtitle.toLowerCase().includes(q);
      const matchDay = `day ${item.dayNumber}`.includes(q) || String(item.dayNumber) === q;
      const matchNote = item.sharedNote.toLowerCase().includes(q);
      return matchTitle || matchHindi || matchDay || matchNote;
    }
    return true;
  });
}

export function filterGalleryPhotos(
  photos: GalleryPhotoItem[],
  category: string,
  onlyLiked: boolean,
  searchQuery: string
): GalleryPhotoItem[] {
  const q = searchQuery.trim().toLowerCase();
  return photos.filter((photo) => {
    if (category !== 'All' && photo.category !== category) {
      return false;
    }
    if (onlyLiked && !photo.liked) {
      return false;
    }
    if (q) {
      return (
        photo.title.toLowerCase().includes(q) ||
        photo.subtitle.toLowerCase().includes(q) ||
        (photo.chapterInfo?.toLowerCase().includes(q) ?? false)
      );
    }
    return true;
  });
}

export function formatCountdown(remainingMs: number): {
  h: string;
  m: string;
  s: string;
} {
  const clamped = Math.max(0, Math.floor(remainingMs / 1000));
  const h = Math.floor(clamped / 3600);
  const m = Math.floor((clamped % 3600) / 60);
  const s = clamped % 60;
  return {
    h: String(h).padStart(2, '0'),
    m: String(m).padStart(2, '0'),
    s: String(s).padStart(2, '0'),
  };
}

export function validateNewGoalInput(title: string, targetDate: string): {
  valid: boolean;
  error?: string;
} {
  if (!title || title.trim().length < 3) {
    return {
      valid: false,
      error: 'Please enter a goal title of at least 3 characters.',
    };
  }
  if (!targetDate || !/^\d{4}-\d{2}-\d{2}$/.test(targetDate.trim())) {
    return {
      valid: false,
      error: 'Please select a valid target date (YYYY-MM-DD).',
    };
  }
  return { valid: true };
}
