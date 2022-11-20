import styles from '../../components/DashboardRoom/DashboardRoom.module.scss';

const AirConditionerOutlined = ({ title }: { title: string }) => (
  <span className={styles.featureCustomIcon} role="img" title={title}>
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 122.88 122.07"
    >
      <path
        className="cls-1"
        d="M67.29,82.9c-.11,1.3-.26,2.6-.47,3.9-1.43,9-5.79,14.34-8.08,22.17C56,118.45,65.32,122.53,73.27,122A37.63,37.63,0,0,0,85,119a45,45,0,0,0,9.32-5.36c20.11-14.8,16-34.9-6.11-46.36a15,15,0,0,0-4.14-1.4,22,22,0,0,1-6,11.07l0,0A22.09,22.09,0,0,1,67.29,82.9ZM62.4,44.22a17.1,17.1,0,1,1-17.1,17.1,17.1,17.1,0,0,1,17.1-17.1ZM84.06,56.83c1.26.05,2.53.14,3.79.29,9.06,1,14.58,5.16,22.5,7.1,9.6,2.35,13.27-7.17,12.41-15.09a37.37,37.37,0,0,0-3.55-11.57,45.35,45.35,0,0,0-5.76-9.08C97.77,9,77.88,14,67.4,36.63a14.14,14.14,0,0,0-1,2.94A22,22,0,0,1,78,45.68l0,0a22.07,22.07,0,0,1,6,11.13Zm-26.9-17c0-1.6.13-3.21.31-4.81,1-9.07,5.12-14.6,7-22.52C66.86,2.89,57.32-.75,49.41.13A37.4,37.4,0,0,0,37.84,3.7a44.58,44.58,0,0,0-9.06,5.78C9.37,25.2,14.39,45.08,37,55.51a14.63,14.63,0,0,0,3.76,1.14A22.12,22.12,0,0,1,57.16,39.83ZM40.66,65.42a52.11,52.11,0,0,1-5.72-.24c-9.08-.88-14.67-4.92-22.62-6.73C2.68,56.25-.83,65.84.16,73.74A37.45,37.45,0,0,0,3.9,85.25a45.06,45.06,0,0,0,5.91,9c16,19.17,35.8,13.87,45.91-8.91a15.93,15.93,0,0,0,.88-2.66A22.15,22.15,0,0,1,40.66,65.42Z"
      />
    </svg>
  </span>
);

export default AirConditionerOutlined;