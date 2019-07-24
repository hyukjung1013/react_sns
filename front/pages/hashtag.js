import React from 'react';
import PropTypes from 'prop-types'

const Hashtag = ({ tag }) => {
    return (
        <div>Hashtag {tag} </div>
    )
};

Hashtag.propTypes = {
    Hashtag: PropTypes.string.isRequired,
}

Hashtag.getInitialProps = async (ctx) => {
    console.log('hashtag', ctx.query.tag);
    return { tag: ctx.query.tag }   // tag가 props로 전달된다.
}

export default Hashtag;