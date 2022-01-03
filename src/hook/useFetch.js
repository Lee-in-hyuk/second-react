import { useEffect, useState } from "react";
export default function useFetch(url){
    const [ data, setData ] = useState([]);
    useEffect(()=>{
        fetch(url)
        .then(res=>{
            return res.json(); // json이라는 메서드를 사용
        }).then(data => {
            setData(data);
        })
    },[url]);
    // console.log(url); //http://localhost:3002/courses 찍힘
    return data;
}