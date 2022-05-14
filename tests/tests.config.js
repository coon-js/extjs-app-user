/**
 * coon.js
 * extjs-app-user
 * Copyright (C) 2017-2022 Thorsten Suckow-Homberg https://github.com/coon-js/extjs-app-user
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

/**
 *
 */
export default {

    name: "extjs-app-user",

    timeout: 750,

    loaderPath: {

        "coon.user": "../src",
        "coon.comp.window.LockingWindow": "../node_modules/@coon-js/extjs-lib-comp/src/window/LockingWindow.js",

        "coon.user.view.toolbar.UserImageItem": "../src/view/toolbar/UserImageItem.js",

        "coon.user.view.authentication.AuthWindow": "../src/view/authentication/AuthWindow.js",

        "coon.user.view": "../classic/src/view",

        "coon.core.data": "../node_modules/@coon-js/extjs-lib-core/src/data",
        "coon.comp.form": "../node_modules/@coon-js/extjs-lib-comp/classic/src/form",
        "coon.core.app": "../node_modules/@coon-js/extjs-lib-core/src/app",
        "coon.core.Environment": "../node_modules/@coon-js/extjs-lib-core/src/Environment.js",
        "coon.core.env": "../node_modules/@coon-js/extjs-lib-core/src/env",
        "coon.core.exception": "../node_modules/@coon-js/extjs-lib-core/src/exception",

        modern: {
            "coon.comp.Img": "../node_modules/@coon-js/extjs-lib-comp/modern/src/Img.js",
            "coon.comp.form.AutoCompleteForm": "../node_modules/@coon-js/extjs-lib-comp/modern/src/form/AutoCompleteForm.js",
            "coon.user.view.authentication.AuthForm": "../modern/src/view/authentication/AuthForm.js"
        },

        classic: {
            "coon.comp.Img": "../node_modules/@coon-js/extjs-lib-comp/classic/src/Img.js",
            "coon.comp.form.AutoCompleteForm": "../node_modules/@coon-js/extjs-lib-comp/classic/src/form/AutoCompleteForm.js",
            "coon.user.view.authentication.AuthForm": "../classic/src/view/authentication/AuthForm.js"
        }

    },
    preload: {
        js: "../node_modules/@l8js/l8/dist/l8.runtime.umd.js"
    }
};


