/*
  Component renders React big calendar with planned activities populated
*/

// react-big-calender component
import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment)

class ReactBigCalender extends Component{
  state = {
    toEvent: false,
    eventId: null,
  }

  /**
   * handling triggered event on clicking the event
   */
  eventHandler = (event, e) => {
    console.log('event: ',event)
    console.log('synthetic event: ',e)
    this.setState({toEvent: true, eventId: event.id})
  }

  /**
   * To apply styling to the event populated on calendar
   */
  eventPropGetterHandler = (event, start, end, selected) => {
    let style = null

    if (event.severity === 'High' && event.status!=="Closed") {
      style = {
            backgroundColor: 'red',
            opacity: 0.8,
            color: 'white',
        };
    } else if (event.severity === 'Medium' && event.status!=="Closed") {
      style = {
            backgroundColor: 'orange',
            opacity: 0.8,
            color: 'white',
        };
    } else if (event.severity === 'Low' && event.status!=="Closed") {
      style = {
            backgroundColor: 'yellow',
            opacity: 1,
            color: 'black',
        };
    } else {
      style = {
            backgroundColor: 'green',
            opacity: 0.8,
            color: 'white',
        };
    }

    return {style: style}
  }

  render() {
    let bigCalender = null

    if (this.state.events) {
      bigCalender = (
        <BigCalendar
          localizer={localizer}
          events={
            [
              {
                'title': 'My event',
                'allDay': false,
                'start': new Date(2018, 0, 1, 10, 0), // 10.00 AM
                'end': new Date(2018, 0, 1, 14, 0), // 2.00 PM
              }
            ]
          }
          views={['month', 'week', 'day', 'agenda']}
          onSelectEvent={this.eventHandler}
          eventPropGetter={this.eventPropGetterHandler}
        />
      )
    }



    return (
      <div style={{
         height: '400px',
         width:"100%",

         position: "absolute",
         backgroundColor: "None"
      }}>
        {bigCalender}
        <br />

      </div>
    )
  }
}

export default ReactBigCalender;
