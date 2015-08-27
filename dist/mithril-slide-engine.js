'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _mithrilResolver = require('mithril-resolver');

var qs = function qs(s) {
    var e = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
    return s ? e.querySelector(s) : e;
};

var computable = function computable(fn) {
    return function () {
        _mithrilResolver.m.startComputation();
        var result = fn.apply(undefined, arguments);
        _mithrilResolver.m.endComputation();
        return result;
    };
};

var engine = function engine() {
    var parseHash = function parseHash() {
        return parseInt(window.location.hash.slice(1)) || 0;
    };

    var slides = _mithrilResolver.m.prop([]),
        active = _mithrilResolver.m.prop(parseHash()),
        prev = _mithrilResolver.m.prop();

    var insert = computable(function (val, index) {
        if (val instanceof Function) val = { view: val };
        if (!val.controller) val.controller = function () {};

        if (typeof index === 'undefined') index = slides().length;

        var i = slides();
        var first = i.slice(0, index);
        var third = i.slice(index + 1);

        return slides([].concat(_toConsumableArray(first), [val], _toConsumableArray(third)));
    });

    var remove = computable(function (index) {
        var i = slides();
        var first = i.slice(0, index);
        var second = i.slice(index + 1);

        return slides([].concat(_toConsumableArray(first), _toConsumableArray(second)));
    });

    var navigate = function navigate(index) {
        window.location.hash = '#' + index;
        prev(active());
        return active(index);
    };

    var LEFT = 37,
        RIGHT = 39;

    var events = {
        onkeyup: function onkeyup(e) {
            var keyCode = e.keyCode;

            if (LEFT === keyCode) {
                var next = active() - 1;
                if (next < 0) next = slides().length - 1;
                navigate(next);
            } else if (RIGHT === keyCode) {
                var next = active() + 1;
                if (next > slides().length - 1) next = 0;
                navigate(next);
            }
        }
    };

    var config = function config(element, init, vdom) {
        if (active() === prev()) return;
    };

    var hashChanger = function hashChanger() {
        return window.addEventListener('hashchange', function () {
            var hash = window.location.hash;
            var slide = parseInt(hash.slice(1));
            if (slide !== NaN) {
                navigate(slide);
            }
        });
    };

    var valueOf = function valueOf(a) {
        return a();
    };

    var view = function view(ctrl) {
        var a = active(),
            s = slides(),
            sel = active() < prev() && 'from-left' || active() > prev() && 'from-right' || '';

        var _slide = (0, _mithrilResolver.m)('div', { key: a, className: sel }, s[a]);

        return (0, _mithrilResolver.m)('html', { config: config }, [(0, _mithrilResolver.m)('head', [(0, _mithrilResolver.m)('title', 'something'), (0, _mithrilResolver.m)('meta', { name: 'viewport', content: "width=device-width, initial-scale=1.0" }), (0, _mithrilResolver.m)('link', { href: './style.css', type: 'text/css', rel: 'stylesheet' })]), (0, _mithrilResolver.m)('body', events, [(0, _mithrilResolver.m)('.slides', _slide)])]);
    };

    var render = function render() {
        return (hashChanger(), _mithrilResolver.m.mount(qs.apply(undefined, arguments), { view: view }));
    };

    return { slides: slides, insert: insert, remove: remove, navigate: navigate, render: render };
};

exports.engine = engine;
exports.resolver = _mithrilResolver.resolver;
exports.container = _mithrilResolver.container;
exports.m = _mithrilResolver.m;

