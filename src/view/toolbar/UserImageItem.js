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

/**
 * Implementation of Ext.Img to show a user icon.
 * This class is used by the PackageController of lib-cn_user where it gets
 * added to the permaNav in the postLaunchHook-process.
 */
Ext.define('coon.user.view.toolbar.UserImageItem', {

    extend : 'coon.comp.Img',

    alias : 'widget.cn_user-toolbaruserimageitem',

    cls : 'cn_user-toolbaruserimageitem',


    /**
     * @inheritdoc
     * overriden to adjust Glyph Font Family depending on ExtJS Version.
     *
     */
    constructor : function() {

        const
            me = this,
            v = Ext.getVersion().major;

        me.callParent(arguments);

        // ExtJS 7 uses "Font Awesome 5 Free" as the glyph Font Family.
        me.setGlyph("xf007@\'" + (v >= 7 ? "Font Awesome 5 Free" : "FontAwesome") + "\'");

    }



});