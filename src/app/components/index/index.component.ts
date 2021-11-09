import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {GeneralInformationDto} from '../../models/general-information.dto';
import {SiteSettingsDto} from '../../models/site-settings.dto';
import {SkillDto} from '../../models/skill.dto';
import {EducationDto} from '../../models/education.dto';
import {AwardDto} from '../../models/award.dto';
import {ProjectCategoriesDto} from '../../models/project-categories.dto';
import {ProjectDto} from '../../models/project.dto';
import {ReferenceDto} from '../../models/reference.dto';
import {BlogDto} from '../../models/blog.dto';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {GeneralDto} from '../../models/general.dto';
import {siteOptions} from '../../../environments/site-options';

declare const $;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @ViewChild('ContactForm') contactForm: NgForm;

  body = $('body');
  html = $('html');
  windowW = $(window).width();
  windowH = $(window).height();
  clickEventType = 'click';
  isMobile = false;
  load = false;

  generalInformation: GeneralInformationDto = new GeneralInformationDto();
  siteSettings: SiteSettingsDto = new SiteSettingsDto();
  educationsList: Array<any> = new Array<any>();
  skillsList: Array<SkillDto> = new Array<SkillDto>();
  experiencesList: Array<EducationDto> = new Array<EducationDto>();
  awardsList: Array<AwardDto> = new Array<AwardDto>();
  projectCategories: Array<ProjectCategoriesDto> = new Array<ProjectCategoriesDto>();
  projectsList: Array<ProjectDto> = new Array<ProjectDto>();
  myReferencesList: Array<ReferenceDto> = new Array<ReferenceDto>();
  blogList: Array<BlogDto> = new Array<BlogDto>();
  baseUrl = environment.baseUrl;

  message = {
    name: '',
    email: '',
    phone: '',
    message: ''
  }

  constructor(private http: HttpClient,
              @Inject(DOCUMENT) private document: Document) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.isMobile = true;
      $('html').addClass('mobile');
    } else {
      this.isMobile = false;
      $('html').addClass('desktop');
    }

  }

  ngOnInit() {
    this.http.get('https://namikarifoglu.com/api/general.php').subscribe((response: GeneralDto) => {
      this.generalInformation = response.generalInformation;
      this.siteSettings = response.siteSettings;
      this.educationsList = response.continuingEducations;
      this.skillsList = response.skills;
      this.experiencesList = response.experiences;
      this.awardsList = response.awards;
      this.projectCategories = response.projectCategories;
      this.projectsList = response.projects;
      this.myReferencesList = response.myReferences;
      this.blogList = response.blogs;
      this.loadStyle();
      this.hideSitePreloader();
      setTimeout(() => {
        this.general();
      }, 200);
    });

    this.clickEventType = document.ontouchstart !== null ? 'click' : 'touchstart';

    $(window).load(() => {
      this.windowSmoothScrollOnLoad();
    });
  }

  sendMessage() {
    if (this.contactForm) {

    } else {

    }
  }

  loadStyle() {
    const head = this.document.getElementsByTagName('head')[0];

    // set title
    const title = this.document.getElementsByTagName('title')[0];
    title.innerText = this.siteSettings.SiteTitle;

    // set meta tags
    const keywordsMeta = this.document.createElement('meta');
    keywordsMeta.name = 'keywords';
    keywordsMeta.content = this.siteSettings.MetaKeys;

    const descriptionMeta = this.document.createElement('meta');
    descriptionMeta.name = 'description';
    descriptionMeta.content = this.siteSettings.Description;

    const authorMeta = this.document.createElement('meta');
    authorMeta.name = 'author';
    authorMeta.content = this.generalInformation.NameSurname;

    const CopyrightMeta = this.document.createElement('meta');
    CopyrightMeta.name = 'Copyright';
    CopyrightMeta.content = this.generalInformation.NameSurname;

    const siteNameMeta: any = this.document.createElement('meta');
    siteNameMeta.name = 'og:site_name';
    siteNameMeta.content = this.siteSettings.SiteTitle;

    const siteDescriptionMeta: any = this.document.createElement('meta');
    siteDescriptionMeta.name = 'og:description';
    siteDescriptionMeta.content = this.siteSettings.Description;

    // set dynamic css files
    const style = this.document.createElement('link');
    style.rel = 'stylesheet';
    style.href = `/assets/colors/${this.siteSettings.Css}.css`;

    head.appendChild(keywordsMeta);
    head.appendChild(descriptionMeta);
    head.appendChild(authorMeta);
    head.appendChild(CopyrightMeta);
    head.appendChild(siteNameMeta);
    head.appendChild(siteDescriptionMeta);
    head.appendChild(style);

    // set class
    const html = this.document.getElementsByTagName('html')[0];
    html.classList.add('theme-color-' + this.siteSettings.Hex);
    html.classList.add('theme-skin-' + this.siteSettings.Theme);

    this.load = true;
  }

  lockScroll() {
    const initWidth = this.body.outerWidth();
    const initHeight = this.body.outerHeight();

    const scrollPosition = [
      self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
      self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    ];
    this.html.data('scroll-position', scrollPosition);
    this.html.data('previous-overflow', this.html.css('overflow'));
    this.html.css('overflow', 'hidden');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    const marginR = this.body.outerWidth() - initWidth;
    const marginB = this.body.outerHeight() - initHeight;
    this.body.css({'margin-right': marginR, 'margin-bottom': marginB});
    this.html.addClass('lock-scroll');
  }

  unlockScroll() {
    this.html.css('overflow', this.html.data('previous-overflow'));
    const scrollPosition = this.html.data('scroll-position');
    window.scrollTo(scrollPosition[0], scrollPosition[1]);

    this.body.css({'margin-right': 0, 'margin-bottom': 0});
    this.html.removeClass('lock-scroll');
  }

  toggleMenu() {
    if (this.body.hasClass('mobile-nav-opened')) {
      this.closeMobileNav();
    } else {
      this.openMobileNav();
    }
  }

  openMobileNav() {
    this.body.addClass('mobile-nav-opened');
    this.lockScroll();
  }

  closeMobileNav() {
    this.body.removeClass('mobile-nav-opened');
    this.unlockScroll();
  }

  hideSitePreloader() {
    $('#preloader').remove();
    this.body.removeClass('loading');
  }

  general() {
    const blog_grid_selector = $('.blog-grid');
    if (blog_grid_selector.length > 0) {
      const blog_grid = blog_grid_selector.isotope({
        isOriginLeft: !siteOptions.rtl,
        itemSelector: '.blog-grid .grid-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer'
        }
      });

      blog_grid.imagesLoaded().progress(() => {
        blog_grid.isotope('layout');
      });
    }

    const grid_selector = $('.grid');
    if (grid_selector.length > 0) {

      // Isotope Initialization
      const $grid = grid_selector.isotope({
        isOriginLeft: !siteOptions.rtl,
        itemSelector: '.grid .grid-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer'
        }
      });

      $grid.imagesLoaded().progress(() => {
        $grid.isotope('layout');
      });


      // Portfolio fancybox
      let _player;
      $('.portfolioFancybox').fancybox({
        padding: 0,
        wrapCSS: 'fancybox-portfolio',
        maxWidth: '795px',
        maxHeight: '85%',
        minWidth: '250px',
        mouseWheel: 'true',
        scrolling: "no",
        autoCenter: true,
        beforeShow: () => {
          const currentID = $(this).attr("href");
          const currentPopup = $('.fancybox-portfolio ' + currentID);

          // Append current popup embed
          const currentEmbed = currentPopup.find('.inline-embed');
          if (currentEmbed.length > 0) {
            const currentEmbedType = currentEmbed.data('embed-type');
            const currentEmbedUrl = currentEmbed.data('embed-url');

            switch (currentEmbedType) {
              case "image":
                currentEmbed.empty();
                currentEmbed.addClass('inline-embed-image');
                currentEmbed.append('<img src="' + currentEmbedUrl + '" />');
                break;
              case "iframe":
                currentEmbed.empty();
                currentEmbed.addClass('inline-embed-iframe');
                currentEmbed.append('<iframe src="' + currentEmbedUrl + '" allowfullscreen></iframe>');
                break;
            }
          }
        },
        afterShow: () => {
          // Get current popup
          const currentID = $(this).attr("href");
          const currentPopup = $('.fancybox-portfolio ' + currentID);

          // Make current popup visible with css
          currentPopup.addClass('opened');
        },
        beforeClose: () => {
          // reset player
          _player = '';
        }
      });
    }

    const ref_slider = $('.ref-slider');
    if (ref_slider.length > 0) {
      for (let i = 0; i < ref_slider.length; i++) {
        const ref_slider_prev = $(ref_slider[i]).closest('.section-box').find('.slider-prev');
        const ref_slider_next = $(ref_slider[i]).closest('.section-box').find('.slider-next');

        $(ref_slider[i]).bxSlider({
          pager: false,
          controls: true,
          auto: siteOptions.refSlider.auto,
          speed: siteOptions.refSlider.speed,
          pause: siteOptions.refSlider.pause,
          autoHover: siteOptions.refSlider.autoHover,
          adaptiveHeight: siteOptions.refSlider.adaptiveHeight,
          adaptiveHeightSpeed: siteOptions.refSlider.adaptiveHeightSpeed,
          nextSelector: ref_slider_prev,
          prevSelector: ref_slider_next,
          nextText: '<i class="icon icon-chevron_right"></i>',
          prevText: '<i class="icon icon-chevron_left"></i>'
        });
      }
    }

    const post_slider = $('.post-slider');
    if (post_slider.length > 0) {
      for (let i = 0; i < post_slider.length; i++) {
        const prevSelector = $(post_slider[i]).closest('.post-media').find('.slider-prev');
        const nextSelector = $(post_slider[i]).closest('.post-media').find('.slider-next');

        $(post_slider[i]).bxSlider({
          pager: false,
          controls: true,
          speed: siteOptions.postSlider.speed,
          auto: siteOptions.postSlider.auto,
          pause: siteOptions.postSlider.pause,
          autoHover: siteOptions.postSlider.autoHover,
          nextSelector: nextSelector,
          prevSelector: prevSelector,
          nextText: '<i class="icon icon-chevron_right"></i>',
          prevText: '<i class="icon icon-chevron_left"></i>'
        });
      }
    }

    const clients_carousel = $(".clients-carousel");
    if (clients_carousel.length > 0) {
      for (let i = 0; i < clients_carousel.length; i++) {
        $(clients_carousel[i]).owlCarousel({
          lazyLoad: true,
          responsive: true,
          navigation: false,
          pagination: false,
          items: siteOptions.clientsSlider.items,
          singleItem: siteOptions.clientsSlider.singleItem,
          autoPlay: siteOptions.clientsSlider.autoPlay,
          stopOnHover: siteOptions.clientsSlider.stopOnHover,
          itemsDesktopSmall: siteOptions.clientsSlider.itemsDesktopSmall,
          itemsTabletSmall: siteOptions.clientsSlider.itemsTabletSmall,
          itemsMobile: siteOptions.clientsSlider.itemsMobile
        });
      }
    }

    this.setContactSectionHeight();
    this.setNavOption();
  }

  setNavOption() {
    const navUl = $('#nav>ul');
    navUl.onePageNav({
      currentClass: 'active',
      changeHash: true,
      scrollSpeed: 500,
      scrollThreshold: 0.5,
      easing: 'swing'
    });

    $('#mobile-nav>ul').onePageNav({
      currentClass: 'active',
      changeHash: true,
      scrollSpeed: 500,
      scrollThreshold: 0.5,
      easing: 'swing',
      begin: () => {
        this.closeMobileNav();
      }
    });

    const navWrap = $('.nav-wrap .nav');

    if (navWrap.length > 0) {
      const a = $('.nav-wrap .nav > ul > li > a');
      a.append('<span></span>');
    }
  }

  setContactSectionHeight() {
    const section = $('.section-contact .row');
    const section_box = section.find('.section-box');

    if (this.windowW > 767) {
      section_box.css('min-height', section.height() + 'px');
    } else {
      section_box.css('min-height', '0');
    }
  }

  windowSmoothScrollOnLoad() {
    if (window.location.hash && this.body.hasClass('home')) {
      $('html, body').animate({scrollTop: ($(window.location.hash).offset().top)}, 0);
    }
  }

  changeMonthToString($month) {
    switch ($month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
    }
  }

  getMonths($month) {
    const months = Object.create({
      '01': 'January',
      '02': 'February',
      '03': 'March',
      '04': 'April',
      '05': 'May',
      '06': 'June',
      '07': 'July',
      '08': 'August',
      '09': 'September',
      '10': 'October',
      '11': 'November',
      '12': 'December'
    });
    return months[$month];
  }

  explode(data: string, splitter: string): Array<string> {
    return data ? data.split(splitter) : [];
  }
}
