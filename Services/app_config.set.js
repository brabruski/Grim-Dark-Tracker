//Define Theme defaults
grimApp.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('lime')
      .accentPalette('blue')
    .warnPalette('red');
});


//Define icons in theme
grimApp.config(function ($mdIconProvider) {
    // Configure URLs for icons specified by [set:]id.
    $mdIconProvider
        .defaultFontSet('fa')   // This sets our default fontset className.
        .icon('menu', 'fonts/icons/menu.svg', 24)
        .icon('delete', 'fonts/icons/delete.svg', 24)
        .icon('add', 'fonts/icons/plus-circle.svg', 24)
        .icon('aleft', 'fonts/icons/chevron-double-left.svg', 24)
        .icon('aright', 'fonts/icons/chevron-double-right.svg', 24)
        .icon('view', 'fonts/icons/eye.svg', 24)
        .icon('search', 'fonts/icons/magnify.svg', 24)
        .icon('key', 'fonts/icons/key.svg', 24)
        .icon('email', 'fonts/icons/email.svg', 24)
        .icon('username', 'fonts/icons/account-settings-variant.svg', 24)
        .icon('user', 'fonts/icons/account.svg', 24);
});