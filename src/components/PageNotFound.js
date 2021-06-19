import React from 'react';
import { Header } from './'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div>
            <Header>Oops!</Header>
            <p>It looks like something broke. Let's try heading back to your <Link to="/actions">home page</Link></p>
        </div>
    )
};

export { PageNotFound as default };