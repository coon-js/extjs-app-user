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

describe('conjoon.cn_user.DefaultUserProviderTest', function(t) {

    t.it('Basic tests of conjoon.cn_user.DefaultUserProvider', function(t) {

        var userProvider = Ext.create('conjoon.cn_user.DefaultUserProvider', {}),
            evtProvider,
            evtModel,
            evtOptions,
            failOptions = {forceFail : true, foo : 'bar'};

        t.expect(userProvider instanceof conjoon.cn_user.UserProvider).toBeTruthy();
        t.expect(userProvider.getUser()).toBeNull();

        t.expect(evtProvider).toBeUndefined();
        t.expect(evtModel).toBeUndefined();

        userProvider.on('cn_user-userload', function(userProvider, userModel) {
            evtProvider = userProvider;
            evtModel    = userModel;
        });

        userProvider.on('cn_user-userloadfailure', function(userProvider, options) {
            evtProvider = userProvider;
            evtOptions  = options;
        });

        userProvider.loadUser();

        t.expect(evtProvider).toBeDefined();
        t.expect(evtModel).toBeDefined();
        t.expect(userProvider).toBe(evtProvider);
        t.expect(userProvider.getUser()).toBe(evtModel);


        // failload
        evtProvider = undefined;
        userProvider.loadUser(failOptions);
        t.expect(userProvider).toBe(evtProvider);
        t.expect(userProvider.getUser()).toBeNull();
        t.expect(evtOptions).toEqual(failOptions);

        //isLoading
        t.expect(userProvider.isUserLoading()).toBeFalsy();
        userProvider.isLoading = true;
        t.expect(userProvider.isUserLoading()).toBeTruthy();
    });


});
