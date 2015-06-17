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
            Require.reload(testModuleName, {path: 'test', callback: function() {
                var testModule = eval(testModuleName);
                for(var i in testModule) {
                    try {
                        testModule[i]();
                    } catch(e) {
                        console.error(testModule[i].name+' '+e.message);
                    }
                }
            }});
        }

        this.test = test;
    }

    Test = new MyObject();
})();
