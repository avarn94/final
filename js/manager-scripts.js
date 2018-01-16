 	try {
		getResumes();
	   	var resumes = JSON.parse(localStorage.getItem('resumes'));
	   	$(window).on("load", function() {
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
	   		createData(users);

	   		$(window).keyup(function(e){ 
		    	var code = e.which; 
			    if(code == 13)e.preventDefault();
			    if(code == 13)
			    	$("#filter-button").click();
			});

		    $("#filter-button").click(function(e) {
		    	e.preventDefault();
		    	var userSkill = $("#filter-skill").val();
		    	var userPoints = $("#filter-points").val();
		    	if (userPoints == '' || userPoints == null) 
		    	{
		    		if (userSkill !== '' && userSkill !== null)
		    		{
		    			$(".cards__filter__message").fadeOut(1);
		    			newusers = users.filter(filterBySkills, userSkill);
		    			createData(newusers);
		    		}
		    		else
		    			createData(users);
		    	}
		    	else 
		    	{
		    		if (userSkill != '' && userSkill != null && userSkill.length != 0)
		    		{
		    			$(".cards__filter__message").fadeOut(1);
		    			newusers = users.filter(filterByPoints, [userSkill, userPoints]);
		    			createData(newusers);
		    		}
		    		else
		    		{
		    			$(".cards__filter__message").html("You must enter skill").fadeIn(800).css("display","inline-block");
		    			$("#filter-skill").focus();
		    		}
		    	}	
		    });
	   	});
	}
	catch (err)
	{
		console.log(err);
	}