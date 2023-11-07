import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { userProfileRequest } from "../services/profileServices";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ProfileContext = createContext();

const defaultProfileData = {
  id: "",
  full_name: "",
  gender: "",
  user: "",
};

const ProfileProvider = ({ children }) => { 
  const [profileData, setProfileData] = useState(defaultProfileData);
  const {isAuth} = useContext(AuthContext);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const data = await userProfileRequest();
        setProfileData(data);
        return data;
      } catch (error) {
        alert(error);
      }
    };
    if (isAuth){
      fetchProfileData();
    }

  }, [isAuth]);

  const context = {
    profileData,
  };

  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
