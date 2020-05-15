var genesMessages = [
   "Ouch, a racoon bit me in this higly dangerous radioactive facility that conducts experiments on racoons my class is taking a field trip to, better not tell any adults about it!",
];

var nextThreshold = [1, 0];
var genes = 0;
var clickingMultiplyer = 1;
var mutationMultiplyer = 1;

function addGenes(number) {
   genes += number;
   document.getElementById("genes").innerHTML = Math.floor(genes);
   //Threshhold for next message logic.
   if (genes >= nextThreshold[0]) {
      document.getElementById("topText").innerHTML =
         genesMessages[nextThreshold[1]];
      if (!(nextThreshold[1] + 1 >= genesMessages.length)) {
         nextThreshold[1] += 1;
      } else {
         nextThreshold = Infinity;
      }
   }
}

//#region CLICKING - Clicking button and clicking level
var clickPower = 1;

document.getElementById("clickButton").addEventListener("click", function () {
   addGenes(clickPower * clickingMultiplyer);
});

function buyTrainingLevel() {
   var trainingCost = Math.floor(50 * Math.pow(1.1, clickPower));
   if (genes >= trainingCost) {
      clickPower += 1;
      genes -= trainingCost;
      document.getElementById("trainingPower").innerHTML = clickPower;
      document.getElementById("genes").innerHTML = genes;
   }
   var nextCost = Math.floor(50 * Math.pow(1.1, clickPower));
   document.getElementById("trainingCost").innerHTML = nextCost;
}
//#endregion

//#region MUTATIONS - 1st level autoclick
var mutations = 0;

function buyMutation() {
   var mutationCost = Math.floor(10 * Math.pow(1.1, mutations)); //works out the cost of this cursor
   if (genes >= mutationCost) {
      //checks that the player can afford the cursor
      mutations += 1; //increases number of cursors
      genes -= mutationCost; //removes the cookies spent
      document.getElementById("mutations").innerHTML = mutations; //updates the number of cursors for the user
      document.getElementById("genes").innerHTML = genes; //updates the number of cookies for the user
   }
   var nextCost = Math.floor(10 * Math.pow(1.1, mutations)); //works out the cost of the next cursor
   document.getElementById("mutationCost").innerHTML = nextCost; //updates the cursor cost for the user
}
//#endregion

var buyUpgrade = {
   clickingUpgrade: function (amountToMultiply) {
      clickingMultiplyer += amountToMultiply;
   },
   mutationUpgrade: function (amountToMultiply) {
      mutationMultiplyer += amountToMultiply;
   },
};

document.getElementById("clickingUpgrade1").addEventListener("click", () => {
   var cost = 200;
   if (genes >= cost) {
      buyUpgrade.clickingUpgrade(1);
      document.getElementById("genes").innerHTML = genes;
      document.getElementById("clickingUpgrade1").remove();
   }
});

window.setInterval(function () {
   addGenes((mutations / 100) * mutationMultiplyer);
}, 10);
