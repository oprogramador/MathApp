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
                    iframeId: 'frame_input',
                    innerTextareaId: 'textarea',
                    saveId: 'save',
                    fileListId: 'fileList',
                    fileTemplateId: 'fileTemplate',
                    downloadAllId: 'downloadAll'
                }
            }

            var parameters;
            var engine;

            function init() {
                parameters = ObjectUtils.merge(defaultParameters, json);
                engine = new Engine(parameters.engine);
            }

            function getEngine() {
                return engine;
            }

            this.getEngine = getEngine;

            init();
        }
    }
})()
