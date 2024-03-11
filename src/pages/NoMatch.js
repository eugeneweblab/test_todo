import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div>
            <h2>404: Page Not Found</h2>
            <Link to="/" style={{ padding: 5 }}>
                Home
            </Link>
        </div>
    );
};

export default NoMatch;
