/**
 * Created by Denis on 19.06.2017.
 */
import Model from "./Model";
import {restUrl} from '../config';
import {fetchErrorHandling} from '../base';

export default class Department extends Model{
    constructor(data = {}){
        super(data);
        this.name = data.name || '';
    }
    getJSONScheme(){
        return {
            title: 'Department',
            type: 'object',
            required: ['name'],
            properties: {
                name: {type: "string", title: 'Name'}
            }
        }
    }
    save(){
        return new Promise((r, rj) => {
            let body = new FormData();
            Object.getOwnPropertyNames(this).forEach(name => {
                if(this[name] != null) body.append(name, this[name]);
            });
            fetch(`${restUrl}/api/department/save`, {method: 'post', body: body, credentials: 'include'}).then(fetchErrorHandling('json')).then((res) => {
                if(res){
                    this.id = res.id;
                    r(this);
                }
            }).catch((err) => {
                rj(err);
            })
        });
    }
};

Department.getItems = function () {
    return new Promise((r, rj) => {
        fetch(`${restUrl}/api/department/all`).then(fetchErrorHandling('json')).then((res) => {
            if(res){
                r(res.map(it => new Department(it)));
            } else rj('Some problem');
        }).catch((err) => {
            rj(err);
        });
    });
};