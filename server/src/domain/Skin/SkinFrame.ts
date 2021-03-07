export interface SkinData{
    id: string;
    value: string;
}

export default class SkinFrame{
    protected id: string;
    protected value: string;
    
    protected constructor(data: SkinData){
        this.id = data.id;
        this.value = data.value;
    }
        
    public getValue(){
        return this.value;
    }

    public getId(){
        return this.getId;
    }

    public getAll(){
        return{
            id: this.id,
            value: this.value
        }
    }

}