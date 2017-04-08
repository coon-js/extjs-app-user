/**
 * conjoon
 * (c) 2007-2016 conjoon.org
 * licensing@conjoon.org
 *
 * app-cn_user
 * Copyright (C) 2016 Thorsten Suckow-Homberg/conjoon.org
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * This is the package controller of the app-cn_user package to be used with
 * {@link conjoon.cn_comp.app.Application}.
 *
 * This controller will hook into the launch-process of {@link conjoon.cn_comp.app.Application#launch},
 * check if a user is available via {@link conjoon.cn_user.Manager#getUser} and
 * show {@link conjoon.cn_user.view.authentication.AuthWindow} to provide
 * an authentication form. The {@link #preLaunchHook} method will return false until
 * a user is available via {@link conjoon.cn_user.Manager}.
 *
 *      @example
 *      Ext.define('conjoon.Application', {
 *
 *          extend : 'conjoon.cn_comp.app.Application',
 *
 *          mainView : 'Ext.Panel',
 *
 *          controllers : [
 *              'conjoon.cn_user.controller.PackageController'
 *          ]
 *
 *      });
 *
 */
Ext.define('conjoon.cn_user.controller.PackageController', {

    extend : 'conjoon.cn_core.app.PackageController',

    requires : [
        'conjoon.cn_user.Manager',
        'conjoon.cn_user.view.authentication.AuthWindow'
    ],

    /**
     * Stores a reference to an active {@link conjoon.cn_user.view.authentication.AuthWindow}, if any.
     * @type {conjoon.cn_user.view.authentication.AuthWindow) authWindow
     * @private
     */
    authWindow : null,

    /**
     * Shows the {@link conjoon.cn_user.view.authentication.AuthWindow} if no
     * user is available via {@link conjoon.cn_user.Manager#getUser}, and returns
     * false. Returns true otherwise.
     *
     *@inheritdoc
     */
    preLaunchHook : function(app) {

        var me = this;

        if (!conjoon.cn_user.Manager.getUser()) {
            this.createAuthWindow();
            return false;
        }


        return true;
    },

    /**
     * @inheritdoc
     */
    postLaunchHook : function() {
        return {};
    },

    /**
     * Method to call when a user is loaded and available.
     * Closes the {@link #authWindow}, if any, and calls the launch-method
     * of {@link getAplication}.
     *
     * @param {conjoon.cn_user.model.UserModel} userModel
     *
     * @protected
     */
    userAvailable : Ext.emptyFn,

    /**
     * Method to call when a user could not be loaded.
     *
     * @param {Object} options The options that were passed as params to
     * {@link conjoon.cn_user.Manager#loadUser}
     *
     * @protected
     */
    userWasNotAuthorized : Ext.emptyFn,

    privates : {

        /**
         * Creates and shows the {@link conjoon.cn_user.view.authentication.AuthWindow}
         * and makes it available in {@link #authWindow}
         *
         * @return {conjoon.cn_user.view.authentication.AuthWindow}
         */
        createAuthWindow : function() {

            this.authWindow = Ext.create('conjoon.cn_user.view.authentication.AuthWindow', {
                listeners : {
                    destroy : function() {
                        this.authWindow = null;
                    },
                    'cn_user-authrequest' : this.onAuthRequest,
                    scope : this
                }
            });

            return this.authWindow;
        },

        /**
         * Callback for a successful attempt to load a user via {@link conjoon.cn_user.Manager#loadUser}
         *
         * @param {conjoon.cn_user.model.UserModel} userModel
         *
         * see {@link #userAvailable}
         */
        onUserLoadSuccess : function(userModel) {
            var me = this;

            this.authWindow.close();
            this.getApplication().launch();
            me.userAvailable(userModel);
        },

        /**
         * Callback for a failed attempt to load a user via {@link conjoon.cn_user.Manager#loadUser}
         *
         * @param {Object} options
         *
         * * see {@link #userWasNotAuthorized}
         */
        onUserLoadFailure : function(options) {
            var me = this;
            me.userWasNotAuthorized(options);
        },

        /**
         * Listener for the cn_user-authrequest-event triggered by the
         * {@link conjoon.cn_user.view.authentication.AuthForm} which is used
         * to log in a user.
         * Tries to load the application's user based on the userid and password
         * submitted via authInfo.
         * The callbacks for a successfull userload is {@link #onUserLoadSuccess},
         * for a failed attempt to load the user is {@link #onUserLoadFailure}.
         *
         * @param {conjoon.cn_user.view.authentication.AuthForm} authForm
         * @param {Object} authInfo
         *
         * see {@link conjoon.cn_user.Manager#loadUser}
         * see {@link #onUserLoadSuccess}
         * see {@link #onUserLoadFailure}
         */
        onAuthRequest : function(authForm, authInfo) {
            var me = this;

            conjoon.cn_user.Manager.loadUser({
                params  : authInfo,
                success : me.onUserLoadSuccess,
                failure : me.onUserLoadFailure,
                scope   : me
            });

        }

    }



});
