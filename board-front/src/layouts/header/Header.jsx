import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function Header() {
  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
  };

  const token = Cookies.get('x_auth');

  const onClickhandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if (response.data.success)
          console.log('로그아웃 성공!');
          Cookies.remove('x_auth');
          window.location.reload();
          alert('로그아웃');
      })
      .catch(error => {
        console.error('서버 요청 실패:', error);
      });
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={linkStyle}>스터디 매칭</Link>
        </Navbar.Brand>
        <Nav className="justify-content-end">
          {token ? (
            <>
              <Nav.Link>
                <Link to="/mypage" style={linkStyle}>마이페이지</Link>
              </Nav.Link>
              <Nav.Link onClick={onClickhandler}>
                <span style={linkStyle}>로그아웃</span>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link>
                <Link to="/signup" style={linkStyle}>회원가입</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/login" style={linkStyle}>로그인</Link>
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;