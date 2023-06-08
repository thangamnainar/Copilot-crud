import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServiceService, PostDataResponse,GetDataResponse } from '../service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  name: string = '';
  age!: number;
  gender!: string;
  id!: number;
  boolen: boolean = false;
  stuentData!: GetDataResponse;
  // selectedSkills: string[] = [];
  // formGroup: FormGroup;



  constructor(private service: ServiceService, private router: Router, private activateRoute: ActivatedRoute) { }
  // this.formGroup = new FormGroup({
  //   skill1: new FormControl(false),
  //   skill2: new FormControl(false),
  //   skill3: new FormControl(false),
  // });
  // }
  ngOnInit(): void {
    let Id = this.activateRoute.snapshot.paramMap.get('id');
    this.boolen = Boolean(this.activateRoute.snapshot.paramMap.get('boolen'))
    this.service.getdataById(Id).subscribe((data: any) => {
      if (data.length > 0) {
        this.id = data[0].id;
        this.name = data[0].name;
        this.age = data[0].age;
        this.gender = data[0].gender;
        console.warn(this.id);

      }

      // if (data instanceof Array && data.length > 0) {
      //   const userDetails:any = data[0];
      //   this.id = userDetails.id;
      //   this.name = userDetails.name;
      //   this.age = userDetails.age;
      //   this.gender = userDetails.gender;
      // console.warn('userDetails', userDetails); 


      // }
    });
  }
  Create(value: PostDataResponse) {
    this.service.postdata<PostDataResponse>(value).subscribe((res: PostDataResponse[]) => {
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
      gender: this.gender
    }

    this.service.update<GetDataResponse>(this.stuentData).subscribe((res:GetDataResponse[]) => {
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


