//전역 변수
let today = new Date();

let year = today.getFullYear(); // 연도
let month = today.getMonth();  // 월 (0~11)

let today_year = today.getFullYear(); // 연도
let today_month = today.getMonth();  // 월 (0~11)
let today_date = today.getDate();  // 날짜

//일정 테스트용
let schedule_test
    = [
        {name:"first",start:"2021-11-01",end:"2021-11-05",color:"green"},
        {name:"second",start:"2021-11-17",end:"2021-11-19",color:"blue"},
        {name:"third",start:"2021-11-25",end:"2021-12-07",color:"red"}
    ];

//캘린더 생성
function init_calendar(){
    //해당 달의 첫째날과 마지막날
    let firstDate = new Date(year, month, 1);
    let firstDay = new Date(year, month, 1).getDay();

    let lastDate = new Date(year, month+1, 0);
    let lastDay = new Date(year, month+1, 0).getDay();

    let totalDate = new Date(year, month+1, 0).getDate(); //월별 총 일수

    let calendar = ``; //캘린더 내용물

    let totalWeek = Math.ceil((totalDate+firstDay)/7); //전체 주차 수 (해당 달의 날짜 수 + 해당 달의 첫째날의 요일 값)
    let day_check = 1; //날짜 체크용
    
    //1주 단위로 돌리기
    for(let week_loop = 1; week_loop <= totalWeek; week_loop++){
        console.log("=================================== "+week_loop+"주차 시작 ==================================="); //임시

        calendar += `<tr>`; //tr 열기

        //1일 단위로 돌리기 - 날짜용
        for(let day_loop = 0; day_loop < 7; day_loop++){
            //1주차와 마지막 주차에 대한 빈 칸용
            if(week_loop === 1 && firstDay !== 0 && day_loop < firstDay){
                //1주차 전용
                calendar += `<td></td>`;
            }
            else if (week_loop === totalWeek && day_check>totalDate){
                //마지막 주차
                calendar += `<td></td>`;
            }
            else{
                calendar += `<td class="`; //td 열기

                //현재 날짜
                if(year === today_year && month === today_month && today_date === day_check) calendar += ` today`;

                //주말 체크
                if(day_loop === 0) calendar += ` sunday`;
                else if (day_loop === 6) calendar += ` saturday`;

                calendar += `">${day_check}</td>`; //td 닫기
                
                day_check++;
            }
        }//1일 단위 for문 종료

        calendar += `</tr>`; //tr 닫기
        
        //일정 목록 추가
        schedule_end = day_check-1; //해당 주의 마지막날 (캘린더 모양상 토요일)
        
        let week_start = new Date(year+"-"+(month+1)+"-"+(firstDate.getDay()+7*(week_loop-1))); //한주가 시작하는 시점 (빈 칸 제외)
        if(week_loop === 1){week_start = firstDate;}
        console.log("day_check : ",day_check);
        let week_end = new Date(year+"-"+(month+1)+"-"+(((6-firstDate.getDay())+firstDate.getDate())+7*(week_loop-1))); //한주가 종료되는 시점
        if(week_loop === totalWeek){week_end = lastDate;}

        console.log("week_start : ",week_start);
        console.log("week_end : ",week_end);


        //일정 배열 돌리기
        schedule_test.forEach(schedule => {
            let schedule_start = new Date(schedule.start);
            let schedule_end = new Date(schedule.end);
            //let schedule_length = (schedule_end.getTime()-schedule_start.getTime()) / (1000*60*60*24) + 1; //스케쥴 길이, 날짜의 차이라서 + 1
            calendar += `<tr class="schedule">`; //스케쥴 tr 열기

            /*console.log("schedule_start : ",schedule_start);
            console.log("schedule_end : ",schedule_end);
            //console.log("schedule_length : ",schedule_length);
            console.log("lastDate : ",lastDate);*/

            calendar += `<tr class="schedule">`; //스케쥴 tr 열기

            //캘린터의 빈 칸 처리
            if(week_start <= schedule_start && schedule_start <= week_end){
                for(let i = 0; i < week_start.getDay(); i++){
                    calendar += `<td></td>`; //빈 그래프 추가
                }
            }

            //칸 채우기
            for(let j = week_start.getDate(); j <= week_end.getDate(); j++){
                //요일에 따른 값 체크
                let checkDateStr;
                if(j<10) checkDateStr = year+"-"+(month+1)+"-0"+j;
                else checkDateStr = year+"-"+(month+1)+"-"+j;
                console.log("checkDateStr : "+checkDateStr);
                let checkDate = new Date(checkDateStr);
                console.log("checkDate : "+checkDate);
                console.log("schedule_start : ",schedule_start);
                console.log(schedule_start <= checkDate);
                console.log(checkDate <= schedule_end);

                if(schedule_start.getDay)
                if(schedule_start <= checkDate && checkDate <= schedule_end){
                    calendar += `<td style="background-color:${schedule.color};"></td>`; //색상 그래프 추가
                }
                else{
                    calendar += `<td></td>`; //빈 그래프 추가
                }
            }

            calendar += `</tr>`; //스케쥴 tr 닫기

            //스케쥴 종류
            //1. 일주일 안에 해결되는 경우
            /*if(week_start<=schedule_start && week_end>=schedule_end){

                calendar += `<tr class="schedule">`; //스케쥴 tr 열기

                //1일 단위로 돌리기 - 일정용
                for(let i = 0; i <= 6; i++){
                    //요일에 따른 값 체크
                    if(schedule_start.getDay()<=i && i<=schedule_end.getDay()){
                        calendar += `<td style="background-color:${schedule.color};"></td>`; //색상 그래프 추가
                    }
                    else{
                        calendar += `<td></td>`; //빈 그래프 추가
                    }
                }

                calendar += `</tr>`; //스케쥴 tr 닫기
            }
            //2. 2주 이상으로 걸치는 경우
            //(1) 스케쥴 시작일의 요일에 (스케쥴 길이-1)을 더한 것이 6보다 큰 경우
            //(2) 스케쥴 길이가 7일 이상
            if((schedule_start.getDay()+(schedule_length-1)>6) || schedule_length>7){

                console.log("schedule_start : ",schedule_start);
                console.log("schedule_end : ",schedule_end);
                console.log("schedule_length : ",schedule_length);
                console.log("week_start : ",week_start);
                console.log("week_end : ",week_end);
                console.log("lastDate : ",lastDate);

                calendar += `<tr class="schedule">`; //스케쥴 tr 열기

                for(let i = week_start.getDate(); i <= week_end.getDate(); i++){
                    //요일에 따른 값 체크
                    let checkDate = new Date(year+"-"+(month+1)+"-"+i);
                    console.log("checkDate : "+checkDate);

                    if(schedule_start <= checkDate &&  checkDate <= schedule_end){
                        calendar += `<td style="background-color:${schedule.color};"></td>`; //색상 그래프 추가
                    }
                    else{
                        calendar += `<td></td>`; //빈 그래프 추가
                    }
                }

                //2-1. 시작일 ~ 해당 주의 토요일 (스케쥴의 시작일 <= 해당 주의 종료일), 마지막 주 이전
                if(schedule_start<=week_end && week_loop < totalWeek){
                    console.log("A");
                    for(let i = 0; i <= 6; i++){
                        //요일에 따른 값 체크
                        if(schedule_start.getDay()<=i && schedule_start.getMonth() === schedule_end.getMonth()){
                            calendar += `<td style="background-color:${schedule.color};"></td>`; //색상 그래프 추가
                        }
                        else{
                            calendar += `<td></td>`; //빈 그래프 추가
                        }
                    }
                }
                //2-2. 다음주의 일요일 ~ 종료일 (해당 주의 시작일 <= 스케쥴의 종료일 <= 해당 주의 종료일), 달이 바뀌지 않는 경우
                else if(week_start <= schedule_end && schedule_end <= week_end){
                    console.log("B");
                    for(let i = 0; i <= 6; i++){
                        //요일에 따른 값 체크
                        if(schedule_end.getDay()>=i){
                            calendar += `<td style="background-color:${schedule.color};"></td>`; //색상 그래프 추가
                        }
                        else{
                            calendar += `<td></td>`; //빈 그래프 추가
                        }
                    }
                }
                //2-3. 달이 바뀌지 않는 경우 (스케쥴 종료일 > 해당 달 마지막날), 마지막 주
                else if(schedule_end > lastDate && week_loop === totalWeek){
                    console.log("C");
                    for(let i = 0; i <= 6; i++){
                        //요일에 따른 값 체크
                        if(schedule_end.getDay()>=i){
                            calendar += `<td style="background-color:${schedule.color};"></td>`; //색상 그래프 추가
                        }
                        else{
                            calendar += `<td></td>`; //빈 그래프 추가
                        }
                    }
                }

                calendar += `</tr>`; //스케쥴 tr 닫기
            }*/

        });

        schedule_start = day_check; //해당 주의 시작하는 날 (캘린더 모양상 일요일)

        console.log("=================================== "+week_loop+"주차 종료 ==================================="); //임시
    }//1주 단위 for문 종료

    //캘린더 생성
    $("#calendar_table>tbody").html(calendar);
    //yyyy년 mm월 dd일 변경
    $("#calendar_info").html(`${year}년 ${month+1}월`);
}//init_calendar 종료

//초기화 실행
init_calendar();

//1달 앞으로 이동
function calendar_left(){
    month -= 1;

    if(month === -1){
        month = 11;
        year -= 1;
    }

    init_calendar();
}

//1달 뒤로 이동
function calendar_right(){
    month += 1;

    if(month === 12){
        month = 0;
        year += 1;
    }

    init_calendar();
}