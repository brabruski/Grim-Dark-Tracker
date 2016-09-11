grimApp.factory('BattleFactory',
    ['$rootScope', '$firebaseAuth', '$firebaseObject',
    function ($rootScope, $firebaseAuth, $firebaseObject) {
        var batObj = {
            battleOptions: function (db) {
                var battleOpt = {};
                battleOpt.vicpoints = db.vicpoints;
                battleOpt.mystObjective = db.options.mysteriousobj;
                battleOpt.completed = db.completed;
                battleOpt.objExist = db.objExist;
                battleOpt.objCount = db.objCount;
                battleOpt.lineBreak = db.lineBreak;
                battleOpt.firstBlood = db.firstBlood;
                battleOpt.slayWarLord = db.slayWarLord;
                battleOpt.gameStarted = db.started;
                battleOpt.victCount = db.victCount;
                battleOpt.finalVicPoints = db.objScoreCount;
                return battleOpt;
            },

            secObjClass: function (db, x) {
                if (x === 0) {
                    if (db.slayWarLord) {
                        return 'md-warn';
                    } else {
                        return 'md-raised md-primary';
                    }
                }
                if (x === 1) {
                    if (db.firstBlood) {
                        return 'md-warn';
                    } else {
                        return 'md-raised md-primary';
                    }
                }
                if (x === 2) {
                    if (db.lineBreak) {
                        return 'md-warn';
                    } else {
                        return 'md-raised md-primary';
                    }
                }
                if (x === 3) {
                    if (!db.warlordAlive) {
                        return 'md-warn';
                    } else {
                        return 'md-raised md-primary';
                    }
                }

            },

            battleSelect: function (name) {
                switch (name) {
                    case 'Crusade':
                        return 'Views/Missions/eternal_crusade.html';
                    case 'Purge the Alien':
                        return 'Views/Missions/eternal_purge_alien.html';
                    case 'The Scouring':
                        return 'Views/Missions/eternal_scouring.html';
                    case 'Big Guns Never Tire':
                        return 'Views/Missions/eternal_big_guns.html';
                    case 'The Emperor\'s Will':
                        return 'Views/Missions/eternal_emperor_will.html';
                    case 'The Relic':
                        return 'Views/Missions/eternal_relic.html';
                    case 'Cleanse and Control':
                        return 'Views/Missions/maelstrom_cleanse_control.html';
                    default:
                        return 'Views/Missions/under_construction.html';
                }
            },

            endRoundCleanUp: function (db) {
                if (db.battle.id === '1007') {
                    console.log('1007')
                }
                return db;
            },

            checkIfExists: function (item) {
                if (item) {
                    return false;
                } else {
                    return true;
                }
            },

            checkItemZero: function (num) {
                if (num > 0) {
                    return false;
                } else {
                    return true;
                }
            },

            checkWarlordAlive: function (db) {
                var index = 0;
                if (db.warlordAlive) {
                    db.warlordAlive = !db.warlordAlive;
                } else {
                    db.warlordAlive = true;
                }
                return db;
            },

            checkDiscardsWl: function (db, amount) {
                if (db.traits.tactGenious && db.warlordAlive) {
                    amount++;
                } else {
                    if (db.traits.tactGenious && !db.warlordAlive && amount > 0) {
                        amount--;
                    }
                }
                return amount;
            },

            checkGameDiscards: function (db, gameDraw) {
                if (db.activeDeck) {
                    db.battle.tdraw = gameDraw - db.activeDeck.length;

                } else {
                    db.battle.tdraw = gameDraw;
                }
                return db;
            },

            pickCard: function (db, maxActiveDeck) {
                var random = Math.floor(Math.random() * db.deck.length);
                if (!db.activeDeck) {
                    var aDeck = [];
                } else {
                    aDeck = db.activeDeck;
                }
                if (aDeck.length < maxActiveDeck && db.deck.length > 0) {
                    var randomCard = db.deck[random];
                    aDeck.push(randomCard);
                    db.deck.splice(random, 1);
                    db.activeDeck = aDeck;
                }
                return db;
            },

            getCardColour: function (name) {
                switch (name) {
                    case 'red':
                        return 'red';
                    case 'blue':
                        return 'blue';
                    case 'green':
                        return 'green';
                    case 'yellow':
                        return 'yellow';
                    case 'orange':
                        return 'orange';
                    case 'purple':
                        return 'purple';
                    default:
                        return 'grey';
                }
            }

        }; //end of object
        return batObj;
    }]);