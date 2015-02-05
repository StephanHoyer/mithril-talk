(function() {

function headerView(scope) {
  return m('header', [
    m('h1', 'todos'),
    m('input#new-todo', {
      placeholder: 'What needs to be done?',
      autofocus: ''
    })
  ]);
}

function todoView(todo) {
  return m('li', [
    m('.view', [
      m('input.toggle', {
        type: 'checkbox'
      }),
      m('label', todo.label),
      m('button.destroy')
    ]),
    m('input.edit', {
      value: 'learn mithril'
    })
  ]);
}

function mainView(scope) {
  return m('main', [
    m('input#toggle-all[type=checkbox]'),
    m('label', {
      for: 'toggle-all'
    }, 'Mark all as complete'),
    m('ul#todo-list', scope.todos.map(todoView))
  ]);
}

function footerView(scope) {
  return m('footer#footer', [
    m('span#todo-count', [m('strong', scope.countUndone), scope.countUndone === 1 ? ' item' : ' items', ' left']),
    m('ul#filters', [
      m('li', m('a.selected', {
        href: '/'
      }, 'All')),
      m('li', m('a', {
        href: '/active'
      }, 'Active')),
      m('li', m('a', {
        href: '/completed'
      }, 'Completed')),
    ])
  ]);
}

function undone(todo) {
  return !todo.done;
}

var todos = {
  controller: function() {
    var scope = {
      todos: [{
        label: 'learn mithril!',
        done: false
      }, {
        label: 'relax!',
        done: false
      }],
      get countUndone() {
        return scope.todos.filter(undone).length;
      }
    };
    return scope;
  },
  view: function(scope) {
    return [
      headerView(scope),
      mainView(scope),
      footerView(scope),
    ];
  }
};

m.route(document.getElementById('todoapp') , '/', {
  '/': todos
});

}());
