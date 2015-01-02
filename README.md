# AngularJS Accessible Modals (Beta)
[![Build Status](https://travis-ci.org/schnipz/angular-accessible-modals.png)](https://travis-ci.org/schnipz/angular-accessible-modals)
[![Dependency Status](https://david-dm.org/schnipz/angular-accessible-modals.png)](https://david-dm.org/schnipz/angular-accessible-modals)
[![devDependency Status](https://david-dm.org/schnipz/angular-accessible-modals/dev-status.png)](https://david-dm.org/schnipz/angular-accessible-modals#info=devDependencies)

AngularJS modals optimised for accessibility.

Comments and contributions are always welcome.


## Demo
 - Use can see a really simple, vanilla example [here](http://schnipz.github.io/angular-accessible-modals/).

## Usage
 - Download files from the [GitHub repo](./dist)
 - Add `angular-accessible-modals.js` and `angular-accessible-modals.css` to your code:
```html
<link rel="stylesheet" type="text/css" href="angular-accessible-modals.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.5/angular.min.js"></script>
<script src="angular-accessible-modals.js"></script>
```
 - Add the `angular-accessible-modals` module dependency to your application.
```js
angular.module('DemoApp', ['angular-accessible-modals']);
```
 - Add the directive element to your code, any child elements will be shown in the modal dialog:
```html
<div data-accessible-modal data-ng-class="{ 'active': modalState }">
  <!-- Add your modal content here -->
</div>
```
 - Ensure there is a title element with a class of `modal-title` in the modals markup, to act as the ARIA dialog label:
```html
...
  <!-- Add your modal content here -->
  <h2 class="modal-title">Modal title</h2>
...
```
 - Add the `openModal()` function to your event trigger, in this case a `<button>` element:
```html
<button type="button" data-ng-click="openModal()">Open modal</button>
```
 - Have a play, see what you think.

## Notes
In it's vanilla state this module has minimal styling and no CSS resets or overrides. This has been done deliberately under the assumption that your application already has the necessary framework in place, and therefore this module can be styled as you see fit.

Some additional CSS theme files will hopefully be available soon ;)

## License
Licensed under the [MIT license](LICENSE).
Copyright &copy; Mike Parsons