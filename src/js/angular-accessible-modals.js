/* global angular */

/**
 * AngularJS modals optimised for accessibility.
 * https://github.com/schnipz/angular-accessible-modals
 */
(function() {
  'use strict';
  var module = angular.module('accessibleModals', []);

  module.directive('accessibleModal', ['$timeout', function( $timeout ){
    return {
      restrict: 'AE',
      transclude: true,
      template: '<div class="modal-overlay" data-ng-click="closeModal()" tabindex="-1"></div>' +
        '<div class="modal-dialog" role="dialog" aria-labelledby="modal-title" aria-hidden="{{ !modalState }}">' +
          '<div role="document">' +
            '<div class="modal-content" data-ng-transclude></div>' +
            '<button class="modal-close" type="button" data-ng-click="closeModal()" aria-label="Close dialog window"><span class="modal-close-label">Close</span></button>' +
          '</div>' +
        '</div>',
      link: function( scope, element, attrs ){

        // Predefine
        var preModalFocusElement = null,
          modalFocusableElements = null,
          focusTypes = 'a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), *[tabindex], *[contenteditable]';

        // Set ARIA label ID
        $('.modal-title', element).attr('id', 'model-title');

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
            $timeout( scope.closeModal );
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