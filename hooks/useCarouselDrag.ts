import { useState, useEffect, RefObject } from 'react';

export function useCarouselDrag(ref: RefObject<HTMLDivElement | null>) {
    const [dragConstraint, setDragConstraint] = useState(0);

    useEffect(() => {
        if (ref.current) {
            setDragConstraint(ref.current.scrollWidth - ref.current.offsetWidth);
        }
    }, [ref]);

    return dragConstraint;
}
