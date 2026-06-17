import React from 'react'

const About = () => {
  return (
    <>
    <section className="text-center container py-5">
      <h1 className="display-6">About Us</h1>
      <p className="lh-lg px-5 w-75 m-auto">Welcome to our vibrant online community where diverse voices come together to share their passions and insights. We're a platform dedicated to fostering knowledge, inspiring creativity, and sparking conversations on a wide range of topics.</p>
    </section>
    <section className="text-center py-5 bg-dark text-white">
      <h3 className="mb-5">Our Mission</h3>
      <div className="row justify-content-center">
        <div className="col-3 p-3">
          <h4>Empower Voices</h4>
          <p>We provide a space for individuals to express themselves freely and share their unique perspectives.</p>
        </div>
        <div className="col-3 p-3">
          <h4>Ignite Curiosity</h4>
          <p>We encourage exploration and learning by offering a diverse range of articles on various subjects.</p>
        </div>
        <div className="col-3 p-3">
          <h4>Connect Communities</h4>
          <p>We bring people together from all walks of life to engage in meaningful discussions and build lasting connections.</p>
        </div>
      </div>
    </section>
    </>
  )
}

export default About