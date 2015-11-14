define([ 'jquery' ], function($) {
  'use strict';

  function TreeView(parent, data) {
    var wrapper = $('<ul/>').appendTo(parent);
    $.each(data, function(i, node) {
      var elem = $('<li/>').appendTo(wrapper);
      var span = $('<span/>', {
        title: node.createdBy ? 'Created by ' + node.createdBy : '',
        text: node.name
      });
      var div = $('<div/>').append(span).appendTo(elem);

      if(node.children !== undefined) {
        var icon = $('<i class="tree-icon glyphicon glyphicon-chevron-down"/>');

        div.prepend(icon).click(function(e) {
          $(this).next().slideToggle('fast');
          icon.toggleClass('glyphicon-chevron-right glyphicon-chevron-down');  
        })

        TreeView(elem, node.children);
      }
    });
  };

  return TreeView;
});
