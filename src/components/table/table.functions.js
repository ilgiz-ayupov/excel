import { range } from "@core/utils";

export function isCell(event) {
  return event.target.dataset.type === "cell";
}

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function matrix($current, $target, $root) {
  const current = $current.id(true);
  const target = $target.id(true);

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  const matrix = cols.reduce((acc, col) => {
    rows.forEach((row) => {
      const cell = $root.find(`[data-id="${row}:${col}"]`);
      acc.push(cell);
    });
    return acc;
  }, []);

  return matrix;
}

export function nextSelector(key, { row, col }) {
  const MIN_VALUE = 0;
  switch (key) {
    case "Enter":
    case "ArrowDown":
      row += 1;
      break;
    case "Tab":
    case "ArrowRight":
      col += 1;
      break;
    case "ArrowLeft":
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case "ArrowUp":
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
