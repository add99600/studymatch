import React from 'react';
import './Posterpage.css'; // Import your CSS file
import Button from 'react-bootstrap/Button';

function Posterpage() {

  

  return (
    <div class="fram">
      <div class="profile-section">
        <img id="profile-picture" 
        src="https://i.namu.wiki/i/FgPlIpSLGsre44NP7psFtRWm012t7zln8vueYbUFjJ-jDYQIR8hkH8-wd59ZzWA5oM9tyWQ_oaSChi_Vv_5kZQ.webp"/>
        <div class="introduction">
          <h2>그룹 이름</h2>
          <p id="capability">
            토익 900점 가주아
          </p>
          <h2>소개 내용</h2>
          <p>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
            저희는 토익 900점을 넘기는것을 목표로 하는 사람들을 구하고 있습니다.<br/>
          </p>
        </div>
      </div>
      <div className="textarea-container" style={{ display: 'flex', alignItems: 'flex-start' , marginLeft: '145px'}}>
        <textarea
          placeholder="양식을 작성해 주세요"
          rows={5}
          style={{ fontSize: '1.4rem', width: '75%', marginRight: '10px' }}
        ></textarea>
        <Button variant="dark" style={{ height: '170px', width: '150px' }}>
          가입 신청
        </Button>
      </div>
    </div>
  );
}

export default Posterpage;
