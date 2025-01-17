const style = document.createElement('style');
style.innerHTML = `
    @font-face {
        font-family: 'MaruBuri-Bold';
        src: url('TTF/MaruBuri-Bold.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    body {
        font-family: 'MaruBuri-Bold', sans-serif;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, var(--soft-beige), var(--light-beige), var(--light-orange));
        color: var(--dark-blue);
        animation: fadeIn 1s ease-out;
    }
`;

document.head.appendChild(style);


// JSON 파일 로드
const teamDataUrl = "team_info.json";
const roomDataUrl = "room_info.json";

// 데이터를 저장할 변수
let teamData = [];
let roomData = [];

// 페이지 로드 시 JSON 데이터 로드
fetch(teamDataUrl)
    .then(response => response.json())
    .then(data => teamData = data.teams)
    .catch(error => console.error("Unable to load JSON file:", error));

fetch(roomDataUrl)
    .then(response => response.json())
    .then(data => roomData = data.rooms)
    .catch(error => console.error("Unable to load room data:", error));

// 초기화 및 숨기기 함수
function resetAndHide() {
    const divs = [
        document.getElementById("teamInfo"),
        document.getElementById("emergencyInfo"),
        document.getElementById("allTeams"),
        document.getElementById("scheduleInfo"),
        document.getElementById("roomInfo"),
        document.getElementById("allRooms")
    ];

    divs.forEach(div => {
        div.innerHTML = "";
        div.style.display = "none";
    });
}
function findTeam() {
    let name = document.getElementById("nameInput").value.trim();
    if (name.toLowerCase() === "maria") {
        name = "마리아";
    }
    const resultDiv = document.getElementById("teamInfo");

    // 초기화 및 숨기기
    resetAndHide();

    if (!name) {
        resultDiv.innerHTML = "<p>이름을 먼저 입력하세요 :)</p>";
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
        return;
    }

    const team = teamData.find(team => team.members.includes(name) || team.leader === name || team.subLeader === name);

    if (team) {
        resultDiv.innerHTML = `
            <h2>새로고침을 원하는 <br>${name}!</h2>
            <h3>당신은 ${team.teamNumber}조입니다!</h3>
            <hr>
            <p><strong>조:</strong> ${team.teamNumber}</p>
            <p><strong>조장:</strong> ${team.leader}</p>
            <p><strong>부조장:</strong> ${team.subLeader}</p>
            <p><strong>조원:</strong> ${team.members.join(", ")}</p>
            <p><strong>조별 장소:</strong> ${team.location}</p>
        `;
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
    } else {
        resultDiv.innerHTML = `<p>${name}는 어떤 팀에도 속하지 않습니다.</p>`;
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
    }
}

function showAllTeams() {
    const resultDiv = document.getElementById("allTeams");

    // 초기화 및 숨기기
    resetAndHide();

    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Meeting Location</th>
                    <th>Leader</th>
                    <th>Sub-Leader</th>
                    <th>Members</th>
                </tr>
            </thead>
            <tbody>
    `;

    teamData.forEach(team => {
        tableHtml += `
            <tr>
                <td>${team.teamNumber}</td>
                <td>${team.location}</td>
                <td>${team.leader}</td>
                <td>${team.subLeader}</td>
                <td>${team.members.join(", ")}</td>
            </tr>
        `;
    });

    tableHtml += "</tbody></table>";
    resultDiv.innerHTML = tableHtml;
    resultDiv.style.display = "block";
    resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
}


// 비상 연락망 표시
function showEmergency() {
    const emergencyDiv = document.getElementById("emergencyInfo");

    // 초기화 및 숨기기
    resetAndHide();

    emergencyDiv.innerHTML = `
        <h2>Emergency Contacts</h2>
        <p><strong>Health Teacher:</strong> 010-0000-0000</p>
        <p><strong>Safety Teacher:</strong> 010-0300-0000</p>
    `;
    emergencyDiv.style.display = "block";
    emergencyDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동

}

// Schedule 정보 표시
function showSchedule() {
    const scheduleDiv = document.getElementById("scheduleInfo");

    // 초기화 및 숨기기
    resetAndHide();

    scheduleDiv.innerHTML = `
        <h2>Schedule</h2>
        <img src="schedule.jpg" alt="Schedule" style="max-width: 100%; height: auto;">
    `;
    scheduleDiv.style.display = "block";
    scheduleDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동
}

// 이름으로 숙소 찾기
function findRoom() {
    let name = document.getElementById("nameInput").value.trim();
    if (name.toLowerCase() === "maria") {
        name = "마리아";
    }
    const resultDiv = document.getElementById("roomInfo");

    // 초기화 및 숨기기
    resetAndHide();

    if (!name) {
        resultDiv.innerHTML = "<p>이름을 먼저 입력하세요 :)</p>";
        resultDiv.style.display = "block";
        return;
    }

    const room = roomData.find(room => room.members.includes(name));

    if (room) {
        resultDiv.innerHTML = `
            <h2>${name}님의 숙소 정보</h2>
            <hr>
            <p><strong>숙소 번호:</strong> ${room.roomNumber}</p>
            <p><strong>숙소 위치:</strong> ${room.location}</p>
            <p><strong>숙소 조원:</strong> ${room.members.join(", ")}</p>
        `;
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동

    } else {
        resultDiv.innerHTML = `<p>${name}님은 숙소 정보가 없습니다.</p>`;
        resultDiv.style.display = "block";
        resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동

    }
}

function showAllRooms() {
    const resultDiv = document.getElementById("allRooms");

    // 초기화 및 숨기기
    resetAndHide();

    let tableHtml = `
        <table class="styled-table">
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Members</th>
                </tr>
            </thead>
            <tbody>
    `;

    roomData.forEach(room => {
        tableHtml += `
            <tr>
                <td>${room.location}</td>
                <td>${room.members.join(", ")}</td>
            </tr>
        `;
    });

    tableHtml += "</tbody></table>";
    resultDiv.innerHTML = tableHtml;
    resultDiv.style.display = "block";
    resultDiv.scrollIntoView({ behavior: 'smooth' });  // 스크롤 이동

}
