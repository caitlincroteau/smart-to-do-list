// Client facing scripts here

// ------------------------------------------------------------------------------------------------
// show one list in individual container
// ------------------------------------------------------------------------------------------------
let taskName;
let listName;
let taskId;
let listId;
let categoryId;

const categoryIcons = {
  1: '<i class="fa-solid fa-tv"></i>',
  2: '<i class="fa-solid fa-burger"></i>',
  3: '<i class="fa-solid fa-book"></i>',
  4: '<i class="fa-solid fa-cart-shopping"></i>',
};

$(document).ready(function () {
  const createListElement = (task) => {
    listName = task.list_name;
    taskName = task.task_name;
    taskId = task.task_id;
    categoryId = task.category_id;
    listId = $("#list_id").val();

    const $list = $(`
        <div class="list_container">
          <article>
            <div class="task_left">
              <input type="checkbox" id="check_task-${taskId}">
              <h2 id="task_name">${taskName}</h2>
              <span>${categoryIcons[categoryId]}</span>
          </div>
          <div class="task_right">
              <span class="edit_task_link" id="editTaskIconLink-${taskId}"><button><i class="fa-solid fa-pen-to-square" id="editIconModalLink"></i></button></span>
              <form method="post" action='/api/tasks/${taskId}/delete?_method=DELETE'><button type="submit"><i class="fa-solid fa-trash-can"></i></button></form>
              </div>
          </article>
        </div>

        <script>

        $('.list_container > article').click(function() {
          var input = $(this).find('input');
          if (input.is(":checked")) {
            $(input).closest('article').css('background', '#E5E4E2');
          } else {
            $(input).closest('article').css('background-color', '');
          }
        })

        $('.list').on("click", '#editTaskIconLink-${taskId}', function() {

          $('#editTaskNameId').text('${taskName}');
          const editTaskModal = document.getElementById("editTaskModal");
          const closeEditModalButton = document.getElementById("closeEditModalButton");

          let displayEditModal = function() {

              $( "#editTaskForm" ).submit(function(event) {
                console.log("preventing form from being submitted");
                event.preventDefault();
                const name = $('#new_task_name').val();

                $.ajax({
                  url: '/api/tasks/${taskId}',
                  method: 'PUT',
                  dataType: 'json',
                  data: { name: name }
                })
                .then(function() {
                  exitEditModal()
                  document.location.reload()

                })
              });

            console.log('Hello from displayEditModal function');
            editTaskModal.style.display = 'block';
          };

          let exitEditModal = function() {
            console.log('Hello from closeEditModal function');
            editTaskModal.style.display = 'none';
          };

          displayEditModal();
          closeEditModalButton.addEventListener('click', exitEditModal);
        });
        </script>
        `);

    return $list;
  };

  // IMPLEMENT TO LOAD TASKS/ONE LIST USING AJAX (SIMILAR TO TWEETER)

  const loadList = function () {
    const listId = $("#list_id").val();

    $.ajax({
      url: `/api/lists/${listId}`,
      method: "GET",
      dataType: "json",
    }).then(function (list) {
      //grabbing list name element from the DOM and setting its text
      $("#list_name").text(list.list[0].list_name);
      renderList(list);
    });
  };

  //loops through tasks and appends
  const renderList = (listData) => {
    const list = listData.list;

    // loops through list
    for (let i = 0; i < list.length; i++) {
      let task = list[i];
      task = createListElement(task);

      // appending to the DOM
      // takes return value and appends it to the listscontainer
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
      $(".list").append(task);
    }
  };

  loadList();
});
