import { Metric } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: (metric: Metric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFID, onLCP, onINP, onTTFB }) => {
      onCLS(onPerfEntry);
      onFID(onPerfEntry);
      onLCP(onPerfEntry);
      onINP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
