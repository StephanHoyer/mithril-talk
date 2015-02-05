(function() {

var todos = {
  controller: function() {
  },
  view: function() {
    return 'huhu';
  }
};

m.route(document.getElementById('todoapp') , '/', {
  '/': todos
});

}());
