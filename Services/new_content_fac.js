grimApp.factory('NewContentFactory',
    ['$rootScope', '$firebaseAuth', '$firebaseObject', 'Config',
    function ($rootScope, $firebaseAuth, $firebaseObject, Config) {
        var ncObj = {
            maxNumber: function (maxNum) {
                var maxNumberInSet = [];
                for (var i = 0; i < maxNum; i++) {
                    maxNumberInSet.push(i + 1);
                }
                return maxNumberInSet;
            },

            cardNumbers: function () {
                var cardNumber = [11, 12, 13, 14, 15, 16, 21, 22, 23, 24, 25, 26, 31, 32, 33, 34, 35, 36, 41, 42, 43, 44, 45, 46, 51, 52, 53, 54, 55, 56, 61, 62, 63, 64, 65, 66];
                return cardNumber;
            },

            createId: function (allCards) {
                var cardIds = [];
                for (var i = 0; i < allCards.length; i++) {
                    cardIds.push(allCards[i].id);
                }
                var topId = 0;
                for (var j = 0; j < cardIds.length; j++) {
                    if (cardIds[j] > topId) {
                        topId = cardIds[j];
                    }
                }
                topId++;
                return topId;
            },

            fillValue: function (maxLength, arrayObj) {
                if (arrayObj.length !== maxLength) {
                    var newLength = maxLength - arrayObj.length;
                    var valueDef = arrayObj[0].value;
                    for (i = 0; i < newLength; i++) {
                        arrayObj.push({ value: valueDef });
                    }
                }
                return arrayObj;
            },

            generateItem: function (dbArray) {
                var randomItem = dbArray[Math.floor(Math.random() * dbArray.length)];
                return randomItem;
            },

            createBattleDeck: function (armyDeck, defDeck) {
                var newDeck = [];
                armyNew = armyDeck.cards;
                for (var prop in armyNew) {
                    newDeck.push(armyNew[prop]);
                }
                for (i = 0; i < defDeck.length; i++) {
                    newDeck.push(defDeck[i]);
                }
                return newDeck;
            },

            cycleDeck: function (deck, prop) {
                var spliceArray = [];
                for (i = 0; i < deck.length; i++) {
                    if (deck[i][prop]) {
                        spliceArray.push(i);
                    }
                }

                for (i = spliceArray.length - 1; i >= 0; i--) {
                    deck.splice(spliceArray[i], 1);
                }

                return deck;
            },

            applyOptions: function (deck, options) {
                var deckFiltered = deck;
                if (options.mysteriousobj === true) {
                    deckFiltered = ncObj.cycleDeck(deckFiltered, 'mystobj');
                }
                if (options.flyers === true) {
                    deckFiltered = ncObj.cycleDeck(deckFiltered, 'fly');
                }
                if (options.fortification === true) {
                    deckFiltered = ncObj.cycleDeck(deckFiltered, 'fort');
                }
                if (options.vehicles === true) {
                    deckFiltered = ncObj.cycleDeck(deckFiltered, 'veh');
                }
                if (options.psykersene === true) {
                    deckFiltered = ncObj.cycleDeck(deckFiltered, 'psykene');
                }
                if (options.psykersfriend === true) {
                    deckFiltered = ncObj.cycleDeck(deckFiltered, 'psykmy');
                }
                return deckFiltered;
            },

            tactOptions: function () {
                var tactOpt = {};
                tactOpt.mysteriousobj = false;
                tactOpt.flyers = false;
                tactOpt.fortification = false;
                tactOpt.vehicles = false;
                tactOpt.psykersene = false;
                tactOpt.psykersfriend = false;
                return tactOpt;
            },

            traitOptions: function () {
                var cmdrOpt = {};
                cmdrOpt.none = false;
                cmdrOpt.legendaryFght = false;
                cmdrOpt.tactGenious = false;
                cmdrOpt.mastInterference = false;
                cmdrOpt.wellPrep = false;
                cmdrOpt.forPlan = false;
                cmdrOpt.leadByEg = false;
                return cmdrOpt;
            },

            traitList: function () {
                var traitOpt = [
                { id: 0, traitname: 'None' },
                { id: 1, traitname: 'Personal Trait: Legendary Fighter' },
                { id: 2, traitname: 'Tactical Trait: Tactical Genious' },
                { id: 3, traitname: 'Tactical Trait: Master of Interference' },
                { id: 4, traitname: 'Tactical Trait: Well Prepared' },
                { id: 5, traitname: 'Tactical Trait: Forward Planning' },
                { id: 6, traitname: 'Tactical Trait: Lead by Example' }
                ];
                return traitOpt;
            },

            traitModify: function (selectedItem) {
                var traitObjMod = ncObj.traitOptions();
                if (selectedItem.id === 0) {
                    traitObjMod.none = true;                    
                } else if (selectedItem.id === 1) {
                    traitObjMod.legendaryFght = true;                    
                } else if (selectedItem.id === 2) {
                    traitObjMod.tactGenious = true;                    
                } else if (selectedItem.id === 3) {
                    traitObjMod.mastInterference = true;                    
                } else if (selectedItem.id === 4) {
                    traitObjMod.wellPrep = true;                   
                } else if (selectedItem.id === 5) {
                    traitObjMod.forPlan = true;                    
                } else if (selectedItem.id === 6) {
                    traitObjMod.leadByEg = true;
                }
                return traitObjMod;
            }

        };
        return ncObj;
    }]);