import React from 'react';
import './common.css';
import './member_reg.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Managerpage() {
  // 신청자 목록 가져오기
  const [applicantsData, setApplicantsData] = useState([]);

  const { id } = useParams();

  const handleApprove = async (userId) => {
    try {
      // 서버에 승인 요청 보내기
      await axios.post(`/api/group/posts/${id}/approve`, { userId });

      // 승인 후 상태 업데이트
      setApplicantsData(prevData => {
        const newData = prevData.map(applicant => {
          if (applicant.userId === userId) {
            return { ...applicant, isApproved: true };
          }
          return applicant;
        });
        return newData;
      });

      // isApproved가 true인 지원자 추출
      const response = await axios.get(`/api/group/posts/${id}`);
      const applicants = response.data.post.applicants;
      const approvedApplicants = applicants.filter(applicant => applicant.isApproved);

      await Promise.all(approvedApplicants.map(async applicant => {
        const { userId } = applicant;
        await axios.post(`/api/updateUseringroup/${id}`, { userId });
      }));

    } catch (error) {
      console.error('승인 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/group/posts/${id}`);
        const applicants = response.data.post.applicants;

        // isApproved가 true인 지원자 추출
        const approvedApplicants = applicants.filter(applicant => applicant.isApproved);

        // true값인 userId
        const userId = approvedApplicants.map(applicant => applicant.userId);

        // 전체 신청자 리스트
        const userIds = applicants.map(applicant => applicant.userId);

        // true값인 userId는 삭제
        const filteredUserIds = userIds.filter(id => !userId.includes(id));

        const userRequests = filteredUserIds.map(async userId => {
          try {
            const userResponse = await axios.get(`/api/updateUserMakegroup/find/${userId}`);
            return userResponse.data;
          } catch (error) {
            return { error: true, message: '사용자 정보를 가져오는 중 오류 발생' };
          }
        });

        // 모든 호출이 완료되고 오류가 없을 시 사용자 데이터 추출
        const responses = await Promise.allSettled(userRequests);

        const newData = responses
          .filter(response => !response.error)
          .map(response => ({
            email: response.value.user.email,
            userId: response.value.user._id
          }));
        setApplicantsData(newData);
      } catch (error) {
        console.error('서버 요청 실패:', error);
      }
    };
    fetchData();
  }, [id]);



  return (
    <div className="mainBox">
      <section className="roomInfo">
        <div className="roomBox">
          <p className="textLine">스터디 이름</p>
          <div className="textLine">
            <p>장소</p>
            <div className="textRightLine"></div>
            <p>분류</p>
            <div className="textRightLine"></div>
            <p>스터디 주제</p>
          </div>

          <div className="textLine">
            <p>방장 : 박예진</p>
            <div className="textRightLine"></div>
            <p>개설일 : 23.10.04</p>
            <div className="textRightLine"></div>
            <p>회원수 : 20</p>  
          </div>
        </div>
      </section>

      <div className="addRoom">
        <a href="managerModify" target="_blank">
          스터디 정보수정
        </a>
      </div>

      <section className="memberReg">
        <div className="divBox1">
          <div className="container">
            <h2>멤버관리</h2>
            <form>
            <table className="boardTable">
              <colgroup>
                <col width="20%" />
                <col width="20%" />
                <col width="20%" />
                <col width="30%" />
                <col width="10%" />
              </colgroup>
              <thead>
                <tr>
                  <th>이름</th>
                  <th>성별</th>
                  <th>스터디출석율</th>
                  <th>직급</th>
                  <th>퇴장</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td><a href='../Mypage' target='_blank'>박예진</a></td>
                  <td>여</td>
                  <td>100%</td>
                  <td>
                    <select
                      name=""
                      id=""
                      style={{
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      <option value="master" selected>
                        방장
                      </option>
                      <option value="">총무</option>
                      <option value="">그룹원</option>
                    </select>
                  </td>
                  <td className="">     
                    <button type="button" value="">
                      퇴장
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><a href='../Mypage' target='_blank'>박예진</a></td>
                  <td>여</td>
                  <td>100%</td>
                  <td>
                    <select
                      name=""
                      id=""
                      style={{
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      <option value="master">방장</option>
                      <option value="">총무</option>
                      <option value="" selected>
                        그룹원
                      </option>
                    </select>
                  </td>
                  <td className="">
                    <button type="button" value="">
                      퇴장
                    </button>
                  </td>
                </tr>
                <tr>
                  <td><a href='../Mypage' target='_blank'>박예진</a></td>
                  <td>여</td>
                  <td>100%</td>
                  <td>
                    <select
                      name=""
                      id=""
                      style={{
                        width: '100%',
                        textAlign: 'center',
                      }}
                    >
                      <option value="master">방장</option>
                      <option value="">총무</option>
                      <option value="" selected>
                        그룹원
                      </option>
                    </select>
                  </td>
                  <td className="">
                    <button type="button" value="">
                      퇴장
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div style={{margin : '10px', textAlign : 'right'}}>
            <input type='submit' value={"저장"}></input>
            </div>
            </form>

            <div className="page">
              <span>
                <a href="#!">←</a>
              </span>
              <span>
                <a href="#!">1</a>
              </span>
              <span>
                <a href="#!">2</a>
              </span>
              <span>
                <a href="#!">→</a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="roomBody">
        <div className="bodyLeft1">
          <div className="divBox1">
            <h4 className="textCenter p-10">
              스터디 가입신청
            </h4>
            <div>
              <table className="joinTable">
                <thead>
                  <tr>
                    <th>신청자</th>
                    <th>성별</th>
                    <th>지원서</th>
                    <th>가입승인</th>
                  </tr>
                </thead>
                {/*신청자 목록*/}
                <tbody>
                {applicantsData.map(applicant => (
                  <tr key={applicant.userId}>
                    <td>{applicant.email}</td>
                    <td>성별 정보</td>
                    <td>
                      <a href="#">[보기]</a>
                    </td>
                    <td>
                      {applicant.isApproved ? (
                        '이미 승인됨'
                      ) : (
                        <>
                          <a href="#" onClick={() => handleApprove(applicant.userId)}>
                            [승인]
                          </a>
                          &nbsp;
                          <a href="#">[거절]</a>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10 textRight">
          </div>
        </div>

        <div className="bodyRight1">
          <div className="divBox1">
            <h4 className="textCenter p-10">
              스터디 퇴부신청
            </h4>
            <div>
              <table className="goneTable">
                <thead>
                  <tr>
                    <th>신청자</th>
                    <th>성별</th>
                    <th>출석율</th>
                    <th>직급</th>
                    <th>퇴부승인</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>최유리</td>
                    <td>여</td>
                    <td>30%</td>
                    <td>그룹원</td>
                    <td>
                      <a href="#">[승인]</a>&nbsp;
                      <a href="#">[거절]</a>
                    </td>
                  </tr>
                  <tr>
                    <td>김철수</td>
                    <td>남</td>
                    <td>20%</td>
                    <td>그룹원</td>
                    <td>
                      <a href="#">[승인]</a>&nbsp;
                      <a href="#">[거절]</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-10 textRight">
            <a href="GroupDeletion" target="_blank">
              <button type="button" value="">
                그룹 삭제
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Managerpage;