/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function Engine(parameters) {
    function addListeners() {
        $('#'+parameters.inputId).keyup(function() {
            $('#'+parameters.outputId).html(calculate(this.value));
        });
    }

    function calculate(code) {
        for(var i in window) {
            eval('var '+i);
        }
        try {
            var res = eval(code);
            //console.log(typeof(res));
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
