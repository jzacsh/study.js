StudySite.run.linkifyStacks = function(context) {
  $('#stacks ul#stack-listing li:not(pseudo-link)', context)
    .each(function() {
      $(this).click(function() {
        $(this).children('a').not('.clicked')
          .addClass('clicked')
          .trigger('click');
      });
    })
    .addClass('pseudo-link');
}

