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
 * Authentication form for showing input fields for gathering authentication
 * information for a user who wishes to authorize himself against some kind of
 * service.
 *
 * Once all necessary information has been gathered, this form triggers the
 * {@link conjoon.cn_user.view.authentication.AuthForm#cn_user-authrequest} event
 * providing the specified userid and password.
 *
 *      @example
 *      Ext.create('conjoon.cn_user.view.authentication.AuthForm', {
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
Ext.define('conjoon.cn_user.view.authentication.AuthForm', {

    extend: 'conjoon.cn_comp.form.AutoCompleteForm',

    alias: 'widget.cn_user-authform',

    /**
     * @event cn_user-authrequest
     * Fires when the loginButton is clicked.
     * @param {conjoon.cn_user.view.authentication.AuthForm} this
     * @param {Object} authinfo An object containing user credential information
     * @param {String} authinfo.userid The userid that was specified
     * @param {String} authinfo.password The password submitted
     */

    formName : 'authForm',

    autoCompleteTrigger : {
        reference : 'loginButton'
    },

    defaultButton : 'loginButton',

    bodyPadding : '20 20',

    cls : 'cn_user-authform',

    header : false,

    width : 415,

    loginButtonIconCls : 'x-fa fa-angle-right',

    loginButtonIconClsBusy : 'x-fa fa-spinner fa-spin',

    layout : {
        type: 'vbox',
        align: 'stretch'
    },

    defaults : {
        margin : '5 0'
    },

    items: [{
        xtype : 'label',
        /**
         * @i18n_text
         */
        text  : 'Sign in'
    }, {
        xtype       : 'textfield',
        name        : 'userid',
        allowBlank  : false,
        /**
         * @i18n_text
         */
        emptyText   : 'user id'
    }, {
        xtype       : 'textfield',
        /**
         * @i18n_text
         */
        emptyText   : 'password',
        inputType   : 'password',
        name        : 'password',
        allowBlank  : false
    }, {
        xtype      : 'button',
        reference  : 'loginButton',
        /**
         * @i18n_text
         */
        text       : 'Login',
        formBind   : true,
        handler    : function(btn) {
            var me        = this,
                formPanel = me.up('cn_user-authform'),
                userid    = formPanel.down('textfield[name=userid]').getValue(),
                password  = formPanel.down('textfield[name=password]').getValue();


            formPanel.showAuthorizationFailed(false);

            formPanel.fireEvent('cn_user-authrequest', formPanel, {
                userid   : userid,
                password : password
            });
        }
    }, {
        xtype     : 'label',
        hidden    : true,
        reference : 'authFailedLabel',
        /**
         * @i18n_text
         */
        text : 'Authorization failed. Please try again.'
    }],


    /**
     * @inheritdoc
     */
    initComponent : function() {

        var me = this;

        for (var i = 0, len = me.items.length; i < len; i++) {
            if (me.items[i].reference === 'loginButton') {
                me.items[i].iconCls = me.loginButtonIconCls;
            }
        }

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
    showAuthorizationBusy : function(show) {

        var me            = this,
            useridField   = me.down("textfield[name=userid]"),
            passwordField = me.down("textfield[name=password]"),
            loginButton   = me.lookupReference('loginButton');

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
    showAuthorizationFailed : function(show) {

        var me    = this,
            label = me.lookupReference('authFailedLabel');

        label.setVisible(show);

        return this;
    }


});
