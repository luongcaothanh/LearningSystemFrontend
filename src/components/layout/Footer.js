import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer () {
    return (
        <MDBFooter style={{backgroundColor: "var(--primaryColor)"}} className='text-center text-lg-left text-white'>
            <div className='text-center p-3'>
                &copy;{new Date().getFullYear()} Copyright:{' '}
                <span>Database 221</span>
            </div>
        </MDBFooter>
    );
}

export default Footer;