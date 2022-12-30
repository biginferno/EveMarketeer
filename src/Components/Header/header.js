import  React from 'react';

import './header.css'

function Header() {

        return (
                <div className="eve-logo">
                        <a style={{"textDecoration":"none"}} href="/">
                                <h1>The Eve Project</h1>
                        </a>
                </div>
        );
}

export default Header;