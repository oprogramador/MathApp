/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function Engine(parameters) {
    function addListeners() {
        $('#'+parameters.submitId).click(function() {
            calculate(editAreaLoader.getValue(parameters.inputId), function(data) {
                $('#'+parameters.outputId).html(data);
            });
        });
    }

    function calculate(code, callback) {
        var p = new Parallel(code);
        p.spawn(calculateThread)
            .then(function(data){  
            callback(data.toString());
        });
    }

    function calculateThread(code) {
        //for(var i in window) {
            //eval('var '+i);
        //}
        try {
            var res = eval(code);
            if(typeof(res) === 'object') {
                try {
                    return JSON.stringify(res);
                } catch(e) {
                    return res;
                }
            }
            //if(typeof(res) === 'boolean') return res ? 'true' : 'false';
            if(typeof(res) === 'undefined') return 'undefined';
            if(typeof(res) === 'function') return res.toString();
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
