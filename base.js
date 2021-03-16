/*!
 * loltgt ensemble.base
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

(function(window, module, require, ensemble) {

  ensemble = ensemble || require('../ensemble');

  const Compo = ensemble.Compo;
  const Data = ensemble.Data;
  const Event = ensemble.Event;


  class base {

    constructor() {
      if (! new.target) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }
    }

    defaults(defaults, options) {
      const j = {};

      for (const k in defaults) {
        if (defaults[k] != null && typeof defaults[k] === 'object') {
          j[k] = Object.assign(defaults[k], options[k]);
        } else {
          j[k] = typeof options[k] != 'undefined' ? options[k] : defaults[k];
        }
      }

      return j;
    }

    compo(tag, name, props) {
      return new Compo(this.options.ns, tag, name, props);
    }

    data(obj) {
      return new Data(this.options.ns, obj);
    }

    event(event, node, concurrency = true) {
      if (typeof event === 'string') {
        return new Event(this.options.ns, event, node);
      } else if (event) {
        event.preventDefault();
        event.target.blur();
      }
    }

    selector(query, node, all = false) {
      node = node || document;

      return all ? node.querySelectorAll(query) : node.querySelector(query);
    }

    // return bool
    appendNode(root, node) {
      return !! root.appendChild(node);
    }

    // return bool
    prependNode(root, node) {
      return !! root.prependChild(node);
    }

    // return bool
    removeNode(root, node) {
      return !! root.removeChild(node);
    }

    cloneNode(node, deep = false) {
      return node.cloneNode(deep);
    }

    hasAttr(node, attr) {
      return node.hasAttribute(attr);
    }

    getAttr(node, attr) {
      return node.getAttribute(attr);
    }

    // return undef
    setAttr(node, attr, value) {
      node.setAttribute(attr, value);
    }

    // return undef
    delAttr(node, attr) {
      node.removeAttribute(attr);
    }

    binds(method) {
      const self = this;

      return function(e) { method.call(self, e, this); }
    }

    delay(func, node, dtime) {
      const delay = node ? this.timing(node) : 0;

      setTimeout(func, delay || dtime);
    }

    timing(node, prop = 'transitionDuration') {
      let time = Compo.isCompo(node) ? node.getStyle(prop) : window.getComputedStyle(node)[prop];

      if (time) {
        time = time.indexOf('s') ? (parseFloat(time) * 1e3) : parseInt(time);
      }

      return time || 0;
    }

  }


  window.ensemble = { ...ensemble, ...{ base } };
  module.exports = base;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
