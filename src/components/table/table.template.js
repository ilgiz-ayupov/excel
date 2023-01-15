const CODES = {
  A: 65,
  Z: 90,
};

export function createTable(rowsCount = 15) {
  const rows = [];
  rows.push(createTitles());

  for (let row = 0; row < rowsCount + 1; row++) {
    rows.push(createRow(row));
  }
  return rows.join("");
}

function createTitles() {
  const toChar = (_, index) => String.fromCharCode(CODES.A + index);

  const colsCount = CODES.Z - CODES.A + 1;
  const titles = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(toColumn)
    .join("");
  return toRow(titles);
}

function createRow(row) {
  const colsCount = CODES.Z - CODES.A + 1;
  const cols = new Array(colsCount).fill("").map(toCell(row)).join("");
  return toRow(cols, row + 1);
}

const toRow = (content, number = "") =>
  `
    <div class="excel__table-row" data-type="resizable">
      <div class="excel__table-number">
        ${number}
        ${number >= 1 ? '<div class="row-resize" data-resize="row"></div>' : ""}
      </div>
      <div class="excel__table-data">
        ${content}
      </div>
    </div>
`;

const toColumn = (content, index) =>
  `
  <div class="excel__table-column" data-type="resizable" data-col="${index}">
    ${content}
    <div class="col-resize" data-resize="column"></div>
  </div>`;

const toCell = (row) => (_, col) =>
  `<div 
    class="excel__table-cell" 
    contenteditable 
    data-type="cell"
    data-col="${col}"
    data-id="${row}:${col}"
  ></div>`;
