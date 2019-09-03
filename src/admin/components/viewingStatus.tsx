import React from 'react';

const ViewingStatus: React.FC<{documentId: string}> = props => {
    return <div>{props.documentId}</div>
}

export default ViewingStatus