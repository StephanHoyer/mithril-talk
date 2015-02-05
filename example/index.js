(function() {

function header() {
  return m('header', [
    m('h1', 'todos'),
    m('input#new-todo', {
      placeholder: 'What needs to be done?',
      autofocus: ''
    })
  ]);
}

function main() {
  return m('main', [
    m('input#toggle-all[type=checkbox]'),
    m('label', {
      for: 'toggle-all'
    }, 'Mark all as complete'),
    m('ul#todo-list', [
      m('li', [
        m('.view', [
          m('input.toggle', {
            type: 'checkbox'
          }),
          m('label', 'learn mithril'),
          m('button.destroy')
        ]),
        m('input.edit', {
          value: 'learn mithril'
        })
      ])
    ])
  ]);
}

function footer() {
  return m('footer#footer', [
    m('span#todo-count', [m('strong', 1), 'item left']),
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

var todos = {
  controller: function() {
  },
  view: function() {
    return [
      header(),
      main(),
      footer(),
    ];
  }
};

m.route(document.getElementById('todoapp') , '/', {
  '/': todos
});

}());
