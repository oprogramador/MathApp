/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

var Require;

(function() {
    function MyObject() {
        function require(names, args) {
            var loadedScripts = [];
            var isLoadedAll = true;
            for(var i=0; i<names.length; i++) {
                try{
                    eval(names[i]);
                } catch(e) {
                    isLoadedAll = false;
                    load(names[i], args, loadedScripts, names.length);
                }
            }
            if(isLoadedAll) if(typeof args.callback === 'function') args.callback();
        }

        function reload(names, args) {
            var loadedScripts = [];
            var isLoadedAll = true;
            for(var i=0; i<names.length; i++) {
                try{
                    eval(names[i]);
                    replace(names[i], args, loadedScripts, names.length);
                } catch(e) {
                    isLoadedAll = false;
                    load(names[i], args, loadedScripts, names.length);
                }
            }
            if(isLoadedAll) if(typeof args.callback === 'function') args.callback();
        }

        function replace(name, args, loadedScripts, scriptsNr) {
            var script = document.querySelector('script[id='+name+']');
            script.parentNode.removeChild(script);
            load(name, args, loadedScripts, scriptsNr);
        }

        function load(name, args, loadedScripts, scriptsNr) {
            if(typeof(args) === 'undefined') args = {};
            if(typeof(args.path) === 'undefined') args.path = 'js';
            var script = document.createElement('script');
            script.id = name;
            script.src = args.path+'/'+name+'.js';


            function callback() {
                console.log('loaded: '+name);
                loadedScripts.push(name);

                function tryCallback() {
                    try {
                        for(var i=0; i<loadedScripts.length; i++) eval(loadedScripts[i]);
                        if(typeof args.callback === 'function') args.callback();
                    } catch(e) {
                        setTimeout(tryCallback, 100);
                    }
                }

                if(loadedScripts.length === scriptsNr) tryCallback();
            }

            if(typeof(args.callback === 'function')) {
                script.onload = callback;
                script.onreadystatechange = function() {
                    if(this.readyState === 'complete') {
                        callback();
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
