function getMonth(date: Date): string {
  const month: number = date.getMonth();
  if (month === 0) {
    return "Jan.";
  } else if (month === 1) {
    return "Feb.";
  } else if (month === 2) {
    return "Mar.";
  } else if (month === 3) {
    return "Apr.";
  } else if (month === 4) {
    return "May";
  } else if (month === 5) {
    return "Jun.";
  } else if (month === 6) {
    return "Jul.";
  } else if (month === 7) {
    return "Aug.";
  } else if (month === 8) {
    return "Sep.";
  } else if (month === 9) {
    return "Oct.";
  } else if (month === 10) {
    return "Nov.";
  } else if (month === 11) {
    return "Dec.";
  } else {
    throw new Error(`unexpected month ${month.toString()}`);
  }
}

// from Date to "Month Day Year"
export function getDateString(date: Date): string {
  const year: string = date.getFullYear().toString();
  const month: string = getMonth(date);
  const day: string = date.getDate().toString();
  return `${month} ${day}, ${year}`;
}
