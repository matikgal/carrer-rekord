import { useState, useCallback } from 'react';

export function useAccordion(initialIndex: number | null = null) {
    const [activeIndex, setActiveIndex] = useState<number | null>(initialIndex);

    const toggle = useCallback((index: number) => {
        setActiveIndex(prev => prev === index ? null : index);
    }, []);

    const isOpen = useCallback((index: number) => activeIndex === index, [activeIndex]);

    return { activeIndex, toggle, isOpen };
}
