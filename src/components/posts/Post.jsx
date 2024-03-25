import React from 'react';

import ExpandableParagraph from '../common/Expandable';

function Post({title, body}) {
    return (
        <div className='post block'>
            <label>Title :</label> {title} <br />
            <label>Body :</label> <ExpandableParagraph content={body} lineClamp={1} />
        </div>
    );
}

export default Post;