# @coon-js/extjs-app-user 

This NPM package for Sencha ExtJS applications package provides functionality for managing user authentication, defining
`pre`- and `postLaunchHooks` for an [extjs-lib-comp](https://github.com/coon-js/extjs-lib-comp) application (`coon.comp.app.Application`) as well as required views.

## Installation
```
npm install --save-dev @coon-js/extjs-app-user
```

## Post-Install
[@coon-js/extjs-link](https://npmjs.org/coon-js/extjs-link) will start once the package was installed and guide you
through the process of creating symlinks to an existing ExtJS sdk installation.
This is only required if you want to run the tests (`./tests`), as [Siesta](https//npmjs.org/siesta-lite) relies on
an existing ExtJS installation.

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
