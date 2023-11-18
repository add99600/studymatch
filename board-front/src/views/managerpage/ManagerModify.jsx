import React from 'react';

const ManagerModify = () => {
  const handleClose = () => {
    window.close();
  };

  return (
    <div style={containerStyle}>
      <h1>스터디 정보 수정</h1>
      <br />
      <form style={formStyle}>
        <label>
          스터디 이름:
          <input type="text" value="" style={inputStyle} />
        </label>
        <br />
        <label>
          스터디 장소:
          <input type="text" placeholder="00시 00구" style={inputStyle} />
        </label>
        <br />
        <label>
          스터디 분류:
          <select name="class" style={inputStyle}>
            <option value="어학">어학</option>
            <option value="IT">IT</option>
            <option value="취업">취업</option>
            <option value="고시">고시</option>
            <option value="공모전">공모전</option>
            <option value="자격증">자격증</option>
          </select>
        </label>
        <br />
        <label>
          스터디 주제:
          <input type="text" value="" style={inputStyle} />
        </label>
        <br />
        <label>
          소개글 :<br />
          <textarea id="introduce" placeholder="스터디그룹 소개글을 입력하세요" required style={textareaStyle}></textarea>
        </label>
        <br />
        <br />
        <input type="submit" value="저장" style={submitButtonStyle} />
        <button type="button" onClick={handleClose} style={closeButtonStyle}>
          닫기
        </button>
        
      </form>
    </div>
  );
};

const containerStyle = {
  textAlign: 'center',
  padding: '20px',
};

const headerStyle = {
  color: '#333',
};

const hrStyle = {
  border: '1px solid #ccc',
};

const formStyle = {
  display: 'inline-block',
  textAlign: 'left',
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: '#f9f9f9',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const submitButtonStyle = {
  backgroundColor: '#0078ff',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const closeButtonStyle = {
  backgroundColor: '#ccc',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginLeft: '10px',
};

const textareaStyle = {
  width: '330px',
  height: '100px', // 고정된 높이 설정
  padding: '10px',
  marginBottom: '20px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  resize: 'none', // 크기 조절 비활성화
};


export default ManagerModify;
