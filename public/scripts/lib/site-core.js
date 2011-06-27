/**
 * StudySite
 *   A global object containing:
 *   - run: object of functions to be run each page.
 *   - jsEnabled(): if the client look good and we should use javascript.
 *
 * @note: these are cute little goodies stolen straight from drupal. perhaps
 * unnecessary, but will remove and unravel some other time.
 */

// set our global object
var StudySite = StudySite || { run: {} };

// decide if all seems well in the world (dom).
StudySite.jsEnabled = document.getElementsByTagName
  && document.createElement
  && document.createTextNode
  && document.documentElement
  && document.getElementById;

// run our site's various functions
StudySite.attachRunners = function() {
  var context = context || document;

  if (StudySite.jsEnabled) {
    jQuery.each(StudySite.run, function() {
      this(context);
    });
  }
}

// finally run our jQuery
if (StudySite.jsEnabled) {
  $(document).ready(function() {
    StudySite.attachRunners(this);
  });
}

