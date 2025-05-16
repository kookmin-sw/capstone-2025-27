import { useSearchParams } from "react-router-dom";

const Result = () => {
  const [params] = useSearchParams();
  const success = params.get("success") === "true";

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>{success ? "결제가 완료되었습니다." : "결제가 실패했습니다."}</h2>
      <a href="yourapp://home">
        <button>앱으로 돌아가기</button>
      </a>
    </div>
  );
};

export default Result;