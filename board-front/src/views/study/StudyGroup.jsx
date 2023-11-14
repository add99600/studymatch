import React, { useState } from 'react';
import './common.css';
import './member.css';

function StudyGroup() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    let date = 1;

    let calendarRows = [];
    for (let i = 0; i < 6; i++) {
      let rowCells = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          rowCells.push(<td key={j}></td>);
        } else if (date <= daysInMonth) {
          rowCells.push(<td key={j}>{date}</td>);
          date++;
        } else {
          rowCells.push(<td key={j}></td>);
        }
      }
      calendarRows.push(<tr key={i}>{rowCells}</tr>);
    }

    return calendarRows;
  };

  const handlePrevMonthClick = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonthClick = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const calendarRows = generateCalendar();

  return (
    <div className="container marketing">
      <main className="mainBox">
        <section className="roomInfo">
          <div className="roomBox">
            <p className="textLine">스터디 이름</p>
            <div className="textLine">
              <p>장소</p>
              <div className="textRightLine"></div>
              <p>분류</p>
              <div className="textRightLine"></div>
              <p>스터디 주제</p>
            </div>
            <div className="textLine">
              <p>방장 : 박예진</p>
              <div className="textRightLine"></div>
              <p>개설일 : 23.10.04</p>
              <div className="textRightLine"></div>
              <p>회원수 : 20</p>
            </div>
          </div>
        </section>

        <section className="roomBody">
          <div className="bodyLeft">
            <div className="scheduleBox divBox">
              <div className="container">
                <div className="calendar-container">
                  <div className="calendar">
                    <h2 id="calendar-header">
                      {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
                    </h2>
                    <table>
                      <thead>
                        <tr>
                          <th>일</th>
                          <th>월</th>
                          <th>화</th>
                          <th>수</th>
                          <th>목</th>
                          <th>금</th>
                          <th>토</th>
                        </tr>
                      </thead>
                      <tbody id="calendar-body">{calendarRows}</tbody>
                    </table>
                  </div>
                  <div className="calendar-buttons">
                    <table>
                      <tr>
                        <td>
                          <button onClick={handlePrevMonthClick}>◀</button>
                        </td>
                        <td>
                          <button onClick={handleNextMonthClick}>▶</button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="roomNotice divBox">
              <div className="container">
                <h2>공지사항</h2>
                <div className="aside">
                  <span>▷ 총 2개의 게시물이 있습니다.</span>
                </div>
                <table className="boardTable">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>글쓴이</th>
                      <th>작성일</th>
                      <th>조회수</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>공지사항 1</td>
                      <td>박예진</td>
                      <td>2023-10-04</td>
                      <td>2</td>
                      <td>
                        <span>
                          <button type="button" value="">
                            보기
                          </button>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>공지사항 2</td>
                      <td>박예진</td>
                      <td>2023-10-04</td>
                      <td>2</td>
                      <td>
                        <span>
                          <button type="button" value="">
                            보기
                          </button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="page">
                  <span>
                    <a href="#!">←</a>
                  </span>
                  <span>
                    <a href="#!">1</a>
                  </span>
                  <span>
                    <a href="#!">2</a>
                  </span>
                  <span>
                    <a href="#!">→</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="divBox">
              <div className="container">
                <h2>게시판</h2>
                <div className="aside">
                  <span>
                    <button type="button" value="">
                      추가
                    </button>
                  </span>
                </div>
                <table className="boardTable">
                  <thead>
                    <tr>
                      <th>제목</th>
                      <th>글쓴이</th>
                      <th>작성일</th>
                      <th>조회수</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>게시판1</td>
                      <td>박예진</td>
                      <td>2023-10-04</td>
                      <td>2</td>
                      <td>
                        <span>
                          <button type="button" value="">
                            보기
                          </button>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>게시판 2</td>
                      <td>박예진</td>
                      <td>2023-10-04</td>
                      <td>2</td>
                      <td>
                        <span>
                          <button type="button" value="">
                            보기
                          </button>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bodyRight">
            <div className="chatBox">그룹채팅</div>
          </div>
        </section>
        <div className="btnBox">
          <a href="#">퇴부신청</a>
          <a href="#">그룹평가</a>
        </div>
      </main>
    </div>
  );
}

export default StudyGroup;
