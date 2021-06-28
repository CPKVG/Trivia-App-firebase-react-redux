import React from 'react'
import Directory from './../../components/Directory';
import Result from '../../components/Trivia/Result';
// import './styles.scss';

const Resultpage = props => {
    return (
            <section className = "resultpage">
                 {/* <Directory /> */}
                 <Result/>
            </section>
    )
}

export default Resultpage