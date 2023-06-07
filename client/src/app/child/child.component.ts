import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit{
  name: string = '';
  age: number = 0;
  gender: string = '';
  id!: number;
  boolen: boolean = false;
  stuentData: any;
  // selectedSkills: string[] = [];
  // formGroup: FormGroup;



  constructor(private service: ServiceService,private router:Router,private activateRoute:ActivatedRoute) { }
    // this.formGroup = new FormGroup({
    //   skill1: new FormControl(false),
    //   skill2: new FormControl(false),
    //   skill3: new FormControl(false),
    // });
  // }
  ngOnInit(): void {  
    let Id = this.activateRoute.snapshot.paramMap.get('id');  
    this.boolen = Boolean(this.activateRoute.snapshot.paramMap.get('boolen'))  
    this.service.getdataById(Id).subscribe((data) => {
      if (data instanceof Array && data.length > 0) {
        const userDetails:any = data[0];
        this.id = userDetails.id;
        this.name = userDetails.name;
        this.age = userDetails.age;
        this.gender = userDetails.gender;
        console.warn('userDetails', userDetails); 
        
      }
    });
  }
  Create(value: any) {
    this.service.postdata(value).subscribe((res) => {
      console.log(res);
    })
    // console.log(value);
    this.router.navigate(['parent']);
  }
  

  update() {
    this.stuentData = {
      id: this.id,
      name: this.name,
      age: this.age,
      gender:this.gender
  }
  
  this.service.update(this.stuentData).subscribe((res) => {
    console.log(res);
  })
  console.log(this.stuentData);
  this.router.navigate(['parent']);
  
}
  // getSelectedSkills() {
  //   const selectedSkills = [];
  //   const formValue = this.formGroup.value;

  //   if (formValue.skill1) {
  //     selectedSkills.push('python');
  //   }

  //   if (formValue.skill2) {
  //     selectedSkills.push('java');
  //   }

  //   if (formValue.skill3) {
  //     selectedSkills.push('js');
  //   }

  //   console.log(selectedSkills);
  // }
}


