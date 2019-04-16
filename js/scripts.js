//Floor class and its protoypes
class Floor{
  constructor(thisR, thisC){
    this.row = thisR;
    this.col = thisC;
    this.roomArr = new Array(thisR).fill(0).map(() => new Array(thisC).fill(0));
  }
}

//Room class and its protoypes
class Room{
  constructor(posX, posY){
    this.y = posX;
    this.x = posY;
  }
}

//Player class and its prototypes
class Player{
  constructor(name, job, startPosX, startPosY){
    //Player Attributes
    this.name = name;
    this.job = job;
    this.currentHP;
    this.alive = true;
    //Player Inventory
    this.weapon = "fists";
    this.items = [];
    //Player Position
    this.x = startPosX;
    this.y = startPosY;
  }
}

Player.prototype.getStats = function getStats(){
  if (this.job === "warrior") {
    this.maxHP = 20;
    this.currentHP = 20;
    this.strength = 4;
    this.speed = 3;
    this.specialName = "Guard";
    this.special = function special() {
      $("#combat-log").append(this.name + " defended against the enemy " + "<br>");
      this.defend = true;
    };
  } else if (this.job === "wizard"){
    this.maxHP = 10;
    this.currentHP = 10;
    this.maxMP = 10;
    this.currentMP = 10;
    this.strength = 5;
    this.speed = 4;
    this.specialName = "Cast";
    this.special = function special() {
      $("#combat-log").append(newEnemy.type + " attacked and did " + damageTaken + " damage" + "<br>");
    };
  } else if (this.job === "thief"){
    this.maxHP = 15;
    this.currentHP = 15;
    this.strength = 2;
    this.speed = 5;
    this.specialName = "Steal";
    this.special = function special() {
      $("#combat-log").append(newEnemy.type + " attacked and did " + damageTaken + " damage" + "<br>");
    };
  }
}

//Player explore functions
Player.prototype.moveGrid = function moveGrid(){

}

Player.prototype.checkGrid = function checkGrid(){

}

//Player combat functions
Player.prototype.fight = function fight(){
  return this.strength;
}

Player.prototype.run = function run(){
  var escapeRoll = this.speed + Math.floor((Math.random() * 5 ) + 1);
  if (escapeRoll >= 8) {
    return true;
  } else {
    return false;
  }
}

Player.prototype.takeDamage = function takeDamage(damageTaken){
this.currentHP = this.currentHP - damageTaken;
if (this.currentHP <= 0) {
  this.alive = false;
  }
}

//Player item functions
Player.prototype.checkItems = function checkItems(){
  $("#combat-log").append("Items:" + "<br>");
  this.items.forEach(function(item) {
    $("#combat-log").append(item + "<br>");
  });
}

Player.prototype.addItem = function addItem(itemToAdd) {
  this.items.push(itemToAdd);
}

Player.prototype.useItem = function useItems(itemToUse){
}

//Enemy functions
class Enemy{
  constructor(type, positionX, positionY){
  this.type = type;
  this.alive = true;
  this.x = positionX;
  this.y = positionY;
  }
}

Enemy.prototype.getStats = function getStats(){
  if (this.type === "Slime") {
    this.maxHP = 5;
    this.currentHP = 5;
    this.strength = 1;
    this.speed = 1;
  } else if (this.type === "Troll") {
    this.maxHP = 15;
    this.currentHP = 15;
    this.strength = 5;
    this.speed = 2;
  } else if (this.type === "Dragon") {
    this.maxHP = 20;
    this.currentHP = 20;
    this.strength = 10;
    this.speed = 4;
  }
}

Enemy.prototype.enemyTurn = function enemyTurn(enemyType, enemyStrength){
  var damageTaken = enemyStrength;
  newPlayer.takeDamage(damageTaken);
  $("#combat-log").append(enemyType + " attacked and did " + damageTaken + " damage" + "<br>");
}

Enemy.prototype.takeDamage = function takeDamage(damageTaken){
this.currentHP = this.currentHP - damageTaken;
if (this.currentHP <= 0) {
  this.alive = false;
  }
}

class Item{
  constructor(){
  }
}

//Helper Functions
function printFloor(floorObj){
  console.log('Printing out our floor Layout');
  for(var i = 0; i < floorObj.row; i++){
    var rowStr = '';
    for(var j = 0; j < floorObj.col; j++){
      var colStr = '['+i+','+j;
      if(j === floorObj.col - 1){
        colStr += ']\n';
      }else{
        colStr += ']';
      }
      rowStr += colStr;
    }
    console.log(rowStr);
  }
}

function determineTurnOrder(playerSpeed, enemySpeed) {
  if (playerSpeed >= enemySpeed) {
    return true;
  } else {
    return false;
  }
}

function checkForDeath(playerStatus, enemyStatus) {
  if (playerStatus === false) {
    $("#combat-log").append(newPlayer.name + " was defeated" + "<br>" + "GAME OVER");
  } else if (enemyStatus === false) {
    $("#combat-log").append(newPlayer.name + " defeats the enemy" + "<br>");
  }
}


function combat() {
  $(".dungeon-UI").hide();
  $(".combat-UI").show();
  var newEnemy = new Enemy("Dragon");
  newEnemy.getStats()
  $("#combat-log").append(newEnemy.type + " attacked!" + "<br>");
  var firstMove = determineTurnOrder(newPlayer.speed, newEnemy.speed);
  if (firstMove === false) {
    newEnemy.enemyTurn(newEnemy.type, newEnemy.strength);
    checkForDeath(newPlayer.alive, newEnemy.alive);
  }
    $("#attack-combat").click(function(event) {
      event.preventDefault();
      var damageDone = newPlayer.fight();
      newEnemy.takeDamage(damageDone);
      $("#combat-log").append(newPlayer.name + " attacked with their " + newPlayer.weapon + "<br>" + newEnemy.type + " took " + damageDone + " damage " + "<br>");
      checkForDeath(newPlayer.alive, newEnemy.alive);
      newEnemy.enemyTurn(newEnemy.type, newEnemy.strength);
      checkForDeath(newPlayer.alive, newEnemy.alive);
  });

    $("#special-combat").click(function(event) {
      event.preventDefault();
      newPlayer.special();
      if (newPlayer.defend === true) {
        $("#combat-log").append(newEnemy.type + "'s attack had no effect on " + newPlayer.name + "<br>");
        newPlayer.defend = false;
      } else {
      newEnemy.enemyTurn(newEnemy.type, newEnemy.strength);
      checkForDeath(newPlayer.alive, newEnemy.alive);
    }
  });


    $("#items-combat").click(function(event) {
      event.preventDefault();
      newPlayer.checkItems();
      newEnemy.enemyTurn(newEnemy.type, newEnemy.strength);
      checkForDeath(newPlayer.alive, newEnemy.alive);
    });

    $("#run-combat").click(function(event) {
      debugger
      event.preventDefault();
      var success = newPlayer.run();
      if (success === true) {
        $("#combat-log").append(newPlayer.name + " successfully ran away" + "<br>");
        //switch to dungeon phase
      } else {
        $("#combat-log").append(newPlayer.name + " failed to run away" + "<br>");
        newEnemy.enemyTurn(newEnemy.type, newEnemy.strength);
        checkForDeath(newPlayer.alive, newEnemy.alive);
      }
      });
  }

//globals
let dungeonOne = new Floor(4, 4);
printFloor(dungeonOne);
console.log(dungeonOne.roomArr);
let newPlayer = new Player();

//User input logic
$(document).ready(function() {
  $("#start-game").click(function(event) {
    event.preventDefault();
    $(".start-UI").hide();
    newPlayer.name = $("#character-name").val();
    newPlayer.job = $("#character-job").val();
    newPlayer.getStats();
    $("#special-name").append(newPlayer.specialName);
    combat();
  });
});
