import React, { useState } from 'react';

const GroupEvaluation = () => {
  const [rating, setRating] = useState(''); // 선택된 등급을 저장하는 상태
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 그룹 평가를 제출하기 위한 필요한 작업 수행 (예: API 호출)
    console.log('평가:', rating);
    console.log('의견:', feedback);
    // 여기에 폼 제출을 처리하기 위한 API 호출과 같은 추가 로직을 추가할 수 있습니다.
  };

  return (
    <div style={{ fontFamily: "'맑은 고딕', 'Malgun Gothic', sans-serif", textAlign: 'center', margin: '50px' }}>
      <h1 style={{ color: '#333' }}>스터디그룹 평가</h1>
      <p style={{ color: '#666' }}>소속된 스터디그룹을 평가해주세요.</p><br /><br />

      {/* 그룹 평가를 위한 폼 */}
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
        {/* 사용자/그룹 정보를 포함해야 할 수도 있습니다. */}

        <label htmlFor="rating" style={{ display: 'block', marginBbottom: '10px', color: '#333' }}>
          스터디그룹 평가:
        </label>
        <input
          type="radio"
          name="rating"
          value="5"
          onChange={() => setRating('5')}
        />{' '}
        5점
        <input
          type="radio"
          name="rating"
          value="4"
          onChange={() => setRating('4')}
        />{' '}
        4점
        <input
          type="radio"
          name="rating"
          value="3"
          onChange={() => setRating('3')}
        />{' '}
        3점
        <input
          type="radio"
          name="rating"
          value="2"
          onChange={() => setRating('2')}
        />{' '}
        2점
        <input
          type="radio"
          name="rating"
          value="1"
          onChange={() => setRating('1')}
        />{' '}
        1점
        <br />
        <br />
        <label htmlFor="feedback" style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
          추가 의견 (선택사항):
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="평가에 대한 추가 의견을 남겨주세요"
          style={{
            width: '100%',
            height: '100px',
            padding: '10px',
            marginBbottom: '20px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            resize: 'none',
          }}
        ></textarea>

        <button
          type="submit"
          style={{ backgroundColor: '#0078ff', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          평가 제출
        </button>
      </form>
    </div>
  );
};

export default GroupEvaluation;
