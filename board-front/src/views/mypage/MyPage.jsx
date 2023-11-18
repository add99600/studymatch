import React from 'react';
import './Mypage.css';

function MyPage() {
  return (
    <><div id="face" className="face" style={{ fontSize: '1.4rem', background: 'gray' }}>
      <div className="face f1">
        <div className="con1">
          <div className="circle">
            <img id="circle-img" src="https://i.namu.wiki/i/FgPlIpSLGsre44NP7psFtRWm012t7zln8vueYbUFjJ-jDYQIR8hkH8-wd59ZzWA5oM9tyWQ_oaSChi_Vv_5kZQ.webp" alt="Profile Image" />
          </div>
          <strong id="name" style={{ paddingLeft: '30px', width: '400px', height: '100px', textAlign: 'left', alignItems: 'center', marginTop: '45px', fontSize: '3.5rem' }}>이홍재</strong>
        </div>
      </div>
      <div className="face f2"></div>
    </div><div className='buttonbox'>
        <button type="button" className='listbutton'>
          나의 그룹
        </button>
        <button type="button" className='listbutton'>
          그룹 관리
        </button>
      </div></>
  );
}

export default MyPage;
