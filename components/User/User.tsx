import { Avatar, Button, Menu, UnstyledButton } from "@mantine/core";
import { signOut } from "firebase/auth";
import { FC, useContext } from "react";
import { auth } from "../../services/firebase";
import { UserContext } from "../Auth";

interface IProps {}

export const User: FC<IProps> = ({}) => {
  const user = useContext(UserContext);

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <>
      <Menu
        style={{ width: "100%", marginBottom: 10 }}
        control={
          <Button
            variant="subtle"
            radius="xl"
            color="violet"
            style={{
              width: 60,
              height: 60,
              position: "absolute",
              padding: 0,
              right: 10,
              top: 20,
            }}
          >
            <Avatar
              src={user?.providerData[0].photoURL ?? ""}
              alt="it's me"
              imageProps={{
                referrerPolicy: "no-referrer",
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                margin: 5,
                aspectRatio: "1 / 1",
              }}
            />
          </Button>
        }
      >
        <Menu.Label>{user?.providerData[0].displayName}</Menu.Label>
        <Menu.Label>{user?.providerData[0].email}</Menu.Label>
        <Menu.Item color="red" onClick={handleLogout}>
          Déconnexion
        </Menu.Item>
      </Menu>
    </>
  );
};
