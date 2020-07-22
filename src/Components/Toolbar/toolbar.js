import  React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Toolbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="eve_logo"></div>
                <div className="eve_links">
                    <ul>
                        <li><Link to="/jita">Jita Info </Link></li>
                        <li><Link to="/amarr">Amarr Info </Link></li>
                        <li><Link to="/dodixie">Dodixie Info </Link></li>
                        <li><Link to="/rens">Rens Info </Link></li>
                        <li><Link to="/hek">Hek Info </Link></li>
                    </ul>
                </div>
            </nav>

        )
    }

}
