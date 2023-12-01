import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import './common.css';
import './member.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChatComponent from './ChatComponent';
import Calendar from './Calendar';


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

  const { id } = useParams(); // URL에서 id 값을 추출
  const [pst, postData]= useState({});
  const [pst1, postData1]= useState([]);

    axios({
      method: 'GET',
      url: `/api/group/posts/${id}`,
      withCredentials: true,
    })
      .then(response => {

        postData(response.data.post);
      })
      .catch(error => {
        console.error('서버 요청 실패:', error);
        {/*alert('불러오기에 실패했습니다.');*/}
      });


      axios({
        method: 'GET',
        url: `/api/group/posts/${id}/comments`,
      })
        .then(response => {

          postData1(response.data.post.comments);
        })
        .catch(error => {
          console.error('서버 요청 실패:', error);
          {/*alert('불러오기에 실패했습니다.');*/}
        });


  return (
    <div className="container marketing">
      <main className="mainBox">
        <section className="roomInfo">
          <div className="roomBox">
            <p className="textLine">{pst.title}</p>
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
              <p>{new Date(pst.createdAt).toLocaleDateString()}</p>
              <div className="textRightLine"></div>
              <p>회원수 : 20</p>
              <Link to={`/Managerpage/${pst._id}`}>관리 페이지</Link>
            </div>
          </div>
        </section>

        <section className="roomBody">
          <div className="bodyLeft">
            <div className="scheduleBox divBox">
              <Calendar></Calendar>
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
                          <button type="button" value="" className='border-button'>
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
                          <button type="button" value="" className='border-button'>
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
                      {pst1.length > 0 ? (
                        pst1.map((comment, index) => (
                          <tr key={index}>
                            <td>{comment.title}</td>
                            <td>{comment.author.email}</td>
                            <td>{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ''}</td>
                            <td>1</td>
                            <td>
                              <span>
                                <button className='border-button' type="button">보기</button>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5">작성 글이 없습니다.</td>
                        </tr>
                      )}
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
                <div style={{textAlign : 'right', padding : '0px 20px'}}>
                  <span>
                    <button className='border-button'>
                      <Link to={`/Stdywrite/${pst._id}`}>
                        추가
                      </Link>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bodyRight">
            <h2>Group Chat</h2>
            <div className="chatBox">
              <ChatComponent />
            </div>
          </div>
        </section>
        <div className="btnBox">
          <button className='border-button'>퇴부신청</button>
          <button className='border-button'>그룹평가</button>
        </div>
      </main>
    </div>
  );
}

export default StudyGroup;
