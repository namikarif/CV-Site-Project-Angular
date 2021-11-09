import {Directive, ElementRef} from '@angular/core';
import {siteOptions} from '../../environments/site-options';

declare const $;
let isMobile = false;

if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
  $('html').addClass('mobile');
} else {
  isMobile = false;
  $('html').addClass('desktop');
}

@Directive({
  selector: '[naAppear]'
})
export class AppearDirective {

  constructor(private element: ElementRef) {
    setTimeout(() => {
      $(element.nativeElement)
        .appear()
        .on('appear', (event, affected) => {
          for (let i = 0; i < affected.length; i++) {
            $(affected[i]).addClass('animated');
          }
        });
      $.force_appear();
    }, 100);
  }
}

@Directive({
  selector: '[skillsWidth]'
})
export class SkillsWidthDirective {

  constructor(private element: ElementRef) {

    if (!isMobile) {
      $(element.nativeElement)
        .appear()
        .on('appear', (event, $affected) => {
          this.setProgressBarsWidth($affected)
        });
      $.force_appear();
    } else {
      this.setProgressBarsWidth($(element.nativeElement))
    }
  }

  setProgressBarsWidth(bars) {
    for (let i = 0; i < bars.length; i++) {
      let $bar_fill = $(bars[i]).find('.bar-fill');
      const barWidth = $bar_fill.data('width');
      $bar_fill.width(barWidth);
    }
  }
}

@Directive({
  selector: '[timeline]'
})
export class TimeLineDirective {

  constructor(private element: ElementRef) {
    setTimeout(() => {
      if (window.innerWidth > 600) {
        $(this.element.nativeElement).each(() => {
          const timeLineBar = $(this.element.nativeElement).find('.timeline-bar');
          let timeLineBarHeight = 0;
          const timeLineWrap = $(this.element.nativeElement).find('.timeline-inner');
          let timeLineWrapHeight = 0;
          const timeLineGutter = siteOptions.timeline.itemsSpace;

          let column1Top = 0;
          let column1TopPrev = 0;
          let column1LastElementHeight = 0;
          let column1Elements = $(this.element.nativeElement).find('.timeline-box-left');

          let column2Top = siteOptions.timeline.topSpace;
          let column2TopPrev = 0;
          let column2LastElementHeight = 0;
          let column2Elements = $(this.element.nativeElement).find('.timeline-box-right');

          // Switch top params for RTL
          if (siteOptions.rtl) {
            column1Top = column2Top;
            column2Top = 0;
          }

          const animate = $('.animate-right, .animate-left');

          animate.appear();
          animate.on('appear', (event, affected) => {
            for (let i = 0; i < affected.length; i++) {
              $(affected[i]).addClass('animated');
            }
          });
          $.force_appear();

          // Positioning first column elements
          for (let i = 0; i < column1Elements.length; i++) {
            $(column1Elements[i]).css({'position': 'absolute', 'left': '0', 'top': column1Top + 'px'});
            column1TopPrev = column1Top;
            column1Top = column1Top + $(column1Elements[i]).height() + timeLineGutter;
            column1LastElementHeight = $(column1Elements[i]).height();
          }

          // Positioning second column elements
          for (let i = 0; i < column2Elements.length; i++) {
            $(column2Elements[i]).css({'position': 'absolute', 'right': '0', 'top': column2Top + 'px'});
            column2TopPrev = column2Top;
            column2Top = column2Top + $(column2Elements[i]).height() + timeLineGutter;
            column2LastElementHeight = $(column2Elements[i]).height();
          }

          // Set container & bar height's
          if (column1Top > column2Top) {
            timeLineWrapHeight = column1Top - timeLineGutter;
          } else {
            timeLineWrapHeight = column2Top - timeLineGutter;
          }

          if (column1TopPrev > column2TopPrev) {
            timeLineBarHeight = column1TopPrev;
          } else {
            timeLineBarHeight = column2TopPrev;
          }

          timeLineWrap.height(timeLineWrapHeight);
          timeLineBar.css({'top': '80px', 'height': timeLineBarHeight + 'px'});
        });
      } else {
        $('.timeline-bar').attr('style', '');
        $('.timeline-box').attr('style', '');
        $('.timeline-inner').attr('style', '');
      }
    }, 100);
  }
}

@Directive({
  selector: '[header]'
})
export class HeaderDirective {

  constructor(private element: ElementRef) {
    this.stickyNavigationAppear();

    $(window).scroll(() => {
      this.stickyNavigationAppear();
    });

    $(window).scroll(() => {
      this.stickyNavigationAppear();
    });
  }

  stickyNavigationAppear() {
    const header = $('.header');
    const stickyNav = $('.head-bar');
    let stickyNavHeight = 0;
    if (stickyNav.length > 0) {
      stickyNav.addClass('animated');
      if ($(window).width() > 767 && !isMobile) {
        if (stickyNavHeight < stickyNav.outerHeight()) {
          stickyNavHeight = stickyNav.outerHeight();
          header.css('min-height', stickyNavHeight + 'px');
        }

        const scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNav.outerHeight()) {
          stickyNav.addClass('head-sticky');
        } else {
          stickyNav.removeClass('head-sticky');
        }
      } else {
        stickyNav.removeClass('head-sticky');
        header.css('min-height', '0px');
      }

    }
  }
}
