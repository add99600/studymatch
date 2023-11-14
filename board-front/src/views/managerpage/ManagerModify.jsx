import React from 'react';

const ManagerModify = () => {
  const handleClose = () => {
    window.close();
  };

  return (
    <div>
      <h2>스터디 정보수정</h2>
      <hr />
      <form>
        스터디 이름 : <input type="text" value="" size="30" /><br />
        스터디 장소 : <input type="text" size="30" placeholder="00시 00구" /><br />
        스터디 분류 : 
        <select name="class">
          <option value="어학">어학</option>
          <option value="IT">IT</option>
          <option value="취업">취업</option>
          <option value="고시">고시</option>
          <option value="공모전">공모전</option>
          <option value="자격증">자격증</option>
        </select><br />
        스터디 주제 : <input type="text" value="" size="30" /><br /><br />
        <input type="submit" value="저장" />
        <button type="button" onClick={handleClose}>닫기</button>
      </form>
    </div>
  );
}

export default ManagerModify;
