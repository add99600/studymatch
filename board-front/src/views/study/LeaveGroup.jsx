import React, { useState } from 'react';

function LeaveGroup() {
  const [reason, setReason] = useState('');
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform the necessary actions for leaving the group (e.g., API call)
    console.log('Reason for leaving:', reason);
    // You can add further logic here, such as calling an API to handle the form submission
  };

  const handleClose = () => {
    // Add any logic needed when the cancel button is clicked
    window.close();
  };

  return (
    <div style={{ fontFamily: "'맑은 고딕', 'Malgun Gothic', sans-serif", textAlign: 'center', margin: '50px' }}>
      <h1 style={{ color: '#333' }}>스터디그룹 탈퇴</h1>
      <p style={{ color: '#666' }}>정말로 스터디그룹을 탈퇴하시겠습니까?</p><br /><br />

      {/* Form for leave group confirmation */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'inline-block',
          textAlign: 'left',
          border: '1px solid #ccc',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
        }}
      >
        {/* You may need to include hidden input fields with user/group information */}

        <label htmlFor="reason" style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
          탈퇴 이유:
        </label>
        <textarea
          id="reason"
          name="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="탈퇴 이유를 적어주세요"
          style={{
            width: '100%',
            height: '100px',
            padding: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            resize: 'none',
          }}
        ></textarea>

        <button
          type="submit"
          style={{ backgroundColor: '#ff4d4d', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          그룹 탈퇴
        </button>
        <button type="button" onClick={handleClose} style={{ backgroundColor: '#ccc', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin : '10px' }}>
          취소
        </button>
      </form>
    </div>
  );
};

export default LeaveGroup;

