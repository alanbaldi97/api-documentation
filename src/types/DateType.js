export class DateType{
    static is(value){
        return new RegExp('^([0-9]{4})-([0-9]{2})-([0-9]{2})$').test(value)
    }

    toString(){
        return 'Date';
    }
}