import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


const CommWrite = () => {
  
  const handleClose = () => {
    window.close();
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
              <form className="board_write_wrap">
                <div className="board_write">
                  <div className="title">
                    <dl>
                      <dt>그룹 이름을 작성해주세요</dt>
                      <dd>
                        <input 
                          type="title" 
                          placeholder="그룹 이름 작성" 
                          id="title" 
                          rows={8} style={{ fontSize: '1.4rem', width: '100%' }} />
                      </dd>
                    </dl>
                  </div>
                  <div className="info">
                    <dl>
                      <dt></dt>
                      <dd>
                        <label htmlFor="image" className="image-label">
                          홍보에 사용할 이미지를 등록해 주세요
                        </label>
                        <input
                          name="profile"
                          className="form-control"
                          style={{ fontSize: '1.4rem' }}
                          type="file"
                          id="image"
                        />
                      </dd>
                      <br />
                    </dl>
                  </div>
                  <label htmlFor="image" className="image-label">
                    홍보에 사용할 텍스트를 입력해주세요
                  </label>
                  <div className="cont">
                    <textarea 
                      placeholder="내용 입력" 
                      id="content" 
                      rows={8} style={{ fontSize: '1.4rem', width: '100%' }}>
                    </textarea>
                  </div>
                </div>
                <div className="bt_wrap">
                <Link to="/">
                  <Button variant="dark">
                    작성
                  </Button>
                </Link>
                <Link>
                <Button variant="danger" onClick={handleClose} style={{ width: '100px', height: '40px', margin: '5px', fontSize: '1.2rem' }}>
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