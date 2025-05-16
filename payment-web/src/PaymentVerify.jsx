import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const PaymentVerify = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const impUid = params.get("imp_uid");
    const token = params.get("token");

    if (impUid && token) {
      axios
        .post("https://capstone-2025-27-backend.onrender.com/point/charge", { impUid }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          navigate("/result?success=true");
        })
        .catch(() => {
          navigate("/result?success=false");
        });
    } else {
      navigate("/result?success=false");
    }
  }, [params, navigate]);

  return <div>결제 검증 중입니다...</div>;
};

export default PaymentVerify;
