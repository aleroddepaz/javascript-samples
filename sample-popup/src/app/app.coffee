angular.module 'samplePopup', []
  .controller 'MainCtrl', ($scope) -> class
    @title: "Custom title"
    @result: "Not set yet!"
    $scope.$on 'acceptModal', (event, result) =>
      @result = "Selected ID ##{result}"
