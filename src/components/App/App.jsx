import './App.css';
import Filtres from '../Filtres/Filtres'
import TicketsList from '../TicketList/TicketList';
import { useEffect, useState } from 'react';
import ticketsData from '../../data/flights.json'

function App() {

	const flights = ticketsData.result.flights.map(item => {
		//---INFO---//
		const flightToken = item.flightToken
		const caption = item.flight.carrier.caption
		const price = item.flight.price.passengerPrices[0].singlePassengerTotal.amount
		//---TO---//
		const departureDateTo = item.flight.legs[0].segments[0].departureDate
		const departureAirportCaptionTo = item.flight.legs[0].segments[0].departureAirport.caption
		const departureAirportUidTo = item.flight.legs[0].segments[0].departureAirport.uid
		const travelDurationTo = item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[0].travelDuration + item.flight.legs[0].segments[1].travelDuration : item.flight.legs[0].segments[0].travelDuration
		const arrivalDateTo = item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[1].arrivalDate : item.flight.legs[0].segments[0].arrivalDate
		const arrivalCityTo = item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[1].arrivalDate : item.flight.legs[0].segments[0].arrivalDate
		const arrivalAirportCaptionTo = item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[1].departureAirport.caption : item.flight.legs[0].segments[0].departureAirport.caption
		const arrivalAirportUidTo = item.flight.legs[0].segments.length > 1 ? item.flight.legs[0].segments[1].departureAirport.uid : item.flight.legs[0].segments[0].departureAirport.uid
		const travelJumpsTo = item.flight.legs[0].segments.length
		//---FROM---//
		const departureDateFrom = item.flight.legs[1].segments[0].departureDate
		const departureAirportCaptionFrom = item.flight.legs[1].segments[0].departureAirport.caption
		const departureAirportUidFrom = item.flight.legs[1].segments[0].departureAirport.uid
		const travelDurationFrom = item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[0].travelDuration + item.flight.legs[1].segments[1].travelDuration : item.flight.legs[1].segments[0].travelDuration
		const arrivalDateFrom = item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[1].arrivalDate : item.flight.legs[1].segments[0].arrivalDate
		const arrivalCityForm = item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[1].arrivalDate : item.flight.legs[1].segments[0].arrivalDate
		const arrivalAirportCaptionFrom = item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[1].arrivalAirport.caption : item.flight.legs[1].segments[0].arrivalAirport.caption
		const arrivalAirportUidFrom = item.flight.legs[1].segments.length > 1 ? item.flight.legs[1].segments[1].arrivalAirport.uid : item.flight.legs[1].segments[0].arrivalAirport.uid
		const travelJumpsFrom = item.flight.legs[1].segments.length

		return {
			info: {
				flightToken,
				caption,
				price
			},
			to: {
				departureDateTo,
				departureAirportCaptionTo,
				departureAirportUidTo,
				travelDurationTo,
				arrivalDateTo,
				arrivalCityTo,
				arrivalAirportCaptionTo,
				arrivalAirportUidTo,
				travelJumpsTo
			},
			from: {
				departureDateFrom,
				departureAirportCaptionFrom,
				departureAirportUidFrom,
				travelDurationFrom,
				arrivalDateFrom,
				arrivalCityForm,
				arrivalAirportCaptionFrom,
				arrivalAirportUidFrom,
				travelJumpsFrom
			}
		}
	})

	const airlineCompanys = flights.map((item) => item.info.caption).filter((item, index, array) => array.findIndex(arrayItem => (arrayItem === item)) === index)
	const [companys, setCompanys] = useState([])
	const [tickets, setTickets] = useState(flights)
	const [highterPrice, setHighterPrice] = useState(true)
	const [lowerPrice, setLowerPrice] = useState(false)
	const [travelTime, setTravelTime] = useState(false)
	const [withoutTransfer, setWithoutTransfer] = useState(false)
	const [preloader, setPreloader] = useState(true)
	const [oneTransfer, setOneTransfer] = useState(false)
	const [price, setPrice] = useState({ minPrice: 0, maxPrice: 200000 })
	const [length, setLength] = useState(0)

	const mainFilter = () => {
		const mainTicketsArray = flights
		const lowerToHight = highterPrice ? mainTicketsArray.sort((a, b) =>
			a.info.price - b.info.price
		) : mainTicketsArray;

		const hightToLower = lowerPrice ? lowerToHight.sort((a, b) =>
			b.info.price - a.info.price
		) : lowerToHight;

		const travelDurationLowToHight = travelTime ? hightToLower.sort(
			(a, b) => (a.to.travelDurationTo + a.from.travelDurationFrom) - (b.to.travelDurationTo + b.from.travelDurationFrom)
		) : hightToLower;

		const ticketsWithoutTransfers = withoutTransfer ? travelDurationLowToHight.filter(ticket =>
			ticket.to.travelJumpsTo + ticket.from.travelJumpsFrom === 2
		) : travelDurationLowToHight

		const ticketsWithOneTransfer = oneTransfer ? ticketsWithoutTransfers.filter((ticket) =>
			ticket.to.travelJumpsTo + ticket.from.travelJumpsFrom === 3
		) : ticketsWithoutTransfers

		const ticketsFilteredMinAndMaxPrice = price.minPrice > 0 || price.minPrice < 200000 ? ticketsWithOneTransfer.filter((ticket) =>
			ticket.info.price > price.minPrice && ticket.info.price < price.maxPrice
		) : ticketsWithOneTransfer

		const ticketsFilteredByCompany = airlineCompanys.some(e => companys.includes(e)) ? ticketsFilteredMinAndMaxPrice.filter((ticket) =>
			companys.includes(ticket.info.caption)
		) : ticketsFilteredMinAndMaxPrice

		return ticketsFilteredByCompany
	}

	useEffect(() => {
		setPreloader(true)
		setTimeout(() => {
			setTickets(mainFilter().slice(0, 2))
		}, 500)
		setLength(mainFilter().length)
	}, [highterPrice, lowerPrice, travelTime, withoutTransfer, oneTransfer, price, companys])

	const handleMoreTickets = () => {
		setTickets(mainFilter().slice(0, tickets.length + 2))
	}

	const handleResetFiltres = () => {
		setHighterPrice(true)
		setLowerPrice(false)
		setTravelTime(false)
		setWithoutTransfer(false)
		setOneTransfer(false)
		setPrice({ minPrice: 0, maxPrice: 200000 })
		setCompanys([])
	}

	const handleChangeSortCheckbox = (e) => {
		setHighterPrice(false)
		setLowerPrice(false)
		setTravelTime(false)
		if (e.target.name === 'highterPrice') {
			setHighterPrice(e.target.checked);
		}
		if (e.target.name === 'lowerPrice') {
			setLowerPrice(e.target.checked);
		}
		if (e.target.name === 'travelTime') {
			setTravelTime(e.target.checked);
		}
	}

	const handleChangeFilterCheckbox = (e) => {
		setWithoutTransfer(false)
		setOneTransfer(false)
		if (e.target.name === 'withoutTransfer') {
			setWithoutTransfer(e.target.checked);
		}
		if (e.target.name === 'oneTransfer') {
			setOneTransfer(e.target.checked);
		}
	}

	const handlePriceChange = (e) => {
		const value = Number(e.target.value.replace(/\+|-/ig, ''));
		if (e.target.name === 'minPrice') {
			if (value === 0) {
				setPrice((prev) => prev.minPrice = 0)
			}
			setPrice({ ...price, minPrice: value })
		} else if (e.target.name === 'maxPrice') {
			if (value === 0) {
				setPrice((prev) => prev.maxPrice = 200000)
			}
			setPrice({ ...price, maxPrice: value })
		}
	}

	const handleChangeCompanys = (e) => {
		if (companys.includes(e.target.name)) {
			const updatedCompanys = companys.filter((company) => company !== e.target.name);
			setCompanys(updatedCompanys);
		} else {
			setCompanys([...companys, e.target.name])
		}
	}

	return (
		<div className="wrapper">
			<div className='content'>
				<Filtres
					handleChangeSortCheckbox={handleChangeSortCheckbox}
					handleChangeFilterCheckbox={handleChangeFilterCheckbox}
					handlePriceChange={handlePriceChange}
					handleChangeCompanys={handleChangeCompanys}
					highterPrice={highterPrice}
					lowerPrice={lowerPrice}
					travelTime={travelTime}
					oneTransfer={oneTransfer}
					withoutTransfer={withoutTransfer}
					price={price}
					companys={companys}
					airlineCompanys={airlineCompanys}
				/>
				<TicketsList
					handleMoreTickets={handleMoreTickets}
					handleResetFiltres={handleResetFiltres}
					tickets={tickets}
					length={length}
					preloader={preloader}
					setPreloader={setPreloader}
				/>
			</div>
		</div >
	);
}

export default App;