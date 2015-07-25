angular.module 'samplePopup', []

  .controller 'MainCtrl', ($scope) -> class
    title: "Custom title"
    result: "Not set yet!"
    foo: -> @title
    $scope.$on 'acceptModal', (event, result) ->
      @result = "Selected ID ##{result}"