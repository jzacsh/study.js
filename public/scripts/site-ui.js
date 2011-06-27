StudySite.run.linkifyStacks = function(context) {
  $('#stacks ul#stack-listing li:not(pseudo-link)', context)
    .each(function() {
      $(this).click(function(e) {
        window.open($(this).children('a').attr('href'));
      });
    })
    .addClass('pseudo-link');
}

