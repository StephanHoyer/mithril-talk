var todoApp = {};

todoApp.controller = function(){
    this.completeAll = function(complete){
        if(!complete){
            return;
        }
        todoList.list().forEach(function(todo){
            todo.done(true);
        });
    };
};

todoApp.view = function (ctrl) {
    return [
        m.component( header ),
        m( 'section#main', [
            m( 'input#toggle-all[type=checkbox]', {
                onchange: m.withAttr('checked', ctrl.completeAll)
            } ),
            m( 'label', {
                for: 'toggle-all'
            }, 'Mark all as complete' ),
            m.component(todoList)
        ] ),
        m.component(footer)
    ];
};


m.route.mode = 'hash';
m.route(document.getElementById('todoapp') , '/', {
  '/': todoApp,
  '/active': todoApp,
  '/completed': todoApp
});
