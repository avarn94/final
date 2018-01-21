import { Component, OnInit } from '@angular/core';
import { ResumeService } from '../resume.service';
import { Person } from '../person';

@Component({
  selector: 'app-view-resume',
  templateUrl: './view-resume.component.html',
  styleUrls: ['./view-resume.component.css'],
  providers: [ResumeService]
})
export class ViewResumeComponent implements OnInit {
  public resumes: Person[];
  resumesCopy: Person[];
  isDataAvailable: boolean = false;
  skillName: string = '';
  points: number = 0;
  viewType: boolean = false;
  selectedValue: string = "1";
  p: number = 1;

  constructor(private _resumeService: ResumeService) { }

  ngOnInit() {
  	this.getResumes().then(() => {
    	this.isDataAvailable = true;
    	this.cloneResumes();
    }); // Now has value;
  }
  
  getResumes() {
  	return this._resumeService.getResumes().then((resumes: Person[]) => this.resumes = resumes);
  }

  skillFilling() {
  	if (this.skillName === '' || this.skillName === null) this.resumesCopy = this.resumes;
  	else 
  	{
	  	this.resumesCopy = this.resumes.filter(resume => 
	  	{
	  		for (let i = 0; i < resume.skills.length; i++)
	  		{
	  			if (resume.skills[i].skill.toLowerCase().indexOf(this.skillName.toLowerCase()) !== -1) return true;
	  		}
	    });
	}
  }

  cloneResumes() {
  	this.resumesCopy = this.resumes.slice(0);
  }
  listView() {
  	this.viewType = true;
  }
  tableView() {
  	this.viewType = false;
  }
  sortResumes() {
  	if (this.selectedValue === "1")
  	{
  		this.resumesCopy = this.resumesCopy.sort((n1,n2) => {
  			if (n1.name.toLowerCase() < n2.name.toLowerCase()) {
			    return -1;
			}

			if (n1.name.toLowerCase() > n2.name.toLowerCase()) {
			    return 1;
			}
	
		    return 0;
		});
	}
	else 
	{
		this.resumesCopy = this.resumesCopy.sort((n1,n2) => {
  			if (n1.job > n2.job) {
			    return 1;
			}

			if (n1.job < n2.job) {
			    return -1;
			}

			return 0;
		});
	}
  	
  } //sort resumes
  

}
