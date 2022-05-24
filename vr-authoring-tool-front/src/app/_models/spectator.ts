export class Spectator {
    public modelName: string
    public position: string
    public scale: string

    constructor(i:number) {    
        
        if(i%2===0){
            this.modelName = '#woman'
            this.scale = '0.0008 0.0008 0.0008'
        }
        else{
            this.modelName = '#men'
            this.scale = '0.6 0.6 0.6'
        }        
        this.position = ''        
    }

    
}