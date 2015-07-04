/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

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

        function randomString(n) {
            var x = '';
            for(var i=0; i<n; i++) x += String.fromCharCode(97 + Math.random()*26);
            return x;
        }

        function randomId(name) {
            if(typeof name === 'undefined') name = '';
            if(name === '') return randomString(12);
            else return name+'-'+randomString(12);
        }

        this.clone = clone;
        this.deepClone = deepClone;
        this.merge = merge;
        this.randomString = randomString;
        this.randomId = randomId;
    }
    ObjectUtils = new MyObject();
})();
