import { Component } from '@angular/core';
import { StudentServiceService } from '../services/student-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Student } from '../entities/student.service';
@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})

export class CreateStudentComponent {
  registerForm!: FormGroup;
  submitted = false;
  student!:Student;
  
  studentData: any;
  stId!: number;
  constructor(private studentService:StudentServiceService,private formBuilder: FormBuilder,private http:HttpClient) {
   
  }
  ngOnInit() {
 this.registerForm=this.formBuilder.group({
    stId: [''],
    stName: [''],
    marks: [''],
    department: [''],
    age: [''],
    mobile: ['']
});
this.studentData = {};

}
onSubmit() {
  this.submitted = true;
  this.student = this.registerForm.value;
    this.studentService.saveStudent(this.student).subscribe((response: any) => {
      console.log(response);
    
});
}
fetchStudentData(): void {
  if (!this.stId) {
    console.log("Please enter a student ID.");
    return;
  }

  this.studentService.getStudentById(this.stId).subscribe(data => {
    this.studentData = data;
  });
}
}
