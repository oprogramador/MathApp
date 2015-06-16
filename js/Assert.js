/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

var Assert;

(function() {
    function MyObject() {
        var defaultMessage = 'assertion failed';

        function assert(condition, message) {
            if(typeof(message) === 'undefined') message = defaultMessage;
            if(condition !== true) throw new Error(message);
        }

        this.assert = assert;
    }
    Assert = new MyObject();
})();
