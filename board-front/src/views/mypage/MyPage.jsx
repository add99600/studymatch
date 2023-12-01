import React, { useState } from 'react';
import './Mypage.css';
import MygroupList from '../study/MygroupList';
import ManageList from '../managerpage/ManageList';

function MyPage() {
  const [currentPage, setCurrentPage] = useState('소속그룹'); // Default page
  const handleButtonClick = (page) => {
    setCurrentPage(page);
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '5px', // 둥근 모서리 설정
    border: '1px solid gray', // 회색 테두리 설정
  };


  return (
    <>
      <div id="face" className="face" style={{ fontSize: '1.4rem', background: 'gray' }}>
        <div className="face f1">
          <div className="con1">
            <div className="circle">
              <img
                id="circle-img"
                src="https://i.namu.wiki/i/FgPlIpSLGsre44NP7psFtRWm012t7zln8vueYbUFjJ-jDYQIR8hkH8-wd59ZzWA5oM9tyWQ_oaSChi_Vv_5kZQ.webp"
                alt="Profile Image"
              />
            </div>
            <strong
              id="name"
              style={{
                paddingLeft: '30px',
                width: '400px',
                height: '100px',
                textAlign: 'left',
                alignItems: 'center',
                marginTop: '45px',
                fontSize: '3.5rem',
              }}
            >
              이홍재
            </strong>
          </div>
        </div>
        <div className="face f2">
        </div>
        </div>
        <div className='bodyy'>
          <div style={{ marginTop: '20px' }}>
            <button
              style={buttonStyle}
              onClick={() => handleButtonClick('소속그룹')}
            >나의 소속그룹</button>&nbsp;&nbsp;
            <button
              style={buttonStyle}
              onClick={() => handleButtonClick('그룹관리')}
            >나의 그룹 관리</button>
          </div>
          <div style={{ marginTop: '20px' }}>
            {currentPage === '소속그룹' && 
              <p> <MygroupList></MygroupList> </p>}
            {currentPage === '그룹관리' &&
              <p> <ManageList></ManageList> </p>}
          </div>
        </div>
      
    </>
  );
}

export default MyPage;
