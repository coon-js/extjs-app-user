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
 * Class for managing an application user.
 * This is a singleton class which can be configured by providing custom
 * implementations of {@link coon.user.UserProvider}. It till be used
 * throughout the lib-cn_user package to manage a single application user.
 * Note: This class' intention is not to manage a list of user. It's use case is
 * to solely provide tools to manage a user who is using the application.
 *
 *      @example
 *      coon.user.Manager.setUserProvider(
 *          Ext.create('coon.user.DefaultUserProvider')
 *      );
 *
 *      var user = coon.user.Manager.getUser();
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
 *          coon.user.Manager.loadUser(options);
 *      }
 *
 */
Ext.define('coon.user.Manager', {

    singleton : true,

    requires : [
        'coon.user.DefaultUserProvider'
    ],

    /**
     *
     * @cfg {Object/String} [providerConfig="coon.user.DefaultUserProvider]
     * The classname of the provider to use, or an Object containing configuration
     * information for the {@link coon.user.UserProvider}. The object needs
     * at least the property "className" holding the fqn of the provider class
     * to use.
     * The class which is used as the UserProvider needs to be loaded before
     * it is used with the Manager.
     */
    providerConfig : 'coon.user.DefaultUserProvider',

    /**
     * @type {coon.user.UserProvider} userProvider
     * @private
     */
    userProvider : null,

    /**
     * Loads a user based on the information specified in options.params.
     * Additionally, success- and failure-callbacks can be specified which
     * get called as soon as the user was loaded, or if loading the user failed.
     * See {@link coon.user.UserProvider#cn_user-userload} and
     * {@link coon.user.UserProvider#cn_user-userloadfailure}
     *
     * @param {Object} options
     * @param {Object} options.params An object which will get passes to the
     * {@link coon.user.UserProvider#loadUser}-method
     * @param {Function} options.success The callback for the successfull load
     * of the user
     * @param {Function} options.failure The callback for a failed load attempt
     * of the user
     * @param {Object/null} options.scope The scope in which the failure/success
     * callbacks are to load
     *
     * @throws error if loading the user was triggered during an already existing
     * load operation; see {@link coon.user.UserProvider#isUserLoading},
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
            me,
            {single : true}
        );

        provider.on(
            'cn_user-userloadfailure',
            me.onUserProviderLoadFailure,
            me,
            {single : true}
        );

        provider.loadUser(cfg);
    },

    /**
     * Returns the user managed by the configured {@link #userProvider}.
     * See {@link coon.user.UserProvider#getUser}.
     * Implementing APIs should be advised that loading a user via {@link #loadUser}
     * might be necessary, or otherwise this method will always return null.
     * If no UserProvider was configured for the UserManager yet, the method
     * {@link #getUserProvider} will take care of creating the provider by utilizing
     * the information found in  {@link #userProviderConfig}.
     *
     *
     * @returns {coon.user.model.UserModel|null}
     */
    getUser : function() {
        return this.getUserProvider().getUser();
    },

    /**
     * Returns the UerProvider used by the Manager. If {@link #userProvider}
     * is not configured, {@link #setUserProvider} will be called with the
     * default {@link #providerConfig} as found in this class to create one.
     *
     * @returns {coon.user.UserProvider}
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
     * In any case, the argument must represent an existing instance of {@link coon.user.UserProvider}.
     *
     *      @example
     *      coon.user.Manager.setUserProvider(
     *          Ext.create('coon.user.DefaultUserProvider')
     *      );
     *      // or
     *      coon.user.Manager.setUserProvider(
     *          'coon.user.DefaultUserProvider'
     *      );
     *      // or
     *      coon.user.Manager.setUserProvider({
     *          cnclass   : 'coon.user.DefaultUserProvider',
     *          cfgOption : 'foo'
     *      });
     *
     * @param {coon.user.UserProvider/Object/String} providerConfig
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
         * @param {coon.user.UserProvider}
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
         * {@link coon.user.UserProvider#cn_user-userload} event.
         *
         * @param {coon.user.UserProvider} provider
         * @param {coon.user.model.UserModel} userModel
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
         * {@link coon.user.UserProvider#cn_user-userloadfailure} event.
         *
         * @param {coon.user.UserProvider} provider
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
         * @param {coon.user.UserProvider/Object/String} providerConfig
         *
         * @return {coon.user.UserProvider}
         * @private
         *
         * @throws error if the className computed by using the providerConfig argument
         * failed to load, or if the class was not already loaded.
         */
        initUserProvider : function(providerConfig) {

            if (providerConfig instanceof coon.user.UserProvider) {
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

            if (!(ret instanceof coon.user.UserProvider)) {
                Ext.raise({
                    sourceClass   : Ext.getClassName(this),
                    providerClass : ret,
                    msg           : Ext.getClassName(this) + " providerConfig to represent an instance of coon.user.UserProvider."
                });
            }

            return ret;

        }


    }




});
