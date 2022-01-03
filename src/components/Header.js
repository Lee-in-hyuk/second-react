import { Link } from "react-router-dom";
export default function Header(){
    return(
        <div className="header">
            <h1><Link to="/">그린컴퓨터 수업과정</Link></h1>
            <ul>
                <li><Link to="/addCourse">과정 추가하기</Link></li>
                <li><Link to="/addMonth">월 추가하기</Link></li>
            </ul>
        </div>
    );
}