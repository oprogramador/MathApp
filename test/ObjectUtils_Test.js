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
            Assert.assert(JSON.stringify(x) === JSON.stringify(y));
        }

        function isReallyCopied() {
            var x = {a:1, b:2};
            var y = ObjectUtils.clone(x);
            y.a++;
            Assert.assert(y.a === 2);
            Assert.assert(x.a === 1);
        }

        function isNotDeepCloned() {
            var x = {a: {a:1, b:2}};
            var y = ObjectUtils.clone(x);
            y.a.a++;
        }

        this.isWellCloned = isWellCloned;
        this.isReallyCopied = isReallyCopied;
    }

    ObjectUtils_Test = new MyObject();
})();
