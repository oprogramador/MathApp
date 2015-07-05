/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function FileManager(parameters, editors) {
    var fileToCopy;
    var openedEditorName;
    var openedFileId;

    function addListeners() {
        window.addEventListener('beforeunload', function(e) {
            updateOpenedFile();
        });
        $('#'+parameters.newId).click(function() {
            openNewFile();
        });
        $('#'+parameters.saveId).click(function() {
            showInputToSave();
        });
        $('#'+parameters.downloadAllId).click(function() {
            downloadAll();
        });
        $(document).on('click', '#'+parameters.newFileViewId+' td', function() {
            newFileEditor(this);
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
        $(document).on('click', '#newFileName [name=ok]', function() {
            enterInput();
        });
        $(document).on('click', '#newFileName [name=cancel]', function() {
            cancelInput();
        });
        $(document).on('keydown', '#newFileName [name=input]', function(e) {
            if(e.keyCode === 13) saveOrCopy();
        });
    }

    function newFileEditor(element) {
        var name = element.getAttribute('name');
        $('#'+parameters.newFileViewId).hide();
        openedEditorName = name;
        getOpenedEditor().setValue('');
        $('#'+parameters.generalEditorId+' [name='+openedEditorName+']').show();
    }

    function openNewFile() {
        updateOpenedFile();
        openedFileId = undefined;
        removeSelection();
        $('#'+parameters.generalEditorId+' [name='+openedEditorName+']').hide();
        $('#'+parameters.newFileViewId).show();
    }

    function enterInput() {
        var e = $.Event('keydown');
        e.keyCode = 13;
        $('#newFileName').find('[name=input]').trigger(e);
    }

    function cancelInput() {
        $('#newFileName').find('[name=input]').val('');
        $('#newFileName').hide();
    }

    function checkNameConflict(name, fileId) {
        if(typeof localStorage.files === 'undefined') return true;
        if(typeof fileId === 'undefined') fileId = '';
        var files = JSON.parse(localStorage.files);
        var keys = Object.keys(files);
        for(var i=0; i<keys.length; i++) {
            var file = files[keys[i]];
            if(file.id !== fileId && file.name === name) {
                alert('File name conflict');
                return false;
            }
        }
        return true;
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
        if(!checkNameConflict(element.value, fileId)) return;
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

    function removeSelection() {
        $('#'+parameters.fileListId+' div').removeClass('file_selected');
    }

    function addSelection(fileId) {
        $('#file-'+fileId).addClass('file_selected');
    }

    function open(element) {
        updateOpenedFile();
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
        removeSelection();
        addSelection(fileId);
        openedFileId = fileId;
        var files = JSON.parse(localStorage.files);
        getOpenedEditor().setValue(files[fileId].content);
    }

    function deleteFile(element) {
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
        var files = JSON.parse(localStorage.files);
        delete files[fileId];
        localStorage.files = JSON.stringify(files);
        $(div).remove();
    }

    function updateOpenedFile() {
        if(typeof openedFileId === 'undefined') return;
        var files = JSON.parse(localStorage.files);
        files[openedFileId].content = getOpenedEditor().getValue();
        localStorage.files = JSON.stringify(files);
    }

    function showInputToSave() {
        if(typeof openedFileId === 'undefined') {
            $('#newFileName').find('[name=input]').val('');
            $('#newFileName').show();
        } else {
            updateOpenedFile();
        }
    }

    function showInputToCopy(element) {
        var div = $(element).closest('div')[0];
        var fileId = div.id.split('-')[1];
        var files = JSON.parse(localStorage.files);
        fileToCopy = files[fileId];
        $('#newFileName').find('[name=input]').val(fileToCopy.name);
        $('#newFileName').show();
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
        newFile.name = $('#newFileName').find('[name=input]').val();
        if(!checkNameConflict(newFile.name)) return;
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
            name: $('#newFileName').find('[name=input]').val(),
            content: getOpenedEditor().getValue(),
        }
        if(!checkNameConflict(file.name)) return;
        openedFileId = id;
        files[id] = file;
        localStorage.files = JSON.stringify(files);
        $('#newFileName').hide();
        addFileToDisplay(file);
        addSelection(id);
    }

    function addFileToDisplay(file) {
        var html = $('#'+parameters.fileTemplateId).html();
        var newHtml = html.replace(/%name%/g, file.name);
        newHtml = newHtml.replace(/%id%/g, 'file-'+file.id);
        $('#'+parameters.fileListId).append(newHtml);
    }

    function displayFiles() {
        if(typeof localStorage.files !== 'undefined') {
            var files = JSON.parse(localStorage.files);
            var keys = Object.keys(files);
            for(var i=0; i<keys.length; i++) {
                addFileToDisplay(files[keys[i]]);
            }
        }
        $('#'+parameters.fileListId).after('<div id="newFileName">'+$('#'+parameters.inputTemplateId).html()+'</div>');
        $('#newFileName').hide();
    }

    function getParameters() {
        return parameters;
    }

    function getOpenedEditor() {
        return editors[openedEditorName];
    }

    function init() {
        openedEditorName = Object.keys(editors)[0];
        addListeners();
        displayFiles();
    }

    this.getParameters = getParameters;

    init();
}
