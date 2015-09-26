var uniqueID = ( function () {
    var count = 0;
    return function () {
        return ++count;
    };
}() );

var Todo = function ( data ) {
    this.label = m.prop( data.label );
    this.done = m.prop( data.done );
    // since we're using the todo component in a list
    // it is wiser to have keys on our elements
    // this is something that would normally be handled
    // server side
    this.key = uniqueID();
};

// do it this way to fake a request
// this code can be changed out for a
// m.request call
Todo.list = function () {
    var deferred = m.deferred();
    deferred.resolve( [ {
        label: 'learn mithril!',
        done: false
    }, {
        label: 'relax!',
        done: false
    } ].map( function ( todo ) {
        return new Todo( todo );
    } ) );

    return deferred.promise;

};
