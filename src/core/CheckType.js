import { 
    ObjectType,
    ArrayType,
    DateTimeType,
    DateType,
    FloatType,
    IntegerType,
    StringType,
    BooleanType
} from '../types';


export class CheckType{

    static check(value){
        if( value == null ){
            return 'nullable';
        } else if(ArrayType.is(value)){
            return new ArrayType().toString();
        } else if(BooleanType.is(value)){
            return new BooleanType().toString();
        } else if(DateTimeType.is(value)){
            return new DateTimeType().toString()
        } else if(DateType.is(value)){
            return new DateType().toString();
        }else if(FloatType.is(value)){
            return new FloatType().toString();
        }else if(IntegerType.is(value)){
            return new IntegerType().toString();
        }else if(ObjectType.is(value)){
            return new ObjectType().toString()
        }else if(StringType.is(value)){
            return new StringType().toString();
        }
        throw new Error(`${value} unknown type`);
    }

}