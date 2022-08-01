export class Url{

    static isUrl(url){
        return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url)
    }

    static isString(url){
        return typeof url !== 'string';
    }

    static extractParameters(url){

        if(Url.isString(url)){
            throw new Error('The value is not string');
        }

        if(!Url.isUrl(url)){
            return [];
        }

       
        let parameters = [];

        if(url.match(/\?./)){
            let [path, params] = url.split('?');
            params = params.split('&');
            for(let item of params){
                const [key, value] = item.split('=');
                if(key !== '' && value !== undefined){
                    parameters.push({key,value});
                }
                
            }
        }
        return parameters;
    }


    static addParameters(url, parameters = []){
        if(Url.isString(url)){
            throw new Error('The value is not string');
        }

        if(!Url.isUrl(url)){
            return url;
        }

        if(parameters.length == 0){
            return url;
        }

        if(!url.match(/\?./)){
           url +='?';
        }else {
            const values = url.split('?');
            url = values[0];
            url += '?';
        }
        
        let params = [];
        for(let param of parameters){
            if(param.key && param.key !== ''){
                params.push(`${param.key}=${param.value|| ''}`)
            }
        }

        url += params.join('&');

        return url;
    }

}