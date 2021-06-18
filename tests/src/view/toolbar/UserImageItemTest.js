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

StartTest((t) => {

    var img;


    t.afterEach(function () {
        if (!img) {
            return;
        }
        img.destroy();
        img = null;
    });


    t.it("Should create and test the UserImageItem", (t) => {

        let tmpV = Ext.getVersion;

        Ext.getVersion = function () {
            return {
                major: 6
            };
        };


        img = Ext.create("coon.user.view.toolbar.UserImageItem");
        t.isInstanceOf(img, "coon.comp.Img");
        t.expect(img.alias).toContain("widget.cn_user-toolbaruserimageitem");

        t.expect(img.getGlyph().fontFamily).toBe("'FontAwesome'");


        Ext.getVersion = function () {
            return {
                major: 7
            };
        };


        img = Ext.create("coon.user.view.toolbar.UserImageItem");
        t.expect(img.getGlyph().fontFamily).toBe("'Font Awesome 5 Free'");

        Ext.getVersion = tmpV;
    });


});
