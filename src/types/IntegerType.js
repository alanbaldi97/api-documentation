export class IntegerType{
    static is(value){
        value = new String(value)
        return new RegExp('^[0-9]+(?!\.)$').test(value);
    }

    toString(){
        return 'Integer';
    }
}