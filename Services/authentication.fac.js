grimApp.constant('Config', {
    FIREBASE_STOR: 'grimdarktracker30082016.appspot.com',
    FIREBASE_CONFIG: {
        apiKey: "AIzaSyDFD330aSVMODDPvqfBJ2ec1ydNk2jU4U4",
        authDomain: "grimdarktracker30082016.firebaseapp.com",
        databaseURL: "https://grimdarktracker30082016.firebaseio.com",
        storageBucket: "grimdarktracker30082016.appspot.com"
    }
});

grimApp.factory('Authentication',
    ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'Config',
    function ($rootScope, $firebaseAuth, $firebaseObject, $location, Config) {

        firebase.initializeApp(Config.FIREBASE_CONFIG);

        var ref = firebase.database().ref();
        var auth = $firebaseAuth();

        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) {
                var userRef = firebase.database().ref('users/' + authUser.uid);
                var userObj = $firebaseObject(userRef);
                $rootScope.currentUser = userObj;
            } else {
                $rootScope.currentUser = '';
            }
        });

        var authObj = {

            login: function (user) {
                auth.$signInWithEmailAndPassword(user.email, user.password)
                    .then(function (regUser) { //change view based on success of login
                    $location.path('/home');
                }).catch(function (error) {
                    $rootScope.message = error.message;
                });
            },

            logout: function (user) {
                return auth.$signOut();
            },

            requireAuth: function () {
                return auth.$requireSignIn();
            },

            register: function (user) {
                auth.$createUserWithEmailAndPassword(user.email, user.password)
                    .then(function (regUser) { //adds any other info onto userID in firebase
                        var regRef = firebase.database().ref('users')
                        .child(regUser.uid)
                        .set({
                            date: firebase.database.ServerValue.TIMESTAMP,
                            regUser: regUser.uid,
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