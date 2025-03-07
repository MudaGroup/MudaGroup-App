import DetailProfile from "../component/Profile/DetailProfile";
import Visi from "../component/Profile/Visi";
import Misi from "../component/Profile/Misi";

export const Profile = () => {
  return (
    <>
      <div className="Profile-page container">
      <div><DetailProfile /></div>
      <div><Visi /></div>
      <div><Misi /></div>
      </div>
    </>
  );
};
