import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error, refetch } = useGetProfileQuery();

  useEffect(() => {
    refetch(); // Optional: ensures it re-fetches on load
  }, [refetch]);

  return (
    <FormContainer>
      <h1>My Profile</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p className="text-danger">{error?.data?.message || error.error}</p>
      ) : (
        <div>
          <p>
            <strong>Email:</strong> {data?.email}
          </p>
          {/* You can extend this later with name, etc. */}
        </div>
      )}
    </FormContainer>
  );
};

export default ProfileScreen;
