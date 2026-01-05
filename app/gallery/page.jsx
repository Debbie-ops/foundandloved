"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { ChevronLeft, ChevronRight, X, Heart, Download, Share2 } from "lucide-react"

const BLOG_POSTS = [
  {
    title: "Joy, Everyday",
    date: "May 12, 2025",
    category: "Community",
    excerpt:
      "How steady routines, counseling, and school support are helping children rebuild confidence in and out of the classroom.",
    image: "/DSC02562.jpg",
  },
  {
    title: "Mentors in Motion",
    date: "Sep 09, 2025",
    category: "Volunteer",
    excerpt:
      "Local volunteers and board members actively support daily life at the home and nearby school offering mentorship, academic guidance, and practical life skills through consistent, hands-on engagement.", 
    image: "/volunteer3.jpg",
  },
  {
  title: "A Restful Night, Made Possible",
  date: "Dec 21, 2025",
  category: "Stories",
  excerpt:
    "Thanks to a generous donation of bunk beds and mattresses, the children at Found and Loved Safe Home now enjoy a safer, more comfortable place to rest.",
  image: "/bed1.jpeg",
},

]

const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  //{ id: "daily", label: "Daily Life" },
  { id: "events", label: "Events" },
  { id: "volunteers", label: "Volunteers" },
  { id: "learning", label: "Learning" },
  { id: "community", label: "Community" },
]

const GALLERY_ITEMS = [
  { 
    id: 1,
    title: "Classroom Learning", 
    image: "/classroom1.jpg", 
    category: "learning",
    description: ""
  },
  { 
    id: 2,
    title: "Classroom Learning", 
    image: "/classroom2.jpg", 
    category: "learning",
    description: ""
  },
  { 
    id: 3,
    title: "Infrustructure Development", 
    image: "/infrustructure1.jpg", 
    category: "learning",
    description: ""
  },
  { 
    id: 4,
    title: "Infrustructure Development", 
    image: "/infrustructure2.jpg", 
    category: "learning",
    description: ""
  },
  { 
    id: 5,
    title: "Infrustructure Development", 
    image: "/infrustructure3.jpg", 
    category: "learning",
    description: ""
  },
  { 
    id: 6,
    title: "Community", 
    image: "/volunteer2.jpg", 
    category: "community",
    description: ""
  },
  { 
    id: 7,
    title: "Community", 
    image: "/volunteer5.jpg", 
    category: "community",
    description: ""
  },
  /*{ 
    id: 8,
    title: "Group Activities", 
    image: "/DSC02566.jpg", 
    category: "community",
    description: "Team-building activities that strengthen relationships"
  },
  { 
    id: 9,
    title: "Study Sessions", 
    image: "/test.jpg", 
    category: "learning",
    description: "Focused study sessions with tutor support"
  },
  { 
    id: 10,
    title: "Art Projects", 
    image: "/DSC02562.jpg", 
    category: "learning",
    description: "Creative art projects that encourage self-expression"
  },
  { 
    id: 11,
    title: "Outdoor Play", 
    image: "/DSC02566.jpg", 
    category: "daily",
    description: "Outdoor activities promoting physical fitness and fun"
  },
  { 
    id: 12,
    title: "Team Meetings", 
    image: "/test.jpg", 
    category: "volunteers",
    description: "Regular team meetings to coordinate care and activities"
  },*/
]

export default function GalleryPage() {
  const router = useRouter()
  const galleryRef = useRef(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showHeaderBackground, setShowHeaderBackground] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom
        setShowHeaderBackground(heroBottom <= 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Prevent body scrolling when modal is open
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const handleNavigate = (sectionId) => {
    router.push(`/#${sectionId}`)
  }

  const handleImageClick = (image) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedImage(null), 300)
  }

  const navigateImage = (direction) => {
    if (!selectedImage) return
    
    const filteredItems = selectedCategory === "all" 
      ? GALLERY_ITEMS 
      : GALLERY_ITEMS.filter(item => item.category === selectedCategory)
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id)
    let nextIndex
    
    if (direction === 'next') {
      nextIndex = currentIndex + 1
      if (nextIndex >= filteredItems.length) nextIndex = 0
    } else {
      nextIndex = currentIndex - 1
      if (nextIndex < 0) nextIndex = filteredItems.length - 1
    }
    
    setSelectedImage(filteredItems[nextIndex])
  }

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 400
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const filteredGalleryItems = selectedCategory === "all" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory)

  return (
    <div className="bg-white text-foreground">
      <Header 
        activeSection="gallery" 
        onNavigate={handleNavigate}
        forceTransparent={!showHeaderBackground}
      />

      <main>
        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[90vh] flex items-center"
        >
          <div className="absolute inset-0">
            <Image
              src="/volunteer1.jpg"
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 max-w-4xl mx-auto text-center text-white w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <span className="text-sm uppercase tracking-wide">Blog + Gallery</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Stories, Moments, and the Work That Moves Us Forward
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-10 max-w-3xl mx-auto">
              Explore recent updates, volunteer highlights, and snapshots of events at Found and Loved Safe Home.
            </p>
            {/*<div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="px-8 py-4 bg-white text-foreground rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 transform"
              >
                Join the Volunteer Team
              </Link>
              <Link
                href="/#mission"
                className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 transform"
              >
                Learn About Our Mission
              </Link>
            </div>*/}
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <p className="text-sm font-semibold text-primary mb-3">Latest Stories</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">From Our Blog</h2>
              <p className="text-foreground/70">
                
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.title}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                >
                  <div className="relative h-48">
                    <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wide text-foreground/50 mb-2">
                      {post.category} · {post.date}
                    </p>
                    <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                    <p className="text-foreground/70 mb-6">{post.excerpt}</p>
                    <span className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                      Full story coming soon →
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section with Tabs */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-8">
              <p className="text-sm font-semibold text-primary mb-3">Gallery</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Life at the Home</h2>
              <p className="text-foreground/70">
                A glimpse into daily routines, shared milestones, and the community built with care.
                
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-wrap gap-2 md:gap-4">
                {GALLERY_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-primary text-white shadow-lg"
                        : "bg-muted text-foreground/70 hover:bg-muted/80"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              
              {/* Scroll Controls */}
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => scrollGallery('left')}
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scrollGallery('right')}
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Gallery with Horizontal Scroll */}
            <div 
              ref={galleryRef}
              className="relative overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="flex gap-6" style={{ minWidth: 'min-content' }}>
                {filteredGalleryItems.map((item) => (
                  <button
                    key={`${item.title}-${item.category}`}
                    onClick={() => handleImageClick(item)}
                    className="group flex-shrink-0 w-72 md:w-80 lg:w-96 overflow-hidden rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`View ${item.title}`}
                  >
                    <div className="relative h-64 md:h-72">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="inline-flex px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-2">
                          <span className="text-xs text-white font-medium">
                            {GALLERY_CATEGORIES.find(cat => cat.id === item.category)?.label}
                          </span>
                        </div>
                        <p className="text-white text-lg font-semibold">{item.title}</p>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="md:hidden text-center mt-6">
              <p className="text-sm text-foreground/60">
                ← Scroll horizontally to view more images →
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Image Modal/Popup */}
      {isModalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />
          
          {/* Modal Container */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="fixed top-4 right-4 md:top-8 md:right-8 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="hidden md:flex absolute left-8 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <button
              onClick={() => navigateImage('next')}
              className="hidden md:flex absolute right-8 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed bottom-8 left-0 right-0 flex justify-center gap-8 z-50">
              <button
                onClick={() => navigateImage('prev')}
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigateImage('next')}
                className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Image Container */}
            <div className="relative w-full max-w-6xl mx-auto">
              {/* Image */}
              <div className="relative w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {/* Image Info */}
              <div className="mt-6 md:mt-8 text-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                      <span className="text-sm text-white font-medium">
                        {GALLERY_CATEGORIES.find(cat => cat.id === selectedImage.category)?.label}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{selectedImage.title}</h3>
                    <p className="text-white/80">{selectedImage.description}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  {/*<div className="flex gap-3">
                    <button 
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Like"
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Share"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      aria-label="Download"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>*/}
                </div>
                
                {/* Image Counter */}
                <div className="mt-6 text-center text-white/60">
                  {(() => {
                    const filteredItems = selectedCategory === "all" 
                      ? GALLERY_ITEMS 
                      : GALLERY_ITEMS.filter(item => item.category === selectedCategory)
                    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id) + 1
                    return `${currentIndex} of ${filteredItems.length}`
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Smooth modal animation */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-backdrop {
          animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}