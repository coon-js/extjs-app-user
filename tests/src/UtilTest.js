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

describe("coon.user.UtilTest", function (t) {

    t.requireOk("coon.user.Util", function () {

        // Run this test first to make sure it's not accidently fixed by loading
        // requirements during other tests
        t.it("lib-cn_user#5", function (t) {

            let exc;
            try {
                coon.user.Util.userToCredentials({}, coon.user.Util.BASIC_AUTH);
            } catch (e) {
                exc = e;
            }

            t.expect(exc.msg).toContain("must be an instance");
        });


        t.it("userToCredentials()", function (t) {

            const userModel = Ext.create("coon.user.model.UserModel", {
                username : "user",
                password : "test"
            });

            let exc, encoded;

            t.expect(coon.user.Util.BASIC_AUTH).toBeDefined();

            // OK
            encoded = coon.user.Util.userToCredentials(userModel, coon.user.Util.BASIC_AUTH);
            t.expect(encoded).toBe(btoa(userModel.get("username") + ":" + userModel.get("password")));


            // FAIL
            try {
                coon.user.Util.userToCredentials();
            } catch (e) {
                exc = e;
            }
            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toContain("must be an instance of");


            // FAIL
            exc = undefined;
            try {
                coon.user.Util.userToCredentials(userModel);
            } catch (e) {
                exc = e;
            }
            t.expect(exc).toBeDefined();
            t.expect(exc.msg).toContain("no valid value for");


        });


    });


});
