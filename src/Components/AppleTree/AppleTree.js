import React from 'react';
import {connect} from 'react-redux';
import Apple from "../Apple/Apple";
import Tree from "../Tree/Tree";
import _ from 'lodash';
import $ from "jquery";
import {setBasket} from "../../Utils/locations";
import PropTypes from "prop-types";

class AppleTree extends React.Component {

    state = {
        basket: []
    };

    static propTypes = {
        apples: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.startDropping = this.startDropping.bind(this);
    }

    startDropping() {
        // All apples will drop in different times
        const {basket, apples} = this.props;
        let length = apples.length * Math.random() + 1;
        if(length > apples.length)
            length = apples.length;
        for (let i = 0; i < length; i++) {
            let time = ((Math.random() * length) / 2) * 1000;

            let apple = $('.Tree .apple:eq(' + i + ')');

            // drop apple to ground
            apple.animate({
                top: '100%'
            }, time, () => {
                setTimeout(() => {
                    apple.remove();
                    basket.push(i);
                    let nw = [...basket];
                    setBasket(nw);
                }, 1000);
            });

        }

    }


    shakeTree() {
        // choose element to shake.
        const content = $('#MyContent');
        if(content.hasClass('shake-rotate'))
            return;
        // shake chosen element for 3 sec, rot
        content.addClass('shake-rotate');
        // after 3 sec, we will stop shake
        setTimeout(() => {
            content.removeClass('shake-rotate');
            // start dropping
            this.startDropping();
        }, 3000);
    }


    render() {
        const {apples} = this.props;
        return (
            <div className={'content'} onClick={this.shakeTree.bind(this)} id="MyContent">
                <div className="Tree">
                    {
                        _.map(apples, (n, index) => {
                                return <Apple key={index} style={n}/>
                            }
                        )
                    }
                </div>
                <Tree />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    basket: state.basket.basket
});

AppleTree = connect(mapStateToProps)(AppleTree);

export default AppleTree;