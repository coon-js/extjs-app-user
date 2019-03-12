/**
 * coon.js
 * lib-cn_user
 * Copyright (C) 2019 Thorsten Suckow-Homberg https://github.com/coon-js/lib-cn_user
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
 * Authentication LockingWindow to present a login form. The form used within
 * the window is an instance of {@link coon.user.view.authentication.AuthForm}.
 *
 *      @example
 *      Ext.create('coon.user.view.authentication.AuthWindow', {
 *
 *      });
 *
 */
Ext.define('coon.user.view.authentication.AuthWindow', {

    extend: 'coon.comp.window.LockingWindow',

    alias: 'widget.cn_user-authwindow',

    requires: [
        'coon.user.view.authentication.AuthForm'
    ],

    defaultFocus : 'cn_user-authform', // force focus on authform

    bodyCls: 'cn_user-authwindow',

    /**
     * @type {String}
     * @i18n_text
     */
    title : 'Log in',

    layout : {
        type  : 'vbox',
        align : 'center',
        pack  : 'center'
    },

    items : [{
        xtype : 'cn_user-authform'
    }],

    listeners : {
        afterrender : 'onWindowAfterRender'
    },

    privates : {

        /**
         * @private
         */
        onWindowAfterRender : function() {
            var me = this;

            // Relay events from the AuthForm
            me.relayEvents(me.down('cn_user-authform'), [
            /**
             * @event cn_user-authrequest
             * @inheritdoc coon.user.view.authentication.AuthForm#cn_user-authrequest
             */
                'cn_user-authrequest'
            ]);
        }
    }

});
