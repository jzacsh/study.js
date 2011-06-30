StudySite.run.collapseApi = function(context) {
  var $api = $('#api.section', context);
  var $h2 = $('h2', $api);

  $h2.click(function() {
    $('.content', $api).toggle('slide');
    if ($h2.hasClass('expandable')) {
      $h2.removeClass('expandable');
      $h2.addClass('collapsable');
    }
    else {
      $h2.addClass('expandable');
      $h2.removeClass('collapsable');
    }
    console.log($('.content', $api).attr('style'));
  });
}

// .expandable
// .collapsable

