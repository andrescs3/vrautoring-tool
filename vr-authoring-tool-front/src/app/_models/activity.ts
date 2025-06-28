
export class ImageContent {
    public source: String
    public xPos: String
    public yPos: String
    public constructor(){
        this.source = ""
        this.xPos = ""
        this.yPos = ""
    }
}

export class Activity{
    public title:string
    public owner: string
    public texts: string[]
    public timeRange: number
    public content: string
    public _id: string | null
    public initText:string
    public endText:string
    public preview: boolean
    public creationDate:number
    public color:string
    public times:number[]
    public activityType:number
    public images: ImageContent[]

    

    public constructor(){
        this.title = ""
        this.owner = ""
        this.texts = []
        this.timeRange = 8
        this.content = ""
        this._id = null
        this.initText = ""
        this.endText = ""
        this.preview = false
        this.creationDate = Date.now()
        this.color = "#ffffff"
        this.times = []
        this.activityType = 0
        this.images = []

    }

    getDate():string{
        var date = new Date(this.creationDate * 1000)            
        return date.toUTCString()
    }

}