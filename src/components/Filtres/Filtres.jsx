import './Filtres.css'

function Filtres(props) {
	return (
		<section>

			<ul className='filtres'>
				<li className='filtres__item'>
					<h3 className='filtres__item-title'>Сортировать</h3>
					<div className='filtres__checkbox-wrapper'>
						<input className='filtres__checkbox' type="radio" checked={props.highterPrice} onChange={props.handleChangeSortCheckbox} name="highterPrice" />
						<label className='filtres__checkbox-label'> - по возрастанию цены</label>
					</div>

					<div className='filtres__checkbox-wrapper'>
						<input className='filtres__checkbox' type="radio" checked={props.lowerPrice} onChange={props.handleChangeSortCheckbox} name="lowerPrice" />
						<label className='filtres__checkbox-label'> - по убыванию цены</label>
					</div>

					<div className='filtres__checkbox-wrapper'>
						<input className='filtres__checkbox' type="radio" checked={props.travelTime} onChange={props.handleChangeSortCheckbox} name="travelTime" />
						<label className='filtres__checkbox-label'> - по времени в пути</label>
					</div>
				</li>

				<li className='filtres__item'>
					<h3 className='filtres__item-title'>Фильтровать</h3>
					<div className='filtres__checkbox-wrapper'>
						<input className='filtres__checkbox' type="checkbox" checked={props.oneTransfer} onChange={props.handleChangeFilterCheckbox} name="oneTransfer" />
						<label className='filtres__checkbox-label'> - 1 пересадка</label>
					</div>

					<div className='filtres__checkbox-wrapper'>
						<input className='filtres__checkbox' type="checkbox" checked={props.withoutTransfer} onChange={props.handleChangeFilterCheckbox} name="withoutTransfer" />
						<label className='filtres__checkbox-label'> - без пересадок</label>
					</div>
				</li>

				<li className='filtres__item'>
					<h3 className='filtres__item-title'>Цена</h3>
					<div className='filtres__checkbox-wrapper'>
						<label className='filtres__checkbox-label'>От </label>
						<input className='filtres__price-input' onChange={props.handlePriceChange} type='number' name='minPrice' placeholder={`${props.price.minPrice} ₽`} />
					</div>

					<div className='filtres__checkbox-wrapper'>
						<label className='filtres__checkbox-label'>До </label>
						<input className='filtres__price-input' onChange={props.handlePriceChange} type='number' name='maxPrice' placeholder={`${props.price.maxPrice} ₽`} />
					</div>
				</li>

				<li className='filtres__item'>
					<h3 className='filtres__item-title'>Авиакомпании</h3>
					{
						props.airlineCompanys.map((company) => {
							return (
								<div className='filtres__checkbox-wrapper ' key={company}>
									<input className='filtres__checkbox' type="checkbox" checked={props.companys.company} onChange={props.handleChangeCompanys} name={company} />
									<label className='filtres__checkbox-label filtres__checkbox-label-type-hidden'>- {company}</label>
								</div>
							)
						})
					}
				</li>
			</ul>

		</section>
	)
}

export default Filtres