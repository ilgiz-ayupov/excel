/** Наблюдатель */
export class Observer {
  constructor() {
    this.subscribers = {};
  }

  dispatch(eventName, ...args) {
    if (!Array.isArray(this.subscribers[eventName])) {
      return false;
    }
    this.subscribers[eventName].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  subscribe(eventName, fn) {
    this.subscribers[eventName] = this.subscribers[eventName] || [];
    this.subscribers[eventName].push(fn);
    return () => {
      this.subscribers[eventName] = this.subscribe[eventName].filter(
        (listener) => listener !== fn
      );
    };
  }
}
