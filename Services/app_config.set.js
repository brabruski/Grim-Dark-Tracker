//Define Theme defaults
grimApp.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('deep-purple')
      .accentPalette('blue-grey')
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
        .icon('user', 'fonts/icons/account.svg', 24)
        .icon('plus', 'fonts/icons/plus-box.svg', 24)
        .icon('minus', 'fonts/icons/minus-box.svg', 24)
        .icon('droll', 'fonts/icons/dice-roll.svg', 24)
        .icon('save', 'fonts/icons/content-save.svg', 24)
        .icon('skull', 'fonts/icons/skull.svg', 24)
        .icon('thumbup', 'fonts/icons/thumb-up.svg', 24)
        .icon('thumbdown', 'fonts/icons/thumb-down.svg', 24)
        .icon('draw', 'fonts/icons/cards-outline.svg', 24)
        .icon('claim', 'fonts/icons/star-circle.svg', 24)
        .icon('close', 'fonts/icons/close.svg', 24);
});