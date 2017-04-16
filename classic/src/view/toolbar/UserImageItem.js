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

/**
 * Implementation of Ext.Img to show a user icon.
 * This class is used by the PackageController of app-cn_user where it gets
 * added to the permaNav in the postLaunchHook-process.
 */
Ext.define('conjoon.cn_user.view.toolbar.UserImageItem', {

    extend : 'Ext.Img',

    alias : 'widget.cn_user-toolbaruserimageitem',

    cls : 'cn_user-toolbaruserimageitem',

    glyph: 'xf007@FontAwesome'

});