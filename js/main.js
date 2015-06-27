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
    allow_resize: "both",
    allow_toggle: true,
    word_wrap: true,
    language: "en",
    syntax: "js",
    allow_toggle: false,
});
