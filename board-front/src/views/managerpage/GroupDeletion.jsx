import React, { useState } from 'react';

const GroupDeletion = () => {
  const [reason, setReason] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기에서 스터디그룹 삭제 요청을 처리하는 로직을 추가할 수 있습니다.
    console.log('스터디그룹 삭제 요청:', reason);
  };

  const handleClose = () => {
    window.close();
  };

  return (
    <div style={{ fontFamily: "'맑은 고딕', 'Malgun Gothic', sans-serif", textAlign: 'center', margin: '50px' }}>
      <h1>그룹 삭제 신청</h1>
      <p>스터디그룹을 삭제하시겠습니까?</p><br/><br/>
      <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left', border: '1px solid #ccc', padding: '20px', borderRadius: '10px', backgroundColor: '#f9f9f9', width: '500px' }}>
        <label>
          삭제 이유:
          <br />
          <br />
          <textarea
            id="reason"
            placeholder="스터디그룹 삭제 이유를 입력하세요"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            style={{ width: '200%', height: '200px', padding: '10px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', resize: 'none' }}
          ></textarea>
        </label>
        <br />
        <button
          type="submit"
          style={{ backgroundColor: '#ff4d4d', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          삭제 요청
        </button>
        <button type="button" onClick={handleClose} style={{ backgroundColor: '#ccc', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin : '10px' }}>
          취소
        </button>
      </form>
    </div>
  );
};

export default GroupDeletion;
