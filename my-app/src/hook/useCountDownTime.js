import {useEffect, useState} from "react";

const useCountDownTimer = (totalTime, onTimeout) => {
  const [time, setTime] = useState(totalTime)

  const [percentRemaining, setPercentRemaining] = useState(() => {
    return (time/totalTime) * 100;
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if(time === 0){
        setPercentRemaining(0);
        clearTimeout(timer);
        onTimeout();
      }else {
        setTime(time - 1);
        setPercentRemaining((time/totalTime)*100)
      }
    }, 1000);
    return () => {
      clearTimeout(timer)
    }
  }, [time]);

  return [time, percentRemaining]

}

export default useCountDownTimer