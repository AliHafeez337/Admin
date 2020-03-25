import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faProjectDiagram,
    faTree,
    faChalkboard,
    faComments,
    faStickyNote,
    faBookReader,
    faListOl,
    faBook,
    faUserPlus,
    faUsers,
    faBuilding,
    faChalkboardTeacher,
    faTools,
    faFile,
    faClipboard,
    faAddressCard,
    faCheckDouble,
    faQuestion

} from '@fortawesome/free-solid-svg-icons';

var diagram = 
    <div>
       {/* <span className="pe-7s-leaf"></span> */}
       <FontAwesomeIcon icon={faProjectDiagram}/>
       <span>&nbsp;Tree Diagram</span>
    </div>

var tree = 
    <div>
       {/* <span className="pe-7s-network"></span> */}
       <FontAwesomeIcon icon={faTree}/>
       <span>&nbsp;Topic Tree</span>
    </div>
;
var board = 
    <div>
        {/* <span className="pe-7s-note"></span> */}
       <FontAwesomeIcon icon={faChalkboard}/>
        <span>&nbsp;Board</span>
    </div>
;
var discord = 
    <div>
        {/* <span className="pe-7s-chat"></span> */}
       <FontAwesomeIcon icon={faComments}/>
        <span>&nbsp;Discord</span>
    </div>
;
var summary = 
    <div>
        {/* <span className="pe-7s-note"></span> */}
       <FontAwesomeIcon icon={faListOl}/>
        <span>&nbsp;Summary</span>
    </div>
;
var detail = 
    <div>
        {/* <span className="pe-7s-chat"></span> */}
       <FontAwesomeIcon icon={faBook}/>
        <span>&nbsp;Detail</span>
    </div>
;
var position = 
    <div>
       <FontAwesomeIcon icon={faUserPlus}/>
        <span>&nbsp;Open Position</span>
    </div>
var people = 
    <div>
        {/* <span className="pe-7s-users"></span> */}
       <FontAwesomeIcon icon={faUsers}/>
        <span>&nbsp;People</span>
    </div>
;
var enterprise = 
    <div>
        {/* <span className="pe-7s-diamond"></span> */}
       <FontAwesomeIcon icon={faBuilding}/>
        <span>&nbsp;Enterprise</span>
    </div>
;
var academy = 
    <div>
        {/* <span className="pe-7s-pen"></span> */}
       <FontAwesomeIcon icon={faChalkboardTeacher}/>
        <span>&nbsp;Academy</span>
    </div>
;
var tools = 
    <div>
        {/* <span className="pe-7s-tools"></span> */}
       <FontAwesomeIcon icon={faTools}/>
        <span>&nbsp;Tool</span>
    </div>
;
var patent = 
    <div>
        {/* <span className="pe-7s-note2"></span> */}
       <FontAwesomeIcon icon={faFile}/>
        <span>&nbsp;Patent</span>
    </div>
;
var about = 
    <div>
        {/* <span className="pe-7s-drawer"></span> */}
       <FontAwesomeIcon icon={faAddressCard}/>
        <span>&nbsp;About</span>
    </div>
;
var improvements = 
    <div>
        {/* <span className="pe-7s-check"></span> */}
       <FontAwesomeIcon icon={faCheckDouble}/>
        <span>&nbsp;Improvements</span>
    </div>
;
var help = 
    <div>
        {/* <span className="pe-7s-help1"></span> */}
       <FontAwesomeIcon icon={faQuestion}/>
        <span>&nbsp;Help</span>
    </div>
;

export const HomeNav = [
    {
        icon: 'pe-7s-home',
        label: 'Home',
        to: '#/dashboards/home',
    }]
export const IdeaNav = [
    {
        icon: 'pe-7s-light',
        label: 'Idea',
        to: '#/elements/light',
        content: [
            {
                
                label: diagram,
                to: '#tree/diagram',
            },
            {
                
                label: tree,
                to: '#/elements/topic-tree',
            },
            {
                label: board,
                to: '#/elements/board',

            },
            {
                label: discord,
                to: '#/elements/discord',
            },
        ],
    }]
export const ProjectNav = [{
        icon: 'pe-7s-graph3',
        label: 'Project',
        content: [
            {
                label: summary,
                to: '#/elements/project',
            },
            {
                label: detail,
                to: '#/elements/detail',

            },
            {
                label: position,
                to: '#/elements/open-position',
            },
        ],
    }]
export const SupporterNav = [{
        icon: 'pe-7s-star',
        label: 'Supporter',
        content: [
            {
                label: people,
                to: '#/elements/people',
            },
            {
                label: enterprise,
                to: '#/elements/enterprise',

            }
        ],
    }]
export const FinanceNav = [{
        icon: 'pe-7s-graph1',
        label: 'Finance',
        to: '#/finance/home'
    }]
export const StorageNav = [{
        icon: 'pe-7s-graph',
        label: 'Storage',
        content: [
            {
                label: academy,
                to: '#/elements/academy',
            },
            {
                label: tools,
                to: '#/elements/tool',

            },
            {
                label: patent,
                to: '#/elements/patent',
            },
        ],
    }]
export const InfoNav = [{
        icon: 'pe-7s-info',
        label: 'Info',
        content: [
            {
                label: about,
                to: '#/elements/info',
            },
            {
                label: improvements,
                to: '#/elements/improvement',

            },
            {
                label: help,
                to: '#/elements/help',
            },
        ],
    }
];
