 	try 
	{
		getResumes();
		var resumes = JSON.parse(localStorage.getItem('resumes'));
	   	$(window).on("load", function() {
	   		var result = $.grep(resumes, function(e){ return e.logged == true; });
	   		if (result.length == 1) window.location = '/final/profile/dashboard/';

			for (var i = 0; i < resumes.length; i++)
			{
				var skills = resumes[i]['skills'];
				var userSkills = [];
				for (var j = 0; j < skills.length; j++)
				{
					userSkills[j] = new Skills(skills[j].skill, skills[j].points);
				}
				users[i] = new Person(resumes[i].name, resumes[i].job, userSkills, resumes[i].information, resumes[i].mail, resumes[i].password, resumes[i].logged);
			}

   		});
   		
	}
	catch (err)
	{
		console.log(err);
	}
	

	$(".login-section__textfield").one("click", function() {
		this.value = "";
	});
	$("#create-account-btn").click(function(e) {
		createUser();
	});
	$("#login-account-btn").click(function(e) {
		loginAccount();
	});