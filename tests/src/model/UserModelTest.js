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

describe('conjoon.cn_user.model.UserModelTest', function(t) {

    var model,
        modelName = 'conjoon.cn_user.model.UserModel',
        getModelClass = function() {
            return eval(modelName);
        },
        getSchemaClass = function() {
            return conjoon.cn_user.data.user.BaseSchema;
        },
        entityName = 'UserModel',
        lastLoginDate = new Date(2015, 10, 5, 17, 15),
        data = {
            firstname    : 'John',
            lastname     : 'Smith',
            username     : 'johnsmith',
            emailAddress : 'johnsmith@conjoon.org',
            isRoot       : false,
            lastLogin    : Ext.Date.format(lastLoginDate, 'timestamp')
        },
        expected = {
            password : ''
        },
        presenceFields = [
            'firstname',
            'lastname',
            'username',
            'emailAddress'
        ],
        modelShouldBeValid = function(t, model) {
            t.expect(model.isValid()).toBeTruthy();
        },
        modelShouldBeInvalid = function(t, model) {
            t.expect(model.isValid()).toBeFalsy();
        };


    t.beforeEach(function() {
        model = Ext.create(modelName, Ext.apply({}, data));
    });

// +----------------------------------------------------------------------------
// |                    =~. Unit Tests .~=
// +----------------------------------------------------------------------------


    /**
     * Test create
     */
    t.it(Ext.String.format('Should create an instance of {0}', modelName), function(t) {
       t.expect(model instanceof getModelClass()).toBeTruthy();
    });

    /**
     * Test Schema
     */
    t.it('Should return the proper schema', function(t) {
        t.expect(model.schema instanceof getSchemaClass()).toBeTruthy();
    });

    /**
     * Test EntityName
     */
    t.it('Should return the entity name', function(t) {
        t.expect(model.schema.getEntityName(model)).toBe(entityName);
    });


    /**
     * Test getter fields
     */
    t.it('Should check the fields\' values', function(t) {
        // valid model
        for (var i in data) {
            if (!data.hasOwnProperty(i)) {
                continue;
            }

            if (i === 'lastLogin') {
                t.expect(model.get('lastLogin').toString())
                 .toBe(lastLoginDate.toString());
            } else {
                t.expect(model.get(i)).toBe(
                    expected.hasOwnProperty(i) ? expected[i] : data[i]
                );
            }
        }
        modelShouldBeValid(t, model);
    });


    /**
     * Test field validators: presence
     */
    for (var i = 0, len = presenceFields.length; i < len; i++) {
        var msg = Ext.String.format(
            'Should not be valid if {0} is null',
            presenceFields[i]
        );
        (function(field) {

            t.it(msg, function(t) {
                modelShouldBeValid(t, model);
                model.set(field, null);
                modelShouldBeInvalid(t, model);
            });

        })(presenceFields[i]);
     }

    /**
     * Test emailAddress field
     */
    t.it('Should not be valid if emailAddress is malformed', function(t) {
        modelShouldBeValid(t, model);
        model.set('emailAddress', 'somestring@somedomain');
        modelShouldBeInvalid(t, model);
    });

    /**
    * Test password field
    */
    t.it('Should be able to set password directly', function(t) {
        modelShouldBeValid(t, model);
        model.set('password', 'somestring');
        t.expect(model.get('password')).toBe('somestring');
        modelShouldBeValid(t, model);
    });

    /**
     * Test username field
     */
    t.it('Should not be valid if username equals to "admin"', function(t) {
        modelShouldBeValid(t, model);
        model.set('username', 'admin');
        modelShouldBeInvalid(t, model);
    });
    t.it('Should not be valid if username equals to "administrator"', function(t) {
        modelShouldBeValid(t, model);
        model.set('username', 'administrator');
        modelShouldBeInvalid(t, model);
    });
    t.it('Should not be valid if username equals to "user"', function(t) {
        modelShouldBeValid(t, model);
        model.set('username', 'user');
        modelShouldBeInvalid(t, model);
    });
    t.it('Should not be valid if username is less than 3 characters', function(t) {
        modelShouldBeValid(t, model);
        model.set('username', 'Pi');
        modelShouldBeInvalid(t, model);
    });


});
