export class ObjectType{
    static is(value){
        return typeof value === 'object';
    }

    toString(){
        return 'Object';
    }
}