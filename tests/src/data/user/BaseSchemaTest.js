/**
 * conjoon
 * (c) 2007-2017 conjoon.org
 * licensing@conjoon.org
 *
 * app-cn_user
 * Copyright (C) 2017 Thorsten Suckow-Homberg/conjoon.org
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

describe('conjoon.cn_user.data.user.BaseSchemaTest', function(t) {

    t.it("Should properly create the schema and check for default config", function(t) {

        var schema = Ext.create('conjoon.cn_user.data.user.BaseSchema');

        t.expect(schema instanceof conjoon.cn_core.data.schema.BaseSchema).toBe(true);

        t.expect(schema.alias).toContain('schema.cn_user-datauserbaseschema');

        t.expect(schema.getNamespace()).toBe('conjoon.cn_user.model.');

        t.expect(schema.id).toBe('cn_user-datauserbaseschema');


    });

});
