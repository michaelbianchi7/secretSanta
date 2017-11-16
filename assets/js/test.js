
function testFunction(/**array**/) {
    var array = [];
    var i;
    for(i=0; i<10; i++){
      array[i] = i+1;
    }
    array = array.slice();
    var mark = array.map(function() { return false; });
    for(var i = array.length - 1, u = array.length - 1; u > 0; i--) {
        if(!mark[i]) {
            var unmarked = mark.map(function(_, i) { return i; })
                .filter(function(j) { return !mark[j] && j < i; });
            var j = unmarked[Math.floor(Math.random() * unmarked.length)];

            var tmp = array[j];
            array[j] = array[i];
            array[i] = tmp;

            // this introduces the unbiased random characteristic
            if(Math.random() < u * derangementNumber(u - 1) /  derangementNumber(u + 1)) {
                mark[j] = true;
                u--;
            }
            u--;
        }
    }
    for(i=0; i<array.length; i++){
      console.log(i+1 + ". " + array[i]);
    }
    //return array;
}


function derangementNumber(n) {
    if(n == 0) {
        return 1;
    }
    var factorial = 1;
    while(n) {
        factorial *= n--;
    }
    return Math.floor(factorial / Math.E);
}
