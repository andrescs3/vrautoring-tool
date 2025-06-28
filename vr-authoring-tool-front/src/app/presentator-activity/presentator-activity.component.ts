import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Activity } from '../_models/activity';
import { Spectator } from '../_models/spectator';
import { ActivityService } from '../_services/activity.service';

@Component({
  selector: 'app-presentator-activity',
  templateUrl: './presentator-activity.component.html',
  styleUrls: ['./presentator-activity.component.css']
})
export class PresentatorActivityComponent implements OnInit {
  @ViewChild('pinicio') pinicio!: ElementRef;
  
  public activity: Activity
  isLoaded = false
  public posi:string = ''
  public modelid: string = '#woman'
  public messages:any[] =  [] ;
  public printmessages: string[]=[]
  public spectators: Spectator[] = []
  public play:boolean = false;
  public buttonVisible:boolean = true;
  public buttonScalePlay:string = "0.4 0.4 0.4";
  public buttonScaleInfo:string = "0.4 0.4 0.4";
  public infolabelVisible:boolean = false;
  public playlabelVisible:boolean = false;
  public oneVisible:boolean = false;
  public twoVisible:boolean = false;
  public threeVisible:boolean = false;
  

  public positionsMen: string[] = ["-6.5 -1.2 -3.9" ,"-3.2 -1.2 -3.9" ,"0 -1.2 -3.9" ,"6.5 -1.2 -3.9" ,"3.2 -1.2 -3.9","-6.5 -1.2 -6.2" ,"-3.2 -1.2 -6.2" ,"0 -1.2 -6.2" ,"6.5 -1.2 -6.2" ,"3.2 -1.2 -6.2","-6.5 -1.2 -9.4" ,"-3.2 -1.2 -9.4" ,"0 -1.2 -9.4" ,"6.5 -1.2 -9.4" ,"3.2 -1.2 -9.4","-6.5 -1.2 -12.5" ,"-3.2 -1.2 -12.5" ,"0 -1.2 -12.5" ,"6.5 -1.2 -12.5" ,"3.2 -1.2 -12.5" ]
  public positionsWomen: string[] = ["-4 -0.2 -2.5", "-2 -0.2 -2.5","0 -0.2 -2.5" ,  "4 -0.2 -2.5" , "2 -0.2 -2.5" ,"-5.6 -0.9 -5.5","-2.8 -0.9 -5.5","0 -0.9 -5.5" , "5.6 -0.9 -5.5" ,    "2.8 -0.9 -5.5" ,"-5.6 -0.9 -8.5","-2.8 -0.9 -8.5","0 -0.9 -8.5" , "5.6 -0.9 -8.5" ,     "2.8 -0.9 -8.5" ,"-5.6 -0.9 -11.5", "-2.8 -0.9 -11.5","0 -0.9 -11.5","5.6 -0.9 -11.5",  "2.8 -0.9 -11.5" ]
  public scale:string[] = ["0.0008 0.0008 0.0008","0.0008 0.0008 0.0008","0.0008 0.0008 0.0008","0.0008 0.0008 0.0008","0.0008 0.0008 0.0008","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011"]
  public id: string | null = "";
  

constructor( private activityService: ActivityService, private route: ActivatedRoute) {
  this.activity = new Activity()
  
}

  ngOnInit(): void {


          this.id = this.route.snapshot.paramMap.get('id');
          let index = 1
          this.activityService.getActivityByID(this.id).subscribe({
            next: data => {
              this.activity = data  
              let textArray = this.activity.content.split("\n")            
              textArray.forEach(element => {
                const text = {
                  content: `value:${element}; color:${this.activity.color};  negate:false; font:${environment.BASE_URL}assets/resources/font/custom/custom-msdf.json;`,
                  position:this.getPos(),
                  init: (3+index) * (this.activity.timeRange - 3) * 1000,
                  end: (index + 4) * (this.activity.timeRange-3) * 1000,
                  visible:false

                }


                 this.messages.push(text)
                
                index = index+1

              });

              setTimeout(()=>{                           // <<<---using ()=> syntax
                var msg = new SpeechSynthesisUtterance();
                var voices = window.speechSynthesis.getVoices();                
                msg.voice = voices[10]; 
                msg.volume = 1; // From 0 to 1
                msg.rate = 1; // From 0.1 to 10
                msg.pitch = 2; // From 0 to 2
                msg.text = "Bienvenido a esta actividad, a continuación va a visualizar en el escenario un conjunto de frases que irán cambiando de contenido y posición, cada texto lo debe leer en voz alta";
                msg.lang = 'es-ES';
                //speechSynthesis.speak(msg);

               // this.pinicio.nativeElement.components.sound.playSound();

              }, 2000);
    
              setTimeout(()=>{                           // <<<---using ()=> syntax
                var msg = new SpeechSynthesisUtterance();
                var voices = window.speechSynthesis.getVoices();
                msg.voice = voices[10]; 
                msg.volume = 1; // From 0 to 1
                msg.rate = 1; // From 0.1 to 10
                msg.pitch = 2; // From 0 to 2
                msg.text = this.activity.endText;
                msg.lang = 'es';
                //speechSynthesis.speak(msg);
              }, index * this.activity.timeRange * 1000);
              
              let i = 0;
              for(let i=0; i<20; i=i+1){
                  let value = Math.floor(Math.random() * 10);                                    
                  let spectator = new Spectator(value)
                  let position:string = "0 0 0"
                  if(spectator.modelName==="#men"){
                    position = this.positionsMen[i]
                  }
                  else{
                    position = this.positionsWomen[i]
                    spectator.scale = this.scale[i]
                  }
                  spectator.position = position
                  this.spectators.push(spectator)                  
              }
            },
            error: err => {              
            }
          });    
  }

  playSound() {
    
    if(!this.play){
    this.pinicio.nativeElement.components.sound.playSound();    
      this.play = true;
    }
    else{
      this.pinicio.nativeElement.components.sound.stopSound();
      this.play = false;
    }
    
  }

  stopSound() {
    this.pinicio.nativeElement.components.sound.stopSound();
    this.play = false;    
  }

  playGame(){
    this.stopSound();
    
    const value = Math.floor( 6 / 3) * 1000;
    console.log(value)
    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.oneVisible = true;
      
    }, 0);

    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.twoVisible = true;
      
    }, value);

    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.threeVisible = true;
      
    }, value*2);

    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.oneVisible = false;
      
    }, value);

    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.twoVisible = false;
      
    }, value*2);

    setTimeout(()=>{                           // <<<---using ()=> syntax
      this.threeVisible = false;
      
    }, value*3);

    this.buttonVisible = false;
    this.messages.forEach(text => {
      setTimeout(()=>{                           // <<<---using ()=> syntax
        text.visible = true;
        
      }, text.init);
  
      setTimeout(()=>{                           // <<<---using ()=> syntax
        text.visible = false;
       
      }, text.end);
      
      this.messages.push(text)
     }
      )
  }

  public getPos(): string {
          var xSign = Math.round(Math.random()) === 0 ? "-":""
          var zSign = Math.round(Math.random()) === 0 ? "-":""
          var xPos = Math.floor(Math.random() * 2) + 1
          var zPos = Math.floor(Math.random() * 4) + 2          
          const position =`${xSign}${xPos} 1.5 -${zPos}`
          console.log(position)
          return position
  }

  getEscale(): string{
    return `1.5 1.5 1.5`
  }

loaded($event:any){
  this.isLoaded = true;

}


buttonclick(){
  
}

mouseEnterInfo(){
  this.buttonScaleInfo = "0.6 0.6 0.6";
  this.infolabelVisible = true;
}

mouseLeaveInfo(){
  this.buttonScaleInfo = "0.4 0.4 0.4";
  this.infolabelVisible = false;
}

mouseEnterPlay(){
  this.buttonScalePlay = "0.6 0.6 0.6";
  this.playlabelVisible = true;
}

mouseLeavePlay(){
  this.buttonScalePlay = "0.4 0.4 0.4";
  this.playlabelVisible = false;
}


}
