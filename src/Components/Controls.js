import React , {useState , useEffect} from "react";
import {faList , faHamburger} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../Styles/controls.css"

export function Controls({changeListType}){
    let [showControls , setShowControls] = useState(false);
    let [listType , setListType] = useState('Compact');

    useEffect(()=>{
      const change = ()=>{
        changeListType(listType === "List" ? true : false)
      }
      change();
    } , [listType]);

    return(
        <div className="controls__super">    
            <div style={{display: 'flex' , gap:'10px' , justifyContent: 'center' , alignItems:'center'}}>
                <small style={{cursor: "pointer"}} onClick={()=>setShowControls(!showControls)}>{listType}</small>
                <FontAwesomeIcon icon={listType === 'List' ? faList : faHamburger} className='controls__super__list' onClick={()=>setShowControls(!showControls)}/>
            </div>
            {showControls && 
                <div className="controls__list__song__list">
                    <small>View as</small>
                    <hr />
                    <div 
                        className="compact" onClick={()=>{
                            setListType("Compact");
                            setShowControls(false);
                        }}
                        style={{color: listType === "Compact" ? "green" : 'white'}}>
                        <FontAwesomeIcon icon={faHamburger}/>Compact{listType === "Compact" &&  "✓"}
                </div>
                <div className="list" onClick={()=>{
                    setListType("List");
                    setShowControls(false);
                }} style={{color: listType === "List" ? "green" : 'white'}}>
                    <FontAwesomeIcon icon={faList}/>
                    List
                    {listType === "List" &&  "✓"}
                </div>
            </div>}
        </div>
    )
}