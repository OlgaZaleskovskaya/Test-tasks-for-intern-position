const emptyScoreStamp = {
  offset: 0,
  score: {
    home: 0,
    away: 0,
  },
};

const scoreStamps = Array(50000)
  .fill(emptyScoreStamp)
  .map(
    ((acc) => () => {
      const scoreChanged = Math.random() > 0.9999;
      const homeScoreChange = scoreChanged && Math.random() > 0.55 ? 1 : 0;
      const awayScoreChange = scoreChanged && !homeScoreChange ? 1 : 0;
      return {
        offset: acc.offset += Math.floor(Math.random() * 3) + 1,
        score: {
          home: acc.score.home += homeScoreChange,
          away: acc.score.away += awayScoreChange,
        },
      };
    })(emptyScoreStamp)
  );

type Score = {
  home: number;
  away: number;
};

const getScore = (offset: number): Score => {
  if (offset < 0) return { home: 0, away: 0 };
  let minIndex = 0;
  let maxIndex = 49999;
  const maxOffset = scoreStamps[scoreStamps.length - 1].offset;
  if (offset >= maxOffset) {
    return scoreStamps[scoreStamps.length - 1].score;
  } else {
    return findResult(offset, minIndex, maxIndex);
  }
};

const findResult = (
  ofset: number,
  minIndex: number,
  maxIndex: number
): Score => {
  const maxOffset = scoreStamps[maxIndex].offset;
  const minOffset = scoreStamps[minIndex].offset;
  const currentIndex = findCurrentIndex(
    maxIndex,
    minIndex,
    maxOffset,
    minOffset,
    ofset
  );
  const currentOffset = scoreStamps[currentIndex].offset;
  if (currentOffset == ofset) {
    return scoreStamps[currentIndex].score;
  }
  if (currentOffset > ofset) {
    if (scoreStamps[currentIndex - 1].offset <= ofset) {
      return scoreStamps[currentIndex - 1].score;
    }
    maxIndex = currentIndex;
  } else {
    if (scoreStamps[currentIndex + 1].offset >= ofset) {
      return scoreStamps[currentIndex + 1].score;
    }
    minIndex = currentIndex;
  }
  return findResult(ofset, minIndex, maxIndex);
};

const findCurrentIndex = (
  maxInd: number,
  minInd: number,
  maxOfset: number,
  minOfset: number,
  ofset: number
): number => {
  return Math.floor(
    minInd + ((maxInd - minInd) / (maxOfset - minOfset)) * (ofset - minOfset)
  );
};
