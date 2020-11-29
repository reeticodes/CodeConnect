import React,{Fragment} from 'react';
import './Spinner.css';

export default () => (
  <Fragment>
    <div className='space'>
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </Fragment>
)
