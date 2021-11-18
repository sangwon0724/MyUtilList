//전역 변수
let today = new Date();

let year = today.getFullYear(); // 연도
let month = today.getMonth();  // 월 (0~11)

let today_year = today.getFullYear(); // 연도
let today_month = today.getMonth();  // 월 (0~11)
let today_date = today.getDate();  // 날짜

let schedule_start=1; //일정 시작 체크값, 해당 주가 시작하는 날짜
let schedule_end; //일정 종료 체크값, 해당 주가 종료되는 날짜

//일정 테스트용
let schedule_test = [{start:"2021-11-01",end:"2021-11-05"}, {start:"2021-11-17",end:"2021-11-19"}, {start:"2021-11-25",end:"2021-12-07"}];

//캘린더 생성
function init_calendar(){
    //해당 달의 첫째날과 마지막날
    let firstDay = new Date(year, month, 1).getDay();

    let lastDay = new Date(year, month+1, 0).getDay();

    let totalDate = new Date(year, month+1, 0).getDate(); //월별 총 일수

    let calendar = ``; //캘린더 내용물

    let totalWeek = Math.ceil((totalDate+firstDay)/7); //전체 주차 수
    let day_check = 1; //날짜 체크용
    
    //1주 단위로 돌리기
    for(let week_loop = 1; week_loop <= totalWeek; week_loop++){
        calendar += `<tr>`; //tr 열기

        //1일 단위로 돌리기 - 날짜용
        for(let day_loop = 0; day_loop < 7; day_loop++){
            //1주차와 마지막 주차에 대한 빈 칸용
            if(week_loop === 1 && firstDay !== 0 && day_loop < firstDay){
                //1주차 전용
                calendar += `<td class="empty">X</td>`;
            }
            else if (week_loop === totalWeek && day_check>totalDate){
                //마지막 주차
                calendar += `<td class="empty">X</td>`;
            }
            else{
                calendar += `<td class="notEmpty`; //td 열기

                //현재 날짜
                if(year === today_year && month === today_month && today_date === day_check) calendar += ` today`;

                //주말 체크
                if(day_loop === 0) calendar += ` sunday`;
                else if (day_loop === 6) calendar += ` saturday`;

                calendar += `">${day_check}</td>`; //td 닫기

                //일정 목록 추가
                if(day_loop === 6){
                    schedule_end = day_check; //해당 주의 마지막날 (캘린더 모양상 토요일)

                    let week_start = new Date(year+"-"+month+"-"+schedule_start); //한주가 시작하는 시점 (빈 칸 제외)
                    let week_end = new Date(year+"-"+month+"-"+schedule_end); //한주가 종료되는 시점

                    //일정 배열 돌리기
                    schedule_test.forEach(schedule => {
                        let start = new Date(schedule.start);
                        let end = new Date(schedule.end);

                        /*
                            let btMs = endDate.getTime()-stDate.getTime();
                            let btDay = btMs / (1000*60*60*24);
                        */
                        if(week_start<=start && week_end>=end){
                            //1일 단위로 돌리기 - 일정용
                            for(let i = schedule_start; i <= schedule_end; i++){
                                
                            }
                        }
                    });

                    schedule_start = day_check + 1;
                }
                
                day_check++;
            }
        }//1일 단위 for문 종료

        calendar += `</tr>`; //tr 닫기

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