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

describe('conjoon.cn_user.ManagerTest', function(t) {

    var checkListenerAvailableHelper = function(t, provider) {
        t.expect(provider.hasListener('cn_user-userload')).toBeTruthy();
        t.expect(provider.hasListener('cn_user-userloadfailure')).toBeTruthy();
    };


    var checkNoListenerAvailableHelper = function(t, provider) {
        t.expect(conjoon.cn_user.Manager.callbackOptions).toBeNull();
        t.expect(provider.hasListener('cn_user-userload')).toBeFalsy();
        t.expect(provider.hasListener('cn_user-userloadfailure')).toBeFalsy();
    };

    t.requireOk('conjoon.cn_user.Manager', function () {


        t.it('Should be available', function(t) {

            t.expect(conjoon.cn_user.Manager).toBeDefined();
        });

        /**
         * Okay Tests
         */
        t.it('setUserProvider with valid class name', function(t) {
            var provider = conjoon.cn_user.Manager.setUserProvider(
                'conjoon.cn_user.DefaultUserProvider'
            );

            t.expect(provider instanceof conjoon.cn_user.DefaultUserProvider).toBeTruthy();
            t.expect(conjoon.cn_user.Manager.getUserProvider()).toBe(provider);
        });
        t.it('setUserProvider with valid existing instance', function(t) {

            var cfgProvider = Ext.create('conjoon.cn_user.DefaultUserProvider'),
                provider;

            provider = conjoon.cn_user.Manager.setUserProvider(cfgProvider);

            t.expect(provider).toBe(cfgProvider);
            t.expect(conjoon.cn_user.Manager.getUserProvider()).toBe(provider);
        });
        t.it('setUserProvider with valid config object', function(t) {
            var provider = conjoon.cn_user.Manager.setUserProvider({
                cnclass : 'conjoon.cn_user.DefaultUserProvider',
                opt1    : 'foo',
                opt2    : 'bar'
            });

            t.expect(provider instanceof conjoon.cn_user.DefaultUserProvider).toBeTruthy()
            t.expect(provider.opt1).toBe('foo');
            t.expect(provider.opt2).toBe('bar');
            t.expect(conjoon.cn_user.Manager.getUserProvider()).toBe(provider);
        });

        /**
         * Tests for exceptions
         */
        t.it('setUserProvider with class not loaded yet', function(t) {

            var exc, provider;

            try {
                provider = conjoon.cn_user.Manager.setUserProvider(
                    'conjoon.cn_user.DefaultUserProviderSomething'
                )
            } catch (e) {
                exc = e;
            }

            t.expect(provider).toBeUndefined();
            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined()
        });
        t.it('setUserProvider with config object and not yet loaded class', function(t) {
            var exc, provider;

            try {
                provider = conjoon.cn_user.Manager.setUserProvider({
                    cnclass : 'conjoon.cn_user.DefaultUserProviderStuff',
                    opt1    : 'foo',
                    opt2    : 'bar'
                });
            } catch (e) {
                exc = e;
            }

            t.expect(provider).toBeUndefined();
            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();
        });
        t.it('setUserProvider with config object and missing cnclass', function(t) {
            var exc, provider;

            try {
                provider = conjoon.cn_user.Manager.setUserProvider({
                    opt1    : 'foo',
                    opt2    : 'bar'
                });
            } catch (e) {
                exc = e;
            }

            t.expect(provider).toBeUndefined();
            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();
        });
        t.it('Should throw exception if passed argument is instance, but not instance of conjoon.cn_user.UserProvider', function(t) {
            var exc, provider;

            t.expect(Ext.Panel).toBeDefined();

            try {
                provider = conjoon.cn_user.Manager.setUserProvider(new Ext.Panel());
            } catch (e) {
                exc = e;
            }

            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();
        });
        t.it('Should throw exception if passed argument is string, but resulting instance not instance of conjoon.cn_user.UserProvider', function(t) {
            var exc, provider;

            t.expect(Ext.Panel).toBeDefined();

            try {
                provider = conjoon.cn_user.Manager.setUserProvider('Ext.Panel');
            } catch (e) {
                exc = e;
            }

            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();
        });
        t.it('Should throw exception if passed argument is object, but resulting instance not instance of conjoon.cn_user.UserProvider', function(t) {
            var exc, provider;

            t.expect(Ext.Panel).toBeDefined();

            try {
                provider = conjoon.cn_user.Manager.setUserProvider({
                    cnclass : 'Ext.Panel'
                });
            } catch (e) {
                exc = e;
            }

            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();
        });

        /**
         * Test getUserProvider
         */
        t.it("Should return default provider", function(t){
            var provider = conjoon.cn_user.Manager.getUserProvider();
            t.expect(Ext.getClassName(provider)).toBe('conjoon.cn_user.DefaultUserProvider')
        });

        /**
         * Test getUser
         */
        t.it("Should return same user", function(t){

            var user = conjoon.cn_user.Manager.getUser();

            t.expect(user).toBe(conjoon.cn_user.Manager.getUserProvider().getUser());
        });


        /**
         * Test onUserProviderLoad
         */
        t.it("onUserProviderLoad should work properly", function(t){

            var provider = conjoon.cn_user.Manager.getUserProvider(),
                scopeMatch,
                TestBar = function () {
                    this.wasSuccess  = 0;
                    this.wasFailure  = 0;
                    this.loadedModel = null;
                };

            checkNoListenerAvailableHelper(t, provider);

            var testBar = new TestBar;

            t.expect(scopeMatch).toBeUndefined();

            conjoon.cn_user.Manager.loadUser({
                params  : {
                    foo : 'bar'
                },
                success : function(model){
                    this.wasSuccess = 1;
                    this.loadedModel = model;
                    scopeMatch = this === testBar;
                },
                failure : function(){this.wasFailure = 1;},
                scope   : testBar
            });

            checkNoListenerAvailableHelper(t, provider);

            t.expect(testBar.wasSuccess).toBe(1);
            t.expect(testBar.wasFailure).toBe(0);
            t.expect(testBar.loadedModel).toBe(conjoon.cn_user.Manager.getUser());
            t.expect(scopeMatch).toBeTruthy();

        });

        /**
         * Test onUserProviderLoadFailure
         */
        t.it("onUserProviderLoadFailure should work properly", function(t){

            var provider = conjoon.cn_user.Manager.getUserProvider(),
                params   = {
                    foo        : 'bar',
                    forceFail  : true
                },
                testBar = new (function TestBar() {
                    this.wasSuccess  = 0;
                    this.wasFailure  = 0;
                    this.loadedModel = null;
                    this.evtOptions  = null;
                }),
                scopeMatch;

            checkNoListenerAvailableHelper(t, provider);
            t.expect(scopeMatch).toBeUndefined();

            conjoon.cn_user.Manager.loadUser({
                params  : params,
                success : function(model){
                    this.wasSuccess = 1;
                    this.loadedModel = model;
                },
                failure : function(options){
                    this.wasFailure = 1;
                    this.evtOptions = options;
                    scopeMatch = this === testBar;
                },
                scope   : testBar
            });

            checkNoListenerAvailableHelper(t, provider);

            t.expect(testBar.wasSuccess).toBe(0);
            t.expect(testBar.wasFailure).toBe(1);
            t.expect(testBar.loadedModel).toBeNull();
            t.expect(testBar.evtOptions).toEqual(params);
            t.expect(scopeMatch).toBeTruthy();

        });

        /**
         * Test loadUser invalid cb options
         */
        t.it("loadUser should not work with erroneous callback options", function(t){

            var provider = conjoon.cn_user.Manager.getUserProvider(),
                exc;

            checkNoListenerAvailableHelper(t, provider);

            try {
                conjoon.cn_user.Manager.loadUser({
                    success : 'bla',
                    failure : Ext.emptyFn
                });
            } catch (e) {
                exc = e;
            }

            checkNoListenerAvailableHelper(t, provider);

            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();

            exc = undefined;

            t.expect(exc).toBeUndefined();

            try {
                conjoon.cn_user.Manager.loadUser({
                    success : function(){},
                    failure : 'bla'
                });
            } catch (e) {
                exc = e;
            }

            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();

        });

        t.it('setUserProvider and check if existing listener of conjoon.cn_user.Manager get removed', function(t) {

            var provider = conjoon.cn_user.Manager.setUserProvider(
                'conjoon.cn_user.DefaultUserProvider'
            );

            checkNoListenerAvailableHelper(t, provider);

            t.expect(provider).toBe(conjoon.cn_user.Manager.getUserProvider());

            provider.on('cn_user-userload', conjoon.cn_user.Manager.onUserProviderLoad, conjoon.cn_user.Manager);
            provider.on('cn_user-userloadfailure', conjoon.cn_user.Manager.onUserProviderLoadFailure, conjoon.cn_user.Manager);

            checkListenerAvailableHelper(t, provider);

            conjoon.cn_user.Manager.setUserProvider('conjoon.cn_user.DefaultUserProvider')

            checkNoListenerAvailableHelper(t, provider);

        });


    });

});
