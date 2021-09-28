# @coon-js/extjs-app-user 

This NPM package for Sencha ExtJS applications package provides functionality for managing user authentication, defining
`pre`- and `postLaunchHooks` for an [extjs-lib-comp](https://github.com/coon-js/extjs-lib-comp) application (`coon.comp.app.Application`) as well as required views.

## Installation
```
npm install --save-dev @coon-js/extjs-app-user
```
If you want to develop with `extjs-app-user`, run the `build:dev`-script afterwards:
```bash
npm run build:dev
```
Testing environment will then be available via

```bash
npm test
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

# Usage
## Requirements
This package requires the [extjs-lib-comp](https://github.com/coon-js/extjs-lib-comp) package of the [coon.js](https://github.com/coon-js) project.
