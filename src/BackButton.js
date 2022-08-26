import { useHistory } from "react-router-dom";
import React from 'react'

const BackButton = () => {
    let history = useHistory();
    return (
        <>
          <button class='backbutton'  onClick={() => history.goBack()}><i class="gg-arrow-left"></i></button>
        </>
    );
};

export default BackButton