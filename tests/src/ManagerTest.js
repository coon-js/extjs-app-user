/**
 * coon.js
 * app-cn_user
 * Copyright (C) 2019 Thorsten Suckow-Homberg https://github.com/coon-js/app-cn_user
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

describe('coon.user.ManagerTest', function(t) {

    var checkListenerAvailableHelper = function(t, provider) {
        t.expect(provider.hasListener('cn_user-userload')).toBeTruthy();
        t.expect(provider.hasListener('cn_user-userloadfailure')).toBeTruthy();
    };


    var checkNoListenerAvailableHelper = function(t, provider) {
        t.expect(coon.user.Manager.callbackOptions).toBeNull();
        t.expect(provider.hasListener('cn_user-userload')).toBeFalsy();
        t.expect(provider.hasListener('cn_user-userloadfailure')).toBeFalsy();
    };

    t.requireOk('coon.user.Manager', function () {


        t.it('Should be available', function(t) {

            t.expect(coon.user.Manager).toBeDefined();
        });

        /**
         * Okay Tests
         */
        t.it('setUserProvider with valid class name', function(t) {
            var provider = coon.user.Manager.setUserProvider(
                'coon.user.DefaultUserProvider'
            );

            t.expect(provider instanceof coon.user.DefaultUserProvider).toBeTruthy();
            t.expect(coon.user.Manager.getUserProvider()).toBe(provider);
        });
        t.it('setUserProvider with valid existing instance', function(t) {

            var cfgProvider = Ext.create('coon.user.DefaultUserProvider'),
                provider;

            provider = coon.user.Manager.setUserProvider(cfgProvider);

            t.expect(provider).toBe(cfgProvider);
            t.expect(coon.user.Manager.getUserProvider()).toBe(provider);
        });
        t.it('setUserProvider with valid config object', function(t) {
            var provider = coon.user.Manager.setUserProvider({
                cnclass : 'coon.user.DefaultUserProvider',
                opt1    : 'foo',
                opt2    : 'bar'
            });

            t.expect(provider instanceof coon.user.DefaultUserProvider).toBeTruthy()
            t.expect(provider.opt1).toBe('foo');
            t.expect(provider.opt2).toBe('bar');
            t.expect(coon.user.Manager.getUserProvider()).toBe(provider);
        });

        /**
         * Tests for exceptions
         */
        t.it('setUserProvider with class not loaded yet', function(t) {

            var exc, provider;

            try {
                provider = coon.user.Manager.setUserProvider(
                    'coon.user.DefaultUserProviderSomething'
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
                provider = coon.user.Manager.setUserProvider({
                    cnclass : 'coon.user.DefaultUserProviderStuff',
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
                provider = coon.user.Manager.setUserProvider({
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
        t.it('Should throw exception if passed argument is instance, but not instance of coon.user.UserProvider', function(t) {
            var exc, provider;

            t.expect(Ext.Panel).toBeDefined();

            try {
                provider = coon.user.Manager.setUserProvider(new Ext.Panel());
            } catch (e) {
                exc = e;
            }

            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();
        });
        t.it('Should throw exception if passed argument is string, but resulting instance not instance of coon.user.UserProvider', function(t) {
            var exc, provider;

            t.expect(Ext.Panel).toBeDefined();

            try {
                provider = coon.user.Manager.setUserProvider('Ext.Panel');
            } catch (e) {
                exc = e;
            }

            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();
        });
        t.it('Should throw exception if passed argument is object, but resulting instance not instance of coon.user.UserProvider', function(t) {
            var exc, provider;

            t.expect(Ext.Panel).toBeDefined();

            try {
                provider = coon.user.Manager.setUserProvider({
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
            var provider = coon.user.Manager.getUserProvider();
            t.expect(Ext.getClassName(provider)).toBe('coon.user.DefaultUserProvider')
        });

        /**
         * Test getUser
         */
        t.it("Should return same user", function(t){

            var user = coon.user.Manager.getUser();

            t.expect(user).toBe(coon.user.Manager.getUserProvider().getUser());
        });


        /**
         * Test onUserProviderLoad
         */
        t.it("onUserProviderLoad should work properly", function(t){

            var provider = coon.user.Manager.getUserProvider(),
                scopeMatch,
                TestBar = function () {
                    this.wasSuccess  = 0;
                    this.wasFailure  = 0;
                    this.loadedModel = null;
                };

            checkNoListenerAvailableHelper(t, provider);

            var testBar = new TestBar;

            t.expect(scopeMatch).toBeUndefined();

            coon.user.Manager.loadUser({
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
            t.expect(testBar.loadedModel).toBe(coon.user.Manager.getUser());
            t.expect(scopeMatch).toBeTruthy();

        });

        /**
         * Test onUserProviderLoadFailure
         */
        t.it("onUserProviderLoadFailure should work properly", function(t){

            var provider = coon.user.Manager.getUserProvider(),
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

            coon.user.Manager.loadUser({
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

            var provider = coon.user.Manager.getUserProvider(),
                exc;

            checkNoListenerAvailableHelper(t, provider);

            try {
                coon.user.Manager.loadUser({
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
                coon.user.Manager.loadUser({
                    success : function(){},
                    failure : 'bla'
                });
            } catch (e) {
                exc = e;
            }

            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toBeDefined();

        });

        t.it('setUserProvider and check if existing listener of coon.user.Manager get removed', function(t) {

            var provider = coon.user.Manager.setUserProvider(
                'coon.user.DefaultUserProvider'
            );

            checkNoListenerAvailableHelper(t, provider);

            t.expect(provider).toBe(coon.user.Manager.getUserProvider());

            provider.on('cn_user-userload', coon.user.Manager.onUserProviderLoad, coon.user.Manager);
            provider.on('cn_user-userloadfailure', coon.user.Manager.onUserProviderLoadFailure, coon.user.Manager);

            checkListenerAvailableHelper(t, provider);

            coon.user.Manager.setUserProvider('coon.user.DefaultUserProvider')

            checkNoListenerAvailableHelper(t, provider);

        });


    });

});
