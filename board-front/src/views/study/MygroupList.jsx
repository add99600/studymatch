import React from 'react';
import './common.css';


function MygroupList() {
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
