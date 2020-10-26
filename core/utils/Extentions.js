Object.defineProperty(Array.prototype, 'first', {
  get() {
    return this[0];
  },
  enumerable: false
});

Object.defineProperty(Array.prototype, 'last', {
  get() {
    return this[this.length - 1];
  },
  enumerable: false
});

Date.prototype.getUnixTime = function() {
  return (this.getTime() / 1000) | 0;
};

if (!Date.now)
  Date.now = function() {
    return new Date();
  };

Date.time = function() {
  return Date.now().getUnixTime();
};
