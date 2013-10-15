(function ($) {
  // Original code: https://gist.github.com/desyncr/4640648
  // See: http://learn.jquery.com/events/event-extensions/

  // alternative: http://benalpert.com/2013/06/18/a-near-perfect-oninput-shim-for-ie-8-and-9.html
  // alternative: https://github.com/facebook/react/blob/master/src/eventPlugins/ChangeEventPlugin.js
  var textchange = $.event.special.textchange = {

    setup: function (data, namespaces) {
      $(this).data('lastValue', this.contentEditable === 'true' ? $(this).html() : $(this).val());
      $(this).on('keyup.textchange propertychange.textchange', textchange.handler);
      $(this).on('cut.textchange paste.textchange input.textchange', textchange.delayedHandler);
    },

    teardown: function (namespaces) {
      $(this).off('.textchange');
    },

    handler: function (event) {
      textchange.triggerIfChanged($(this), event);
    },

    delayedHandler: function (event) {
      var element = $(this);
      setTimeout(function () {
        textchange.triggerIfChanged(element, event);
      }, 0);
    },

    triggerIfChanged: function (element, event) {
      var current = element[0].contentEditable === 'true' ? element.html() : element.val();
      if (current !== element.data('lastValue') || event.type === 'paste') {
        element.trigger('textchange',  [element.data('lastValue')]);
        element.data('lastValue', current);
      }
    }
  };

}(jQuery));