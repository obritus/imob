import React from 'react'

export default () =>
	<form action="#" id="form_empreendimento" className="form" data-js="form_empreendimento">
		<div className="row">
			<div className="col-md-12">
				<div className="mb-3">
					<label htmlFor="titleForm" className="form-label">Título do anúncio</label>
					<input type="text" className="form-control form-control-lg" id="titleForm" name="title" required />
				</div>
			</div>

			<div className="col-md-4">
				<div className="mb-3">
					<label htmlFor="categoriaForm" className="form-label">Categoria</label>
					<select className="form-control form-select" id="categoriaForm" name="categoria" required>
						<option value="1">Casa</option>
						<option value="2">Apartamento</option>
						<option value="3">Terreno</option>
						<option value="4">Lote</option>
						<option value="5">Kitnet</option>
					</select>
				</div>
			</div>
			<div className="col-md-4">
				<div className="mb-3">
					<label htmlFor="typeForm" className="form-label">Tipo</label>
					<select className="form-control form-select" id="typeForm" name="type" required>
						<option value="1">Aluguel</option>
						<option value="2">Venda</option>
					</select>
				</div>
			</div>
			<div className="col-md-4">
				<label htmlFor="priceForm" className="form-label">Preço/Aluguel</label>
				<div className="input-group mb-3">
					<span className="input-group-text" id="basic-addon1">R$</span>
					<input type="text" className="form-control" id="priceForm" name="price" min="0" required />
				</div>
			</div>

			<div className="col-md-4">
				<div className="mb-3">
					<label htmlFor="cidadeForm" className="form-label">Cidade</label>
					<select className="form-control form-select" id="cidadeForm" name="cidade" required></select>
				</div>
			</div>

			<div className="col-md-4">
				<div className="mb-3">
					<label htmlFor="bairroForm" className="form-label">Bairro</label>
					<select className="form-control form-select form-control" id="bairroForm" name="bairro" required></select>
				</div>
			</div>

			<div className="col-md-4">
				<div className="mb-3">
					<label htmlFor="googleForm" className="form-label">Google Maps</label>
					<input type="text" className="form-control" id="googleForm /" title="Insira as coordenadas do empreendimento localizadas no Google Maps." name="google_maps"
						placeholder="-00.000000000000000, -00.00000000000000" min="0" />
				</div>
			</div>

			<div className="col-md-3" data-categoria="false">
				<div className="mb-3">
					<label htmlFor="quartosForm" className="form-label">Quartos</label>
					<input type="number" className="form-control" id="quartosForm" name="quartos" min="0" />
				</div>
			</div>

			<div className="col-md-3" data-categoria="false">
				<div className="mb-3">
					<label htmlFor="suitesForm" className="form-label">Suítes</label>
					<input type="number" className="form-control" id="suitesForm" name="suites" min="0" />
				</div>
			</div>

			<div className="col-md-3" data-categoria="false">
				<div className="mb-3">
					<label htmlFor="banheirosForm" className="form-label">Banheiros</label>
					<input type="number" className="form-control" id="banheirosForm" name="banheiros" min="0" />
				</div>
			</div>

			<div className="col-md-3" data-categoria="false">
				<div className="mb-3">
					<label htmlFor="vagasForm" className="form-label">Vagas Garagem</label>
					<input type="number" className="form-control" id="vagasForm" name="vagas_garagem" min="0" />
				</div>
			</div>

			<div className="col-md-12">
				<div className="mb-3">
					<label htmlFor="detailsForm" className="form-label">Detalhes</label>
					<textarea className="form-control" id="detailsForm" name="details" rows="7"></textarea>
				</div>
			</div>

			<div className="col-md-12 mb-3">
				<div className="form-check">
					<input className="form-check-input form-lg" type="checkbox" id="statusForm" name="status" />
					<label className="form-check-label" htmlFor="statusForm">Publicado</label>
				</div>
			</div>

			<div className="col-md-12" id="imagesBox">
				<h2 className="my-3">Imagens</h2>
				<div className="row">
					<div className="col-md-12 mb-3">
						<h4>Fazer upload</h4>
						<p>Arraste imagens no formato .JPG ou .PNG.</p>
						<div id="dropZone">
							<p>Arraste os arquivos para cá.</p>
						</div>
					</div>
					<div className="col-md-12">
						<h4>Imagens atuais <span className="badge bg-info text-dark" data-js="total_images"></span></h4>
						<p>Galeria atual do empreendimento.</p>
						<div id="uploaded"></div>
					</div>
				</div>
			</div>

			<div className="col-md-12">
				<button type="submit" className="btn btn-primary btn-lg" id="btn_form">Avançar</button>
			</div>
		</div>
	</form>


// const Cidades = fetch('/api/cidades/')

// const GetBairro = cidade_id => {
// 	bairroForm.innerHTML = null //LIMPA A LISTA ATUAL
// 	const Bairro = fetch('/api/bairros/' + cidade_id)
// 	Bairro
// 		.then(response => response.json())
// 		.then(bairros => {
// 			if (bairros.length > 0) {
// 				bairros.map(({ _id, name }) => {
// 					const Render = `<option value="${_id}">${name}</option>`
// 					bairroForm.innerHTML += Render
// 				})
// 				bairroForm.value = bairroForm.options[0].value
// 			}
// 		})
// }

// const GetCidade = () => {
// 	Cidades
// 		.then(response => response.json())
// 		.then(cidades => {
// 			cidades.map(({ _id, name }) => {
// 				const Render = `<option value="${_id}">${name}</option>`
// 				cidadeForm.innerHTML += Render
// 			})
// 			cidadeForm.value = cidadeForm.options[0].value
// 			return GetBairro(cidadeForm.value)
// 		})
// }

// const GetImagens = async ({ _id, filename, empreendimento }, default_image) => {
// 	const imgUrl = `/images/empreendimentos/${empreendimento}/${filename}`

// 	const divImagem = document.createElement('div')
// 	const divRadio = document.createElement('input')
// 	const divLabel = document.createElement('label')
// 	const divP = document.createElement('p')
// 	const eraseButton = document.createElement('button')

// 	divRadio.type = 'radio'
// 	divRadio.name = 'default_image'
// 	divRadio.className = 'd-none'
// 	divRadio.id = _id
// 	divRadio.value = _id
// 	divRadio.setAttribute('form', 'form_empreendimento')

// 	divLabel.htmlFor = _id

// 	divImagem.className = 'image'
// 	eraseButton.dataset.id = _id
// 	eraseButton.className = 'btn-close erase_button'
// 	eraseButton.type = 'button'
// 	eraseButton.title = 'Excluir imagem'
// 	eraseButton.onclick = () => EraseImage(_id)
// 	divP.innerHTML = 'Carregando...'

// 	divImagem.appendChild(divP)
// 	divLabel.appendChild(divImagem)
// 	divLabel.appendChild(eraseButton)

// 	document.getElementById('uploaded').appendChild(divRadio)
// 	document.getElementById('uploaded').appendChild(divLabel)

// 	setTimeout(() => {
// 		divImagem.removeChild(divP)
// 		divImagem.style.backgroundImage = `url(${imgUrl})`
// 		if (default_image) {
// 			document.querySelector(`input[value="${default_image}"]`)
// 				.checked = true
// 		} else {
// 			document.querySelector(`input[name="default_image"]`)
// 				.checked = true
// 		}
// 	}, 2000)
// }

// const ShowImagesBox = () => {
// 	imagesBox.classList.add('show')
// 	imagesBox.scrollIntoView()
// }

// GetCidade()

// document.querySelector('#form_empreendimento')
// 	.addEventListener('submit', async function (e) {
// 		e.preventDefault()

// 		const DefaultImageCheck = () => {
// 			if (document.querySelector('input[name="default_image"]:checked')) {
// 				return document.querySelector('input[name="default_image"]:checked').value
// 			} else {
// 				return null
// 			}
// 		}
// 		const response =
// 			await new Response(
// 				new URLSearchParams(new FormData(e.target).entries())
// 			).text()

// 		fetch('/api/empreendimentos/', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			},
// 			body: response
// 		})
// 			.then(response => response.json())
// 			.then(data => {
// 				if (data._id) {
// 					sessionStorage.setItem('empreendimento_id', data._id)
// 					const BlockInputs = () => {
// 						const GetFormElements =
// 							document.querySelectorAll('form input, form textarea, form select')
// 						GetFormElements.forEach(e => e.disabled = true)
// 					}

// 					if (data.msg) {
// 						ShowMessage({ msg: data.msg, alertClass: 'bg-success' })
// 					}
// 					BlockInputs()
// 					ShowImagesBox()

// 					document.querySelector('#form_empreendimento .btn').innerText = 'Concluir'
// 					document.querySelector('#form_empreendimento')
// 						.addEventListener('submit', function (e) {
// 							e.preventDefault()
// 							fetch('/api/empreendimentos/' + data._id, {
// 								method: 'PUT',
// 								headers: { 'Content-Type': 'application/json' },
// 								body: JSON.stringify({ default_image: DefaultImageCheck() })
// 							})
// 								.then(response => response.json())
// 								.then(data => {
// 									console.log(data)
// 									ShowMessage({
// 										msg: 'Empreendimento adicionado',
// 										alertClass: 'bg-success'
// 									})
// 									document.querySelector('body')
// 										.scrollIntoView({ behavior: "smooth" })
// 								})
// 						})
// 				}
// 				if (data.err) {
// 					ShowMessage({ msg: data.err, alertClass: 'bg-danger' })
// 					document.querySelector('body')
// 						.scrollIntoView({ behavior: "smooth" })
// 				}
// 			})
// 			.catch(err => console.error(err))
// 	})

// cidadeForm.addEventListener('change', function (e) { GetBairro(this.value) })

// dropZone.ondragover = function () {
// 	this.classList.add('active')
// 	return false
// }
// dropZone.ondragleave = function () {
// 	this.classList.remove('active')
// 	return false
// }
// dropZone.ondrop = function (e) {
// 	this.classList.remove('active')
// 	const upload = files => {
// 		const data = new FormData()
// 		data.append('_id', sessionStorage.getItem('empreendimento_id'))

// 		for (x = 0; x < files.length; x++) {
// 			data.append('images', files[x])
// 		}

// 		fetch('/api/images', { method: 'POST', body: data })
// 			.then(response => response.json())
// 			.then(data => data.forEach(data => GetImagens(data)))
// 			.catch(err => console.error(err))
// 	}
// 	e.preventDefault()
// 	upload(e.dataTransfer.files)
// }

// categoriaForm.addEventListener('change', e => {
// 	const valor = e.target.value
// 	HideCategoria(valor)
// })