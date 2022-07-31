export class ArrayType{
    static is(value){
        return Array.isArray(value);
    }

    toString(){
        return 'Array';
    }
}