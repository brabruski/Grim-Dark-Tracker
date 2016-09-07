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
            }

        };
        return ncObj;
    }]);