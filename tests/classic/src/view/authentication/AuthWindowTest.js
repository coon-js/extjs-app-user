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

describe('conjoon.cn_user.view.authentication.AuthWindowTest', function(t) {

    t.it("Should create and show the window", function(t) {

        var window = Ext.create('conjoon.cn_user.view.authentication.AuthWindow');

        t.expect(window instanceof conjoon.cn_comp.window.LockingWindow).toBeTruthy();

        t.expect(
            window.down('cn_user-authform')
                instanceof conjoon.cn_user.view.authentication.AuthForm
        ).toBeTruthy();

        t.expect(window.defaultFocus).toBe('cn_user-authform');

        window.close();

    }),

    t.it("Relay event cn_user-authrequest should work properly", function(t) {

        var window    = Ext.create('conjoon.cn_user.view.authentication.AuthWindow'),
            form      = window.down('cn_user-authform'),
            evtForm, evtOptions,
            params =  {foo : 'bar'};

        window.on('cn_user-authrequest', function(form, options) {
            evtForm    = form;
            evtOptions = options;
        });

        t.expect(evtForm).toBeUndefined();
        t.expect(evtOptions).toBeUndefined();

        form.fireEvent('cn_user-authrequest', form, params);

        t.expect(evtForm).toBe(form);
        t.expect(evtOptions).toEqual(params);

        window.close();
    })

});
