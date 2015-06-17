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
            } catch(e) {
                load(name, path);
            }
        }

        function reload(name, path) {
            try{
                eval(name);
                replace(name, path);
            } catch(e) {
                console.log(e);
                load(name, path);
            }
        }

        function replace(name, path) {
            var script = document.querySelector('script[id='+name+']');
            script.parentNode.removeChild(script);
            load(name, path);
        }

        function load(name, path) {
            if(typeof(path) === 'undefined') path = 'js';
            var script = document.createElement('script');
            script.id = name;
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
