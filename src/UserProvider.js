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
 * Abstract base class for UserProvider-implementations.
 * For a default implementation, see {@link coon.user.DefaultUserProvider}
 *
 * Implementing classes are advised to implement {@link #loadUser} in case {@link #getUser}
 * returns null. {@link #user} should be available by calling  {@link getUser}
 * as soon as the {@link #cn_user-userload}-event was triggered.
 */
Ext.define('coon.user.UserProvider', {


    mixins : {
        observable : 'Ext.util.Observable'
    },

    /**
     * @event cn_user-userload
     * This event is triggered as soon as a user is available when calling
     * {@link loadUser}. Custom classes are advised to implement the functionality
     * accordingly.
     * @param {coon.user.UserProvider} this
     * @param {coon.user.model.UserModel} user The user that was loaded.
     */

    /**
     * @event cn_user-userloadfailure
     * This event is triggered when loading a user failed.
     * @param {coon.user.UserProvider} this
     * @param {Object} options The options-object that was passed to the {@link #loadUser}
     * method.
     */

    /**
     * @type {coon.user.model.UserModel} The current user model made
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
     * @return {coon.user.model.UserModel/null}
     *
     * see {@link #user}
     */
    getUser : function() {
        return this.user;
    }

});
