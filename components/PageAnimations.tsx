'use client';

import { useEffect } from 'react';

export default function PageAnimations() {
  useEffect(() => {
    const page = document.getElementById('portfolio-page');
    if (!page) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = new Set<Animation>();
    const stop = () => {
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };

    const enter = () => {
      stop();
      if (motion.matches) return;

      // Animate content only; the gradient already has its own intro and frame loop.
      const elements = page.querySelectorAll<HTMLElement>(
        ':scope > div > span, :scope > div > button, section h1, section h3, section p, nav a'
      );
      elements.forEach((element, index) => {
        const animation = element.animate(
          [
            { opacity: 0, transform: 'translate3d(0, 12px, 0)' },
            { opacity: 1, transform: 'translate3d(0, 0, 0)' }
          ],
          {
            duration: 650,
            delay: 80 + index * 65,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'backwards'
          }
        );
        animations.add(animation);
        animation.onfinish = () => {
          animation.cancel();
          animations.delete(animation);
        };
      });
    };

    enter();
    motion.addEventListener('change', enter);
    return () => {
      motion.removeEventListener('change', enter);
      stop();
    };
  }, []);

  return null;
}
