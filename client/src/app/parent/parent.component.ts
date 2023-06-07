import { Component ,OnInit} from '@angular/core';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit{
  public getData:any;
  constructor(private service:ServiceService,private route:Router) { }
  ngOnInit(): void {
    this.service.getdata().subscribe((res)=>{
      this.getData=res;
    })
  }
  delete(id:any){
    this.service.delete(id).subscribe((res)=>{
      console.log(res);
      console.log('ppppppp',id);
      
      this.ngOnInit();
    })
  }
  // update(id:any){
  //   this.service.update(id).subscribe((res)=>{
  //     console.log(res);
  //     this.ngOnInit();
  //   })
  // }
  edit(id:any){
    let boolean=true;
    this.route.navigate(['child',id,boolean]);

  }
}
