import { useRef } from "react";
import { useRouter } from "next/router";
const AdminPage = () => {
  const loginRef: any = useRef();
  const router = useRouter();

  // Code...
  const login = () => {
    const login_key = loginRef.current.value;
    localStorage.setItem("login_key", login_key);
    router.push("/");
  };

  return (
    <>
      <div className="stc_main_container">
        <div className="stc_header">
          <h1> Admin panel</h1>Or, should i call it login panel?
        </div>

        <div style={{ background: "#e7e7e7", padding: "20px" }}>
          Login key from your .env.local <br />
          <br />
          <input
            type=""
            ref={loginRef}
            className="stc_inputs"
            placeholder="Find from .env.local"
          />
          <br />
          <button className="stc_inputs" onClick={login}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
