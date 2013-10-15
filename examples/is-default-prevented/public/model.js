var Message = Backbone.Model.extend({});

var Messages = Backbone.Collection.extend({
  model: Message,

  setSelected: function(message) {
    if (this.selected) {
      this.selected.set({selected: false});
    }
    this.selected = message;
    if (message) {
      message.set({selected: true});
      this.trigger('select', message);
    }
  }
});
