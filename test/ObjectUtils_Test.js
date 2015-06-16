/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

var ObjectUtils_Test;

(function() {
    function MyObject() {
        function isWellCloned() {
            var x = {a:1, b:2};
            var y = ObjectUtils.clone(x);
            Assert.assert(JSON.stringify(x) !== JSON.stringify(y));
        }

        this.isWellCloned = isWellCloned;
    }

    ObjectUtils_Test = new MyObject();
})();
