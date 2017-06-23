/**
 * Created by Denis on 19.06.2017.
 */
import Model from "./Model";
import {restUrl} from '../config';
import {fetchErrorHandling} from '../base';

export default class Employee extends Model{
    constructor(data = {}) {
        super(data);
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.departmentId = data.departmentId || null;
    }

    getJSONScheme(items){
        let departments = {
            'enum': items.departments ? Object.keys(items.departments).map(it => +it) : [],
            'enumNames': items.departments ? Object.values(items.departments).map(it => it.name) : [],
        }
        return {
            title: 'Employee',
            type: 'object',
            required: ['firstName', 'departmentId'],
            properties: {
                firstName: {type: "string", title: 'FirstName'},
                lastName: {type: "string", title: 'LastName'},
                departmentId: {type: "number", title: 'DepartmentId', 'enum': departments.enum, enumNames: departments.enumNames},
            }
        }
    }
    save(){
        return new Promise((r, rj) => {
            let body = new FormData();
            Object.getOwnPropertyNames(this).forEach(name => {
                if(this[name] != null) body.append(name, this[name]);
            });
            fetch(`${restUrl}/api/employee/save`, {method: 'post', body: body, credentials: 'include'}).then(fetchErrorHandling('json')).then((res) => {
                if(res){
                    this.id = res.id;
                    r(this);
                }
            }).catch((err) => {
                rj(err);
            })
        });
    }
}

Employee.getItems = function () {
    return new Promise((r, rj) => {
        fetch(`${restUrl}/api/employee/all`).then(fetchErrorHandling('json')).then((res) => {
            if(res){
                r(res.map(it => new Employee(it)));
            } else rj('Some problem');
        }).catch((err) => {
            rj(err);
        });
    });
};