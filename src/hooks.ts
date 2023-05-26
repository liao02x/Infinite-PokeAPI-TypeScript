import { useState, useEffect, useCallback, useRef } from "react";

type InfiniteLoadingArgs<T> = {
  loadItems: (page: number) => Promise<any>;
  getItemsData: (data: any) => T[];
  getHasMore: (data: any) => boolean;
};

export const useInfiniteLoading = <T>({
  loadItems,
  getItemsData,
  getHasMore,
}: InfiniteLoadingArgs<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const pageToLoad = useRef(0);

  const load = async (page: number) => {
    const data = await loadItems(page);
    setHasMore(getHasMore(data));
    setItems((prevItems) => {
      return [...prevItems, ...getItemsData(data)];
    });
  };

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) {
      return;
    }
    setIsLoading(true);
    load(pageToLoad.current).then(() => {
      pageToLoad.current += 1;
      setIsLoading(false);
    });
  }, [isLoading, hasMore]);

  return {
    items,
    hasMore,
    loadMore,
    isLoading,
  };
};

type InViewportArgs = {
  target: React.RefObject<Element>;
  options?: IntersectionObserverInit;
};

export const useInViewport = ({
  target,
  options = {},
}: InViewportArgs) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current?.disconnect();

    if (target.current) {
      const _observer = new IntersectionObserver((entries) => {
        setIsInViewport(entries[0].isIntersecting);
      }, options);
      _observer.observe(target.current);
      observer.current = _observer;
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [target.current, options.root, options.rootMargin, options.threshold]);

  return isInViewport;
}
