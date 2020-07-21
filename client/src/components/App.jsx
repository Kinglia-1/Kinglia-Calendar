import React from 'react';
import $ from 'jquery';
import Calendar from './Calendar.jsx';
import Guests from './Guests.jsx';
import PriceBreakDown from './PriceBreakDown.jsx';
import styles from '../../dist/style.css';
import axios from 'axios';

const placeID = Math.ceil(Math.random() * 1000000);
const userID = Math.ceil(Math.random() * 1000000);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      info: {},
      checkIn: 'Add date',
      checkOut: 'Add date',
      adults: 1,
      children: 0,
      infants: 0,
      showCalendar: false,
      showGuestsOptions: false,
      user: {},
    }
  }


  componentDidMount() {
    this.getData();
    axios.get(`/api/user/${userID}`)
    .then( data =>{
      this.setState({
        user: data
      })
    })
  }

  getData() {
    $.ajax({
      url: `/api/place/${placeID}`,
      type: 'GET',
      success: (data) => {
        this.setState({
          info: data
        })
      },
      error: (err) => {
        console.log('Error retrieving data');
      }
    })
  }

  reserve() {
    let checkindate = new Date(this.state.checkIn);
    let checkoutdate = new Date(this.state.checkOut);

    let reservation = {
      userid: userID,
      placeid: this.state.info.placeid,
      checkin: checkindate.toISOString().slice(0,10),
      checkout: checkoutdate.toISOString().slice(0,10),
      adults: this.state.adults,
      children: this.state.children,
      infants: this.state.infants,
      nightly_fee: this.state.info.nightly_fee,
      cleaning_fee: this.state.info.cleaning_fee,
      occupancy_tax_rate: this.state.info.occupancy_tax_rate
    }
    axios.post(`/api/user/${userID}`, reservation)
    .then( res => {
      this.getData();
      this.setState({
        checkIn: 'Add date',
        checkOut: 'Add date',
        adults: 1,
        children: 0,
        infants: 0
      })
    })
    .catch( e => console.log("error posting: "+ e))



    // $.ajax({
    //   url: `/api/user/${userID}`,
    //   type: 'POST',
    //   data: reservation,
    //   success: (data) => {
    //     this.getData();
    //     this.setState({
    //       checkIn: 'Add date',
    //       checkOut: 'Add date',
    //       adults: 1,
    //       children: 0,
    //       infants: 0
    //     })
    //   },
    //   error: (err) => {
    //     console.log('Error patching data');
    //   }
    // })
  }

  showCalendar() {
    this.setState({
      showCalendar: !this.state.showCalendar,
      showGuestsOptions: false
    })
  }

  showGuestsOptions() {
    this.setState({
      showGuestsOptions: !this.state.showGuestsOptions
    })
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      showCalendar: true
    })
  }

  updateCheckIn(date) {
    this.setState({
      checkIn: date,
      checkOut: 'Add date'
    })
  }

  updateCheckOut(date) {
    this.setState({
      checkOut: date
    })
  }

  clearDates() {
    this.setState({
      checkIn: 'Add date',
      checkOut: 'Add date'
    })
  }

  calculateNights() {
    const date1 = new Date(this.state.checkIn);
    const date2 = new Date(this.state.checkOut);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  updateGuests(type, operation) {
    let result;
    if (operation === 'plus') {
      result = this.state[type] + 1;
    } else {
      result = this.state[type] - 1;
    }
    this.setState({
      [type]: result
    })
  }


  render() {

    let button;
    let price;
    let reserve = this.state.checkIn !== 'Add date' && this.state.checkOut !== 'Add date';

    if (reserve) {
      button = <div className={styles.pinkButton} onClick={this.reserve.bind(this)}>Reserve</div>
      price = <PriceBreakDown info={this.state.info} calculateNights={this.calculateNights.bind(this)} />
    } else {
      button = <div className={styles.pinkButton} onClick={this.handleClick.bind(this)}>Check availability</div>
      price;
    }


    return (<div className={styles.calendarForm}>
      <div className={styles.topBar}>
      <span> <span className={styles.nightlyFee}>${this.state.info.nightly_fee}</span> / night</span>
      <span className={styles.reviewsRating}> <span className={styles.star}>&#9733;</span> {Math.round(this.state.info.avg_rating * 100)/100} ({this.state.info.reviews})</span>
      </div>
      <form onSubmit={this.reserve.bind(this)}>
        <div className={styles.checkinGuestsContainer}>

      <Calendar showCalendarState={this.state.showCalendar} showCalendar={this.showCalendar.bind(this)} bookings={this.state.info.bookings} calculateNights={this.calculateNights.bind(this)} clearDates={this.clearDates.bind(this)} checkIn={this.state.checkIn} checkOut={this.state.checkOut} updateCheckIn={this.updateCheckIn.bind(this)} updateCheckOut={this.updateCheckOut.bind(this)} ref={this.calendarElement}/>

      <Guests showGuestsOptions={this.showGuestsOptions.bind(this)} showGuestsState={this.state.showGuestsOptions} updateGuests={this.updateGuests.bind(this)} adults={this.state.adults} children={this.state.children} infants={this.state.infants} max={this.state.info.max_capacity} />
      </div>
      {button}
      </form>
      {price}
    </div>
    )}
}

export default App;
