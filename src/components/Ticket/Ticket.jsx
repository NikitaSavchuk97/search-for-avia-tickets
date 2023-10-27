import './Ticket.css'

function Ticket(props) {

	const roundValue = (value) => {
		return Math.round(value)
	}

	const convertMinutes = (value) => {
		const hours = Math.floor(value / 60)
		const remainingMinutes = value % 60;
		return { hours, mins: remainingMinutes }
	}

	const takeTime = (value) => {
		const dateAndTime = value.split("T");
		const date = dateAndTime[dateAndTime.length - 2];
		const time = dateAndTime[dateAndTime.length - 1];
		return { date, time }
	}

	const handleTakeTicket = () => {
		console.log('ВЫБРАЛ')
	}

	return (
		<section className='ticket'>

			<div className='ticker__header'>
				<h2 className='ticket__company-title'>{props.flightCarrierCaption}</h2>
				<div className='ticket__price'>
					<span className='ticker__price-value'>{`${roundValue(props.ticketPassPrice)} ₽`}</span>
					<span className='ticker__price-span'>Стоимость для одного взрослого пассажира</span>
				</div>
			</div>

			<div className='ticket__departure'>
				<div className='ticket__departure-wrapper'>
					<span className='ticket__departure-item'>
						{`${props.depCaption}`}
						<span className='ticket__blue-span'>{` (${props.depUid})`}</span>
					</span>
				</div>
				<span>&rArr;</span>
				<div className='ticket__departure-wrapper'>
					<span className='ticket__departure-item'>
						{` ${props.arrivCaption} `}
						<span className='ticket__blue-span'>{`(${props.arrivUid})`}</span>
					</span>
				</div>
			</div>

			<div className='ticket__timings-info'>
				<span className='ticket__time'>
					{takeTime(props.depDate).time}
				</span>
				<span className='ticket__date'>
					{takeTime(props.depDate).date}
				</span>

				<p className='ticket__travel-time'>
					{`
										${convertMinutes(props.travelDuration).hours}ч 
										${convertMinutes(props.travelDuration).mins}м
									`}
				</p>

				<p className={`ticket__value-of-travels-hidden ${props.travelJumps > 1 ? 'ticket__value-of-travels-visible' : ''}`}>
					{`${props.travelJumps - 1} пересадка`}
				</p>

				<span className='ticket__date'>
					{takeTime(props.arrivDate).date}
				</span>
				<span className='ticket__time'>
					{takeTime(props.arrivDate).time}
				</span>
			</div>

			<h3 className='ticket__company-subtitle'>
				{`Рейс выполняет: ${props.flightCarrierCaption}`}
			</h3>

			<div className='ticket__line'></div>

			<div className='ticket__departure'>
				<div className='ticket__departure-wrapper'>
					<span className='ticket__departure-item'>
						{` ${props.backDepCaption} `}
						<span className='ticket__blue-span'>{`(${props.backDepUid})`}</span>
					</span>
				</div>
				<span>&rArr;</span>
				<div className='ticket__departure-wrapper'>
					<span className='ticket__departure-item'>
						{`${props.backArrivCaption} `}
						<span className='ticket__blue-span'>{`(${props.backArrivUid})`}</span>
					</span>
				</div>
			</div>

			<div className='ticket__timings-info'>
				<span className='ticket__time'>
					{takeTime(props.backDepDate).time}
				</span>
				<span className='ticket__date'>
					{takeTime(props.backDepDate).date}
				</span>

				<p className='ticket__travel-time'>
					{`
										${convertMinutes(props.backTravelDuration).hours}ч 
										${convertMinutes(props.backTravelDuration).mins}м
									`}
				</p>

				<p className={`ticket__value-of-travels-hidden ${props.backTravelJumps > 1 ? 'ticket__value-of-travels-visible' : ''}`}>
					{`${props.backTravelJumps - 1} пересадка`}
				</p>

				<span className='ticket__date'>
					{takeTime(props.backArrivDate).date}
				</span>
				<span className='ticket__time'>
					{takeTime(props.backArrivDate).time}
				</span>
			</div>

			<h3 className='ticket__company-subtitle'>
				{`Рейс выполняет: ${props.flightCarrierCaption}`}
			</h3>

			<button className='ticket__take-button' type='button' onClick={handleTakeTicket}>
				ВЫБРАТЬ
			</button>
		</section>
	)
}

export default Ticket