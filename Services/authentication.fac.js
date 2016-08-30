﻿grimApp.factory('Authentication',
    ['$rootScope', '$firebaseAuth', '$location', '$firebaseObject', 'Config',
    function ($rootScope, $firebaseAuth, $location, $firebaseObject, Config) {

        var ref = new Firebase(Config.FIREBASE_URL);
        var auth = $firebaseAuth(ref);

        auth.$onAuth(function (authUser) {
            if (authUser) {
                var userRef = new Firebase(Config.FIREBASE_URL + 'users/' + authUser.uid);
                var userObj = $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
            } else {
                $rootScope.currentUser = '';
            }
        });

        var authObj = {

            login: function (user) {
                auth.$authWithPassword({
                    email: user.email,
                    password: user.password
                }).then(function (regUser) { //change view based on success of login
                    $location.path('/landing');
                }).catch(function (error) {
                    $rootScope.message = error.message;
                });
            },

            logout: function (user) {
                return auth.$unauth();
            },

            requireAuth: function () {
                return auth.$requireAuth();
            },

            register: function (user) {
                auth.$createUser({
                    //firebase only creates email & password on registration
                    email: user.email,
                    password: user.password
                }).then(function (regUser) { //adds any other info onto userID in firebase
                    var regRef = new Firebase(Config.FIREBASE_URL + 'users')
                        .child(regUser.uid)
                        .set({
                            date: Firebase.ServerValue.TIMESTAMP,
                            regUser: regUser.uid,
                            fname: user.fname,
                            lname: user.lname,
                            dname: user.displayname,
                            email: user.email
                        });
                    authObj.login(user);

                    $rootScope.message = "Hi " + user.displayname;
                }).catch(function (error) {
                    $rootScope.message = error.message;
                });
            }
        };
        return authObj;
    }]);