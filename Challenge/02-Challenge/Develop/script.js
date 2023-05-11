// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
$(function () {
  // Add click listener for save buttons
  $(".saveBtn").on("click", function() {
    // Get the user input from the textarea
    var description = $(this).siblings(".description").val();
    // Get the id of the containing time-block
    var id = $(this).parent().attr("id");
    // Save the user input in local storage using the id as a key
    localStorage.setItem(id, description);
  });

  // Apply past, present, or future classes to time-blocks
  function updateHourClasses() {
    // Get the current hour using Day.js
    var currentHour = dayjs().hour();

    // Loop through each time-block
    $(".time-block").each(function() {
      // Get the hour of the time-block using its id
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Remove any existing past, present, or future classes
      $(this).removeClass("past present future");

      // Add the appropriate class based on the current hour and block hour
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  // Get any saved user input and update the corresponding textarea elements
  function updateDescriptions() {
    // Loop through each time-block
    $(".time-block").each(function() {
      // Get the id of the time-block
      var id = $(this).attr("id");

      // Get the saved user input from local storage
      var description = localStorage.getItem(id);

      // Update the textarea element with the saved user input
      $(this).find(".description").val(description);
    });
  }

  // Display the current date in the header of the page
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Call the functions to apply classes and update descriptions
  updateHourClasses();
  updateDescriptions();

  // Set an interval to update the hour classes and descriptions every minute
  setInterval(function() {
    updateHourClasses();
    updateDescriptions();
  }, 60000);
});
