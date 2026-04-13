import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import GithubStats from '../components/GithubStats';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <GithubStats />
      <Blog />
      <Contact />
    </>
  );
};

export default Home;
