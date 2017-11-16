function myFunction(/**name**/) {
  var allInfo = document.getElementById("allrows");
  var inputInfo = allInfo.querySelectorAll("input");
  var name = [];
  var number = [];
  for(i=0, j=0; i < inputInfo.length ;i=i+2, j++) {
      name[j] = inputInfo[i].value;
      number[j] = inputInfo[i+1].value;
      //document.getElementById("demo").innerHTML += name[j];
      //document.getElementById("demo").innerHTML += number[j];
  }
  name = name.slice();
  var mark = name.map(function() { return false; });
  for(var i = name.length - 1, u = name.length - 1; u > 0; i--) {
      if(!mark[i]) {
          var unmarked = mark.map(function(_, i) { return i; })
              .filter(function(j) { return !mark[j] && j < i; });
          var j = unmarked[Math.floor(Math.random() * unmarked.length)];

          var tmp = name[j];
          name[j] = name[i];
          name[i] = tmp;

          // this introduces the unbiased random characteristic
          if(Math.random() < u * derangeNum(u - 1) /  derangeNum(u + 1)) {
              mark[j] = true;
              u--;
          }
          u--;
      }
  }
  $.post('sendTexts.php', {name: name})

}

function derangeNum(n) {
  if(n == 0) {
      return 1;
  }
  var factorial = 1;
  while(n) {
      factorial *= n--;
  }
  return Math.floor(factorial / Math.E);
}
