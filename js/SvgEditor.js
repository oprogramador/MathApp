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
        var iframe = $('#'+parameters.diagramEditorId).contents().find('body');
        var result = iframe[0].onchange(JSON.stringify({msg: 'serialize'}));
        return result;
    }

    function setValue(value) {
        var iframe = $('#'+parameters.diagramEditorId).contents().find('body');
        var result = iframe[0].onchange(JSON.stringify({msg: 'unserialize', data: value}));
    }

    function makePdf(file) {
        var svg = $('#'+parameters.diagramEditorId).contents().find('svg')[0];
        svgToDataURL(svg, 'image/png', {
            callback: function(data) {
                var doc = new jsPDF('p', 'mm');
                doc.addImage(data, 'PNG', 10, 10);
                doc.save(file.name+'.pdf');
            }
        });
    }

    this.getValue = getValue;
    this.setValue = setValue;
    this.makePdf = makePdf;
    init();
}
