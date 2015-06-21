/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

require('ObjectUtils');
require('Engine');

function AppKernel(json) {
    var defaultParameters = {
        engine: {
            inputId: 'input',
            outputId: 'output',
        }
    }

    var parameters;
    var engine;

    function init() {
        parameters = ObjectUtils.merge(defaultParameters, json);
        engine = new Engine(parameters.engine);
    }

    function getParameters() {
        return parameters;
    }

    function getEngine() {
        return engine;
    }

    this.getParameters = getParameters;
    this.getEngine = getEngine;

    init();
}
