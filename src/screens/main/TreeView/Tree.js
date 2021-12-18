import React, { useState } from "react";

import TreeNode from './TreeNode';

const data = {
    'rozkłady': {
        path: 'rozkłady',
        type: 'category',
        isRoot: true,
        children: ['stacjonarne', 'niestacjonarne']
    },
    'stacjonarne': {
        path: 'stacjonarne',
        type: 'category',
        children: ['stacjonarne/informatyka', 'stacjonarne/matematyka', 'stacjonarne/architektura']
    },
    'niestacjonarne': {
        path: 'niestacjonarne',
        type: 'category',
        children: ['niestacjonarne/informatyka', 'niestacjonarne/matematyka', 'niestacjonarne/architektura']
    },
    'stacjonarne/informatyka': {
        path: 'stacjonarne/informatyka',
        type: 'category',
        children: ['stacjonarne/informatyka/semestr1', 'stacjonarne/informatyka/semestr2', 'stacjonarne/informatyka/semestr3']
    },
    'niestacjonarne/informatyka': {
        path: 'niestacjonarne/informatyka',
        type: 'category',
        children: ['']
    },
    'stacjonarne/matematyka': {
        path: 'stacjonarne/matematyka',
        type: 'category',
        children: ['']
    },
    'niestacjonarne/matematyka': {
        path: 'niestacjonarne/matematyka',
        type: 'category',
        children: ['']
    },
    'stacjonarne/architektura': {
        path: 'stacjonarne/architektura',
        type: 'category',
        children: ['']
    },
    'niestacjonarne/architektura': {
        path: 'niestacjonarne/architektura',
        type: 'category',
        children: ['']
    },
    'stacjonarne/informatyka/semestr1': {
        path: 'stacjonarne/informatyka/semestr1',
        type: 'schedule',
        link: 'somelink'
    },
    'stacjonarne/informatyka/semestr2': {
        path: 'stacjonarne/informatyka/semestr2',
        type: 'schedule',
        link: 'somelink'
    },
    'stacjonarne/informatyka/semestr3': {
        path: 'stacjonarne/informatyka/semestr3',
        type: 'schedule',
        link: 'somelink'
    }
}

export default function Tree() {

    const [nodes, setNodes] = useState(data);

    const getRootNodes = () => {
        return Object.values(nodes).filter(node => node.isRoot === true);
    }

    const getChildNodes = (node) => {
        if (!node.children) return [];
        return node.children.map(path => nodes[path]);
    }

    const onToggle = (node) => {

        let tempNodes = { ...nodes };
        tempNodes[node.path].isOpen = node.isOpen;
        console.log('isOpen', tempNodes[node.path].isOpen)
        setNodes(tempNodes);
        
    }

    return(
        <div>
            {getRootNodes().map(node => (
                <TreeNode
                    node={node}
                    level={0}
                    getChildNodes={getChildNodes}
                    onToggle={onToggle}
                />
            ))}
        </div>
    )
}