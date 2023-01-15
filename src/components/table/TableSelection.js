export class TableSelection {
  static activeClass = "selected";

  constructor() {
    this.group = [];
    this.current = null;
  }

  clear() {
    this.group.forEach((cell) => cell.removeClass(TableSelection.activeClass));
    this.group = [];
  }

  select($el) {
    this.clear();
    this.current = $el;
    this.group.push(this.current);
    this.current.focus().addClass(TableSelection.activeClass);
  }

  ctrlSelect($el) {
    this.group.push($el);
    $el.addClass(TableSelection.activeClass);
  }

  shiftSelect(group = []) {
    this.clear();
    this.group = group;
    this.group.forEach((el) => el.addClass(TableSelection.activeClass));
  }
}
