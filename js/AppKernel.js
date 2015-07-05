/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

var AppKernel;

(function() {
    require([
        'ObjectUtils',
        'FileManager',
        'Engine',
        'MapEditor',
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
                    statsDialogTemplateId: 'statsDialogTemplate',
                    statsId: 'stats',
                },
                fileManager: {
                    saveId: 'save',
                    fileListId: 'fileList',
                    fileTemplateId: 'fileTemplate',
                    inputTemplateId: 'inputTemplate',
                    downloadAllId: 'downloadAll',
                    newId: 'new',
                    newFileViewId: 'newFileView',
                    generalEditorId: 'generalEditor',
                },
                mapEditor: {
                    mapCanvasId: 'mapCanvas',
                }
            }

            var parameters;
            var fileManager;
            var engine;

            function init() {
                parameters = ObjectUtils.merge(defaultParameters, json);
                engine = new Engine(parameters.engine);
                mapEditor = new MapEditor(parameters.mapEditor);
                fileManager = new FileManager(parameters.fileManager, {
                        javascriptEditor: engine,
                        mapEditor: mapEditor,
                });
            }

            function getEngine() {
                return engine;
            }

            this.getEngine = getEngine;

            init();
        }
    }
})()
