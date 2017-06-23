/**
 * Created by Denis on 19.06.2017.
 */
import Department from "./models/Department";
import Employee from "./models/Employee";
export const EDIT_ACTION = 'edit',
    SAVE_ACTION = 'save',
    UPDATE_ACTION = 'update',
    LOADING_ACTION = 'loading';

export function save(data, type) {
    return (dispatch, getState) => {
        dispatch(loading());

        let state = getState(), items = state.items, item;
        if(type == 'departments'){
            if(data.id){
                item = items.departments && Object.keys(items.departments).find(it => it == data.id);
            }
            if(item) {
                item.name = data.name;
            } else {
                item = new Department(data);
            }
            item.save().then((it) => {
                items.departments[it.id] = item;
                dispatch(updateData(Object.assign({}, items)));
            });
        } else {
            let item;
            if(data.id){
                item = items.employees && Object.keys(items.employees).find(it => it == data.id);
            }
            if(item) {
                item.firstName = data.firstName;
                item.lastName = data.lastName;
                item.departmentId = data.departmentId;
            } else {
                item = new Employee(data);
            }
            item.save().then((it) => {
                items.employees[it.id] = item;
                dispatch(updateData(Object.assign({}, items)));
            });
        }

    };
};

export const loading = () => {
    return {
        type: LOADING_ACTION,
    };
};

export const updateData = (data) => {
    return {
        type: UPDATE_ACTION,
        data
    };
};