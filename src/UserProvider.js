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
 * Abstract base class for UserProvider-implementations.
 * For a default implementation, see {@link conjoon.cn_user.DefaultUserProvider}
 *
 * Implementing classes are advised to implement {@link #loadUser} in case {@link #getUser}
 * returns null. {@link #user} should be available by calling  {@link getUser}
 * as soon as the {@link #cn_user-userload}-event was triggered.
 */
Ext.define('conjoon.cn_user.UserProvider', {


    mixins : {
        observable : 'Ext.util.Observable'
    },

    /**
     * @event cn_user-userload
     * This event is triggered as soon as a user is available when calling
     * {@link loadUser}. Custom classes are advised to implement the functionality
     * accordingly.
     * @param {conjoon.cn_user.UserProvider} this
     * @param {conjoon.cn_user.model.UserModel} user The user that was loaded.
     */

    /**
     * @event cn_user-userloadfailure
     * This event is triggered when loading a user failed.
     * @param {conjoon.cn_user.UserProvider} this
     * @param {Object} options The options-object that was passed to the {@link #loadUser}
     * method.
     */

    /**
     * @type {conjoon.cn_user.model.UserModel} The current user model made
     * available by this provider.
     * @protected
     */
    user : null,

    /**
     * Creates a new instance of this USerProvider-class.
     * @param {Object} config
     */
    constructor : function(config) {

        var me = this;

        Ext.apply(me, config);

        me.mixins.observable.constructor.call(me);
    },

    /**
     * Method to load a user with this provider.
     * This method must trigger the {@link #cn_user-userload}-event as soon as the
     * user is available, or {@link #cn_user-userloadfailure}-event if loading the user failed.
     * If loading the user failed, the current {@link #user} will be unloaded,
     * setting the user-property to null.
     * Implementations are advised to set {@link #user} to the UserModel loaded
     * with this method.
     *
     * @param {Object} options An object with options which can be used as further
     * informations when the user should be loaded.
     *
     * @template
     *
     */
    loadUser : Ext.emptyFn,

    /**
     * Returns true if there is currently a user-load operation ongoing,
     * otherwise false. The method must return "false" as long until either
     * the {@link #cn_user-userload} or {@link cn_user-userloadfailure} have
     * been fired.
     *
     * @return {Boolean}
     *
     * @template
     */
    isUserLoading : Ext.emptyFn,

    /**
     * Returns the current user loaded with this provider, if any.
     *
     * @return {conjoon.cn_user.model.UserModel/null}
     *
     * see {@link #user}
     */
    getUser : function() {
        return this.user;
    }

});
