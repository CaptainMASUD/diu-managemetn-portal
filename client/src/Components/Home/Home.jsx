import React from "react";
import { Carousel } from "flowbite-react";
import { motion } from "framer-motion";
// import { FaGraduationCap, FaBookOpen, FaChalkboardTeacher, FaBullhorn, FaUsers } from "react-icons/fa";
import { FaGraduationCap, FaBook, FaChalkboardTeacher, FaUsers, FaLaptop, FaCertificate } from 'react-icons/fa';

const HomePage = () => {
  const features = [
    { icon: FaGraduationCap, title: 'Student Dashboard', description: 'Access your courses, grades, and schedules in one place.' },
    { icon: FaBook, title: 'Course Catalog', description: 'Browse and enroll in a wide range of academic courses.' },
    { icon: FaChalkboardTeacher, title: 'Expert Faculty', description: 'Learn from experienced professors and industry professionals.' },
    { icon: FaUsers, title: 'Collaborative Learning', description: 'Engage in group projects and peer-to-peer learning.' },
    { icon: FaLaptop, title: 'Online Resources', description: 'Access digital libraries and learning materials 24/7.' },
    { icon: FaCertificate, title: 'Certifications', description: 'Earn recognized certifications to boost your career.' },
  ];
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* Hero Section (Flowbite Carousel) */}
      <section className="relative h-[400px] z-0">
        <Carousel>
          <div className="relative w-full h-full">
            <img
              src="https://media.licdn.com/dms/image/v2/C561BAQGDfHTOp4ZSOQ/company-background_10000/company-background_10000/0/1600930185395/daffodil_international_university_cover?e=2147483647&v=beta&t=oIIhgfb2CnMiaJtueo0hkKT6Ew0_hvQ8u1y3YB-XdME"
              alt="Slide 1"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl font-semibold text-white"
              >
                Transform Your Learning Experience
              </motion.h2>
            </div>
          </div>

          <div className="relative w-full h-full">
            <img
              src="https://studentshub.daffodilvarsity.edu.bd/assets/img/about/1719679319.jpeg"
              alt="Slide 2"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl font-semibold text-white"
              >
                Empowering Educators to Teach Better
              </motion.h2>
            </div>
          </div>

          <div className="relative w-full h-full">
            <img
              src="https://i.ytimg.com/vi/FkLZ3xs-V5w/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB4eGrAT_Qe88pQKnG3a6OgVYgzXg"
              alt="Slide 3"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-3xl font-semibold text-white"
              >
                Join a Growing Community of Learners
              </motion.h2>
            </div>
          </div>
        </Carousel>
      </section>

     {/* Features Section */}
     <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                <feature.icon className="text-4xl text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning Experience?</h2>
            <p className="text-xl mb-8">Join thousands of students already using our platform</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300"
            >
              Sign Up Now
            </motion.button>
          </motion.div>
        </div>
      </section>


  
    </div>
  );
};

export default HomePage;
