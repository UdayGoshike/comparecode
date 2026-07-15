const complexityRank = {
  "O(1)": 0,
  "O(log N)": 1,
  "O(logN)": 1,

  "O(N)": 2,
  "O(n)": 2,

  "O(N log N)": 3,
  "O(N logN)": 3,
  "O(n log n)": 3,
  "O(nlogn)": 3,

  "O(N²)": 4,
  "O(N^2)": 4,
  "O(n²)": 4,
  "O(n^2)": 4,

  "O(N² log N)": 5,
  "O(N^2 log N)": 5,
  "O(n² log n)": 5,

  "O(N³)": 6,
  "O(N^3)": 6,
  "O(n³)": 6,
  "O(n^3)": 6,

  "O(2^N)": 7,
  "O(2^n)": 7,

  "O(N!)": 8,
  "O(n!)": 8,
};

const penalties = {
  0: 0,
  1: 10,
  2: 25,
  3: 45,
  4: 70,
  5: 100,
  6: 135,
};

function calculateScore(userTC, optimalTC) {
  const userRank = complexityRank[userTC];
  const optimalRank = complexityRank[optimalTC];

  if (userRank === undefined || optimalRank === undefined) return 0;

  const difference = Math.max(0, userRank - optimalRank);

  const penalty = penalties[difference] ?? 100;

  return Math.max(0, 100 - penalty);
}

module.exports = calculateScore;
