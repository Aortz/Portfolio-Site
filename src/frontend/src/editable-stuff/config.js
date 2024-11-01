// Navigation Bar SECTION
const navBar = {
    show: true,
  };
  
  
  // ABOUT SECTION
  // If you want the About Section to show a profile picture you can fill the profilePictureLink either with:
  //a) your Instagram username
  //      i.e:profilePictureLink:"johnDoe123",
  //b) a link to an hosted image
  //      i.e:profilePictureLink:"www.picturesonline.com/johnDoeFancyAvatar.jpg",
  //c) image in "editable-stuff" directory and use require("") to import here,
  //      i.e: profilePictureLink: require("../editable-stuff/hashirshoaeb.png"),
  //d) If you do not want any picture to be displayed, just leave it empty :)
  //      i.e: profilePictureLink: "",
  // For Resume either provide link to your resume or import from "editable-stuff" directory
  //     i.e resume: require("../editable-stuff/resume.pdf"),
  //         resume: "https://docs.google.com/document/d/13_PWdhThMr6roxb-UFiJj4YAFOj8e_bv3Vx9UHQdyBQ/edit?usp=sharing",
  
  
  // PROJECTS SECTION
  // Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
  //      i.e: reposLength: 0,
  // If you want to display specfic projects, add the repository names,
  //      i.e ["repository-1", "repo-2"]
  const repos = {
    show: true,
    heading: "Recent Projects",
    gitHubUsername: "Aortz",
    reposLength: 4,
    specificRepos: [],
  };
  
  export { navBar,  repos };