requirejs.config({
  baseUrl: 'js',
  paths: {
    jquery: 'lib/jquery-2.1.4',
    bootstrap: 'lib/bootstrap'
  },
  shim: {
    bootstrap: [ 'jquery' ]
  },
  deps: [ 'bootstrap' ]
});

require([ 'jquery', 'src/treeview' ], function($, TreeView) {
  $(function() {
    var data = [
      {
        name: 'Food',
        createdBy: 'John Doe',
        children: [
          {
            name: 'Fruit',
            createdBy: 'Foo Bar',
            children: [
              {
                name: 'Red',
                createdBy: 'John Doe',
                children: [
                  {
                    name: 'Cherry',
                    createdBy: 'John Doe'
                  }
                ]
              }
            ]
          },
          {
            name: 'Meat',
            createdBy: 'John Doe',
            children: [
              {
                name: 'Beef'
              },
              {
                name: 'Pork'
              }
            ]
          }
        ]
      },
      {
        name: 'Drink'
      }
    ];

    TreeView('#food-tree', data);
  });
});
