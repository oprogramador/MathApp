/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

require('Assert');
var Test;

(function() {
    function MyObject() {
        function test(moduleName) {
            var testModuleName = moduleName+'_Test';
            Require.reload(moduleName);
            Require.reload(testModuleName, 'test');
            var testModule = eval(testModuleName);
            for(var i in testModule) testModule[i]();
        }

        this.test = test;
    }

    Test = new MyObject();
})();
