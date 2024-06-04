import React, { useState, useEffect } from "react";
import { Typography, Button, Container } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "../NavBar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
  Root,
  ContentSection,
  ArrowButton,
  FooterSection,
} from "./LandingPageStylings";

const sections = [
  {
    id: "welcome",
    title: "Welcome to Our E-Commerce Site",
    description:
      "The best place to find amazing products at unbeatable prices.",
    buttonText: "Shop Now",
    buttonLink: "#welcome",
    details: `Welcome to the ultimate destination for online shopping! At our e-commerce site, we pride ourselves on offering a vast selection of high-quality products at unbeatable prices. Our user-friendly interface and seamless shopping experience ensure that you can find exactly what you need with ease. Whether you're looking for the latest electronics, stylish home goods, or trendy fashion items, we've got you covered.

Our commitment to customer satisfaction drives us to continually expand our product range, providing you with an ever-growing selection of items to choose from. We work tirelessly to source the best products from trusted brands and suppliers, ensuring that every purchase you make is a great value for your money. With our fast shipping and hassle-free returns, shopping with us is always a convenient and enjoyable experience.

But it's not just about the products; it's about the experience. Our dedicated customer service team is always ready to assist you with any questions or concerns you may have. We believe in building lasting relationships with our customers, and we strive to exceed your expectations in every way possible.`,
  },
  {
    id: "promise",
    title: "Our Promise",
    description:
      "We promise to provide the highest quality products and the best customer service. Our team is dedicated to ensuring your satisfaction with every purchase.",
    buttonText: "Learn More",
    buttonLink: "#promise",
    details: `At the heart of our business lies a steadfast commitment to quality and customer satisfaction. Our promise to you is simple: we provide the highest quality products and exceptional customer service. We understand that shopping online can be daunting, which is why we go above and beyond to ensure that every product we sell meets our stringent quality standards. From rigorous testing to careful packaging, we take every step necessary to deliver excellence.

Our promise extends beyond the products themselves. We believe in transparency and integrity, ensuring that you have all the information you need to make informed purchasing decisions. Our detailed product descriptions, customer reviews, and responsive customer service team are all part of our commitment to providing you with a seamless shopping experience.

Customer satisfaction is our top priority. We are dedicated to resolving any issues that may arise and are always here to help you with any concerns. Your trust is important to us, and we aim to build long-term relationships by delivering on our promise of quality and service.`,
  },
  {
    id: "policy",
    title: "Our Guarantee",
    description:
      "We guarantee that every product you buy from us will meet your expectations. If you are not completely satisfied, we offer a hassle-free return policy.",
    buttonText: "Read Our Policy",
    buttonLink: "#policy",
    details: `Shopping with us comes with the assurance of our comprehensive guarantee. We stand behind the quality of our products and are committed to ensuring your complete satisfaction. If, for any reason, you are not entirely happy with your purchase, we offer a hassle-free return policy. Simply return the item within 30 days, and we will provide a full refund or exchange.

Our guarantee reflects our confidence in the products we offer and our commitment to providing you with the best possible shopping experience. We believe that buying online should be worry-free, and our return policy is designed to give you peace of mind. You can shop with confidence, knowing that your satisfaction is guaranteed.

We value your trust and strive to make your shopping experience as smooth and enjoyable as possible. Our customer service team is always available to assist you with returns, exchanges, or any other questions you may have. We are here to ensure that you are completely satisfied with your purchase.`,
  },
  {
    id: "about",
    title: "What We Do",
    description:
      "Our website offers a wide range of products, from electronics to home goods, all at competitive prices. We strive to provide an exceptional shopping experience with fast shipping and excellent customer support.",
    buttonText: "Discover More",
    buttonLink: "#about",
    details: `Our mission is to provide you with a diverse selection of high-quality products at competitive prices. From the latest electronics to stylish home goods, our extensive catalog has something for everyone. We partner with top brands and reliable suppliers to bring you the best products on the market, ensuring that you have access to the latest trends and innovations.

We believe that shopping should be convenient and enjoyable. Our user-friendly website is designed to make it easy for you to find what you're looking for, with detailed product descriptions, high-quality images, and customer reviews to help you make informed decisions. Our secure payment system and fast shipping options ensure that your orders are processed quickly and delivered to your doorstep in no time.

Customer satisfaction is at the core of what we do. We are committed to providing excellent customer service and support, ensuring that your shopping experience is seamless from start to finish. Whether you have questions about a product, need help with an order, or just want to provide feedback, our team is here to assist you every step of the way.`,
  },
  {
    id: "testimonials",
    title: "Customer Testimonials",
    description:
      "Don't just take our word for it, hear what our customers have to say about their shopping experience with us.",
    buttonText: "Read Reviews",
    buttonLink: "#testimonials",
    details: `Our customers are at the heart of everything we do, and their feedback is invaluable to us. We are proud to share the positive experiences that our customers have had while shopping with us. From the ease of navigating our website to the quality of the products they received, our customers consistently praise us for our dedication to providing an exceptional shopping experience.

Here are just a few of the glowing reviews we've received: "I was thrilled with the fast shipping and the quality of the product I ordered. It exceeded my expectations!" "The customer service team was incredibly helpful and resolved my issue quickly. I will definitely be shopping here again." "I love the variety of products available. There's always something new to discover, and the prices are unbeatable."

We are committed to maintaining the high standards that have earned us such positive feedback. Our goal is to continue exceeding your expectations and to build lasting relationships based on trust and satisfaction. Your testimonials inspire us to keep improving and to provide you with the best possible shopping experience.`,
  },
  {
    id: "contact",
    title: "Contact Information",
    description:
      "Have questions or need support? Get in touch with us through our contact page.",
    buttonText: "Contact Us",
    buttonLink: "#contact",
    details: `We value your feedback and are here to assist you with any questions or concerns you may have. Our customer service team is dedicated to providing you with prompt and helpful support. Whether you need help with an order, have questions about our products, or simply want to provide feedback, we are here to help.

You can reach us through our contact page, where you will find various ways to get in touch with us. We offer support via email, phone, and live chat, ensuring that you can choose the method that is most convenient for you. Our team is available during regular business hours and will respond to your inquiries as quickly as possible.

Your satisfaction is our top priority, and we are committed to providing you with the best possible service. We appreciate your feedback and look forward to assisting you with all your shopping needs. Thank you for choosing our e-commerce site as your go-to destination for online shopping.`,
  },
];

const ECommerceLandingPage = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePrev = () => {
    setSlideDirection(-1);
    setCurrentSectionIndex((prev) =>
      prev === 0 ? sections.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentSectionIndex((prev) =>
      prev === sections.length - 1 ? 0 : prev + 1
    );
  };

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWelcome = () => {
    document.getElementById("welcome").scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight = document.getElementById("welcome").offsetHeight;
      setShowScrollButton(window.scrollY > heroSectionHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const selectedSection = sections[currentSectionIndex];

  return (
    <Root>
      <NavBar />
      <motion.div
        id="welcome"
        className="hero-section"
        initial={{
          background:
            // "radial-gradient(circle, rgba(0,124,134,1) 0%, rgba(0,64,140,1) 100%)",
            "radial-gradient(circle, rgba(0,2,76,1) 0%, rgba(0,64,140,0.2) 100%)",
        }}
        animate={{
          background: isHovered
            ? "radial-gradient(circle, rgba(0,2,76,1) 100%, rgba(0,64,140,0.2) 0%)"
            : "radial-gradient(circle, rgba(0,64,140,0.6) 0%, rgba(255,255,255,0.1) 100%)",
        }}
        transition={{ duration: 1.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "calc(100vh - 48px)",
          position: "relative",
          overflow: "hidden",
          borderBottom: "1px solid #969696",
        }}
      >
        <ArrowButton
          onClick={handlePrev}
          style={{ left: "270px" }}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "blue",
              color: "#ffffff",
            },
          }}
        >
          <ArrowBack sx={{ color: "white" }} />
        </ArrowButton>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedSection.title}
            initial={{ opacity: 0, x: 100 * slideDirection }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 * slideDirection }}
            transition={{ duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <ContentSection>
              <Container>
                <Typography
                  variant="h2"
                  component="div"
                  color={isHovered ? "#ffffbb" : "#003c76"}
                  gutterBottom
                >
                  {selectedSection.title}
                </Typography>
                <Typography
                  variant="h5"
                  color={isHovered ? "#cce3ff" : "#fff000"}
                  style={{ fontWeight: 700 }}
                >
                  {selectedSection.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "20px" }}
                  onClick={() => scrollToSection(selectedSection.id)}
                >
                  {selectedSection.buttonText}
                </Button>
              </Container>
            </ContentSection>
          </motion.div>
        </AnimatePresence>
        <ArrowButton
          onClick={handleNext}
          // style={{ right: "90px" }}
          sx={{
            right: "270px",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "blue",
              color: "#ffffff",
            },
          }}
        >
          <ArrowForward sx={{ color: "white" }} />
        </ArrowButton>
      </motion.div>

      <Container
        style={{
          marginTop: "40px",
          backgroundColor: "#cce3ff",
        }}
      >
        {sections.map((section) => (
          <ContentSection id={section.id} key={section.id}>
            <Container>
              <Typography variant="h3" component="div" gutterBottom>
                {section.title}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                style={{
                  fontWeight: 700,
                  lineHeight: "1.8",
                  letterSpacing: "0.5px",
                }}
              >
                {section.description}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{
                  marginTop: "20px",
                  lineHeight: "1.8",
                  letterSpacing: "0.5px",
                }}
              >
                {section.details}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "20px" }}
                onClick={() => scrollToSection(section.id)}
              >
                {section.buttonText}
              </Button>
            </Container>
          </ContentSection>
        ))}
      </Container>

      {showScrollButton && (
        <Button
          variant="contained"
          color="primary"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "80px",
            zIndex: 1000,
            fontSize: "16px",
            padding: "10px",
          }}
          onClick={scrollToWelcome}
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </Button>
      )}

      <FooterSection>
        <Typography variant="body1">
          &copy; 2024 E-Commerce. All rights reserved.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <a href="/terms" style={{ color: "#ffffff", textDecoration: "none" }}>
            Terms of Service
          </a>{" "}
          |{" "}
          <a
            href="/privacy"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            Privacy Policy
          </a>
        </Typography>
      </FooterSection>
    </Root>
  );
};

export default ECommerceLandingPage;
