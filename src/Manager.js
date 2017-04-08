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
 * Class for managing an application user.
 * This is a singleton class which can be configured by providing custom
 * implementations of {@link conjoon.cn_user.UserProvider}. It till be used
 * throughout the app-cn_user package to manage a single application user.
 * Note: This class' intention is not to manage a list of user. It's use case is
 * to solely provide tools to manage a user who is using the application.
 *
 *      @example
 *      conjoon.cn_user.Manager.setUserProvider(
 *          Ext.create('conjoon.cn_user.DefaultUserProvider')
 *      );
 *
 *      var user = conjoon.cn_user.Manager.getUser();
 *
 *      if (!user) {
 *          // your load config goes here, depending
 *          // on the information your UserProvider.loadUser
 *          // method requires
 *          var options = {
 *              params : {
 *                  userid   : 'dgardner',
 *                  password : '********'
 *              },
 *              success : function(userModel) {
 *                  console.log("User was successfully loaded");
 *              },
 *              failure : function(options) {
 *                  console.log("User failed to load");
 *              },
 *              scope : this
 *          };
 *          conjoon.cn_user.Manager.loadUser(options);
 *      }
 *
 */
Ext.define('conjoon.cn_user.Manager', {

    singleton : true,

    requires : [
        'conjoon.cn_user.DefaultUserProvider'
    ],

    /**
     *
     * @cfg {Object/String} [providerConfig="conjoon.cn_user.DefaultUserProvider]
     * The classname of the provider to use, or an Object containing configuration
     * information for the {@link conjoon.cn_user.UserProvider}. The object needs
     * at least the property "className" holding the fqn of the provider class
     * to use.
     * The class which is used as the UserProvider needs to be loaded before
     * it is used with the Manager.
     */
    providerConfig : 'conjoon.cn_user.DefaultUserProvider',

    /**
     * @type {conjoon.cn_user.UserProvider} userProvider
     * @private
     */
    userProvider : null,

    /**
     * Loads a user based on the information specified in options.params.
     * Additionally, success- and failure-callbacks can be specified which
     * get called as soon as the user was loaded, or if loading the user failed.
     * See {@link conjoon.cn_user.UserProvider#cn_user-userload} and
     * {@link conjoon.cn_user.UserProvider#cn_user-userloadfailure}
     *
     * @param {Object} options
     * @param {Object} options.params An object which will get passes to the
     * {@link conjoon.cn_user.UserProvider#loadUser}-method
     * @param {Function} options.success The callback for the successfull load
     * of the user
     * @param {Function} options.failure The callback for a failed load attempt
     * of the user
     * @param {Object/null} options.scope The scope in which the failure/success
     * callbacks are to load
     *
     * @throws error if loading the user was triggered during an already existing
     * load operation; see {@link conjoon.cn_user.UserProvider#isUserLoading},
     * or if success- or callback-properties are specified, but not valid functions.
     */
    loadUser : function(options) {

        var me       = this,
            provider = me.getUserProvider(),
            cfg      = {},
            cbOptions;

        if (provider.isUserLoading()) {
            Ext.raise({
                sourceClass : Ext.getClassName(me),
                // set this to true in any case to prevent
                // misbehavior due to async race conditions
                isLoading : true,
                msg : Ext.getClassName(me) + "#userProvider is already loading an user."
            });
        }

        cfg = options ? options.params || {} : {};

        cbOptions = Ext.apply({
            scope   : null,
            success : Ext.emptyFn,
            failure : Ext.emptyFn
        }, options || {});

        if ((cbOptions.success && !Ext.isFunction(cbOptions.success)) ||
            (cbOptions.failure && !Ext.isFunction(cbOptions.failure))) {
            Ext.raise({
                sourceClass : Ext.getClassName(me),
                success     : cbOptions.success,
                failure     : cbOptions.failure,
                msg         : Ext.getClassName(me) + "#loadUser expects success and failure to be valid callback functions."
            });

        }

        me.callbackOptions = cbOptions;

        provider.on(
            'cn_user-userload',
            me.onUserProviderLoad,
            me
        );

        provider.on(
            'cn_user-userloadfailure',
            me.onUserProviderLoadFailure,
            me
        );

        provider.loadUser(cfg);
    },

    /**
     * Returns the user managed by the configured {@link #userProvider}.
     * See {@link conjoon.cn_user.UserProvider#getUser}.
     * Implementing APIs should be advised that loading a user via {@link #loadUser}
     * might be necessary, or otherwise this method will always return null.
     * If no UserProvider was configured for the UserManager yet, the method
     * {@link #getUserProvider} will take care of creating the provider by utilizing
     * the information found in  {@link #userProviderConfig}.
     *
     *
     * @returns {conjoon.cn_user.model.UserModel|null}
     */
    getUser : function() {
        return this.getUserProvider().getUser();
    },

    /**
     * Returns the UerProvider used by the Manager. If {@link #userProvider}
     * is not configured, {@link #setUserProvider} will be called with the
     * default {@link #providerConfig} as found in this class to create one.
     *
     * @returns {conjoon.cn_user.UserProvider}
     *
     * see {@link #setUserProvider}
     */
    getUserProvider : function() {

        if (!this.userProvider) {
            this.userProvider = this.setUserProvider(this.providerConfig);
        }

        return this.userProvider;
    },

    /**
     * Sets the {@link #userProvider} to an instance represented by the passed argument.
     * The argument can either be a class name, an instance or a configuration
     * object with a "cnclass"-property and additional instance configuration.
     * In any case, the argument must represent an existing instance of {@link conjoon.cn_user.UserProvider}.
     *
     *      @example
     *      conjoon.cn_user.Manager.setUserProvider(
     *          Ext.create('conjoon.cn_user.DefaultUserProvider')
     *      );
     *      // or
     *      conjoon.cn_user.Manager.setUserProvider(
     *          'conjoon.cn_user.DefaultUserProvider'
     *      );
     *      // or
     *      conjoon.cn_user.Manager.setUserProvider({
     *          cnclass   : 'conjoon.cn_user.DefaultUserProvider',
     *          cfgOption : 'foo'
     *      });
     *
     * @param {conjoon.cn_user.UserProvider/Object/String} providerConfig
     *
     * see {@link #initUserProvider}
     */
    setUserProvider : function(providerConfig) {

        if (this.userProvider) {
            this.removeUserProviderListeners(this.userProvider);
        }
        this.userProvider = this.initUserProvider(providerConfig);

        return this.userProvider;
    },

    privates : {

        /**
         * @type {Object}  callbackOptions
         * @param private
         */
        callbackOptions : null,

        /**
         * Removes any listeners attached to the {@link #userProvider} by this Manager.
         * Nullifies {@link #callbackOptions}, too.
         *
         * @param {conjoon.cn_user.UserProvider}
         *
         * @private
         */
        removeUserProviderListeners : function(userProvider) {

            var me = this;

            me.callbackOptions = null;

            userProvider.un(
                'cn_user-userload',
                me.onUserProviderLoad,
                me
            );

            userProvider.un(
                'cn_user-userloadfailure',
                me.onUserProviderLoadFailure,
                me
            );

        },

        /**
         * Default callback for the {@link #userProvider}s
         * {@link conjoon.cn_user.UserProvider#cn_user-userload} event.
         *
         * @param {conjoon.cn_user.UserProvider} provider
         * @param {conjoon.cn_user.model.UserModel} userModel
         *
         * @private
         */
        onUserProviderLoad : function(provider, userModel) {

            var me              = this,
                callbackOptions = me.callbackOptions;

            if (callbackOptions && callbackOptions.success) {
                callbackOptions.success.apply(callbackOptions.scope, [userModel]);
            }

            me.removeUserProviderListeners(provider);
        },

        /**
         * Default callback for the {@link #userProvider}s
         * {@link conjoon.cn_user.UserProvider#cn_user-userloadfailure} event.
         *
         * @param {conjoon.cn_user.UserProvider} provider
         * @param {Object} options
         *
         * @private
         */
        onUserProviderLoadFailure : function(provider, options) {

            var me              = this,
                callbackOptions = me.callbackOptions;

            if (callbackOptions && callbackOptions.failure) {
                callbackOptions.failure.apply(callbackOptions.scope, [options]);
            }

            me.removeUserProviderListeners(provider);
        },

        /**
         * Initializes the UserProvider-instance to be used by this Manager.
         *
         * @param {conjoon.cn_user.UserProvider/Object/String} providerConfig
         *
         * @return {conjoon.cn_user.UserProvider}
         * @private
         *
         * @throws error if the className computed by using the providerConfig argument
         * failed to load, or if the class was not already loaded.
         */
        initUserProvider : function(providerConfig) {

            if (providerConfig instanceof conjoon.cn_user.UserProvider) {
                return providerConfig;
            }

            var me        = this,
                className = Ext.isString(providerConfig)
                    ? providerConfig
                    : (Ext.isObject(providerConfig)
                    ? providerConfig.cnclass
                    : undefined),
                cfg = {},
                ret;

            if (!className) {
                Ext.raise({
                    sourceClass    : Ext.getClassName(this),
                    providerConfig : providerConfig,
                    msg            : Ext.getClassName(this) + " needs providerConfig to be configured as fqn or an object with a \"cnclass\"-property providing the fqn."
                });

            }

            if (!Ext.ClassManager.get(className)) {
                Ext.raise({
                    sourceClass : Ext.getClassName(this),
                    className   : className,
                    msg         : Ext.getClassName(this) + " requires the class specified with providerConfig-argument to be loaded."
                });
            }


            if (Ext.isObject(providerConfig)) {
                cfg = providerConfig;
                delete cfg.className;
            }

            ret = Ext.create(className, cfg);

            if (!(ret instanceof conjoon.cn_user.UserProvider)) {
                Ext.raise({
                    sourceClass   : Ext.getClassName(this),
                    providerClass : ret,
                    msg           : Ext.getClassName(this) + " providerConfig to represent an instance of conjoon.cn_user.UserProvider."
                });
            }

            return ret;

        }


    }




});
