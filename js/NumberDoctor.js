/****************************************
 *
 * Author: Piotr Sroczkowski
 *
 ****************************************/

function NumberDoctor(text) {
    var allNumbers;
    var allIntegers;
    var allPrimes;

    function generateAllNumbers() {
        allNumbers = text.match(/[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/g).map(function(x){ return parseFloat(x); });
    }

    function generateAllIntegers() {
       allIntegers = allNumbers.filter(function(x){ return x === Math.floor(x); });
    }

    function generateAllPrimes() {
        allPrimes = allIntegers.filter(isPrime).sort(function(a, b){ return a-b; });
    }

    function getAllNumbers() {
        return allNumbers;
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
        generateAllNumbers();
        generateAllIntegers();
        generateAllPrimes();
    }

    init();

    this.getAllNumbers = getAllNumbers;
    this.getAllIntegers = getAllIntegers;
    this.getAllPrimes = getAllPrimes;
    this.getMaxPrime = getMaxPrime;
}
