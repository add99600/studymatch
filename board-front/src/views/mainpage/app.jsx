import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../mainpage/Home.css'

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

function App() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/poster' element={<Posterpage />} />
          <Route path='/commwrite' element={<CommWrite />} />
          <Route path='/mypage' element={<MyPage />} />
          <Route path='/ManageList' element={<ManageList />} />
          <Route path='/Managerpage' element={<Managerpage />} />
          <Route path='/ManagerModify' element={<ManagerModify />} />
          <Route path='/StudyGroup' element={<StudyGroup />} />
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
                <input id="search" type="search" name="" placeholder="검색어를 입력해주세요." value="" />
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
                <th scope="col" className="th-title">제목</th>
                <th scope="col" className="th-date">등록일</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>3</td>
                <th>
                  <Link to="/poster">
                    <a>토익 스터디 그룹 인원 모집합니다</a>
                  </Link>
                  <p>테스트</p>
                </th>
                <td>2017.07.13</td>
              </tr>

              <tr>
                <td>2</td>
                <th><a href="#!">공지사항 안내입니다. 이용해주셔서 감사합니다</a></th>
                <td>2017.06.15</td>
              </tr>

              <tr>
                <td>1</td>
                <th><a href="#!">공지사항 안내입니다. 이용해주셔서 감사합니다</a></th>
                <td>2017.06.15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={paginationContainerStyle}>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />

          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Item>{4}</Pagination.Item>

          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
      <Link to='/commwrite'>
        <button className="custom-btn btn-11">
          그룹 만들기
        </button>
      </Link>
    </div>
    </section>
  );
}
export default App