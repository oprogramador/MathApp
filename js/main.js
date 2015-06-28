/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/


var appKernel;
(function() {
    require([
        'AppKernel'
        ],
        {
            callback: function() {
                appKernel = new AppKernel();
            }
        }
        );
})()

editAreaLoader.init({
    id: "input",
    start_highlight: true,
    word_wrap: true,
    language: "en",
    syntax: "js",
    allow_toggle: false,
    allow_resize: true,
    replace_tab_by_spaces: 4,
});
