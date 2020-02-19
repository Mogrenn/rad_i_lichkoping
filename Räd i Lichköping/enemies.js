//lycka till :D
var canvas;
var ctx;
var TO_RADIANS = Math.PI / 180;
var TO_DEG = 180 / Math.PI;
var mobs = new Array();
var players = new Array();
var keyDownsArcher = new Array();
var keyDownsKnight = new Array();
var arrows = new Array();
var enemyArrows = new Array();
var items = new Array();
var buttons = new Array();
var itemsArcher = new Array();
var itemsKnight = new Array();
var bossMobs = new Array();
var ground = new Array();
var magic = new Array();
var boss = new Array();
var itemPoolArcher = new Array();
var itemPoolKnight = new Array();
var itemGood = new Array();
var itemBad = new Array();
var itemSpecialArcher = new Array();
var itemSpecialKnight = new Array();
var runes = new Array();
var menu;
var menuStartButton;
var menuStart = true;
var pauseMenu;
var pauseMenuStartButton;
var pauseMenuQuitButton;
var pauseMenuStart = false;
var sound = new Audio("sound/secret.mp3");
var muteButton;
var mute = true;
var deathScreenbool = false;
var deathscreen;
var deathScreenMainMenuButton;
var deathScreenRetryButton;
var combination;
var loading;
var enemyX = Math.floor(Math.random() * 680) + 170;
var enemyY = Math.floor(Math.random() * 680) + 20;
var level = 0;
var killsperLevel = 0;
var transition = false;
var pressed = false;
var heartArrayP1 = new Array();
var heartArrayP2 = new Array();
var playerAreas = new Array();
var stumps = new Array();
var loadingscreen = new Image;
loadingscreen.src = "bilder/Menu/loading.png";
var picture;
var spawnCD;
var once = false;
var P1Active = false;
var P2Active = false;
var hitboxeson = false;
var levelMusic = new Audio("sound/skogBakgrund.mp3");
levelMusic.loop = true;
var victorycreen = new Image;
victorycreen.src = "bilder/Menu/victory.png";
var victoryScreenbool = true;
var creditsCountDown = 600;
var Credits1 = new Image;
Credits1.src = "bilder/Menu/endcredits.png";
var ee = new Image;
ee.src = "bilder/Menu/rip.png";
var thefinalcountdown = 1200;
var toMainMenu = 1200;
var x1, x2, x3, y1, y2, y3;

function init() {

    canvas = document.getElementById("can");
    ctx = canvas.getContext("2d");
    document.body.addEventListener("keydown", keydown);
    document.body.addEventListener("keyup", keyup);
    canvas.onmousedown = mouseDown;
    spawnCD = -1;
    //creating itemPools
    for (i = 1; i < 11; i++) {

        if (i < 5) {
            itemPoolArcher.push("good");
            itemPoolKnight.push("good");
        } else if (i > 3 && i < 9) {
            itemPoolArcher.push("bad");
            itemPoolKnight.push("bad");
        } else {
            itemPoolArcher.push("special");
            itemPoolKnight.push("special");
        }
    }

    fillItems();
    //ta reda på typ av klass player är för något
    //console.log(player_range[0].constructor.name);

    menu = new Image;
    menu.src = "bilder/Menu/startmeny.png";
    pauseMenu = new Image;
    pauseMenu.src = "bilder/Menu/pause.png";
    deathscreen = new Image;
    deathscreen.src = "bilder/Menu/deathscreen.png";
    //gör så att knapparna är clickable
    menuStartButton = new collisionBody(360, 515, 280, 115);
    muteButton = new collisionBody(910, 7, 85, 60);
    pauseMenuStartButton = new collisionBody(410, 370, 175, 150);
    pauseMenuQuitButton = new collisionBody(360, 200, 280, 160);
    deathScreenMainMenuButton = new collisionBody(360, 475, 280, 160);
    deathScreenRetryButton = new collisionBody(360, 310, 280, 160);
    requestAnimationFrame(Menu);
}

//fyller arrays med items
function fillItems() {
    itemGood.push("blank");
    itemGood.push("ring of power");
    itemGood.push("holy grail");
    itemGood.push("gauntlet of strenght");
    itemGood.push("boots of swiftness");
    itemGood.push("Book of mastery");
    itemGood.push("vampiric aura");
    itemGood.push("lucky necklace");
    itemGood.push("speed bracers");
    itemBad.push("blank");
    itemBad.push("cursed ring");
    itemBad.push("dangerous slug");
    itemBad.push("hourglass of tempo");
    itemBad.push("Bandage");
    itemBad.push("apple");
    itemBad.push("meat");
    itemBad.push("thorns");
    itemBad.push("cloak of RNG");
    itemSpecialArcher.push("blank");
    itemSpecialArcher.push("Toxic arrow");
    itemSpecialArcher.push("double shot");
    itemSpecialArcher.push("piercing shot");
    itemSpecialKnight.push("blank");
    itemSpecialKnight.push("whirlwind");
    itemSpecialKnight.push("long sword");
    itemSpecialKnight.push("cleav");
}

//main Menu
function Menu() {
    ctx.save();
    ctx.drawImage(menu, 0, 0, canvas.width, canvas.height);
    //muteButton.update();
    //menuStartButton.update();
    ctx.restore();
    if (menuStart)
        requestAnimationFrame(Menu);
}

//pause menu när man klickar på esc
function pause() {
    ctx.save();
    ctx.drawImage(pauseMenu, 0, 0, canvas.width, canvas.height);
    //pauseMenuStartButton.update();
    //pauseMenuQuitButton.update();
    ctx.restore();
    if (pauseMenuStart)
        requestAnimationFrame(pause);
}

//resetar alla arrays som används under spelets gång (undantag itemPools)
function reset() {
    mobs = new Array();
    players = new Array();
    keyDownsArcher = new Array();
    keyDownsSecondArcher = new Array();
    arrows = new Array();
    enemyArrows = new Array();
    items = new Array();
    itemsArcher = new Array();
    itemsSecondArcher = new Array();
    bossMobs = new Array();
    ground = new Array();
    magic = new Array();
    boss = new Array();
    heartArrayP1 = new Array();
    heartArrayP2 = new Array();
    playerAreas = new Array();
    buttons = new Array();
    stumps = new Array();
}

//bilden som vissas när man dör
function deathScreen() {
//reset();
    ctx.save();
    ctx.drawImage(deathscreen, 0, 0, canvas.width, canvas.height);
    //deathScreenMainMenuButton.update();
    //deathScreenRetryButton.update();

    ctx.restore();
    if (deathScreenbool)
        requestAnimationFrame(deathScreen);
}

function victoryScreen() {
//reset();
    deathScreenbool = false;
    ctx.save();
    ctx.drawImage(victorycreen, 0, 0, canvas.width, canvas.height);
    //deathScreenMainMenuButton.update();
    //deathScreenRetryButton.update();
    ctx.restore();
    if (creditsCountDown === 0) {
        victoryScreenbool = false;
    }
    creditsCountDown--;
    if (victoryScreenbool)
        requestAnimationFrame(victoryScreen);
    else
        requestAnimationFrame(credits);
}

function credits() {
    ctx.save();
    ctx.drawImage(Credits1, 0, 0, canvas.width, canvas.height);
    //deathScreenMainMenuButton.update();
    //deathScreenRetryButton.update();
    ctx.restore();
    if (thefinalcountdown > 0) {
        requestAnimationFrame(credits);
        thefinalcountdown--;
    } else
        requestAnimationFrame(final);
}

function final() {

    ctx.save();
    ctx.drawImage(ee, 0, 0, canvas.width, canvas.height);
    //deathScreenMainMenuButton.update();
    //deathScreenRetryButton.update();
    ctx.restore();
    if (toMainMenu > 0) {
        requestAnimationFrame(final);
        toMainMenu--;
    } else
        requestAnimationFrame(Menu);
}

//ladda in spelet
function loadGame() {
    mute = false;
    picture = new Image;
    if (level === 7) {
        picture.src = "bilder/bakgrund/tronrum.png";
    } else
        picture.src = "bilder/bakgrund/spelbakgrund.png";
    ctx.fillStyle = "#FF0069";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(100, 0, 800, 700);
    players.push(new archer(300, 500, "bilder/player/archer/archer.png", new collisionBody(700, 500, 60, 80), 2, 2));
    players.push(new knight(700, 500, "bilder/player/archer2/archer.png", new collisionBody(700, 500, 60, 80), 2, 2));
    //mobs.push(new goblin_melee(300, 300));
    //boss.push(new lich(500, 170));
    //mobs.push(new skelett(700, 300));
    //runeComb();
    levelMusic.play();
    for (i = 0; i < 1; i++) {

        playerAreas.push(new playerArea("#000000", 150, 0, 700, 700));
    }
    for (i = 0; i < 6; i++) {

//heartArrayP1.push(new heart("bilder/HUD/hjarta.png", 15, 10));

    }
    for (i = 0; i < 6; i++) {

//heartArrayP2.push(new heart("bilder/HUD/hjarta.png", 930, 10));

    }
    for (i = 0; i < 1; i++) {

        stumps.push(new collisionBody(262, 220, 44, 44));
        stumps.push(new collisionBody(728, 338, 32, 42));
        stumps.push(new collisionBody(270, 570, 30, 44));
    }

    for (i = 0; i < 6; i++) {
        keyDownsArcher[i] = false;
        keyDownsKnight[i] = false;
    }

    requestAnimationFrame(draw);
}

//egentligen transition
function start() {

    pressed = false;
    playerAreas = new Array();
    picture = new Image;
    if (level === 6) {
        picture.src = "bilder/bakgrund/tronrum.png";
    } else {
        picture.src = "bilder/bakgrund/spelbakgrund.png";
    }

    for (i = 0; i < 1; i++) {

        playerAreas.push(new playerArea("#000000", 150, 0, 700, 700));
    }
    ctx.save();
    ctx.drawImage(picture, 150, 0);
    ctx.restore();
    players[0].resetPosition();
    for (i = 0, x = 300; i < players.length; i++, x += 200)
        if (players[i].alive)
            spawnItem(x, 200);
    //players[0].resetPosition();
    killsperLevel = 0;
    transition = false;
    once = false;
}

//spawn enemies
function spawn() {

    if (level === 7) {
        boss.push(new lich(500, 170));
    } else {

        enemyX = 0;
        enemyY = 0;
        x = Math.floor(Math.random() * 3) + 3;
        for (f = 0; f < x; f++) {

            enemyX = Math.floor(Math.random() * 680) + 170;
            enemyY = Math.floor(Math.random() * 680) + 20;
            if (enemyX < 700 && enemyY < 100 || enemyX < 700 && enemyY > 600 || enemyX < 150 && enemyX > 0 || enemyX > 750 && enemyX < 900) {

                mobs.push(new goblin_melee(enemyX, enemyY, level));
            } else {

                x++;
            }

        }
    }

}

function recalcHp(player) {

    player.hpBar.recalcheight(player.hearts, player.max_hearts);
}

function recalcCD(player) {

    player.cdBar.recalcheight(player.cooldownSpecial, player.cooldown);
}

//game loop
function draw() {

    if (players.length === 0) {
        deathScreenbool = true;
        deathScreen();
    }
    clear();
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(100, 0, 800, 700);
    if (playerAreas === undefined) {

        ctx.drawImage(loadingscreen, 0, 0);
    }

    ctx.restore();
    try {

        for (s = 0; s < playerAreas.length; s++) {

            squareArea = playerAreas[s];
            ctx.fillStyle = squareArea.col;
            ctx.fillRect(squareArea.picture, squareArea.x, squareArea.y, squareArea.width, squareArea.height);
        }

        ctx.save();
        ctx.drawImage(picture, 150, 0);
        ctx.restore();
    } catch (error) {

//console.log(error);
        /*graphics.fillStyle = "#FF0069";
         graphics.fillRect(squareArea.x, squareArea.y, squareArea.width, squareArea.height);
         level--;
         loading = 25;*/

    }
    ;
    for (i = 0; i < arrows.length; i++) {
        for (j = 0; j < mobs.length; j++) {
            if (arrows[i] !== undefined) {
                if (arrows[i].x < 0 || arrows[i].x > 1000 || arrows[i].y < 0 || arrows[i].y > 700 || arrows[i].dead) {
                    arrows.splice(i, 1);
                    i--;
                } else if (arrows[i].collisionBody.collision(mobs[j].collisionBody)) {
                    if (arrows[i] !== undefined)
                        if (arrows[i].player.lifesteal) {
                            arrows[i].player.lifeSteal();
                        }


                    mobs[j].hp -= arrows[i].damage;
                    arrows.splice(i, 1);
                    if (mobs[j].hp <= 0) {
                        if (arrows[i] !== undefined)
                            if (arrows[i].player.lifesteal) {
                                arrows[i].player.essenceDrain();
                            }

                        mobs.splice(j, 1);
                        killsperLevel++;
                    }

                }
            }
        }
    }


    for (i = 0; i < players.length; i++) {
        if (players[i].cooldownSpecial > 0) {
            players[i].cooldownSpecial--;
            recalcCD(players[i]);
        } else {
            players[i].cdBar.temp2 = 1;
        }

        if (players[i].cooldownAA > 0)
            players[i].cooldownAA--;
        if (players[i].iframes > 0)
            players[i].iframes--;
    }




    if (enemyArrows.length > 0) {
        for (i = 0; i < enemyArrows.length; i++) {
            enemyArrows[i].update();
        }
    }


    if (mobs[0] !== undefined)
        for (i = 0; i < mobs.length; i++) {
            for (j = 0; j < players.length; j++) {
                if (mobs[i].collisionBody.collision(players[j].collisionBody)) {
                    if (players[j].hearts !== 0 && players[j].iframes <= 0) {
                        players[j].hearts -= mobs[i].damage;
                        recalcHp(players[j]);
                        players[j].iframes = 60;
                    } else
                    if (players[j].hearts <= 0)
                        if (players[j].revive) {

                            players[j].hearts = players[j].max_hearts / 2;
                            players[j].revive = false;
                            recalcHp(players[j]);
                        } else
                            players[j].alive = false;
                }

            }

            if (mobs[i].alive) {
                mobs[i].update();
            }

        }



    if (ground.length > 0) {
        for (i = 0; i < ground.length; i++) {
            for (j = 0; j < players.length; j++) {
                if (ground[i] !== undefined)
                    if (players[j].collisionBody.collision(ground[i].collisionBody)) {

                        if (players[j].constructor.name === "archer" && !players[j].slowed) {
                            players[j].moveSpeedMultiplier0 *= 0.5;
                            players[j].slowed = true;
                        } else {
                            if (players[j].constructor.name === "knight" && !players[j].slowed)
                                players[j].moveSpeedMultiplier1 *= 0.5;
                            players[j].slowed = true;
                        }


                    } else {

                        if (players[j].constructor.name === "archer" && players[j].slowed) {
                            players[j].moveSpeedMultiplier0 /= 0.5;
                            players[j].slowed = false;
                        } else {
                            if (players[j].constructor.name === "knight" && players[j].slowed)
                                players[j].moveSpeedMultiplier1 /= 0.5;
                            players[j].slowed = false;
                        }
                    }

                if (ground[i] !== undefined)
                    if (ground[i].timer > 0) {
                        ground[i].update();
                        ground[i].timer--;
                    } else {
                        ground.splice(i, 1);
                        if (players[j].slowed) {
                            players[j].moveSPeedMiltiplier /= 0.5;
                            players[j].slowed = false;

                        }
                    }
            }

        }
    }


    if (bossMobs.length > 0) {

        for (i = 0; i < bossMobs.length; i++) {
            for (j = 0; j < players.length; j++) {
                if (bossMobs[i] !== undefined)
                    if (players[j].collisionBody.collision(bossMobs[i].collisionBody)) {

                        bossMobs.splice(i, 1);
                        boss[0].currentMobs--;
                    } else if (bossMobs[i].timer === 0) {

                        mobs.push(new skelett(bossMobs[i].x, bossMobs[i].y));
                        bossMobs.splice(i, 1);
                        i--;
                        boss[0].currentMobs--;
                    } else {
                        bossMobs[i].update();
                    }
            }


        }

    }


    if (boss.length > 0) {

        for (i = 0; i < boss.length; i++) {

            if (boss[i].gravCD === 0) {
                boss[i].spawnMobs();
                boss[i].gravCD = 1800;
            } else if (boss[i].gravCD > 0) {
                boss[i].gravCD--;
            }

            if (boss[i].groundCD === 0) {
                boss[i].defiledGround();
                boss[i].groundCD = 720;
            } else if (boss[i].groundCD > 0) {
                boss[i].groundCD--;
            }

            if (boss[i].ballCD === 0) {
                boss[i].magicBall();

                if (boss[i].hp > boss[i].maxHp * 0.2) {
                    boss[i].ballCD = 120;
                } else {
                    boss[i].ballCD = 2;
                }

            } else if (boss[i].ballCD > 0) {
                boss[i].ballCD--;
            }

            if (boss[i].runeCD === 0) {
                boss[i].spawnRunes();
                boss[i].runeCD = 720;
            } else if (boss[i].runeCD === 720 / 2) {
                switch (combination) {

                    case 1:
                        picture.src = "bilder/bakgrund/green.png";
                        break;
                    case 2:
                        picture.src = "bilder/bakgrund/orange.png";
                        break;
                    case 3:
                        picture.src = "bilder/bakgrund/purpel.png";
                        break;
                }
            }

            if (boss[i].runeCD > 0) {
                boss[i].runeCD--;
            }

            for (j = 0; j < players.length; j++) {
                if (boss[i].collisionBody.collision(players[j].collisionBody)) {
                    if (players[j].hearts !== 0 && players[j].iframes <= 0) {
                        players[j].hearts -= boss[i].damage;
                        players[j].iframes = 60;
                        recalcHp(players[j]);
                    } else
                    if (players[j].hearts <= 0)
                        if (players[j].revive) {

                            players[j].hearts = players[j].max_hearts / 2;
                            players[j].revive = false;
                            recalcHp(players[j]);
                        } else
                            players[j].alive = false;
                }
            }


            for (j = 0; j < arrows.length; j++) {
                if (arrows[j] !== undefined) {
                    if (arrows[j].x < 0 || arrows[j].x > 1000 || arrows[j].y < 0 || arrows[j].y > 700 || arrows[j].dead) {
                        arrows.splice(j, 1);
                        j--;
                    } else if (arrows[j].collisionBody.collision(boss[i].collisionBody)) {
                        if (arrows[i] !== undefined)
                            if (arrows[j].player.lifesteal) {
                                arrows[j].player.lifeSteal();
                            }

                        boss[0].hp -= arrows[j].damage;
                        boss[0].hpBar.recalcwidth(boss[0].hp, boss[0].maxHp);
                        arrows.splice(j, 1);
                        if (boss[0].hp <= 0) {

                            boss.splice(0, 1);
                            victoryScreen();
                        }

                    }
                }
            }

            if (boss.length > 0)
                if (boss[0].alive) {
                    boss[0].update();
                    boss[0].hpBar.update();
                } else {
                    boss.splice(i, 1);
                    victoryScreen();
                }
        }

    }


    if (magic.length > 0) {

        for (i = 0; i < magic.length; i++) {
            for (j = 0; j < players.length; j++) {
                if (magic[i] !== undefined)
                    if (players[j].collisionBody.collision(magic[i].collisionBody) && players[j].iframes === 0) {

                        if (players[j].hearts > 0) {
                            players[j].iframes = 60;
                            players[j].hearts -= 1;
                            recalcHp(players[j]);
                        }

                        if (players[j].hearts <= 0)
                            if (players[j].revive) {

                                players[j].hearts = players[j].max_hearts / 2;
                                players[j].revive = false;
                                recalcHp(players[j]);
                            } else
                                players[j].alive = false;
                        magic.splice(i, 1);
                    }
            }

            if (magic[i] !== undefined)
                magic[i].update();
        }

    }

    if (runes.length > 0 && boss[0].runeCD === 0)
        for (i = 0; i < runes.length; i++) {
            for (j = 0; j < players.length; j++) {
                if (runes[i] !== undefined)
                    if (runes[i].collisionBody.collision(players[j].collisionBody)) {
                        if (runes[i].constructor.name === "runePurple" && combination === 3 && i === 0 || runes[0].steppedOn) {
                            runes[i].steppedOn = true;
                            if (runes[i].constructor.name === "runeGreen" && combination === 3 && i === 1 || runes[1].steppedOn) {
                                runes[i].steppedOn = true;
                                if (runes[i].constructor.name === "runeOrange" && combination === 3 && i === 2 || runes[2].steppedOn) {
                                    picture.src = "bilder/bakgrund/tronrum.png";
                                    for (i = 0; i < players.length; i++) {

                                        players[i].damage *= 1.3;

                                    }
                                    runes = new Array();
                                }
                            } else if (runes[i].constructor.name === "runeOrange" && combination === 3) {
                                picture.src = "bilder/bakgrund/tronrum.png";
                                boss[0].hp = boss[0].maxHp;

                                runes = new Array();
                            }
                        } else if (runes[i].constructor.name === "runeGreen" && combination === 3) {
                            picture.src = "bilder/bakgrund/tronrum.png";
                            boss[0].hp = boss[0].maxHp;

                            runes = new Array();

                        } else if (runes[i].constructor.name === "runeOrange" && combination === 3) {
                            picture.src = "bilder/bakgrund/tronrum.png";
                            boss[0].hp = boss[0].maxHp;

                            runes = new Array();

                        }

                        if (runes[i] !== undefined)
                            if (runes[i].constructor.name === "runeOrange" && combination === 2 && i === 0 || runes[0].steppedOn) {
                                runes[i].steppedOn = true;
                                if (runes[i].constructor.name === "runePurple" && combination === 2 && i === 1 || runes[1].steppedOn) {
                                    runes[i].steppedOn = true;
                                    if (runes[i].constructor.name === "runeGreen" && combination === 2 && i === 2 || runes[2].steppedOn) {
                                        picture.src = "bilder/bakgrund/tronrum.png";
                                        runes = new Array();
                                    }
                                } else if (runes[i].constructor.name === "runeGreen" && combination === 2) {
                                    picture.src = "bilder/bakgrund/tronrum.png";
                                    boss[0].hp = boss[0].maxHp;

                                    runes = new Array();
                                }
                            } else if (runes[i].constructor.name === "runePurple" && combination === 2) {
                                picture.src = "bilder/bakgrund/tronrum.png";
                                boss[0].hp = boss[0].maxHp;

                                runes = new Array();

                            } else if (runes[i].constructor.name === "runeGreen" && combination === 2) {
                                picture.src = "bilder/bakgrund/tronrum.png";
                                boss[0].hp = boss[0].maxHp;

                                runes = new Array();

                            }

                        if (runes[i] !== undefined)
                            if (runes[i].constructor.name === "runeGreen" && combination === 1 && i === 0 || runes[0].steppedOn) {
                                runes[i].steppedOn = true;
                                if (runes[i].constructor.name === "runeOrange" && combination === 1 && i === 1 || runes[1].steppedOn) {
                                    runes[i].steppedOn = true;
                                    if (runes[i].constructor.name === "runePurple" && combination === 1 && i === 2 || runes[2].steppedOn) {
                                        picture.src = "bilder/bakgrund/tronrum.png";
                                        runes = new Array();
                                    }
                                } else if (runes[i].constructor.name === "runePurple" && combination === 1) {
                                    picture.src = "bilder/bakgrund/tronrum.png";
                                    boss[0].hp = boss[0].maxHp;

                                    runes = new Array();
                                }
                            } else if (runes[i].constructor.name === "runeOrange" && combination === 1) {
                                picture.src = "bilder/bakgrund/tronrum.png";
                                boss[0].hp = boss[0].maxHp;

                                runes = new Array();

                            } else if (runes[i].constructor.name === "runePurple" && combination === 1) {
                                picture.src = "bilder/bakgrund/tronrum.png";
                                boss[0].hp = boss[0].maxHp;
                                runes = new Array();

                            }
                    }


            }


            if (runes[i] !== undefined)
                runes[i].update();
        }

    if (items.length > 0) {
        for (i = 0; i < items.length; i++) {
            for (j = 0; j < players.length; j++) {
                if (items[i] !== undefined)
                    if (items[i].collisionBody.collision(players[j].collisionBody)) {
                        if (players[j].constructor.name === "archer") {
                            if (itemsArcher.length < level) {
                                items[i].effect(players[j]);
                                itemsArcher.push(items[i]);
                                items.splice(i, 1);
                            }
                        } else {
                            if (itemsKnight.length < level) {
                                items[i].effect(players[j]);
                                itemsKnight.push(items[i]);
                                items.splice(i, 1);
                            }
                        }
                    } else {
                        if (items[i] !== undefined)
                            items[i].update();
                    }
            }
        }

    }




    if (items.length === 0)
        if (pressed === false && !once) {

            buttons.push(new button(500, 350));
            once = true;
        } else if (spawnCD === 0) {

            spawn();
            spawnCD = -1;
        }

    if (buttons.length > 0)
        for (i = 0; i < players.length; i++) {
            if (buttons.length > 0)
                if (players[i].collisionBody.collision(buttons[0].collisionBody)) {
                    buttons[0].startGame();
                    buttons.splice(0, 1);
                }
        }

    if (killsperLevel > 0 && mobs.length === 0 && boss.length === 0 && transition === false) {

        playerAreas = undefined;
        transition = true;
        setTimeout("start();", 3000);
    }

    for (a = 0; a < heartArrayP1.length - a; a++) {

        ctx.drawImage(heartArrayP1[a].pic, heartArrayP1[a].x * a + (3 * a), heartArrayP1[a].y);
    }
    for (d = 0; d < heartArrayP2.length - d; d++) {

        ctx.drawImage(heartArrayP2[d].pic, heartArrayP2[d].x * d + 900 - (912 * d), heartArrayP2[d].y);
    }



    if (!transition)
        for (i = 0; i < players.length; i++) {
            if (players[i].alive) {
                players[i].update(players[i]);
                players[i].hpBar.update();
                players[i].cdBar.update();
            } else {
                players.splice(i, 1);
                i--;
            }
        }


    for (i = 0; i < arrows.length; i++) {

        if (!arrows[i].dead)
            arrows[i].update();
    }

    if (buttons.length > 0) {
        buttons[0].update();
    }

    if (spawnCD > 0)
        spawnCD--;
    if (!pauseMenuStart && !deathScreenbool)
        requestAnimationFrame(draw);
}

//rensar canvasen
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//skapar items
function spawnItem(x, y) {

    let random = Math.floor(Math.random() * 8) + 1;
    if (random >= 1 && random <= 4) {

        random = Math.floor(Math.random() * 8) + 1;
        let randomItem = itemGood[random];
        switch (randomItem) {

            case "ring of power":
                items.push(new ringOfPower(x, y));
                break;
            case "holy grail":
                items.push(new graal(x, y));
                break;
            case "gauntlet of strenght":
                items.push(new gauntlet(x, y));
                break;
            case "boots of swiftness":
                items.push(new bootsOfSwiftness(x, y));
                break;
            case "Book of mastery":
                items.push(new bok(x, y));
                break;
            case "vampiric aura":
                items.push(new vampiricAura(x, y));
                break;
            case "lucky necklace":
                items.push(new luckyNecklace(x, y));
                break;
            case "speed bracers":
                items.push(new speedBracers(x, y));
                break;
        }

    } else if (random >= 5 && random <= 8) {

        random = Math.floor(Math.random() * 8) + 1;
        let randomItem = itemBad[random];
        switch (randomItem) {

            case "cursed ring":
                items.push(new cursedRing(x, y));
                break;
            case "dangerous slug":
                items.push(new slug(x, y));
                break;
            case "hourglass of tempo":
                items.push(new hourglass(x, y));
                break;
            case "Bandage":
                items.push(new bandage(x, y));
                break;
            case "apple":
                items.push(new apple(x, y));
                break;
            case "meat":
                items.push(new kyckling(x, y));
                break;
            case "thorns":
                items.push(new thorns(x, y));
                break;
            case "cloak of RNG":
                items.push(new RNG(x, y));
                break;
        }


    } /*else {

     if (player.constructor.name === "archer") {

     random = Math.floor(Math.random() * 3) + 1;

     let randomItem = itemSpecialArcher[random];

     switch (randomItem) {

     case "Toxic arrow":
     items.push(new toxicArrow(x, y));
     break;

     case "double shot":
     items.push(new doubleshot(x, y));
     break;

     case "piercing shot":
     items.push(new piercingArrow(x, y));
     break;
     }

     } */

    /*random = Math.floor(Math.random() * 3) + 1;

     let randomItem = itemSpecialKnight[random];

     switch (randomItem) {

     case "whirlwind":
     items.push(new whirlwind(x, y));
     break;

     case "long sword":
     items.push(new longsword(x, y));
     break;

     case "cleav":
     items.push(new cleave(x, y));
     break;
     }*/
}

//spelyta
class playerArea {

    constructor(col, x, y, width, height) {

        this.col = col;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

}

//hjärta på hud
class heart {

    constructor(pic, x, y) {

        this.pic = new Image;
        this.pic.src = pic;
        this.x = x;
        this.y = y;
    }

}

//knapp
class button {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.bild = new Image;
        this.bild.src = "bilder/HUD/knapp.png";
        this.pressed = false;
        this.collisionBody = new collisionBody(this.x - 30, this.y - 30, 60, 60);
    }

    startGame() {
        level++;
        pressed = true;
        spawnCD = 45;
    }

    update() {
        this.collisionBody.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
        ctx.restore();
    }

}

//absract klass för att skapa enemies
class enemy {

    constructor(x, y, hp, dmg, bild, vx, vy) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.directionX = 0;
        this.directionY = 0;
        this.hp = hp;
        this.maxHp = hp;
        this.alive = true;
        this.damage = dmg;
        this.bild = new Image;
        this.bild.src = bild;
        this.facingDirection = 3;
    }

    move() {
        this.x += this.vx * Math.cos(this.directionX + Math.PI);
        this.y += this.vy * Math.sin(this.directionY + Math.PI);
        this.collisionBody.move(this.vx * Math.cos(this.directionX + Math.PI), this.vy * Math.sin(this.directionY + Math.PI));
    }

    update() {
        this.updatePlayerPos();
        this.move();
        this.collisionBody.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
        ctx.restore();
    }

    updatePlayerPos() {

        let dx1 = this.x - players[0].x;
        let dy1 = this.y - players[0].y;
        let c1 = Math.sqrt((dy1 * dy1) + (dx1 * dx1));
        if (players.length > 1) {
            let dx2 = this.x - players[1].x;
            let dy2 = this.y - players[1].y;
            let c2 = Math.sqrt((dx2 * dx2) + (dy2 * dy2));
            if (c1 < c2 && players[0].alive) {

                let angel = Math.atan2(dy1, dx1);
                this.directionX = angel;
                this.directionY = angel;
            } else {

                let angel = Math.atan2(dy2, dx2);
                this.directionX = angel;
                this.directionY = angel;
            }
        } else {
            let angel = Math.atan2(dy1, dx1);
            this.directionX = angel;
            this.directionY = angel;
        }
    }

}

//fiender
class varg extends enemy {

    constructor(x, y) {
        super(x, y, 20, 0.5);
    }

}

class goblin_melee extends enemy {

    constructor(x, y, hpBoost) {
        super(x, y, 10 * hpBoost, 0.5, "bilder/enemies/goblin/goblinfront.png", 1, 1);
        this.collisionBody = new collisionBody(x - 30, y - 30, 225 - 160, 226 - 160);
    }

}

class skelett extends enemy {

    constructor(x, y) {
        super(x, y, 10, 0.5, "bilder/enemies/bones/mrbones.png", 1, 1);
        this.collisionBody = new collisionBody(x - 40, y - 80, 225 - 145, 226 - 70);
    }

    attack(player) {
        let dx = this.x - player.x;
        let dy = this.y - player.y;
        let distance = Math.sqrt((dx * dx) + (dy * dy));
        if (distance < 0 && enemyArrows.length < 3) {
            let angle = Math.atan2(dy, dx);
            angle += Math.PI;
            angle *= TO_DEG;
            enemyArrows.push(new arrow(this.x, this.y, angle, angle, "bilder/pilar/pilar/pilner.png"));
        }

    }

}

class bjorn extends enemy {

    constructor(x, y) {
        super(x, y, 10, 0.5, "bilder/enemies/bjorn/bjornfront.png");
        this.collisionBody = new collisionBody(x - 47, y - 226 / 3, 225 - 135, 226 - 75);
    }

}

//boss
class lich extends enemy {

    constructor(x, y) {
        super(x, y, 2000, 1, "bilder/Boss/lich.png", 0.25, 0.25);
        this.collisionBody = new collisionBody(x - 50, y - 70, 225 - 140, 150);
        this.hpBar = new bar(200, 600, 600, 30, "#FF0000");
        this.mobTimer = 0;
        this.maxMobs = 4;
        this.currentMobs = 0;
        this.graveX = 0;
        this.graveY = 0;
        this.gravCD = 1800;
        this.groundCD = 720;
        this.ballCD = 120;
        this.runeCD = 100;
        this.spawnMobs();
    }

    spawnMobs() {

        if (bossMobs.length < this.maxMobs) {
            var limit = this.maxMobs - this.currentMobs;
            for (var i = 0; i < limit; i++) {
                this.graveX = Math.floor(Math.random() * 500) + 10;
                this.graveY = Math.floor(Math.random() * 500) + 10;
                bossMobs.push(new grav(this.graveX, this.graveY, "bilder/Boss/grav.png"));
                this.currentMobs++;
            }
        }

    }

    spawnRunes() {
        runeComb();
    }

    defiledGround() {
        var randomX = Math.floor(Math.random() * 600) + 10;
        var randomY = Math.floor(Math.random() * 600) + 10;
        ground.push(new defiledGround(randomX, randomY, "bilder/Boss/ground.png"));
    }

    magicBall() {

        let dx1 = this.x - players[0].x;
        let dy1 = this.y - players[0].y;
        let distance1 = Math.sqrt((dy1 * dy1) + (dx1 * dx1));
        if (players.length > 1) {
            let dx2 = this.x - players[1].x;
            let dy2 = this.y - players[1].y;
            let distance2 = Math.sqrt((dx2 * dx2) + (dy2 * dy2));
            if (distance1 < distance2 && players[0].alive) {

                let angle = Math.atan2(dy1, dx1);
                magic.push(new magicBall(angle, this.x, this.y, "bilder/Boss/magicball.png"));
            } else {

                let angle = Math.atan2(dy2, dx2);
                magic.push(new magicBall(angle, this.x, this.y, "bilder/Boss/magicball.png"));
            }
        } else {
            let angle = Math.atan2(dy1, dx1);
            magic.push(new magicBall(angle, this.x, this.y, "bilder/Boss/magicball.png"));
        }

    }

}

//boss abilites
//skapar en grav som efter 10 sec spawnar ett skelett
class grav {

    constructor(x, y, bild) {
        this.x = x;
        this.y = y;
        this.bild = new Image;
        this.bild.src = bild;
        this.timer = 620;
        this.collisionBody = new collisionBody(this.x - 45, this.y - 45, 90, 90);
    }

    update() {
        if (this.timer > 0)
            this.timer--;
        this.collisionBody.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
        ctx.restore();
    }

}

//skpar en slow cirkel?
class defiledGround {

    constructor(x, y, bild) {

        this.x = x;
        this.y = y;
        this.bild = new Image;
        this.bild.src = bild;
        this.collisionBody = new collisionBody(this.x - 100, this.y - 100, 200, 200);
        this.timer = 600;
    }

    update() {
        this.collisionBody.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
        ctx.restore();
    }

}

//skapar en magi boll
class magicBall {

    constructor(angle, x, y, bild) {
        this.angle = angle;
        this.x = x;
        this.y = y;
        this.alive = true;
        this.vx = 2;
        this.vy = 2;
        this.bild = new Image;
        this.bild.src = bild;
        this.collisionBody = new collisionBody(this.x - 25, this.y - 25, 50, 50);
    }

    move() {

        this.x += this.vx * Math.cos(this.angle + Math.PI);
        this.y += this.vy * Math.sin(this.angle + Math.PI);
        this.collisionBody.move(this.vx * Math.cos(this.angle + Math.PI), this.vy * Math.sin(this.angle + Math.PI));
    }

    update() {
        this.move();
        this.collisionBody.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
        ctx.restore();
    }

}

function order() {

    let random = Math.floor(Math.random() * 3) + 1;

    switch (random) {

        case 1:
            x1 = 250;
            x2 = 500;
            x3 = 700;
            y1 = 250;
            y2 = 500;
            y3 = 250;
            break;

        case 2:
            x1 = 500;
            x2 = 700;
            x3 = 250;
            y1 = 500;
            y2 = 250;
            y3 = 250;
            break;

        case 3:
            x1 = 700;
            x2 = 250;
            x3 = 500;
            y1 = 250;
            y2 = 250;
            y3 = 500;

    }

}

function runeComb() {
    order();
    let random = Math.floor(Math.random() * 3) + 1;

    switch (random) {

        case 1:
            combination = 1;
            runes.push(new runeGreen(x1, y1));
            runes.push(new runeOrange(x2, y2));
            runes.push(new runePurple(x3, y3));
            break;

        case 2:
            combination = 2;
            runes.push(new runeOrange(x1, y1));
            runes.push(new runePurple(x2, y2));
            runes.push(new runeGreen(x3, y3));
            break;

        case 3:
            combination = 3;
            runes.push(new runePurple(x1, y1));
            runes.push(new runeGreen(x2, y2));
            runes.push(new runeOrange(x3, y3));
            break;

    }

}

class runePurple {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bild = new Image;
        this.bild.src = "bilder/Boss/runes/purple.png";
        this.collisionBody = new collisionBody(this.x - 25, this.y - 25, 45, 45);
        this.steppedOn = false;
    }

    update() {
        if (!this.steppedOn) {
            this.collisionBody.update();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(3, 3);
            ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
            ctx.restore();
        }
    }
}

class runeGreen {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bild = new Image;
        this.bild.src = "bilder/Boss/runes/green.png";
        this.collisionBody = new collisionBody(this.x - 25, this.y - 25, 45, 45);
        this.steppedOn = false;
    }

    update() {
        if (!this.steppedOn) {
            this.collisionBody.update();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(3, 3);
            ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
            ctx.restore();
        }
    }
}

class runeOrange {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bild = new Image;
        this.bild.src = "bilder/Boss/runes/orange.png";
        this.collisionBody = new collisionBody(this.x - 25, this.y - 25, 45, 45);
        this.steppedOn = false;
    }

    update() {
        if (!this.steppedOn) {
            this.collisionBody.update();
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(3, 3);
            ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
            ctx.restore();
        }
    }
}

//abstract klass för att skapa spelare
class player {

    constructor(x, y, bild, collisionBody, hearts, damage, lx, ly) {
        this.x = x;
        this.y = y;
        this.moveSpeedMultiplier0 = 1;
        this.moveSpeedMultiplier1 = 1;
        this.width = 20;
        this.height = 20;
        this.max_hearts = hearts;
        this.hearts = hearts;
        this.damage = damage;
        this.alive = true;
        this.dmgTakenMultiplier = 1;
        this.critChance = true;
        this.crit = false;
        this.iframes = 0;
        this.bild = new Image;
        this.bild.src = bild;
        this.collisionBody = collisionBody;
        this.facingDirection = 3;
        this.revive = false;
        this.hpReg = false;
        this.rng = false;
        this.rngResetUp = false;
        this.rngResetDown = false;
        this.attackSpeed = 40;
        this.specialDMGMultiplier = 0;
        this.cooldownSpecial = 0;
        this.cooldown = 592;
        this.cooldownAA = 0;
        this.lifesteal = false;
        this.vampAura = false;
        this.piercingArrowBool = false;
        this.moveX = 0;
        this.moveY = 0;
        this.colOffsetX = 30;
        this.colOffsetY = 40;
        this.turn = false;
        this.slowed = false;
        this.doubleshot = false;
    }

    move() {
        throw new error("Måste implementera");
    }

//5% chans att heala ett halvt hjärta
    lifeSteal() {

        let random = Math.random();
        if (random <= 0.05) {

            if (this.hearts < this.max_hearts)
                this.hearts += 0.5;
        }
    }

    essenceDrain() {

        let random = Math.random();
        if (random <= 0.2) {
            if (this.hearts < this.max_hearts)
                this.hearts++;
            //eftersom att man får ett hjärta så kollar jag om man hamlar över gränsen och om man är det så sätter jag
            //att hearts = max_hearts
            if (this.hearts > this.max_hearts)
                this.hearts = this.max_hearts;
        }

    }

    critAttack() {

        let random = Math.random();
        console.log(random);
        if (random <= 0.2) {
            this.damage *= 1.8;
            this.crit = true;
        }

    }

    rngAttack() {
        let random = Math.random();
        if (random < 0.5) {
            this.damage *= 1.3;
            this.rngResetUp = true;
        } else {
            this.damage *= 0.7;
            this.rngResetDown = true;
        }
    }

    resetPosition() {

        for (i = 0, x = 300; i < players.length; i++, x += 200) {
            players[i].x = x;
            players[i].y = 500;
            players[i].collisionBody.setPosition(players[i].x - players[i].colOffsetX, players[i].y - players[i].colOffsetY);
        }

    }

    update(player) {
        player.move();
        player.collisionBody.update();
        if (player.sword)
            player.sword.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
        ctx.restore();
    }

    special() {
        throw new error("måste implmentera");
    }

    autoattack() {
        throw new error("måste implmentera");
    }

}

//vapen pil
class arrow {

    constructor(x, y, directionX, directionY, bild, collisionBody, damage, player) {
        this.x = x;
        this.y = y;
        this.ogX = x;
        this.ogY = y;
        this.vx = 2;
        this.vy = 2;
        this.directionX = directionX;
        this.directionY = directionY;
        this.dead = false;
        this.damage = damage;
        this.bild = new Image;
        this.bild.src = bild;
        this.collisionBody = collisionBody;
        this.player = player;
    }

    move() {

        let dx = this.x - this.ogX;
        let dy = this.y - this.ogY;
        let distance = Math.sqrt((dy * dy) + (dx * dx));
        if (distance < 250) {
            this.x += this.vx * Math.cos(this.directionX * TO_RADIANS);
            this.y += this.vy * Math.sin(this.directionY * TO_RADIANS);
            this.collisionBody.move(this.vx * Math.cos(this.directionX * TO_RADIANS), this.vy * Math.sin(this.directionY * TO_RADIANS));
        } else {
            this.dead = true;
        }

    }

    update() {
        this.move();
        this.collisionBody.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
        ctx.restore();
    }

}

//spelare
class archer extends player {

    constructor(x, y, bild, collisionBody) {
        super(x, y, bild, collisionBody, 3, 5);
        this.hpBar = new bar(10, 20, 30, 150, "#FF0000");
        this.cdBar = new bar(50, 20, 30, 150, "#0000FF");
    }

    move() {
        players[0].moveX = 0;
        players[0].moveY = 0;
        //left
        if (keyDownsArcher[0]) {

            if (players[0].collisionBody.x > 150) {

                players[0].moveX -= 2;
                players[0].bild.src = "bilder/player/archer/archervanster.png";
            }
//right
        }
        if (keyDownsArcher[1]) {

            if (players[0].collisionBody.x < 850) {

                players[0].moveX += 2;
                players[0].bild.src = "bilder/player/archer/archerhoger.png";
            }

        }
        if (keyDownsArcher[2]) {

            if (players[0].collisionBody.y > 0) {

                players[0].moveY -= 2;
                players[0].bild.src = "bilder/player/archer/archerback.png";
            }
//down
        }
        if (keyDownsArcher[3]) {

            if (players[0].collisionBody.y < 700) {

                players[0].moveY += 2;
                players[0].bild.src = "bilder/player/archer/archer.png";
            }

        }
        if (players[0].moveX === -2 && players[0].moveY === -2) {

            players[0].moveX = players[0].moveX * 0.75;
            players[0].moveY = players[0].moveY * 0.75;
        }
        if (players[0].moveX === 2 && players[0].moveY === -2) {

            players[0].moveX = players[0].moveX * 0.75;
            players[0].moveY = players[0].moveY * 0.75;
        }
        if (players[0].moveX === -2 && players[0].moveY === 2) {

            players[0].moveX = players[0].moveX * 0.75;
            players[0].moveY = players[0].moveY * 0.75;
        }
        if (players[0].moveX === 2 && players[0].moveY === 2) {

            players[0].moveX = players[0].moveX * 0.75;
            players[0].moveY = players[0].moveY * 0.75;
        }

        players[0].x += players[0].moveX * this.moveSpeedMultiplier0;
        players[0].y += players[0].moveY * this.moveSpeedMultiplier0;
        players[0].collisionBody.setPosition(players[0].x - players[0].colOffsetX, players[0].y - players[0].colOffsetY);
    }

    autoattack() {

//kollar om man critar
        if (this.critChance) {
            this.critAttack();
        }

        if (this.rng) {
            this.rngAttack();
        }

//right
        if (keyDownsArcher[1] && !keyDownsArcher[2] && !keyDownsArcher[3] || players[0].facingDirection === 1) {

            if (players[0].doubleshot) {
                arrows.push(new arrow(this.x, this.y + 10, 360, 0, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y + 5, this.width + 5, this.height), this.damage, players[0]));
                arrows.push(new arrow(this.x, this.y - 10, 360, 0, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 15, this.width + 5, this.height), this.damage, players[0]));
            } else
                arrows.push(new arrow(this.x, this.y, 360, 0, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 5, this.width + 5, this.height), this.damage, players[0]));
        }
//left
        else if (keyDownsArcher[0] && !keyDownsArcher[2] && !keyDownsArcher[3] || players[0].facingDirection === 0)
            if (players[0].doubleshot) {
                arrows.push(new arrow(this.x, this.y + 10, -180, 0, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y + 5, this.width + 5, this.height), this.damage, players[0]));
                arrows.push(new arrow(this.x, this.y - 10, -180, 0, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 10, this.width + 5, this.height), this.damage, players[0]));
            } else
                arrows.push(new arrow(this.x, this.y, -180, 0, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 2.5, this.width + 5, this.height), this.damage, players[0]));
        //up
        else if (keyDownsArcher[2] && !keyDownsArcher[0] && !keyDownsArcher[1] || players[0].facingDirection === 2)
            if (players[0].doubleshot) {
                arrows.push(new arrow(this.x + 10, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 2.5, this.y - 34, this.width, this.height + 10), this.damage, players[0]));
                arrows.push(new arrow(this.x - 10, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 22.5, this.y - 34, this.width, this.height + 10), this.damage, players[0]));
            } else
                arrows.push(new arrow(this.x, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 13, this.y - 34, this.width, this.height + 10), this.damage, players[0]));
        //down
        else if (keyDownsArcher[3] && !keyDownsArcher[0] && !keyDownsArcher[1] || players[0].facingDirection === 3)
            if (players[0].doubleshot) {
                arrows.push(new arrow(this.x + 10, this.y, 270, 90, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 2.5, this.y + 20, this.width, this.height + 10), this.damage, players[0]));
                arrows.push(new arrow(this.x - 10, this.y, 270, 90, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 22.5, this.y + 20, this.width, this.height + 10), this.damage, players[0]));
            } else
                arrows.push(new arrow(this.x, this.y, 270, 90, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 12, this.y + 20, this.width, this.height + 10), this.damage, players[0]));
        //north west
        else if (keyDownsArcher[0] && keyDownsArcher[2] || players[0].facingDirection === 4)
            arrows.push(new arrow(this.x, this.y, 180, -90, "bilder/pilar/pilar/pilnw.png", new collisionBody(this.x - 35, this.y - 25, this.width + 5, this.height + 5), this.damage, players[0]));
        //south west
        else if (keyDownsArcher[0] && keyDownsArcher[3] || players[0].facingDirection === 5)
            arrows.push(new arrow(this.x, this.y, 180, 90, "bilder/pilar/pilar/pilsw.png", new collisionBody(this.x - 35, this.y + 15, this.width + 5, this.height + 5), this.damage, players[0]));
        //north east
        else if (keyDownsArcher[1] && keyDownsArcher[2] || players[0].facingDirection === 6)
            arrows.push(new arrow(this.x, this.y, 360, -90, "bilder/pilar/pilar/pilne.png", new collisionBody(this.x + 3, this.y - 25, this.width + 5, this.height + 5), this.damage, players[0]));
        //south east
        if (keyDownsArcher[1] && keyDownsArcher[3] || players[0].facingDirection === 7) {

            arrows.push(new arrow(this.x, this.y, 360, 90, "bilder/pilar/pilar/pilse.png", new collisionBody(this.x + 5, this.y + 10, this.width + 5, this.height + 5), this.damage, players[0]));
        }

        if (this.rngResetUp) {
            this.damage /= 1.3;
            this.rngResetUp = false;
        } else if (this.rngResetDown) {
            this.damage /= 0.7;
            this.rngResetDown = false;
        }

//om man critade reverta tillbacks skadan
        if (this.crit) {
            this.damage /= 1.8;
            this.crit = false;
            console.log(this.damage);
        }

    }

//Special abilty som gör att man skjuter fem pilar i en halvish cirkel
    special() {

        if (this.critChance) {
            this.critAttack();
        }


        if (this.rng) {
            this.rngAttack();
        }

//Upp
        if (keyDownsArcher[2] && !keyDownsArcher[3] && !keyDownsArcher[1] && !keyDownsArcher[0] || players[0].facingDirection === 2) {

            arrows.push(new arrow(this.x, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 13, this.y - 34, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 135, -135, "bilder/pilar/pilar/pilnw.png", new collisionBody(this.x - 35, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 45, -45, "bilder/pilar/pilar/pilne.png", new collisionBody(this.x + 3, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 112.5, -112.5, "bilder/pilar/volley/pilnee.png", new collisionBody(this.x - 25, this.y - 35, this.width + 5, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 67.5, -67.5, "bilder/pilar/volley/pilnww.png", new collisionBody(this.x - 5, this.y - 35, this.width + 5, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
        }

//ner
        else if (keyDownsArcher[3] && !keyDownsArcher[2] && !keyDownsArcher[1] && !keyDownsArcher[0] || players[0].facingDirection === 3) {
            arrows.push(new arrow(this.x, this.y, 270, -270, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 12, this.y + 20, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 225, -225, "bilder/pilar/pilar/pilsw.png", new collisionBody(this.x - 35, this.y + 15, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 315, -315, "bilder/pilar/pilar/pilse.png", new collisionBody(this.x + 5, this.y + 10, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 247.5, -247.5, "bilder/pilar/volley/pilsee.png", new collisionBody(this.x - 22, this.y + 15, this.width + 5, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 292.5, -292.5, "bilder/pilar/volley/pilsww.png", new collisionBody(this.x - 2, this.y + 15, this.width + 5, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
        }

//left
        else if (keyDownsArcher[0] && !keyDownsArcher[2] && !keyDownsArcher[1] && !keyDownsArcher[3] || players[0].facingDirection === 0) {
            arrows.push(new arrow(this.x, this.y, 180, 180, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 2.5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 135, -135, "bilder/pilar/pilar/pilnw.png", new collisionBody(this.x - 35, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 225, -225, "bilder/pilar/pilar/pilsw.png", new collisionBody(this.x - 35, this.y + 15, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 202.5, -202.5, "bilder/pilar/volley/pilwss.png", new collisionBody(this.x - 40, this.y + 3, this.width + 10, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 157.5, -157.5, "bilder/pilar/volley/pilwnn.png", new collisionBody(this.x - 40, this.y - 17.5, this.width + 10, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
        }

//right
        else if (keyDownsArcher[1] && !keyDownsArcher[2] && !keyDownsArcher[0] && !keyDownsArcher[3] || players[0].facingDirection === 1) {
            arrows.push(new arrow(this.x, this.y, 360, 360, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 45, -45, "bilder/pilar/pilar/pilne.png", new collisionBody(this.x + 3, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 315, -315, "bilder/pilar/pilar/pilse.png", new collisionBody(this.x + 5, this.y + 10, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 337.5, -337.5, "bilder/pilar/volley/pillwss.png", new collisionBody(this.x + 10, this.y, this.width + 10, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 22.5, -22.5, "bilder/pilar/volley/pilswnn.png", new collisionBody(this.x + 8, this.y - 22, this.width + 10, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
        }

//south east
        else if (keyDownsArcher[3] && keyDownsArcher[1] && !keyDownsArcher[2] && !keyDownsArcher[0] || players[0].facingDirection === 7) {
            arrows.push(new arrow(this.x, this.y, 360, 360, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 315, -315, "bilder/pilar/pilar/pilse.png", new collisionBody(this.x + 5, this.y + 10, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 270, -270, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 12, this.y + 20, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 337.5, -337.5, "bilder/pilar/volley/pillwss.png", new collisionBody(this.x + 10, this.y + 5, this.width + 10, this.height), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 292.5, -292.5, "bilder/pilar/volley/pilsww.png", new collisionBody(this.x, this.y + 10, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
        }

//south west
        else if (keyDownsArcher[3] && keyDownsArcher[0] && !keyDownsArcher[2] && !keyDownsArcher[1] || players[0].facingDirection === 5) {
            arrows.push(new arrow(this.x, this.y, 225, -225, "bilder/pilar/pilar/pilsw.png", new collisionBody(this.x - 35, this.y + 15, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 180, 180, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 2.5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 270, -270, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 12, this.y + 20, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 202.5, -202.5, "bilder/pilar/volley/pilwss.png", new collisionBody(this.x - 40, this.y + 5, this.width + 10, this.height), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 247.5, -247.5, "bilder/pilar/volley/pilsee.png", new collisionBody(this.x - 20, this.y + 15, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
        }

//north east
        else if (keyDownsArcher[2] && keyDownsArcher[1] && !keyDownsArcher[3] && !keyDownsArcher[0] || players[0].facingDirection === 6) {
            arrows.push(new arrow(this.x, this.y, 45, -45, "bilder/pilar/pilar/pilne.png", new collisionBody(this.x + 3, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 360, 360, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 13, this.y - 34, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 67.5, -67.5, "bilder/pilar/volley/pilnww.png", new collisionBody(this.x - 2, this.y - 37, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 22.5, -22.5, "bilder/pilar/volley/pilswnn.png", new collisionBody(this.x + 10, this.y - 20, this.width + 5, this.height + 3), this.damage + this.specialDMGMultiplier, players[0]));
        }

//north west
        else if (keyDownsArcher[2] && keyDownsArcher[0] && !keyDownsArcher[3] && !keyDownsArcher[1] || players[0].facingDirection === 4) {
            arrows.push(new arrow(this.x, this.y, 135, -135, "bilder/pilar/pilar/pilnw.png", new collisionBody(this.x - 35, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 180, 180, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 2.5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 13, this.y - 34, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 112.5, -112.5, "bilder/pilar/volley/pilnee.png", new collisionBody(this.x - 22, this.y - 35, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[0]));
            arrows.push(new arrow(this.x, this.y, 157.5, -157.5, "bilder/pilar/volley/pilwnn.png", new collisionBody(this.x - 40, this.y - 15, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[0]));
        }

        if (this.rngResetUp) {
            this.damage /= 1.3;
            this.rngResetUp = false;
        } else if (this.rngResetDown) {
            this.damage /= 0.7;
            this.rngResetDown = false;
        }

        if (this.crit) {
            this.damage /= 1.8;
            this.crit = false;
        }

    }

    update() {
        this.move();
        this.collisionBody.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
        ctx.restore();
    }

}

class knight extends player {

    constructor(x, y, bild, collisionBody) {
        super(x, y, bild, collisionBody, 4, 5);
        this.hpBar = new bar(960, 20, 30, 150, "#FF0000");
        this.cdBar = new bar(920, 20, 30, 150, "#0000FF");
    }

    move() {

        let lenght;
        if (players.length === 1) {
            lenght = 0;
        } else
            lenght = 1;
        players[lenght].moveX = 0;
        players[lenght].moveY = 0;
        //left
        if (keyDownsKnight[0]) {

            if (players[lenght].collisionBody.x > 150) {

                players[lenght].moveX -= 2;
                players[lenght].bild.src = "bilder/player/archer2/archervanster.png";
            }
//right
        }
        if (keyDownsKnight[1]) {

            if (players[lenght].collisionBody.x < 750) {

                players[lenght].moveX += 2;
                players[lenght].bild.src = "bilder/player/archer2/archerhoger.png";
            }

        }
        if (keyDownsKnight[2]) {

            if (players[lenght].collisionBody.y > 0) {

                players[lenght].moveY -= 2;
                players[lenght].bild.src = "bilder/player/archer2/archerback.png";
            }
//down
        }
        if (keyDownsKnight[3]) {

            if (players[lenght].collisionBody.y < 587) {

                players[lenght].moveY += 2;
                players[lenght].bild.src = "bilder/player/archer2/archer.png";
            }

        }
        if (players[lenght].moveX === -2 && players[lenght].moveY === -2) {

            players[lenght].moveX = players[lenght].moveX * 0.75;
            players[lenght].moveY = players[lenght].moveY * 0.75;
        }
        if (players[lenght].moveX === 2 && players[lenght].moveY === -2) {

            players[lenght].moveX = players[lenght].moveX * 0.75;
            players[lenght].moveY = players[lenght].moveY * 0.75;
        }
        if (players[lenght].moveX === -2 && players[lenght].moveY === 2) {

            players[lenght].moveX = players[lenght].moveX * 0.75;
            players[lenght].moveY = players[lenght].moveY * 0.75;
        }
        if (players[lenght].moveX === 2 && players[lenght].moveY === 2) {

            players[lenght].moveX = players[lenght].moveX * 0.75;
            players[lenght].moveY = players[lenght].moveY * 0.75;
        }

        players[lenght].x += players[lenght].moveX * this.moveSpeedMultiplier1;
        players[lenght].y += players[lenght].moveY * this.moveSpeedMultiplier1;
        players[lenght].collisionBody.setPosition(players[lenght].x - players[lenght].colOffsetX, players[lenght].y - players[lenght].colOffsetY);
    }

    special() {

        let  lenght;
        if (players.length === 1) {
            lenght = 0;
        } else
            lenght = 1;
        if (this.critChance) {
            this.critAttack();
        }


        if (this.rng) {
            this.rngAttack();
        }

//Upp
        if (keyDownsKnight[2] && !keyDownsKnight[3] && !keyDownsKnight[1] && !keyDownsKnight[0] || players[lenght].facingDirection === 2) {

            arrows.push(new arrow(this.x, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 13, this.y - 34, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 135, -135, "bilder/pilar/pilar/pilnw.png", new collisionBody(this.x - 35, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 45, -45, "bilder/pilar/pilar/pilne.png", new collisionBody(this.x + 3, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 112.5, -112.5, "bilder/pilar/volley/pilnee.png", new collisionBody(this.x - 25, this.y - 35, this.width + 5, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 67.5, -67.5, "bilder/pilar/volley/pilnww.png", new collisionBody(this.x - 5, this.y - 35, this.width + 5, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
        }

//ner
        else if (keyDownsKnight[3] && !keyDownsKnight[2] && !keyDownsKnight[1] && !keyDownsKnight[0] || players[lenght].facingDirection === 3) {
            arrows.push(new arrow(this.x, this.y, 270, -270, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 12, this.y + 20, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 225, -225, "bilder/pilar/pilar/pilsw.png", new collisionBody(this.x - 35, this.y + 15, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 315, -315, "bilder/pilar/pilar/pilse.png", new collisionBody(this.x + 5, this.y + 10, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 247.5, -247.5, "bilder/pilar/volley/pilsee.png", new collisionBody(this.x - 22, this.y + 15, this.width + 5, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 292.5, -292.5, "bilder/pilar/volley/pilsww.png", new collisionBody(this.x - 2, this.y + 15, this.width + 5, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
        }

//left
        else if (keyDownsKnight[0] && !keyDownsKnight[2] && !keyDownsKnight[1] && !keyDownsKnight[3] || players[lenght].facingDirection === 0) {
            arrows.push(new arrow(this.x, this.y, 180, 180, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 2.5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 135, -135, "bilder/pilar/pilar/pilnw.png", new collisionBody(this.x - 35, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 225, -225, "bilder/pilar/pilar/pilsw.png", new collisionBody(this.x - 35, this.y + 15, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 202.5, -202.5, "bilder/pilar/volley/pilwss.png", new collisionBody(this.x - 40, this.y + 3, this.width + 10, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 157.5, -157.5, "bilder/pilar/volley/pilwnn.png", new collisionBody(this.x - 40, this.y - 17.5, this.width + 10, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
        }

//right
        else if (keyDownsKnight[1] && !keyDownsKnight[2] && !keyDownsKnight[0] && !keyDownsKnight[3] || players[lenght].facingDirection === 1) {
            arrows.push(new arrow(this.x, this.y, 360, 360, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 45, -45, "bilder/pilar/pilar/pilne.png", new collisionBody(this.x + 3, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 315, -315, "bilder/pilar/pilar/pilse.png", new collisionBody(this.x + 5, this.y + 10, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 337.5, -337.5, "bilder/pilar/volley/pillwss.png", new collisionBody(this.x + 10, this.y, this.width + 10, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 22.5, -22.5, "bilder/pilar/volley/pilswnn.png", new collisionBody(this.x + 8, this.y - 22, this.width + 10, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
        }

//south east
        else if (keyDownsKnight[3] && keyDownsKnight[1] && !keyDownsKnight[2] && !keyDownsKnight[0] || players[lenght].facingDirection === 7) {
            arrows.push(new arrow(this.x, this.y, 360, 360, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 315, -315, "bilder/pilar/pilar/pilse.png", new collisionBody(this.x + 5, this.y + 10, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 270, -270, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 12, this.y + 20, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 337.5, -337.5, "bilder/pilar/volley/pillwss.png", new collisionBody(this.x + 10, this.y + 5, this.width + 10, this.height), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 292.5, -292.5, "bilder/pilar/volley/pilsww.png", new collisionBody(this.x, this.y + 10, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
        }

//south west
        else if (keyDownsKnight[3] && keyDownsKnight[0] && !keyDownsKnight[2] && !keyDownsKnight[1] || players[lenght].facingDirection === 5) {
            arrows.push(new arrow(this.x, this.y, 225, -225, "bilder/pilar/pilar/pilsw.png", new collisionBody(this.x - 35, this.y + 15, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 180, 180, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 2.5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 270, -270, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 12, this.y + 20, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 202.5, -202.5, "bilder/pilar/volley/pilwss.png", new collisionBody(this.x - 40, this.y + 5, this.width + 10, this.height), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 247.5, -247.5, "bilder/pilar/volley/pilsee.png", new collisionBody(this.x - 20, this.y + 15, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
        }

//north east
        else if (keyDownsKnight[2] && keyDownsKnight[1] && !keyDownsKnight[3] && !keyDownsKnight[0] || players[lenght].facingDirection === 6) {
            arrows.push(new arrow(this.x, this.y, 45, -45, "bilder/pilar/pilar/pilne.png", new collisionBody(this.x + 3, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 360, 360, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 13, this.y - 34, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 67.5, -67.5, "bilder/pilar/volley/pilnww.png", new collisionBody(this.x - 2, this.y - 37, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 22.5, -22.5, "bilder/pilar/volley/pilswnn.png", new collisionBody(this.x + 10, this.y - 20, this.width + 5, this.height + 3), this.damage + this.specialDMGMultiplier, players[lenght]));
        }

//north west
        else if (keyDownsKnight[2] && keyDownsKnight[0] && !keyDownsKnight[3] && !keyDownsKnight[1] || players[lenght].facingDirection === 4) {
            arrows.push(new arrow(this.x, this.y, 135, -135, "bilder/pilar/pilar/pilnw.png", new collisionBody(this.x - 35, this.y - 25, this.width + 5, this.height + 5), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 180, 180, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 2.5, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 13, this.y - 34, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 112.5, -112.5, "bilder/pilar/volley/pilnee.png", new collisionBody(this.x - 22, this.y - 35, this.width, this.height + 10), this.damage + this.specialDMGMultiplier, players[lenght]));
            arrows.push(new arrow(this.x, this.y, 157.5, -157.5, "bilder/pilar/volley/pilwnn.png", new collisionBody(this.x - 40, this.y - 15, this.width + 5, this.height), this.damage + this.specialDMGMultiplier, players[lenght]));
        }

        if (this.rngResetUp) {
            this.damage /= 1.3;
            this.rngResetUp = false;
        } else if (this.rngResetDown) {
            this.damage /= 0.7;
            this.rngResetDown = false;
        }

        if (this.crit) {
            this.damage /= 1.8;
            this.crit = false;
        }

    }

    autoattack() {

        let  lenght;
        if (players.length === 1) {
            lenght = 0;
        } else
            lenght = 1;
        //kollar om man critar
        if (this.critChance) {
            this.critAttack();
        }

        if (this.rng) {
            this.rngAttack();
        }

//right
        if (keyDownsKnight[1] && !keyDownsKnight[2] && !keyDownsKnight[3] || players[lenght].facingDirection === 1) {

            if (players[lenght].doubleshot) {
                arrows.push(new arrow(this.x, this.y + 10, 360, 0, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y + 5, this.width + 5, this.height), this.damage, players[lenght]));
                arrows.push(new arrow(this.x, this.y - 10, 360, 0, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 15, this.width + 5, this.height), this.damage, players[lenght]));
            } else
                arrows.push(new arrow(this.x, this.y, 360, 0, "bilder/pilar/pilar/pilhoger.png", new collisionBody(this.x + 15, this.y - 5, this.width + 5, this.height), this.damage, players[lenght]));
        }
//left
        else if (keyDownsKnight[0] && !keyDownsKnight[2] && !keyDownsKnight[3] || players[lenght].facingDirection === 0)
            if (players[lenght].doubleshot) {
                arrows.push(new arrow(this.x, this.y + 10, -180, 0, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y + 5, this.width + 5, this.height), this.damage, players[lenght]));
                arrows.push(new arrow(this.x, this.y - 10, -180, 0, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 10, this.width + 5, this.height), this.damage, players[lenght]));
            } else
                arrows.push(new arrow(this.x, this.y, -180, 0, "bilder/pilar/pilar/pilvanster.png", new collisionBody(this.x - 40, this.y - 2.5, this.width + 5, this.height), this.damage, players[lenght]));
        //up
        else if (keyDownsKnight[2] && !keyDownsKnight[0] && !keyDownsKnight[1] || players[lenght].facingDirection === 2)
            if (players[lenght].doubleshot) {
                arrows.push(new arrow(this.x + 10, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 2.5, this.y - 34, this.width, this.height + 10), this.damage, players[lenght]));
                arrows.push(new arrow(this.x - 10, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 22.5, this.y - 34, this.width, this.height + 10), this.damage, players[lenght]));
            } else
                arrows.push(new arrow(this.x, this.y, 90, -90, "bilder/pilar/pilar/pilupp.png", new collisionBody(this.x - 13, this.y - 34, this.width, this.height + 10), this.damage, players[lenght]));
        //down
        else if (keyDownsKnight[3] && !keyDownsKnight[0] && !keyDownsKnight[1] || players[lenght].facingDirection === 3)
            if (players[lenght].doubleshot) {
                arrows.push(new arrow(this.x + 10, this.y, 270, 90, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 2.5, this.y + 20, this.width, this.height + 10), this.damage, players[lenght]));
                arrows.push(new arrow(this.x - 10, this.y, 270, 90, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 22.5, this.y + 20, this.width, this.height + 10), this.damage, players[lenght]));
            } else
                arrows.push(new arrow(this.x, this.y, 270, 90, "bilder/pilar/pilar/pilner.png", new collisionBody(this.x - 12, this.y + 20, this.width, this.height + 10), this.damage, players[lenght]));
        //north west
        else if (keyDownsKnight[0] && keyDownsKnight[2] || players[lenght].facingDirection === 4)
            arrows.push(new arrow(this.x, this.y, 180, -90, "bilder/pilar/pilar/pilnw.png", new collisionBody(this.x - 35, this.y - 25, this.width + 5, this.height + 5), this.damage, players[lenght]));
        //south west
        else if (keyDownsKnight[0] && keyDownsKnight[3] || players[lenght].facingDirection === 5)
            arrows.push(new arrow(this.x, this.y, 180, 90, "bilder/pilar/pilar/pilsw.png", new collisionBody(this.x - 35, this.y + 15, this.width + 5, this.height + 5), this.damage, players[lenght]));
        //north east
        else if (keyDownsKnight[1] && keyDownsKnight[2] || players[lenght].facingDirection === 6)
            arrows.push(new arrow(this.x, this.y, 360, -90, "bilder/pilar/pilar/pilne.png", new collisionBody(this.x + 3, this.y - 25, this.width + 5, this.height + 5), this.damage, players[lenght]));
        //south east
        if (keyDownsKnight[1] && keyDownsKnight[3] || players[lenght].facingDirection === 7) {

            arrows.push(new arrow(this.x, this.y, 360, 90, "bilder/pilar/pilar/pilse.png", new collisionBody(this.x + 5, this.y + 10, this.width + 5, this.height + 5), this.damage, players[lenght]));
        }

        if (this.rngResetUp) {
            this.damage /= 1.3;
            this.rngResetUp = false;
        } else if (this.rngResetDown) {
            this.damage /= 0.7;
            this.rngResetDown = false;
        }

//om man critade reverta tillbacks skadan
        if (this.crit) {
            this.damage / 1.8;
            this.crit = false;
        }

    }
}

//hp bars, cooldown bar
class bar {

    constructor(x, y, width, height, color) {

        this.x = x;
        this.y = y;
        this.width1 = width;
        this.height1 = height;
        this.width2 = width;
        this.height2 = height;
        this.color = color;
        this.temp1 = 1;
        this.temp2 = 1;
    }

    recalcwidth(hp, maxHp) {

        this.temp1 = hp / maxHp;
    }

    recalcheight(hp, maxHp) {
        this.temp2 = hp / maxHp;
    }

    update() {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width2 * this.temp1, this.height2 * this.temp2);
        ctx.lineWidth = 2;
        ctx.rect(this.x, this.y, this.width1, this.height1);
        ctx.stroke();
        ctx.restore();
    }

}

//abstractklass för items
class item {

    constructor(x, y, bild) {
        this.x = x;
        this.y = y;
        this.bild = new Image;
        this.bild.src = bild;
    }

    effect() {
        throw new error("Måste implementera funktion");
    }

    update() {
        this.collisionBody.update();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.drawImage(this.bild, this.bild.width / 2 * (-1), this.bild.height / 2 * (-1), this.bild.width, this.bild.height);
        ctx.restore();
    }

}

//massa items som gör olika saker(om ett item består av 12 lines så är det inte klart)
//
//ger spelaren +1 max hp 1
class apple extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/apple.png");
        this.collisionBody = new collisionBody(this.x - 30, this.y - 30, 60, 60);
    }

    effect(player) {
        player.max_hearts++;
    }

}

//healar spelaren för 1hp samt ger dmg boost på 1 2
class kyckling extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/kyckling.png");
        this.collisionBody = new collisionBody(this.x - 15, this.y - 30, 30, 60);
    }

    effect(player) {
        player.max_hearts++;
        player.damage++;
    }

}

//ger spelaren en chance att crita för 180% skada 3
class luckyNecklace extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/amulet.png");
        this.collisionBody = new collisionBody(this.x - 40, this.y - 60, 80, 120);
    }

    effect(player) {

        player.critChance = true;
    }

}

//ger spelaren en dmg boost på 250% 4
class ringOfPower extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/ring.png");
        this.collisionBody = new collisionBody(this.x - 30, this.y - 30, 60, 60);
    }
    effect(player) {

        player.damage *= 2.5;
    }

}

//gör så att spelaren tar dubbelt så mycket skada men gör dubbelt så mycket skada 5
class cursedRing extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/cursedring.png");
        this.collisionBody = new collisionBody(this.x - 20, this.y - 10, 35, 40);
    }

    effect(player) {

        player.damage *= 2;
        player.dmgTakenMultiplier *= 2;
    }

}

//när en spelare dör så ressas man med 50% max hp fungerar även på din kompis som inte har itemt dör 6
class graal extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/graal.png");
        this.collisionBody = new collisionBody(this.x - 40, this.y - 55, 85, 110);
    }

    effect(player) {

        player.revive = true;
    }

}

//gör din special mer awsome(inte grafiskt) 7
class bok extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/bok.png");
        this.collisionBody = new collisionBody(this.x - 50, this.y - 30, 100, 60);
    }

    effect(player) {
        player.doubleshot = true;
    }

}

//gör så att knight kan träffa ett target för full skada och två targets för halva skadan 8
//Scrapped
class cleave extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/cleave.png");
        this.collisionBody = new collisionBody(this.x, this.y, 30, 30);
    }

    effect() {

    }

}

//gör så att archern kan skjuta två pilar på samma gång istället för en 9
class doubleshot extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/doubleshot.png");
        this.collisionBody = new collisionBody(this.x, this.y, 30, 30);
    }

    effect() {

    }

}

//dmg och hp 10
class gauntlet extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/gauntlet.png");
        this.collisionBody = new collisionBody(this.x - 30, this.y - 30, 65, 60);
    }

    effect(player) {

        player.damage += 3;
        player.max_hearts++;
    }

}

//gör så att knighten får mer range 11
//scrapped
class longsword extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/longsword.png");
        this.collisionBody = new collisionBody(this.x, this.y, 30, 30);
    }

    effect() {

    }

}

//gör så att man inte kan ta mer en ett halvt hjärta i skada samt gör lite skada tillbaka på unit collision 12
class thorns extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/thorns.png");
        this.collisionBody = new collisionBody(this.x - 30, this.y - 30, 60, 60);
    }

    effect(player) {

    }

}

//gör så att knight special slår 360 grader istället för 180 13
//scrapped
class whirlwind extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/whirlwind.png");
        this.collisionBody = new collisionBody(this.x, this.y, 30, 30);
    }

    effect() {

    }

}

//gör så att archern skjuter pilar som slowar enemies och gör ticking damage 14
class toxicArrow extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/toxicArrow.png");
        this.collisionBody = new collisionBody(this.x, this.y, 30, 30);
    }

    effect() {

    }

}

//lägre special cooldown mindre dmg på special 15
class hourglass extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/hourglass.png");
        this.collisionBody = new collisionBody(this.x - 30, this.y - 30, 60, 60);
    }

    effect(player) {
        player.cooldown -= 300;
        player.specialDMGMultiplier = -2;
    }

}

//movementSpeed och attackspeed 16
class bootsOfSwiftness extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/boot_of_swiftnes.png");
        this.collisionBody = new collisionBody(this.x, this.y - 30, 40, 60);
    }

    effect(player) {
        player.moveSpeedMultiplayer = 1.5;
        player.attackSpeed -= 20;
    }

}

//ger ett max hp samt healar ett hp vid start av varje ny lvl(gör absolut inget om man har fullt hp)17
class bandage extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/bandage.png");
        this.collisionBody = new collisionBody(this.x - 50, this.y - 50, 100, 100);
    }

    effect(player) {
        player.max_hearts++;
        player.hpReg = true;
    }

}

//gör så att man har en 5% chance att få ett halvt hjärta när man slår mobs
//samt en 20& chans att få ett hjärta när man dödar ett mob
//samt att det är en aura på en viss unit vilket gör att din kompis får samma benefits om han står i auran (om tid finns) 18
class vampiricAura extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/vamp.png");
        this.collisionBody = new collisionBody(this.x - 30, this.y - 20, 60, 70);
    }

    effect(player) {
        player.lifesteal = true;
        player.vampAura = true;
    }

}

//tänke efter lite 19
class piercingArrow extends item {

    constructor(x, y) {
        super(x, y, "");
        this.collisionBody = new collisionBody(this.x, this.y, 30, 30);
    }

    effect(player) {
        player.piercingArrowBool = true;
    }

}

//attack speed, movement speed 20
class speedBracers extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/bracers.png");
        this.collisionBody = new collisionBody(this.x - 40, this.y - 10, 80, 30);
    }

    effect(player) {
        player.moveSpeedMultiplayer = 1.5;
        player.attackSpeed -= 30;
    }

}

//längre special cooldown men gör mer skada 21
class slug extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/snail.png");
        this.collisionBody = new collisionBody(this.x - 15, this.y - 15, 30, 30);
    }

    effect(player) {
        player.cooldown += 300;
        player.specialDMGMultiplier = 3;
    }

}

//man har en 50& chance att göra 30% mer skada men den har en 50% att göra 30% mindre skada 22
class RNG extends item {

    constructor(x, y) {
        super(x, y, "bilder/items/RNG.png");
        this.collisionBody = new collisionBody(this.x - 30, this.y - 20, 60, 70);
    }

    effect(player) {
        player.rng = true;
    }

}

//skapar hitboxes för allt som behöver en hitbox + collision kontroller (vet att jag borde ändra namnet till hitbox, för lat)
class collisionBody {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    collision(collisionBody) {

        if (this.x > collisionBody.x && this.x < collisionBody.x + collisionBody.width && this.y > collisionBody.y && this.y < collisionBody.y + collisionBody.height) {
            return true;
        }

        if (this.x + this.width > collisionBody.x && this.x + this.width < collisionBody.x + collisionBody.width && this.y + this.height > collisionBody.y && this.y + this.height < collisionBody.y + collisionBody.height) {
            return true;
        }

        if (collisionBody.x > this.x && collisionBody.x < this.x + this.width && collisionBody.y > this.y && collisionBody.y < this.y + this.width) {
            return true;
        }

        if (collisionBody.x + collisionBody.width > this.x && collisionBody.x + collisionBody.width < this.x + this.width && collisionBody.y + collisionBody.height > this.y && collisionBody.y + collisionBody.height < this.y + this.height) {
            return true;
        }

        if (collisionBody.y + collisionBody.height > this.y && collisionBody.y + collisionBody.height < this.y + this.height && collisionBody.x > this.x && collisionBody.x < this.x + this.width) {
            return true;
        }

        if (collisionBody.x + collisionBody.width > this.x && collisionBody.x + collisionBody.width < this.x + this.width && collisionBody.y > this.y && collisionBody.y < this.y + this.height) {
            return true;
        }



        return false;
    }

    move(vx, vy) {
        this.x += vx;
        this.y += vy;
    }

    setPosition(collisionX, collisionY) {

        this.x = collisionX;
        this.y = collisionY;
    }

    update() {
        if (hitboxeson) {
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = "4";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
            ctx.restore();
        }
    }

}

//detta får ni lista ut själva
function keydown(e) {

//console.log(e.keyCode);

    let  lenght;
    if (players.length === 1) {
        lenght = 0;
    } else
        lenght = 1;
    switch (e.keyCode) {
//[0] left archer
        case 65:

            keyDownsArcher[0] = true;
            keyDownsArcher[1] = false;
            if (!keyDownsArcher[2] && !keyDownsArcher[3])
                players[0].facingDirection = 0;
            else if (keyDownsArcher[2] && keyDownsArcher[0] && !keyDownsArcher[3]) {
//north west
                players[0].facingDirection = 4;
            } else if (keyDownsArcher[3] && keyDownsArcher[0] && !keyDownsArcher[2]) {
//south west
                players[0].facingDirection = 5;
            }
            break;
            //[1] rigth archer
        case 68:

            keyDownsArcher[0] = false;
            keyDownsArcher[1] = true;
            if (!keyDownsArcher[2] && !keyDownsArcher[3])
                players[0].facingDirection = 1;
            else if (keyDownsArcher[2] && keyDownsArcher[1] && !keyDownsArcher[3]) {
//north east
                players[0].facingDirection = 6;
            } else if (keyDownsArcher[3] && keyDownsArcher[1] && !keyDownsArcher[2]) {
//south east
                players[0].facingDirection = 7;
            }

            break;
            //[2] up archer
        case 87:


            keyDownsArcher[2] = true;
            keyDownsArcher[3] = false;
            if (!keyDownsArcher[0] && !keyDownsArcher[1])
                players[0].facingDirection = 2;
            else if (keyDownsArcher[2] && keyDownsArcher[0] && !keyDownsArcher[3]) {
//north west
                players[0].facingDirection = 4;
            } else if (keyDownsArcher[2] && keyDownsArcher[1] && !keyDownsArcher[3]) {
//north east
                players[0].facingDirection = 6;
            }

            break;
            //[3] down archer
        case 83:


            keyDownsArcher[2] = false;
            keyDownsArcher[3] = true;
            if (!keyDownsArcher[0] && !keyDownsArcher[1])
                players[0].facingDirection = 3;
            else if (keyDownsArcher[3] && keyDownsArcher[1] && !keyDownsArcher[2]) {
//south east
                players[0].facingDirection = 7;
            } else if (keyDownsArcher[3] && keyDownsArcher[0] && !keyDownsArcher[2]) {
//south west
                players[0].facingDirection = 5;
            }

            break;
            //[4] v shoot archer
        case 86:

            //keyDowns[4] = true;
            if (players[0].cooldownAA === 0) {
                players[0].autoattack();
                players[0].cooldownAA = players[0].attackSpeed;
            }


            break;
            //[5]  G special archer
        case 71:

            keyDownsArcher[5] = true;
            if (players[0].cooldownSpecial === 0) {
                players[0].special();
                //1184 == 20 sec ish|| 1 sec == 62.5
                players[0].cooldownSpecial = players[0].cooldown;
            }

            break;
            //left knight
        case 100:

            keyDownsKnight[0] = true;
            keyDownsKnight[1] = false;
            if (!keyDownsKnight[2] && !keyDownsKnight[3])
                players[lenght].facingDirection = 0;
            else if (keyDownsKnight[2] && keyDownsKnight[0] && !keyDownsKnight[3]) {
//north west
                players[lenght].facingDirection = 4;
            } else if (keyDownsKnight[3] && keyDownsKnight[0] && !keyDownsKnight[2]) {
//south west
                players[lenght].facingDirection = 5;
            }

            break;
            //right knight
        case 102:

            keyDownsKnight[0] = false;
            keyDownsKnight[1] = true;
            if (!keyDownsKnight[2] && !keyDownsKnight[3])
                players[lenght].facingDirection = 1;
            else if (keyDownsKnight[2] && keyDownsKnight[1] && !keyDownsKnight[3]) {
//north east
                players[lenght].facingDirection = 6;
            } else if (keyDownsKnight[3] && keyDownsKnight[1] && !keyDownsKnight[2]) {
//south east
                players[lenght].facingDirection = 7;
            }

            break;
            //up knight
        case 104:

            keyDownsKnight[2] = true;
            keyDownsKnight[3] = false;
            if (!keyDownsKnight[0] && !keyDownsKnight[1])
                players[lenght].facingDirection = 2;
            else if (keyDownsKnight[2] && keyDownsKnight[0] && !keyDownsKnight[3]) {
//north west
                players[lenght].facingDirection = 4;
            } else if (keyDownsKnight[2] && keyDownsKnight[1] && !keyDownsKnight[3]) {
//north east
                players[lenght].facingDirection = 6;
            }

            break;
            //down knight
        case 101:

            keyDownsKnight[2] = false;
            keyDownsKnight[3] = true;
            if (!keyDownsKnight[0] && !keyDownsKnight[1])
                players[lenght].facingDirection = 3;
            else if (keyDownsKnight[3] && keyDownsKnight[1] && !keyDownsKnight[2]) {
//south east
                players[lenght].facingDirection = 7;
            } else if (keyDownsKnight[3] && keyDownsKnight[0] && !keyDownsKnight[2]) {
//south west
                players[lenght].facingDirection = 5;
            }


            break;
            //"arrow right" aa knight
        case 39:

            if (players[lenght].cooldownAA === 0) {
                players[lenght].autoattack();
                players[lenght].cooldownAA = players[lenght].attackSpeed;
            }

            break;
            //"arrow down" special knight
        case 40:

            if (players[lenght].cooldownSpecial === 0) {
                players[lenght].special();
                //1184 == 20 sec ish|| 1 sec == 62.5
                players[lenght].cooldownSpecial = players[lenght].cooldown;
            }

            break;
        case 82:

            //items.push(new speedBracers(300,100));
            break;
        case 84:
            if (!hitboxeson)
                hitboxeson = true;
            else
                hitboxeson = false;
            break;
        case 27:
            pauseMenuStart = true;
            pause();
            break;
    }
}

function keyup(e) {
    switch (e.keyCode) {
//[0] left
        case 65:

            keyDownsArcher[0] = false;
            break;
            //[1] rigth
        case 68:

            keyDownsArcher[1] = false;
            break;
            //[2] up
        case 87:

            keyDownsArcher[2] = false;
            break;
            //[3] down
        case 83:

            keyDownsArcher[3] = false;
            break;
            //[4] c shoot
        case 67:

            keyDownsArcher[4] = false;
            break;
        case 100:
            //left
            keyDownsKnight[0] = false;
            break;
        case 102:
            //right
            keyDownsKnight[1] = false;
            break;
        case 104:
            //up
            keyDownsKnight[2] = false;
            break;
        case 101:
            //down
            keyDownsKnight[3] = false;
            break;
            //[5]  Q special
        case 81:

            keyDownsArcher[5] = false;
            break;
    }
}

function mouseDown(e) {

//console.log(e.clientX, e.clientY);
//start game
    if (menuStart && e.clientX > menuStartButton.x && e.clientX < menuStartButton.x + menuStartButton.width && e.clientY > menuStartButton.y && e.clientY < menuStartButton.y + menuStartButton.height) {
        menuStart = false;
        loadGame();
    }

//resume after pause
    if (pauseMenuStart && e.clientX > pauseMenuStartButton.x && e.clientX < pauseMenuStartButton.x + pauseMenuStartButton.width && e.clientY > pauseMenuStartButton.y && e.clientY < pauseMenuStartButton.y + pauseMenuStartButton.height) {

        pauseMenuStart = false;
        draw();
    }

//quit game
    if (pauseMenuStart && e.clientX > pauseMenuQuitButton.x && e.clientX < pauseMenuQuitButton.x + pauseMenuQuitButton.width && e.clientY > pauseMenuQuitButton.y && e.clientY < pauseMenuQuitButton.y + pauseMenuQuitButton.height) {

        pauseMenuStart = false;
        menuStart = true;
        mute = true;
        pressed = false;
        once = false;
        level = 0;
        reset();
        Menu();
    }

    if (mute && e.clientX > muteButton.x && e.clientX < muteButton.x + muteButton.width && e.clientY > muteButton.y && e.clientY < muteButton.y + muteButton.height) {
        sound.play();
    }

//main menu from deathscreen
    if (deathScreenbool && e.clientX > deathScreenMainMenuButton.x && e.clientX < deathScreenMainMenuButton.x + deathScreenMainMenuButton.width && e.clientY > deathScreenMainMenuButton.y && e.clientY < deathScreenMainMenuButton.y + deathScreenMainMenuButton.height) {

        deathScreenbool = false;
        menuStart = true;
        mute = true;
        pressed = false;
        once = false;
        level = 0;
        reset();
        Menu();
    }

//retry
    if (deathScreenbool && e.clientX > deathScreenRetryButton.x && e.clientX < deathScreenRetryButton.x + deathScreenRetryButton.width && e.clientY > deathScreenRetryButton.y && e.clientY < deathScreenRetryButton.y + deathScreenRetryButton.height) {

        deathScreenbool = false;
        pressed = false;
        once = false;
        level = 0;
        reset();
        loadGame();
    }
}

requestAnimationFrame(init);
