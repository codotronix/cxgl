(function(window){
    window.cxgl.Utils = {
        generateID: generateID,
        deleteID: deleteID
    };

    var _allIDs = [];

    function generateID (prepend) {
        var id;
        prepend = prepend || 'gobj';

        while (id === undefined || _allIDs.indexOf(id) >= 0) {
            id = prepend + '-' + (Math.random() * (parseInt(Math.random().toString().replace(/[.]/g,'')))).toString().replace(/[.]/g,'-');
        }

        _allIDs.push(id);
        return id;
    }

    function deleteID (id) {
        _allIDs.splice(_allIDs.indexOf(id), 1);
    }

})(window);