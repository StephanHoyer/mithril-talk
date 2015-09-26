var todo = {
    controller: function ( todo, submit ) {
        this.isEditing = false;
        this.remove = function(){
            if(~(index=todoList.list().indexOf(todo))){
                todoList.list().splice(index, 1);
            }
        };
    },
    view: function ( ctrl, todo ) {
        var classNames = [ 'li' ];
        if ( todo.done() ) {
            classNames.push( 'completed' );
        }
        if ( ctrl.isEditing ) {
            classNames.push( 'editing' );
        }
        return m( classNames.join( '.' ), [
            m( '.view', [
                //checkbox input two way data bound to todo.done
                m( 'input.toggle', {
                    type: 'checkbox',
                    onchange: m.withAttr( 'checked', todo.done ),
                    checked: todo.done()
                } ),
                //label bound to todo.label
                m( 'label', {
                    ondblclick: function () {
                        ctrl.isEditing = true;
                    }
                }, todo.label() ),
                m( 'button.destroy', {
                    onclick: ctrl.remove
                } )
            ] ),
            // text input two way data bound to todo.label
            m( 'input.edit', {
                value: todo.label(),
                oninput: m.withAttr( 'value', todo.label ),
                onkeypress: function ( e ) {
                    if ( e.keyCode === 13 ) {
                        ctrl.isEditing = false;
                    }
                }
            } )
        ] );
    }
};
