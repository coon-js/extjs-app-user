/**
 * coon.js
 * extjs-app-user
 * Copyright (C) 2017 - 2020 Thorsten Suckow-Homberg https://github.com/coon-js/extjs-app-user
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
 * This is the package controller of the extjs-app-user package to be used with
 * {@link coon.comp.app.Application}.
 *
 * This controller will hook into the launch-process of {@link coon.comp.app.Application#launch},
 * check if a user is available via {@link coon.user.Manager#getUser} and
 * show {@link coon.user.view.authentication.AuthWindow} to provide
 * an authentication form. The {@link #preLaunchHook} method will return false until
 * a user is available via {@link coon.user.Manager}.
 *
 *      @example
 *      Ext.define('coon.Application', {
 *
 *          extend : 'coon.comp.app.Application',
 *
 *          mainView : 'Ext.Panel',
 *
 *          // If specifying the PackageController in the requires-property of the app.json of the
 *          // application which uses this package, you can omit the this.
 *          controllers : [
 *              'coon.user.app.PackageController'
 *          ]
 *
 *      });
 *
 *
 */
Ext.define("coon.user.app.PackageController", {

    extend: "coon.core.app.PackageController",

    requires: [
        "coon.user.Manager",
        "coon.user.model.UserModel",
        "coon.user.view.authentication.AuthWindow",
        "coon.user.view.toolbar.UserImageItem"
    ],


    /**
     * Stores a reference to an active {@link coon.user.view.authentication.AuthWindow}, if any.
     * @type {coon.user.view.authentication.AuthWindow) authWindow
     * @private
     */
    authWindow: null,

    /**
     * Shows the {@link coon.user.view.authentication.AuthWindow} if no
     * user is available via {@link coon.user.Manager#getUser}, and returns
     * false. Returns true otherwise.
     *
     *@inheritdoc
     */
    preLaunchHook: function (app) {

        if (!coon.user.Manager.getUser()) {
            this.createAuthWindow();
            return false;
        }


        return true;
    },

    /**
     * Returns permaNav items, including the name of the currently signed in user.
     * The permaNav will have an "index" applied to signal the interest for being aligned
     * at the very right side of the toolbar.
     *
     * @return {Object}
     *
     * @throws if the UserManager is currently not managing a user.
     *
     * @see coon.user.Manager#getUser
     */
    postLaunchHook: function () {

        var user = coon.user.Manager.getUser();

        if (!user) {
            Ext.raise({
                source: Ext.getClassName(this),
                msg: Ext.getClassName(this) + "#postLaunchHook requires a valid user"
            });
        }

        return {
            permaNav: {
                index: 1000,
                items: [{
                    xtype: "tbtext",
                    text: user.get("username")
                }, {
                    xtype: "cn_user-toolbaruserimageitem"
                }]
            }
        };
    },


    /**
     * Method to call when a user is loaded and available.
     * Closes the {@link #authWindow}, if any, and calls the launch-method
     * of {@link getAplication}.
     *
     * @param {coon.user.model.UserModel} userModel
     *
     * @protected
     *
     * @throws if user Model is not an instance of {@link onjoon.cn_user.model.UserModel}
     */
    userAvailable: function (userModel) {
        var me = this;

        if (!(userModel instanceof coon.user.model.UserModel)) {
            Ext.raise({
                source: Ext.getClassName(me),
                msg: "Method needs userModel to be instance of coon.user.model.UserModel"
            });
        }

        if (me.authWindow) {
            me.authWindow.close();
        }

        me.getApplication().launch();
    },

    /**
     * Method to call when a user could not be loaded.
     *
     * @param {Object} options The options that were passed as params to
     * {@link coon.user.Manager#loadUser}
     *
     * @protected
     */
    userWasNotAuthorized: Ext.emptyFn,

    privates: {

        /**
         * Creates and shows the {@link coon.user.view.authentication.AuthWindow}
         * and makes it available in {@link #authWindow}
         *
         * @return {coon.user.view.authentication.AuthWindow}
         */
        createAuthWindow: function () {

            this.authWindow = Ext.create("coon.user.view.authentication.AuthWindow", {
                listeners: {
                    destroy: function () {
                        this.authWindow = null;
                    },
                    "cn_user-authrequest": this.onAuthRequest,
                    scope: this
                }
            });

            return this.authWindow;
        },

        /**
         * Callback for a successful attempt to load a user via {@link coon.user.Manager#loadUser}
         *
         * @param {coon.user.model.UserModel} userModel
         *
         * see {@link #userAvailable}
         */
        onUserLoadSuccess: function (userModel) {
            const me = this,
                authWindow = me.authWindow;

            if (authWindow) {
                authWindow.down("cn_user-authform").showAuthorizationBusy(false);
            }
            me.userAvailable(userModel);
        },

        /**
         * Callback for a failed attempt to load a user via {@link coon.user.Manager#loadUser}
         *
         * @param {Object} options
         *
         * see {@link #userWasNotAuthorized}
         */
        onUserLoadFailure: function (options) {
            const me = this,
                authWindow = me.authWindow;

            if (authWindow) {
                authWindow.down("cn_user-authform").showAuthorizationBusy(false);
            }
            me.userWasNotAuthorized(options);
        },

        /**
         * Listener for the cn_user-authrequest-event triggered by the
         * {@link coon.user.view.authentication.AuthForm} which is used
         * to log in a user.
         * Tries to load the application's user based on the userid and password
         * submitted via authInfo.
         * The callbacks for a successfull userload is {@link #onUserLoadSuccess},
         * for a failed attempt to load the user is {@link #onUserLoadFailure}.
         *
         * @param {coon.user.view.authentication.AuthForm} authForm
         * @param {Object} authInfo
         *
         * see {@link coon.user.Manager#loadUser}
         * see {@link #onUserLoadSuccess}
         * see {@link #onUserLoadFailure}
         */
        onAuthRequest: function (authForm, authInfo) {
            var me = this;

            authForm.showAuthorizationBusy(true);

            coon.user.Manager.loadUser({
                params: authInfo,
                success: me.onUserLoadSuccess,
                failure: me.onUserLoadFailure,
                scope: me
            });
        }

    }


});
