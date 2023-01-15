export function capitalize(string) {
  if (typeof string !== "string") {
    return "";
  }
  return string[0].toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (end > start) {
    return new Array(end - start + 1).fill(0).map((_, index) => start + index);
  } else {
    return new Array(start - end + 1).fill(0).map((_, index) => start - index);
  }
}
