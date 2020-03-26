/**
 * coon.js
 * lib-cn_user
 * Copyright (C) 2020 Thorsten Suckow-Homberg https://github.com/coon-js/lib-cn_user
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


const harness = new Siesta.Harness.Browser.ExtJS();

let isModern = window.location.href.indexOf("toolkit=modern") !== -1;

harness.configure({
    title          : "lib-cn_user - " + (isModern ? "modern" : "classic"),
    disableCaching : true,
    loaderPath     : {
        /**
         * Universal
         */
        "coon.user" : "../src",
        "coon.comp.window.LockingWindow" : "../../lib-cn_comp/src/window/LockingWindow.js",
        "coon.comp.Img"                   : (isModern
            ? "../../lib-cn_comp/modern/src/Img.js"
            : "../../lib-cn_comp/classic/src/Img.js"),
        "coon.comp.form.AutoCompleteForm" : (isModern
            ? "../../lib-cn_comp/modern/src/form/AutoCompleteForm.js"
            : "../../lib-cn_comp/classic/src/form/AutoCompleteForm.js"),
        "coon.user.view.toolbar.UserImageItem" : "../src/view/toolbar/UserImageItem.js",

        "coon.user.view.authentication.AuthWindow" : "../src/view/authentication/AuthWindow.js",

        "coon.user.view.authentication.AuthForm" : (isModern
            ? "../modern/src/view/authentication/AuthForm.js"
            : "../classic/src/view/authentication/AuthForm.js"),

        /**
         * Classic
         */
        "coon.user.view" : "../classic/src/view",

        /**
         * Requirements
         */
        "coon.core.data"   : "../../lib-cn_core/src/data",
        "coon.comp.form"   : "../../lib-cn_comp/classic/src/form",
        "coon.core.app"    : "../../lib-cn_core/src/app"
    },
    preload        : [
        coon.tests.config.paths.extjs[isModern ? "modern" : "classic" ].css.url,
        coon.tests.config.paths.extjs[isModern ? "modern" : "classic" ].js.url
    ]
});

let groups = [];

// +--------------------------------
// | Classic Tests
// +--------------------------------
if (!isModern) {
    groups.push({
        group : "classic",
        items : [{
            group : "view",
            items : [{
                group : "authentication",
                items : [
                    "classic/src/view/authentication/AuthFormTest.js"
                ]
            }]
        }]
    });
}

// +--------------------------------
// | Modern Tests
// +--------------------------------
if (isModern) {
    groups.push({
        group : "modern",
        items : [{
            group : "view",
            items : [{
                group : "authentication",
                items : [
                    "modern/src/view/authentication/AuthFormTest.js"
                ]
            }]
        }]
    });
}


// +--------------------------------
// | Universal Tests
// +--------------------------------
groups.push({
    group : "universal",
    items : [
        "src/DefaultUserProviderTest.js",
        "src/ManagerTest.js",
        "src/UserProviderTest.js",
        "src/UtilTest.js",
        {
            group : "app",
            items : [
                "src/app/PackageControllerTest.js"
            ]
        },
        {
            group : "data",
            items : [{
                group : "user",
                items : [
                    "src/data/user/BaseSchemaTest.js"
                ]
            }]
        }, {
            group : "model",
            items : [
                "src/model/UserModelTest.js"
            ]
        }, {
            group : "view",
            items : [{
                group : "toolbar",
                items : ["src/view/toolbar/UserImageItemTest.js"]
            }, {
                group : "authentication",
                items : [
                    "src/view/authentication/AuthWindowTest.js"
                ]
            }]
        }
    ]
});

harness.start(groups);
