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
 * Authentication form for showing input fields for gathering authentication
 * information for a user who wishes to authorize himself against some kind of
 * service.
 *
 * Once all necessary information has been gathered, this form triggers the
 * {@link coon.user.view.authentication.AuthForm#cn_user-authrequest} event
 * providing the specified userid and password.
 *
 *      @example
 *      Ext.create('coon.user.view.authentication.AuthForm', {
 *
 *          listeners : {
 *              'cn_user-authrequest' : function(authForm, authInfo) {
 *
 *                  console.log(
 *                      "The following info was submitted: ",
 *                      authInfo.userid, authInfo.password
 *                  );
 *
 *              }
 *          }
 *
 *      });
 *
 */
Ext.define("coon.user.view.authentication.AuthForm", {

    extend: "coon.comp.form.AutoCompleteForm",

    alias: "widget.cn_user-authform",

    /**
     * @event cn_user-authrequest
     * Fires when the loginButton is clicked.
     * @param {coon.user.view.authentication.AuthForm} this
     * @param {Object} authinfo An object containing user credential information
     * @param {String} authinfo.userid The userid that was specified
     * @param {String} authinfo.password The password submitted
     */

    formName : "authForm",

    autoCompleteTrigger : {
        reference : "loginButton"
    },

    bodyPadding : "20 20",

    cls : "cn_user-authform",

    header : false,

    width : 415,

    loginButtonIconCls : "x-fa fa-angle-right",

    loginButtonIconClsBusy : "x-fa fa-spinner fa-spin",

    layout : {
        type: "vbox",
        align: "stretch"
    },

    defaults : {
        margin : "5 0"
    },

    // this form defines a ViewModel
    // to automatically keep track of userfield/passwordfield
    // and whether the login-button should be rendered as
    // enabled/disabled
    viewModel : true,

    items: [{
        xtype : "label",
        cls   : "head-label",
        /**
         * @i18n_text
         */
        text  : "Sign in"
    }, {
        xtype       : "textfield",
        name        : "userid",
        required    : true,
        reference   : "cn_user_useridField",
        /**
         * @i18n_text
         */
        placeholder : "user id"
    }, {
        margin      : "24 0 0 0",
        xtype       : "textfield",
        reference   : "cn_user_passwordField",
        /**
         * @i18n_text
         */
        placeholder : "password",
        inputType   : "password",
        name        : "password",
        required    : true
    }, {
        margin      : "24 0 0 0",
        xtype      : "button",
        reference  : "loginButton",
        disabled   : true,
        bind       : {
            disabled : "{!cn_user_useridField.value || !cn_user_passwordField.value}"
        },
        /**
         * @i18n_text
         */
        text       : "Login"
    }, {
        xtype     : "displayfield",
        hidden    : true,
        reference : "authFailedLabel",
        /**
         * @i18n_text
         */
        value : "Authorization failed. Please try again."
    }],


    /**
     * @inheritdoc
     */
    initialize : function () {

        const me     = this,
            keyMap = {};

        for (var i = 0, len = me.items.length; i < len; i++) {
            let it = me.items.items[i];
            if (it.reference === "loginButton") {
                it.iconCls = me.loginButtonIconCls;
            }
        }

        // install listeners for the loginbutton and ENTER-Key for textfields
        me.down("button[reference=loginButton]").on("tap", me.requestSubmit, me);

        keyMap[Ext.event.Event.ENTER] = {fn : me.requestSubmit, scope : me};
        me.down("textfield[reference=cn_user_useridField]").setKeyMap(keyMap);
        me.down("textfield[reference=cn_user_passwordField]").setKeyMap(keyMap);

        me.callParent(arguments);
    },


    /**
     * Visually indicates that the authorization process is busy, or hides
     * this indication based on the passed argument.
     * In this default implementation, "busy indicator" means disabled textfields
     * and a loading spinner icon for the loginButton.
     *
     * @param {Boolean} show true to show the notification message, otherwise false
     *
     * @return this
     */
    showAuthorizationBusy : function (show) {

        var me            = this,
            useridField   = me.down("textfield[name=userid]"),
            passwordField = me.down("textfield[name=password]"),
            loginButton   = me.lookupReference("loginButton");

        if (show) {
            loginButton.setIconCls(me.loginButtonIconClsBusy);
            loginButton.setDisabled(true);
            useridField.setDisabled(true);
            passwordField.setDisabled(true);
        } else {
            loginButton.setIconCls(me.loginButtonIconCls);
            useridField.setDisabled(false);
            passwordField.setDisabled(false);
            loginButton.setDisabled(false);
        }

        return this;
    },


    /**
     * Visually indicates that the authorization process failed, or hides
     * this indication based on the passed argument.
     * In this default implementation, the indicator is a simple label that#s
     * shown underneath the form.
     *
     * @param {Boolean} show true to show the notification message, otherwise false
     *
     * @return this
     */
    showAuthorizationFailed : function (show) {

        var me    = this,
            label = me.lookupReference("authFailedLabel");

        label.setHidden(!show);

        return this;
    },


    privates : {

        /**
         * Click / ENTER-Key handler for fields and login-button
         */
        requestSubmit : function () {

            const me        = this,
                userid    = me.down("textfield[name=userid]").getValue(),
                password  = me.down("textfield[name=password]").getValue();


            me.showAuthorizationFailed(false);

            me.fireEvent("cn_user-authrequest", me, {
                userid   : userid,
                password : password
            });
        }

    }


});
