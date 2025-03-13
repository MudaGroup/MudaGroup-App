import DetailProfile from "../component/Profile/DetailProfile";
import Visi from "../component/Profile/Visi";
import Misi from "../component/Profile/Misi";

export const Profile = () => {
  return (
    <>
      <div className="justify-center mx-[6rem] pt-12 pb-8">
        <div><DetailProfile /></div>
        <div><Visi /></div>
        <div><Misi /></div>
      </div>
    </>
  );
};