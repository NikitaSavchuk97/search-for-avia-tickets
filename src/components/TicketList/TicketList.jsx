import './TicketList.css'
import { useEffect, useState } from 'react'
import Ticket from '../Ticket/Ticket'

function Tickets(props) {
	const [tickets, setTickets] = useState([])

	useEffect(() => {
		setTickets(props.tickets)
	}, [props.tickets])

	return (
		<section className='ticket-list'>
			{
				tickets.length === 0 ?
					(
						<div className='ticket-list__error-of-search'>

							<h2 className='ticket-list__error-title'>
								Нет подходящих билетов
							</h2>

							<p className='ticket-list__error-subtitle'>
								попробуйте смягчить условия поиска
							</p>

							<button className='ticket-list__error-button-reset' onClick={props.handleResetFiltres}>
								Сбросить фильтры
							</button>

						</div>
					)
					:
					(
						tickets.map((ticket) => {
							return (
								<Ticket
									flightToken={ticket.flightToken}
									flightCarrierCaption={ticket.flight.carrier.caption}
									ticketPassPrice={ticket.flight.price.passengerPrices[0].singlePassengerTotal.amount}
									depCaption={ticket.flight.legs[0].segments[0].departureAirport.caption}
									depUid={ticket.flight.legs[0].segments[0].departureAirport.uid}
									arrivCaption={ticket.flight.legs[0].segments[`${ticket.flight.legs[0].segments.length > 1 ? 1 : 0}`].arrivalAirport.caption}
									arrivUid={ticket.flight.legs[0].segments[`${ticket.flight.legs[0].segments.length > 1 ? 1 : 0}`].arrivalAirport.uid}
									depDate={ticket.flight.legs[0].segments[0].departureDate}
									travelDuration={ticket.flight.legs[0].segments.length > 1 ? ticket.flight.legs[0].segments[0].travelDuration + ticket.flight.legs[0].segments[1].travelDuration : ticket.flight.legs[0].segments[0].travelDuration}
									travelJumps={ticket.flight.legs[0].segments.length}
									arrivDate={ticket.flight.legs[0].segments[`${ticket.flight.legs[0].segments.length > 1 ? 1 : 0}`].arrivalDate}
									backDepCaption={ticket.flight.legs[1].segments[0].departureAirport.caption}
									backDepUid={ticket.flight.legs[1].segments[0].departureAirport.uid}
									backArrivCaption={ticket.flight.legs[1].segments[`${ticket.flight.legs[1].segments.length > 1 ? 1 : 0}`].arrivalAirport.caption}
									backArrivUid={ticket.flight.legs[1].segments[`${ticket.flight.legs[1].segments.length > 1 ? 1 : 0}`].arrivalAirport.uid}
									backDepDate={ticket.flight.legs[1].segments[0].departureDate}
									backTravelDuration={ticket.flight.legs[1].segments.length > 1 ? ticket.flight.legs[1].segments[0].travelDuration + ticket.flight.legs[1].segments[1].travelDuration : ticket.flight.legs[1].segments[0].travelDuration}
									backTravelJumps={ticket.flight.legs[1].segments.length}
									backArrivDate={ticket.flight.legs[1].segments[`${ticket.flight.legs[1].segments.length > 1 ? 1 : 0}`].arrivalDate}
								/>
							)
						})
					)
			}
			{
				tickets.length === 0
					? ""
					: (
						<button button className={`ticket-list__load-more-btn`} onClick={props.handleMoreTickets} type="button" >
							Показать еще
						</button>
					)
			}
		</section >
	)
}

export default Tickets