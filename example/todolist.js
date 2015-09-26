var todoList = {
    controller: function () {
        // we don't want to reinitialize the list on route changes
        if(typeof todoList.list === 'function'){
            this.list = todoList.list;
            return;
        }
        this.list = Todo.list();
        todoList.list = this.list; //expose the list as a static method on the component
    },
    view: function ( ctrl ) {
        return m( 'ul#todo-list', [
            ctrl.list().filter( function ( todo, index ) {
                // filters based on the active route
                return ( m.route() == '/completed' && todo.done() ) ||
                    ( m.route() == '/active' && !todo.done() ) ||
                    ( m.route() === '/' );
            } ).map( function ( item ) {
                return m.component( todo, item );
            } )
        ] );
    }
};
