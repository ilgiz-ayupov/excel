import { $ } from "@core/dom";
import { ExcelComponent } from "@core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      listeners: ["input", "keydown"],
      ...options,
    });
  }

  toHTML() {
    return `
      <div class="excel__formula-info">fx</div>
      <div
        data-type="formula"
        class="excel__formula-input"
        contenteditable
        spellcheck="false"
      ></div>
    `;
  }

  init() {
    super.init();

    const $formula = this.$root.find('[data-type="formula"]');
    this.$onSubscribe("table:select", (content) => {
      $formula.text(content);
    });

    this.$onSubscribe("table:input", (content) => {
      $formula.text(content);
    });
  }

  onInput(event) {
    const $formula = $(event.target);
    this.$createSubscribe("formula:input", $formula.text());
  }

  onKeydown(event) {
    const keys = ["Enter", "Tab"];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$createSubscribe("formula:done");
    }
  }
}
