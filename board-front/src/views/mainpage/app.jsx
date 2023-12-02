import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../mainpage/Home.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Header from '../../layouts/header/Header.jsx';
import LoginPage from '../loginpage/LoginPage.jsx';
import Posterpage from '../posterpage/Posterpage.jsx';
import MyPage from '../mypage/MyPage.jsx'
import Signup from '../registerpage/Signup';
import CommWrite from '../makegroup/CommWrite';
import ManageList from '../managerpage/ManageList';
import Managerpage from '../managerpage/Managerpage';
import ManagerModify from '../managerpage/ManagerModify';
import StudyGroup from '../study/StudyGroup';
import LeaveGroup from '../study/LeaveGroup';
import GroupEvaluation from '../study/GroupEvaluation';
import GroupDeletion from '../managerpage/GroupDeletion';
import Stdywrite from '../study_board/Stdy_write';
import MygroupList from '../study/MygroupList';

function App() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/poster/:id' element={<Posterpage />} />
          <Route path='/commwrite' element={<CommWrite />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/ManageList' element={<ManageList />} />
          <Route path='/Managerpage/:id' element={<Managerpage />} />
          <Route path='/ManagerModify' element={<ManagerModify />} />
          <Route path='/StudyGroup/:id' element={<StudyGroup />} />
          <Route path='/LeaveGroup' element={<LeaveGroup />} />
          <Route path='/GroupEvaluation' element={<GroupEvaluation />} />
          <Route path='/GroupDeletion' element={<GroupDeletion />} />
          <Route path='/Stdywrite' element={<Stdywrite />} />
          <Route path='/MygroupList' element={<MygroupList />} />
          <Route path='/Stdywrite/:id' element={<Stdywrite />} />

        </Routes>
      </BrowserRouter>
    );
}


const Home = () => {
  const paginationContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    margin: '50px 0', // 테이블과 페이지넘버 간격
  };

  // 쿠키에서 x_auth 쿠키 가져오기
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
  const token = getCookie('x_auth'); 


  const [mergedArray, setMergedArray] = useState([]);
  
  useEffect(() => {

    axios.post('/api/updateUserMakegroup/find', { token })
      .then((response) => {
        if (response.data.success) {
          const makegroupArray = response.data.user.Makegroup || [];
          const ingroupArray = response.data.user.ingroup || [];
          const mergedArray = [...makegroupArray, ...ingroupArray];
          console.log(mergedArray);
          setMergedArray(mergedArray);
        }
      })
      .catch((error) => {
        console.error('서버 요청 실패:', error);
      });
  }, []); // Run only once on component mount

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalDataItems, setTotalDataItems] = useState(0); // 총 데이터 개수

  const pageSize = 5; // 한 페이지 게시물 수

  useEffect(() => {
    fetchData();
  }, [currentPage, mergedArray]);

  const fetchData = () => {
    axios.get('/api/group/posts')
    .then((response) => {
      if (response.data.success);
        const reversedPosts = response.data.posts.reverse();
        setTotalDataItems(reversedPosts.length); // 총 데이터 길이
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setPosts(reversedPosts.slice(startIndex, endIndex));
      })
      .catch((error) => {
        console.error('서버 요청 실패:', error);
    });
  }

  const fetchNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  
  const fetchPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const totalPages = Math.ceil(totalDataItems / pageSize);

  return (
    <section className="notice">
      <div className="page-title">
        <div className="container">
          <h3>스터디 매칭</h3>
        </div>
      </div>

      <div id="board-search">
        <div className="container">
          <div className="search-window">
            <form action="">
              <div className="search-wrap">
                <label htmlFor="search" className="blind">공지사항 내용 검색</label>
                <input id="search" type="search" placeholder="검색어를 입력해주세요." />
                <button type="submit" className="btn btn-dark">검색</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div id="board-list">
        <div className="container">
          <table className="board-table">
            <thead>
              <tr>
                <th scope="col" className="th-num">번호</th>
                <th scope="col" className="th-title">그룹명</th>
                <th scope="col" className="th-date">등록일</th>
              </tr>
            </thead>
            <tbody>
            {posts.map((post, index) => (
              <tr key={post._id}>
                <td>{index + 1}</td>
                <th>
                  {mergedArray.includes(post._id) ? (
                    <Link to={`/StudyGroup/${post._id}`}>
                      <a>{post.title}</a>
                    </Link>
                  ) : (
                    <Link to={`/poster/${post._id}`}>
                      <a>{post.title}</a>
                    </Link>
                  )}
                  <p>{post.content}</p>
                </th>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
          </table>
          <div style={{textAlign:'right', marginTop:'20px'}}>
      <Link to='/commwrite'>
        <button className="custom-btn btn-11">
          그룹 만들기
        </button>
      </Link>
      </div>
        </div>
      </div>
      
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={paginationContainerStyle}>
      <Pagination>
        <Pagination.Prev onClick={fetchPrevPage} />

        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={fetchNextPage} />
      </Pagination>
      </div>
    </div>
    </section>
  );
}
export default App