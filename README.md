# MyTestApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.3.

## Angular Version Information

Angular CLI: 18.0.3
Node: 22.2.0
Package Manager: npm 10.7.0
OS: darwin x64

Angular: 18.0.2
... animations, common, compiler, compiler-cli, core, forms
... platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1800.3
@angular-devkit/build-angular   18.0.3
@angular-devkit/core            18.0.3
@angular-devkit/schematics      18.0.3
@angular/cli                    18.0.3
@schematics/angular             18.0.3
rxjs                            7.8.1
typescript                      5.4.5
zone.js                         0.14.7

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Installing Packages

To install the necessary packages, run:

```sh
npm install
```
## Lazy Loading for Posts Module

This project uses lazy loading for the `posts` module and its sub-components. To generate the module and components, follow these steps:

1. Generate the `posts` module and its components:

```sh
ng generate module posts --routing
ng generate component posts/posts-list --standAlone false
ng generate component posts/post-detail --standAlone false
```

Then, Configure routes for the posts module by updating the posts-routing.module.ts file:

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

