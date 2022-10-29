// Client facing scripts here

// ------------------------------------------------------------------------------------------------
// index page show all lists in individual container
// ------------------------------------------------------------------------------------------------

$(document).ready(function () {
  const createListElement = (list) => {
    // code creating the list element
    const $list = $(`
        <div class="list_container">
          <article>
          <div class="list_left">
          <a href = /lists/${list.id}><h2 id="list_name">${list.name}</h2></a>
          </div>
          <div class="list_right">
          <form method="post" action='/api/lists/${list.id}/delete?_method=DELETE'><button type="submit"><i class="fa-solid fa-trash-can"></i></button></form>
          </div>
          </article>
        </div>
      `);

    return $list;
  };

  // IMPLEMENT TO LOAD LISTS USING AJAX (SIMILAR TO TWEETER)
  const loadLists = function () {
    $.ajax({
      url: "/api/lists",
      method: "GET",
      dataType: "json",
    }).then(function (lists) {
      renderLists(lists);
    });
  };

  const renderLists = (listData) => {
    const lists = listData.lists;

    // loops through lists
    for (let i = 0; i < lists.length; i++) {
      let list = lists[i];
      list = createListElement(list);
      // takes return value and appends it to the listscontainer
      // to add it to the page so we can make sure it's got all the right elements, classes, etc.
      $(".lists").append(list);
    }
  };

  loadLists();

  $(".nav-link-logout").on("click", function () {
    $.ajax({
      url: "/api/users/login",
      method: "POST",
      dataType: "json",
    });
  });
});
