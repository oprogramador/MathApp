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
                    inputTemplateId: 'inputTemplate',
                    statsDialogTemplateId: 'statsDialogTemplate',
                    downloadAllId: 'downloadAll',
                    newId: 'new',
                    statsId: 'stats',
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
