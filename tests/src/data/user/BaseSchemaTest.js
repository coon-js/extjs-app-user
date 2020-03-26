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

describe("coon.user.data.user.BaseSchemaTest", function (t) {

    t.it("Should properly create the schema and check for default config", function (t) {

        var schema = Ext.create("coon.user.data.user.BaseSchema");

        t.expect(schema instanceof coon.core.data.schema.BaseSchema).toBe(true);

        t.expect(schema.alias).toContain("schema.cn_user-datauserbaseschema");

        t.expect(schema.getNamespace()).toBe("coon.user.model.");

        t.expect(schema.id).toBe("cn_user-datauserbaseschema");


    });

});
