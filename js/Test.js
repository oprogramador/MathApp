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
            var runNr = 0;
            var failedNr = 0;
            Require.reload(moduleName);
            Require.reload(testModuleName, {path: 'test', callback: function() {
                var testModule = eval(testModuleName);
                for(var i in testModule) {
                    runNr++;
                    try {
                        testModule[i]();
                    } catch(e) {
                        failedNr++;
                        console.error(testModule[i].name+' '+e.message);
                    }
                }
                console.log('Run '+runNr+' tests.');
                console.log('Failed '+failedNr+' tests.');
            }});
        }

        this.test = test;
    }

    Test = new MyObject();
})();
