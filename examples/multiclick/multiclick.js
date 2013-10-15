(function ($) {
  // Original code: http://learn.jquery.com/events/event-extensions/

  $.event.special.multiclick = {
    delegateType: "click",
    bindType: "click",

    handle: function( event ) {
      var handleObj = event.handleObj;
      var targetData = jQuery.data(event.target);
      var ret = null;

      // If a multiple of the click count, run the handler
      targetData.clicks = ( targetData.clicks || 0 ) + 1;

      if ( targetData.clicks % event.data.clicks === 0 ) {
        event.type = handleObj.origType;
        ret = handleObj.handler.apply(this, arguments);
        event.type = handleObj.type;
        return ret;
      } else {

        clearTimeout(targetData.clickTimer);
        targetData.clickTimer = setTimeout(function() {
          targetData.clicks = 0;
        }, event.data.timeout || 500);
      }
    }
  };

}(jQuery));