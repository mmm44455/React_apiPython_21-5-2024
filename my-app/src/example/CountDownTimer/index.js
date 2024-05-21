import useCountDownTimer from "../../hook/useCountDownTime";

const CountDownTimer = () => {
  const [time, percent] = useCountDownTimer(90, () => {
    alert('Hết giờ')
  })

  return (
      <>
        <h3>{time}</h3>
        <h3>Percent: {percent}</h3>
        <h5>Count down timer</h5>
      </>
  )
}

export default CountDownTimer