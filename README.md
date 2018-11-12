# Functions

## main

Main Gameplay loop:
Heroes go first, villans second. flip on player turn bool. Pick hero to attack, and villian to attack. Game run random num gen based on accuracy stat. If in range, subtract health from target. if not, show player missed. Note: if healer selected, add health to target. Villans repeat the same process, but automated. randomly choose player. Game ends when boss health is under 0 or when caster & hero are dead.

## hasWon

 Win condition:
 Check if hero is alive. if hero is dead then you lost. If hero is alive, check if villian is dead. if true, you win. If both are still alive
