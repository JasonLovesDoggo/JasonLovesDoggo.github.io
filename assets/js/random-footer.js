function() {
    var words = [
        "Apples",
        "Bananas",
        "Pears"
    ];


    var randomItem = myArray[Math.floor(Math.random()*words.length)];
    document.getElementById("randomizered").innerText = randomItem;
}.fail(function() {
        return (document.getElementById("randomizered").innerText = "none");
      });