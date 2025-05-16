import { useEffect } from "react";
import { useNavigate, useRoutes, useSearchParams } from "react-router-dom";

const Payment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const IMP = window.IMP;
    IMP.init("imp41248503"); // 자신의 PortOne 가맹점 식별코드 입력

    const amount = params.get("amount");
    const name = params.get("name");
    const email = params.get("email");
    const phone = params.get("phone");
    const token = params.get('token');

    IMP.request_pay(
      {
        pg: "kakaopay", // 결제 PG사
        pay_method: "card",
        amount: amount || 1000,
        name: "포인트 충전",
        buyer_email: email,
        buyer_name: name,
        buyer_tel: phone,
        m_redirect_url: "https://expo.dev/@yourname/yourapp/--/payment-result",
      },
      async (rsp) => {
        if (rsp.success) {
          // ✅ 결제 성공 → imp_uid로 백엔드 검증 요청
          try {
            await axios.post(
              // "http://localhost:8080/point/charge",
              "https://capstone-2025-27-backend.onrender.com/point/charge",
              { impUid: rsp.imp_uid },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            alert("포인트 충전 성공!");
            navigate("/Result?success=true");
          } catch (err) {
            console.error(err);
            alert("결제 실패: 백엔드 처리 중 오류 발생: " + err.response?.data?.message || "알 수 없는 오류");
            navigate("/Result?success=false");
          }
        } else {
          alert("결제 실패: " + rsp.error_msg);
          navigate("/Result?success=false");
        }
      }
    );
  }, [params]);

  return <div>결제 준비 중입니다...</div>;
};

export default Payment;
