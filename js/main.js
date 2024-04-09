function LoadFOOTER() { //LoadFOOTER 함수 선언
    const allElement = document.getElementsByTagName('*'); //HTML 문서의 (getElementsByTagname, *은 모든 태그를 뜻함)모든 요소를 allElement 변수에 저장
    for (var i = 0; i < allElement.length; i++) { //모든 요소를 반복(for)
        var el = allElement[i]; //인덱스 i를 el 변수에 저장
        var fotpath = el.getAttribute("fot-include-path"); //fot-include-path 의 값을 forpath 변수에 저장
        if (fotpath) { //fot-include-path 속성이 fotpath에 있다면
            var xhttp = new XMLHttpRequest(); //새로운 XMLHttpRequest을 xhttp 변수에 저장.
            xhttp.onreadystatechange = function () { //onreadystatechange 함수 생성
                if (this.readyState == 4 && this.status == 200) { //서버 응답코드가 200이고, 응답의 상태가 4일때(=요청이 완료되고 응답이 정상적으로 받아졌을 때)
                    el.innerHTML = this.responseText; //el의 내용을 this.responseText로 설정(=대체)
                    el.removeAttribute("fot-include-path"); //fot-include-path를 지우기=> 요소가 한번만 로드되도록 하기 위해
                    LoadFOOTER(); //함수 재귀적 호출
                }
            }
            xhttp.open("GET", fotpath, true); //get 생성, url은 forpath로 지정
            xhttp.send(); //요청 => 서버
            return; //함수 종료
        }
    }
}