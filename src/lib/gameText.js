// Pure text builders for the end-of-match summary.

function reasonVerb(reason) {
  if (reason === 'surrender') return 'surrendered';
  if (reason === 'exit') return 'left';
  return 'disconnected';
}

export function buildReasonText(reason, loserNum, p1, p2) {
  if (reason === 'surrender' || reason === 'exit' || reason === 'disconnect') {
    const loser = loserNum === 1 ? p1 : p2;
    const winner = loserNum === 1 ? p2 : p1;
    const verb = reasonVerb(reason);
    const wasLeading = loser.score > winner.score;
    if (wasLeading) {
      const tail = reason === 'surrender' ? ' — a noble concession.' : '.';
      return `${loser.name} ${verb} while leading${tail}`;
    }
    const suffix = verb === 'left' ? ' early' : '';
    return `${loser.name} ${verb}${suffix}.`;
  }
  if (reason === 'apples_cleared') return 'All apples eaten!';
  if (reason === 'timeout') return 'Time ran out';
  return '';
}

export function buildWinnerMessage(isDraw, isP1Winner, myPlayerNum, p1, p2) {
  if (isDraw) return '🤝 Draw!';
  if (myPlayerNum === 1 || myPlayerNum === 2) {
    const iWon = myPlayerNum === 1 ? isP1Winner : !isP1Winner;
    return iWon ? '🏆 Victory!' : '😤 Defeat';
  }
  const winnerName = isP1Winner ? p1.name : p2.name;
  return `🏆 ${winnerName} Wins!`;
}
