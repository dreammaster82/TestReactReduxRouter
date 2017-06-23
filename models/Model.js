/**
 * Created by Denis on 19.06.2017.
 */
import {restUrl} from '../config';
import {fetchErrorHandling} from '../base';

export default class Model{
    getJSONScheme(){}
    save(){}
    constructor({id = null} = {}){
        this.id = id;
    }
}