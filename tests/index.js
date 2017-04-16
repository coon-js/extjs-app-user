var harness = new Siesta.Harness.Browser.ExtJS();

harness.configure({
    title          : 'My Tests',
    disableCaching : true,
    loaderPath     : {
        /**
         * Universal
         */
        'conjoon.cn_user' : '../src',

        /**
         * Classic
         */
        'conjoon.cn_user.view' : '../classic/src/view',
        'conjoon.cn_user.controller' : '../classic/src/controller',

        /**
         * Requirements
         */
        'conjoon.cn_core.data'   : '../../lib-cn_core/src/data',
        'conjoon.cn_comp.form'   : '../../lib-cn_comp/classic/src/form',
        'conjoon.cn_comp.window' : '../../lib-cn_comp/classic/src/window',
        'conjoon.cn_core.app'    : '../../lib-cn_core/src/app'
    },
    preload        : [
        conjoon.tests.config.paths.extjs.css.url,
        conjoon.tests.config.paths.extjs.js.url
    ]
});

harness.start({
    group : 'classic',
    items : [{
        group : 'controller',
        items : [
            'classic/src/controller/PackageControllerTest.js'
        ]
    }, {
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
