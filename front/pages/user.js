import React from 'react';
import PropTypes from 'prop-types'

const User = ({ id }) => {
    return (
        <div>User {id}</div>
    )
};

User.propTypes = {
    id: PropTypes.number.isRequired,
}

User.getInitialProps = async (ctx) => {
    console.log('user', ctx.query.id);
    return { id: parseInt(ctx.query.id, 10) };
}

export default User;