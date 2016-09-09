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
                    default:
                        return 'Views/Missions/under_construction.html';                        
                }
            },

            checkIfExists: function (item) {
                if (item) {
                    return false;
                } else {
                    return true;
                }
            }

        }; //end of object
        return batObj;
    }]);