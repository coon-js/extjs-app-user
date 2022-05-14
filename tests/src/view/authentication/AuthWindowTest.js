/**
 * coon.js
 * extjs-app-user
 * Copyright (C) 2017-2022 Thorsten Suckow-Homberg https://github.com/coon-js/extjs-app-user
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

StartTest(t => {

    t.requireOk("coon.core.Environment", () => {
        let vendorBase = Ext.create("coon.core.env.VendorBase");
        coon.core.Environment.setVendorBase(vendorBase);
        coon.core.Environment.getPathForResource = () => ".";


        t.it("Should create and show the window", t => {

            var window = Ext.create("coon.user.view.authentication.AuthWindow");

            t.expect(window instanceof coon.comp.window.LockingWindow).toBeTruthy();

            t.expect(
                window.down("cn_user-authform")
                instanceof coon.user.view.authentication.AuthForm
            ).toBeTruthy();

            if (Ext.isModern) {
                t.expect(window.getDefaultFocus()).toBe("cn_user-authform");
            } else {
                t.expect(window.defaultFocus).toBe("cn_user-authform");
            }

            window.close();

        });

        t.it("Relay event cn_user-authrequest should work properly", t => {

            var window    = Ext.create("coon.user.view.authentication.AuthWindow"),
                form      = window.down("cn_user-authform"),
                evtForm, evtOptions,
                params =  {foo: "bar"};

            window.on("cn_user-authrequest", function (form, options) {
                evtForm    = form;
                evtOptions = options;
            });

            t.expect(evtForm).toBeUndefined();
            t.expect(evtOptions).toBeUndefined();

            form.fireEvent("cn_user-authrequest", form, params);

            t.expect(evtForm).toBe(form);
            t.expect(evtOptions).toEqual(params);

            window.close();
        });

    });});
