/**
 * coon.js
 * extjs-app-user
 * Copyright (C) 2017-2021 Thorsten Suckow-Homberg https://github.com/coon-js/extjs-app-user
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

export default [{
    group: "universal",
    items: [
        "src/DefaultUserProviderTest.js",
        "src/ManagerTest.js",
        "src/UserProviderTest.js",
        "src/UtilTest.js",
        {
            group: "app",
            items: [
                "src/app/PackageControllerTest.js"
            ]
        },
        {
            group: "data",
            items: [{
                group: "user",
                items: [
                    "src/data/user/BaseSchemaTest.js"
                ]
            }]
        }, {
            group: "model",
            items: [
                "src/model/UserModelTest.js"
            ]
        }, {
            group: "view",
            items: [{
                group: "toolbar",
                items: ["src/view/toolbar/UserImageItemTest.js"]
            }, {
                group: "authentication",
                items: [
                    "src/view/authentication/AuthWindowTest.js"
                ]
            }]
        }
    ]
}, {
    group: "classic",
    items: [{
        group: "view",
        items: [{
            group: "authentication",
            items: [
                "classic/src/view/authentication/AuthFormTest.js"
            ]
        }]
    }]
}, {
    group: "modern",
    items: [{
        group: "view",
        items: [{
            group: "authentication",
            items: [
                "modern/src/view/authentication/AuthFormTest.js"
            ]
        }]
    }]
}];
