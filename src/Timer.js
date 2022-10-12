export class Timer {
  time = null;
  timer = null;
  finished = null;
  start = null;
  callback = null;

  setTimeout(callback, time) {
    let self = this;
    if (this.timer) clearTimeout(this.timer); 
    this.finished = false;
    this.callback = callback;
    this.time = time;
    this.timer = setTimeout(() => {
      self.finished = true;
      callback();
    }, time);
    this.start = Date.now();
  }

  add(time) {
    if (!this.finished) {
      time = this.time - (Date.now() - this.start) + time;
      this.setTimeout(this.callback, time);
    }
  }

  isStarted() {
    return this.timer != null;
  }
}