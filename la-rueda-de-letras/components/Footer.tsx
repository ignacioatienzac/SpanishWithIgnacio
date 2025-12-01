import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="site-footer">
            <div className="site-footer__content">
                <div className="site-footer__section site-footer__section--contact">
                    <p className="site-footer__contact">
                        Para colaboraciones o reportar errores, escríbeme a <br/>
                        <a className="site-footer__contact-link" href="mailto:spanishwithignacio@gmail.com">spanishwithignacio@gmail.com</a>.
                    </p>
                </div>
                
                <div className="site-footer__section site-footer__section--brand">
                    <p className="site-footer__brand">Spanish with Ignacio</p>
                </div>
                
                <div className="site-footer__section site-footer__section--social" aria-label="Redes sociales">
                    <a className="site-footer__social-link" href="https://www.instagram.com/spanishwithignacio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        {/* Instagram Icon SVG */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>
                    <a className="site-footer__social-link" href="https://www.youtube.com/@SpanishwithIgnacio" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        {/* YouTube Icon SVG */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
                            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                        </svg>
                    </a>
                    <a className="site-footer__social-link" href="https://www.facebook.com/people/Spanish-With-Ignacio/61560429119394/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                         {/* Facebook Icon SVG */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                    </a>
                    <a className="site-footer__social-link" href="https://www.threads.com/@spanishwithignacio?igshid=NTc4MTIwNjQ2YQ==" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                        {/* Threads/At Icon SVG */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;