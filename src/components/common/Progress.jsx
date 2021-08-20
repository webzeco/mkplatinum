
import { Progress  } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import React from 'react'

export default function Progressbar({loaded ,type}) {
    return (
      <div className="mx-5">
        {loaded!==0? <Progress
        theme={
          {
            error: {
              symbol: loaded + '%',
              trailColor: 'pink',
              color: 'red'
            },
            default: {
              symbol: loaded + '%',
              trailColor: 'lightblue',
              color: 'blue'
            },
            active: {
              symbol: loaded + '%',
              trailColor: 'yellow',
              color: 'orange'
            },
            success: {
              symbol: loaded + '%',
              trailColor: 'lime',
              color: 'green'
            }
          }  }
         type={type} percent={loaded} status="success" />
         :null}
         </div>
    )
}
