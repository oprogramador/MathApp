/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function Engine(parameters) {
    function addListeners() {
        $('#'+parameters.inputId).keyup(function() {
            calculate(this.value, function(data) {
                $('#'+parameters.outputId).html(data);
            });
        });
    }

    function calculate(code, callback) {
        var p = new Parallel(code);
        p.spawn(calculateThread)
            .then(function(data){  
            callback(data);
        });
    }

    function calculateThread(code) {
        //for(var i in window) {
            //eval('var '+i);
        //}
        try {
            var res = eval(code);
            if(typeof(res) === 'object') return JSON.stringify(res);
            //if(typeof(res) === 'undefined') throw new Error();
            //if(typeof(res) !== 'number') throw new Error();
            return res;
        } catch(e) {
            return 'error';
        }
    }

    function getParameters() {
        return parameters;
    }

    var sin = Math.sin;
    var cos = Math.cos;
    var tan = Math.tan;
    var pi = Math.PI;
    var e = Math.E;
    
    this.getParameters = getParameters;
    addListeners();
}
