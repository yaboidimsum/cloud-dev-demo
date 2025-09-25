import cardPopHover from "./card-pop-hover.module.css";

export default function CardPopHover() {
  return (
    <a href="#" className={`${cardPopHover.card}`}>
      <h1 className="pt-2 font-medium text-zinc-800">Hover Me!</h1>
      <div className={`${cardPopHover.cardDescription}`}>
        <h3 className={`${cardPopHover.cardTitle}`}>Project Title</h3>
        <p className={`${cardPopHover.cardSubtitle}`}>Hire me please!</p>
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          className={`${cardPopHover.cardIcon}`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.33333 0.4375C6.33333 0.195877 6.52922 0 6.77083 0H10.5625C10.8041 0 11 0.195877 11 0.4375V4.22917C11 4.47078 10.8041 4.66667 10.5625 4.66667C10.3209 4.66667 10.125 4.47078 10.125 4.22917V1.49372L7.08017 4.53851C6.90932 4.70937 6.63235 4.70937 6.46149 4.53851C6.29063 4.36765 6.29063 4.09068 6.46149 3.91981L9.50626 0.875H6.77083C6.52922 0.875 6.33333 0.679122 6.33333 0.4375ZM0.5 6.27083C0.5 6.02922 0.695877 5.83333 0.9375 5.83333C1.17912 5.83333 1.375 6.02922 1.375 6.27083V9.00626L4.41981 5.96149C4.59068 5.79063 4.86765 5.79063 5.03851 5.96149C5.20937 6.13235 5.20937 6.40932 5.03851 6.58017L1.99372 9.625H4.72917C4.97078 9.625 5.16667 9.82088 5.16667 10.0625C5.16667 10.3041 4.97078 10.5 4.72917 10.5H0.9375C0.695877 10.5 0.5 10.3041 0.5 10.0625V6.27083Z"
            fill="#58585F"
          />
        </svg>
      </div>
    </a>
  );
}
