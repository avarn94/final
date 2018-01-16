	try 
	{
		getResumes();
		var skills;
		var resumes = JSON.parse(localStorage.getItem('resumes'));
	   	$(window).on("load", function() {
	   		var indexUser = -1;
	   		
			for (var i = 0; i < resumes.length; i++)
			{
				skills = resumes[i]['skills'];
				var userSkills = [];
				for (var j = 0; j < skills.length; j++)
				{
					userSkills[j] = new Skills(skills[j].skill, skills[j].points);
				}
				if (resumes[i].mail == localStorage.getItem('loggedId')) indexUser = i;
				users[i] = new Person(resumes[i].name, resumes[i].job, userSkills, resumes[i].information, resumes[i].mail, resumes[i].password, resumes[i].logged);
			}

			if (indexUser == -1) window.location = '/final/profile/';
			users[indexUser].logged = true;
			localStorage.setItem('resumes', JSON.stringify(users));

			$("#user-fullname").val(users[indexUser].name);
			$("#user-email").val(users[indexUser].mail);
			$("#user-job").val(users[indexUser].job);
			$("#user-information").val(users[indexUser].information);
			skills = users[indexUser].skills;
			for (var i = 0; i < skills.length; i++)
			{
				$("#user-skills")
				.append('<div class="programmer-skill"><span class="programmer-skill__delete"></span>	<span class="programmer-skill__header">' + skills[i].skill + '</span><span class="programmer-skill__points">' + skills[i].points + '</span></div>');
			}

			$(document).on('click','.dashboard-section__save-profile',function(e){
	   			e.preventDefault();
	   			users[indexUser].name = $("#user-fullname").val();
	   			users[indexUser].mail = $("#user-email").val();
	   			users[indexUser].job = $("#user-job").val();
	   			users[indexUser].information = $("#user-information").val();
	   			users[indexUser].skills = skills;
	   			localStorage.setItem('resumes', JSON.stringify(users));
	   			$(".dashboard-section__save-message").append("Your resume has been saved").fadeIn(1000);
	   		});

			$(document).on('click','.dashboard-section__log-out',function(e){
				e.preventDefault();
				users[indexUser].logged = false;
				localStorage.setItem('resumes', JSON.stringify(users));
				localStorage.setItem('loggedId', '');
				window.location = '/final/profile/';
			});

			$(document).on('click','.programmer-skill__delete',function(){
		        var index = $(this).parent().index();
	        	skills.splice(index,1);
	        	$(this).parent().fadeOut('slow', function() {
	        		$(this).remove();
	        	});
		    });


			$(document).on('click','.dashboard-section__add-skill', function(e){ 
		   	 	$skill = $("#user-skill-header").val();
		        $point = $("#user-skill-points").val();
		        if ($point === '' || $point === null || $point < 0 || $point > 5 || $skill === '' || $skill === null)
		        {
		            return;
		        }
		        else 
		        {
		        	var newSkill = new Skills($skill,$point);
		        	skills.push(newSkill);
		        	addSkills(newSkill);
		        	$("#user-skill-header").val('');
		        	$("#user-skill-points").val('');
		        	e.preventDefault();
		        }
		   });
   		});
	}
	catch (err)
	{
		console.log(err);
	}