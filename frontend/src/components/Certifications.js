import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { certifications } from '../data';

const Certifications = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);
  const sectionRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Define functions first
  const handlePrev = React.useCallback(() => {
    if (isAnimating || certifications.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => 
      prev === 0 ? certifications.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const handleNext = React.useCallback(() => {
    if (isAnimating || certifications.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => 
      prev === certifications.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const closeModal = React.useCallback(() => {
    setSelectedImage(null);
    setSelectedCert(null);
    document.body.style.overflow = 'auto';
  }, []);

  const openModal = React.useCallback((cert) => {
    setSelectedImage(cert.image);
    setSelectedCert(cert);
    document.body.style.overflow = 'hidden';
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (certifications.length <= 1) return;
    
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (!isAnimating) {
          handleNext();
        }
      }, 5000);
    };

    startAutoPlay();

    const section = sectionRef.current;
    if (section) {
      const pauseAutoPlay = () => clearInterval(autoPlayRef.current);
      const resumeAutoPlay = () => {
        clearInterval(autoPlayRef.current);
        startAutoPlay();
      };
      section.addEventListener('mouseenter', pauseAutoPlay);
      section.addEventListener('mouseleave', resumeAutoPlay);
      return () => {
        section.removeEventListener('mouseenter', pauseAutoPlay);
        section.removeEventListener('mouseleave', resumeAutoPlay);
        clearInterval(autoPlayRef.current);
      };
    }

    return () => clearInterval(autoPlayRef.current);
  }, [isAnimating, handleNext]);

  // Keyboard events
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
      if (e.key === 'ArrowLeft' && !isAnimating) {
        handlePrev();
      }
      if (e.key === 'ArrowRight' && !isAnimating) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isAnimating, handlePrev, handleNext, closeModal]);

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex || certifications.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="cert-section" ref={sectionRef}>
      <div className="cert-container">
        <h2 className="cert-title">Certifications</h2>
        
        <div className="cert-slider-wrapper">
          {certifications.length > 1 && (
            <button 
              className="cert-slider-btn cert-prev-btn" 
              onClick={handlePrev}
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <div className="cert-slider-track">
            {certifications.map((cert, index) => (
              <div 
                key={cert.id}
                className={`cert-slide ${index === currentIndex ? 'cert-active' : ''}`}
                style={{ 
                  transform: `translateX(${(index - currentIndex) * 100}%)`,
                  opacity: index === currentIndex ? 1 : 0,
                  pointerEvents: index === currentIndex ? 'auto' : 'none'
                }}
              >
                <div className="cert-card">
                  <div 
                    className="cert-image-wrapper"
                    onClick={() => openModal(cert)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openModal(cert)}
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.name} 
                      className="cert-image" 
                      loading="lazy"
                    />
                    <div className="cert-image-overlay">
                      <div className="cert-overlay-content">
                        <Maximize2 size={28} />
                        <span>View Full</span>
                      </div>
                    </div>
                  </div>
                  <div className="cert-info">
                    <h3>{cert.name}</h3>
                    <p className="cert-issuer">{cert.issuer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {certifications.length > 1 && (
            <button 
              className="cert-slider-btn cert-next-btn" 
              onClick={handleNext}
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {certifications.length > 1 && (
          <div className="cert-dots">
            {certifications.map((_, index) => (
              <button
                key={index}
                className={`cert-dot ${index === currentIndex ? 'cert-dot-active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="cert-modal-overlay" onClick={closeModal}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={closeModal} aria-label="Close">
              <X size={24} />
            </button>
            <div className="cert-modal-image-container">
              <img 
                src={selectedImage} 
                alt={selectedCert?.name || 'Certificate'} 
                className="cert-modal-image" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .cert-section {
          padding: 6rem 2rem;
          background: var(--bg-primary, #0a0e1a);
          min-height: 100vh;
        }

        .cert-container {
          max-width: 1000px;
          margin: 0 auto;
        }

        .cert-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #22d3ee;
          text-align: center;
          margin-bottom: 3rem;
          position: relative;
          display: inline-block;
          width: 100%;
        }

        .cert-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }

        .cert-slider-wrapper {
          position: relative;
          padding: 0 40px;
        }

        .cert-slider-track {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 16px;
        }

        .cert-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cert-slide.cert-active {
          position: relative;
          height: auto;
        }

        .cert-slide:not(.cert-active) {
          position: absolute;
          height: 100%;
        }

        .cert-card {
          width: 100%;
          max-width: 550px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.4s ease;
        }

        .cert-card:hover {
          transform: translateY(-4px);
          border-color: rgba(6, 182, 212, 0.2);
          box-shadow: 0 8px 30px rgba(6, 182, 212, 0.06);
        }

        .cert-image-wrapper {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.1);
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          min-height: 280px;
          max-height: 450px;
        }

        .cert-image {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 400px;
          object-fit: contain;
          display: block;
          transition: transform 0.4s ease;
          border-radius: 4px;
        }

        .cert-card:hover .cert-image {
          transform: scale(1.02);
        }

        .cert-image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s ease;
          backdrop-filter: blur(4px);
        }

        .cert-image-wrapper:hover .cert-image-overlay {
          opacity: 1;
        }

        .cert-overlay-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: #fff;
          transform: translateY(10px);
          transition: transform 0.4s ease;
        }

        .cert-image-wrapper:hover .cert-overlay-content {
          transform: translateY(0);
        }

        .cert-overlay-content span {
          font-size: 0.8rem;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.08);
          padding: 0.3rem 1.2rem;
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .cert-info {
          padding: 1.25rem 1.5rem;
        }

        .cert-info h3 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary, #f0f4f8);
          margin: 0 0 0.1rem 0;
        }

        .cert-issuer {
          color: var(--text-secondary, #94a3b8);
          font-size: 0.85rem;
          margin: 0;
        }

        .cert-slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary, #f0f4f8);
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
          backdrop-filter: blur(12px);
        }

        .cert-slider-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(6, 182, 212, 0.3);
        }

        .cert-prev-btn {
          left: 0;
        }

        .cert-next-btn {
          right: 0;
        }

        .cert-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
        }

        .cert-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .cert-dot:hover {
          background: rgba(255, 255, 255, 0.25);
        }

        .cert-dot-active {
          background: linear-gradient(135deg, #22d3ee, #3b82f6);
          width: 28px;
          border-radius: 4px;
        }

        .cert-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(24px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 2rem;
          animation: certModalFadeIn 0.3s ease;
        }

        @keyframes certModalFadeIn {
          from { opacity: 0; backdrop-filter: blur(0); }
          to { opacity: 1; backdrop-filter: blur(24px); }
        }

        @keyframes certModalZoomIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }

        .cert-modal-content {
          position: relative;
          max-width: 95vw;
          max-height: 95vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: certModalZoomIn 0.35s ease;
        }

        .cert-modal-close {
          position: absolute;
          top: -48px;
          right: 0;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 50%;
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .cert-modal-close:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: rotate(90deg);
        }

        .cert-modal-image-container {
          max-width: 100%;
          max-height: 85vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .cert-modal-image {
          max-width: 100%;
          max-height: 85vh;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 768px) {
          .cert-section {
            padding: 4rem 1rem;
          }

          .cert-title {
            font-size: 2rem;
          }

          .cert-title::after {
            width: 60px;
            bottom: -8px;
          }

          .cert-slider-wrapper {
            padding: 0 30px;
          }

          .cert-image-wrapper {
            min-height: 200px;
            max-height: 320px;
            padding: 1rem;
          }

          .cert-image {
            max-height: 280px;
          }

          .cert-info {
            padding: 1rem 1.25rem;
          }

          .cert-info h3 {
            font-size: 0.95rem;
          }

          .cert-slider-btn {
            width: 34px;
            height: 34px;
          }

          .cert-slider-btn svg {
            width: 18px;
            height: 18px;
          }

          .cert-modal-overlay {
            padding: 1rem;
          }

          .cert-modal-close {
            top: -40px;
            width: 34px;
            height: 34px;
          }

          .cert-modal-close svg {
            width: 18px;
            height: 18px;
          }

          .cert-modal-image {
            max-height: 75vh;
          }
        }

        @media (max-width: 480px) {
          .cert-section {
            padding: 3rem 0.75rem;
          }

          .cert-title {
            font-size: 1.6rem;
          }

          .cert-title::after {
            width: 50px;
            bottom: -6px;
            height: 3px;
          }

          .cert-slider-wrapper {
            padding: 0 20px;
          }

          .cert-image-wrapper {
            min-height: 160px;
            max-height: 260px;
            padding: 0.75rem;
          }

          .cert-image {
            max-height: 220px;
          }

          .cert-info {
            padding: 0.75rem 1rem;
          }

          .cert-info h3 {
            font-size: 0.85rem;
          }

          .cert-issuer {
            font-size: 0.75rem;
          }

          .cert-slider-btn {
            width: 28px;
            height: 28px;
          }

          .cert-slider-btn svg {
            width: 16px;
            height: 16px;
          }

          .cert-modal-overlay {
            padding: 0.75rem;
          }

          .cert-modal-close {
            top: -32px;
            width: 30px;
            height: 30px;
          }

          .cert-modal-close svg {
            width: 16px;
            height: 16px;
          }

          .cert-modal-image {
            max-height: 65vh;
          }

          .cert-dot {
            width: 6px;
            height: 6px;
          }

          .cert-dot-active {
            width: 20px;
          }
        }

        @media (prefers-color-scheme: light) {
          .cert-section {
            background: var(--bg-primary, #f8fafc);
          }

          .cert-card {
            background: rgba(255, 255, 255, 0.8);
            border-color: rgba(0, 0, 0, 0.04);
          }

          .cert-card:hover {
            border-color: rgba(6, 182, 212, 0.2);
          }

          .cert-title {
            color: #0f172a;
          }

          .cert-title::after {
            background: linear-gradient(90deg, #22d3ee, #3b82f6, #8b5cf6);
          }

          .cert-info h3 {
            color: #0f172a;
          }

          .cert-slider-btn {
            background: rgba(0, 0, 0, 0.03);
            border-color: rgba(0, 0, 0, 0.04);
            color: #0f172a;
          }

          .cert-slider-btn:hover {
            background: rgba(6, 182, 212, 0.06);
            border-color: rgba(6, 182, 212, 0.2);
          }

          .cert-dot {
            background: rgba(0, 0, 0, 0.08);
          }

          .cert-dot:hover {
            background: rgba(0, 0, 0, 0.15);
          }

          .cert-modal-overlay {
            background: rgba(255, 255, 255, 0.92);
            backdrop-filter: blur(24px);
          }

          .cert-modal-close {
            background: rgba(0, 0, 0, 0.03);
            border-color: rgba(0, 0, 0, 0.04);
            color: #0f172a;
          }

          .cert-modal-close:hover {
            background: rgba(0, 0, 0, 0.06);
          }

          .cert-modal-image {
            box-shadow: 0 24px 80px rgba(0, 0, 0, 0.08);
          }
        }
      `}</style>
    </section>
  );
};

export default Certifications;