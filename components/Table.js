/**
 * Created by Denis on 19.06.2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Link from "react-router-dom/es/Link";

let stateItems = {};
const Row = ({props, item, type}) => {
    return <tr>
        {props.map(it => {
            let data = '';
            if(it.field) data = item[it.field] || '';
            else if(it.ref){
                let [,refType, id, propType] = it.ref.match(/([A-z]+)\[([A-z]+)]\.([A-z]+)/);
                if(stateItems[refType] && stateItems[refType][item[id]]) data = stateItems[refType][item[id]][propType] || '';
            } else if(it.type){
                if(it.type == 'actions') data = <Link to={`/edit/${type}?id=${item.id}`} className="btn btn-default">Edit</Link>
            }
            return <td>{data}</td>
        })}
    </tr>
};

const style = {marginBottom: 10};
const Table = ({items, match}) => {
    if(match.params['type'] != 'employees' && match.params['type'] != 'departments') return <div>Список не найден</div>;

    stateItems = items;
    const type = match.params['type'] == 'employees' ? 'employees' : 'departments';
    let props, colSpan = 2;
    if(type == 'departments'){
        props = [{title:'Name', field: 'name'}, {type: 'actions'}];
    } else {
        props = [{title:'FirstName', field: 'firstName'}, {title:'LastName', field: 'lastName'}, {title: 'Department', ref: 'departments[departmentId].name'}, {type: 'actions'}];
        colSpan = 4;
    }

    let rows = stateItems[type] && Object.values(stateItems[type])
    return <div>
        <div style={style}><Link to={`/edit/${type}`} className="btn btn-primary">Add</Link></div>
        <table className="table table-striped">
            <tbody>
                <tr>{props.map(it => {
                    return <th>{it.title || ''}</th>
                })}</tr>
                {rows && rows.length ? rows.map(it => <Row props={props} item={it} key={it.id} type={type} />) : <tr><td colSpan={colSpan}>Список пуст</td></tr>}
            </tbody>
        </table>
    </div>
};

export default withRouter(connect(({items}) => {
    return {items};
})(Table));