/**
 * Used for events and reels
 * @class core.LinkedList
 * @summary A linked list
 */
export default class LinkedList {
  /**
   * The first node in the list
   * @type {Object}
   */
  first = null;

  /**
   * The last node in the list
   * @type {Object}
   */
  last = null;

  constructor() {}
  /**
   * Add an item to the list
   * @param {Object} node The item to add to the list
   * @param {Boolean} start Whether to add the item to the start
   */
  add(node, start) {
    let first = this.first;

    if (first == null) {
      this.first = this.last = node;
      node.llNext = node.llPrevious = null;
    } else if (start) {
      node.llNext = first;
      node.llPrevious = null;
      this.first = first.llPrevious = node;
    } else {
      let last = this.last;

      node.llNext = null;
      node.llPrevious = last;
      this.last = last.llNext = node;
    }
  }

  /**
   * Add an item to the list before or after a target
   * @param {Object} node The item to add to the list
   * @param {Object} target The target item to reference
   * @param {Boolean} before Whether to add the item before or after the target
   */
  addAt(node, target, before) {
    if (before) {
      let previous = target.llPrevious;
      node.llNext = target;
      node.llPrevious = previous;
      target.llPrevious = node;

      if (previous == null) {
        this.first = node;
      } else {
        previous.llNext = node;
      }
    } else {
      node.llNext = target.llNext;
      node.llPrevious = target;
      target.llNext = node;

      if (node.llNext == null) {
        this.last = node;
      }
    }
  }

  /**
   * Remove an item from the list
   * @param {Object} node The item to remove from the list
   */
  remove(node) {
    let next = node.llNext;
    let previous = node.llPrevious;
    node.llNext = node.llPrevious = null;

    if (next != null) {
      next.llPrevious = previous;
    }

    if (previous != null) {
      previous.llNext = next;
    }

    if (this.first == node) {
      this.first = next;
    }

    if (this.last == node) {
      this.last = previous;
    }
  }

  /**
   * Clear the list
   */
  clear() {
    this.first = this.last = null;
  }

  /**
   * Iterate the list calling a function
   * @param {Function} func The function to call
   */
  forEach(func) {
    for (let node = this.first; node != null; node = node.llNext) {
      func(node);
    }
  }
}
