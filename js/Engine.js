/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

var Engine;

(function() {
    require([
            //'ObjectUtils',
            'NumberDoctor',
        ],
        {
            callback: loadClass
        });

    function loadClass() {
        Engine = function(parameters) {
            function addListeners() {
                $('#'+parameters.submitId).click(function() {
                    submit();
                });
                $('#'+parameters.statsId).click(function() {
                    displayStats();
                });
                function loadIframeEvents() {
                    if($('#'+parameters.iframeId).length < 1) setTimeout(loadIframeEvents, 100);
                    else {
                        $('#'+parameters.iframeId).contents().find('#'+parameters.innerTextareaId).keypress(function(e) {
                            if(e.ctrlKey && (e.keyCode === 13 || e.keyCode === 10)) {
                                e.preventDefault();
                                submit();
                            }
                        });
                    }
                }
                loadIframeEvents();
            }

            function getValue() {
                return editAreaLoader.getValue(parameters.inputId);
            }

            function setValue(value) {
                editAreaLoader.setValue(parameters.inputId, value);
            }

            function displayStats() {
                var id = ObjectUtils.randomId('stats');
                var numberDoctor = new NumberDoctor(editAreaLoader.getValue(parameters.inputId));
                var html = $('#'+parameters.statsDialogTemplateId).html();
                html = html.replace(/%numbers%/g, JSON.stringify(numberDoctor.getAllNumbers()));
                html = html.replace(/%integers%/g, JSON.stringify(numberDoctor.getAllIntegers()));
                html = html.replace(/%primes%/g, JSON.stringify(numberDoctor.getAllPrimes()));
                $('body').append('<div id="'+id+'" style="display:none">'+html+'</div>');
                $('#'+id).dialog({
                    title: 'Number statistics',
                    resizable: false,
                    modal: true,
                    close: function() {
                        $(this).dialog('destroy').remove();
                    }
                });
            }

            function submit() {
                calculate(editAreaLoader.getValue(parameters.inputId), function(data) {
                    $('#'+parameters.outputId).html(data);
                });
            }

            function calculate(code, callback) {
                code = 'var e;'+code;
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

            function init() {
                addListeners();
            }

            function newFile() {
                $('#'+parameters.javascriptEditorId).show();
            }

            this.getParameters = getParameters;
            this.getValue = getValue;
            this.setValue = setValue;
            this.newFile = newFile;

            init();
        }
    }
})();
