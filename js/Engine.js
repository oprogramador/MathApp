/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function Engine(parameters) {
    function addListeners() {
        $('#'+parameters.submitId).click(function() {
            submit();
        });
        $('#'+parameters.saveId).click(function() {
            save();
        });
        $(document).on('click', '[id^=file-] [name=delete]', function() {
            deleteFile(this);
        });
        $(document).on('click', '[id^=file-] [name=name-display]', function() {
            open(this);
        });
        function loadIframeEvents() {
            if($('#'+parameters.iframeId).length < 1) setTimeout(loadIframeEvents, 100);
            else {
                $('#'+parameters.iframeId).contents().find('#'+parameters.innerTextareaId).keypress(function(e) {
                    if(e.ctrlKey && e.keyCode === 13) {
                        e.preventDefault();
                        submit();
                    }
                });
            }
        }
        loadIframeEvents();
    }

    function open(element) {
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
    }

    function deleteFile(element) {
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
        var files = JSON.parse(localStorage.files);
        delete files[fileId];
        localStorage.files = JSON.stringify(files);
        $(div).remove();
    }

    function save() {
        if(typeof localStorage.files === 'undefined') files = {};
        else files = JSON.parse(localStorage.files);
        var id = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        files[id] = {
            id: id,
            name: Math.random().toString(36).substring(2, 10),
            content: editAreaLoader.getValue(parameters.inputId),
        }
        localStorage.files = JSON.stringify(files);
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

    function displayFiles() {
        if(typeof localStorage.files === 'undefined') return;
        var files = JSON.parse(localStorage.files);
        var html = $('#'+parameters.fileTemplateId).html();
        var keys = Object.keys(files);
        for(var i=0; i<keys.length; i++) {
            var file = files[keys[i]];
            var newHtml = html.replace(/%name%/g, file.name);
            newHtml = newHtml.replace(/%id%/g, 'file-'+file.id);
            $('#'+parameters.fileListId).append(newHtml);
        }
    }

    function init() {
        addListeners();
        displayFiles();
    }

    var sin = Math.sin;
    var cos = Math.cos;
    var tan = Math.tan;
    var pi = Math.PI;
    var e = Math.E;

    this.getParameters = getParameters;

    init();
}
