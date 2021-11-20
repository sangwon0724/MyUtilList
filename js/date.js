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
        {name:"first",start:"2021-11-01",end:"2021-11-08",color:"green"},
        {name:"second",start:"2021-11-17",end:"2021-11-21",color:"blue"},
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
        //console.log("=================================== "+week_loop+"주차 시작 ==================================="); //임시

        calendar += `<tr>`; //tr 열기

        //1일 단위로 돌리기 - 날짜용
        for(let day_loop = 0; day_loop < 7; day_loop++){
            //1주차와 마지막 주차에 대한 빈 칸용
            if(week_loop === 1 && firstDay !== 0 && day_loop < firstDay){
                //1주차 전용
                calendar += `<td class="empty"></td>`;
            }
            else if (week_loop === totalWeek && day_check>totalDate){
                //마지막 주차
                calendar += `<td class="empty"></td>`;
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

        //해당 주의 첫째날과 마지막날
        let week_start = new Date(year+"-"+(month+1)+"-"+((week_loop-1)*7 + 1 - firstDate.getDay())); //한주가 시작하는 시점 (빈 칸 제외)
        if(week_loop === 1){week_start = firstDate;}
        let week_end = new Date(year+"-"+(month+1)+"-"+(week_loop*7 - firstDate.getDay())); //한주가 종료되는 시점
        if(week_loop === totalWeek){week_end = lastDate;}

        //일정 배열 돌리기
        schedule_test.forEach(schedule => {
            let schedule_start = new Date(schedule.start);
            let schedule_end = new Date(schedule.end);
            //console.log("======================"+schedule.name+"============================");//임시
            calendar += `<tr class="schedule">`; //스케쥴 tr 열기

            let merch_check=true; //합치기 체크용

            //합칠 칸의 길이
            let merge_length=0;
            for(let jj = week_start.getDate(); jj <= week_end.getDate(); jj++){
                //요일에 따른 값 체크
                let checkDateStr;
                if(jj<10) checkDateStr = year+"-"+(month+1)+"-0"+jj;
                else checkDateStr = year+"-"+(month+1)+"-"+jj;
                
                let checkDate = new Date(checkDateStr); //체크용 날짜

                //스케쥴 시작일 <= 체크용 날짜 <= 스케쥴 종료일
                if(schedule_start <= checkDate && checkDate <= schedule_end){
                    merge_length++;
                }
            }

            //앞쪽의 빈 칸 채우기
            if(week_start.getDay() > 0){
                for(let i = 0; i < week_start.getDay(); i++){
                    calendar += `<td class="empty_front"></td>`; //빈 그래프 추가
                }
            }

            var line_check=week_start.getDate(); //합치기때문에 생기는 오류 방지용
            //칸 채우기
            for(let j = week_start.getDate(); j <= week_end.getDate(); j++){
                //요일에 따른 값 체크
                let checkDateStr;
                if(j<10) checkDateStr = year+"-"+(month+1)+"-0"+j;
                else checkDateStr = year+"-"+(month+1)+"-"+j;
                
                let checkDate = new Date(checkDateStr); //체크용 날짜

                //스케쥴 시작일 <= 체크용 날짜 <= 스케쥴 종료일
                if(schedule_start <= checkDate && checkDate <= schedule_end && merch_check){
                    //색상 그래프 추가
                    calendar += `<td style="background-color:${schedule.color}; grid-column: span ${merge_length};" class="schedule_name_${schedule.name}"><span>${schedule.name}</span></td>`;
                    merch_check=false;
                    line_check+=+merge_length;
                }
                else{
                    //빈 그래프 추가
                    if(line_check<=week_end.getDate()){
                        //빈 그래프 추가
                        if(checkDate.getFullYear()===today.getFullYear() && checkDate.getMonth()===today.getMonth() && checkDate.getDate()===today.getDate()) calendar += `<td class="today"></td>`; //오늘인 경우에 대한 처리 추가
                        else calendar += `<td></td>`;
                    }
                    line_check++;
                }
            }

            //뒤쪽의 빈 칸 채우기
            if(week_end.getDay()<6){
                for(let k = 0; k < 6-week_end.getDay(); k++){
                    calendar += `<td class="empty_back"></td>`; //빈 그래프 추가
                }
            }

            calendar += `</tr>`; //스케쥴 tr 닫기
            
        }); //일정 배열 forEach문 종료

        schedule_start = day_check; //해당 주의 시작하는 날 (캘린더 모양상 일요일)

        //console.log("=================================== "+week_loop+"주차 종료 ==================================="); //임시
    }//1주 단위 for문 종료

    //캘린더 생성
    $("#calendar_table>tbody").html(calendar);

    //yyyy년 mm월 dd일 변경
    $("#calendar_info").html(`${year}년 ${month+1}월`);

    //일정 목록
    let calendar_list = ``;
    schedule_test.forEach(schedule => {
        calendar_list += `
            <div class="line">
                <div class="schedule_line_color">
                    <div style="background-color : ${schedule.color};"></div>
                </div>
                <div class="schedule_line_name"><span>${schedule.name}</span></div>
                <div class="schedule_line_date"><span>${schedule.start} ~ ${schedule.end}</span></div>
            </div>
        `;
    });
    $("#calendar_list").html(calendar_list);
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

//스케쥴 추가
function add_schedule(){
    let schedule_name = $("#schedule_name").val();
    let schedule_start = $("#schedule_start").val();
    let schedule_end = $("#schedule_end").val();
    let schedule_color = $("#schedule_color").val();

    if(schedule_name === ""){
        alert("일정의 이름을 입력해주시길 바랍니다.");
        return;
    }
    else if(schedule_start === ""){
        alert("일정의 시작일을 입력해주시길 바랍니다.");
        return;
    }
    else if(schedule_end === ""){
        alert("일정의 종료일을 입력해주시길 바랍니다.");
        return;
    }
    else if(schedule_color === "#000000" || schedule_color === "#ffffff"){
        alert("일정의 구분을 위해서 다른 색상을 선택해주시길 바랍니다.");
        return;
    }

    let color_check=false; //색상 중복 체크

    for(let i=0; i<schedule_test.length; i++){
        console.log("비교값 색상 : "+schedule_test[i].color);
        console.log("비교 결과 : "+(schedule_name === schedule_test[i].color));
        if(schedule_color === schedule_test[i].color){
            color_check=true;
            break;
        }
    }
    
    if(color_check){
        alert("이미 존재하는 색상입니다.\n구분을 위해 색을 변경해주시길 바랍니다.");
        return;
    }

    //배열에 저장
    schedule_test.push(
        {
            name : schedule_name,
            start : schedule_start,
            end : schedule_end,
            color : schedule_color
        }
    );

    //캘린더 그리기
    init_calendar();
}