import "./PathNavigator.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function PathNavigator(props) {

    let nodes = [];

    if (props.nodes && props.activeNodesCount) {
        for (let i = 0; i < props.activeNodesCount; i++) {
            if (i > 0) {
                nodes.push(
                    <div className="pathNavigatorArrow">
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                );
            }

            nodes.push(<div className="pathNavigatorNode" onClick={() => props.nodes[i].onClick()}>
                {props.nodes[i].name}
            </div>);
        }
    }

    return (
        <div className="pathNavigatorContainer">
            {nodes}
        </div>
    );
} 