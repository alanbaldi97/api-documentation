export class BooleanType{
    static is(value){
       value = new String(value);
        return new RegExp('true|false').test(value);
    }

    toString(){
        return 'Boolean';
    }
}