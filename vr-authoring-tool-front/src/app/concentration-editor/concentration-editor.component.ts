import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Activity, ImageContent } from '../_models/activity';
import { ActivityService } from '../_services/activity.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { IfStmt } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from '../_services/token-storage.service';





@Component({
  selector: 'app-concentration-editor',
  templateUrl: './concentration-editor.component.html',
  styleUrls: ['./concentration-editor.component.css']
})
export class ConcentrationEditorComponent implements OnInit {

  public form = new FormGroup({
      title: new FormControl("", Validators.required),
      link: new FormControl("", Validators.required),
      xPos: new FormControl("", Validators.required),
      yPos: new FormControl("", Validators.required),
      initText: new FormControl("", Validators.required),
      endText: new FormControl("", Validators.required),
      timeRange: new FormControl("", Validators.required),
      color: new FormControl("", Validators.required),
      file: new FormControl('', Validators.required),
      editxPos: new FormControl("", Validators.required),
      edityPos: new FormControl("", Validators.required),
  });

  public activity:Activity = new Activity()
  public id: string | null = "";
  public copy: boolean = false;
  private userid: string = "";
  public color: string = '#ffffff'
  myFiles:string [] = [];
  data: any[] = []
  public link: String=""
  public xPosSelected:String = "0"
  public yPosSelected:String = "1.5"

  public editxPosSelected:string = "0";
  public edityPosSelected:string = "1.5";

  public isEdit:boolean = false;
  public itemEditIndex:number = 0;

  
  
  public xPositions = [
      {id: "-3", name: "Izquierda"},
      {id: "0", name: "Centro"},
      {id: "3", name: "Derecha"}
   ]

   public yPositions = [
    {id: "2.7", name: "Arriba"},
    {id: "1.5", name: "Centro"},
   
    {id: "0.3", name: "Abajo"}
 ]

  

  

  constructor(private activityService: ActivityService,protected _sanitizer: DomSanitizer,private route: ActivatedRoute,private router: Router,private tokenStorageService: TokenStorageService, private renderer: Renderer2) { }

  public get f(){
    return this.form.controls;
  }

  public submit(){

    if(this.copy) {
      this.id = null;
      this.activity._id = null;
    }

    
    this.activity.creationDate = Date.now()
    this.activity.preview = false
    this.activity.owner = this.userid
    this.activity.activityType = 1
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
    this.activity.activityType = 1
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
      return environment.BASE_URL+`concentration/${this.activity._id}`
  }
    
  ngOnInit(): void {
    var user = this.tokenStorageService.getUser()
    this.userid = user.id    
      this.id = this.route.snapshot.paramMap.get('id');
      this.copy = this.route.snapshot.paramMap.get('copy') === "1"? true:false;
      if(this.id){
        this.activityService.getActivityByID(this.id).subscribe({
          next: data => {
            this.activity = data  
            let index:number = 0
            // this.activity.images.forEach(element => {
            //   var xcontrol = new FormControl("xPos-" + index);
            //   (this.form.controls["xPos"] as FormArray).push(xcontrol)

            //   var ycontrol = new FormControl("yPos-" + index);
            //   (this.form.controls["yPos"] as FormArray).push(ycontrol)
            // });
          }})
      }
    }

    onFileChange(event:any) {
   
      for (var i = 0; i < event.target.files.length; i++) { 
          this.myFiles.push(event.target.files[i]);
      }
    }

    addText(){
      if(this.link !== "" && this.validateURL(this.link)){
        let image = new ImageContent()
        image.source = this.link
        image.xPos = this.xPosSelected
        image.yPos = this.yPosSelected
        this.activity.images.push(image)
        this.link = "";
        // var xcontrol = new FormControl("xPos-" + this.activity.images.length);
        // (this.form.controls["xPos"] as FormArray).push(xcontrol);


        // var ycontrol = new FormControl("yPos-" + this.activity.images.length);
        // (this.form.controls["yPos"] as FormArray).push(ycontrol);
        
      }
    }



    deleteItem(i: number){
      // (this.form.controls["xPos"] as FormArray).removeAt(i);
      // (this.form.controls["yPos"] as FormArray).removeAt(i);
      this.activity.images.splice(i, 1)
    }

    getItemDesc(xPos:String, yPos: String){
      console.log("-")
      let xname = this.xPositions.find(x => x.id === xPos)?.name
      console.log(xname)

      
      return this.xPositions.find(x => x.id === xPos)?.name + ' ' + this.yPositions.find(x => x.id === yPos)?.name
    }

    moveItem( old_index:number, new_index:number) {
      var element = this.activity.images[old_index];
      this.activity.images.splice(old_index, 1);
      this.activity.images.splice(new_index, 0, element);
    }

    editItem(i:number){
        this.isEdit = true;
        var itemEdit = this.activity.images[i];
        this.itemEditIndex = i;
        console.log(i);
        this.link = itemEdit.source
        this.xPosSelected = itemEdit.xPos;
        this.yPosSelected = itemEdit.yPos;

        let onElement = this.renderer.selectRootElement('#link');
        onElement.focus();
    }


    updateItem(i:number){
      this.activity.images[i].source = this.link;
      this.activity.images[i].xPos = this.xPosSelected;
      this.activity.images[i].yPos = this.yPosSelected;
      this.isEdit = false;
      this.itemEditIndex = -1;
      this.link = "";
    }

    cancelEdit(){
      this.isEdit = false;
      this.itemEditIndex = -1;
      this.link = "";
    }

    validateURL(value:String){
      return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value+"");
    }

    
}
