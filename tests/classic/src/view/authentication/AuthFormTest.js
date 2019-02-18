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

describe('coon.user.view.authentication.AuthFormTest', function(t) {

    var form,
        createForm = function() {
            form = Ext.create('coon.user.view.authentication.AuthForm', {
                renderTo : document.body
            });

            return form;
        };


    t.afterEach(function() {
        if (!form) {
            return;
        }
        form.destroy();
        form = null;
    });


    t.it("Should create and show the form", function(t) {

        var form = createForm();
        t.expect(form instanceof coon.comp.form.AutoCompleteForm).toBeTruthy();

        t.expect(form.autoCompleteTrigger).toBeDefined();
        t.expect(form.autoCompleteTrigger).not.toBeNull();

        t.expect(form.autoCompleteTrigger.reference).toBe('loginButton');
        t.expect(form.autoCompleteTrigger.actionUrl).toBe(form.defaultFakeActionUrl);


        t.expect(form.formName).toBe('authForm');


    });

    t.it("Should focus the userid field", function(t) {
        var form = createForm();
        form.focus();
        t.expect(document.activeElement).toBe(form.down('textfield[name=userid]').inputEl.dom);
    });

    t.it("Should require userid", function(t) {

        var form = createForm();
        form.down('textfield[name=password]').setValue('abc');
        t.expect(form.isValid()).toBeFalsy();
        t.expect(form.down('button[reference=loginButton]').isDisabled()).toBeTruthy()
    });

    t.it("Should require password", function(t) {
        var form = createForm();
        form.down('textfield[name=userid]').setValue('abc');
        t.expect(form.isValid()).toBeFalsy();
        t.expect(form.down('button[reference=loginButton]').isDisabled()).toBeTruthy()
    });

    t.it("Should be valid if both fields are set", function(t) {
        var form = createForm();
        form.down('textfield[name=userid]').setValue('abc');
        form.down('textfield[name=password]').setValue('abc');
        t.expect(form.isValid()).toBeTruthy();

        // wait for form binding to refresh
        t.waitForMs(500, function(){
            t.expect(form.down('button[reference=loginButton]').isDisabled()).toBeFalsy();
        });
    });


    t.it("Form submit should trigger cn_user-authrequest event", function(t) {

        var form   = createForm(),
            signal = undefined,
            signaledForm;

        form.down('textfield[name=userid]').setValue('useridValue');
        form.down('textfield[name=password]').setValue('passwordValue');

        form.on('cn_user-authrequest', function(formPanel, authinfo) {
            signal       = authinfo;
            signaledForm = formPanel;
        });

        t.waitForMs(500, function(){
            t.click(form.down('button[reference=loginButton]'));

            t.waitForMs(500, function(){
                t.expect(signaledForm).toBe(form);
                t.expect(signal).toEqual({
                    userid   : 'useridValue',
                    password : 'passwordValue'
                });
            });
        });

    });

    t.it("Enter key should trigger form submit", function(t) {

        var form   = createForm(),
            signal = undefined;

        form.down('textfield[name=userid]').setValue('useridValue1');
        form.down('textfield[name=password]').setValue('passwordValue1');

        form.on('cn_user-authrequest', function(formPanel, authinfo) {
            signal = authinfo;
        });

        t.waitForMs(600, function(){
            t.keyPress(form.down('textfield[name=password]'), 'RETURN');
            t.expect(signal).toEqual({
                userid   : 'useridValue1',
                password : 'passwordValue1'
            });

        });
    });

    t.it("Should show that authorization failed", function(t) {

        var form  = createForm(),
            label = form.lookupReference('authFailedLabel'),
            f;

        t.expect(label).toBeDefined();
        t.expect(label).not.toBeNull();
        t.expect(label.isVisible()).toBe(false);

        f = form.showAuthorizationFailed(true);

        t.expect(f).toBe(form);
        t.expect(label.isVisible()).toBe(true);

        form.showAuthorizationFailed(false);

        t.expect(label.isVisible()).toBe(false);
    });

    t.it("Should hide authorization failed if a new login attempt is made", function(t) {

        var form  = createForm(),
            label = form.lookupReference('authFailedLabel'),
            f;

        label.setVisible(true);

        form.down('textfield[name=userid]').setValue('useridValue1');
        form.down('textfield[name=password]').setValue('passwordValue1');

        t.waitForMs(500, function(){
            t.expect(label.isVisible()).toBe(true);
            t.keyPress(form.down('textfield[name=password]'), 'RETURN');
            t.expect(label.isVisible()).toBe(false);

        });

    });


    t.it("Should show that the form is busy sending an auth request", function(t) {

        var form          = createForm(),
            useridField   = form.down("textfield[name=userid]"),
            passwordField = form.down("textfield[name=password]"),
            loginButton   = form.lookupReference('loginButton'),
            f;

        t.expect(useridField.isDisabled()).toBe(false);
        t.expect(passwordField.isDisabled()).toBe(false);
        t.expect(loginButton.isDisabled()).toBe(true);
        t.expect(loginButton.iconCls).toBe(form.loginButtonIconCls);

        useridField.setValue('abc');
        passwordField.setValue('abc');

        t.waitForMs(600, function() {

            t.expect(loginButton.isDisabled()).toBe(false);

            f = form.showAuthorizationBusy(true);

            t.expect(useridField.isDisabled()).toBe(true);
            t.expect(passwordField.isDisabled()).toBe(true);
            t.expect(loginButton.isDisabled()).toBe(true);
            t.expect(loginButton.iconCls).toBe(form.loginButtonIconClsBusy);
            t.expect(f).toBe(form);

            form.showAuthorizationBusy(false);

            t.expect(useridField.isDisabled()).toBe(false);
            t.expect(passwordField.isDisabled()).toBe(false);
            t.expect(loginButton.isDisabled()).toBe(false);
            t.expect(loginButton.iconCls).toBe(form.loginButtonIconCls);


        });

    });

});
