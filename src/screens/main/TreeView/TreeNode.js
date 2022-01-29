import React from 'react';

import './Tree.css';

import { faChevronDown, faChevronRight, faExternalLinkAlt, faFolderOpen, faFolder, faSplotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TreeNode(props) {
    const { node, getChildNodes, onToggle, level } = props;

    const getNodeLabel = (node) => {
        const subdivs = node.path.split('/');
        return subdivs[subdivs.length - 1];
    }

    const toggleOpen = () => {
        node.isOpen = !node.isOpen;


        onToggle(node);
    }

    const getPaddingLeft = (level, type) => {
        let paddingLeft = level * 40;
        if (type === 'link') paddingLeft += 20;
        return paddingLeft;
    }

    return(
        <React.Fragment>
            <div className="treeNode" level={level} type={node.type} onClick={toggleOpen} style={{marginLeft: getPaddingLeft(level, node.type)+'px', paddingLeft: 15 +'px'}}>
                <div>
                    { node.type === 'category' && (node.isOpen ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronRight} />) }
                </div>

                <div className="treeNodeIcon" marginRight={10}>
                    { node.type === 'put "schedule" here to have an icon' && <FontAwesomeIcon icon={faExternalLinkAlt} /> }
                    { node.type === 'put "category" here to have an icon' && node.isOpen === true && <FontAwesomeIcon icon={faFolderOpen} /> }
                    { node.type === 'put "category" here to have an icon' && !node.isOpen === true && <FontAwesomeIcon icon={faFolder} /> }
                </div>

                <span role="button">
                    { getNodeLabel(node) }
                </span>
            </div>

            { node.isOpen && getChildNodes(node).map(childNode => (
                <TreeNode
                    {...props}
                    node={childNode}
                    level={level+1}
                />
            ))}
        </React.Fragment>
    )
}