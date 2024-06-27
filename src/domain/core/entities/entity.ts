import { UniqueEntityID } from "./unique-entity-id"

export class Entity<Props> {
    private _id: UniqueEntityID
    protected props: Props

    get id(){
        return this._id
    }

    constructor(props:any, id?: string){
        this.props = props
        this._id = new UniqueEntityID(id)
    }

}