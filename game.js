var genesMessages = [
   "Ouch, a racoon bit me in this higly dangerous radioactive facility that conducts experiments on racoons my class is taking a field trip to, better not tell any adults about it!",
   "I can eat trash!!! Damn thats awesome!",
];

var income = {
   clickingPower: {
      base: 1,
      multiplier: 1,
   },
   mutations: {
      base: 0,
      multiplier: 1,
   },
   total: {
      base: 0,
      multiplier: 0,
      absoluteTotal: 0,
   },
};

var upgrades = {
   click: {
      currentUpgrade: 0,
      upgrades: [
         {
            cost: 200,
            upgradeAmount: 1,
            html: "Longer fingernails (+1 to clicking multiplier) Cost: 200",
         },
         {
            cost: 2000,
            upgradeAmount: 2,
            html: `Even longer fingernails (+2 to clicking multiplier) Cost: 2000`,
         },
      ],
   },
   mutations: {
      currentUpgrade: 0,
      upgrades: [
         {
            cost: 200,
            upgradeAmount: 1,
            html:
               "Faster rate of mutation generation (+1 to mutation multiplier) Cost: 200",
         },
         {
            cost: 2000,
            upgradeAmount: 2,
            html:
               "Even faster rate of mutation generation (+2 to mutation multiplier) Cost: 2000",
         },
      ],
   },
   buyUpgrade: {
      clickingUpgrade: function (amountToMultiply, cost) {
         if (genes >= cost) {
            income.clickingPower.multiplier += amountToMultiply;
            genes -= cost;
            return true;
         }
         return false;
      },
      mutationUpgrade: function (amountToMultiply, cost) {
         if (genes >= cost) {
            income.mutations.multiplier += amountToMultiply;
            genes -= cost;
            return true;
         }
         return false;
      },
   },
};

var nextMessageThreshold = [1, 0];
var genes = 0;

window.onload = () => {
   for (let i = 0; i < upgrades.click.upgrades.length; i++) {
      let button = document.createElement("button");
      button.innerHTML = upgrades.click.upgrades[i].html;
      button.addEventListener("click", function () {
         if (
            upgrades.buyUpgrade.clickingUpgrade(
               upgrades.click.upgrades[i].upgradeAmount,
               upgrades.click.upgrades[i].cost
            )
         ) {
            button.remove();
         }
      });
      document.getElementById("mainBody").appendChild(button);
   }

   for (let i = 0; i < upgrades.mutations.upgrades.length; i++) {
      let button = document.createElement("button");
      button.innerHTML = upgrades.mutations.upgrades[i].html;
      button.addEventListener("click", function () {
         if (
            upgrades.buyUpgrade.mutationUpgrade(
               upgrades.mutations.upgrades[i].upgradeAmount,
               upgrades.mutations.upgrades[i].cost
            )
         ) {
            button.remove();
         }
      });
      document.getElementById("mainBody").appendChild(button);
   }
};

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

window.setInterval(function () {
   income.total.absoluteTotal =
      income.mutations.base *
      (income.mutations.multiplier != 0 ? income.mutations.multiplier : 1);
   addGenes(income.total.absoluteTotal / 100);
}, 10);
