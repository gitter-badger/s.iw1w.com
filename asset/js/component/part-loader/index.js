var tpl = require('./tpl.html');

$.fn.part_loader = function(action) {
  var $allboxes = $(this);

  $allboxes.each(function() {
    var $box = $(this);

    $box.append(tpl);

    if (action === 'show') {
      $box
        .dimmer({
          closable: false,
          onHide: function() {
            $box.find('.ui.dimmer').remove();
          }
        });
    }

    $box.dimmer(action);
  });
}