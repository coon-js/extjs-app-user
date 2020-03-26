/**
 * coon.js
 * lib-cn_user
 * Copyright (C) 2017 - 2020 Thorsten Suckow-Homberg https://github.com/coon-js/lib-cn_user
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

describe("coon.user.DefaultUserProviderTest", function (t) {

    t.it("Basic tests of coon.user.DefaultUserProvider", function (t) {

        var userProvider = Ext.create("coon.user.DefaultUserProvider", {}),
            evtProvider,
            evtModel,
            evtOptions,
            failOptions = {forceFail : true, foo : "bar"};

        t.expect(userProvider instanceof coon.user.UserProvider).toBeTruthy();
        t.expect(userProvider.getUser()).toBeNull();

        t.expect(evtProvider).toBeUndefined();
        t.expect(evtModel).toBeUndefined();

        userProvider.on("cn_user-userload", function (userProvider, userModel) {
            evtProvider = userProvider;
            evtModel    = userModel;
        });

        userProvider.on("cn_user-userloadfailure", function (userProvider, options) {
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
