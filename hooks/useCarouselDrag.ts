import { useState, useEffect, RefObject } from 'react';

export function useCarouselDrag(ref: RefObject<HTMLDivElement | null>, dependency?: any) {
    const [dragConstraint, setDragConstraint] = useState(0);

    useEffect(() => {
        const updateConstraints = () => {
            if (ref.current) {
                setDragConstraint(ref.current.scrollWidth - ref.current.offsetWidth);
            }
        };

        // Measure immediately
        updateConstraints();

        // Measure on resize
        window.addEventListener('resize', updateConstraints);
        
        // Measure after a slight delay to ensure layout is stable (framer motion entrance)
        const timeout = setTimeout(updateConstraints, 500);

        return () => {
            window.removeEventListener('resize', updateConstraints);
            clearTimeout(timeout);
        };
    }, [ref, dependency]);

    return dragConstraint;
}
