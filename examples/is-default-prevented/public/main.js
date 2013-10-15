
var app = new Backbone.Marionette.Application();

app.addInitializer(function(options) {

  this.view = new AppView({
    el: '#app',
    messages: options.messages
  }).render();

  this.router = new Marionette.AppRouter({
    controller: this.view,
    appRoutes: {
      "": "routeFrontpage",
      "messages(/:id)": "routeMessages",
      '*notFound': 'routeNotFound'
    }
  });

  Backbone.history.start({
    pushState: true
  });

});
