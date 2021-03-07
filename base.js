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
        return new Event(event, node);
      } else if (event) {
        event.preventDefault();
        event.target.blur();
      }
    }

    selector(query, node, all = false) {
      node = node || document;

      return all ? node.querySelectorAll(query) : node.querySelector(query);
    }

    //TODO
    // direct access to node
    // return bool
    allocMethod(mfix, root, node) {
      const _ns = '_' + this.options.ns;
      const root_isCompo = Compo.isCompo(root);
      const node_isCompo = Compo.isCompo(node);

      if (root_isCompo && node_isCompo) {
        return root[mfix](node[_ns]);
      } else if (root_isCompo) {
        return !! root[_ns][mfix + 'Child'](node);
      } else if (node_isCompo) {
        return root[mfix + 'Child'](node[_ns]);
      }

      return root[mfix + 'Child'](node);
    }

    // return bool
    appendNode(root, node) {
      return this.allocMethod('append', root, node);
    }

    // return bool
    prependNode(root, node) {
      return this.allocMethod('prepend', root, node);
    }

    // return bool
    removeNode(root, node) {
      return this.allocMethod('remove', root, node);
    }

    cloneNode(node, deep = false) {
      return Compo.isCompo(node) ? node.clone(deep) : node.cloneNode(deep);
    }

    hasAttr(node, attr) {
      return Compo.isCompo(node) ? node.hasAttr(attr) : node.hasAttribute(attr);
    }

    getAttr(node, attr) {
      return Compo.isCompo(node) ? node.getAttr(attr) : node.getAttribute(attr);
    }

    // return undef
    setAttr(node, attr, value) {
      Compo.isCompo(node) ? node.setAttr(attr, value) : node.setAttribute(attr, value);
    }

    // return undef
    delAttr(node, attr) {
      Compo.isCompo(node) ? node.delAttr(attr) : node.removeAttribute(attr);
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
