import React from 'react'
import { useParams } from 'react-router-dom';

function MMSETest() {
    const params = useParams();
    console.log(params);
    return (
        <div>
            Test

        </div>
    )
}

export default MMSETest;