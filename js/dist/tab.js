function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-beta.2): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Tab = function ($) {
  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */
  var NAME = 'tab';
  var VERSION = '4.0.0-beta.2';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var Event = {
    HIDE: "hide" + EVENT_KEY,
    HIDDEN: "hidden" + EVENT_KEY,
    SHOW: "show" + EVENT_KEY,
    SHOWN: "shown" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
    SCROLL: "scroll" + EVENT_KEY,
    // @goorm: add
    RESIZE: "resize" + EVENT_KEY // @goorm: add

  };
  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show',
    PREV: 'prev',
    // @goorm: add
    NEXT: 'next',
    // @goorm: add
    INVISIBLE: 'invisible' // @goorm: add

  };
  var Selector = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active',
    TAB_SCROLL_BTN: '.tab-scroller .btn',
    // @goorm: add
    TAB_SCROLL_PREV: '.tab-scroller.prev',
    // @goorm: add
    TAB_SCROLL_NEXT: '.tab-scroller.next',
    // @goorm: add
    TAB_SCROLL_NAV: '.tab-scroll .nav' // @goorm: add

    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // getters


    var _proto = Tab.prototype;

    // public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = $(selector)[0];
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    };
    /* @goorm: add function */


    _proto.scrollTo = function scrollTo() {
      var tabScroller = $(this._element.parentNode);
      var listElement = tabScroller.siblings(Selector.NAV_LIST_GROUP)[0];

      if (listElement) {
        if (tabScroller.hasClass(ClassName.PREV)) {
          listElement.scrollLeft = 0;
          tabScroller.siblings(Selector.TAB_SCROLL_NEXT).removeClass(ClassName.INVISIBLE);
        } else if (tabScroller.hasClass(ClassName.NEXT)) {
          listElement.scrollLeft = listElement.scrollWidth;
          tabScroller.siblings(Selector.TAB_SCROLL_PREV).removeClass(ClassName.INVISIBLE);
        }

        tabScroller.addClass(ClassName.INVISIBLE);
      }
    };
    /* @goorm: add function */


    _proto.scroll = function scroll() {
      var prevButton = $(this._element).siblings(Selector.TAB_SCROLL_PREV);
      var nextButton = $(this._element).siblings(Selector.TAB_SCROLL_NEXT);

      if (this._element.scrollLeft === 0) {
        nextButton.removeClass(ClassName.INVISIBLE);
        prevButton.addClass(ClassName.INVISIBLE);
      } else if (this._element.scrollLeft === this._element.scrollWidth - this._element.clientWidth) {
        prevButton.removeClass(ClassName.INVISIBLE);
        nextButton.addClass(ClassName.INVISIBLE);
      } else {
        prevButton.removeClass(ClassName.INVISIBLE);
        nextButton.removeClass(ClassName.INVISIBLE);
      }
    };
    /* @goorm: add function */


    _proto.resize = function resize() {
      var self = this;
      $(Selector.TAB_SCROLL_NAV).each(function () {
        if (this.clientWidth < this.scrollWidth) {
          Tab._jQueryInterface.call($(this), 'scroll');
        } else {
          $(this).siblings().addClass(ClassName.INVISIBLE);
        }
      });
    }; // private


    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements;

      if (container.nodeName === 'UL') {
        activeElements = $(container).find(Selector.ACTIVE_UL);
      } else {
        activeElements = $(container).children(Selector.ACTIVE);
      }

      var active = activeElements[0];
      var isTransitioning = callback && Util.supportsTransitionEnd() && active && $(active).hasClass(ClassName.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, isTransitioning, callback);
      };

      if (active && isTransitioning) {
        $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      } else {
        complete();
      }

      if (active) {
        $(active).removeClass(ClassName.SHOW);
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
      if (active) {
        $(active).removeClass(ClassName.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      if (isTransitioning) {
        Util.reflow(element);
        $(element).addClass(ClassName.SHOW);
      } else {
        $(element).removeClass(ClassName.FADE);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];

        if (dropdownElement) {
          $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    }; // static


    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new Error("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  })
  /* @goorm: add event */
  .on(Event.CLICK_DATA_API, Selector.TAB_SCROLL_BTN, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'scrollTo');
  })
  /* @goorm: add event */
  .ready(function (event) {
    $(Selector.TAB_SCROLL_NAV).on(Event.SCROLL, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($(this), 'scroll');
    });

    Tab._jQueryInterface.call($(Selector.TAB_SCROLL_NAV), 'resize');
  });
  /* @goorm: add event */

  $(window).on(Event.RESIZE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'resize');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
}($);
//# sourceMappingURL=tab.js.map