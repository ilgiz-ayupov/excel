import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options) {
    super($root, options?.listeners);
    this.name = this.constructor.name;
  }

  toHTML() {
    return "";
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListeners();
  }
}
