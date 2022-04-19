import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '../_models/activity';
import { Spectator } from '../_models/spectator';
import { ActivityService } from '../_services/activity.service';

@Component({
  selector: 'app-presentator-activity',
  templateUrl: './presentator-activity.component.html',
  styleUrls: ['./presentator-activity.component.css']
})
export class PresentatorActivityComponent implements OnInit {

  public activity: Activity
  isLoaded = false
  public posi:string = ''
  public modelid: string = '#woman'
  public messages:any[] =  [] ;
  public printmessages: string[]=[]
  public spectators: Spectator[] = []

  public positionsMen: string[] = ["-6.5 -1.2 -3.9" ,"-3.2 -1.2 -3.9" ,"0 -1.2 -3.9" ,"6.5 -1.2 -3.9" ,"3.2 -1.2 -3.9","-6.5 -1.2 -6.2" ,"-3.2 -1.2 -6.2" ,"0 -1.2 -6.2" ,"6.5 -1.2 -6.2" ,"3.2 -1.2 -6.2","-6.5 -1.2 -9.4" ,"-3.2 -1.2 -9.4" ,"0 -1.2 -9.4" ,"6.5 -1.2 -9.4" ,"3.2 -1.2 -9.4","-6.5 -1.2 -12.5" ,"-3.2 -1.2 -12.5" ,"0 -1.2 -12.5" ,"6.5 -1.2 -12.5" ,"3.2 -1.2 -12.5" ]
  public positionsWomen: string[] = ["-4 -0.2 -2.5", "-2 -0.2 -2.5","0 -0.2 -2.5" ,  "4 -0.2 -2.5" , "2 -0.2 -2.5" ,"-5.6 -0.9 -5.5","-2.8 -0.9 -5.5","0 -0.9 -5.5" , "5.6 -0.9 -5.5" ,    "2.8 -0.9 -5.5" ,"-5.6 -0.9 -8.5","-2.8 -0.9 -8.5","0 -0.9 -8.5" , "5.6 -0.9 -8.5" ,     "2.8 -0.9 -8.5" ,"-5.6 -0.9 -11.5", "-2.8 -0.9 -11.5","0 -0.9 -11.5","5.6 -0.9 -11.5",  "2.8 -0.9 -11.5" ]
  public scale:string[] = ["0.0008 0.0008 0.0008","0.0008 0.0008 0.0008","0.0008 0.0008 0.0008","0.0008 0.0008 0.0008","0.0008 0.0008 0.0008","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011","0.0011 0.0011 0.0011"]
  public id: string | null = "";
  

constructor( private activityService: ActivityService, private route: ActivatedRoute) {
  this.activity = new Activity()
  
}

  ngOnInit(): void {


          this.id = this.route.snapshot.paramMap.get('id');
          let index = 3 
          this.activityService.getActivityByID(this.id).subscribe({
            next: data => {
              this.activity = data  
              let textArray = this.activity.content.split("\n")            
              textArray.forEach(element => {
                const text = {
                  content: `value:${element}; color:#FFFFFF; shader: msdf; font:http://localhost:8081/assets/resources/font/asap/Asap-Regular.json;`,
                  position:this.getPos(),
                  init: index * this.activity.timeRange * 1000,
                  end: (index + 1) * this.activity.timeRange * 1000,
                  visible:false

                }

                setTimeout(()=>{                           // <<<---using ()=> syntax
                  text.visible = true;
                }, text.init);
            
                setTimeout(()=>{                           // <<<---using ()=> syntax
                  text.visible = false;
                }, text.end);

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
                msg.text = this.activity.initText;
                msg.lang = 'es-ES';
                speechSynthesis.speak(msg);
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
                speechSynthesis.speak(msg);
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

  public getPos(): string {
          var xSign = Math.round(Math.random()) === 0 ? "-":""
          var zSign = Math.round(Math.random()) === 0 ? "-":""
          var xPos = Math.floor(Math.random() * 2) + 1
          var zPos = Math.floor(Math.random() * 5) + 1          
          const position =`${xSign}${xPos} 1.5 ${zSign}${zPos}`
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

}
