/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function AboutManager(parameters) {
    function addListeners() {
        $('#'+parameters.aboutButtonId).click(function() {
            open();
        });
    }

    function open() {
        $('#'+parameters.aboutDialogId).dialog({
            title: 'About',
            resizable: false,
            width: 500,
            modal: true,
            close: function() {
                $(this).dialog('close');
            }
        });
    }

    function init() {
        addListeners();
    }

    init();
}
