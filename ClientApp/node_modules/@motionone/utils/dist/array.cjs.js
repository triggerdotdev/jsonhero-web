'use strict';

function addUniqueItem(array, item) {
    array.indexOf(item) === -1 && array.push(item);
}
function removeItem(arr, item) {
    const index = arr.indexOf(item);
    index > -1 && arr.splice(index, 1);
}

exports.addUniqueItem = addUniqueItem;
exports.removeItem = removeItem;
