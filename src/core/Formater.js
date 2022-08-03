import { 
    ObjectType,
    ArrayType
} from '../types';
import { CheckType } from './CheckType';

export class Formater{

    static formatArray(array = [], key, result = null){
        let type;
        let item;
        if(array.length == 0){
            type = 'empty';
            item = null;
        }else {
            item = array.shift();
            type = CheckType.check(item);
        }
        
        result = result || {}

        
        key = key || 'Array'
        result[key] = `Array[${type}]`

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
        let result = {};
        if(ArrayType.is(value)){
            result = Formater.formatArray(value);
        }else if( ObjectType.is(value)){
            result = Formater.formatObject(value);
        }else {
            throw new Error('The value should be Array or Object');
        }

        let parameters = [];
        for( let key in result){
            parameters.push({
                type:result[key],
                name: key
            });
        }

        return parameters;
    }

}