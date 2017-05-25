$(document).ready(function(){

  $('form').on('submit', function(){
      var item = $('form input');
      var todo = {item: item.val()};

      $.ajax({
        type: 'POST',
        url: '/todoList',
        data: todo,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
      return false;
  });

  $('.edit-item').on('click', function(){
      var item = $(this).parent().siblings('.todo-item').text();
      console.log(item);
      var setNewName = prompt("Enter the new name:", item);
      var newName = {item: setNewName};

      item = item.replace(/ /g, "-");
      console.log(item);
      $.ajax({
        type: 'POST',
        url: '/todoList/' + item,
        data: newName,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

  $('.move-to-trash').on('click', function(){
      var item = $(this).parent().siblings('.todo-item').text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/todoList/' + item,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
