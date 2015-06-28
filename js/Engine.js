/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function Engine(parameters) {
    var fileToCopy;

    function addListeners() {
        $('#'+parameters.submitId).click(function() {
            submit();
        });
        $('#'+parameters.saveId).click(function() {
            showInputToSave();
        });
        $('#'+parameters.downloadAllId).click(function() {
            downloadAll();
        });
        $(document).on('click', '[id^=file-] [name=delete]', function() {
            deleteFile(this);
        });
        $(document).on('click', '[id^=file-] [name=name-display]', function() {
            open(this);
        });
        $(document).on('keydown', '[id^=file-] [name=name]', function(e) {
            if(e.keyCode === 13) changeFileName(this);
        });
        $(document).on('click', '[id^=file-] [name=edit]', function() {
            editFileName(this);
        });
        $(document).on('click', '[id^=file-] [name=copy]', function() {
            showInputToCopy(this);
        });
        $(document).on('click', '[id^=file-] [name=download]', function() {
            download(this);
        });
        $(document).on('keydown', '#newFileName', function(e) {
            if(e.keyCode === 13) saveOrCopy();
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

    function downloadAll() {
        var zip = new JSZip();
        var files = JSON.parse(localStorage.files);
        var keys = Object.keys(files);
        for(var i=0; i<keys.length; i++) {
            var file = files[keys[i]];
            zip.file(file.name+'.js', file.content);
        }
        var content = zip.generate({type: 'blob'})
        saveAs(content, 'files.zip');
    }

    function download(element) {
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
        var files = JSON.parse(localStorage.files);
        var file = files[fileId];
        saveAs(new Blob([file.content], {type: 'text/plain;charset=utf-8'}), file.name+'.js');
    }

    function changeFileName(element) {
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
        var files = JSON.parse(localStorage.files);
        files[fileId].name = element.value;
        localStorage.files = JSON.stringify(files);
        div = $(div);
        div.find('[name=name-display]').html(element.value).show();
        div.find('[name=name]').hide();
    }

    function editFileName(element) {
        var div = $(element).closest('div');
        if(div.find('[name=name]').is(':visible')) {
            changeFileName(div.find('[name=name]')[0]);
        } else {
            div.find('[name=name-display]').hide();
            div.find('[name=name]').show();
        }
    }

    function open(element) {
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
        $('#'+parameters.fileListId+' div').removeClass('file_selected');
        $(div).addClass('file_selected');
        var files = JSON.parse(localStorage.files);
        editAreaLoader.setValue(parameters.inputId, files[fileId].content);
    }

    function deleteFile(element) {
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
        var files = JSON.parse(localStorage.files);
        delete files[fileId];
        localStorage.files = JSON.stringify(files);
        $(div).remove();
    }

    function showInputToSave() {
        $('#newFileName').val('').show();
    }

    function showInputToCopy(element) {
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
        var files = JSON.parse(localStorage.files);
        fileToCopy = files[fileId];
        $('#newFileName').val(fileToCopy.name).show();
    }

    function saveOrCopy() {
        if(typeof fileToCopy === 'undefined') save();
        else copy();
    }

    function copy() {
        var files = JSON.parse(localStorage.files);
        var newFile = ObjectUtils.clone(fileToCopy);
        var id = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        newFile.id = id;
        newFile.name = $('#newFileName').val();
        files[id] = newFile;
        localStorage.files = JSON.stringify(files);
        fileToCopy = undefined;
        $('#newFileName').hide();
        addFileToDisplay(newFile);
    }

    function save() {
        if(typeof localStorage.files === 'undefined') files = {};
        else files = JSON.parse(localStorage.files);
        var id = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
        var file = {
            id: id,
            name: $('#newFileName').val(),
            content: editAreaLoader.getValue(parameters.inputId),
        }
        files[id] = file;
        localStorage.files = JSON.stringify(files);
        $('#newFileName').hide();
        addFileToDisplay(file);
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

    function addFileToDisplay(file) {
        var html = $('#'+parameters.fileTemplateId).html();
        var newHtml = html.replace(/%name%/g, file.name);
        newHtml = newHtml.replace(/%id%/g, 'file-'+file.id);
        $('#'+parameters.fileListId).append(newHtml);
    }

    function displayFiles() {
        if(typeof localStorage.files === 'undefined') return;
        var files = JSON.parse(localStorage.files);
        var keys = Object.keys(files);
        for(var i=0; i<keys.length; i++) {
            addFileToDisplay(files[keys[i]]);
        }
        $('#'+parameters.fileListId).after('<input id="newFileName"/>');
        $('#newFileName').hide();
    }

    function init() {
        addListeners();
        displayFiles();
    }

    this.getParameters = getParameters;

    init();
}
