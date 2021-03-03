/*!
 * loltgt ensemble.base
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

(function(ensemble) {

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
      // no ref to global
      return new globalThis.ensemble.Compo(this.options.ns, tag, name, props);
    }

    selector(query, node, all = false) {
      node = node && '__compo' in node ? node.node : (node || document);
      return all ? node.querySelectorAll(query) : node.querySelector(query);
    }

    event(name, node) {
      node = node && '__compo' in node ? node.node : (node || document);
      // no ref to global
      return new globalThis.ensemble.Event(name, node);
    }

    timing(node, dtime = 3e2, prop = 'transitionDuration') {
      node = node && '__compo' in node ? node.node : node;
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
      root = root && '__compo' in root ? root.node : root;
      node = node && '__compo' in node ? node.node : node;
      return root.appendChild(node);
    }

    // return undef
    prependNode(root, node) {
      root = root && '__compo' in root ? root.node : root;
      node = node && '__compo' in node ? node.node : node;
      return root.prependChild(node);
    }

    // return undef
    removeNode(root, node) {
      root = root && '__compo' in root ? root.node : root;
      node = node && '__compo' in node ? node.node : node;
      return root.removeChild(node);
    }

    // return undef
    cloneNode(node, deep = false) {
      return node && '__compo' in node ? node.clone(deep) : node.cloneNode(deep);
    }

    // return undef
    hasAttr(node, attr) {
      return node && '__compo' in node ? node.hasAttr(attr) : node.hasAttribute(attr);
    }

    // return undef
    getAttr(node, attr) {
      return node && '__compo' in node ? node.getAttr(attr) : node.getAttribute(attr);
    }

    // return undef
    setAttr(node, attr, value) {
      return node && '__compo' in node ? node.setAttr(attr, value) : node.setAttribute(attr, value);
    }

    // return undef
    delAttr(node, attr) {
      return node && '__compo' in node ? node.delAttr(attr) : node.removeAttribute(attr);
    }

  }


  globalThis.ensemble = { ...ensemble, ...{ base } };

}(globalThis.ensemble));
