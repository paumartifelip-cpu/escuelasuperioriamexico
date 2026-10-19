/* Portada: resumen del programa a partir del catálogo (js/data.js). */
(function () {
  'use strict';

  var COURSES = window.ESIA_COURSES || [];
  var statsEl = document.getElementById('program-stats');
  var listEl = document.getElementById('program-list');
  if (!statsEl || !listEl) return;

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') node.className = attrs[k];
      else if (k === 'text') node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function plural(n, one, many) { return n + ' ' + (n === 1 ? one : many); }

  var modules = 0;
  var lessons = 0;
  COURSES.forEach(function (c) {
    modules += c.modules.length;
    c.modules.forEach(function (m) { lessons += m.videos.length; });
  });

  [[COURSES.length, 'cursos'], [modules, 'módulos'], [lessons, 'lecciones en vídeo']].forEach(function (s) {
    statsEl.appendChild(el('div', {}, [
      el('dt', { text: s[1] }),
      el('dd', { text: String(s[0]) })
    ]));
  });

  COURSES.forEach(function (c, i) {
    var count = c.modules.reduce(function (sum, m) { return sum + m.videos.length; }, 0);
    listEl.appendChild(el('li', { class: 'program-item' }, [
      el('span', { class: 'program-num', 'aria-hidden': 'true', text: String(i + 1) }),
      el('div', { class: 'program-body' }, [
        el('p', { class: 'eyebrow', text: 'Curso ' + (i + 1) + ' · ' + c.level }),
        el('h3', { class: 'program-title', text: c.title }),
        el('p', { class: 'program-desc', text: c.desc }),
        el('ul', { class: 'program-modules' }, c.modules.map(function (m) {
          return el('li', { text: m.title });
        })),
        el('p', { class: 'program-meta', text: plural(c.modules.length, 'módulo', 'módulos') + ' · ' + plural(count, 'lección', 'lecciones') })
      ])
    ]));
  });
})();
