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
 * Default impementation for a {@link coon.user.UserProvider}.
 * The user loaded into this instance by {@link #loadUser} is an instance
 * of {@link coon.user.model.UserModel} with the id 999999.
 * This class serves mainly for testing purposes and as an example for an
 * implementation of an UserProvider-class.
 *
 *      @example
 *      var provider = Ext.create('coon.user.DefaultUserProvider', {
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
Ext.define('coon.user.DefaultUserProvider', {

    extend : 'coon.user.UserProvider',

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

        this.user = Ext.create('coon.user.model.UserModel', {
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
