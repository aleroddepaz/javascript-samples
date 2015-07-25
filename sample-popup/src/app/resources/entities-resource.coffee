angular.module 'samplePopup'

  .factory 'Entities', ->
    get: ->
      [
        {id: 1, username: 'Foo', age: 18},
        {id: 2, username: 'Bar', age: 20},
        {id: 3, username: 'Tar', age: 25}
      ]
