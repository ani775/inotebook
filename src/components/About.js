import React, { useContext, useEffect } from 'react'
import noteContext from '../context/noteContext';

const About = () => {
    //const a = useContext(noteContext)
    // useEffect(() => {
    //     a.update();
    //     // eslint-disable-next-line
    // }, [])
    return (
        <div>
            {/* This is About {a.state.name} and he is in class {a.state.class} */}
            This is About Page
        </div>
    )
}

export default About