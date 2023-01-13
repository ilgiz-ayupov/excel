import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root) {
    super($root, {
      listeners: ["mousedown"],
    });
  }

  toHTML() {
    return createTable();
  }

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      resizeHandler(this.$root, $resizer);
    }
  }
}
