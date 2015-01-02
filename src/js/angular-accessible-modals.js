/* global angular */

/**
 * An AngularJS modal implementation optimised for accessibility.
 * https://github.com/schnipz/angular-accessible-modals
 */
(function() {
  'use strict';
  var module = angular.module('accessibleModals', []);

  module.directive('accessibleModal', ['$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function( scope, element, attrs ) {

        var preModalFocusElement = null,
          focusTypes = 'a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), *[tabindex], *[contenteditable]';

        var modalFocusableElements = null;

        scope.openModal = function(){
          scope.modalState = true;

          // Save current focus
          preModalFocusElement = $(':focus');

          // Allow time for browser rendering
          $timeout(function(){

            // Set modal focusable elements
            modalFocusableElements = $('.modal-dialog', element).find( focusTypes ).filter( ':visible' );

            // Set new focus in the modal
            modalFocusableElements.first().focus();

            // Bind modal keypresses to useful functions
            element.keydown( bindKeys );
          });
        };

        scope.closeModal = function(){
          scope.modalState = false;

          // Load previous focus
          preModalFocusElement.focus();
        };

        var bindKeys = function(e){

          // Close modal on Escape keypress
          if( e.which == 27 ){
            scope.closeModal();
          }

          // Loop focus on tab keypress
          if( e.which == 9 ){

            var modalFocusElementIndex = modalFocusableElements.index( $(':focus') );

            // Shift + Tab
            if( e.shiftKey ){
              if( modalFocusElementIndex === 0 ){
                modalFocusableElements.get( modalFocusableElements.length - 1 ).focus();
                e.preventDefault();
              }

            // Tab
            }else{
              if( modalFocusElementIndex == modalFocusableElements.length - 1 ){
                modalFocusableElements.get( 0 ).focus();
                e.preventDefault();
              }
            }
          }

        };
      }
    };
  }]);

})();