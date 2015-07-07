/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function SvgEditor(parameters) {
    function init() {

    }

    function getValue() {
        var iframe = document.getElementById(parameters.diagramEditorId);
        $.postMessage('blableee', 'file:///home/pierre/pierre_copy/programming/css/diagramEditor/view.html', iframe);
        //iframe.contentWindow.postMessage('serialize', location.href);
    }

    function setValue(value) {
        var iframe = document.getElementById(parameters.diagramEditorId);
        $.postMessage('blableee', 'file:///home/pierre/pierre_copy/programming/css/diagramEditor/view.html', iframe);
        //iframe.contentWindow.postMessage('serialize', location.href);
    }

    function makePdf(file) {

    }

    this.getValue = getValue;
    this.setValue = setValue;
    this.makePdf = makePdf;
    init();
}
