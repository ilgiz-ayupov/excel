import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options) {
    super($root, options?.listeners);
    this.name = this.constructor.name;
    this.observer = options.observer;
    this.unsubscribers = [];

    this.preparer();
  }

  toHTML() {
    return "";
  }

  preparer() {}

  init() {
    this.initDomListeners();
  }

  $createSubscribe(eventName, ...args) {
    this.observer.dispatch(eventName, ...args);
  }

  $onSubscribe(eventName, fn) {
    const unsub = this.observer.subscribe(eventName, fn);
    this.unsubscribers.push(unsub);
  }

  destroy() {
    this.removeDomListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
