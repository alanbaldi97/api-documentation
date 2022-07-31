export class FloatType{

    static is(value){
        value = new String(value)
        return new RegExp('^[0-9]+\.([0-9]{2})$').test(value);
    }

    toString(){
        return 'Float';
    }
}