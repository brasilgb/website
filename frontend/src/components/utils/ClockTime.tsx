'use client'

import { useEffect, useState } from "react"
import moment from "moment";

const ClockTime = () => {
    const [timeClock, setTimeClock] = useState();

    useEffect(() => {
        setInterval(() => {
            let time: any = moment().format("HH:mm:ss");
            setTimeClock(time);
        }, 1000)
    },[])
  return <>{timeClock}</>
}

export default ClockTime