import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setProgress(100);
    setTimeout(() => {
      setProgress(0);
    }, 500);
  }, [router.asPath]);

  return (
    <div className="process-bar-container">
      <motion.div
        className="process-bar"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

export default ProgressBar;
