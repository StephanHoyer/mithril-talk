(function() {

function headerView(scope) {
  return m('header', [
    m('h1', 'todos'),
    m('input#new-todo', {
      placeholder: 'What needs to be done?',
      autofocus: '',
      oninput: scope.onInput,
      onkeypress: scope.submitOnEnter,
      value: scope.newTodo.label
    })
  ]);
}

function todoView(todo, scope) {
  var classNames = ['li'];
  if (todo.done) {
    classNames.push('completed');
  }
  if (todo.isEditing) {
    classNames.push('editing');
  }
  return m(classNames.join('.'), [
    m('.view', [
      m('input.toggle', {
        type: 'checkbox',
        onchange: scope.updateDoneState(todo)
      }),
      m('label', {
        ondblclick: function() {
          todo.isEditing = true;
        }
      }, todo.label),
      m('button.destroy', {
        onclick: scope.remove(todo)
      })
    ]),
    m('input.edit', {
      value: todo.label,
      oninput: scope.updateLabel(todo),
      onkeypress: scope.leaveEditModeOnEnter(todo)
    })
  ]);
}

function mainView(scope) {
  return m('section#main', [
    m('input#toggle-all[type=checkbox]'),
    m('label', {
      for: 'toggle-all'
    }, 'Mark all as complete'),
    m('ul#todo-list', scope.todos.map(function(todo) {
      return todoView(todo, scope);
    }))
  ]);
}

function footerView(scope) {
  return m('footer#footer', [
    m('span#todo-count', [m('strong', scope.countUndone), scope.countUndone === 1 ? ' item' : ' items', ' left']),
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
}

function undone(todo) {
  return !todo.done;
}

var todos = [{
  label: 'learn mithril!',
  done: false
}, {
  label: 'relax!',
  done: false
}];


var todoModule = {
  controller: function() {
    var scope = {};
    scope.__defineGetter__('todos', function() {
      return todos.filter(function(todo) {
        return (m.route() == '/completed' && todo.done) ||
            (m.route() == '/active' && !todo.done) ||
            (m.route() === '/');
      });
    });
    scope.newTodo = { label: '', done: false };

    scope.saveTodo = function() {
      if (!scope.newTodo.label) {
        return;
      }
      todos.push(scope.newTodo);
      scope.newTodo = { label: '', done: false };
    };

    scope.__defineGetter__('countUndone', function() {
      return scope.todos.filter(undone).length;
    });

    scope.onInput = function(event) {
      scope.newTodo.label = event.target.value;
    };

    scope.submitOnEnter = function(event) {
      if (event.keyCode === 13) {
        scope.saveTodo();
      }
    };

    scope.leaveEditModeOnEnter = function(todo) {
      return function(event) {
        if (event.keyCode === 13) {
          todo.isEditing = false;
        }
      };
    };

    scope.updateLabel = function(todo) {
      return function(event) {
        todo.label = event.target.value;
      };
    };

    scope.updateDoneState = function(todo) {
      return function(event) {
        todo.done = event.target.checked;
      };
    };

    scope.remove = function(todo) {
      return function(event) {
        todos.splice(todos.indexOf(todo), 1);
      };
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

m.route.mode = 'hash';
m.route(document.getElementById('todoapp') , '/', {
  '/': todoModule,
  '/active': todoModule,
  '/completed': todoModule
});

}());
