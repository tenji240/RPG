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

function action(primary, target) {
  console.log(primary, target);
};

function main() {
  let $log = $('.well');
  console.log($log);
};

$(document).ready(function(){
  console.log('working...');
  main();
});
