import { Component, OnInit  } from '@angular/core';
import { ResumeService } from '../resume.service';
import { Person } from '../person';
import { Skills } from '../skills';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ResumeService]
})
export class DashboardComponent implements OnInit {
  public resumes: Person[];
  indexString: string = sessionStorage.getItem('ApplicationUser');
  index: number = +this.indexString;
  name: string;
  job: string;
  information: string;
  mail: string;
  skills: Skills[];
  isDataAvailable:boolean = false;
  newSkill: string;
  newPoint: number;

  constructor(private _resumeService: ResumeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.getResumes().then(() => {
  		this.getContent();
    	this.isDataAvailable = true;
    }); // Now has value;
  }

  getResumes() {
  	return this._resumeService.getResumes().then((resumes: Person[]) => this.resumes = resumes);
  }

  getContent() {
  	if (!sessionStorage.getItem('ApplicationUser') || sessionStorage.getItem('ApplicationUser') == '' || sessionStorage.getItem('ApplicationUser') == null) this.router.navigate(['/login']);
  	this.name = this.resumes[this.index].name;
  	this.job = this.resumes[this.index].job;
  	this.information = this.resumes[this.index].information;
  	this.mail = this.resumes[this.index].mail;
  	this.skills = this.resumes[this.index].skills;
  }

  deleteSkill(skill) {
  	this.skills.splice(this.skills.indexOf(skill),1);
  }

  addSkill() {
    if (this.newPoint && this.newPoint > 0 && this.newPoint < 6 && this.newSkill && this.newSkill !== '' && this.newSkill !== null)
    {
    	let addedSkill: Skills = 
    	{ 
    	  	skill : this.newSkill,
    	  	points : this.newPoint,
    	};
    	this.skills.push(addedSkill);
    }
  }

  saveProfile() {
  	this.resumes[this.index].skills = this.skills;
  	this.changeResumes(this.resumes);
  	jQuery(".dashboard-section__save-message").fadeIn(1000).html("Your data is saved").fadeOut(4000);
  }

  changeResumes(newResumes) {
  	this._resumeService.changeResumes(newResumes);
  }

  logOut() {
  	this.resumes[this.index].logged = false;
  	this.changeResumes(this.resumes);
  	sessionStorage.setItem('ApplicationUser', '');
  	this.router.navigate(['/login']);
  }
}
