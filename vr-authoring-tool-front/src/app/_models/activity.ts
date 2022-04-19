
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

    public constructor(){
        this.title = ""
        this.owner = ""
        this.texts = []
        this.timeRange = 0
        this.content = ""
        this._id = null
        this.initText = ""
        this.endText = ""
        this.preview = false
    }

}