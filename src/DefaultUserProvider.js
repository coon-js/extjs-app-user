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
 * Default impementation for a {@link conjoon.cn_user.UserProvider}.
 * The user loaded into this instance by {@link #loadUser} is an instance
 * of {@link conjoon.cn_user.model.UserModel} with the id 999999.
 * This class serves mainly for testing purposes and as an example for an
 * implementation of an UserProvider-class.
 *
 *      @example
 *      var provider = Ext.create('conjoon.cn_user.DefaultUserProvider', {
 *
 *          listeners : {
 *              'cn_user-userload' : function(provider, userModel) {
 *                  console.log("Loaded the user. You can now call getUser() to retrieve the UserModel");
 *              }
 *          }
 *
 *      ));
 *
 *      if (!provider.getUser()) {
 *          provider.loadUser();
 *      }
 *
 */
Ext.define('conjoon.cn_user.DefaultUserProvider', {

    extend : 'conjoon.cn_user.UserProvider',

    isLoading : false,

    /**
     * @inheritdoc
     *
     * @param {Object}  options
     * @param {Boolean} options.forceFail true to trigger the {@link #cn_user-userloadfailure}-event
     *
     */
    loadUser : function(options) {

        this.isLoading = true;

        if (options && options.forceFail) {
            this.user = null;
            this.fireEvent('cn_user-userloadfailure', this, options);
            this.isLoading = false;
            return;
        }

        this.user = Ext.create('conjoon.cn_user.model.UserModel', {
            id           : 999999,
            firstname    : 'David',
            lastname     : 'Gardner',
            username     : 'dgardner',
            emailAddress : 'david.gardner@menzies-elementary-school.edu'
        });
        this.fireEvent('cn_user-userload', this, this.user);
        this.isLoading = false;

    },

    isUserLoading : function() {
        return this.isLoading;
    }

});
