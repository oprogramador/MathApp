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
        'SvgEditor',
        'SettingsManager',
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
                },
                svgEditor: {
                    diagramEditorId: 'diagramEditor',
                },
                settingsManager: {
                    appContentId: 'appContent',
                    settingsButtonId: 'settingsButton',
                    settingsPanelId: 'settingsPanel',
                    fileManagerTdId: 'fileManager-td',
                    generalEditorTdId: 'generalEditor-td',
                } 
            }

            var parameters;
            var fileManager;
            var engine;
            var mapEditor;
            var svgEditor;
            var settingsManager;

            function init() {
                parameters = ObjectUtils.merge(defaultParameters, json);
                engine = new Engine(parameters.engine);
                mapEditor = new MapEditor(parameters.mapEditor);
                svgEditor = new SvgEditor(parameters.svgEditor);
                settingsManager = new SettingsManager(parameters.settingsManager);
                settingsManager.apply();
                fileManager = new FileManager(parameters.fileManager, {
                        javascriptEditor: engine,
                        mapEditor: mapEditor,
                        svgEditor: svgEditor,
                });
            }

            function getEngine() {
                return engine;
            }

            function getMapEditor() {
                return mapEditor;
            }

            this.getEngine = getEngine;
            this.getMapEditor = getMapEditor;

            init();
        }
    }
})()
