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

            //Old Factory Methods to be deleted below

            //check if cards exist
            existArray: function (cardSource, deckCardSource) {
                var doesExist = [];

                for (var i = 0; i < cardSource.length; i++) {
                    for (var j = 0; j < deckCardSource.length; j++) {
                        if (cardSource[i].id === deckCardSource[j].id) {
                            doesExist[j] = true;
                        } //end if Loop
                    }// end for loop
                }//end for loop

                for (i = 0; i < deckCardSource.length; i++) {
                    if (doesExist[i] === undefined) {
                        doesExist[i] = false;
                    }
                }

                return doesExist;
            },

            deckDiceArray: function (cardSource, deckCardSource) {
                var deckDice = [];

                for (var i = 0; i < cardSource.length; i++) {
                    for (var j = 0; j < deckCardSource.length; j++) {
                        if (cardSource[i].id === deckCardSource[j].id) {
                            deckDice.push(cardSource[i]);
                        } //end if Loop
                    }// end for loop
                }//end for loop
                return deckDice;
            },

            //Count Items
            countItem: function (item, term) {
                var diceCount = 0;
                for (i = 0; i < item.length; i++) {
                    if (item[i].cardtype === term) {
                        diceCount = diceCount + item[i].diceQuantity;
                    }
                }
                return diceCount;
            },

            //Navigation Buttons
            prevBtn: function (itemId, item) {
                var prevItem;
                if (itemId > 0) {
                    prevItem = Number(itemId) - 1;
                } else {
                    prevItem = item.length - 1;
                }
                return prevItem;
            },

            nextBtn: function (itemId, item) {
                var nextItem;
                if (itemId < item.length - 1) {
                    nextItem = Number(itemId) + 1;
                } else {
                    nextItem = 0;
                }
                return nextItem;
            },

            //Set all Energy Types Available
 

            maxDice: function (maxDice) {
                //Create an Array of Option Values
                var maxDiceInSet = [];
                for (var i = 0; i < maxDice; i++) {
                    maxDiceInSet.push(i + 1);
                }
                return maxDiceInSet;
            },

            //Create array of existing Cards in a deck
            createContents: function (dbSource) {
                var deckCardContent = [];
                for (j = 0; j < dbSource.length; j++) {
                    deckCardContent[j] = dbSource[j].name;
                }
                return deckCardContent;
            },

            //Check if card names exist in array
            checkContents: function (arraySource, cardName) {
                var isAdded = false;
                for (i = 0; i < arraySource.length; i++) {
                    if (cardName === arraySource[i]) {
                        isAdded = true;
                        break;
                    }
                }
                return isAdded;
            }
        };
        return ncObj;
    }]);