import { Injectable } from '@angular/core';
import { RESUMES } from './resumes';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ResumeService {
  private resumes = Promise.resolve(RESUMES);

  getResumes()  {

      return this.resumes;

  }

 changeResumes(newResumes: any) {
 	this.resumes = newResumes;
 }


}