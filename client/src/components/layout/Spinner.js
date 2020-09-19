import React,{Fragment} from 'react';
// import spinner from './Spinner-1s-200px.gif'
import './Spinner.css';

export default () => (
  <Fragment>
    <div className='space'>
    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  </Fragment>
)
