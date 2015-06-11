/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

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
