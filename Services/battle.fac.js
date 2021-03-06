﻿grimApp.factory('BattleFactory',
    ['$rootScope', '$firebaseAuth', '$firebaseObject', '$firebaseArray',
    function ($rootScope, $firebaseAuth, $firebaseObject, $firebaseArray) {

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

            //toggles button class based on whether clicked or not
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

            //Selects which battle to include in battle window
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
                    case 'Contact Lost':
                        return 'Views/Missions/maelstrom_contact_lost.html';
                    case 'Cloak & Shadows':
                        return 'Views/Missions/maelstrom_cloak_shadows.html';
                    case 'Tactical Escalation':
                        return 'Views/Missions/maelstrom_tactical_escalation.html';
                    case 'The Spoils of War':
                        return 'Views/Missions/maelstrom_spoils_war.html';
                    case 'Deadlock':
                        return 'Views/Missions/maelstrom_deadlock.html';
                    default:
                        return 'Views/Missions/under_construction.html';
                }
            },

            //Adjusts victory points depending on secondary conditions achieved
            secCondComplete: function (db, num) {
                if (num === 0) {
                    if (db.slayWarLord) {
                        db.slayWarLord = !db.slayWarLord;
                        db.vicpoints--;
                    } else {
                        db.slayWarLord = true;
                        db.vicpoints++;
                    }
                }
                if (num === 1) {
                    if (db.firstBlood) {
                        db.firstBlood = !db.firstBlood;
                        db.vicpoints--;
                    } else {
                        db.firstBlood = true;
                        db.vicpoints++;
                    }
                }
                if (num === 2) {
                    if (db.lineBreak) {
                        db.lineBreak = !db.lineBreak;
                        db.vicpoints--;
                    } else {
                        db.lineBreak = true;
                        db.vicpoints++;
                    }
                }

                return db;
            },

            //check if the round can end based on draws left and if active deck is too big
            isEndRoundValid: function (db) {
                var roundEnd;
                if (db.battle.tdraw > 0) {
                    roundEnd = true;
                } else {
                    roundEnd = false;
                }
                if (db.activeDeck) {
                    if (!roundEnd && db.activeDeck.length > db.battle.tmax) {
                        roundEnd = true;
                    }
                }
                return roundEnd;
            },

            //specific cleanup needed depending on mission selected and round currently on
            endRoundCleanUp: function (db) {
                if (db.battle.id === 1007) {
                    db.battle.tdiscard = batObj.checkDiscardsWl(db, 1);
                    db = batObj.checkGameDraws(db);
                }
                if (db.battle.id === 1008) {
                    db.battle.tdiscard = batObj.checkDiscardsWl(db, 1);
                    db.objExist = false;
                }
                if (db.battle.id === 1009) {
                    db.battle.tdiscard = batObj.checkDiscardsWl(db, 1);
                    db.battle.tmax = db.round;
                    db = batObj.checkGameDraws(db);
                }
                if (db.battle.id === 1010) {
                    db.battle.tdiscard = batObj.checkDiscardsWl(db, 1);
                    db = batObj.checkGameDraws(db);
                }
                if (db.battle.id === 1011) {
                    db.battle.tdiscard = batObj.checkDiscardsWl(db, 1);
                    db = batObj.checkGameDraws(db);
                }
                if (db.battle.id === 1012) {
                    db.battle.tdiscard = batObj.checkDiscardsWl(db, 1);
                    if (db.round < 7) {
                        db.battle.tmax = 7 - db.round;
                    } else {
                        db.battle.tmax = 1;
                    }
                    db.battle.tdiscard = batObj.discardAmount(db);
                    db = batObj.checkGameDraws(db);
                }

                return db;
            },

            startGameWarlordMods: function (db) {

            },

            //returns true or false to disable a button if conditions aren't met
            checkIfExists: function (item) {
                if (item) {
                    return false;
                } else {
                    return true;
                }
            },

            //returns true or false if all actions haven't been completed. I.e card draws
            checkItemZero: function (num) {
                if (num > 0) {
                    return false;
                } else {
                    return true;
                }
            },

            checkItemSecured: function (name) {
                return name.includes('Secure');
            },

            //returns true or false if warlord is alive or dead for other values to be adjusted depending on Warlord bonuses
            checkWarlordAlive: function (db) {
                var index = 0;
                if (db.warlordAlive) {
                    db.warlordAlive = !db.warlordAlive;
                } else {
                    db.warlordAlive = true;
                }
                return db;
            },

            //If warlord has Tactical Genious, adjusts discard amount based on if they are alive or not
            checkDiscardsWl: function (db, amount) {
                if (amount > 0) {
                    if (db.traits.tactGenious && db.warlordAlive) {
                        amount++;
                    }

                    if (db.traits.tactGenious && !db.warlordAlive) {
                        amount--;
                    }
                }
                return amount;
            },

            //discards card from active deck
            discardCard: function (cardId, db) {
                var indexofId;
                for (i = 0; i < db.activeDeck.length; i++) {
                    if (cardId === db.activeDeck[i].id) {
                        indexofId = i;
                    }
                }
                db.activeDeck.splice(indexofId, 1);
                return db;
            },

            //adjusts allowed discards in a round based on size of active deck, warlord traits and game type
            discardAmount: function (db) {
                var deficit = -1;
                if (db.activeDeck.length > db.battle.tmax) {
                    deficit = db.activeDeck.length - db.battle.tmax;
                }
                db.battle.tdiscard = db.battle.tdiscard + deficit;
                return db.battle.tdiscard;
            },

            //adjusts how many cards can be draw based on game type and warlord traits
            adjustDraw: function (db, drawAmount) {
                if (db.round <= 1 && db.traits.wellPrep) {
                    drawAmount++;
                }
                if (db.activeDeck) {
                    db.battle.tdraw = drawAmount - db.activeDeck.length;
                } else {
                    db.battle.tdraw = drawAmount;
                }
                if (db.battle.tdraw < 0) {
                    db.battle.tdraw = 0;
                }
                return db;
            },

            checkGameDraws: function (db) {
                var gameDraw = db.battle.tmax;
                db = batObj.adjustDraw(db, gameDraw);
                return db;
            },

            checkStartDraws: function (db) {
                var gameDraw = db.battle.tstart;
                db = batObj.adjustDraw(db, gameDraw);
                return db;
            },

            checkObjGameDraws: function (db, obj) {
                db.battle.tdraw = obj;
                var activeDeckMax = db.battle.tmax;
                if (db.activeDeck) {
                    activeDeckMax = db.battle.tmax - db.activeDeck.length;
                }
                if (db.battle.tdraw > activeDeckMax) {
                    db.battle.tdraw = activeDeckMax;
                }
                return db;
            },

            //Randomly selects and removes a card out of the main deck and puts it into active deck
            pickCard: function (db) {
                var random = Math.floor(Math.random() * db.deck.length);
                if (!db.activeDeck) {
                    var aDeck = [];
                } else {
                    aDeck = db.activeDeck;
                }
                if (db.deck.length > 0) {
                    var randomCard = db.deck[random];
                    aDeck.push(randomCard);
                    db.deck.splice(random, 1);
                    db.activeDeck = aDeck;
                }
                return db;
            },

            stealObjective: function (db) {
                db.vicpoints++;
                return db;
            },

            //returns colour class for cards based on army being played
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