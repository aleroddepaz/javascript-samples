angular.module 'samplePopup'
  .directive 'myDirective', ($compile, $templateCache) ->
    restrict: 'A'
    template: '<button class="btn btn-info">HI</button>'
    scope:
      title: '=myDirective'
    link: (scope, elem) ->
      $(elem).magnificPopup
        items:
          src: $templateCache.get('popup-base.tpl.html')
        callbacks:
          open: ->
            $compile($ '#white-popup') scope
            scope.$apply()
    controller: ($scope, Entities) -> class
      @submit: =>
        $.magnificPopup.close()
        $scope.$emit 'acceptModal', @selected
      @entities: Entities.get()
    controllerAs: 'modal'
