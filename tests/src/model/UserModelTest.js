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

describe("coon.user.model.UserModelTest", function (t) {

    var model,
        modelName = "coon.user.model.UserModel",
        getModelClass = function () {
            return eval(modelName);
        },
        getSchemaClass = function () {
            return coon.user.data.user.BaseSchema;
        },
        entityName = "UserModel",
        lastLoginDate = new Date(2015, 10, 5, 17, 15),
        data = {
            firstname    : "John",
            lastname     : "Smith",
            username     : "johnsmith",
            emailAddress : "johnsmith@coon.org",
            isRoot       : false,
            lastLogin    : Ext.Date.format(lastLoginDate, "timestamp")
        },
        expected = {
            password : ""
        },
        presenceFields = [
            "firstname",
            "lastname",
            "username",
            "emailAddress"
        ],
        modelShouldBeValid = function (t, model) {
            t.expect(model.isValid()).toBeTruthy();
        },
        modelShouldBeInvalid = function (t, model) {
            t.expect(model.isValid()).toBeFalsy();
        };


    t.beforeEach(function () {
        model = Ext.create(modelName, Ext.apply({}, data));
    });

    // +----------------------------------------------------------------------------
    // |                    =~. Unit Tests .~=
    // +----------------------------------------------------------------------------


    /**
     * Test create
     */
    t.it(Ext.String.format("Should create an instance of {0}", modelName), function (t) {
        t.expect(model instanceof getModelClass()).toBeTruthy();
    });

    /**
     * Test Schema
     */
    t.it("Should return the proper schema", function (t) {
        t.expect(model.schema instanceof getSchemaClass()).toBeTruthy();
    });

    /**
     * Test EntityName
     */
    t.it("Should return the entity name", function (t) {
        t.expect(model.schema.getEntityName(model)).toBe(entityName);
    });


    /**
     * Test getter fields
     */
    t.it("Should check the fields' values", function (t) {
        // valid model
        for (var i in data) {
            if (!Object.prototype.hasOwnProperty.call(data, i)) {
                continue;
            }

            if (i === "lastLogin") {
                t.expect(model.get("lastLogin").toString())
                    .toBe(lastLoginDate.toString());
            } else {
                t.expect(model.get(i)).toBe(
                    Object.prototype.hasOwnProperty.call(expected, i) ? expected[i] : data[i]
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
            "Should not be valid if {0} is null",
            presenceFields[i]
        );
        (function (field) {

            t.it(msg, function (t) {
                modelShouldBeValid(t, model);
                model.set(field, null);
                modelShouldBeInvalid(t, model);
            });

        })(presenceFields[i]);
    }

    /**
     * Test emailAddress field
     */
    t.it("Should not be valid if emailAddress is malformed", function (t) {
        modelShouldBeValid(t, model);
        model.set("emailAddress", "somestring@somedomain");
        modelShouldBeInvalid(t, model);
    });

    /**
    * Test password field
    */
    t.it("Should be able to set password directly", function (t) {
        modelShouldBeValid(t, model);
        model.set("password", "somestring");
        t.expect(model.get("password")).toBe("somestring");
        modelShouldBeValid(t, model);
    });

    /**
     * Test username field
     */
    t.it("Should not be valid if username equals to \"admin\"", function (t) {
        modelShouldBeValid(t, model);
        model.set("username", "admin");
        modelShouldBeInvalid(t, model);
    });
    t.it("Should not be valid if username equals to \"administrator\"", function (t) {
        modelShouldBeValid(t, model);
        model.set("username", "administrator");
        modelShouldBeInvalid(t, model);
    });
    t.it("Should not be valid if username equals to \"user\"", function (t) {
        modelShouldBeValid(t, model);
        model.set("username", "user");
        modelShouldBeInvalid(t, model);
    });
    t.it("Should not be valid if username is less than 3 characters", function (t) {
        modelShouldBeValid(t, model);
        model.set("username", "Pi");
        modelShouldBeInvalid(t, model);
    });


});
