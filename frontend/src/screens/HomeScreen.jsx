// Imports
import Hero from "../components/Hero";
import TabsComponent from "../components/Tab";
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo) { return <TabsComponent />; } return <Hero />;
};

export default HomeScreen;
