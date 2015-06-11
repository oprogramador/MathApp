/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function require(name, path) {
    try{
        eval(name);
        return;
    } catch(e) {}
    if(typeof(path) === 'undefined') path = 'js';
    var script = document.createElement('script');
    script.src = path+'/'+name+'.js';
    console.log('script='+script);
    document.head.appendChild(script);
}
