/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

var Require;

(function() {
    function MyObject() {
        function require(name, args) {
            try{
                eval(name);
            } catch(e) {
                load(name, args);
            }
        }

        function reload(name, args) {
            try{
                eval(name);
                replace(name, args);
            } catch(e) {
                load(name, args);
            }
        }

        function replace(name, args) {
            var script = document.querySelector('script[id='+name+']');
            script.parentNode.removeChild(script);
            load(name, args);
        }

        function load(name, args) {
            if(typeof(args) === 'undefined') args = {};
            if(typeof(args.path) === 'undefined') args.path = 'js';
            var script = document.createElement('script');
            script.id = name;
            script.src = args.path+'/'+name+'.js';
            console.log('script='+script);
            if(typeof(args.callback === 'function')) {
                script.onload = args.callback;
                script.onreadystatechange = function() {
                    if(this.readyState === 'complete') {
                        args.callback();
                    }
                }
            }
            document.head.appendChild(script);
        }

        this.require = require;
        this.reload = reload;
    }

    Require = new MyObject();
})();

var require = Require.require;
