import { useHistory } from "react-router-dom";
import React from 'react'

const BackButton = () => {
    let history = useHistory();
    return (
        <>
          <button  onClick={() => history.goBack()}>Back</button>
        </>
    );
};

export default BackButton