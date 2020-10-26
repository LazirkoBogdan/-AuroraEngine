/**
 * Config main class
 * @exports Signal
 */
export default class Signal {
  /**
   * The scope id counter
   * @private
   * @static
   */
  static _scopeId = 0;

  /**
   * The listeners list
   * @type {LinkedList}
   * @private
   */
  _listeners = null;

  /**
   * The listeners to change
   * @type {Object[]}
   * @private
   */
  _changeListeners = null;

  /**
   * The change listener index, saves emptying the array data
   * @type {Number}
   * @private
   */
  _changeIndex = 0;

  /**
   * The stored listeners, saved on GC
   * @type {Object}
   * @private
   */
  _storedListeners = null;

  /**
   * Whether this is currently dispatching
   * @type {Boolean}
   * @private
   */
  _dispatching = false;

  /**
   * The dispatches to run, used to handle situations where a signal is dispatched inside a dispatch call
   * @type {Object[]}
   * @private
   */
  _dispatches = null;

  /**
   * The index of the current dispatch
   * @type {Number}
   * @private
   */
  _dispatchIndex = 0;

  /**
   * The total number of dispatches to process
   * @type {Number}
   * @private
   */
  _dispatchCount = 0;

  constructor() {
    this._listeners = new core.list.LinkedList();
    this._changeListeners = [];
    this._storedListeners = {};
    this._dispatches = [];
  }

  /**
   * Add a listener
   * @param {String} method The method to call
   * @param {Object} scope The scope to use
   * @param {Boolean} [once] Whether to remove the listener after dispatching
   */
  add(method, scope, once) {
    // Get the scope id
    let scopeId = scope.__signalId;
    if (scopeId === undefined) {
      scopeId = scope.__signalId = Signal._scopeId++;
    }

    // Get or create the listener
    let storedListeners = this._storedListeners;
    let stored = storedListeners[scopeId];

    if (stored == null) {
      stored = storedListeners[scopeId] = {};
    }

    let listenerData = stored[method];

    if (listenerData == null) {
      listenerData = stored[method] = {
        method: method,
        scope: scope,
        active: false,
        once: once,
        willOnce: false,
        willRemove: false,
        willAdd: false
      };
    }

    // Add the listener
    if (this._dispatching) {
      if (!listenerData.willAdd) {
        if (!listenerData.willRemove) {
          this._changeListeners[this._changeIndex++] = listenerData;
        }

        listenerData.willOnce = once;
        listenerData.willAdd = true;
        listenerData.willRemove = false;
      }
    } else if (!listenerData.active) {
      listenerData.active = true;
      listenerData.once = once;
      listenerData.willAdd = false;
      listenerData.willRemove = false;

      this._listeners.add(listenerData);
    }
  }

  /**
   * Add a listener and remove it after dispatching
   * @param {String} method The method to call
   * @param {Object} scope The scope to use
   */
  addOnce(method, scope) {
    this.add(method, scope, true);
  }

  /**
   * Remove a listener
   * @param {String} method The method to remove
   * @param {Object} scope The scope to remove
   */
  remove(method, scope) {
    let scopeId = scope.__signalId;

    if (scopeId !== undefined) {
      // Get the listener
      let stored = this._storedListeners[scopeId];
      let listenerData = null;

      if (stored != null) {
        listenerData = stored[method];

        // Remove the listener
        if (listenerData != null) {
          if (this._dispatching) {
            if (!listenerData.willRemove) {
              if (!listenerData.willAdd) {
                this._changeListeners[this._changeIndex++] = listenerData;
              }

              listenerData.willAdd = false;
              listenerData.willRemove = true;
            }
          } else if (listenerData.active) {
            listenerData.active = false;
            listenerData.willAdd = false;
            listenerData.willRemove = false;

            this._listeners.remove(listenerData);
          }
        }
      }
    }
  }

  /**
   * Dispatch the signal
   * @param {*} ... The arguments to pass
   */
  dispatch(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9) {
    if (this._dispatching) {
      // Add to the dispatches count if there is a dispatch required
      let count = this._dispatchCount++;

      let dispatches = (this._dispatches[count] =
        this._dispatches[count] || []);
      dispatches[0] = arg1;
      dispatches[1] = arg2;
      dispatches[2] = arg3;
      dispatches[3] = arg4;
      dispatches[4] = arg5;
      dispatches[5] = arg6;
      dispatches[6] = arg7;
      dispatches[7] = arg8;
      dispatches[8] = arg9;
    } else {
      let listeners = this._listeners;

      if (listeners.first != null) {
        // Set up to dispatch
        if (this._dispatchCount == 0) {
          this._dispatchIndex = 0;
        }

        this._changeIndex = 0;
        this._dispatching = true;
        let listener, next;

        // Call the bindings
        for (
          listener = listeners.first, next = null;
          listener != null;
          listener = next
        ) {
          next = listener.llNext;

          // Handle the addOnce listeners
          if (listener.once) {
            listener.active = false;
            listeners.remove(listener);
          }

          listener.scope[listener.method](
            arg1,
            arg2,
            arg3,
            arg4,
            arg5,
            arg6,
            arg7,
            arg7,
            arg9
          );
          //listener.binding(arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg7, arg9);
        }

        // Handle any changes since dispatching
        for (let i = 0, j = this._changeIndex; i < j; ++i) {
          listener = this._changeListeners[i];

          if (listener.willAdd) {
            listener.once = listener.willOnce;
            listener.willAdd = false;
            listener.willRemove = false;

            if (!listener.active) {
              listener.active = true;
              listeners.add(listener);
            }
          } else {
            listener.willAdd = false;
            listener.willRemove = false;

            if (listener.active) {
              listener.active = false;
              listeners.remove(listener);
            }
          }
        }

        this._dispatching = false;

        // This happens inside the listener check because the sequence will end anyway
        if (this._dispatchIndex < this._dispatchCount) {
          let dispatch = this._dispatches[this._dispatchIndex++];
          this.dispatch(
            dispatch[0],
            dispatch[1],
            dispatch[2],
            dispatch[3],
            dispatch[4],
            dispatch[5],
            dispatch[6],
            dispatch[7],
            dispatch[8]
          );
        } else {
          // We have completed dispatching
          this._dispatchIndex = 0;
          this._dispatchCount = 0;
        }
      } else {
        this._dispatchIndex = 0;
        this._dispatchCount = 0;
      }
    }
  }

  /**
   * This needs changing
   * @ignore
   */
  removeAll() {
    this._listeners = new core.list.LinkedList();
    this._changeListeners = [];
    this._storedListeners = {};

    this._dispatches = [];
  }

  /**
   * Clear the stored listeners
   * @ignore
   */
  clearStored() {
    // Add this
  }
}
