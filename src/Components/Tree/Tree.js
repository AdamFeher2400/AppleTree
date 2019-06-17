import React from 'react';

export default class Tree extends React.Component {


    render() {
        return (
            <img style={{width:'100%', height:'100%'}} src={require('./tree-1.svg')} alt={"Tree"}/>
        )
    }
}

