/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

require('Assert');

var ObjectUtils;

(function() {
    function MyObject() {
        function clone(x) {
            var res = {};
            for(var i in x) res[i] = x[i];
            return res;
        }

        function deepClone(x) {
            var res = {}
            for(var i in x) {
                if(typeof(x[i] === 'object')) res[i] = deepClone(x[i]);
                else res[i] = x[i];
            }
            return res;
        }

        function merge(a, b) {
            var res = clone(a);
            for(var i in b) res[i] = b[i];
            return res;
        }

        this.clone = clone;
        this.deepClone = deepClone;
        this.merge = merge;
    }
    ObjectUtils = new MyObject();
})();
