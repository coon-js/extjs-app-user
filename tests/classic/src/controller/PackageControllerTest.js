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

describe('conjoon.cn_user.controller.PackageControllerTest', function(t) {

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
        t.expect(authWindow[0] instanceof conjoon.cn_user.view.authentication.AuthWindow).toBeTruthy();
        t.expect(authWindow[0].isVisible()).toBeTruthy();
        return authWindow[0];
    }

    t.requireOk('conjoon.cn_user.Manager', function() {
        t.beforeEach(function() {
            conjoon.cn_user.Manager.setUserProvider(Ext.create('conjoon.cn_user.DefaultUserProvider'));
        });

        t.it('Test preLaunchHook return false', function(t) {
            var ctrl = Ext.create('conjoon.cn_user.controller.PackageController'),
                authWindow;

            t.expect(conjoon.cn_user.Manager.getUser()).toBeNull();
            t.expect(ctrl.preLaunchHook()).toBe(false);

            testAuthWindowVisible(t).close();
        });

        t.it('Test preLaunchHook return true', function(t) {

            var ctrl = Ext.create('conjoon.cn_user.controller.PackageController');

            conjoon.cn_user.Manager.loadUser();
            t.expect(conjoon.cn_user.Manager.getUser()).not.toBeNull();
            t.expect(ctrl.preLaunchHook()).toBe(true);

            testAuthWindowGone(t);

        });

        t.it('Test postLaunchHook return empty object', function(t) {

            var ctrl = Ext.create('conjoon.cn_user.controller.PackageController');

            t.expect(ctrl.postLaunchHook()).toEqual({});

        });

        t.it('Test loadUser (successful) with callbacks', function(t) {

            var ctrl = Ext.create('conjoon.cn_user.controller.PackageController', {
                    application : {
                        launch : function() {
                            wasLaunched = true;
                        }
                    }
                }),
                aw          = undefined,
                wasLaunched = undefined;

            t.expect(conjoon.cn_user.Manager.getUser()).toBeNull();
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

            var ctrl = Ext.create('conjoon.cn_user.controller.PackageController', {
                    application : {
                        launch : function() {
                            wasLaunched = true;
                        }
                    }
                }),
                aw          = undefined,
                wasLaunched = undefined;

            t.expect(conjoon.cn_user.Manager.getUser()).toBeNull();
            t.expect(wasLaunched).toBeUndefined();
            t.expect(ctrl.authWindow).toBeNull();
            ctrl.preLaunchHook();
            aw = testAuthWindowVisible(t);

            aw.fireEvent('cn_user-authrequest', aw.down('cn_user-authform'), {forceFail : true});

            testAuthWindowVisible(t);

            t.expect(wasLaunched).toBeUndefined();
            t.expect(ctrl.authWindow).toBe(aw);
        });

        t.it('Test userWasNotAuthorized to be empty function', function(t) {

            var ctrl = Ext.create('conjoon.cn_user.controller.PackageController');

            t.expect(ctrl.userWasNotAuthorized).toBe(Ext.emptyFn);
        });

        t.it('Test userAvailable to be empty function', function(t) {

            var ctrl = Ext.create('conjoon.cn_user.controller.PackageController');

            t.expect(ctrl.userAvailable).toBe(Ext.emptyFn);
        });

    });



});