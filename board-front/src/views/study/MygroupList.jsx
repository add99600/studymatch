import React from 'react';
import './common.css';
import axios from 'axios';

function MygroupList() {

      // 쿠키에서 x_auth 쿠키 가져오기
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        
        if (parts.length === 2) {
          return parts.pop().split(';').shift();
        }
      }
      const token = getCookie('x_auth'); 
    
      
      // 해당 쿠키를 가진 유저의 소속 그룹 찾기
      axios.post('/api/updateUserMakegroup/find', { token })
      .then((response) => {
        if (response.data.success);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('서버 요청 실패:', error);
      });

  return (
    <div className="mainBox">
      <section className="listHeader">
        <h2>나의 스터디그룹</h2>
      </section>

      <section className="listBox">
        <a href="StudyGroup">
          <div className="roomBox">
            <p className="textLine">
              스터디 이름
            </p>
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
        </a>
      </section>
    </div>
  );
}

export default MygroupList;
