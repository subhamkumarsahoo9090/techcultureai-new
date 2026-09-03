"use client"
import { useSite } from '../context/siteContext';
import Button from '@mui/material/Button'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { IoClose, IoChevronDown, IoCalendarOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import { ImWhatsapp } from "react-icons/im";
import ModernDateTimePicker from "./datetimepicker";
import HeaderGooeyBubbles from "./HeaderGooeyBubbles";
import { webdevHref } from "../lib/webdevelopment/paths";

const WEBDEV_LOGO = "/tc-new-logo-2.png";
import {
  ProductsMegaPanel,
  IndustriesMegaPanel,
  ProductsMobileMenu,
  IndustriesMobileMenu,
  AutomationMegaPanel,
  AboutMegaPanel,
  AutomationMobileMenu,
  AboutMobileMenu,
  aboutItems,
} from "./HeaderMegaMenus";

const Header = () => {
  const contact = 7428238091;
  const sendToWhatsApp = () => {
    const encodedMessage = encodeURIComponent("Hii");
    const whatsappURL = `https://wa.me/${contact}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };
    const pathname = usePathname();
    const isLightHeader = true;
    const menuVariant = isLightHeader ? "webdevelopment" : "default";
    const dropdownActiveClass =
        isLightHeader
            ? "text-teal-600 opacity-100 font-semibold"
            : "text-primary opacity-100 font-semibold";
    const activeUnderlineClass = isLightHeader ? "bg-teal-600" : "bg-primary";
    const router = useRouter();
    const { settingsData, setSettingsData } = useSite();
    const headerLogoSrc = isLightHeader ? WEBDEV_LOGO : settingsData?.logo || WEBDEV_LOGO;
    const homeHref = isLightHeader ? webdevHref("/") : "/";
    const navPaths = {
      automation: isLightHeader ? webdevHref("/ai-automation") : "/automation",
      products: isLightHeader ? webdevHref("/products") : "/products",
      industries: isLightHeader ? webdevHref("/industries") : "/industries",
      portfolio: isLightHeader ? webdevHref("/portfolio") : "/portfolio",
      technologies: isLightHeader ? webdevHref("/technologies") : "/technologies",
      ourWorkspace: isLightHeader ? webdevHref("/our-workspace") : "/our-workspace",
      about: isLightHeader ? webdevHref("/about") : "/about",
      middleware: webdevHref("/middleware"),
    };
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [showEnquiryPopup, setShowEnquiryPopup] = useState(false);
    const [headerServices, setHeaderServices] = useState([]);
    const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
    const [isMobileSubmenuOpen, setIsMobileSubmenuOpen] = useState(false);
    const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
    const [isMobileAboutSubmenuOpen, setIsMobileAboutSubmenuOpen] = useState(false);
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
    const [isIndustriesDropdownOpen, setIsIndustriesDropdownOpen] = useState(false);
    const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false);
    const [navigationSource, setNavigationSource] = useState('direct');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dateTimePickerRef = useRef(null);
    
     const [enquiryForm, setEnquiryFrom] = useState({
       name: "",
       email: "",
       phone: "",
       message: "",
       demoDateTime: "",
     });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Track navigation source from sessionStorage
    useEffect(() => {
        const storedSource = sessionStorage.getItem('navigationSource');
        if (storedSource) {
            setNavigationSource(storedSource);
        }
    }, [pathname]);

    // Prevent background scrolling when enquiry popup is open
    useEffect(() => {
        if (showEnquiryPopup) {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
        } else {
            // Restore scrolling
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scrolling when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showEnquiryPopup]);

    // Close dropdown when clicking outside (desktop only)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (window.innerWidth > 1024) {
                if (isServicesDropdownOpen && !event.target.closest('.services-dropdown')) {
                    setIsServicesDropdownOpen(false);
                }
                if (isAboutDropdownOpen && !event.target.closest('.about-dropdown')) {
                    setIsAboutDropdownOpen(false);
                }
                if (isProductsDropdownOpen && !event.target.closest('.products-dropdown')) {
                    setIsProductsDropdownOpen(false);
                }
                if (isIndustriesDropdownOpen && !event.target.closest('.industries-dropdown')) {
                    setIsIndustriesDropdownOpen(false);
                }
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isServicesDropdownOpen, isAboutDropdownOpen, isProductsDropdownOpen, isIndustriesDropdownOpen]);

    // Reset mobile submenu when closing mobile nav
    useEffect(() => {
        if (!isOpenNav) {
            setIsMobileSubmenuOpen(false);
            setIsMobileAboutSubmenuOpen(false);
            setIsMobileProductsOpen(false);
            setIsMobileIndustriesOpen(false);
        }
    }, [isOpenNav]);

    // Fetch header services
    useEffect(() => {
        const fetchHeaderServices = async () => {
            try {
                const response = await axios.get(`${apiBaseUrl}/api/services?showOnHeader=true`);
                if (response.status === 200) {
                    setHeaderServices(response.data.services || []);
                }
            } catch (error) {
                console.error("Error fetching header services:", error);
            }
        };
        
        fetchHeaderServices();
    }, [apiBaseUrl]);

    useEffect(() => {
      async function fetchData() {
        if (!settingsData) {
          try {
            const res = await axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/api/site-settings`
            );
            if (res.status === 200) {
              setSettingsData(res.data.data);
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
      fetchData();
    }, [settingsData, setSettingsData]);

    const handleInputChange = (e) => {
          setEnquiryFrom({
            ...enquiryForm,
            [e.target.name]: e.target.value,
          });
        }

    // Get minimum datetime (current time + 1 hour)
    const getMinDateTime = () => {
        const now = new Date();
        now.setHours(now.getHours() + 1); // Add 1 hour buffer
        return now.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
    };

    // Handle date time picker focus with scroll
    const handleDateTimePickerFocus = () => {
        setTimeout(() => {
            if (dateTimePickerRef.current) {
                dateTimePickerRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 100);
    };

    const handleSubmit = async (e) => {
          e.preventDefault();
          setIsSubmitting(true);
          
          // Basic validation
          if (!enquiryForm.name.trim()) {
            toast.error("Please enter your name");
            setIsSubmitting(false);
            return;
          }
          
          if (!enquiryForm.email.trim()) {
            toast.error("Please enter your email");
            setIsSubmitting(false);
            return;
          }
          
          if (!enquiryForm.phone.trim()) {
            toast.error("Please enter your phone number");
            setIsSubmitting(false);
            return;
          }

          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(enquiryForm.email)) {
            toast.error("Please enter a valid email address");
            setIsSubmitting(false);
            return;
          }

          // Phone validation
          const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
          if (!phoneRegex.test(enquiryForm.phone.replace(/\s+/g, ''))) {
            toast.error("Please enter a valid phone number");
            setIsSubmitting(false);
            return;
          }
          
          try {
            // Prepare data for submission - NO TIMEZONE
            const submissionData = {
              name: enquiryForm.name,
              email: enquiryForm.email,
              phone: enquiryForm.phone,
              message: enquiryForm.message,
              projectName: "General"
            };

            // If datetime is provided, split it into date and time for backend
            if (enquiryForm.demoDateTime) {
              const [datePart, timePart] = enquiryForm.demoDateTime.split('T');
              submissionData.demoDate = datePart;
              submissionData.demoTime = timePart;
            }

            console.log('Submitting data:', submissionData); // Debug log

            const res = await axios.post(`${apiBaseUrl}/api/enquiries`, submissionData);
            
            if (res.status === 201) {
              toast.success(res.data.message || "Enquiry submitted successfully! We'll get back to you soon.");
              setEnquiryFrom({
                name: "",
                email: "",
                phone: "",
                message: "",
                demoDateTime: "",
              });
              setShowEnquiryPopup(false);
            } else {
              toast.error("Failed to submit enquiry. Please try again.");
            }
          } catch (error) {
            console.error("Error submitting enquiry form:", error);
            
            if (error.response?.data?.message) {
              toast.error(error.response.data.message);
            } else if (error.response?.status === 400) {
              toast.error("Invalid form data. Please check your information.");
            } else if (error.response?.status === 500) {
              toast.error("Server error. Please try again later.");
            } else {
              toast.error("Failed to submit enquiry. Please check your connection and try again.");
            }
          } finally {
            setIsSubmitting(false);
          }
    }
    
    // Helper function to check if current service is in AI-Automation dropdown
    const isAiAutomationService = () => {
        if (!pathname.startsWith('/services/')) return false;
        
        const currentSlug = pathname.replace('/services/', '');
        return headerServices.some(service => service.slug === currentSlug);
    };

    const isAboutSectionActive = () => {
        if (isLightHeader) {
            return (
              pathname === navPaths.about ||
              pathname.startsWith(`${navPaths.about}/`) ||
              pathname === webdevHref("/contact")
            );
        }
        return aboutItems.some((link) => {
            if (link.href === '/services') {
                return pathname === '/services' || (pathname.startsWith('/services/') && navigationSource === 'services');
            }
            return pathname === link.href || pathname.startsWith(`${link.href}/`);
        });
    };
    
    // Function to check if current path matches the nav link
    const isActiveLink = (path) => {
        if (path === '/' && pathname === '/') return true;
        if (isLightHeader && path === homeHref && pathname === homeHref) return true;

        if (isLightHeader) {
            if (path === navPaths.automation) {
                return pathname === navPaths.automation || pathname.startsWith(`${navPaths.automation}/`);
            }
            if (path === navPaths.products) {
                return pathname === navPaths.products || pathname.startsWith(`${navPaths.products}/`);
            }
            if (path === navPaths.industries) {
                return pathname === navPaths.industries || pathname.startsWith(`${navPaths.industries}/`);
            }
            if (path === navPaths.about) {
                return isAboutSectionActive();
            }
            if (path !== '/' && path !== homeHref && pathname.startsWith(path)) return true;
            return pathname === path;
        }
        
        // Special handling for services
        if (path === '/services') {
            // Active for main services page OR if navigated from services page to an individual service
            return pathname === '/services' || (pathname.startsWith('/services/') && navigationSource === 'services');
        }
        
        // Special handling for AI-Automation
        if (path === '/automation') {
            // Active only if it's an AI service AND user came from automation dropdown
            return isAiAutomationService() && navigationSource === 'automation';
        }

        // Special handling for About Us dropdown
        if (path === '/about') {
            return isAboutSectionActive();
        }
        
        // Default behavior for other paths
        if (path !== '/' && pathname.startsWith(path)) return true;
        return false;
    };

    // Function to get active link classes
    const getLinkClasses = (path) => {
        const baseClasses = "text-[17px] transition-all duration-300 relative";
        const activeClasses = isLightHeader
            ? "text-teal-600 opacity-100 font-semibold"
            : "text-primary opacity-100 font-semibold";
        const inactiveClasses = isLightHeader
            ? "text-slate-800 opacity-90 hover:opacity-100 hover:text-teal-600"
            : "text-white opacity-90 hover:opacity-100 hover:text-primary";
        
        return `${baseClasses} ${isActiveLink(path) ? activeClasses : inactiveClasses}`;
    };

    const scheduleDemoBtnBase = isLightHeader
        ? "bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 !text-white !rounded-full !shadow-md !shadow-teal-500/25"
        : "bg-gradient-to-r from-[#ff6333] via-[#e15226] to-[#fe9272] !text-white !rounded-md";

    // Handle services dropdown toggle for desktop
    const closeDesktopDropdowns = () => {
        setIsServicesDropdownOpen(false);
        setIsAboutDropdownOpen(false);
        setIsProductsDropdownOpen(false);
        setIsIndustriesDropdownOpen(false);
    };

    const handleServicesClick = (e) => {
        e.preventDefault();
        if (window.innerWidth > 1024) {
            const next = !isServicesDropdownOpen;
            closeDesktopDropdowns();
            setIsServicesDropdownOpen(next);
        } else {
            setIsMobileSubmenuOpen(!isMobileSubmenuOpen);
        }
    };

    const handleAboutClick = (e) => {
        e.preventDefault();
        if (window.innerWidth > 1024) {
            const next = !isAboutDropdownOpen;
            closeDesktopDropdowns();
            setIsAboutDropdownOpen(next);
        } else {
            setIsMobileAboutSubmenuOpen(!isMobileAboutSubmenuOpen);
        }
    };

    const handleProductsClick = (e) => {
        e.preventDefault();
        if (window.innerWidth > 1024) {
            const next = !isProductsDropdownOpen;
            closeDesktopDropdowns();
            setIsProductsDropdownOpen(next);
        } else {
            setIsMobileProductsOpen(!isMobileProductsOpen);
        }
    };

    const handleIndustriesClick = (e) => {
        e.preventDefault();
        if (window.innerWidth > 1024) {
            const next = !isIndustriesDropdownOpen;
            closeDesktopDropdowns();
            setIsIndustriesDropdownOpen(next);
        } else {
            setIsMobileIndustriesOpen(!isMobileIndustriesOpen);
        }
    };

    // Handle mouse events for desktop hover
    const handleMouseEnter = () => {
        if (window.innerWidth > 1024) {
            closeDesktopDropdowns();
            setIsServicesDropdownOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (window.innerWidth > 1024) {
            setIsServicesDropdownOpen(false);
        }
    };

    const handleAboutMouseEnter = () => {
        if (window.innerWidth > 1024) {
            closeDesktopDropdowns();
            setIsAboutDropdownOpen(true);
        }
    };

    const handleAboutMouseLeave = () => {
        if (window.innerWidth > 1024) {
            setIsAboutDropdownOpen(false);
        }
    };

    const handleProductsMouseEnter = () => {
        if (window.innerWidth > 1024) {
            closeDesktopDropdowns();
            setIsProductsDropdownOpen(true);
        }
    };

    const handleProductsMouseLeave = () => {
        if (window.innerWidth > 1024) {
            setIsProductsDropdownOpen(false);
        }
    };

    const handleIndustriesMouseEnter = () => {
        if (window.innerWidth > 1024) {
            closeDesktopDropdowns();
            setIsIndustriesDropdownOpen(true);
        }
    };

    const handleIndustriesMouseLeave = () => {
        if (window.innerWidth > 1024) {
            setIsIndustriesDropdownOpen(false);
        }
    };

    // Handle navigation with source tracking
    const handleNavigation = (href, source) => {
        sessionStorage.setItem('navigationSource', source);
        setNavigationSource(source);
        router.push(href);
        setIsOpenNav(false);
        closeDesktopDropdowns();
        setIsMobileSubmenuOpen(false);
        setIsMobileAboutSubmenuOpen(false);
        setIsMobileProductsOpen(false);
        setIsMobileIndustriesOpen(false);
    };

    return (
 
      
       
      <>
        <header
          className={`theme-site-header site-header w-full h-20 flex items-center justify-center fixed top-0 left-0 z-[100] ${
            isLightHeader
              ? "backdrop-blur-md"
              : isScrolled === true && "scroll"
          }`}
        >
          <div className="container flex items-center justify-between">
            <Link
              href={homeHref}
              className="logo flex items-center shrink-0"
              onClick={() => {
                sessionStorage.removeItem("navigationSource");
                setNavigationSource("direct");
              }}
            >
              <div
                className={`relative ${
                  isLightHeader ? "w-[150px] h-[80px]" : "w-[150px] h-14"
                }`}
              >
                <Image
                  src={headerLogoSrc}
                  alt="logo"
                  fill
                  className={isLightHeader ? "object-contain" : "object-contain object-left"}
                  priority
                />
              </div>
            </Link>

            <HeaderGooeyBubbles className="relative max-lg:contents lg:flex lg:items-center">
            <nav
              className={`flex items-center gap-5 xl:gap-7 fixed top-0 -right-[100%] lg:static flex-col lg:flex-row h-screen lg:h-auto z-[101] opacity-0 lg:opacity-100 pt-20 lg:pt-0 px-6 lg:px-0 w-80 lg:w-auto overflow-y-auto lg:overflow-visible ${
                isLightHeader
                  ? "bg-white lg:bg-transparent"
                  : "bg-[#040416] lg:bg-transparent"
              } ${isOpenNav === true && "opacity-100 right-0"}`}
            >


              {/* AI-Automation Mega Menu - Desktop */}
              <div
                className="services-dropdown relative group hidden lg:block"
                onMouseEnter={isLightHeader ? undefined : handleMouseEnter}
                onMouseLeave={isLightHeader ? undefined : handleMouseLeave}
              >
                <div
                  className={`${getLinkClasses(
                    navPaths.automation
                  )} flex items-center gap-1 cursor-pointer ${
                    isServicesDropdownOpen ? dropdownActiveClass : ""
                  }`}
                  onClick={(e) => {
                    if (isLightHeader) {
                      e.preventDefault();
                      handleNavigation(navPaths.automation, "automation");
                      return;
                    }
                    handleServicesClick(e);
                  }}
                >
                  AI-Automation
                  {!isLightHeader && (
                  <IoChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isServicesDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                  )}
                </div>

                {!isLightHeader && (
                <div
                  className={`absolute top-full left-0 pt-3 z-[120] transition-all duration-300 ${
                    isServicesDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="w-[min(980px,90vw)]">
                    <AutomationMegaPanel
                      services={headerServices}
                      onNavigate={handleNavigation}
                      variant={menuVariant}
                    />
                  </div>
                </div>
                )}
              </div>

              {/* Mobile AI-Automation Menu */}
              <div className="w-full lg:hidden">
                {isLightHeader ? (
                  <Link
                    href={navPaths.automation}
                    className={`${getLinkClasses(
                      navPaths.automation
                    )} flex items-center w-full py-3 border-b border-gray-200`}
                    onClick={() =>
                      handleNavigation(navPaths.automation, "automation")
                    }
                  >
                    AI-Automation
                  </Link>
                ) : (
                  <>
                <div
                  className={`${getLinkClasses(
                    "/automation"
                  )} flex items-center justify-between cursor-pointer w-full py-3 border-b border-gray-700`}
                  onClick={handleServicesClick}
                >
                  <span>AI-Automation</span>
                  <IoChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isMobileSubmenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isMobileSubmenuOpen && (
                  <AutomationMobileMenu
                    services={headerServices}
                    onNavigate={handleNavigation}
                    variant={menuVariant}
                  />
                )}
                  </>
                )}
              </div>

              {/* Products Mega Menu - Desktop */}
              <div
                className="products-dropdown relative group hidden lg:block"
                onMouseEnter={isLightHeader ? undefined : handleProductsMouseEnter}
                onMouseLeave={isLightHeader ? undefined : handleProductsMouseLeave}
              >
                <div
                  className={`${getLinkClasses(
                    navPaths.products
                  )} flex items-center gap-1 cursor-pointer ${
                    isProductsDropdownOpen && !isLightHeader ? dropdownActiveClass : ""
                  }`}
                  onClick={(e) => {
                    if (isLightHeader) {
                      e.preventDefault();
                      handleNavigation(navPaths.products, "products");
                      return;
                    }
                    handleProductsClick(e);
                  }}
                >
                  Products
                  {!isLightHeader && (
                  <IoChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isProductsDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                  )}
                </div>

                {!isLightHeader && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-[35%] pt-3 z-[120] transition-all duration-300 ${
                    isProductsDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="w-[min(1080px,94vw)]">
                    <ProductsMegaPanel
                      onNavigate={handleNavigation}
                      variant={menuVariant}
                    />
                  </div>
                </div>
                )}
              </div>

              {/* Mobile Products Menu */}
              <div className="w-full lg:hidden">
                {isLightHeader ? (
                  <Link
                    href={navPaths.products}
                    className={`${getLinkClasses(
                      navPaths.products
                    )} flex items-center w-full py-3 border-b border-gray-200`}
                    onClick={() => handleNavigation(navPaths.products, "products")}
                  >
                    Products
                  </Link>
                ) : (
                  <>
                <div
                  className={`${getLinkClasses(
                    "/products"
                  )} flex items-center justify-between cursor-pointer w-full py-3 border-b border-gray-700`}
                  onClick={handleProductsClick}
                >
                  <span>Products</span>
                  <IoChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isMobileProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isMobileProductsOpen && (
                  <ProductsMobileMenu
                    onNavigate={handleNavigation}
                    variant={menuVariant}
                  />
                )}
                  </>
                )}
              </div>

              {/* Industries Mega Menu - Desktop */}
              <div
                className="industries-dropdown relative group hidden lg:block"
                onMouseEnter={isLightHeader ? undefined : handleIndustriesMouseEnter}
                onMouseLeave={isLightHeader ? undefined : handleIndustriesMouseLeave}
              >
                <div
                  className={`${getLinkClasses(
                    navPaths.industries
                  )} flex items-center gap-1 cursor-pointer ${
                    isIndustriesDropdownOpen && !isLightHeader ? dropdownActiveClass : ""
                  }`}
                  onClick={(e) => {
                    if (isLightHeader) {
                      e.preventDefault();
                      handleNavigation(navPaths.industries, "industries");
                      return;
                    }
                    handleIndustriesClick(e);
                  }}
                >
                  Industries
                  {!isLightHeader && (
                  <IoChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isIndustriesDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                  )}
                </div>

                {!isLightHeader && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[120] transition-all duration-300 ${
                    isIndustriesDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="w-[min(980px,90vw)]">
                    <IndustriesMegaPanel
                      onNavigate={handleNavigation}
                      variant={menuVariant}
                    />
                  </div>
                </div>
                )}
              </div>

              {/* Mobile Industries Menu */}
              <div className="w-full lg:hidden">
                {isLightHeader ? (
                  <Link
                    href={navPaths.industries}
                    className={`${getLinkClasses(
                      navPaths.industries
                    )} flex items-center w-full py-3 border-b border-gray-200`}
                    onClick={() =>
                      handleNavigation(navPaths.industries, "industries")
                    }
                  >
                    Industries
                  </Link>
                ) : (
                  <>
                <div
                  className={`${getLinkClasses(
                    "/industries"
                  )} flex items-center justify-between cursor-pointer w-full py-3 border-b border-gray-700`}
                  onClick={handleIndustriesClick}
                >
                  <span>Industries</span>
                  <IoChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isMobileIndustriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isMobileIndustriesOpen && (
                  <IndustriesMobileMenu
                    onNavigate={handleNavigation}
                    variant={menuVariant}
                  />
                )}
                  </>
                )}
              </div>

              {isLightHeader && (
                <Link
                  href={navPaths.middleware}
                  className={`${getLinkClasses(
                    navPaths.middleware
                  )} w-full lg:w-auto text-left lg:text-center py-3 lg:py-0 border-b border-gray-200 lg:border-none`}
                  onClick={() => handleNavigation(navPaths.middleware, "direct")}
                >
                  Middleware
                  {isActiveLink(navPaths.middleware) && (
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${activeUnderlineClass} rounded-full hidden lg:block`}></span>
                  )}
                </Link>
              )}

              <Link
                href={navPaths.portfolio}
                className={`${getLinkClasses(
                  navPaths.portfolio
                )} w-full lg:w-auto text-left lg:text-center py-3 lg:py-0 border-b ${isLightHeader ? "border-gray-200" : "border-gray-700"} lg:border-none`}
                onClick={() => handleNavigation(navPaths.portfolio, "direct")}
              >
                Portfolio
                {isActiveLink(navPaths.portfolio) && (
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${activeUnderlineClass} rounded-full hidden lg:block`}></span>
                )}
              </Link>
              <Link
                href={navPaths.technologies}
                className={`${getLinkClasses(
                  navPaths.technologies
                )} w-full lg:w-auto text-left lg:text-center py-3 lg:py-0 border-b ${isLightHeader ? "border-gray-200" : "border-gray-700"} lg:border-none`}
                onClick={() => handleNavigation(navPaths.technologies, "direct")}
              >
                Technologies
                {isActiveLink(navPaths.technologies) && (
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${activeUnderlineClass} rounded-full hidden lg:block`}></span>
                )}
              </Link>
              <Link
                href={navPaths.ourWorkspace}
                className={`${getLinkClasses(
                  navPaths.ourWorkspace
                )} w-full lg:w-auto text-left lg:text-center py-3 lg:py-0 border-b ${isLightHeader ? "border-gray-200" : "border-gray-700"} lg:border-none`}
                onClick={() => handleNavigation(navPaths.ourWorkspace, "direct")}
              >
                Our Workspace
                {isActiveLink(navPaths.ourWorkspace) && (
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 ${activeUnderlineClass} rounded-full hidden lg:block`}></span>
                )}
              </Link>
              {/* About Us Mega Menu - Desktop */}
              <div
                className="about-dropdown relative group hidden lg:block"
                onMouseEnter={isLightHeader ? undefined : handleAboutMouseEnter}
                onMouseLeave={isLightHeader ? undefined : handleAboutMouseLeave}
              >
                <div
                  className={`${getLinkClasses(
                    navPaths.about
                  )} flex items-center gap-1 cursor-pointer ${
                    isAboutDropdownOpen && !isLightHeader ? dropdownActiveClass : ""
                  }`}
                  onClick={(e) => {
                    if (isLightHeader) {
                      e.preventDefault();
                      handleNavigation(navPaths.about, "about");
                      return;
                    }
                    handleAboutClick(e);
                  }}
                >
                  About Us
                  {!isLightHeader && (
                  <IoChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isAboutDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                  )}
                </div>

                {!isLightHeader && (
                <div
                  className={`absolute top-full right-0 pt-3 z-[120] transition-all duration-300 ${
                    isAboutDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="w-[min(820px,90vw)]">
                    <AboutMegaPanel
                      onNavigate={handleNavigation}
                      variant={menuVariant}
                    />
                  </div>
                </div>
                )}
              </div>

              {/* Mobile About Us Menu */}
              <div className="w-full lg:hidden">
                {isLightHeader ? (
                  <Link
                    href={navPaths.about}
                    className={`${getLinkClasses(
                      navPaths.about
                    )} flex items-center w-full py-3 border-b border-gray-200`}
                    onClick={() => handleNavigation(navPaths.about, "about")}
                  >
                    About Us
                  </Link>
                ) : (
                  <>
                <div
                  className={`${getLinkClasses(
                    "/about"
                  )} flex items-center justify-between cursor-pointer w-full py-3 border-b border-gray-700`}
                  onClick={handleAboutClick}
                >
                  <span>About Us</span>
                  <IoChevronDown
                    className={`text-sm transition-transform duration-300 ${
                      isMobileAboutSubmenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isMobileAboutSubmenuOpen && (
                  <AboutMobileMenu
                    onNavigate={handleNavigation}
                    variant={menuVariant}
                  />
                )}
                  </>
                )}
              </div>

            </nav>
            </HeaderGooeyBubbles>

            <div className="flex items-center gap-3 lg:hidden">
              <Button
                className={`${scheduleDemoBtnBase} !px-4 !py-2 !capitalize !font-bold !text-sm`}
                size="small"
                onClick={() => setShowEnquiryPopup(true)}
              >
                Schedule Demo
              </Button>
              <AiOutlineMenu
                size={30}
                className={isLightHeader ? "text-slate-800" : "text-white"}
                onClick={() => setIsOpenNav(true)}
              />
            </div>

            {isOpenNav === true && (
              <div
                className="overlay w-full h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.7)] visible lg:hidden"
                onClick={() => setIsOpenNav(false)}
              ></div>
            )}

            <div className="items-center gap-4 hidden lg:flex">
              <ImWhatsapp
                className="text-green-600 text-3xl cursor-pointer hidden lg:block"
                onClick={sendToWhatsApp}
              />
              <Button
                className={`${scheduleDemoBtnBase} !px-6 !py-2 !capitalize !font-bold !hidden lg:!flex`}
                size="large"
                onClick={() => setShowEnquiryPopup(true)}
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </header>
        {/* Popup Enquiry Form */}
        {showEnquiryPopup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
            <div
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col"
              style={{ overflow: "hidden" }}
            >
              <button
                onClick={() => setShowEnquiryPopup(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors z-10"
              >
                <IoClose />
              </button>

              <div
                className="p-6 flex-1"
                style={{
                  overflowY: "auto",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                css={`
                  &::-webkit-scrollbar {
                    display: none;
                  }
                `}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    Schedule a Demo
                  </h3>
                  <p className="text-black">
                    Book a personalized demo or just leave your details for a
                    consultation
                  </p>
                </div>

                <form className="space-y-4 text-white" onSubmit={handleSubmit}>
                  {/* Basic Information */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleInputChange}
                      value={enquiryForm.name}
                      placeholder="Your Name *"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/10 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <input
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                      value={enquiryForm.email}
                      type="email"
                      placeholder="Email Address *"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/10 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <input
                      id="phone"
                      name="phone"
                      onChange={handleInputChange}
                      value={enquiryForm.phone}
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/10 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder-gray-400"
                    />
                  </div>

                  {/* Demo Scheduling Section */}
                  <div className="relative" ref={dateTimePickerRef}>
                    {/* <label className="block text-sm font-medium text-gray-300 mb-2">
                      Schedule Demo (Optional)
                    </label> */}

                    <ModernDateTimePicker
                      value={enquiryForm.demoDateTime}
                      onChange={handleInputChange}
                      minDateTime={getMinDateTime()}
                      onFocus={handleDateTimePickerFocus}
                    />

                    {/* <p className="text-xs text-gray-500 mt-1">
                      Leave empty if you just want to submit an enquiry
                    </p> */}
                  </div>

                  {/* Message */}
                  <div>
                    <textarea
                      id="message"
                      name="message"
                      onChange={handleInputChange}
                      value={enquiryForm.message}
                      placeholder="Tell us about your requirements or questions..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800/10 focus:ring-2 focus:ring-blue-500 outline-none text-black placeholder-gray-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${scheduleDemoBtnBase} !px-6 !py-3 !capitalize !font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : enquiryForm.demoDateTime ? (
                      "Schedule Demo"
                    ) : (
                      "Send Enquiry"
                    )}
                  </Button>

                  {/* Info Text */}
                  <p className="text-xs text-gray-400 text-center mt-2">
                    * Required fields. We&apos;ll contact you within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        )}
      </>
      
     
    );
}

export default Header