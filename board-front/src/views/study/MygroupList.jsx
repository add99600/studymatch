import React from 'react';
import './common.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function MygroupList() {


      // 쿠키에서 x_auth 쿠키 가져오기
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        
        if (parts.length === 2) {
          return parts.pop().split(';').shift();
        }
      }
      const token = getCookie('x_auth'); 

      const [postIds, setPostIds] = useState([]);

      // 해당 쿠키를 가진 유저의 만든 그룹 찾기
      useEffect(() => {
        axios.post('/api/updateUserMakegroup/find', { token })
          .then((response) => {
            if (response.data.success) {
              setPostIds(response.data.user.Makegroup); 
            }
          })
          .catch((error) => {
            console.error('서버 요청 실패:', error);
          });
      }, [token]);
      

      const [postDataList, setPostDataList] = useState([]);

      // 유저가 만든 그룹의 정보 불러오기
      useEffect(() => {
        const fetchData = async () => {
          const postData = [];
    
          try {
            for (const postId of postIds) {
              const response = await axios.get(`/api/group/posts/${postId}`);
              if (response.data.success) {
                console.log(response.data)
                postData.push(response.data.post);
              }
            }
            setPostDataList(postData);
          } catch (error) {
            console.error('서버 요청 실패:', error);
          }
        };
    
        if (postIds.length > 0) {
          fetchData();
        }
      }, [postIds]);

  return (
    <div className="mainBox">
      <section className="listHeader">
        <h2>나의 스터디그룹</h2>
      </section>

      <section className="listBox">
        {postDataList.length > 0 ? (
          postDataList.map((postData) => (
            <a href={`StudyGroup/${postData._id}`} key={postData._id} className="post-link">
              <div className="roomBox">
                <p className="textLine">{postData.title}</p>
                <div className="textLine">
                  <p>{postData.place}</p>
                  <div className="textRightLine"></div>
                  <p>{postData.category}</p>
                  <div className="textRightLine"></div>
                  <p>{postData.topic}</p>
                </div>
                <div className="textLine">
                  <p>방장: {postData.author}</p>
                  <div className="textRightLine"></div>
                  <p>개설일: {new Date(postData.createdAt).toLocaleDateString()}</p>
                  <div className="textRightLine"></div>
                  <p>회원수: {postData.applicants.length}</p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p>만든 그룹이 없습니다.</p>
        )}
      </section>
    </div>
  );
}

export default MygroupList;
