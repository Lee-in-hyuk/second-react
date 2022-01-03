import { useState } from "react";
export default function Class({course : c}){ //props인 course를 c로 받게 하려고 course : c작성
    //props를 그대로 course를 쓰면 구조분해할당한 [course, setCourse]에서
    //course값을 useState로 받을 때 중복된 이름으로 작성되기 때문에 props를 c로 변경해서 받아야 함.
    const [ course, setCourse ] = useState(c); //useState의 초기값을 c로 지정
    const [isDeadline, setIsDeadline ] = useState(course.deadline);
    //데드라인 수정하는 함수
    function chIsDeadline(){
        fetch(`http://localhost:3002/courses/${course.id}`,{
            method:"PUT", //업데이트할 땐 PUT
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                ...course,
                deadline: !isDeadline
            })
        }).then(res=>{
            if(res.ok){
                setIsDeadline(!isDeadline);
            }
        })
    }
    //삭제하는 함수
    function del(){
        if(window.confirm('삭제하시겠습니까?')){
            fetch(`http://localhost:3002/courses/${course.id}`,{ //fetch를 통해서 3002서버에 데이터를 보냄.
                method:"DELETE" //삭제할 땐 DELETE
            }).then(res=>{ //fetch가 되면 = then
                if(res.ok){
                    setCourse({ id:0 }); // 이걸 안 쓰면 서버에는 지워졌어도 data.json에는 그대로 남아있기 때문에 데이터를 지워주기 위해 작성
                }
            })
        }
    }
    //id가 0인 것들은 안 보이게 하기 위해 null로 리턴해줌.
    if(course.id === 0){
        return null;
    }
    return(
        <tr key={course.id} className={isDeadline ? "on" : ""}>
            <td><input type="checkbox" checked={isDeadline} onChange={chIsDeadline}/>{course.day}</td>
            <td>{course.title} <button onClick={del}>삭제</button></td>
        </tr>
    );
}