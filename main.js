var heroes = {
  blader: {
    health: 100,
    maxHealth: 100,
    damage: 10,
    accuracy: 80,
    status: true,
  },
  healer: {
    health: 70,
    maxHealth: 70,
    damage: 10,
    accuracy: 100,
    status: true,
  },
};

var villians = {
  boss: {
    health: 1000,
    damage: 20,
    accuracy: 60,
    status: true,
  },
};


function hasWon(hero, villian) {
  if (hero.health >= 0 && villian.health <= 0){
    return true;
  }
  return false;
};

function autoAttack() {
  printlog("Attack Made");
  console.log("hero attack accuracy: " + Math.floor((heroes.blader.accuracy * Math.random())));
  console.log("hero attack damage: " + Math.floor((heroes.blader.damage * Math.random())))

  console.log("hero attack accuracy: " + Math.floor((heroes.blader.accuracy * Math.random())));
  console.log("hero attack damage: " + Math.floor((heroes.blader.damage * Math.random())))
}

function autoHeal() {
  printlog("Heal Made");
}

function printlog(str) {
  let $log = $('#log');
  $log.append("<p>" + str + "</p>");
};

function main() {
  let $attack = $('#atk');
  let $heal =  $('#heal');

  $attack.click(() => {
    autoAttack();
  });

  $heal.click(() => {
    autoHeal();
  });
};

$(document).ready(function(){
  console.log('working...');
  main();
});
