import './TicketList.css'
import { useEffect, useState } from 'react'
import Ticket from '../Ticket/Ticket'

function Tickets(props) {
	const [tickets, setTickets] = useState([])

	const preloader = () => {
		props.setPreloader(false)
	}

	useEffect(() => {
		setTickets(props.tickets)
		preloader()
	}, [props.tickets])

	return (
		<section className='ticket-list'>
			{
				props.preloader ?
					(
						<div className={`ticket-list__preloader-wrapper`}>
							<span className="ticket-list__preloader"></span>
						</div>
					)
					:
					(
						<>
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
													key={ticket.info.flightToken}
													flightCarrierCaption={ticket.info.caption}
													ticketPassPrice={ticket.info.price}

													depCaption={ticket.to.departureAirportCaptionTo}
													depUid={ticket.to.departureAirportUidTo}
													arrivCaption={ticket.to.arrivalAirportCaptionTo}
													arrivUid={ticket.to.arrivalAirportUidTo}
													depDate={ticket.to.departureDateTo}
													travelDuration={ticket.to.travelDurationTo}
													travelJumps={ticket.to.travelJumpsTo}
													arrivDate={ticket.to.arrivalDateTo}

													backDepCaption={ticket.from.departureAirportCaptionFrom}
													backDepUid={ticket.from.departureAirportUidFrom}
													backArrivCaption={ticket.from.arrivalAirportCaptionFrom}
													backArrivUid={ticket.from.arrivalAirportUidFrom}
													backDepDate={ticket.from.departureDateFrom}
													backTravelDuration={ticket.from.travelDurationFrom}
													backTravelJumps={ticket.from.travelJumpsFrom}
													backArrivDate={ticket.from.arrivalDateFrom}
												/>
											)
										})
									)
							}
							{
								tickets.length === 0 || tickets.length === props.length
									? ""
									: (
										<button type="button" className={`ticket-list__load-more-btn`} onClick={props.handleMoreTickets} >
											Показать еще
										</button>
									)
							}
						</>
					)
			}
		</section >
	)
}

export default Tickets