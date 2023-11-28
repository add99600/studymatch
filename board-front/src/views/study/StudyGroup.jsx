import React, { useState, useEffect } from 'react';
import './common.css';
import './member.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ChatComponent from './ChatComponent';
import Calendar from './Calendar';


function StudyGroup() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: 'GET',
          url: '/api/community/posts',
        });
        console.log(response.data);
        setPostData(response.data.posts || []);
      } catch (error) {
        console.error('서버 요청 실패:', error);
        alert('불러오기에 실패했습니다.');
      }
    };
  
    fetchData();
  }, []);

  
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
                      {postData.map((post, index) => (
                        <tr key={index}>
                          <td>{post.title}</td>
                          <td>{post.author.email}</td>
                          <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                          <td>1</td>
                          <td>
                            <span>

                                <button type="button">보기</button>

                            </span>
                          </td>
                        </tr>
                      ))}
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
                    <button>
                      <Link to="/Stdywrite">
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
          <a href="LeaveGroup" target='_blank'>퇴부신청</a>
          <a href="GroupEvaluation" target='_blank'>그룹평가</a>
        </div>
      </main>
    </div>
  );
}

export default StudyGroup;
