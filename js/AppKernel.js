/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

var AppKernel;

(function() {
    require([
        'ObjectUtils',
        'Engine'
        ],
        {
            callback: loadClass
        });

    function loadClass() {
        AppKernel = function(json) {
            var defaultParameters = {
                engine: {
                    inputId: 'input',
                    outputId: 'output',
                    submitId: 'submit',
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
    }
})()
