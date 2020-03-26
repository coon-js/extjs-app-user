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

/**
 * Base model for lib-cn_core representing an Aplication-User who is able
 * to sign into parts of the application.
 * The following fields are available:
 *
 * - firstname
 * - lastname
 * - username
 * - emailAddress
 * - lastLogin (informational, will not be persisted)
 * - password
 * - isRoot
 *
 * Various checks make sure that standard values for username and password
 * are prohibited. Backends persisting UserModels should take care of validating
 * nonetheless.
 */
Ext.define("coon.user.model.UserModel", {

    extend : "coon.core.data.BaseModel",

    requires : [
        "coon.user.data.user.BaseSchema"
    ],

    schema : "cn_user-datauserbaseschema",

    fields : [{
        // firstname
        name : "firstname",
        type : "string",
        validators : [{
            type : "presence"
        }]
    }, {
        // lastname
        name : "lastname",
        type : "string",
        validators : [{
            type : "presence"
        }]
    }, {
        // username
        name : "username",
        type : "string",
        validators : [{
            type : "exclusion",
            list : ["admin", "administrator", "user"]
        }, {
            type : "presence"
        }, {
            type : "length",
            min  : 3
        }]
    }, {
        // emailAddress
        name       : "emailAddress",
        type       : "string",
        validators : [{
            type : "presence"
        }, {
            type : "email"
        }]
    }, {
        // isRoot
        name       : "isRoot",
        type       : "boolean"
    }, {
        // lastLogin
        name       : "lastLogin",
        type       : "date",
        dateFormat : "timestamp",
        persist    : false
    },{
        // password
        name         : "password",
        defaultValue : "" ,
        validators : [{
            type : "exclusion",
            list : ["password", "1234", "test"]
        }]
    }]

});
