export class StringType{
    static is(value){
        return new RegExp('[^\n]*$').test(value);
    }

    toString(){
        return 'String';
    }
}