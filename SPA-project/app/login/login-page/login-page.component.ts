import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import { Person } from '../person';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
 
declare var jQuery: any;
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [ResumeService]
})
export class LoginPageComponent implements OnInit {
  public resumes: Person[];
  loginName: string = 'your@email.com';
  password: string = 'password';
  countLoginClick: number[] = [0,0];
  foundEmail: Person[];

  newName: string;
  newFirstName: string = '';
  newLastName: string = '';
  newEmail: string = '';
  newPassword: string = '';


  login(): any {
  	this.foundEmail = this.resumes.filter(resume => 
  		(resume.mail === this.loginName) && (resume.password === this.password));
    if (this.foundEmail.length == 1) 
    {
    	let index: number = (this.resumes.indexOf(this.foundEmail[0]));
    	this.resumes[index].logged = true;
    	sessionStorage.setItem('ApplicationUser', '' + index);
    	this.router.navigate(['/dashboard']);
    }
    else 
    {
    	jQuery(".login-section__register-message").css("display", "block").html("Your login or password is incorrect");
  		jQuery('.main').animate({
	        scrollTop: 0
	    }, 500);
	}
  }

  registerUser(): any {
  	let emailAvailable = this.resumes.filter(resume => 
  		resume.mail === this.newEmail);
  	if (emailAvailable.length !== 0)
  	{
  		jQuery(".login-section__register-message").css("display", "block").html("Email is not available, try another one, please");
  		jQuery('.main').animate({
	        scrollTop: 0
	    }, 500);
  	}
  	else 
  	{
	  	this.newName = this.newFirstName + " " + this.newLastName;
	  	let newPerson: Person = 
	  	{ 
	  		name : this.newName,
	  		job : '',
	  		skills : [],
	  		information : '',
	  		mail : this.newEmail,
	  		password : this.newPassword,
	  		logged : false
	  	};
	  	this.resumes.push(newPerson);
	  	this.changeResumes(this.resumes);
	  	jQuery(".login-section__register-message").css("display", "block").html("Your account has been created, now You can Log In with your password");
	    jQuery('.main').animate({
	      scrollTop: 0
	    }, 500);
	}
  }

  clearPassword(): any {
  	if (this.countLoginClick[0] === 0)
  	{
  		this.password = '';
  		this.countLoginClick[0]++;
  	}
  }
  clearLogin(): any {
  	if (this.countLoginClick[1] === 0)
  	{
  		this.loginName = '';
  		this.countLoginClick[1]++;
  	}
  }
  constructor(private _resumeService: ResumeService, private router: Router, private route: ActivatedRoute) { 

  }

  ngOnInit() {
  	this.getResumes().then(() => this.redirect());
  }

  redirect() {
    if (sessionStorage.getItem('ApplicationUser') && sessionStorage.getItem('ApplicationUser') != '')
      this.router.navigate(['/dashboard']);
  }
  getResumes() {
  	return this._resumeService.getResumes().then((resumes: Person[]) => this.resumes = resumes);
  }

  changeResumes(newResumes) {
  	this._resumeService.changeResumes(newResumes);
  }
}
