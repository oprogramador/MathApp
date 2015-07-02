/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function IntegerDoctor(text) {
    var allIntegers;
    var allPrimes;

    function generateAllIntegers() {
        allIntegers = text.match(/[0-9]+/g).map(function(x){ return parseInt(x); });
    }

    function generateAllPrimes() {
        allPrimes = allIntegers.filter(isPrime).sort(function(a, b){ return a-b; });
    }

    function getAllIntegers() {
        return allIntegers;
    }

    function getAllPrimes() {
        return allPrimes;
    }

    function isPrime(x) {
        if(x<2) return false;
        for(var i=2; i<=Math.sqrt(x); i++) if(x%i === 0) return false;
        return true;
    }

    function getMaxPrime() {
        return allPrimes[allPrimes.length-1];
    }

    function init() {
        generateAllIntegers();
        generateAllPrimes();
    }

    init();

    this.getAllIntegers = getAllIntegers;
    this.getAllPrimes = getAllPrimes;
    this.getMaxPrime = getMaxPrime;
}
