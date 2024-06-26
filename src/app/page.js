import AboutHome from "@/components/About/AboutHome";
import Banner from "@/components/Banner/Banner";
import ContactForm from "@/components/ContactForm/ContactForm";
import HomeMap from "@/components/HomeMap/HomeMap";
import UseQuestion from "@/components/Hooks/UseQuestion";
import useProjects from "@/components/Hooks/useProjects";
import ProjectHome from "@/components/ProjectHome/ProjectHome";
import ResumeSection from "@/components/ResumeSection/ResumeSection";
import ShowQuestion from "@/components/ShowQuestion/ShowQuestion";
import TakeQuestion from "@/components/TakeQuestion/TakeQuestion";
import WorkingTools from "@/components/WorkingTools/WorkingTools";
import ContactDetails from "@/components/contactDetails/ContactDetails";
import { Box } from "@mui/material";

const HomePage = async () => {
  const Projects = await useProjects();

  // console.log(Projects);
  const question = await UseQuestion();
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <Box component="section" >
      <Banner></Banner>
      <AboutHome></AboutHome>
      <ProjectHome Projects={Projects}></ProjectHome>
      <WorkingTools></WorkingTools>
      <ResumeSection></ResumeSection>
      <div className="container  flex-col-reverse md:flex-row justify-center items-center  mx-auto  flex gap-5">
        <ShowQuestion question={question}></ShowQuestion>
        <TakeQuestion></TakeQuestion>
      </div>
      <div className=" container mx-auto flex justify-between flex-col md:flex-row items-center lg:items-center  p-3 lg:gap-10">
        <ContactDetails></ContactDetails>
        <ContactForm></ContactForm>
      </div>
      <div>
        <HomeMap apiKey={apiKey}></HomeMap>
      </div>
    </Box>
  );
};

export default HomePage;