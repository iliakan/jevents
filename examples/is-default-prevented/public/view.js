
var MessageShortView = Marionette.ItemView.extend({
  template: '#message-short-template',
  className: "list-group-item",
  attributes: function() {
    return { "data-message-id" : this.model.id };
  }
});

var MessageFullView = Marionette.ItemView.extend({
  template: '#message-full-template'
});

var MessagesListView = Marionette.CollectionView.extend({
  itemView: MessageShortView,
  className: "messages-list list-group"
});


var MessagesView = Marionette.Layout.extend({
  template: '#messages-template',

  events: {
    'click .messages-list a': 'onMessageNavigate'
  },

  onMessageNavigate: function(event) {
    var id = $(event.target).closest('[data-message-id]').data('messageId');
    if (!id) return;
    this.collection.setSelected(this.collection.get(id));
    event.preventDefault();
  },

  regions: {
    messagesList: '#messages-list',
    messageSelected: '#message-selected'
  },

  render: function() {

    var result = Marionette.ItemView.prototype.render.apply(this, arguments);

    this.messagesList.show(new MessagesListView({
      collection: this.collection
    }));

    this.renderSelected();

    this.listenTo(this.collection, 'select', this.renderSelected);

    return result;
  },

  renderSelected: function() {
    if (this.collection.selected) {
      this.messageSelected.show(new MessageFullView({
        model: this.collection.selected
      }));
    } else {
      this.messageSelected.close();
    }
  }

});


var FrontPageView = Marionette.ItemView.extend({
  template: "#frontpage-template"
});

var AppView = Marionette.Layout.extend({
  template: '#app-template',

  constructor: function(options) {
    Marionette.Layout.prototype.constructor.apply(this, arguments);
    this.messages = options.messages;
  },

  events: {
    'click a': "onNavigate"
  },

  regions: {
    main: '#main'
  },

  onNavigate: function(event) {
    if (event.isDefaultPrevented()) return;

    app.router.navigate(event.target.getAttribute('href'), true);
    event.preventDefault();
  },

  routeFrontpage: function() {
    this.main.show(new FrontPageView());
  },

  routeMessages: function(id) {

    this.messages.setSelected(id ? messages.get(id) : null);

    this.main.show(new MessagesView({
      collection: this.messages
    }));

  },

  routeNotFound: function(path) {
    if (Backbone.history.started) {
      // the app was fully successfully loaded
      location.href = path;
    } else {
      // the app was opened with the wrong url
      // don't redirect to same URL which would lead to loop
      alert("Page not found: " + path);
      location.href = '/';
    }
  }
});
