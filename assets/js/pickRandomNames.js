
function myFunction() {
  //all names and numbers input
  var allInfo = document.getElementById("allrows");
  var inputInfo = allInfo.querySelectorAll("input");
  //price input
  var priceInput = document.getElementById("giftPrice").querySelector("input").value;
  //name of person who submitted form input
  var makerNameInput = document.getElementById("maker").querySelector("input").value;

  //move all info in arrays to send to php script
  var name = [];
  var number = [];
  var price = [];
  var makerName = [];
  price[0] = priceInput;
  makerName[0] = makerNameInput
  for(i=0, j=0; i < inputInfo.length ;i=i+2, j++) {
      name[j] = inputInfo[i].value;
      number[j] = inputInfo[i+1].value;
  }

  //randomize name array so that all values are in a unique index
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
  //create an array of all the info gathered to send to php script
  var infoToBeSent = {};
  infoToBeSent.price = price;
  infoToBeSent.name = name;
  infoToBeSent.number = number;
  infoToBeSent.makerName = makerName;
  //create ajax request using post to send infoToBeSent to sendTexts.php script
  $.ajax({
    url: '/sendTexts.php',
    type: 'post',
    data: {"AllInfo" : JSON.stringify(infoToBeSent)},
  });
}


//derandement of the numbers
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
