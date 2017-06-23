/**
 * Created by Denis on 19.06.2017.
 */
import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {Link, BrowserRouter as Router, Route} from 'react-router-dom/es';
import Table from './components/Table';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import Department from './models/Department';
import Employee from './models/Employee';
import {updateData} from './actions';
import Editor from "./components/Editor";

function startApp(){
    const store = createStore(reducers, applyMiddleware(thunkMiddleware));

    Promise.all([Department.getItems(), Employee.getItems()]).then(res => {
        let data = {departments: res[0].reduce((prev, department) => {prev[department.id] = department; return prev}, {}), employees: res[1].reduce((prev, employee) => {prev[employee.id] = employee; return prev}, {})};
        store.dispatch(updateData(data));
    });

    render(<Provider store={store}>
        <Router>
            <div>
                <aside>
                    <nav>
                        <ul>
                            <li><Link to="/departments/">Departments</Link></li>
                            <li><Link to="/employees/">Employees</Link></li>
                        </ul>
                    </nav>
                </aside>
                <Route path="/" exact render={() => <div>Выберите элемент</div>} />
                <Route path="/:type" exact component={Table} />
                <Route path="/edit/:type" component={Editor} />
            </div>
        </Router>
    </Provider>, document.getElementById('app'))
}

function readyDOM(calback){
    if(['interactive', 'complete'].indexOf(document.readyState) != -1) calback();
    else document.addEventListener('DOMContentLoaded', calback);
}

readyDOM(startApp);