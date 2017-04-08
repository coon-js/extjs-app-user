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
Ext.define('conjoon.cn_user.model.UserModel', {

    extend : 'conjoon.cn_core.data.BaseModel',

    requires : [
        'conjoon.cn_user.data.user.BaseSchema'
    ],

    schema : 'cn_user-datauserbaseschema',

    fields : [{
        // firstname
        name : 'firstname',
        type : 'string',
        validators : [{
            type : 'presence'
        }]
    }, {
        // lastname
        name : 'lastname',
        type : 'string',
        validators : [{
            type : 'presence'
        }]
    }, {
        // username
        name : 'username',
        type : 'string',
        validators : [{
            type : 'exclusion',
            list : ['admin', 'administrator', 'user']
        }, {
            type : 'presence'
        }, {
            type : 'length',
            min  : 3
        }]
    }, {
        // emailAddress
        name       : 'emailAddress',
        type       : 'string',
        validators : [{
            type : 'presence'
        }, {
            type : 'email'
        }]
    }, {
        // isRoot
        name       : 'isRoot',
        type       : 'boolean'
    }, {
        // lastLogin
        name       : 'lastLogin',
        type       : 'date',
        dateFormat : 'timestamp',
        persist    : false
    },{
        // password
        name         : 'password',
        defaultValue : '' ,
        validators : [{
            type : 'exclusion',
            list : ['password', '1234', 'test']
        }]
    }]

});
