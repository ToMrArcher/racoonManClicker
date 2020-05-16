var genesMessages = [
   "Ouch, a racoon bit me in this higly dangerous radioactive facility that conducts experiments on racoons my class is taking a field trip to, better not tell any adults about it!",
   "I can eat trash!!! Damn thats awesome!",
];

var income = {
   clickingPower: {
      base: 1,
      multiplier: 0,
   },
   mutations: {
      base: 0,
      multiplier: 0,
   },
   total: {
      base: 0,
      multiplier: 0,
      absoluteTotal: 0,
   },
};

var nextMessageThreshold = [1, 0];
var genes = 0;
var clickingMultiplyer = 1;
var mutationMultiplyer = 1;

function addGenes(number) {
   genes += number;
   document.getElementById("genes").innerHTML = Math.floor(genes);

   //Threshhold for next message logic.
   if (genes >= nextMessageThreshold[0]) {
      document.getElementById("topText").innerHTML =
         genesMessages[nextMessageThreshold[1]];
      if (!(nextMessageThreshold[1] + 1 >= genesMessages.length)) {
         nextMessageThreshold[0] *= 1000;
         nextMessageThreshold[1] += 1;
      } else {
         nextMessageThreshold = Infinity;
      }
   }
}

//#region CLICKING - Clicking button and clicking level

document.getElementById("clickButton").addEventListener("click", function () {
   addGenes(
      income.clickingPower.base *
         (income.clickingPower.multiplier != 0
            ? income.clickingPower.multiplier
            : 1)
   );
});

function buyTrainingLevel() {
   var trainingCost = Math.floor(50 * Math.pow(1.1, income.clickingPower.base));
   if (genes >= trainingCost) {
      income.clickingPower.base += 1;
      genes -= trainingCost;
      document.getElementById("trainingPower").innerHTML =
         income.clickingPower.base;
      document.getElementById("genes").innerHTML = genes;
   }
   var nextCost = Math.floor(50 * Math.pow(1.1, income.clickingPower.base));
   document.getElementById("trainingCost").innerHTML = nextCost;
}
//#endregion

//#region MUTATIONS - 1st level autoclick

function buyMutation() {
   var mutationCost = Math.floor(10 * Math.pow(1.1, income.mutations.base)); //works out the cost of this cursor
   if (genes >= mutationCost) {
      //checks that the player can afford the cursor
      income.mutations.base += 1; //increases number of cursors
      genes -= mutationCost; //removes the cookies spent
      document.getElementById("mutations").innerHTML = income.mutations.base; //updates the number of cursors for the user
      document.getElementById("genes").innerHTML = genes; //updates the number of cookies for the user
   }
   var nextCost = Math.floor(10 * Math.pow(1.1, income.mutations.base)); //works out the cost of the next cursor
   document.getElementById("mutationCost").innerHTML = nextCost; //updates the cursor cost for the user
}
//#endregion

var buyUpgrade = {
   clickingUpgrade: function (amountToMultiply) {
      income.clickingPower.multiplier += amountToMultiply;
   },
   mutationUpgrade: function (amountToMultiply) {
      income.mutations.multiplier += amountToMultiply;
   },
};

document.getElementById("clickingUpgrade1").addEventListener("click", () => {
   var cost = 200;
   if (genes >= cost) {
      buyUpgrade.clickingUpgrade(1);
      document.getElementById("genes").innerHTML = genes;
      document.getElementById("clickingUpgrade1").remove();
      document.createElement("button");
   }
});

window.setInterval(function () {
   income.total.absoluteTotal =
      income.mutations.base *
      (income.mutations.multiplier != 0 ? income.mutations.multiplier : 1);
   addGenes(income.total.absoluteTotal / 100);
}, 10);
