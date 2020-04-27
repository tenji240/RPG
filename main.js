const MAX_HEALTH_BLADER = 100;
const MAX_HEALTH_BOSS = 1000;
let $attack = $('#atk');
let $heal =  $('#heal');
let $log = $('#log');
let $reset = $('#reset');

// ** TODO: Define generic classes
// ?? investigate framework update?
let $heroHealth = $('#hero-health');
let $heroDMG = $('#hero-dmg');
let $heroTaken = $('#hero-taken');
let $healer = $('#healer');
let $heroStats = $('#hero-stats'); // ** testing w/string for now

let $bossHealth = $('#boss-health');
let $bossDMG = $('#boss-dmg');
let $bossTaken = $('#boss-taken');


var heroes = {
  blader: {
    health: MAX_HEALTH_BLADER,
    maxHealth: MAX_HEALTH_BLADER,
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
    health: MAX_HEALTH_BOSS,
    maxHealth: MAX_HEALTH_BOSS,
    damage: 20,
    accuracy: 60,
    status: true,
  },
};

// ** ANIMATION FUNCTION  
// animation end isnt getting hit properly
// need to fix logic here on click
function animate(element, animationName, callback) {
  const node = document.querySelector(element);
  node.setAttribute("class", "");
  console.log('NODE', node.classList);
  node.classList.add('animated', animationName);

  function handleAnimationEnd() {
    console.log('HOLLA');
    node.addEventListener('animationend', handleAnimationEnd);
    if (typeof callback ===  'function') callback();
  }

  node.addEventListener('animationend', handleAnimationEnd);
}

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
    $heroTaken.empty();
    $heroTaken.append(boss_dmg + ' damage taken');
    $bossDMG.empty();
    $bossDMG.append(boss_dmg + ' damage dealt');
    printlog("Boss hit for " + boss_dmg + " dmg with " + boss_accuracy + "% accuracy");
  }
  else {
    printlog("Boss has missed");
    $heroTaken.empty();
    $heroTaken.append('0 damage taken');
  }
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
    $heroDMG.empty();
    $heroDMG.append(hero_dmg + ' damage dealt');
    $bossTaken.empty();
    $bossTaken.append(hero_dmg + ' damage taken');
    printlog("Hero hit for " + hero_dmg + " dmg with " + hero_accuracy + "% accuracy");
  }
  else {
    printlog("Hero has missed");
    $heroDMG.empty();
    $heroDMG.append('0 damage dealt');
  }
  bossAtack();
  villans.boss.health -= hero_dmg;
  // autoHeal(); not sure why tbh
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

function hasWon() {
  if (heroes.blader.health > 0 && villans.boss.health <= 0) {
    printlog('WINNER! CONGRATULATIONS');
    $reset.css('display', 'inline-block');
  } else if (heroes.blader.health <= 0 && villans.boss.health > 0) {
    printlog('GAME OVER! :(');
    $reset.css('display', 'inline-block');
  } else {
    console.log('the game is still afoot');
    $reset.css('display', 'none');
  }
}

function updateHealth(){
  $heroHealth.css("width", `${heroes.blader.health}%`);
  $bossHealth.css("width", `${(villans.boss.health / MAX_HEALTH_BOSS) * 100}%`);
}

function printlog(str) {
  $log.append("<p>" + str + "</p>");
};

function clearLog() {
  $log.empty();
}

function reset() {
  heroes.blader.health = MAX_HEALTH_BLADER;
  villans.boss.health = MAX_HEALTH_BOSS;
  updateHealth();
  clearLog();
}

function main() {
  $attack.click(() => {
    clearLog();
    autoAttack();
    updateHealth();
    animate('#hero-stats', 'zoomInDown', function() {
      $heroStats.removeClass();
      $heroStats.addClass('animated', 'zoomOutUp');
    })
    hasWon();
  });

  $heal.click(() => {
    autoHeal();
    updateHealth();
  });

  $reset.click(() => {
    reset();
    $reset.css('display', 'none');
  })
};

$(document).ready(function(){
  console.log('working...');
  main();
});
