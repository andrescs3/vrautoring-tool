import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Activity } from '../_models/activity';
import { ActivityService } from '../_services/activity.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../_services/token-storage.service';
import Handsontable from 'handsontable/base';
import { HotTableModule, HotTableRegisterer } from '@handsontable/angular';
import { createSpreadsheetData } from 'handsontable/helpers';


  @Component({
    selector: 'app-presentator-editor',
    templateUrl: './presentator-editor.component.html',
    styleUrls: ['./presentator-editor.component.css']
  })
  export class PresentatorEditorComponent implements OnInit, AfterViewInit {



  data: any[] = []




  form = new FormGroup({
      "title": new FormControl("", Validators.required),
      "content": new FormControl("", Validators.required),
      "initText": new FormControl("", Validators.required),
      "endText": new FormControl("", Validators.required),
      "timeRange": new FormControl("", Validators.required),
      "color": new FormControl("", Validators.required),
  });

  public activity:Activity = new Activity()
  public id: string | null = "";
  public copy: boolean = false;
  private userid: string = "";
  public color: string = '#ffffff'
  private hotRegisterer = new HotTableRegisterer();
  public tableID = 'hotInstance';

  hotSettings: Handsontable.GridSettings = {
    data: this.data,
    startRows: 5,
    columns: [
      {
        data:'phrase',
        title:'Frase',
        width:450,
        readOnly: true,
      },
      {
        data:'duration',
        title:'Duracción en segundos',
        width:200,        
        type:'numeric',
      }
    ],
    colHeaders: true,
    rowHeaders:true,
    colWidths: 200,
    licenseKey: 'non-commercial-and-evaluation',
  };


  constructor(private activityService: ActivityService,protected _sanitizer: DomSanitizer,private route: ActivatedRoute,private router: Router,private tokenStorageService: TokenStorageService) { }
    ngAfterViewInit(): void {
    
      
    }

  public get f(){
    return this.form.controls;
  }


  public getDataSet(): any[] {
      let data: any[] = [];
      let elements = this.activity.content.split("\n");
      this.activity.times; 
      let i = 0;
      if(this.activity.times.length > elements.length){
        this.activity.times.slice(this.activity.times.length-1,1)
      }
      else{
        let size = elements.length - this.activity.times.length;
        for(i=0; i<size;i++){
          if(this.activity.timeRange > 0)
          {
            this.activity.times.push(this.activity.timeRange)
          }
        }
      }
      
      let j =0;
      for(j=0; j<elements.length; i++){
        console.log(this.activity.times[j])
        data.push( {phrase:elements[j], duration:this.activity.times[j]})
        j = j+1;
      }

      return data;
  }
  public submit(){

    if(this.copy) {
      this.id = null;
      this.activity._id = null;
    }

    
    this.activity.creationDate = Date.now()
    this.activity.preview = false
    this.activity.owner = this.userid
    if(this.id){
      this.activityService.update(this.activity, this.id).subscribe({
        next: data => {
          this.activity = data
          this.router.navigate(['/activity-list']);
        },
        error: err => {              
        }
      });
    }
    else{
      this.activityService.save(this.activity).subscribe({
        next: data => {
          this.activity = data
          this.router.navigate(['/activity-list']);
        },
        error: err => {              
        }
      });
    }
    
  }

  public preview($event:any){
    if(this.copy) {
      this.id = null;
      this.activity._id = null;
    }
    this.activity.creationDate = Date.now()
    this.activity.preview = true
    this.activity.owner = this.userid
    if(this.activity._id){
      this.activityService.save(this.activity).subscribe({
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

  public getUrl(): string {
      return environment.BASE_URL+`presentator/${this.activity._id}`
  }
    
  public changeDataSet(){
    this.data = this.getDataSet();
    let instance = this;
    this.hotRegisterer.getInstance(this.tableID).updateData(this.data)
    this.hotRegisterer.getInstance(this.tableID).addHook('afterChange', function(changes, src) {
      let indexValue = 0;
      let value = 0;
      if(changes){
        indexValue = changes[0][0];
        value = changes[0][3];
        instance.activity.times[indexValue] = value
      }
      
     

   });
    
  }
  ngOnInit(): void {
    let instance = this;
  
    var user = this.tokenStorageService.getUser()
    this.userid = user.id    
      this.id = this.route.snapshot.paramMap.get('id');
      this.copy = this.route.snapshot.paramMap.get('copy') === "1"? true:false;
      if(this.id){
        this.activityService.getActivityByID(this.id).subscribe({
          next: data => {
            this.activity = data  
            this.data = this.getDataSet()
            if(this.hotRegisterer) 
            {
              this.hotRegisterer.getInstance(this.tableID).updateData(this.data)
            }
          }
        })
      }
  }
}
