var harness = new Siesta.Harness.Browser.ExtJS();

harness.configure({
    title          : 'app-cn_user',
    disableCaching : true,
    loaderPath     : {
        /**
         * Universal
         */
        'coon.user' : '../src',

        /**
         * Classic
         */
        'coon.user.view' : '../classic/src/view',

        /**
         * Requirements
         */
        'coon.core.data'   : '../../lib-cn_core/src/data',
        'coon.comp.form'   : '../../lib-cn_comp/classic/src/form',
        'coon.comp.window' : '../../lib-cn_comp/classic/src/window',
        'coon.core.app'    : '../../lib-cn_core/src/app'
    },
    preload        : [
        coon.tests.config.paths.extjs.css.url,
        coon.tests.config.paths.extjs.js.url
    ]
});

harness.start({
    group : 'classic',
    items : [{
        group : 'view',
        items : [{
            group : 'authentication',
            items : [
                'classic/src/view/authentication/AuthFormTest.js',
                'classic/src/view/authentication/AuthWindowTest.js'
            ]
        }, {
            group : 'toolbar',
            items : [
                'classic/src/view/toolbar/UserImageItemTest.js'
            ]
        }]
    }]
}, {
    group : 'universal',
    items : [
        'src/DefaultUserProviderTest.js',
        'src/ManagerTest.js',
        'src/UserProviderTest.js',
        {
            group : 'app',
            items : [
                'src/app/PackageControllerTest.js'
            ]
        },
        {
            group : 'data',
            items : [{
                group : 'user',
                items : [
                    'src/data/user/BaseSchemaTest.js'
                ]
            }]
        }, {
            group : 'model',
            items : [
                'src/model/UserModelTest.js'
            ]
        }
    ]
});
