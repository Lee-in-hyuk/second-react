import { useRef } from "react";
import useFetch from "../hook/useFetch";
export default function CreateCourse(){
    //useFetch에 있는 months를 받아와서 select에 사용하기 위해.
    const months = useFetch('http://localhost:3002/months');
    // const courses = useFetch('http://localhost:3002/courses');
    //useRef의 초기값을 설정해주기 위해 null을 입력.
    const titleRef = useRef(null);
    const dayRef = useRef(null);
    const monRef = useRef(null);
    const idnum = useRef(6); //courses의 데이터의 마지막 id값을 지정하고
    //POST전송 fetch메서드의 then에 res가 ok될 때 idnum이 1씩 추가되게 설정

    //1. 저장 버튼을 누르면 새로고침 되는 기존 이벤트가 있었던걸 없애주는 함수
    //2. 저장 버튼 클릭 시 실행
    function onSubmit(e){
        //1번
        //preventDefault - 원래 갖고 있던 이벤트를 제거해주는 메서드
        e.preventDefault();
        console.log(titleRef.current.value);
        //titleRef은 객체형태
        //titleRef.current는 titleRef라는 객체 안에 있는 input을 받아옴
        //titleRef.current.value은 input에 입력된 값을 받아옴.
        console.log(dayRef.current.value);
        console.log(monRef.current.value);
        
        //2번
        //POST전송
        fetch('http://localhost:3002/courses',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            //JSON은 자바스크립트 객체에 프로퍼티 값들을 넣어 JSON형태로 Ajax에 전달
            //기본 형태는 JSON Object형태로 객체와 비슷하지만 key와 value의 string타입은
            //""를 붙여서 나타낸다.
            //ex) { "name":"hong", "job":[], "age":20}
            //javascript 객체를 JSON문자열로 변환할 때 JSON.stringify사용
            body:JSON.stringify({
                id: idnum.current.value+1,
                deadline: false,
                month: monRef.current.value,
                title: titleRef.current.value,
                day: dayRef.current.value
            })
        }).then(res=>{
            if(res.ok){
                alert('등록되었습니다.');
                // idnum.current = idnum.current+1;
                //이거 대신 fetch안에 있는 body의 id 값에 바로 +1을 해도 가능.
            }
        })
    }

    return(
        <div>
            <h2>과정 추가하기</h2>
            <form onSubmit={onSubmit}>
                <p>과정명
                    <input type="text" ref={titleRef}/>
                </p>
                <p>개강일
                    <input type="text" ref={dayRef}/>
                </p>
                <p>개강월
                    <select ref={monRef}>
                        {/* data.json에 있는 months데이터에 map메서드를 이용해서 id와 month값을 사용 */}
                        {months.map(month=>(
                            // key는 id 값으로 지정, value는 month값으로 지정
                            <option key={month.id} value={month.month}>{month.month}</option>
                        ))}
                    </select>
                </p>
                <p>
                    <button>저장</button>
                </p>
            </form>
        </div>
    );
}