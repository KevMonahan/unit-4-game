$(document).ready(function(){
    var character1 = {
        'Health Points': 200,
        'Attack Power': 5,
        'Computer Attack Power': 20,
        'playerPickedUnit': false
    }
    var character2 = {
        'Health Points': 175,
        'Attack Power': 6,
        'Computer Attack Power': 15,
        'playerPickedUnit': false
    }
    var character3 = {
        'Health Points': 150,
        'Attack Power': 7,
        'Computer Attack Power': 10,
        'playerPickedUnit': false
    }
    var character4 = {
        'Health Points': 120,
        'Attack Power': 8,
        'Computer Attack Power': 5,
        'playerPickedUnit': false
    }

    var allCharacters = [character1, character2, character3, character4];
    var playerCharacter = "";
    var unpickedCharacters = [];
    var playerAttackPower = 0;
    var playerHealthPoints = 0;
    var enemyHealthPoints = 0;

    function pickCharacter() {

    }

    function pickEnemy() {

    }

    function attackEnemy() {

    }

    function resetGame() {
        $("#playerDiv").empty();
        $("#enemyDiv").empty();
    }


    



})