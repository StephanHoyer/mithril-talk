var todoList = {
    controller: function () {
        this.list = todoList.list;
        // we don't want to reinitialize the list on route changes
        if ( todoList.list().length ) {
            return;
        }
        this.list = m.prop( [] );
        Todo.list()
            .then( todoList.list );
    },
    list: m.prop( [] ),
    view: function ( ctrl ) {
        return m( 'ul#todo-list', [
            ctrl.list().filter( function ( todo, index ) {
                // filters based on the active route
                return ( m.route() == '/completed' && todo.done() ) ||
                    ( m.route() == '/active' && !todo.done() ) ||
                    ( m.route() === '/' );
            } ).map( function ( _todo ) {
                return m.component( todo, _todo );
            } )
        ] );
    }
};
