import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const CommWrite = () => {

  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');

  const navigate = useNavigate();


  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const onContentHandler = (event) => {
    setContent(event.target.value);
  };


  const onSubmitHandler = (event) => {
    event.preventDefault();

    const data = {
      title: Title,
      content: Content,
    };
  
    axios.post('/api/group/posts', data)
      .then((response) => {
        console.log(response.data);
        console.log(response.data.post._id);
        if (response.data.success) {
        
          const groupId = response.data.post._id;

          axios.post('/api/updateUserMakegroup', { groupId })
            .then((updateResponse) => {
              console.log(updateResponse.data);
              if (updateResponse.data.success) {
                console.log('사용자 정보 업데이트 성공');
                alert('그룹이 만들어졌습니다!')
                navigate('/');
              } else {
                console.error('사용자 정보 업데이트 실패:', updateResponse.data.message);
              }
            })
            .catch((updateError) => {
              console.error('사용자 정보 업데이트 중 오류:', updateError);
            });
        }
      })
      .catch((error) => {
        console.error('서버 요청 실패:', error);
      });
  };

  return (
    <div className="container marketing" style={{ paddingTop: '50px' }}>
      <div className="row featurette" style={{ height: '1000px' }}>
        <section id="main">
          <article id="article1">
            <div className="board_wrap">
              <div className="board_title">
                <h2>원하는 그룹을 만들어 보세요</h2>
              </div>
              <br/>
              <form className="board_write_wrap" onSubmit={onSubmitHandler}>
                <div className="board_write">
                  <div className="title">
                    <dl>
                      <dt>그룹명을 작성해주세요</dt>
                      <dd>
                        <input 
                          type="title" 
                          onChange={onTitleHandler}
                          placeholder="그룹명 작성" 
                          id="title" 
                          rows={8} style={{ fontSize: '1.4rem', width: '100%' }} />
                      </dd>
                    </dl>
                  </div>
                  <label htmlFor="image" className="image-label">
                    홍보에 사용할 텍스트를 입력해주세요
                  </label>
                  <div className="cont">
                    <textarea 
                      onChange={onContentHandler}
                      placeholder="내용 입력" 
                      id="content" 
                      rows={8} style={{ fontSize: '1.4rem', width: '100%' }}>
                    </textarea>
                  </div>
                </div>
                <div className="bt_wrap">
                  <Button variant="dark" type="submit">
                    작성
                  </Button>

                <Link to={'/'}>
                <Button variant="danger" style={{ width: '100px', height: '40px', margin: '5px', fontSize: '1.2rem' }}>
                  취소
                </Button>
                </Link>
                </div>
              </form>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default CommWrite;