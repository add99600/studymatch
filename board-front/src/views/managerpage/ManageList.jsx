import React, { useState } from 'react';
import './common.css';
import './member_reg.css';
import axios from 'axios';
import { useEffect } from 'react';

function ManageList() {
    // 쿠키에서 x_auth 쿠키 가져오기
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    }
    const token = getCookie('x_auth'); 
  
    const [Makegroup, setMakegroup] = useState([]);

    useEffect(() => {
      // Makegroup 데이터를 가져오는 비동기 함수 호출
      const fetchData = async () => {
        try {
          const response = await axios.post('/api/updateUserMakegroup/find', { token });
          if (response.data.success) {
            const makegroupData = response.data.user.Makegroup;
            setMakegroup(makegroupData);
          }
        } catch (error) {
          console.error('서버 요청 실패:', error);
        }
      };
  
      fetchData();
    }, []); // 빈 배열을 넣어 한 번만 호출되도록 설정



    return (
      <div className="mainBox">
        <section className="listHeader">
          <h2>나의 그룹 관리</h2>
        </section>
  
        {Makegroup.length > 0 ? (
          <section className="listBox">
            <a href="Managerpage">
              <div className="roomBox">
                <p className="textLine">
                  테스트2
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
        ) : (
          <p>관리 가능한 그룹이 없습니다.</p>
        )}
      </div>
    );
  }

export default ManageList;
