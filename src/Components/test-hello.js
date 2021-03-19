import React, {useState} from 'react';

function Hello(){
    const [count,setcount] = useState(0);

    const hello = () =>{
        setcount(count +1);
    };

    return(
        <div>
            <h3>Hello React</h3>
            <button onClick={hello}>{count}</button>
        </div>
        
    );
}

export default Hello;