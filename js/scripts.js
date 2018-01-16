function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Person = function Person(name, job, skills, information, mail, password, logged) {
  _classCallCheck(this, Person);

  this.name = name;
  this.job = job;
  this.skills = skills;
  this.information = information;
  this.mail = mail;
  this.password = password;
  this.logged = logged;
};

var Skills = function Skills(skill, points) {
  _classCallCheck(this, Skills);

  this.skill = skill;
  this.points = points;
};

function getResumes() {
  if (! localStorage.getItem('resumes')) {
    $.getJSON('/final/data/resume.json', function(data) {
      localStorage.setItem('resumes', JSON.stringify(data));
    });
  }
}

function slide(direction) {
  if (direction == 'back') { 
    var $target = $.slider.current - 1; 
  }
  if (direction == 'forward') { 
    var $target = $.slider.current + 1; 
  }  
  if ($target == -1) { 
    animateTo($.slider.total - 1); //Первый слайд влево
  } 
  else if ($target == $.slider.total) { 
    animateTo(0); 
  }  
  else { 
    animateTo($target); 
  }  
}

function slider() {
  var windowWidth = $(window).width();
  var slidesCount = $('.slider__item').length;
  var slidesWidth = slidesCount * windowWidth;
  
  $.slider.total = slidesCount; 
    
  $('.slider__item').css('width', windowWidth + 'px');
  $('.slider__list').css('width', slidesWidth + 'px');

    
  $('.slider__nav--left').click(function() { 
    slide('back'); 
  }); 
  $('.slider__nav--right').click(function() { 
    slide('forward'); 
  }); 
}

function animateTo(target) {
  var $windowWidth = $(window).width();
  var $margin = $windowWidth * target; 
  $('.slider__list').css('transform','translate3d(-' + $margin + 'px,0px,0px)');   
  $.slider.current = target;  
}

function filterBySkills(obj) {
  if ('skills' in obj && (obj.skills[0] instanceof Skills) && obj.skills.length > 0)
  {
    for (var i = 0; i < obj.skills.length; i++)
    {
      if (obj.skills[i].skill.toLowerCase() == this.toLowerCase() || this == '' || this == null) return true;
    }
  }
  else 
    return false;
}

function filterByPoints(obj) {
  if ('skills' in obj && (obj.skills[0] instanceof Skills) && obj.skills.length > 0)
  {
    for (var i = 0; i < obj.skills.length; i++)
    {
      if (obj.skills[i].points == this[1] && obj.skills[i].skill.toLowerCase() == this[0].toLowerCase()) return true;
    }
  }
  else 
    return false;
}

function createData(users) {
  $(".cards__container").empty();
  for (var i = 0; i < users.length; i++)
  {
    $(".cards__container").append('<div class="cards__resume" id = "card-' + (i + 1) + '"></div>');
    $('#card-'+ (i + 1)).append('<h2 class="cards__resume__name">' + users[i].name + '</h2><div class="cards__resume__field"><span>E-mail: </span><span>' + users[i].mail + '</span></div><div class="cards__resume__field"><span>Job pretends: </span><span>' + users[i].job + '</span></div><div class="cards__resume__skill-field"></div>');
    for (var j = 0; j < users[i].skills.length; j++)
    {
      $('#card-'+ (i + 1) + ' > .cards__resume__skill-field').append('<div class = "programmer-skill"><span class="programmer-skill__header">' + users[i].skills[j].skill + '</span><span class="programmer-skill__points">' + users[i].skills[j].points + '</span></div>');
    }
  }
}

function loginAccount() {
  var mail = $("#login-mail").val();
  var password = $("#login-password").val();
  foundEmail = users.filter(filterEmail, [mail, password]);
  if (validateEmail(mail) && foundEmail.length == 1) 
  {
    localStorage.setItem('loggedId', foundEmail[0].mail);
    window.location = '/final/profile/dashboard/';
  }
  else 
  {
    $(".login-section__register-message").css("display", "block").html("Your login or password is incorrect");
  }
}

function filterEmail(obj) {
  if ('mail' in obj && 'password' in obj && obj.mail == this[0] && obj.password == this[1])
  {
    return true
  }
  else 
    return false;
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateForm(name, lastname, mail, password) {
  if (name == "" || name == null || 
      lastname == "" || lastname == null || 
      (validateEmail(mail) === false) ||
      password == "" || password == null) {
      return false;
  }
  else 
    return true;
}

function createUser() {
  var name = $("#register-name").val();
  var lastname = $("#register-lastname").val();
  var mail = $("#register-mail").val();
  var password = $("#register-password").val();
  if (validateForm(name, lastname, mail, password))
  {
    var result = $.grep(users, function(e){ return e.mail == mail; });
    if (result.length != 0) 
    {
      $(".login-section__register-message").css("display", "block").html("Your E-mail is already used, try another one");
      $('.main').animate({
        scrollTop: 0
      }, 500);
    }
    else 
    {
      var fullName = name + ' ' + lastname;
      var newUser = new Person(fullName, '', '', '', mail, password, false);
      $(".login-section__register-message").css("display", "block").html("Your account has been created, now You can Log In with your password");
      $('.main').animate({
        scrollTop: 0
      }, 500);
      users.push(newUser);
      userJson = JSON.stringify(users);
      localStorage.setItem('resumes', userJson);
    }
  }
}

function addSkills(skill) {
  var node = '<div class="programmer-skill"><span class="programmer-skill__delete"></span>  <span class="programmer-skill__header">' + skill.skill + '</span><span class="programmer-skill__points">' + skill.points + '</span></div>';
  jQuery("#user-skills").hide().append(node).fadeIn(600);  
}

$(document).ready(function() {
  $(".mobile-menu-button").click(function() {
    $("body").toggleClass("menu-opened");
  });
});

var users = [];
var newusers = [];