$(function() {
  
  function init() {
    fetchMovements();
    fetchCategories();
  }
  
  $('#new-movement').submit(function(e) {
    e.preventDefault();
    createMovement();
  });
  $('#new-category').submit(function(e) {
    e.preventDefault();
    createCategory();
  });
  
  google.charts.load('current', {packages:['corechart']});
  google.charts.setOnLoadCallback(init);
  
  // Movements
    
  function fetchMovements() {
    $.get('/movements').then(function(res) {
      var rows = res.map(function(item) {
        return $('<tr>').append(
          $('<td>').text(item.concept),
          $('<td>').text(item.category),
          $('<td>').text(item.quantity)
        );
      });
      $('#movements-table').empty().append(rows);
    });
  }
  
  function createMovement() {
    var fields = $('#new-movement :input');
    var movement = {};
    fields.each(function() {
      movement[this.name] = $(this).val();
    });
    $.post('/movements', movement).then(function() {
      fields.val('');
      fetchMovements();
      fetchCategories();
    });
  }
  
  // Categories

  function fetchCategories() {
    $.get('/categories').then(function(res) {
      drawChart(res);
      
      var rows = res.map(function(item) {
        return $('<tr>').append($('<td>').text(item.name));
      });
      $('#categories-table').empty().append(rows);
      
      var options = res.map(function(item) {
        return $('<option>').text(item.name);
      });
      $('select[name=category] :enabled').remove();
      $('select[name=category]').append(options);
    });
  }
  
  function createCategory() {
    var fields = $('#new-category :input');
    var category = {};
    fields.each(function() {
      category[this.name] = $(this).val();
    });
    $.post('/categories', category).then(function() {
      fields.val('');
      fetchCategories();
    });
  }
  
  // Chart
  
  function drawChart(categories) {
    var data = [['Categories', 'Accumulated']].concat(categories.map(function(item) {
      return [item.name, item.acc];
    }));
    
    var chart = new google.visualization.PieChart($('#piechart')[0]);
    chart.draw(google.visualization.arrayToDataTable(data), {
      title: 'Summary',
      is3D: true,
    });
  }
});