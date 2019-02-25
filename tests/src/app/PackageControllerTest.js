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

describe('coon.user.app.PackageControllerTest', function(t) {

    var testAuthWindowGone = function(t) {
        var authWindow = Ext.ComponentQuery.query('cn_user-authwindow');
        t.expect(authWindow).not.toBeNull();
        t.expect(authWindow).toBeDefined();
        t.expect(authWindow.length).toBe(0);
    };

    var testAuthWindowVisible = function(t) {
        var authWindow = Ext.ComponentQuery.query('cn_user-authwindow');
        t.expect(authWindow).not.toBeNull();
        t.expect(authWindow).toBeDefined();
        t.expect(authWindow.length).toBe(1);
        t.expect(authWindow[0] instanceof coon.user.view.authentication.AuthWindow).toBeTruthy();
        t.expect(authWindow[0].isVisible()).toBeTruthy();
        return authWindow[0];
    }

    t.requireOk('coon.user.Manager', function() {
        t.beforeEach(function() {
            coon.user.Manager.setUserProvider(Ext.create('coon.user.DefaultUserProvider'));
        });

        t.it('Test preLaunchHook return false', function(t) {
            var ctrl = Ext.create('coon.user.app.PackageController'),
                authWindow;

            t.expect(coon.user.Manager.getUser()).toBeNull();
            t.expect(ctrl.preLaunchHook()).toBe(false);

            testAuthWindowVisible(t).close();
        });

        t.it('Test preLaunchHook return true', function(t) {

            var ctrl = Ext.create('coon.user.app.PackageController');

            coon.user.Manager.loadUser();
            t.expect(coon.user.Manager.getUser()).not.toBeNull();
            t.expect(ctrl.preLaunchHook()).toBe(true);

            testAuthWindowGone(t);

        });

        /**
         * coon/app-cn_user/#1
         */
        t.it('Test postLaunchHook to not return an empty object', function(t) {

            var ctrl = Ext.create('coon.user.app.PackageController'),
                obj, exc = e = undefined;

            t.expect(coon.user.Manager.getUser()).toBeNull();
            try{ctrl.postLaunchHook();}catch(e){exc = e;}

            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toContain('requires a valid user');


            coon.user.Manager.loadUser();
            t.expect(coon.user.Manager.getUser()).not.toBeNull();

            obj = ctrl.postLaunchHook();


            t.expect(obj).not.toEqual({});

            t.expect(obj.permaNav).toBeDefined();
            t.expect(obj.permaNav.length).toBe(2);
            t.expect(obj.permaNav[0].text).toBe(
                coon.user.Manager.getUser().get('username'));
            t.expect(obj.permaNav[1].xtype).toBe(
                'cn_user-toolbaruserimageitem');

        });

        t.it('Test loadUser (successful) with callbacks', function(t) {

            var ctrl = Ext.create('coon.user.app.PackageController', {
                    application : {
                        launch : function() {
                            wasLaunched = true;
                        }
                    }
                }),
                aw          = undefined,
                wasLaunched = undefined;

            t.expect(coon.user.Manager.getUser()).toBeNull();
            t.expect(wasLaunched).toBeUndefined();
            t.expect(ctrl.authWindow).toBeNull();
            ctrl.preLaunchHook();
            aw = testAuthWindowVisible(t);

            aw.fireEvent('cn_user-authrequest', aw.down('cn_user-authform'), {foo : 'bar'});

            testAuthWindowGone(t);

            t.expect(wasLaunched).toBe(true);
            t.expect(ctrl.authWindow).toBeNull();
        });


        t.it('Test loadUser (failed) with callbacks', function(t) {

            var ctrl = Ext.create('coon.user.app.PackageController', {
                    application : {
                        launch : function() {
                            wasLaunched = true;
                        }
                    }
                }),
                aw          = undefined,
                wasLaunched = undefined;

            t.expect(coon.user.Manager.getUser()).toBeNull();
            t.expect(wasLaunched).toBeUndefined();
            t.expect(ctrl.authWindow).toBeNull();
            ctrl.preLaunchHook();
            aw = testAuthWindowVisible(t);

            aw.fireEvent('cn_user-authrequest', aw.down('cn_user-authform'), {forceFail : true});

            testAuthWindowVisible(t);

            t.expect(wasLaunched).toBeUndefined();
            t.expect(ctrl.authWindow).toBe(aw);
            aw.destroy();
        });

        t.it('Test userWasNotAuthorized to be empty function', function(t) {

            var ctrl = Ext.create('coon.user.app.PackageController');

            t.expect(ctrl.userWasNotAuthorized).toBe(Ext.emptyFn);
        });


        t.it('Test userAvailable()', function(t) {

            var ctrl = Ext.create('coon.user.app.PackageController', {
                    application : {
                        launch : function() {
                            wasLaunched = true;
                        }
                    }
                }),
                aw          = undefined,
                wasLaunched = undefined;

            t.expect(wasLaunched).toBeUndefined();

            var exc = e = undefined;
            try {
                ctrl.userAvailable('foo');
            } catch (e) {
                exc = e;
            }
            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toContain("needs userModel to be instance of");

            ctrl.preLaunchHook();
            aw = testAuthWindowVisible(t);

            ctrl.userAvailable(Ext.create('coon.user.model.UserModel'));

            testAuthWindowGone(t);
            t.expect(wasLaunched).toBe(true);
            t.expect(ctrl.authWindow).toBeNull();
        });

    });



});
