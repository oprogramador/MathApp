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
