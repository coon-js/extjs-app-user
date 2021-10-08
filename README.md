# @coon-js/extjs-app-user ![MIT](https://img.shields.io/npm/l/@coon-js/extjs-app-user) [![npm version](https://badge.fury.io/js/@coon-js%2Fextjs-app-user.svg)](https://badge.fury.io/js/@coon-js%2Fextjs-app-user)


This NPM package for Sencha ExtJS applications package provides functionality for managing user authentication, defining
`pre`- and `postLaunchHooks` for an [extjs-lib-comp](https://github.com/coon-js/extjs-lib-comp) application (`coon.comp.app.Application`) as well as required views.

## Installation
```bash
$ npm install --save-dev @coon-js/extjs-app-user
```
If you want to develop with `extjs-app-user`, run the `build:dev`-script afterwards:
```bash
$ npm run build:dev
```
Testing environment will then be available via

```bash
$ npm test
```

For using the package as an external dependency in an application, use
```bash
$ npm install --save-prod @coon-js/extjs-app-user
```
In your `app.json`, add this package as a requirement, and make sure your ExtJS `workspace.json`
is properly configured to look up local repositories in the `node_modules`-directory.

Example (`workspace.json`) :
```json 
{
  "packages": {
    "dir": "${workspace.dir}/node_modules/@l8js,${workspace.dir}/node_modules/@conjoon,${workspace.dir}/node_modules/@coon-js,${workspace.dir}/packages/local,${workspace.dir}/packages,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name},${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-treegrid,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-base,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-ios,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-material,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-aria,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-neutral,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-classic,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-gray,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-crisp,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-crisp-touch,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-neptune,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-neptune-touch,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-triton,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-graphite,${workspace.dir}/node_modules/@sencha/ext-${toolkit.name}-theme-material,${workspace.dir}/node_modules/@sencha/ext-calendar,${workspace.dir}/node_modules/@sencha/ext-charts,${workspace.dir}/node_modules/@sencha/ext-d3,${workspace.dir}/node_modules/@sencha/ext-exporter,${workspace.dir}/node_modules/@sencha/ext-pivot,${workspace.dir}/node_modules/@sencha/ext-pivot-d3,${workspace.dir}/node_modules/@sencha/ext-ux,${workspace.dir}/node_modules/@sencha/ext-font-ios",
    "extract": "${workspace.dir}/packages/remote"
  }
}
```

## Naming
The following naming conventions apply:

#### Namespace
`coon.user.*`
#### Package name
`extjs-app-user`
#### Shorthand to be used with providing aliases
`cn_user`

**Example:**
Class `coon.user.view.authentication.AuthWindow` has the alias `widget.cn_user-authwindow`

## Tests
Tests are written with [Siesta](https://bryntum.com/siesta)
