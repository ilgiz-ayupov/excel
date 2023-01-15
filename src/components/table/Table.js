import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";


import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { TableSelection } from "./TableSelection";
import { isCell, shouldResize, matrix, nextSelector } from "./table.functions";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      listeners: ["mousedown", "click", "input", "keydown"],
      ...options,
    });
  }

  toHTML() {
    return createTable();
  }

  preparer() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="1:0"]');
    this.selection.select($cell);

    this.$onSubscribe("formula:input", (text) => {
      this.selection.current.text(text);
    });

    this.$onSubscribe("formula:done", () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.$createSubscribe("table:select", $cell.text());
    this.selection.select($cell);
  }

  onClick(event) {
    if (isCell(event)) {
      const $cell = $(event.target);
      if (event.ctrlKey) {
        this.selection.ctrlSelect($cell);
      } else if (event.shiftKey) {
        const cells = matrix(this.selection.current, $cell, this.$root);
        this.selection.shiftSelect(cells);
      } else {
        this.selectCell($cell);
      }
    }
  }

  onInput(event) {
    const $cell = $(event.target);
    this.$createSubscribe("table:input", $cell.text());
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      const $resizer = $(event.target);
      resizeHandler(this.$root, $resizer);
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
    ];
    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const current = this.selection.current.id(true);
      const $next = this.$root.find(nextSelector(key, current));

      this.selectCell($next);
    }
  }
}
