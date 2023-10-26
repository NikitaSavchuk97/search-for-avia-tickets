import './App.css';
import Filtres from '../Filtres/Filtres'
import TicketsList from '../Tickets/TicketList';
import { useEffect, useState } from 'react';
import ticketsData from '../../data/flights.json'

function App() {
	const flights = ticketsData.result.flights
	const airlineCompanys = flights.map((f) => f.flight.carrier.caption).filter((item, index, array) => array.findIndex(arrayItem => (arrayItem === item)) === index)
	const [companys, setCompanys] = useState([])
	const [tickets, setTickets] = useState(flights)
	const [highterPrice, setHighterPrice] = useState(true)
	const [lowerPrice, setLowerPrice] = useState(false)
	const [travelTime, setTravelTime] = useState(false)
	const [withoutTransfer, setWithoutTransfer] = useState(false)
	const [oneTransfer, setOneTransfer] = useState(false)
	const [price, setPrice] = useState({ minPrice: 0, maxPrice: 200000 })


	const mainFilter = () => {
		const mainTicketsArray = flights
		const lowerToHight = highterPrice ? mainTicketsArray.sort((a, b) =>
			a.flight.price.passengerPrices[0].singlePassengerTotal.amount - b.flight.price.passengerPrices[0].singlePassengerTotal.amount
		) : mainTicketsArray;

		const hightToLower = lowerPrice ? lowerToHight.sort((a, b) =>
			b.flight.price.passengerPrices[0].singlePassengerTotal.amount - a.flight.price.passengerPrices[0].singlePassengerTotal.amount
		) : lowerToHight;

		const travelDurationLowTohight = travelTime ? hightToLower.sort(
			(a, b) =>
				((a.flight.legs[0].segments.length > 1 ? a.flight.legs[0].segments[0].travelDuration + a.flight.legs[0].segments[1].travelDuration : a.flight.legs[0].segments[0].travelDuration)
					+
					(a.flight.legs[1].segments.length > 1 ? a.flight.legs[1].segments[0].travelDuration + a.flight.legs[1].segments[1].travelDuration : a.flight.legs[1].segments[0].travelDuration))
				-
				((b.flight.legs[0].segments.length > 1 ? b.flight.legs[0].segments[0].travelDuration + b.flight.legs[0].segments[1].travelDuration : b.flight.legs[0].segments[0].travelDuration)
					+
					(b.flight.legs[1].segments.length > 1 ? b.flight.legs[1].segments[0].travelDuration + b.flight.legs[1].segments[1].travelDuration : b.flight.legs[1].segments[0].travelDuration))
		) : hightToLower;

		const ticketsWithoutTransfers = withoutTransfer ? travelDurationLowTohight.filter((ticket) =>
			ticket.flight.legs[0].segments.length < 2 && ticket.flight.legs[1].segments.length < 2
		) : travelDurationLowTohight

		const ticketsWithOneTransfer = oneTransfer ? ticketsWithoutTransfers.filter((ticket) =>
			ticket.flight.legs[0].segments.length < 2 || ticket.flight.legs[1].segments.length < 2
		) : ticketsWithoutTransfers

		const ticketsFilteredMinAndMaxPrice = price.minPrice > 0 || price.minPrice < 200000 ? ticketsWithOneTransfer.filter((ticket) =>
			ticket.flight.price.passengerPrices[0].singlePassengerTotal.amount > price.minPrice && ticket.flight.price.passengerPrices[0].singlePassengerTotal.amount < price.maxPrice
		) : ticketsWithOneTransfer

		const ticketsFilteredByCompany = airlineCompanys.some(e => companys.includes(e)) ? ticketsFilteredMinAndMaxPrice.filter((ticket) =>
			companys.includes(ticket.flight.carrier.caption)
		) : ticketsFilteredMinAndMaxPrice

		return ticketsFilteredByCompany
	}

	useEffect(() => {
		setTickets(mainFilter().slice(0, 2))
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
				/>
			</div>
		</div >
	);
}

export default App;
