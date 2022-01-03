import { useRef } from "react";
import useFetch from "../hook/useFetch";
export default function CreateMonth(){
    // const months = useFetch('http://localhost:3002/months');
    const idnum = useRef(4);
    const monRef = useRef(null);
    function onSubmit(e){
        e.preventDefault();
        
        fetch('http://localhost:3002/months',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id: idnum.current.value+1,
                month: monRef.current.value
            })
        }).then(res=>{
            if(res.ok){
                alert('추가되었습니다.');
                // idnum.current = idnum.current+1;
                //이거 대신 fetch안에 있는 body의 id 값에 바로 +1을 해도 가능. 
            }
        })
    }
    return(
        <div>
            <h2>월 추가하기</h2>
            <form onSubmit={onSubmit}>
                <p>개강월
                    <select ref={monRef}>
                        <option>1월</option>
                        <option>2월</option>
                        <option>3월</option>
                        <option>4월</option>
                        <option>5월</option>
                        <option>6월</option>
                        <option>7월</option>
                        <option>8월</option>
                        <option>9월</option>
                        <option>10월</option>
                        <option>11월</option>
                        <option>12월</option>
                    </select>
                </p>
                <p>
                    <button>추가하기</button>
                </p>
            </form>
        </div>
    );
}