export class DateTimeType{
    static is(value){
        value = new String(value);
        return /^([0-9]{4})-([0-9]{2})-([0-9]{2})\s([0-9]{2}):([0-9]{2})*\:?([0-9]{2})$/.test(value)
    }

    toString(){
        return 'DateTime';
    }
}