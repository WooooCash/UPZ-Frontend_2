import React, { useEffect, useState } from "react";

import TreeNode from './TreeNode';
import { getTreeStructure } from "../../../util/api";

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
        children: ['niestacjonarne/informatyka/semestr1', 'niestacjonarne/informatyka/semestr2', 'niestacjonarne/informatyka/semestr3']
    },
    'stacjonarne/matematyka': {
        path: 'stacjonarne/matematyka',
        type: 'category',
        children: ['stacjonarne/matematyka/semestr1', 'stacjonarne/matematyka/semestr2', 'stacjonarne/matematyka/semestr3']
    },
    'niestacjonarne/matematyka': {
        path: 'niestacjonarne/matematyka',
        type: 'category',
        children: ['niestacjonarne/matematyka/semestr1', 'niestacjonarne/matematyka/semestr2', 'niestacjonarne/matematyka/semestr3']
    },
    'stacjonarne/architektura': {
        path: 'stacjonarne/architektura',
        type: 'category',
        children: ['stacjonarne/architektura/semestr1', 'stacjonarne/architektura/semestr2', 'stacjonarne/architektura/semestr3']
    },
    'niestacjonarne/architektura': {
        path: 'niestacjonarne/architektura',
        type: 'category',
        children: ['niestacjonarne/architektura/semestr1', 'niestacjonarne/architektura/semestr2', 'niestacjonarne/architektura/semestr3']
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
    },
    'niestacjonarne/informatyka/semestr1': {
        path: 'niestacjonarne/informatyka/semestr1',
        type: 'schedule',
        link: 'somelink'
    },
    'niestacjonarne/informatyka/semestr2': {
        path: 'niestacjonarne/informatyka/semestr2',
        type: 'schedule',
        link: 'somelink'
    },
    'niestacjonarne/informatyka/semestr3': {
        path: 'niestacjonarne/informatyka/semestr3',
        type: 'schedule',
        link: 'somelink'
    },
    'stacjonarne/matematyka/semestr1': {
        path: 'stacjonarne/matematyka/semestr1',
        type: 'schedule',
        link: 'somelink'
    },
    'stacjonarne/matematyka/semestr2': {
        path: 'stacjonarne/matematyka/semestr2',
        type: 'schedule',
        link: 'somelink'
    },
    'stacjonarne/matematyka/semestr3': {
        path: 'stacjonarne/matematyka/semestr3',
        type: 'schedule',
        link: 'somelink'
    },
    'niestacjonarne/matematyka/semestr1': {
        path: 'niestacjonarne/matematyka/semestr1',
        type: 'schedule',
        link: 'somelink'
    },
    'niestacjonarne/matematyka/semestr2': {
        path: 'niestacjonarne/matematyka/semestr2',
        type: 'schedule',
        link: 'somelink'
    },
    'niestacjonarne/matematyka/semestr3': {
        path: 'niestacjonarne/matematyka/semestr3',
        type: 'schedule',
        link: 'somelink'
    },
    'stacjonarne/architektura/semestr1': {
        path: 'stacjonarne/architektura/semestr1',
        type: 'schedule',
        link: 'somelink'
    },
    'stacjonarne/architektura/semestr2': {
        path: 'stacjonarne/architektura/semestr2',
        type: 'schedule',
        link: 'somelink'
    },
    'stacjonarne/architektura/semestr3': {
        path: 'stacjonarne/architektura/semestr3',
        type: 'schedule',
        link: 'somelink'
    },
    'niestacjonarne/architektura/semestr1': {
        path: 'niestacjonarne/architektura/semestr1',
        type: 'schedule',
        link: 'somelink'
    },
    'niestacjonarne/architektura/semestr2': {
        path: 'niestacjonarne/architektura/semestr2',
        type: 'schedule',
        link: 'somelink'
    },
    'niestacjonarne/architektura/semestr3': {
        path: 'niestacjonarne/architektura/semestr3',
        type: 'schedule',
        link: 'somelink'
    }
}

export default function Tree() {

    const [nodes, setNodes] = useState({});
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let jsonArr = getTreeStructure().then(result => {
            let tempData = {}
            for(let node of result.fetchJsonType) {
                tempData[node.path] = node;
            }
            console.log("tree", tempData)
            setNodes(tempData);
            setLoading(false)
        });
    }, [])


    const getRootNodes = () => {
        return Object.values(nodes).filter(node => node.isRoot === true);
    }

    const getChildNodes = (node) => {
        if (!node.children) return [];

        let existingNodes = []
        for (let path of node.children) {
            if (typeof(nodes[path]) !== "undefined")
                existingNodes.push(nodes[path]);
        }
        return existingNodes;
    }

    const onToggle = (node) => {
        let tempNodes = { ...nodes };
        tempNodes[node.path].isOpen = node.isOpen;
        setNodes(tempNodes);
    }

    return(
        <div className="treeContainer">
            {loading && <p>loading...</p>}
            {!loading && getRootNodes().map(node => (
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