import "./PathNavigator.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function PathNavigator(props) {

    let nodes = [];

    if (props.nodes) {
        let isFirstNode = true;
        for (let node of props.nodes) {
            if (!isFirstNode) {
                nodes.push(
                    <div className="pathNavigatorArrow">
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                );
            } else {
                isFirstNode = false;
            }

            nodes.push(<div className="pathNavigatorNode" onClick={() => node.onClick()}>
                {node.name}
            </div>);
        }
    }

    return (
        <div className="pathNavigatorContainer">
            {nodes}
        </div>
    );
} 