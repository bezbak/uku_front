import { gsap } from "gsap/dist/gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {isBrowser} from "./utils";

if (isBrowser()) {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

let scroll = null;

const setScrollTriggerScroller = (element) => {
  ScrollTrigger.defaults({
    scroller: element,
  });
};

const getScrollTriggerById = (scrollTriggerId) => {
  return ScrollTrigger.getById(scrollTriggerId)
};

const refreshScrollTrigger = (props) => {
  ScrollTrigger.refresh(props);
};

const updateScrollTrigger = (props) => {
  ScrollTrigger.update(props);
};

const setScrollTriggerProxy = (viewport, bodyScrollBar) => {
  ScrollTrigger.scrollerProxy(viewport, {
    scrollTop(value) {
      if (arguments.length) {
        bodyScrollBar.scrollTop = value;
      }
      return bodyScrollBar.scrollTop;
    }
  });

  scroll = bodyScrollBar;
};

const getTotalHeight = () => {
  return scroll.getSize();
}

const addScrollListener = (callback) => {
  scroll.addListener(callback);
}

const removeScrollListener = (callback) => {
  scroll.removeListener(callback);
}

const scrollToTop = (time = 3000) => {
  scroll.scrollTo(0, 0, time);
};

const scrollTo = (target) => {
  scroll.scrollIntoView(target);
};

const destroyScroll = () => {
  scroll.destroy();
};

const stopScroll = () => {
  scroll.updatePluginOptions('blockScroll', { block: true });
}

const startScroll = () => {
  scroll.updatePluginOptions('blockScroll', { block: false });
}

const getScrollPosition = () => {
  return scroll.scrollTop;
}

const setScrollPosition = (position) => {
  if (position) {
    scroll.scrollTop = position;
  }
}


export {
  gsap,
  ScrollTrigger,
  refreshScrollTrigger,
  updateScrollTrigger,
  setScrollTriggerProxy,
  setScrollTriggerScroller,
  getScrollTriggerById,
  addScrollListener,
  removeScrollListener,
  scrollToTop,
  scrollTo,
  stopScroll,
  startScroll,
  destroyScroll,
  getScrollPosition,
  setScrollPosition,
  getTotalHeight
};
