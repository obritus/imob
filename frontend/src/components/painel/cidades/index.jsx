import React from "react"
import axios from "axios"
import { useState, useEffect } from "react"

export default () => {
	const [cidades, setCidades] = useState([])
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_BACKEND_URL}api/cidades`)
			.then((res) => setCidades(res.data))
			.catch((error) => console.log({ error }))
	}, [])

	return (
		<div className="App">
			{cidades.map((country) => {
				return (
					<div key={country.name}>
						<p>{country.name}</p>
					</div>
				)
			})}
		</div>
	)
}
