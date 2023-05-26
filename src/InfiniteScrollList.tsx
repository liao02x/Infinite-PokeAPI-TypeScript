import { useEffect, useRef, type RefObject } from "react";
import { useInViewport } from "./hooks";

type Props = {
  items: any[];
  getKey: (item: any) => string;
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  renderItem: (item: any) => JSX.Element | string;
};

export default function InfiniteScrollList({
  items,
  getKey,
  loadMore,
  hasMore,
  isLoading,
  renderItem,
}: Props) {
  const rootRef = useRef<Element>(null);
  return (
    <div className="list" ref={rootRef as RefObject<HTMLDivElement>}>
      <ul>
        {items.map((item) => (
          <li key={getKey(item)}>{renderItem(item)}</li>
        ))}
        {hasMore && (
          <div>
            {isLoading ? "Loading..." : "Load more"}
            <InViewportObserver root={rootRef} onEnterViewport={loadMore} />
          </div>
        )}
      </ul>
    </div>
  );
}

const InViewportObserver = ({
  root,
  onEnterViewport,
}: {
  root: RefObject<Element>;
  onEnterViewport: () => void;
}) => {
  const ref = useRef<Element>(null);
  const isInViewport = useInViewport({
    target: ref,
    options: { root: root.current },
  });

  useEffect(() => {
    if (isInViewport) {
      onEnterViewport();
    }
  }, [isInViewport, onEnterViewport]);

  return <div ref={ref as RefObject<HTMLDivElement>} />;
};
