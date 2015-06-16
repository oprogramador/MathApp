/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

var Require;

(function() {
    function MyObject() {
        function require(name, path) {
            try{
                eval(name);
                return;
            } catch(e) {}
            reload(name, path);
        }

        function reload(name, path) {
            if(typeof(path) === 'undefined') path = 'js';
            var script = document.createElement('script');
            script.src = path+'/'+name+'.js';
            console.log('script='+script);
            document.head.appendChild(script);
        }

        this.require = require;
        this.reload = reload;
    }

    Require = new MyObject();
})();

var require = Require.require;
