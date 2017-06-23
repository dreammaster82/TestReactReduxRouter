/**
 * Created by Denis on 19.06.2017.
 */
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {save} from '../actions';
import React from 'react';
import Form from "react-jsonschema-form";
import {getDataFromItem, getQueryVariable} from '../base';
import Employee from "../models/Employee";
import Department from "../models/Department";

let stateLoading = false;
const Editor = ({match, location, history, save, items, loading}) => {
    const submitForm = function ({formData}) {
        save(formData, match.params.type);
    };

    if(!loading && stateLoading){
        stateLoading = loading;
        history.push('/' + match.params.type);
    } else stateLoading = loading;
    let data;
    if(items[match.params.type]){
        let id = getQueryVariable(location.search, 'id');
        if(id){
            data = items[match.params.type][id];
        } else {
            if(match.params.type == 'employees'){
                data = new Employee();
            } else if(match.params.type == 'departments') data = new Department();
        }
    }
    return <div>{data ? <Form schema={data.getJSONScheme(items)} onSubmit={submitForm} formData={getDataFromItem(data)} /> : 'Выберите корректный элемент'}</div>
};

export default withRouter(connect(({items, editor: {loading}}) => {
    return {items, loading};
}, (dispatch) => {
    return {
        save(data, type){
            dispatch(save(data, type))
        }
    };
})(Editor));