angular.module 'samplePopup'

  .directive 'myDirective', ($compile, $templateCache) ->
    restrict: 'A'
    template: '<button class="btn btn-info">HI</button>'
    scope:
      init: '&myDirective'
    link: (scope, elem) ->
      $(elem).magnificPopup
        items:
          src: $templateCache.get('popup-base.tpl.html')
        callbacks:
          open: ->
            scope.modal.title = scope.init()
            $compile($ '#white-popup') scope
            scope.$apply()
    controller: ($scope, Entities) ->
      $scope.modal =
        submit: ->
          $.magnificPopup.close()
          $scope.$emit 'acceptModal', $scope.modal.selected
        entities: Entities.get()