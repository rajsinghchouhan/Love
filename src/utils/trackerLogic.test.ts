import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTrackerStats,
  filterChallengeItems,
  filterGalleryPhotos,
  formatCountdown,
  validateNewGoalInput,
  type DailyChallengeItem,
  type SharedGoalItem,
  type GalleryPhotoItem,
} from './trackerLogic';

const sampleItems: DailyChallengeItem[] = [
  {
    id: '1',
    dayNumber: 1,
    title: 'Lotus Embrace',
    hindiSubtitle: 'गहरा भावनात्मक और रोमांटिक जुड़ाव',
    category: 'Romantic',
    difficulty: 'Easy',
    tried: true,
    bookmarked: true,
    partnerRating: 5,
    sharedNote: 'Loved the closeness',
  },
  {
    id: '2',
    dayNumber: 2,
    title: 'Elevated Serenity',
    hindiSubtitle: 'आरामदायक और लंबे समय तक संतुष्टि',
    category: 'Confidence Boost',
    difficulty: 'Moderate',
    tried: false,
    bookmarked: true,
    partnerRating: 0,
    sharedNote: '',
  },
  {
    id: '3',
    dayNumber: 3,
    title: 'Midnight Twist #7',
    hindiSubtitle: '23 Wild Bucket List में से एक रोमांचक अनुभव',
    category: 'Wild Bucket List',
    difficulty: 'Adventurous',
    tried: true,
    bookmarked: false,
    partnerRating: 4,
    sharedNote: 'Super exciting',
  },
];

const sampleGoals: SharedGoalItem[] = [
  {
    id: 'g1',
    title: 'Read Chapter 1 Together',
    category: 'Intimacy',
    assignedTo: 'Both',
    completed: true,
    targetDate: '2026-11-01',
  },
  {
    id: 'g2',
    title: 'Phone-Free Candlelight Night',
    category: 'Date Night',
    assignedTo: 'Both',
    completed: false,
    targetDate: '2026-11-05',
  },
];

test('calculateTrackerStats computes accurate metrics and averages', () => {
  const stats = calculateTrackerStats(sampleItems, sampleGoals, 365);
  assert.equal(stats.totalDays, 365);
  assert.equal(stats.triedCount, 2);
  assert.equal(stats.bookmarkedCount, 2);
  assert.equal(stats.completionPercent, 67);
  assert.equal(stats.averageRating, 4.5);
  assert.equal(stats.wildBucketTried, 1);
  assert.equal(stats.wildBucketTotal, 1);
  assert.equal(stats.goalsCompleted, 1);
  assert.equal(stats.goalsTotal, 2);
  assert.ok(stats.coupleHarmonyScore >= 55 && stats.coupleHarmonyScore <= 100);
});

test('filterChallengeItems filters by category, status, and search query', () => {
  const onlyTried = filterChallengeItems(sampleItems, 'All', 'tried', '');
  assert.equal(onlyTried.length, 2);

  const wildOnly = filterChallengeItems(sampleItems, 'Wild Bucket List', 'all', '');
  assert.equal(wildOnly.length, 1);
  assert.equal(wildOnly[0].title, 'Midnight Twist #7');

  const searchHindi = filterChallengeItems(sampleItems, 'All', 'all', 'भावनात्मक');
  assert.equal(searchHindi.length, 1);
  assert.equal(searchHindi[0].dayNumber, 1);
});

test('filterGalleryPhotos filters by category, liked state, and query', () => {
  const photos: GalleryPhotoItem[] = [
    {
      id: 'p1',
      src: '/assets/preview-1.png',
      title: 'Chapter Preview 01',
      subtitle: 'Romantic Foundations',
      category: 'Chapter Previews',
      date: '2026-10-01',
      liked: true,
    },
    {
      id: 'p2',
      src: '/assets/preview-2.png',
      title: 'Anniversary Getaway',
      subtitle: 'Udaipur Sunset',
      category: 'Couple Memories',
      date: '2026-10-14',
      liked: false,
    },
  ];

  assert.equal(filterGalleryPhotos(photos, 'Chapter Previews', false, '').length, 1);
  assert.equal(filterGalleryPhotos(photos, 'All', true, '').length, 1);
  assert.equal(filterGalleryPhotos(photos, 'All', false, 'udaipur').length, 1);
});

test('formatCountdown formats hours, minutes, and seconds with leading zeros', () => {
  const twelveHours = 12 * 3600 * 1000;
  assert.deepEqual(formatCountdown(twelveHours), { h: '12', m: '00', s: '00' });

  const mixed = (5 * 3600 + 7 * 60 + 9) * 1000;
  assert.deepEqual(formatCountdown(mixed), { h: '05', m: '07', s: '09' });
});

test('validateNewGoalInput enforces required title and YYYY-MM-DD date', () => {
  assert.equal(validateNewGoalInput('', '2026-11-10').valid, false);
  assert.equal(validateNewGoalInput('Valid Goal', 'invalid-date').valid, false);
  assert.equal(validateNewGoalInput('Valid Goal', '2026-11-10').valid, true);
});
