$(document).ready(function () {


    var Lurker = {
        type: 'Lurker',
        'Health Points': 200,
        'Attack Power': 4,
        'Computer Attack Power': 20,
        'playerPickedUnit': false,
        'enemyPickedUnit': false,
        'stillAlive': true,
        "imgurl": `src="assets/Images/Lurker_SCR_HeadAnim.gif"`
    }
    var Hydralisk = {
        type: 'Hydralisk',
        'Health Points': 175,
        'Attack Power': 5,
        'Computer Attack Power': 15,
        'playerPickedUnit': false,
        'enemyPickedUnit': false,
        'stillAlive': true,
        "imgurl": `src="assets/Images/Hydralisk.gif"`
    }
    var Zergling = {
        type: 'Zergling',
        'Health Points': 150,
        'Attack Power': 6,
        'Computer Attack Power': 10,
        'playerPickedUnit': false,
        'enemyPickedUnit': false,
        'stillAlive': true,
        "imgurl": `src="assets/Images/Zergling_SCR_HeadAnim.gif"`
    }
    var Rhynadon = {
        type: 'Rhynadon',
        'Health Points': 140,
        'Attack Power': 7,
        'Computer Attack Power': 5,
        'playerPickedUnit': false,
        'enemyPickedUnit': false,
        'stillAlive': true,
        "imgurl": `src="assets/Images/Rhynadon_SCR_HeadAnim.gif"`
    }

    var allCharacters = [Rhynadon, Zergling, Hydralisk, Lurker];
    var playerCharacter = "";
    var enemyCharacters = [];
    var defender = "";
    var startingPlayerPower = 0;
    var startingPlayerHealth = 0;
    var startingEnemyHealth = 0;
    var defenderDamage = 0;
    var defenderHealth = 0;
    
    populateAllCharacters(allCharacters);

    $(".startingZerg").on("click", function () {

        var getPlayer = $(this).attr("value");

        playerCharacter = getCharacterByType(getPlayer);
        startingPlayerHealth = playerCharacter["Health Points"];

        populatePlayerCharacter(playerCharacter);
        
        $("#allCharacters").hide();
        $("#intro").hide();
    });

    $("#enemyDiv").on("click", ".enemies", function () {

        
        var getDefender = $(this).attr("value");


        defender = getDefenderByType(getDefender);
        startingEnemyHealth = defender["Health Points"];
        defenderDamage = defender["Counter Attack Points"]
        populateDefender(defender);

        $("#enemyDiv").hide();

    });

    $("button").on("click", function() {
        
        attackEnemy(playerCharacter, defender);
        populatePlayerCharacter(playerCharacter);
    })


    function getCharacterByType(type) {
        for (characters in allCharacters) {
            if (allCharacters[characters].type === type) {
                playerCharacter = allCharacters[characters];
                playerCharacter.playerPickedUnit = true;
            }
        }
        return playerCharacter;
    }


    function getDefenderByType(type) {
        for (enemies in enemyCharacters) {
            if (enemyCharacters[enemies].type === type) {
                defender = enemyCharacters[enemies];
                defender.enemyPickedUnit = true;
            }
        }
        return defender;

    }

    function attackEnemy(playerCharacter, defender) {        

        startingPlayerPower = startingPlayerPower + playerCharacter["Attack Power"];
        startingEnemyHealth = startingEnemyHealth - startingPlayerPower;
        startingPlayerHealth = startingPlayerHealth - defender["Computer Attack Power"];
        
        defender["Health Points"] = startingEnemyHealth;
        playerCharacter["Health Points"] = startingPlayerHealth;
        playerCharacter["Attack Power"] = startingPlayerPower;

        populatePlayerCharacter(playerCharacter);
        populateDefender(defender);

        if (startingEnemyHealth <= 0) {
            $("#fightText").html("<h2>You have defeated the enemy</h2>");
            defender.stillAlive = false;
            for (character in allCharacters) {
                var checkEnemyArrayLength = [];

                if (allCharacters[characters].stillAlive === true && allCharacters[characters].playerPickedUnit === false) {
                    checkEnemyArrayLength.push(allCharacters[characters]);
                }
                if (checkEnemyArrayLength.length === 0) {
                    $("#fightText").html("<h2>You have defeated all opponents! Refresh to play again!")
                }
            }
            populateEnemyCharacters(allCharacters);
            $("#enemyDiv").show();
            $("#defenderDiv").empty();
        }

        if (startingPlayerHealth <= 0) {
            $("#fightText").html("<h2>You have been defeated! Refresh to try again</h2>");
        }


    }

    function resetGame() {
        $("#playerDiv").empty();
        $("#enemyDiv").empty();
    }
    
    
    function populateAllCharacters(allCharacters){

    for (var character in allCharacters) {
        var characterCard = '<div class="col-md-3"><div class="card startingZerg" style="width: 18rem;" value="' + allCharacters[character].type + '">'
        characterCard += `<img class="card-img-top" ` + allCharacters[character].imgurl + ` alt="Character Image">`
        characterCard += `<div class="card-img-overlay">`
        characterCard += `<h5 class="card-title">` + allCharacters[character].type + `</h5>`
        characterCard += `<p class="card-text"> Health Points = ` + allCharacters[character]["Health Points"] + `</p>`
        characterCard += `<p class="card-text"> Attack Power = ` + allCharacters[character]["Attack Power"] + `</p>`


        $("#allCharacters").append(characterCard);
    }
   }

    function populateEnemyCharacters(allCharacters) {
        $("#enemyDiv").empty();
        enemyCharacters = [];
        for (var characters in allCharacters) {
            if (allCharacters[characters].stillAlive === true && allCharacters[characters].playerPickedUnit === false) {
                enemyCharacters.push(allCharacters[characters]);
            }
        }
        for (var unpicked in enemyCharacters) {

            var unpickedCards = '<div class="col-md-3"><div class="card enemies" style="width: 18rem;" value="' + enemyCharacters[unpicked].type + '">'
            unpickedCards += '<img class="card-img-top" ' + enemyCharacters[unpicked].imgurl + ' alt="Character Image">'
            unpickedCards += '<div class="card-img-overlay">'
            unpickedCards += '<h5 class="card-title">' + enemyCharacters[unpicked].type + '</h5>'
            unpickedCards += '<p class="card-text"> Health Points = ' + enemyCharacters[unpicked]["Health Points"] + '</p>'
            unpickedCards += '<p class="card-text"> CPU Attack Power = ' + enemyCharacters[unpicked]["Computer Attack Power"] + '</p>'

            $("#enemyDiv").append(unpickedCards);
        }
    }

    function populateDefender(defender) {
        $("#defenderDiv").empty();

        var defenderCard = '<div class="col-md-3"><div class="card" style="width: 18rem;" value="' + defender.type + '">'
        defenderCard += '<img class="card-img-top" ' + defender.imgurl + ' alt="Character Image">'
        defenderCard += '<div class="card-img-overlay">'
        defenderCard += '<h5 class="card-title">' + defender.type + '</h5>'
        defenderCard += '<p class="card-text"> Health Points = ' + defender["Health Points"] + '</p>'
        defenderCard += '<p class="card-text"> Computer Attack Power = ' + defender["Computer Attack Power"] + '</p>'

        $("#defenderDiv").append(defenderCard);
    }

    function populatePlayerCharacter(playerCharacter){
        $("#playerDiv").empty();
        var playerCard = '<div class="col-md-3"><div class="card" style="width: 18rem;" value="' + playerCharacter.type + '">'
        playerCard += '<img class="card-img-top" ' + playerCharacter.imgurl + 'alt="Character Image">'
        playerCard += '<div class="card-img-overlay">'
        playerCard += '<h5 class="card-title">' + playerCharacter.type + '</h5>'
        playerCard += '<p class="card-text"> Health Points = ' + playerCharacter["Health Points"] + '</p>'
        playerCard += '<p class="card-text"> Attack Power = ' + playerCharacter["Attack Power"] + '</p>'

        populateEnemyCharacters(allCharacters);
        $("#playerDiv").append(playerCard);
    }

})
    // for (var character in allCharacters) {

    //     if (allCharacters[character].playerPickedUnit === false) {

    //         var playerCard = `<div class="col-md-3"><div class="card" style="width: 18rem;">`
    //         playerCard += `<img class="card-img-top" ` + playerCharacter.imgurl + 'alt="Character Image">'
    //         playerCard += '<div class="card-body>'
    //         playerCard += `<h5 class="card-title">` + playerCharacter.type + `</h5>`
    //         playerCard += `<p class="card-text"> Health Points = ` + allCharacters[character]["Health Points"] + `</p>`
    //         playerCard += `<p class="card-text"> Attack Power = ` + allCharacters[character]["Attack Power"] + `</p>`

    //         $("#playerDiv").append(playerCard);
    //     }
    // if (allCharacters[character].playerPickedUnit === false) {
    //     enemyCharacters.push(allCharacters[character]);

    //     for (var unpicked in enemyCharacters) {

    //         var unpickedCards = `<div class="col-md-3"><div class="card" style="width: 18rem;">`
    //         unpickedCards += `<img class="card-img-top" ` + enemyCharacters[unpicked].imgurl + 'alt="Character Image">'
    //         unpickedCards += '<div class="card-body>'
    //         unpickedCards += `<h5 class="card-title">` + enemyCharacters[unpicked].type + `</h5>`
    //         unpickedCards += `<p class="card-text"> Health Points = ` + enemyCharacters[unpicked]["Health Points"] + `</p>`
    //         unpickedCards += `<p class="card-text"> Attack Power = ` + enemyCharacters[unpicked]["Attack Power"] + `</p>`

    //         $("#enemyDiv").append(unpickedCards);

    // Rhynadon["playerPickedUnit"] = true;

    // console.log(check);
    // var playerCard = `<div class="col-md-3"><div class="card" style="width: 18rem;">`
    // playerCard += `<img class="card-img-top" ` + playerCharacter.imgurl + 'alt="Character Image">'
    // playerCard += '<div class="card-body>'
    // playerCard += `<h5 class="card-title">` + playerCharacter.type + `</h5>`
    // playerCard += `<p class="card-text"> Health Points = ` + allCharacters[character]["Health Points"] + `</p>`
    // playerCard += `<p class="card-text"> Attack Power = ` + allCharacters[character]["Attack Power"] + `</p>`

    // $("#playerDiv").append(playerCard);




