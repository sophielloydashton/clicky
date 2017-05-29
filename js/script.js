$(function() {
  var settings = { continuous : true, pageStyles: true, transitions : { content : '', buttons : '' } };
  var pages    = $("#slider #pages li").length;
  var currentPage;
  var reachedLastPage, reachedFirstPage;

  if (pages > 0)
  {
    // Generate navigation bullets
    for (var i = 0; i < pages; i++)
      $(".navigation").append('<li><a href="#"><span></span></a></li>');

    // Hide navigation arrows when there is a single page
    if (pages == 1)
    {
      $("#slider #prev").addClass("hidden");
      $("#slider #next").addClass("hidden");
    }

    //
    if(!settings.continuous)
      $("#slider #prev").addClass("hidden");
    // Set page style if needed
    if (settings.pageStyles)
      $("#slider").addClass("page1");

    // Select the first page and element in the navigation
    $("#slider #pages :first-child").addClass("selected");
    $("#slider .navigation :first-child a").addClass("selected");
  }

  // Navigation bullets
  $(".navigation a").click(function(e) {
    e.preventDefault();
    // Remove the selected class from the currently selected indicator
    $(this).parent().parent().find(".selected").removeClass("selected");
    // Make the clicked indicator the selected one
    $(this).addClass("selected");

    updateSlideshowForSelectedPage();
  });

  // Navigation arrows
  $("#next").click(function(e) {
    goToNext();
  });

  $("#prev").click(function(e) {
    goToPrev();
  });

  // Keyboard shortcuts
  $("body").keyup(function(e) {
    if (e.keyCode == 39) // Key right
      goToNext();
    else if (e.keyCode == 37) // Key left
      goToPrev();
  });

  function goToNext() {
    reachedLastPage = $(".navigation .selected").parent().index()+1 >= pages;

    if (reachedLastPage && settings.continuous)
    {
      $(".navigation .selected").removeClass("selected")
      $(".navigation :first-child a").addClass("selected");
    }
    else if (reachedLastPage && !settings.continuous)
      return;
    else
      $(".navigation .selected").removeClass("selected").parent().next().find("a").addClass("selected");

    updateSlideshowForSelectedPage();
  }

  function goToPrev() {
    reachedFirstPage = $(".navigation .selected").parent().index() <= 0;

    if (reachedFirstPage && settings.continuous)
    {
      $(".navigation .selected").removeClass("selected")
      $(".navigation :last-child a").addClass("selected");
    }
    else if (reachedFirstPage && !settings.continuous)
      return;
    else
      $(".navigation .selected").removeClass("selected").parent().prev().find("a").addClass("selected");

    updateSlideshowForSelectedPage();
  }

  function updateSlideshowForSelectedPage() {
    var index = $(".navigation .selected").parent().index(),
        classIndex = parseInt(index+1, 10),
        reachedLastPage = $(".navigation .selected").parent().index()+1 >= pages,
        reachedFirstPage = $(".navigation .selected").parent().index() <= 0;

    if (settings.pageStyles)
      $("#slider").attr("class", "page" + classIndex);

    if(!settings.continuous)
    {
      reachedLastPage ? $("#slider #next").addClass("hidden") : $("#slider #next").removeClass("hidden");
      reachedFirstPage ? $("#slider #prev").addClass("hidden") : $("#slider #prev").removeClass("hidden");
    }

    $("#pages .selected").removeClass("selected");
    $("#pages li:nth-child(" + classIndex + ")").addClass("selected");
  }
});
