  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Activity } from '../_models/activity';
import { ActivityService } from '../_services/activity.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';



  @Component({
    selector: 'app-presentator-editor',
    templateUrl: './presentator-editor.component.html',
    styleUrls: ['./presentator-editor.component.css']
  })
  export class PresentatorEditorComponent implements OnInit {

  form = new FormGroup({
      "title": new FormControl("", Validators.required),
      "content": new FormControl("", Validators.required),
      "initText": new FormControl("", Validators.required),
      "endText": new FormControl("", Validators.required),
      "timeRange": new FormControl("", Validators.required),
  });

  public activity:Activity = new Activity()
  public id: string | null = "";

  constructor(private activityService: ActivityService,protected _sanitizer: DomSanitizer,private route: ActivatedRoute) { }

  public get f(){
    return this.form.controls;
  }

  public submit(){
    this.activity.preview = false
    if(this.id){
      this.activityService.update(this.activity, this.id).subscribe({
        next: data => {
          this.activity = data
        },
        error: err => {              
        }
      });
    }
    else{
      this.activityService.save(this.activity).subscribe({
        next: data => {
          this.activity = data
        },
        error: err => {              
        }
      });
    }
    
  }

  public preview($event:any){
        
    this.activity.preview = true
    this.activityService.save(this.activity).subscribe({
      next: data => {
        this.activity = data
      },
      error: err => {              
      }
    });
    
  }


    public getUrl(): string {
      return `http://localhost:8081/presentator/${this.activity._id}`
    }
    

  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      if(this.id){
        this.activityService.getActivityByID(this.id).subscribe({
          next: data => {
            this.activity = data  }})
      }
      
    }

}
