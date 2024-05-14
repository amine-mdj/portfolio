import logo from "./logo.svg";
import "./App.css";
import './css3d.css'
import './canvas.css'
import Profile from "./images/profile.jpg";
import Portfolio1 from './images/portfolio1.jpg'
import Portfolio2 from './images/portfolio2.jpg'
import Portfolio3 from './images/portfolio3.jpg'
import Portfolio4 from './images/portfolio4.jpg'
import Portfolio5 from './images/portfolio5.jpg'
import Portfolio6 from './images/portfolio6.jpg'
import Onion from './images/onion.png'
import Broccoli from './images/broccoli.png'
import Pumpkin from './images/pumpkin.png'
import Avocado from './images/avocado.png'
import Tomato from './images/tomato.png'
import Hand from './images/hand.png'
import Svg from './images/svg.png'
import threed from './images/3d.png'
import Painting from './images/painting.png'
import './style-switcher.css'
import { useEffect,useRef, useState, useLayoutEffect } from "react";
import Typed from 'typed.js';

function App() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [previousIndex, setPreviousIndex] = useState(null);
  const [isTranslated, setIsTranslated] = useState(false);

  const el = useRef(null);
  const asideRef = useRef(null);
  const hamRef = useRef(null);
  const navRef = useRef(null);
  const demo1Ref = useRef(null);
  const demo2Ref = useRef(null);

  const canvasRef = useRef(null);
  const balls = [];
  const rgb = [
    [26, 188, 156],
    [46, 204, 113],
    [52, 152, 219],
    [155, 89, 182],
    [241, 196, 15],
    [230, 126, 34],
    [231, 76, 60]
  ];

  

const toggledark = ()=> {
  document.body.classList.toggle('dark');
  document.querySelector(".theme").classList.toggle("fa-moon")
  }

  const toggleclick = () =>{
    document.querySelector(".style-switcher").classList.toggle("open")
  }
  
const setActivityStyle = (color)=>{
  document.documentElement.style.setProperty('--skin-color', color)
}

const handlehammobile = ()=> {
  hamRef.current.classList.toggle('open-mobile'); 
  asideRef.current.classList.toggle('open-mobile');
}

const handleAnchorClick = (index) => {
  
  setActiveIndex(index);
  setPreviousIndex(activeIndex); 
  if(767<window.innerWidth<1200){
    handleham();
  }

  
   
};

const handleham = () =>{
  hamRef.current.classList.toggle('open'); 
   asideRef.current.classList.toggle('open');
   navRef.current.classList.toggle('open-mobile');
  setIsTranslated(!isTranslated);
  
}

const demo1 = (e) =>{
  demo1Ref.current.style.height = '100%';

  }

  const demo2 = (e) =>{
    demo2Ref.current.style.height = '100%';
  
    }

 

  const closeDemo1 = ()=>{
    demo1Ref.current.style.height = '0';
  }

  const closeDemo2 = ()=>{
    demo2Ref.current.style.height = '0';
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let w, h;
    let mouse = {
      x: undefined,
      y: undefined
    };

    function init() {
      resizeReset();
      animationLoop();
    }

    function resizeReset() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function animationLoop() {
      ctx.clearRect(0, 0, w, h);
      if (mouse.x !== undefined && mouse.y !== undefined) {
        balls.push(new Ball());
      }
      if (balls.length > 200) {
        balls.shift();
      }
      drawBalls();
      requestAnimationFrame(animationLoop);
    }

    function drawBalls() {
      for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
      }
    }

    function mousemove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function mouseout() {
      mouse.x = undefined;
      mouse.y = undefined;
    }

    function getRandomInt(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    }

    class Ball {
      constructor() {
        this.x = mouse.x + getRandomInt(-20, 20);
        this.y = mouse.y + getRandomInt(-20, 20);
        this.size = getRandomInt(10, 20);
        this.rgb = rgb[getRandomInt(0, rgb.length - 1)];
        this.style = `rgba(${this.rgb[0]},${this.rgb[1]},${this.rgb[2]},.5)`;
      }

      draw() {
        const sectionStyle = window.getComputedStyle(document.querySelector('.section'));
    const leftValue = sectionStyle.getPropertyValue('left');
        ctx.fillStyle = this.style;
        ctx.beginPath();
        if(leftValue === '270px'){
          ctx.arc(this.x - 270, this.y - 100, this.size, 0, Math.PI * 2);
        }
        else{
          ctx.arc(this.x, this.y - 100, this.size, 0, Math.PI * 2);
        }
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (this.size > 0) {
          let s = this.size - 0.3;
          this.size = s <= 0 ? 0 : s;
        }
      }
    }

    init();

    window.addEventListener('resize', resizeReset);
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseout', mouseout);

    return () => {
      window.removeEventListener('resize', resizeReset);
      window.removeEventListener('mousemove', mousemove);
      window.removeEventListener('mouseout', mouseout);
    };
  }, []);


  useEffect(()=>{
     window.addEventListener("scroll", ()=>{
      if(document.querySelector(".style-switcher").classList.contains('open'))
      {
          document.querySelector(".style-switcher").classList.remove('open')
      }
  })

  

  const typed = new Typed(el.current, {
    strings: ['Full stack js developer', '3D css animations', 'Canvas animations', 'SVG animations'],
    typeSpeed: 100,
    backSpeed:60,
    loop: true,
  });

  return () => {
    // Destroy Typed instance during cleanup to stop animation
    typed.destroy();
    window.removeEventListener("scroll", () => {});
  };

  
  },)


  return (
    <div className="App">
      <div className="main-container">
        <div className="aside" ref={asideRef}>
          <div className="logo">
            <a href="#">
              <span>A</span>tlas
            </a>
          </div>
          <div className="nav-toggler" ref={hamRef} onClick={handleham}>
            <span></span>
          </div>
          <ul className="nav" ref={navRef}>
            <li>
              <a href="#home" onClick={() => handleAnchorClick('0')} className={'0' === activeIndex ? 'active' : ''}>
                <i className="fa fa-home"></i>Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => handleAnchorClick('1')} className={"1" === activeIndex ? 'active' : ''}>
                <i className="fa fa-user"></i>About
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => handleAnchorClick("2")} className={'2' === activeIndex ? 'active' : ''}>
                <i className="fa fa-list"></i>Services
              </a>
            </li>
            <li>
              <a href="#portfolio" onClick={() => handleAnchorClick("3")} className={'3' === activeIndex ? 'active' : ''}>
                <i className="fa fa-briefcase"></i>Portfolio
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => handleAnchorClick("4")} className={'4' === activeIndex ? 'active' : ''}>
                <i className="fa fa-comments"></i>Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <div className={`home section ${'0' === activeIndex ? 'active' : ''}${'0' === previousIndex ? 'back-section' : ''} ${isTranslated ? 'open' : ''}`} id='home'>
            <div className="container">
              <div className="row">
                <div className="home-info padd-15">
                  <h3 className="hello">
                    <img className="hand-emoji" src={Hand} alt="" />
                    {" "}
                    hello, my name is{" "}
                    <span className="name">Amine Medjdoub</span>
                  </h3>
                  <h3 className="my-profession">
                    I'm a <span className="typing" ref={el}>web developer</span>
                  </h3>
                  <p>
                    I'm a <span className="description">Full Stack JS developer</span>  with extensive experience for over 10
                    years, my expertise is to create all kinds of websites
                    with the latest animations available such as : <span className="skills-description"> 3D CSS animations</span> ,<span className="skills-description"> Canvas animations</span>,<span className="skills-description"> SVG animations</span>, and more ...{" "}
                  </p>
                  <a href="#contact" className="btn hire-me">
                    Download CV
                  </a>
                </div>
                <div className="home-img padd-15">
                  <img src={Profile} alt="profile image" />
                </div>
              </div>
            </div>
          </div>
          <section className={`about section ${'1' === activeIndex ? 'active' : ''}${'1' === previousIndex ? 'back-section' : ''} ${isTranslated ? 'open' : ''}`} id='about'>
            <div className="container">
              <div className="row">
                <div className="section-title padd-15">
                  <h2>About Me</h2>
                </div>
              </div>
              <div className="row">
                <div className="about-content padd-15">
                    <div className="row">
                      <div className="about-text padd-15">
                        <h3>I craft a variety of  <span>websites :</span></h3>
                        <ul className="kinds">
                          <li>
                            <img className="list-sstyle" src={Onion} alt="" />
                          Social Media Platform
                          </li>
                          <li>
                          <img className="list-sstyle" src={Broccoli} alt="" />
                          E-commerce Platform
                          </li>
                          <li>
                          <img className="list-sstyle" src={Pumpkin} alt="" />
                          Blog website
                          </li>
                          <li>
                          <img className="list-sstyle" src={Avocado} alt="" />
                          photo editing apps
                          </li>
                          <li>
                          <img className="list-sstyle" src={Tomato} alt="" />
                          weather apps
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row">
                      <div className="personal-info padd-15">
                             <div className="row margin-personal">
                              <div className="info-item padd-15">
                                <p>Birthday : <span> 22 / 10 / 1994</span></p>
                              </div>
                              <div className="info-item padd-15">
                                <p>Age : <span>29 yo</span></p>
                              </div>
                              <div className="info-item padd-15">
                                <p>Website : <span>www.domain.com</span></p>
                              </div>
                              <div className="info-item padd-15">
                                <p>Email : <span>aminerate16@gmail.com</span></p>
                              </div>
                              <div className="info-item padd-15">
                                <p>Degree : <span>software engeneer</span></p>
                              </div>
                              <div className="info-item padd-15">
                                <p>Phone : <span>07 92 41 35 89</span></p>
                              </div>
                              <div className="info-item padd-15">
                                <p>City : <span>Algiers</span></p>
                              </div>
                              <div className="info-item padd-15">
                                <p>Freelance : <span>Available</span></p>
                              </div>
                             </div>
                             <div className="row">
                              <div className="buttons padd-15">
                                <a href="#contact" className="btn hire-me">Hire Me</a>
                              </div>
                             </div>
                      </div>
                      <div className="skills padd-15">
                        <div className="row">
                          <h3 className="h3-skills">Skills :</h3>
                          <div className="skill-item padd-15">
                           <h5>CSS</h5>
                           <div className="progress">
                            <div className="progress-in" style={{'width':'99%'}}></div>
                            <div className="skill-percent">99%</div>
                           </div>
                          </div>
                          <div className="skill-item padd-15">
                           <h5>JAVASCRIPT</h5>
                           <div className="progress">
                            <div className="progress-in" style={{'width':'99%'}}></div>
                            <div className="skill-percent">99%</div>
                           </div>
                          </div>
                          <div className="skill-item padd-15">
                           <h5>REACT</h5>
                           <div className="progress">
                            <div className="progress-in" style={{'width':'99%'}}></div>
                            <div className="skill-percent">99%</div>
                           </div>
                          </div>
                          <div className="skill-item padd-15">
                           <h5>EXPRESS JS</h5>
                           <div className="progress">
                            <div className="progress-in" style={{'width':'99%'}}></div>
                            <div className="skill-percent">99%</div>
                           </div>
                          </div>
                          <div className="skill-item padd-15">
                           <h5>MONGO DB </h5>
                           <div className="progress">
                            <div className="progress-in" style={{'width':'99%'}}></div>
                            <div className="skill-percent">99%</div>
                           </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="education padd-15">
                             <h3 className="title">Education :</h3>
                             <div className="row">
                              <div className="timeline-box padd-15">
                                <div className="timeline ">
                                   <div className="timeline-item">
                                    <div className="circle-dot"></div>
                                    <div className="timeline-item-white shadow-dark">
                                    <h3 className="timeline-date">
                                      <i className="fa fa-calendar"></i>2015 - 2020
                                    </h3>
                                    <p className="timeline-desc">industrial engeneering</p>
                                    <h4 className="timeline-title"> Ecole national polytechnique - alger</h4>
                                    </div>
                                   </div>

                                   <div className="timeline-item">
                                    <div className="circle-dot"></div>
                                    <div className="timeline-item-white shadow-dark">
                                    <h3 className="timeline-date">
                                      <i className="fa fa-calendar"></i>2022 - 2023
                                    </h3>
                                    <p className="timeline-desc">full stack js developer</p>
                                    <h4 className="timeline-title"> Ecole gomycode alger - alger</h4>
                                    </div>
                                   </div>

                                   
                                </div>
                              </div>
                             </div>
                      </div>
                      <div className="experience padd-15">
                             <h3 className="title">Experience :</h3>
                             <div className="row">
                              <div className="timeline-box padd-15">
                                <div className="timeline ">
                                   <div className="timeline-item">
                                    <div className="circle-dot"></div>
                                    <div className="timeline-item-white shadow-dark">
                                    <h3 className="timeline-date">
                                      <i className="fa fa-calendar"></i>july 2023 - december 2023
                                    </h3>
                                    <p className="timeline-desc">6 month full stack js developer</p>
                                     <h4 className="timeline-title"> Media Avenue (start up)</h4>
                                    </div>
                                   </div>
                                 
                                </div>
                              </div>
                             </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`service section ${'2' === activeIndex ? 'active' : ''}${'2' === previousIndex ? 'back-section' : ''} ${isTranslated ? 'open' : ''}`} id='services'>
          <div className="demo1" ref={demo1Ref}>
            <div className="circle-arrow-left">
            <i class="fa-solid fa-circle-arrow-left fa-2xl" onClick={closeDemo1} style={{'color':'white', 'cursor':'pointer'}}></i>
            </div>
          
              <div className="container-demo1">
             <div className="cube">
              <div style={{"--x":"-1","--y":"0" }}>
               <span style={{"--i":"3"}}></span>
               <span style={{"--i":"2"}}></span>
               <span style={{"--i":"1"}}></span>
              </div>
              <div style={{"--x":"0","--y":"0" }}>
               <span style={{"--i":"3"}}></span>
               <span style={{"--i":"2"}}></span>
               <span style={{"--i":"1"}}></span>
              </div>
              <div style={{"--x":"1","--y":"0" }}>
               <span style={{"--i":"3"}}></span>
               <span style={{"--i":"2"}}></span>
               <span style={{"--i":"1"}}></span>
              </div>
             </div>
             <div className="cube">
              <div style={{"--x":"-1","--y":"0" }}>
               <span style={{"--i":"3"}}></span>
               <span style={{"--i":"2"}}></span>
               <span style={{"--i":"1"}}></span>
              </div>
              <div style={{"--x":"0","--y":"0" }}>
               <span style={{"--i":"3"}}></span>
               <span style={{"--i":"2"}}></span>
               <span style={{"--i":"1"}}></span>
              </div>
              <div style={{"--x":"1","--y":"0" }}>
               <span style={{"--i":"3"}}></span>
               <span style={{"--i":"2"}}></span>
               <span style={{"--i":"1"}}></span>
              </div>
             </div>
             <div className="cube">
              <div style={{"--x":"-1","--y":"0" }}>
               <span style={{"--i":"3"}}></span>
               <span style={{"--i":"2"}}></span>
               <span style={{"--i":"1"}}></span>
              </div>
              <div style={{"--x":"0","--y":"0" }}>
               <span style={{"--i":"3"}}></span>
               <span style={{"--i":"2"}}></span>
               <span style={{"--i":"1"}}></span>
              </div>
              <div style={{"--x":"1","--y":"0" }}>
               <span style={{"--i":"3"}}></span>
               <span style={{"--i":"2"}}></span>
               <span style={{"--i":"1"}}></span>
              </div>
             </div>
            </div>
            </div>
            <div className="demo2" ref={demo2Ref}>
             <div className="canvas-description">
             <h1>Balls mouse trail effect</h1>
	          <p>Move the mouse cursor</p>
             </div>
            
            <div className="circle-arrow-left">
            <i class="fa-solid fa-circle-arrow-left fa-2xl" onClick={closeDemo2} style={{'color':'white', 'cursor':'pointer'}}></i>
            </div>
            <canvas ref={canvasRef}>
            
            </canvas>
            </div>
            <div className="container">
              <div className="row">
                <div className="section-title padd-15">
                  <h2>Services</h2>
                </div>
              </div>
              <div className="row">
                <div className="service-item">
                  <div className="service-item-inner">
                    <div className="icon">
                    <img className="svg-image" src={threed} alt="" />
                    </div>
                    <h4>3D css animations</h4>
                    <button className="button-gradient" onClick={(e)=>demo1(e)}>DEMO</button>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-item-inner">
                    <div className="icon">
                      <img className="svg-image" src={Svg} alt="" />
                    </div>
                    <h4>SVG animations</h4>
                    <button className="button-gradient">DEMO</button>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-item-inner">
                    <div className="icon">
                    <img className="svg-image" src={Painting} alt="" />
                    </div>
                    <h4>Canvas animations</h4>
                    <button className="button-gradient" onClick={(e)=>demo2(e)}>DEMO</button>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-item-inner">
                    <div className="icon">
                      <i className="fa fa-code"></i>
                    </div>
                    <h4>web design</h4>
                    <button className="button-gradient">DEMO</button>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-item-inner">
                    <div className="icon">
                      <i className="fa fa-search"></i>
                    </div>
                    <h4>web design</h4>
                    <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
                <div className="service-item">
                  <div className="service-item-inner">
                    <div className="icon">
                      <i className="fa fa-bullhorn"></i>
                    </div>
                    <h4>web design</h4>
                    <p>Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>
            </div>
            
          </section>
          <section className={`portfolio section ${'3' === activeIndex ? 'active' : ''}${'3' === previousIndex ? 'back-section' : ''} ${isTranslated ? 'open' : ''}`} id='portfolio'>
            <div className="container">
              <div className="row">
                <div className="section-title padd-15">
                  <h2>portfolio</h2>
                </div>
              </div>
              <div className="row">
                <div className="portfolio-heading padd-15">
                  <h2>My latest projects : </h2>
                </div>
              </div>
              <div className="row">
                <div className="portfolio-item padd-15">
                  <div className="portfolio-item-inner shadow-dark">
                    <div className="portfolio-img">
                       <img src={Portfolio1} alt="Portfolio1" />
                    </div>
                  </div>
                </div>
                <div className="portfolio-item padd-15">
                  <div className="portfolio-item-inner shadow-dark">
                    <div className="portfolio-img">
                       <img src={Portfolio2} alt="Portfolio2" />
                    </div>
                  </div>
                </div>
                <div className="portfolio-item padd-15">
                  <div className="portfolio-item-inner shadow-dark">
                    <div className="portfolio-img">
                       <img src={Portfolio3} alt="Portfolio3" />
                    </div>
                  </div>
                </div>
                <div className="portfolio-item padd-15">
                  <div className="portfolio-item-inner shadow-dark">
                    <div className="portfolio-img">
                       <img src={Portfolio4} alt="Portfolio4" />
                    </div>
                  </div>
                </div>
                <div className="portfolio-item padd-15">
                  <div className="portfolio-item-inner shadow-dark">
                    <div className="portfolio-img">
                       <img src={Portfolio5} alt="Portfolio5" />
                    </div>
                  </div>
                </div>
                <div className="portfolio-item padd-15">
                  <div className="portfolio-item-inner shadow-dark">
                    <div className="portfolio-img">
                       <img src={Portfolio6} alt="Portfolio6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={`contact section ${'4' === activeIndex ? 'active' : ''}${'4' === previousIndex ? 'back-section' : ''} ${isTranslated ? 'open' : ''}`} id='contact'>
              <div className="container">
                <div className="row">
                  <div className="section-title padd-15">
                    <h2>
                      Contact me
                    </h2>
                  </div>
                </div>
                <h3 className="contact-title">Have You Any Questions ?</h3>
               <h4 className="contact-sub-title">I'M AT YOUR SERVICES</h4>
               <div className="row">
                <div className="contact-info-item padd-15">
                  <div className="icon">
                    <i className="fa fa-phone"></i>
                    </div>
                    <h4>Call Us On</h4>
                    <p>0792413589</p>
                    </div>
                    <div className="contact-info-item padd-15">
                  <div className="icon">
                    <i className="fa fa-map-marker-alt"></i>
                    </div>
                    <h4>Office</h4>
                    <p>Algiers</p>
                    </div>
                    <div className="contact-info-item padd-15">
                  <div className="icon">
                    <i className="fa fa-envelope"></i>
                    </div>
                    <h4>Email</h4>
                    <p>aminerate16@gmail.com</p>
                    </div>
                    <div className="contact-info-item padd-15">
                  <div className="icon">
                    <i className="fa fa-globe-europe"></i>
                    </div>
                    <h4>Website</h4>
                    <p>www.domain.com</p>
                    </div>
                    </div>
                    <h3 className="contact-title">SEND ME AN EMAIL</h3>
                    <h4 className="contact-sub-title">I'M VERY RESPOSIVE TO MESSSAGES</h4>
                    <div className="row">
                      <div className="contact-form padd-15">
                        <div className="row">
                          <div className="form-item col-6 padd-15">
                            <div className="form-group">
                             <input type="text" className="form-control" placeholder="name" />
                            </div>
                          </div>
                          <div className="form-item col-6 padd-15">
                            <div className="form-group">
                              <input type="email" className="form-control" placeholder="email" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-item col-12 padd-15">
                            <div className="form-group">
                            <input type="text" className="form-control" placeholder="Subject" />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-item col-12 padd-15">
                            <div className="form-group">
                            <textarea name="" className="form-control" placeholder="message"></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-item col-12 padd-15">
                            <div className="form-group">
                           <button type="submit" className="btn">Send Message</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
              </div>
          </section>
        </div>
      </div>
      <div className="style-switcher">
        <div className="style-switcher-toggler s-icon" onClick={toggleclick}>
          <i className="fas fa-cog fa-spin"></i>
        </div>
        <div className="day-night s-icon" onClick={toggledark}>
          <i className="fas fa-sun theme"></i>
        </div>
        <h4>Theme Colors</h4>
        <div className="colors">
           <span className="color-1" onClick={()=>setActivityStyle('#ec1839')} ></span>
           <span className="color-2" onClick={()=>setActivityStyle('#fa5b0f')}></span>
           <span className="color-3" onClick={()=>setActivityStyle('#37b182')}></span>
           <span className="color-4" onClick={()=>setActivityStyle('#1854b2')}></span>
           <span className="color-5" onClick={()=>setActivityStyle('#f021b2')}></span> 
        </div>
      </div>
    </div>
  );
}

export default App;
