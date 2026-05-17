"use client";

import Lottie from "lottie-react";
import loaderAnimation from "@/public/animations/loader.json";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.container}>
      <div className={css["animation-wrapper"]}>
        <Lottie animationData={loaderAnimation} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

export default Loader;
