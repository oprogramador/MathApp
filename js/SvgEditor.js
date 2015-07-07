/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function SvgEditor(parameters) {
    function init() {
        addEventListener('message', function(e) {
            alert(e.data);
        }, false);
    }

    function getValue() {
        var iframe = $('#diagramEditor').contents().find('body');
        var result = iframe[0].onchange(JSON.stringify({msg: 'serialize'}));
        return result;
    }

    function setValue(value) {
        var iframe = $('#diagramEditor').contents().find('body');
        var result = iframe[0].onchange(JSON.stringify({msg: 'unserialize', data: value}));
    }

    function makePdf(file) {

    }

    this.getValue = getValue;
    this.setValue = setValue;
    this.makePdf = makePdf;
    init();
}
