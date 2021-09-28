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
 * Utility functions for operations in the cn_user-realm.
 *
 *   @example
 *      let cred = coon.user.Util.userToCredentials(
 *          Ext.create('coon.user.model.UserModel', {
 *              username : 'demo',
 *              password : 'password'
 *          }), coon.user.Util.BASIC_AUTH
 *      );
 *
 */
Ext.define("coon.user.Util", {


    requires: [
        "coon.user.model.UserModel"
    ],

    singleton: true,

    /**
     * @static
     */
    BASIC_AUTH: 1,

    /**
     * Returns a base64 encoded string containign username/password for the use with
     * Basic Authorization headers with Http-Requests.
     *
     *  @example
     *   let cred = coon.user.Util.userToCredentials(
     *          Ext.create('coon.user.model.UserModel', {
     *              username : 'demo',
     *              password : 'password'
     *          }), coon.user.Util.BASIC_AUTH
     *      );
     *
     *  Ext.Ajax.request({
     *      url : './foobar',
     *      headers : {
     *          Authorization : "Basic " + cred
     *      }
     *  });
     *
     * @param {coon.user.model.UserModel} The UserModel containing the data to be used for
     * the credentials
     * @param {String} format The format to use for the credentials
     *
     * @returns {String}
     *
     * @throws if userModel is not an instance of {coon.user.model.UserModel} or if no valid
     * format was specified
     */
    userToCredentials: function (userModel, format) {

        const me = this;

        if (!(userModel instanceof coon.user.model.UserModel)) {
            Ext.raise({
                msg: "\"userModel\" must be an instance of coon.user.model.UserModel",
                userModel: userModel
            });
        }

        switch (format) {
        case me.BASIC_AUTH:
            return btoa(userModel.get("username") + ":"  + userModel.get("password"));

        default:
            Ext.raise({
                msg: "no valid value for \"format\" specified",
                format: format
            });
        }

    }


});