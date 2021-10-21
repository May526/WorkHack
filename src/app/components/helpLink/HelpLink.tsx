import React from 'react'

export default function HelpLink(props:{hyref:string,titleName:string}) {
    const {hyref,titleName} = props;
    return (
        <div style={{fontSize:"smaller"}}>
            <a href={hyref} target="_blank" rel="noreferrer" title={titleName}>
            ?
            </a>
        </div>
    )
}
