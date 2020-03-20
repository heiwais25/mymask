import { useState, useEffect } from "react";

export default () => {
  const [authorized, setAuthorized] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    try {
      if (!window.kakao || !window.Kakao) {
        setLoadFailed(true);
      }
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY || "");
      }
      setAuthorized(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return { authorized, loadFailed };
};
