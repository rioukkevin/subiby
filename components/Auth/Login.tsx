import React, { FC } from "react";

import { auth, provider } from "../../services/firebase";
import { signInWithPopup } from "firebase/auth";
import { Button, Center } from "@mantine/core";

interface IProps {
  loading?: boolean;
}

export const Login: FC<IProps> = (props) => {
  const { loading } = props;

  const handleLogin = () => {
    signInWithPopup(auth, provider);
  };

  return (
    <Center style={{ width: "100vw", height: "100vh" }}>
      {loading && <span>Chargement en cours</span>}
      {!loading && (
        <Button
          onClick={handleLogin}
          variant="outline"
          color="gray"
          style={{ padding: 10 }}
          size="lg"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
            alt="gogole"
            style={{ width: 20, height: 20, marginRight: 10 }}
          />
          Login with google
        </Button>
      )}
    </Center>
  );
};
