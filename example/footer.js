var footer = {};

var undone = function(todo){
    return !todo.done();
};

footer.controller = function(){
    this.countUndone = function(){
        return todoList.list().filter(undone).length;
    };
};

footer.view = function(ctrl){
    var undone = ctrl.countUndone();
    return m('footer#footer', [
      m('span#todo-count', [m('strong', undone), undone === 1 ? ' item' : ' items', ' left']),
      m('ul#filters', [
        m('li', m('a', {
          href: '/',
          config: m.route,
          className: m.route() == '/' ? 'selected' : ''
        }, 'All')),
        m('li', m('a', {
          href: '/active',
          config: m.route,
          className: m.route() == '/active' ? 'selected' : ''
        }, 'Active')),
        m('li', m('a', {
          href: '/completed',
          config: m.route,
          className: m.route() == '/completed' ? 'selected' : ''
        }, 'Completed')),
      ])
    ]);
};
