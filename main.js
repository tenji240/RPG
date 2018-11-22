const MAX_HEALTH_BLADER = 100;

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

var villans = {
  boss: {
    health: 1000,
    damage: 20,
    accuracy: 60,
    status: true,
  },
};


function hasWon(hero, villan) {
  if (hero.health >= 0 && villan.health <= 0){
    return true;
  }
  return false;
};

function bossAtack() {
  let boss_dmg = 0;
  const boss_accuracy =  Math.floor((villans.boss.accuracy * Math.random()));
  console.log("Boss accuracy: " + boss_accuracy);
  if (boss_accuracy > 40) {
    boss_dmg = Math.floor((villans.boss.damage * Math.random()));
  }
  else {
    console.log("boss has missed");
  }
  printlog("Boss DMG: " + boss_dmg);
  heroes.blader.health -= boss_dmg;
}

function autoAttack() {
  printlog("----------------");
  printlog("Turn Exectued");
  let hero_dmg = 0;
  const hero_accuracy =  Math.floor((heroes.blader.accuracy * Math.random()));
  console.log("Hero accuracy: " + hero_accuracy);
  if (hero_accuracy > 30) {
    hero_dmg = Math.floor((heroes.blader.damage * Math.random())) * 10;
  }
  else {
    console.log("hero has missed");
  }
  bossAtack();
  villans.boss.health -= hero_dmg;
  autoHeal();
  printlog("Hero DMG: " + hero_dmg);
  printlog("Boss Health: " + villans.boss.health);
  printlog("----------------");

}

function autoHeal() {
  let healer_recover = 0;
  const healer_accuracy = Math.floor(heroes.healer.accuracy * Math.random());
  if (healer_accuracy > 70) {
    healer_recover = Math.floor(heroes.healer.damage * Math.random());
  }
  const tempHealth = heroes.blader.health + healer_recover;
  if (tempHealth <= 100) {
    heroes.blader.health = tempHealth;
  } else {
    console.log("overage");
    heroes.blader.health = MAX_HEALTH_BLADER;
  }
  printlog('Current Blader Health: ' + heroes.blader.health);
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
