import { useRouter } from "next/router";

import { CsrfToken } from "../../types";
import useStore from "../../store";
import axios from "axios";

export const useError = () => {
  const router = useRouter();
  const resetEditedTask = useStore((state) => state.resetEditedTask);
  const getCsrfToken = async () => {
    const { data } = await axios.get<CsrfToken>(
      `${process.env.NEXT_PUBLIC_API_URL}/csrf`
    );
    axios.defaults.headers.common["X-CSRF-TOKEN"] = data.csrf_token;
  };
  const switchErrorHandling = (msg: string) => {
    switch (msg) {
      case "invalid csrf token":
        getCsrfToken();
        alert("CSRF token is invalid, please try again");
        break;
      case "invalid or expired jwt":
        alert("access token expirßed, please login");
        resetEditedTask();
        router.push("/");
        break;
      case "missing or malformed jwt":
        alert("access token is not valid, please login");
        resetEditedTask();
        router.push("/");
        break;
      case "duplicated key not allowed":
        alert("email already exist, please use another one");
        break;
      case "crypto/bcrypt: hashedPassword is not the hash of the given password":
        alert("password is not correct");
        break;
      case "record not found":
        alert("email is not correct");
        break;
      default:
        alert(msg);
    }
  };
  return { switchErrorHandling };
};
