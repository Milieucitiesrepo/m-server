      $.fn.timeline = function( data ) {
      return this.each(function() {
      
        $el = $(this);
        $el.addClass('tl');
        if (data == 'Open' || 'Application Received') {
          var eventTmpl = $('<div class="checkoutwrap"><ul class="checkoutbar"><li class=""><a href="#">Comment Period</a></li><li class="">Public Meeting</li><li class="">Revision</li><li class="">Decision Meeting</li><li class="">Decision</li></ul>').appendTo($el);
        } else if (data == 'Application Complete, Comment Period Open') {
          var eventTmpl = $('<div class="checkoutwrap"><ul class="checkoutbar"><li class="active"><a href="#">Comment Period</a></li><li class="active">Public Meeting</li><li class="">Revision</li><li class="">Decision Meeting</li><li class="">Decision</li></ul>').appendTo($el);
        } else if (data == 'Review' || 'Planning Review Stage') {
          var eventTmpl = $('<div class="checkoutwrap"><ul class="checkoutbar"><li class="visited"><a href="#">Comment Period</a></li><li class="active">Public Meeting</li><li class="">Revision</li><li class="">Decision Meeting</li><li class="">Decision</li></ul>').appendTo($el);
        } else if (data == 'Revision') {
          var eventTmpl = $('<div class="checkoutwrap"><ul class="checkoutbar"><li class="visited"><a href="#">Comment Period</a></li><li class="visited">Public Meeting</li><li class="active">Revision</li><li class="">Decision Meeting</li><li class="">Decision</li></ul>').appendTo($el);
        } else if (data == 'Decision') {
          var eventTmpl = $('<div class="checkoutwrap"><ul class="checkoutbar"><li class="visited"><a href="#">Comment Period</a></li><li class="visited">Public Meeting</li><li class="visited">Revision</li><li class="active">Decision Meeting</li><li class="">Decision</li></ul>').appendTo($el);
        };
      });
    };