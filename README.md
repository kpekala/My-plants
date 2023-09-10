# MyPlants

## Main features to be developed

- Viewing your collection of plants
- Adding plants to your collection
- Adding plant species
- Searching through database of species

## Tech stack

- Angular
- Firebase
- Bootstrap 5
- Typescript
- Sass
- Coffee

## Development plan

- Add simple navigation bar ✅

- [Find view] Show mocked plant species ✅
    - Create types service with mocked data ✅
    - Create type component with simple design ✅
- [Authentication] Add possibility for user to login/register ✅
    - Create simple view for logging in ✅
    - login via firebase and move to main app layout ✅
- [Plant database] Add fetching plant species from backend ✅
    - create about 10 plants in firestore ✅
    - fetch them ✅
    - show them in the view ✅
- [Plant view] Add view of the single species
    - create design with mocked data
    - add button opening/closing the view 
    - connect view with real data

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also
use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
