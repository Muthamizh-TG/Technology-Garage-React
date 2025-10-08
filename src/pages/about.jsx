import React, { use, useEffect, useState } from "react";
import '../Assets/style.css';
import HandsOnExperience from '../assets/Images/Hands-On.svg';
import CompeteWithRest from '../assets/images/CompeteWithWorld.svg';
import ExposureToTechnology from '../assets/images/ExposureTechnology.svg';
import ConvertYourCreativity from '../assets/images/ConvertYourCreativity.svg';
import BecomeALeader from '../assets/images/BecomeLeader.svg';
import BuildingYour from '../assets/images/BuildingYour.svg';
import ExportCoach from '../assets/images/ExpertCoaches.svg';
import OnGoingSupport from '../assets/images/OngoingSupport.svg';
import TailoredLearn from '../assets/images/TailoredLearning.svg';
import DedicatedCoachs from '../assets/images/DedicatedCoach.svg';
import youronestopshop from '../assets/images/YourOne.png';
import Basics from '../assets/images/Basics.svg';
import PersonalizedGuidance from '../assets/images/PersonalizedGuidance.svg';
import Learn from '../assets/images/Learn.svg';
import arrow from '../assets/images/Arrow.svg';
import Gamified from '../assets/images/Gamified.svg';
import Robotics from '../assets/images/robotics.svg';
import Cloud from '../assets/images/Cloud.svg';
import Certificate from '../assets/images/Certificate.svg';
import AOS from 'aos';
import 'aos/dist/aos.css';


import emailjs from '@emailjs/browser';
const Home = () => {
  // Geolocation state
  const [userLocation, setUserLocation] = useState(null);
  const [countryCode, setCountryCode] = useState("+91"); // Default India
  const [showForm, setShowForm] = useState(false);
  // EmailJS form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 , once: false });
  }, []);

  useEffect(() => {
    // Detect user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
          );
          const data = await res.json();

          console.log("Detected location:", data);
          setUserLocation(data);

          // Auto-select country code
          if (data.countryCode === "IN") setCountryCode("+91");
          else if (data.countryCode === "US") setCountryCode("+1");
          else if (data.countryCode === "SG") setCountryCode("+65");
          else setCountryCode("+91"); // fallback
        } catch (err) {
          console.error("Geo API error:", err);
        }
      });
    }
  }, []);

  // Popup handlers
  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  return (
    <>
      {/* CTA Banner */}
      <div id="ctaBanner" className="cta-banner">
        <div className="text-center py-3">
          <p className="mb-2 text-light fw-semibold">START YOUR JOURNEY WITH US</p>
          <a
            href="#"
            className="btn btn-primary rounded-pill px-4"
            onClick={(e) => {
              e.preventDefault();
              openForm();
            }}
          >
            ENROLL
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero d-flex flex-column justify-content-around align-items-center text-center text-white">
        <div className="container">
          <h1 className="display-4 fw-bold" data-aos="fade-down">
            The most practical way to learn<br />technology On Earth!
          </h1>
          <p className="mt-4 lead fw-normal text-light" data-aos="fade-up">
            Technology Garage has brought the world's top most gadgets,
            methodologies, and mechanisms together to make a fun learning
            experience. Learning pathways are designed to introduce the
            technical concepts slowly in a play-way methodology.
          </p>
          <div className="btn-container">
            <button className="btn rounded" onClick={openForm}>
              <span className="btn-text text-green">GET STARTED</span>
            </button>
          </div>
        </div>
        <span className="scroll">---- scroll</span>
      </section>

      {/* Popup Form */}
      {showForm && (
        <div
          id="popupForm"
          className="popup-form-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("popup-form-overlay")) {
              closeForm();
            }
          }}
        >
          <div className="popup-form-content">
            <span id="closeFormBtn" className="close-btn" onClick={closeForm}>
              &times;
            </span>
            <h2>GETTING STARTED</h2>
            <p>
              Learn technology from scratch or from your current maturity level.
              <br />
              Pick a suitable time slot, and we'll schedule a free assessment
              session.
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setSending(true);
                setError("");
                setSent(false);
                const templateParams = {
                  name,
                  phone: `${countryCode} ${phone}`,
                  date,
                  time
                };
                try {
                  await emailjs.send(
                    'service_ysj3pg5',
                    'template_qyb0dyu',
                    templateParams,
                    'ij6SELAhRDbEP6rj0'
                  );
                  setSent(true);
                  setName("");
                  setPhone("");
                  setDate("");
                  setTime("");
                } catch (err) {
                  setError("Failed to send. Please try again.");
                } finally {
                  setSending(false);
                }
              }}
            >
              <label>Enter Your Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />

              <label>Contact Number</label>
              <div className="phone-group">
                <select
                  className="option-select2"
                  value={countryCode}
                  onChange={e => setCountryCode(e.target.value)}
                >
                  <option value="+91">IN +91</option>
                  <option value="+1">US +1</option>
                  <option value="+65">SG +65</option>
                </select>
                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className="date-time-row">
                <div>
                  <label>Select Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                  />
                </div>
                <div>
                  <label>Select Time</label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={sending}>
                {sending ? "Sending..." : "Submit"}
              </button>
              {sent && <div style={{color: 'green', marginTop: 10}}>Sent successfully!</div>}
              {error && <div style={{color: 'red', marginTop: 10}}>{error}</div>}
            </form>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="tg-features-section py-5">
        <div className="container text-center">
          <h2 className="tg-features-title mb-5">
            <span className="tg-gradient-heading">What We do, We do the Best!</span>
          </h2>
          <div className="row gx-4 gy-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-4" data-aos="fade-up">
              <div className="tg-feature-box p-4 h-100 shadow-sm rounded">
                <img
                  src={ExposureToTechnology}
                  alt="Tech Icon"
                  className="tg-feature-icon mb-3"
                />
                <h5 className="tg-feature-heading">Exposure to Technology</h5>
                <p className="tg-feature-text">
                  Explore the greatest learning pathways and the latest technologies
                  shaping the world around us. Start here and shape the future!
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="100">
              <div className="tg-feature-box p-4 h-100 shadow-sm rounded">
                <img
                  src={HandsOnExperience}
                  alt="Hands-On Icon"
                  className="tg-feature-icon mb-3"
                />
                <h5 className="tg-feature-heading">Hands-On Learning</h5>
                <p className="tg-feature-text">
                  Acquire real-world experience to craft the future version of
                  yourself. Begin your journey here and transform your future!
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="200">
              <div className="tg-feature-box p-4 h-100 shadow-sm rounded">
                <img
                  src={CompeteWithRest}
                  alt="Global Compete Icon"
                  className="tg-feature-icon mb-3"
                />
                <h5 className="tg-feature-heading">Global Competition</h5>
                <p className="tg-feature-text">
                  Learning is only half the job done; hands-on experience is what truly
                  completes the journey. That's exactly what we do at Technology Garage!
                </p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="300">
              <div className="tg-feature-box p-4 h-100 shadow-sm rounded">
                <img
                  src={ConvertYourCreativity}
                  alt="Mentorship Icon"
                  className="tg-feature-icon mb-3"
                />
                <h5 className="tg-feature-heading">Expert Mentorship</h5>
                <p className="tg-feature-text">
                  Bring your creative ideas to life by turning them into real-world
                  solutions.
                </p>
              </div>
            </div>
            {/* Card 5 */}
            <div className="col-md-4" data-aos="fade-up" data-aos-delay="400">
              <div className="tg-feature-box p-4 h-100 shadow-sm rounded">
                <img
                  src={BecomeALeader}
                  alt="Career Boost Icon"
                  className="tg-feature-icon mb-3"
                />
                <h5 className="tg-feature-heading">Career Acceleration</h5>
                <p className="tg-feature-text">
                  Learning is only half the job done; hands-on experience is what truly
                  completes the journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Coach Section */}
      <section className="tg-coach-section py-5">
        <div className="container">
          <h2 className="tg-coach-title mb-5">
            <span className="tg-gradient-heading">How does it works</span>
          </h2>

          {/* First Row */}
          <div className="row g-4 justify-content-center align-items-center" >
            <div className="col-md-3 text-center" data-aos="fade-right">
              <img
                src={DedicatedCoachs}
                alt="Coach 1"
                className="tg-coach-card-icon mb-3"
              />
              <h6 className="tg-coach-card-text">
                DEDICATED COACH FOR <br /> EVERY PLAYER
              </h6>
            </div>

            <div className="col-md-1 text-center d-none d-md-block" data-aos="fade-right">
              <img
                src={arrow}
                alt="Arrow"
                className="tg-coach-Arrow"
              />
            </div>

            <div className="col-md-3 text-center" data-aos="fade-right" duration="100">
              <img
                src={PersonalizedGuidance}
                alt="Coach 2"
                className="tg-coach-card-icon mb-3"
              />
              <h6 className="tg-coach-card-text">
                PERSONALIZED GUIDANCE <br /> TAILORED TO YOU
              </h6>
            </div>

            <div className="col-md-1 text-center d-none d-md-block" data-aos="fade-right" duration="100">
              <img
                src={arrow}
                alt="Arrow"
                className="tg-coach-Arrow"
              />
            </div>

            <div className="col-md-3 text-center" data-aos="fade-right" duration="200">
              <img
                src={BuildingYour}
                alt="Coach 3"
                className="tg-coach-card-icon mb-3"
              />
              <h6 className="tg-coach-card-text">
                BUILDING YOUR STRONG <br /> TECHNOLOGY FOUNDATION
              </h6>
            </div>
          </div>

          {/* Second Row */}
          <div className="row g-4 justify-content-center align-items-center mt-4" data-aos="fade-right">
            <div className="col-md-3 text-center">
              <img
                src={OnGoingSupport}
                alt="Coach 4"
                className="tg-coach-card-icon mb-3"
              />
              <h6 className="tg-coach-card-text">
                ONGOING SUPPORT FOR <br /> YOUR GROWTH
              </h6>
            </div>

            <div className="col-md-1 text-center d-none d-md-block" data-aos="fade-right">
              <img
                src={arrow}
                alt="Arrow"
                className="tg-coach-Arrow"
              />
            </div>

            <div className="col-md-3 text-center" data-aos="fade-right" duration="100">
              <img
                src={TailoredLearn}
                alt="Coach 5"
                className="tg-coach-card-icon mb-3"
              />
              <h6 className="tg-coach-card-text">
                TAILORED LEARNING TO SUIT <br /> YOUR NEEDS
              </h6>
            </div>

            <div className="col-md-1 text-center d-none d-md-block" data-aos="fade-right" duration="100">
              <img
                src={arrow}
                alt="Arrow"
                className="tg-coach-Arrow"
              />
            </div>

            <div className="col-md-3 text-center" data-aos="fade-right" duration="200">
              <img
                src={ExportCoach}
                alt="Coach 6"
                className="tg-coach-card-icon mb-3"
              />
              <h6 className="tg-coach-card-text">
                EXPERT COACHES AVAILABLE <br /> ON DEMAND
              </h6>
            </div>
          </div>

          <p className="tg-coach-text2 mt-4">
            You will be assigned a dedicated coach who will work closely with you to
            help you develop a strong foundation in technology. This primary coach
            will not only guide you through your learning journey but will also bring
            in additional expert coaches when needed, ensuring you get the specialized
            support required for your growth.
          </p>
        </div>
      </section>

      {/* One Stop Section */}
      <section className="one-stop-section">
        <div className="content-wrapper" data-aos="fade-up">
          <div className="text-column">
            <h2>Your One – Stop Shop</h2>
            <p>
              With this personalized and flexible approach, Technology Garage becomes
              your "one-stop shop" for exploring and mastering technology. Whether
              you're just starting or looking to expand your skills, we're here to
              support you every step of the way.
            </p>
          </div>
          <div className="image-column">
            <img
              src={youronestopshop}
              alt="Human touching robot hand"
            />
          </div>
        </div>

        <div className="bottom-caption" data-aos="fade-up">
          Technology Garage is your "one-stop shop" — a place where you can dive deep
          into hands-on experiences, enhance your tech skills, and explore everything
          from the basics to more advanced techniques, all in one convenient
          location. Whether you're starting from scratch or leveling up your
          expertise, our expert coaches and cutting-edge tools are here to guide you
          every step of the way. Empower yourself today, unlock your full potential,
          and be ready to shape a brighter, more innovative tomorrow.
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row g-4 justify-content-center">
            {/* Card 1 */}
            <div className="col-md-6 col-lg-4" data-aos="fade-up">
              <div className="feature-card text-center p-4 h-100">
                <img
                  src={Basics}
                  alt="Tech Icon"
                  className="feature-icon mb-3"
                />
                <h5 className="feature-title">Basics of Technology</h5>
                <p className="feature-description">
                  Designed for beginners, this track takes you from scratch, starting
                  with block-based coding and gradually advancing to more
                  sophisticated skills. Start your journey with the basics and build a
                  solid foundation for the future.
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-card text-center p-4 h-100">
                <img
                  src={Learn}
                  alt="AI Icon"
                  className="feature-icon mb-3"
                />
                <h5 className="feature-title">
                  Learn and Grow with Artificial Intelligence
                </h5>
                <p className="feature-description">
                  Dive into the world of Artificial Intelligence and develop the
                  skills needed to understand and work with AI. From machine learning
                  to Generative AI, explore the endless possibilities of Artificial
                  Intelligence and how it's shaping the world.
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-card text-center p-4 h-100">
                <img
                  src={Gamified}
                  alt="Game Icon"
                  className="feature-icon mb-3"
                />
                <h5 className="feature-title">Gamified Learning Experience</h5>
                <p className="feature-description">
                  Experience learning like never before with a gamified approach! Earn
                  points as you progress through challenges, and redeem them to unlock
                  and use cutting-edge technology tools. Make learning fun and
                  rewarding!
                </p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-card text-center p-4 h-100">
                <img
                  src={Robotics}
                  alt="Tech Icon"
                  className="feature-icon mb-3"
                />
                <h5 className="feature-title">Build From Scratch (BFS)</h5>
                <p className="feature-description">
                  The BFS introduces learners to hands-on technology and engineering
                  from the ground up. Build, program, and experiment with real
                  hardware while gaining the skills to create and innovate with
                  confidence.
                </p>
              </div>
            </div>
            {/* Card 5 */}
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-card text-center p-4 h-100">
                <img
                  src={Cloud}
                  alt="Cloud Icon"
                  className="feature-icon mb-3"
                />
                <h5 className="feature-title">Cloud is Part of Life</h5>
                <p className="feature-description">
                  Discover how cloud technology powers the digital world around us.
                  From storing data to running applications and enabling global
                  collaboration, learn why the cloud is essential in everyday life and
                  future careers.
                </p>
              </div>
            </div>
            {/* Card 6 */}
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="500">
              <div className="feature-card text-center p-4 h-100">
                <img
                  src={Certificate}
                  alt="Certificate Icon"
                  className="feature-icon mb-3"
                />
                <h5 className="feature-title">Validated Certificate</h5>
                <p className="feature-description">
                  Earn industry-recognized certificates that validate your learning
                  journey. Showcase your achievements, boost your profile, and open
                  doors to exciting academic and career opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Contact Section - only if Tamil Nadu */}
      {userLocation?.principalSubdivision?.toLowerCase().includes("tamil nadu") && (
        <section className="contact-section py-5">
          <div className="container">
            <div className="row g-4 align-items-stretch">
              <div className="col-12 col-md-6" data-aos="fade-up">
                <div className="p-4 bg-light h-100 shadow-sm rounded">
                  <h2 className="contact-title mb-4">CONTACT</h2>
                  <p>
                    <strong>Address:</strong>
                    <br />
                    36/1 Guru Enclave, 2nd Floor,
                    <br />
                    Old Agraharam Road,
                    <br />
                    Thennur, Trichy - 620017.
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:admin@technology-garage.com">
                      admin@technology-garage.com
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a href="tel:+919876543210">+91 74484 27243</a>
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6" data-aos="fade-up" data-aos-delay="200">
                <div
                  className="h-100 shadow-sm rounded overflow-hidden"
                  style={{ minHeight: "300px" }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.4618948755347!2d78.6846451255256!3d10.81714415978704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf520be693c23%3A0xeefa0969df12aeaa!2sTechnology%20Garage!5e0!3m2!1sen!2sin!4v1754383223835!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="map"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Home;
