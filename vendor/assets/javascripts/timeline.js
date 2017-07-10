      $.fn.timeline = function( data ) {
      return this.each(function() {

        $el = $(this);
        $el.addClass('tl');

        var statuses = {
          'Application Received': { position: 0},
          'Open': { position: 0},
          'Application Complete, Comment Period Open': { position: 1},
          'Review': { position: 2},
          'Planning Review Stage': { position: 2},
          'Revision': { position: 3},
          'Decision': { position: 4},
        }

        var $eventTmpl = $('<div class="checkoutwrap"><ul class="checkoutbar"><li><a href="#">Comment Period</a></li><li>Public Meeting</li><li>Revision</li><li>Decision Meeting</li><li>Decision</li></ul></div>')

        var status = statuses[data];
        var statusPosition = status ? status.position : 0;

        $eventTmpl.find('li:nth-of-type(' + statusPosition + ')').addClass('active');
        $eventTmpl.find('li:nth-of-type(' + statusPosition + ')').prevAll().addClass('visited');

        $el.html($eventTmpl);
      });
    };