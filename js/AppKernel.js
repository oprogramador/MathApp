/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

require('ObjectUtils');

function AppKernel(json) {
    var defaultParameters = {
        inputId: 'input',
        outputId: 'output',
    }

    var parameters;

    function init() {
        parameters = ObjectUtils.merge(defaultParameters, json);
    }

    init();
}
