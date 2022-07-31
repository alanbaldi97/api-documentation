import { 
    ObjectType,
    ArrayType
} from '../types';
import { CheckType } from './CheckType';

export class Formater{

    static formatArray(array = [], key, result = null){
        let item = array.shift();
        result = result || {}

        let type = CheckType.check(item);
        key = key || 'array'
        result[key] = `array[${type}]`

        if(ArrayType.is(item)){
           return Formater.formatArray(item, key, result)
        }else if (ObjectType.is(item)) {
            return Formater.formatObject(item, key, result)
        }
       
        return result;
    }

    static formatObject(object,   key = '', result = null){
        result = result || {};
        for(let k in object){
            let newKey = '';
            if(key !== ''){
                newKey = `${key}.${k}`
            }else {
                newKey = k;
            }

            result[newKey] = CheckType.check(object[k]);

            if(ArrayType.is(object[k])){
               result = Formater.formatArray((object[k]), newKey, result);
            }else if(ObjectType.is(object[k])){
                result = Formater.formatObject((object[k]), newKey, result);
            }
        }

        return result;
    }

    static format(value){
        if(ArrayType.is(value)){
            return Formater.formatArray(value);
        }else if( ObjectType.is(value)){
            return Formater.formatObject(value);
        }

        throw new Error('The value should be Array or Object');

    }

}