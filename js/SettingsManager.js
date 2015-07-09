/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function SettingsManager(parameters) {
    function addListeners() {
        $('#'+parameters.settingsButtonId).click(function() {
            open();
        });
        $('#'+parameters.settingsPanelId+' [name=submit]').click(function() {
            submit();
        });
        $('#'+parameters.settingsPanelId+' [name=cancel]').click(function() {
            cancel();
        });
    }

    function close() {
        $('#'+parameters.appContentId).show();
        $('#'+parameters.settingsButtonId).show();
        $('#'+parameters.settingsPanelId).hide();
    }

    function cancel() {
        close();
    }

    function getSettings() {
        var settings;
        if(typeof localStorage.settings === 'undefined') settings = {};
        else settings = JSON.parse(localStorage.settings);
        return settings;
    }

    function apply() {
        settings = getSettings();

        if(typeof settings.foregroundColor !== 'undefined') $('.foreground').css('color', settings.foregroundColor);
        if(typeof settings.backgroundColor !== 'undefined') $('.background').css('background-color', settings.backgroundColor);

        if(settings.layout === '2') $('#'+parameters.fileManagerTdId).detach().prependTo( $('#'+parameters.generalEditorTdId).parent() );
    }

    function submit() {
        settings = getSettings();
        settings.foregroundColor = $('#'+parameters.settingsPanelId+' [name=foregroundColor]').val();
        settings.backgroundColor = $('#'+parameters.settingsPanelId+' [name=backgroundColor]').val();
        settings.layout = $('#'+parameters.settingsPanelId+' [name=layout]:checked').val();
        localStorage.settings = JSON.stringify(settings);
        close();
        //apply();
        location.href = location.href;
    }

    function open() {
        settings = getSettings();

        $('#'+parameters.settingsPanelId+' [name=foregroundColor]').val(settings.foregroundColor);
        $('#'+parameters.settingsPanelId+' [name=backgroundColor]').val(settings.backgroundColor);
        $('#'+parameters.settingsPanelId+' [name=layout][value='+settings.layout+']').prop('checked', true);

        $('#'+parameters.appContentId).hide();
        $('#'+parameters.settingsButtonId).hide();
        $('#'+parameters.settingsPanelId).show();
    }

    function init() {
        addListeners();
    }

    this.apply = apply;

    init();
}
