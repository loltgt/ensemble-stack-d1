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
  const Event = ensemble.Event;


  class base {

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

    selector(query, node, all = false) {
      node = Compo.isCompo(node) ? node.node : (node || document);
      return all ? node.querySelectorAll(query) : node.querySelector(query);
    }

    event(name, node) {
      node = Compo.isCompo(node) ? node.node : (node || document);
      return new Event(name, node);
    }

    timing(node, dtime = 3e2, prop = 'transitionDuration') {
      node = Compo.isCompo(node) ? node.node : node;
      let delay = window.getComputedStyle(node)[prop];

      if (delay != '') {
        delay = delay.indexOf('s') ? (parseFloat(delay) * 1e3) : parseInt(delay);
      } else {
        return parseInt(dtime);
      }

      return delay || parseInt(dtime);
    }

    // return undef
    appendNode(root, node) {
      node = Compo.isCompo(node) ? node.node : node;
      return Compo.isCompo(root) ? root.append(node) : root.appendChild(node);
    }

    // return undef
    prependNode(root, node) {
      node = Compo.isCompo(node) ? node.node : node;
      return Compo.isCompo(root) ? root.append(node) : root.prependChild(node);
    }

    // return undef
    removeNode(root, node) {
      node = Compo.isCompo(node) ? node.node : node;
      return Compo.isCompo(root) ? root.remove(node) : root.removeChild(node);
    }

    // return undef
    cloneNode(node, deep = false) {
      return Compo.isCompo(node) ? node.clone(deep) : node.cloneNode(deep);
    }

    // return undef
    hasAttr(node, attr) {
      return Compo.isCompo(node) ? node.hasAttr(attr) : node.hasAttribute(attr);
    }

    // return undef
    getAttr(node, attr) {
      return Compo.isCompo(node) ? node.getAttr(attr) : node.getAttribute(attr);
    }

    // return undef
    setAttr(node, attr, value) {
      return Compo.isCompo(node) ? node.setAttr(attr, value) : node.setAttribute(attr, value);
    }

    // return undef
    delAttr(node, attr) {
      return Compo.isCompo(node) ? node.delAttr(attr) : node.removeAttribute(attr);
    }

  }


  window.ensemble = { ...ensemble, ...{ base } };
  module.exports = base;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
