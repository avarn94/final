import { Component, OnInit } from '@angular/core';
declare var jQuery:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  	jQuery.slider = new Object();
	jQuery.slider.current = 0;
	jQuery.slider.total = 0;
	jQuery(document).ready(function() {
	  slider();     
	  jQuery('.stat-section__text--counter').countTo();
	});

	function slide(direction) {
	  	var target;
	    if (direction == 'back') { 
	      target = jQuery.slider.current - 1; 
	    }
	    if (direction == 'forward') { 
	      target = jQuery.slider.current + 1; 
	    }  
	    if (target == -1) { 
	      animateTo(jQuery.slider.total - 1); //Первый слайд влево
	    } 
	    else if (target == jQuery.slider.total) { 
	      animateTo(0); 
	    }  
	    else { 
	      animateTo(target); 
	    }  
	  }
		
	  function slider() {
	    var windowWidth = jQuery(window).width();
	    var slidesCount = jQuery('.slider__item').length;
	    var slidesWidth = slidesCount * windowWidth;
	  
	    jQuery.slider.total = slidesCount; 
	    
	    jQuery('.slider__item').css('width', windowWidth + 'px');
	    jQuery('.slider__list').css('width', slidesWidth + 'px');

	    
	    jQuery('.slider__nav--left').click(function() { 
	      slide('back'); 
	    }); 
	    jQuery('.slider__nav--right').click(function() { 
	      slide('forward'); 
	    }); 
	  }

	  function animateTo(target) {
	    var windowWidth = jQuery(window).width();
	    var margin = windowWidth * target; 
	    jQuery('.slider__list').css('transform','translate3d(-' + margin + 'px,0px,0px)');   
	    jQuery.slider.current = target;  
	  }
  }

  

}
