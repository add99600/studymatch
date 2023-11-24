import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Stdywrite = () => {

  const navigate = useNavigate();

  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');


  const onTitleHandler = (event) => {
    setTitle(event.target.value);
  };

  const onContentHandler = (event) => {
    setContent(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log('onSubmitHandler 호출됨');

    const data = {
      title: Title,
      content: Content,
    };

    axios.post('/api/community/posts', data)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) 
          console.log('글 등록 성공!');
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
                <h2>원하는 게시글을 작성하세요</h2>
              </div>
              <br/>
              <form className="board_write_wrap" onSubmit={onSubmitHandler}>
                <div className="board_write">
                  <div className="title">
                    <dl>
                      <dt>글 제목을 작성해주세요</dt>
                      <dd>
                        <input 
                          type="title" 
                          name="title"
                          onChange={onTitleHandler}
                          placeholder="글 제목 작성" 
                          id="title" 
                          rows={8} style={{ fontSize: '1.4rem', width: '100%' }} />
                      </dd>
                    </dl>
                  </div>
                  <label htmlFor="image" className="image-label">
                    텍스트를 입력해주세요
                  </label>
                  <div className="cont">
                    <textarea 
                      placeholder="내용 입력" 
                      name="content"
                      onChange={onContentHandler}
                      id="content" 
                      rows={8} style={{ fontSize: '1.4rem', width: '100%' }}>
                    </textarea>
                  </div>
                </div>
                <div className="bt_wrap">
                <Button variant="dark" type="submit">
                  작성
                </Button>
                <Link>
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

export default Stdywrite;